// sceneSetup.js - Initializes core Three.js components

import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

/**
 * Creates and configures the Scene, Camera, Renderer, Controls, and Lighting.
 * @returns {object} Object containing scene, camera, renderer, controls.
 */
export function setupScene() {
  // --- Scene ---
  const scene = new THREE.Scene();

  // --- Camera ---
  const camera = new THREE.PerspectiveCamera(
    75, // Field of View
    window.innerWidth / window.innerHeight, // Aspect Ratio
    0.1, // Near Clipping Plane
    3000 // Far Clipping Plane
  );
  camera.position.set(0, 80, 200); // Initial camera position

  // --- Renderer ---
  const renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(window.devicePixelRatio);
  document.body.appendChild(renderer.domElement);

  // --- Controls ---
  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.dampingFactor = 0.05;
  controls.minDistance = 1;
  controls.maxDistance = 1500;
  controls.target.set(0, 0, 0); // Initial look at point

  // --- Lighting ---
  const ambientLight = new THREE.AmbientLight(0x999999); // Soft ambient light
  scene.add(ambientLight);

  const pointLight = new THREE.PointLight(0xffffff, 10000, 100000); // Strong sun light
  pointLight.position.set(0, 0, 0);
  scene.add(pointLight);

  console.log("Scene, Camera, Renderer, Controls, Lighting initialized.");
  return { scene, camera, renderer, controls };
}
