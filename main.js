import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

// --- Basic Scene Setup ---
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  3000
); // Increased far plane
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
document.body.appendChild(renderer.domElement);

// --- Controls ---
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.minDistance = 1; // Allow closer zoom
controls.maxDistance = 1000; // Allow zooming further out

// --- Lighting ---

// REDUCE Ambient Light significantly. This is the light that fills the scene
// uniformly. Lowering it makes shadows and non-directly lit areas darker.
// Start with a fairly low value like 0x252525 (dark grey). Adjust if it's too dark.
const ambientLight = new THREE.AmbientLight(0x999999); // Darker ambient light
scene.add(ambientLight);

// INCREASE Point Light intensity. This light originates from the Sun's position
// and illuminates surfaces facing it. Making this stronger enhances the contrast
// between the lit and unlit sides. Keep distance = 0 for infinite range.
const pointLight = new THREE.PointLight(0xffffff, 9999, 100); // Increased intensity
// Optional: Add decay for more realistic falloff (planets further away get less light)
// pointLight.decay = 2; // Use 2 for physically correct decay, but might make outer planets very dim. Start without it.
scene.add(pointLight); // Positioned at (0,0,0) by default (Sun's location)

// You might also want a subtle HemisphereLight for slightly more natural lighting
// This adds light from above (skyColor) and below (groundColor). It can soften
// pure black shadows slightly without washing out the scene like strong ambient light.
// const hemisphereLight = new THREE.HemisphereLight(0x606060, 0x101010, 0.8); // Sky, Ground, Intensity
// scene.add(hemisphereLight);
// Experiment: You might use HemisphereLight INSTEAD of or in ADDITION to AmbientLight.
// If using HemisphereLight, you might lower AmbientLight even further (e.g., 0x101010) or remove it.

// --- Texture Loader ---
const textureLoader = new THREE.TextureLoader();

// +++ Global Speed Multiplier +++
const globalSpeedMultiplier = 10; // Adjust this value (e.g., 2, 5, 10) to speed up/slow down everything

// --- Celestial Body Data (Pluto included) ---
const solarSystemData = [
  {
    name: "Sun",
    radius: 5, // Visual radius
    texture: "textures/sun_texture.jpg",
    orbitalRadius: 0,
    orbitalSpeed: 0,
    rotationSpeed: 0.005,
    isLightSource: true, // Use MeshBasicMaterial for Sun
    info: {
      description:
        "The star at the center of our Solar System. It's a nearly perfect ball of hot plasma...",
      details: [
        "Type: G-type main-sequence star (G2V)",
        "Age: ~4.6 billion years",
        "Diameter: ~1.39 million km",
        "Surface Temp: ~5,500 °C",
      ],
    },
  },
  {
    name: "Mercury",
    radius: 0.5,
    texture: "textures/mercury_texture.jpg",
    orbitalRadius: 15,
    orbitalSpeed: 0.04 * 1.5,
    rotationSpeed: 0.002,
    info: {
      description:
        "The smallest planet in the Solar System and closest to the Sun...",
      details: [
        "Type: Terrestrial Planet",
        "Diameter: ~4,880 km",
        "Orbital Period: ~88 Earth days",
        "Surface Temp: -173 to 427 °C",
      ],
    },
  },
  {
    name: "Venus",
    radius: 0.9,
    texture: "textures/venus_texture.jpg",
    orbitalRadius: 22,
    orbitalSpeed: 0.025 * 1.5,
    rotationSpeed: -0.0015, // NEGATIVE for retrograde, slightly faster magnitude
    info: {
      description:
        "The second planet from the Sun, often called Earth's 'sister planet'...",
      details: [
        "Type: Terrestrial Planet",
        "Diameter: ~12,104 km",
        "Orbital Period: ~225 Earth days",
        "Surface Temp: ~462 °C (hottest!)",
      ],
    },
  },
  {
    name: "Earth",
    radius: 1,
    texture: "textures/earth_texture.jpg",
    orbitalRadius: 30,
    orbitalSpeed: 0.015 * 1.5,
    rotationSpeed: 0.01,
    info: {
      description: "Our home planet, the third from the Sun...",
      details: [
        "Type: Terrestrial Planet",
        "Diameter: ~12,742 km",
        "Orbital Period: ~365.25 days",
        "Surface Temp: Avg ~15 °C",
      ],
    },
  },
  {
    name: "Mars",
    radius: 0.7,
    texture: "textures/mars_texture.jpg",
    orbitalRadius: 40,
    orbitalSpeed: 0.01 * 1.5,
    rotationSpeed: 0.0095,
    info: {
      description:
        "The fourth planet from the Sun, known as the 'Red Planet'...",
      details: [
        "Type: Terrestrial Planet",
        "Diameter: ~6,779 km",
        "Orbital Period: ~687 Earth days",
        "Surface Temp: -153 to 20 °C",
      ],
    },
  },
  {
    name: "Jupiter",
    radius: 3.5,
    texture: "textures/jupiter_texture.jpg",
    orbitalRadius: 65,
    orbitalSpeed: 0.005 * 1.5,
    rotationSpeed: 0.022,
    info: {
      description: "The largest planet in our Solar System, a gas giant...",
      details: [
        "Type: Gas Giant",
        "Diameter: ~139,820 km",
        "Orbital Period: ~11.9 Earth years",
        "Cloud Top Temp: ~-145 °C",
      ],
    },
  },
  {
    name: "Saturn",
    radius: 3,
    texture: "textures/saturn_texture.jpg",
    orbitalRadius: 90,
    orbitalSpeed: 0.003 * 1.5,
    rotationSpeed: 0.02,
    info: {
      description:
        "The sixth planet, a gas giant famous for its extensive ring system...",
      details: [
        "Type: Gas Giant",
        "Diameter: ~116,460 km (without rings)",
        "Orbital Period: ~29.5 Earth years",
        "Cloud Top Temp: ~-178 °C",
      ],
    },
    addRings: true,
  },
  {
    name: "Uranus",
    radius: 2,
    texture: "textures/uranus_texture.jpg",
    orbitalRadius: 120,
    orbitalSpeed: 0.002 * 1.5,
    rotationSpeed: 0.015,
    axialTilt: 97.77 * (Math.PI / 180), // Approx 98 degrees tilt in radians
    info: {
      description:
        "The seventh planet, an ice giant with a unique feature: it rotates on its side...",
      details: [
        "Type: Ice Giant",
        "Diameter: ~50,724 km",
        "Orbital Period: ~84 Earth years",
        "Cloud Top Temp: ~-216 °C",
      ],
    },
  },
  {
    name: "Neptune",
    radius: 1.9,
    texture: "textures/neptune_texture.jpg",
    orbitalRadius: 150,
    orbitalSpeed: 0.001 * 1.5,
    rotationSpeed: 0.014,
    info: {
      description: "The eighth and farthest known planet from the Sun...",
      details: [
        "Type: Ice Giant",
        "Diameter: ~49,244 km",
        "Orbital Period: ~165 Earth years",
        "Cloud Top Temp: ~-214 °C",
      ],
    },
  },
  {
    name: "Pluto", // Dwarf Planet
    radius: 0.3,
    texture: "textures/pluto_texture.jpg", // Make sure you have this texture
    orbitalRadius: 180,
    orbitalSpeed: 0.0005 * 1.5,
    rotationSpeed: 0.003,
    info: {
      description: "A dwarf planet in the Kuiper Belt...",
      details: [
        "Type: Dwarf Planet (Kuiper Belt Object)",
        "Diameter: ~2,377 km",
        "Orbital Period: ~248 Earth years",
        "Surface Temp: ~-229 °C",
      ],
    },
  },
];

