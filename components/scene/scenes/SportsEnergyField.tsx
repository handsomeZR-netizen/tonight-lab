"use client";

import { useFrame, useThree } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";

import { PASSTHROUGH_VERT, SIMPLEX_NOISE_2D } from "../shaders/noise";

type Prediction = "home" | "draw" | "player";

const FRAG = `
${SIMPLEX_NOISE_2D}

uniform float uTime;
uniform float uIntensity;
uniform float uHigh;
uniform float uBias; // -1 home, 0 draw, +1 player
uniform vec3 uGrass;
uniform vec3 uLime;
uniform vec3 uDeep;
uniform vec2 uResolution;

varying vec2 vUv;

void main() {
  vec2 uv = vUv;
  vec2 p = uv * 2.0 - 1.0;
  p.x *= uResolution.x / uResolution.y;

  // Pitch stripes
  float stripeFreq = 8.0;
  float stripe = 0.5 + 0.5 * sin(uv.x * stripeFreq * 3.14159);
  vec3 pitch = mix(uGrass * 0.85, uGrass, smoothstep(0.0, 1.0, stripe));

  // Spotlight glow from top
  float top = smoothstep(1.0, 0.0, uv.y);
  vec3 lights = uLime * top * 0.32 * (0.8 + 0.4 * sin(uTime * 1.4));

  // Energy trails — curl noise sweeping
  vec2 flow = vec2(snoise(p * 2.2 + uTime * 0.2), snoise(p * 2.2 - uTime * 0.18));
  float trail = smoothstep(0.45, 0.95, length(flow) + uBias * (p.x * 0.5));
  vec3 trailColor = mix(uLime, uGrass, 0.4) * trail * (0.6 + uHigh * 0.6);

  // Particles
  vec2 cellP = p * 9.0 + vec2(uTime * 0.6 + uBias * 1.4, 0.0);
  vec2 cellI = floor(cellP);
  vec2 cellF = fract(cellP);
  float seed = fract(sin(dot(cellI, vec2(12.9898, 78.233))) * 43758.5453);
  float twinkle = step(0.94, seed) * smoothstep(0.35, 0.0, length(cellF - 0.5));
  vec3 sparkle = uLime * twinkle * 1.4;

  vec3 base = pitch + lights + trailColor + sparkle;

  // Vignette
  float vignette = smoothstep(1.4, 0.4, length(p));
  base *= vignette;

  float alpha = clamp((0.42 + trail * 0.45 + twinkle * 0.5) * uIntensity, 0.0, 0.95);
  gl_FragColor = vec4(base, alpha);
}
`;

type SportsEnergyFieldProps = {
  intensity?: number;
  high?: boolean;
  prediction?: Prediction;
};

const PREDICTION_BIAS: Record<Prediction, number> = {
  home: -0.7,
  draw: 0,
  player: 0.8,
};

export function SportsEnergyField({
  intensity = 0.65,
  high = false,
  prediction = "home",
}: SportsEnergyFieldProps) {
  const matRef = useRef<THREE.ShaderMaterial | null>(null);
  const { viewport, size } = useThree();

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uIntensity: { value: intensity },
      uHigh: { value: high ? 1 : 0 },
      uBias: { value: PREDICTION_BIAS[prediction] },
      uGrass: { value: new THREE.Color("#10b981") },
      uLime: { value: new THREE.Color("#a3e635") },
      uDeep: { value: new THREE.Color("#064e3b") },
      uResolution: { value: new THREE.Vector2(size.width, size.height) },
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  useFrame((state) => {
    if (!matRef.current) return;
    const u = matRef.current.uniforms;
    u.uTime.value = state.clock.elapsedTime;
    u.uIntensity.value = THREE.MathUtils.lerp(u.uIntensity.value, intensity, 0.05);
    u.uHigh.value = THREE.MathUtils.lerp(u.uHigh.value, high ? 1 : 0, 0.05);
    u.uBias.value = THREE.MathUtils.lerp(
      u.uBias.value,
      PREDICTION_BIAS[prediction],
      0.06,
    );
    u.uResolution.value.set(size.width, size.height);
  });

  return (
    <mesh scale={[viewport.width, viewport.height, 1]}>
      <planeGeometry args={[1, 1]} />
      <shaderMaterial
        ref={matRef}
        uniforms={uniforms}
        vertexShader={PASSTHROUGH_VERT}
        fragmentShader={FRAG}
        transparent
        depthWrite={false}
      />
    </mesh>
  );
}
