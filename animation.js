// animation.js - Contains the main animation loop and resize handler

import * as THREE from "three";
import { globalSpeedMultiplier } from "./data.js"; // Import speed multiplier
import { getSelectedObject } from "./interaction.js"; // Import function to get selection

// Module-level variables
let scene, camera, renderer, controls, celestialBodies;
const clock = new THREE.Clock();
const tempWorldPos = new THREE.Vector3(); // Reusable vector for world position

/** The main animation loop */
function animate() {
  requestAnimationFrame(animate);

  const deltaTime = clock.getDelta();
  const elapsedTime = clock.getElapsedTime();

  // Animate ALL celestial bodies
  celestialBodies.forEach((cb) => {
    // Rotation (around own axis Y)
    cb.mesh.rotation.y +=
      cb.data.rotationSpeed * deltaTime * globalSpeedMultiplier;

    // Orbit (around parent's center) - Update the GROUP's position
    if (cb.data.orbitalRadius > 0) {
      const angle = elapsedTime * cb.data.orbitalSpeed * globalSpeedMultiplier;
      cb.group.position.x = Math.cos(angle) * cb.data.orbitalRadius;
      cb.group.position.z = Math.sin(angle) * cb.data.orbitalRadius;
    }
  });

  // --- Camera Following Logic ---
  const currentSelectedObject = getSelectedObject(); // Check if an object is selected
  if (currentSelectedObject) {
    // Get the current world position of the selected object's MESH
    currentSelectedObject.getWorldPosition(tempWorldPos);
    // Continuously update the controls' target to the object's position
    // This makes the camera frame "move with" the target
    controls.target.copy(tempWorldPos);
  }
  // If nothing is selected, the target remains where it was (likely 0,0,0 from setup or last deselection)

  controls.update(); // Update controls (needed for damping and target following)
  renderer.render(scene, camera); // Render the scene
}

/** Handles window resize events */
function onWindowResize() {
  if (!camera || !renderer) return; // Guard against resize before init
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

/**
 * Initializes and starts the animation loop.
 * @param {THREE.Scene} scn
 * @param {THREE.Camera} cam
 * @param {THREE.WebGLRenderer} rend
 * @param {OrbitControls} ctrl
 * @param {Array} bodies - Array of celestial body objects.
 */
export function startAnimation(scn, cam, rend, ctrl, bodies) {
  scene = scn;
  camera = cam;
  renderer = rend;
  controls = ctrl;
  celestialBodies = bodies;

  window.addEventListener("resize", onWindowResize);
  console.log("Starting animation loop.");
  animate(); // Start the loop
}
