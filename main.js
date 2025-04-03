// main.js - Application entry point

import { setupScene } from "./sceneSetup.js";
import { createSolarSystem } from "./celestialBodyUtils.js";
import { setupInteraction } from "./interaction.js";
import { startAnimation } from "./animation.js";

// --- Initialization ---

// 1. Setup Core Three.js Components
const { scene, camera, renderer, controls } = setupScene();

// 2. Create Celestial Bodies & Starfield
// createSolarSystem returns the list needed for interaction/animation
const { celestialBodies } = createSolarSystem(scene);

// 3. Setup User Interaction
const infoPanelElements = {
  title: document.getElementById("info-title"),
  description: document.getElementById("info-description"),
  details: document.getElementById("info-details"),
};
setupInteraction(camera, controls, celestialBodies, infoPanelElements);

// 4. Start the Animation Loop
startAnimation(scene, camera, renderer, controls, celestialBodies);

console.log("Solar System application initialized.");
