"use client";

import { useFrame, useThree } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";

import { PASSTHROUGH_VERT, SIMPLEX_NOISE_2D } from "../shaders/noise";

type Vibe = "sunset" | "neon";

const FRAG = `
${SIMPLEX_NOISE_2D}

uniform float uTime;
uniform float uIntensity;
uniform float uVibe; // 0 = sunset, 1 = neon
uniform float uLessWalk;
uniform float uPhotoFirst;
uniform vec3 uColorSky;
uniform vec3 uColorWarm;
uniform vec3 uColorNeon;
uniform vec2 uResolution;

varying vec2 vUv;

float horizon(vec2 p) {
  float h = smoothstep(-0.2, 0.4, p.y);
  return h;
}

void main() {
  vec2 uv = vUv;
  vec2 p = uv * 2.0 - 1.0;
  p.x *= uResolution.x / uResolution.y;

  // Layered horizon mist
  float h = horizon(p);
  vec3 base = mix(uColorWarm, uColorSky, h);

  // Drifting mist
  float mist = fbm(vec2(p.x * 2.4 + uTime * 0.04, p.y * 1.6 - uTime * 0.02));
  base += uColorSky * smoothstep(0.1, 0.9, mist) * 0.18;

  // Light "ribbon" — a glowing diagonal band representing the route
  float ribbonY = 0.05 + 0.15 * sin(p.x * 1.8 + uTime * 0.18);
  ribbonY = mix(ribbonY, ribbonY * 0.5, uLessWalk);
  float ribbon = smoothstep(0.06, 0.0, abs(p.y - ribbonY));
  vec3 ribbonColor = mix(uColorSky, uColorNeon, uVibe);
  base += ribbonColor * ribbon * 0.55;

  // Scattered glints (city lights)
  float density = mix(1.0, 1.4, uPhotoFirst);
  vec2 cellP = p * 6.0 * density;
  vec2 cellI = floor(cellP);
  vec2 cellF = fract(cellP);
  float seed = fract(sin(dot(cellI, vec2(12.9898, 78.233))) * 43758.5453);
  float twinkle = 0.5 + 0.5 * sin(uTime * (1.0 + seed * 4.0) + seed * 6.28);
  float glint = step(0.96, seed) * smoothstep(0.34, 0.0, length(cellF - 0.5)) * twinkle;
  vec3 glintColor = mix(uColorWarm * 1.4, uColorNeon, uVibe);
  base += glintColor * glint * 0.8;

  // Vignette + alpha
  float vignette = smoothstep(1.5, 0.4, length(p));
  base *= vignette;
  float alpha = clamp((0.45 + ribbon * 0.4 + glint * 0.6) * uIntensity, 0.0, 0.95);

  gl_FragColor = vec4(base, alpha);
}
`;

type TripCityFlowProps = {
  intensity?: number;
  vibe?: Vibe;
  lessWalk?: boolean;
  photoFirst?: boolean;
};

export function TripCityFlow({
  intensity = 0.65,
  vibe = "sunset",
  lessWalk = false,
  photoFirst = false,
}: TripCityFlowProps) {
  const matRef = useRef<THREE.ShaderMaterial | null>(null);
  const { viewport, size } = useThree();

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uIntensity: { value: intensity },
      uVibe: { value: vibe === "neon" ? 1 : 0 },
      uLessWalk: { value: lessWalk ? 1 : 0 },
      uPhotoFirst: { value: photoFirst ? 1 : 0 },
      uColorSky: { value: new THREE.Color("#38bdf8") },
      uColorWarm: { value: new THREE.Color("#fbcfe8") },
      uColorNeon: { value: new THREE.Color("#a78bfa") },
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
    u.uVibe.value = THREE.MathUtils.lerp(u.uVibe.value, vibe === "neon" ? 1 : 0, 0.05);
    u.uLessWalk.value = THREE.MathUtils.lerp(u.uLessWalk.value, lessWalk ? 1 : 0, 0.06);
    u.uPhotoFirst.value = THREE.MathUtils.lerp(
      u.uPhotoFirst.value,
      photoFirst ? 1 : 0,
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