// --- Create Celestial Bodies and Orbits ---
const celestialBodies = [];
const orbitGroup = new THREE.Group();
scene.add(orbitGroup);

// Temporary vector for calculations
const tempWorldPos = new THREE.Vector3();

solarSystemData.forEach((data) => {
  const geometry = new THREE.SphereGeometry(data.radius, 32, 32);

  let material;
  if (data.isLightSource) {
    // Sun uses MeshBasicMaterial - doesn't need light
    material = new THREE.MeshBasicMaterial({
      map: textureLoader.load(data.texture),
    });
  } else {
    // Planets use MeshStandardMaterial - reacts to light
    material = new THREE.MeshStandardMaterial({
      map: textureLoader.load(data.texture),
    });
  }

  const mesh = new THREE.Mesh(geometry, material);
  mesh.name = data.name;
  mesh.userData = data;

  // +++ Apply Axial Tilt if specified (BEFORE adding to group) +++
  if (data.axialTilt) {
    // Tilt the mesh itself around the Z-axis (or X, depending on desired orientation)
    // Z-axis tilt makes it look like it's rolling along its orbit path
    mesh.rotation.z = data.axialTilt;
  }

  const objectGroup = new THREE.Group(); // Group for positioning and orbital rotation
  objectGroup.add(mesh); // Add mesh to its group

  // Add Rings for Saturn
  if (data.addRings) {
    const ringGeometry = new THREE.RingGeometry(
      data.radius * 1.2,
      data.radius * 2.2,
      64
    );
    const pos = ringGeometry.attributes.position;
    const v3 = new THREE.Vector3();
    for (let i = 0; i < pos.count; i++) {
      v3.fromBufferAttribute(pos, i);
      ringGeometry.attributes.uv.setXY(
        i,
        v3.length() < data.radius * 1.7 ? 0 : 1,
        1
      );
    }
    ringGeometry.rotateX(-Math.PI / 2);

    const ringMaterial = new THREE.MeshBasicMaterial({
      // Basic material for rings often looks better
      map: textureLoader.load("textures/saturn_ring_texture.png"),
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.8,
    });
    const ringMesh = new THREE.Mesh(ringGeometry, ringMaterial);
    objectGroup.add(ringMesh);
  }

  scene.add(objectGroup);
  celestialBodies.push({ mesh, group: objectGroup, data });

  // Orbit Path
  if (data.orbitalRadius > 0) {
    const orbitPoints = [];
    const segments = 128;
    for (let i = 0; i <= segments; i++) {
      const angle = (i / segments) * Math.PI * 2;
      orbitPoints.push(
        new THREE.Vector3(
          Math.cos(angle) * data.orbitalRadius,
          0,
          Math.sin(angle) * data.orbitalRadius
        )
      );
    }
    const orbitGeometry = new THREE.BufferGeometry().setFromPoints(orbitPoints);
    const orbitMaterial = new THREE.LineBasicMaterial({
      color: 0xaaaaaa,
      transparent: true,
      opacity: 0.3,
    });
    const orbitLine = new THREE.Line(orbitGeometry, orbitMaterial);
    orbitGroup.add(orbitLine);
  }
});

