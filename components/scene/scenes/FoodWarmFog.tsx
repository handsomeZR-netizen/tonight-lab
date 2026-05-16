"use client";

import { useFrame, useThree } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";

import { PASSTHROUGH_VERT, SIMPLEX_NOISE_2D } from "../shaders/noise";

const FRAG = `
${SIMPLEX_NOISE_2D}

uniform float uTime;
uniform float uIntensity;
uniform float uHueShift;
uniform vec3 uColorWarm;
uniform vec3 uColorAccent;
uniform vec3 uColorDeep;
uniform vec2 uResolution;

varying vec2 vUv;

void main() {
  vec2 uv = vUv;
  vec2 p = uv * 2.0 - 1.0;
  p.x *= uResolution.x / uResolution.y;

  // Slow-moving warm fog
  float t = uTime * 0.07;
  float n1 = fbm(p * 1.4 + vec2(t, t * 0.6));
  float n2 = fbm(p * 2.5 - vec2(t * 0.8, -t * 0.3));
  float fog = smoothstep(-0.4, 0.9, n1 * 0.7 + n2 * 0.4);

  // Rising plumes
  float plume = smoothstep(0.0, 1.4, snoise(vec2(p.x * 1.2, p.y * 0.5 - t * 0.9)) + (1.0 - uv.y));
  fog = mix(fog, plume, 0.42);

  // Color blend
  vec3 deep = uColorDeep;
  vec3 warm = mix(uColorWarm, uColorAccent, smoothstep(0.0, 1.0, uv.y + uHueShift * 0.4));
  vec3 color = mix(deep, warm, fog);

  // Soft vignette
  float vignette = smoothstep(1.25, 0.45, length(p));
  color *= vignette;

  float alpha = clamp((fog * 0.85 + 0.18) * uIntensity, 0.0, 0.92);
  gl_FragColor = vec4(color, alpha);
}
`;

type FoodWarmFogProps = {
  intensity?: number;
  hueShift?: number;
};

export function FoodWarmFog({ intensity = 0.6, hueShift = 0 }: FoodWarmFogProps) {
  const matRef = useRef<THREE.ShaderMaterial | null>(null);
  const { viewport, size } = useThree();

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uIntensity: { value: intensity },
      uHueShift: { value: hueShift },
      uColorWarm: { value: new THREE.Color("#fbbf24") },
      uColorAccent: { value: new THREE.Color("#fb7185") },
      uColorDeep: { value: new THREE.Color("#78350f") },
      uResolution: { value: new THREE.Vector2(size.width, size.height) },
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  useFrame((state) => {
    if (!matRef.current) return;
    matRef.current.uniforms.uTime.value = state.clock.elapsedTime;
    matRef.current.uniforms.uIntensity.value = THREE.MathUtils.lerp(
      matRef.current.uniforms.uIntensity.value,
      intensity,
      0.05,
    );
    matRef.current.uniforms.uHueShift.value = THREE.MathUtils.lerp(
      matRef.current.uniforms.uHueShift.value,
      hueShift,
      0.05,
    );
    matRef.current.uniforms.uResolution.value.set(size.width, size.height);
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
