"use client";

import { useFrame, useThree } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";

import { PASSTHROUGH_VERT, SIMPLEX_NOISE_2D } from "../shaders/noise";

const FRAG = `
${SIMPLEX_NOISE_2D}

uniform float uTime;
uniform float uIntensity;
uniform float uBreathRate;
uniform vec3 uColorViolet;
uniform vec3 uColorTeal;
uniform vec3 uColorWarm;
uniform vec2 uResolution;
uniform vec2 uRippleCenter;
uniform float uRippleStart;

varying vec2 vUv;

float circle(vec2 uv, vec2 center, float radius, float feather) {
  float d = distance(uv, center);
  return smoothstep(radius, radius - feather, d);
}

void main() {
  vec2 uv = vUv;
  vec2 p = uv * 2.0 - 1.0;
  p.x *= uResolution.x / uResolution.y;

  float breath = 0.5 + 0.5 * sin(uTime * uBreathRate);
  float radius = 0.42 + 0.16 * breath;

  vec3 violet = uColorViolet;
  vec3 teal = uColorTeal;
  vec3 warm = uColorWarm;

  vec3 cool = mix(violet, teal, 0.4 + 0.4 * sin(uTime * 0.05));
  float halo = circle(p, vec2(0.0), radius, 0.45);
  vec3 inner = mix(warm, cool, 0.6 + 0.3 * breath);
  vec3 outer = vec3(0.06, 0.05, 0.1);
  vec3 color = mix(outer, inner, halo);

  // Drifting wisps
  float wisp = fbm(p * 1.6 + vec2(uTime * 0.04, uTime * 0.02));
  color += cool * smoothstep(0.2, 0.95, wisp) * 0.18;

  // Ripple
  float t = max(uTime - uRippleStart, 0.0);
  if (t < 1.4) {
    vec2 rp = p - uRippleCenter;
    float rd = length(rp);
    float ripple = sin(rd * 14.0 - t * 8.0) * exp(-rd * 2.5) * exp(-t * 2.2);
    color += cool * ripple * 0.45;
  }

  float alpha = clamp((halo * 0.85 + 0.18) * uIntensity, 0.0, 0.94);
  gl_FragColor = vec4(color, alpha);
}
`;

type RecoveryBreathHaloProps = {
  intensity?: number;
  fast?: boolean;
};

export function RecoveryBreathHalo({
  intensity = 0.7,
  fast = false,
}: RecoveryBreathHaloProps) {
  const matRef = useRef<THREE.ShaderMaterial | null>(null);
  const { viewport, size } = useThree();
  const rippleRef = useRef({ x: 0, y: 0, start: -10 });

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uIntensity: { value: intensity },
      uBreathRate: { value: fast ? 1.05 : 0.7 },
      uColorViolet: { value: new THREE.Color("#8b5cf6") },
      uColorTeal: { value: new THREE.Color("#22d3ee") },
      uColorWarm: { value: new THREE.Color("#f5d0c5") },
      uResolution: { value: new THREE.Vector2(size.width, size.height) },
      uRippleCenter: { value: new THREE.Vector2(0, 0) },
      uRippleStart: { value: -10 },
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
      0.04,
    );
    matRef.current.uniforms.uBreathRate.value = THREE.MathUtils.lerp(
      matRef.current.uniforms.uBreathRate.value,
      fast ? 1.05 : 0.7,
      0.04,
    );
    matRef.current.uniforms.uResolution.value.set(size.width, size.height);
  });

  function handlePointerDown(event: { uv?: THREE.Vector2 }) {
    if (!event.uv || !matRef.current) return;
    const localX = (event.uv.x - 0.5) * 2;
    const localY = (event.uv.y - 0.5) * 2;
    rippleRef.current = {
      x: localX,
      y: localY,
      start: matRef.current.uniforms.uTime.value,
    };
    matRef.current.uniforms.uRippleCenter.value.set(localX, localY);
    matRef.current.uniforms.uRippleStart.value = rippleRef.current.start;
  }

  return (
    <mesh
      scale={[viewport.width, viewport.height, 1]}
      onPointerDown={handlePointerDown}
    >
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