// --- Background Stars ---
const starGeometry = new THREE.SphereGeometry(1500, 64, 64); // Made slightly larger
const starMaterial = new THREE.MeshBasicMaterial({
  map: textureLoader.load("textures/starfield_texture.jpg"),
  side: THREE.BackSide,
});
const starField = new THREE.Mesh(starGeometry, starMaterial);
scene.add(starField);

// --- Raycaster for Interaction ---
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();
let selectedObject = null; // Keep track of the focused object's MESH
let selectedObjectData = null; // Keep track of the focused object's DATA

// --- Info Panel Elements ---
const infoTitle = document.getElementById("info-title");
const infoDescription = document.getElementById("info-description");
const infoDetails = document.getElementById("info-details");

// Function to display info
function displayInfo(data) {
  if (!data) {
    // Reset to default solar system info
    infoTitle.textContent = "Solar System";
    infoDescription.textContent =
      "Welcome to this interactive 3D model... Click or tap on a celestial body.";
    infoDetails.innerHTML = "";
    return;
  }
  infoTitle.textContent = data.name;
  infoDescription.textContent = data.info.description;
  infoDetails.innerHTML = data.info.details
    .map(
      (detail) => `<li>${detail.replace(/:(.*)/, ":<strong>$1</strong>")}</li>`
    )
    .join("");
}

// Function to handle clicks/taps
function onClick(event) {
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
  raycaster.setFromCamera(mouse, camera);
  const intersects = raycaster.intersectObjects(
    celestialBodies.map((cb) => cb.mesh)
  );

  if (intersects.length > 0) {
    const clickedMesh = intersects[0].object;

    if (selectedObject !== clickedMesh) {
      selectedObject = clickedMesh;
      selectedObjectData = clickedMesh.userData; // Store the data associated with the mesh
      console.log("Selected:", selectedObjectData.name);
      displayInfo(selectedObjectData);

      // --- Adjust Camera Logic ---
      const targetPosition = selectedObject.getWorldPosition(
        new THREE.Vector3()
      ); // Use a new vector

      // Calculate offset distance based on the selected object's radius
      const offsetDistance = selectedObjectData.radius * 5 + 10; // Adjust multiplier and base distance

      // Set controls target immediately (it will be updated in animate)
      controls.target.copy(targetPosition);

      // Adjust zoom limits based on the selected object
      controls.maxDistance = offsetDistance * 5;
      controls.minDistance = selectedObjectData.radius * 1.2; // Allow closer zoom
      controls.update(); // Apply target change immediately
    }
  } else {
    // Clicked on empty space - Reset view
    if (selectedObject) {
      console.log("Deselected");
      selectedObject = null;
      selectedObjectData = null;
      displayInfo(null); // Show default info
      controls.target.set(0, 0, 0); // Reset target to center (Sun)
      // Restore default zoom limits
      controls.minDistance = 1;
      controls.maxDistance = 1000;
      controls.update();
    }
  }
}

window.addEventListener("click", onClick);

// --- Initial Setup ---
camera.position.set(0, 70, 150); // Adjusted initial camera slightly
controls.target.set(0, 0, 0);
displayInfo(null);

// --- Animation Loop ---
const clock = new THREE.Clock();

function animate() {
  requestAnimationFrame(animate);

  const deltaTime = clock.getDelta();
  const elapsedTime = clock.getElapsedTime();

  // Animate celestial bodies
  celestialBodies.forEach((cb) => {
    // Rotation
    cb.mesh.rotation.y +=
      cb.data.rotationSpeed * deltaTime * globalSpeedMultiplier; // Adjusted visual speed multiplier

    // Orbit
    if (cb.data.orbitalRadius > 0) {
      const angle = elapsedTime * cb.data.orbitalSpeed * globalSpeedMultiplier;
      cb.group.position.x = Math.cos(angle) * cb.data.orbitalRadius;
      cb.group.position.z = Math.sin(angle) * cb.data.orbitalRadius;
    }
  });

  // --- Camera Following Logic ---
  if (selectedObject) {
    // Get the latest world position of the selected object
    selectedObject.getWorldPosition(tempWorldPos);
    // Update the controls target to follow the object
    controls.target.copy(tempWorldPos);
  }

  controls.update(); // Required for damping and target updates
  renderer.render(scene, camera);
}

// --- Handle Window Resize ---
function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}
window.addEventListener("resize", onWindowResize);

// --- Start Animation ---
animate();
