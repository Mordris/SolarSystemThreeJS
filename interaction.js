// interaction.js - Handles user input, selection logic, and info panel updates

import * as THREE from "three";

// Module-level variables to store references and state
let camera, controls, celestialBodies, infoTitle, infoDescription, infoDetails;
let selectedObject = null; // The currently selected MESH
let selectedObjectData = null; // Data associated with the selected mesh
const raycaster = new THREE.Raycaster();
const pointer = new THREE.Vector2();
const tempTargetPos = new THREE.Vector3(); // Reusable vector for target calculation

/** Updates the info panel display. */
function displayInfo(data) {
  if (!data) {
    // Reset to default view
    infoTitle.textContent = "Solar System";
    infoDescription.textContent =
      "Interactive 3D model. Click a celestial body to learn more.";
    infoDetails.innerHTML = "";
    return;
  }
  // Display specific body info
  infoTitle.textContent = data.name;
  infoDescription.textContent =
    data.info?.description || "No description available.";
  infoDetails.innerHTML =
    data.info?.details
      ?.map(
        (detail) =>
          `<li>${detail.replace(/:(.*)/, ":<strong>$1</strong>")}</li>`
      )
      .join("") || ""; // Handle missing details array gracefully
}

/** Selects a celestial body and updates camera/controls. */
function selectObject(objectMesh) {
  // Only proceed if a NEW object is selected
  if (selectedObject !== objectMesh) {
    selectedObject = objectMesh;
    selectedObjectData = objectMesh.userData;
    console.log("Selected:", selectedObjectData.name);
    displayInfo(selectedObjectData); // Update info panel

    // Calculate appropriate zoom distance
    // Use getWorldPosition to ensure correct position even for moons
    selectedObject.getWorldPosition(tempTargetPos);
    const offsetDistance = (selectedObjectData.radius || 1) * 5 + 10; // Base distance on radius

    // Update OrbitControls target and zoom limits
    // The target MUST be updated continuously in the animation loop for follow effect
    controls.maxDistance = offsetDistance * 6;
    controls.minDistance = (selectedObjectData.radius || 1) * 1.2;
    // NOTE: controls.target is set in the animation loop when an object is selected
    controls.update(); // Apply distance changes
  }
}

// No separate deselect function needed based on the requirement
// (only deselect implicitly when selecting another object)

/** Handles pointer down events (click/tap). */
function onPointerDown(event) {
  pointer.x = (event.clientX / window.innerWidth) * 2 - 1;
  pointer.y = -(event.clientY / window.innerHeight) * 2 + 1;
  raycaster.setFromCamera(pointer, camera);

  const intersects = raycaster.intersectObjects(
    celestialBodies.map((cb) => cb.mesh)
  );

  if (intersects.length > 0) {
    // Clicked ON a celestial body - select it
    selectObject(intersects[0].object);
  }
  // No action needed if clicking empty space (no deselection)
}

/**
 * Initializes interaction handling.
 * @param {THREE.Camera} cam
 * @param {OrbitControls} ctrl
 * @param {Array} bodies - The array of celestial body objects.
 * @param {object} panelElements - DOM elements for the info panel.
 */
export function setupInteraction(cam, ctrl, bodies, panelElements) {
  camera = cam;
  controls = ctrl;
  celestialBodies = bodies;
  infoTitle = panelElements.title;
  infoDescription = panelElements.description;
  infoDetails = panelElements.details;

  window.addEventListener("pointerdown", onPointerDown);
  displayInfo(null); // Show initial default info
  console.log("Interaction setup complete.");
}

/**
 * Gets the currently selected object's mesh.
 * Used by the animation loop for camera following.
 * @returns {THREE.Mesh | null} The selected mesh or null.
 */
export function getSelectedObject() {
  return selectedObject;
}
