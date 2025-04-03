// celestialBodyUtils.js - Creates planets, moons, rings, orbits, and stars

import * as THREE from "three";
import { solarSystemData } from "./data.js"; // Import data

const textureLoader = new THREE.TextureLoader();

/**
 * Creates all celestial bodies, orbits, and the starfield based on solarSystemData.
 * @param {THREE.Scene} scene - The main Three.js scene.
 * @returns {object} Object containing the array of celestial bodies.
 */
export function createSolarSystem(scene) {
  const celestialBodies = []; // Stores { mesh, group, data } for ALL bodies
  const bodyGroups = {}; // Map to store parent groups for moon attachment
  const orbitGroup = new THREE.Group(); // Group for Sun-centered orbits
  scene.add(orbitGroup);

  // --- First Pass: Create primary bodies (Sun, Planets, Dwarf Planets) ---
  solarSystemData.forEach((data) => {
    const geometry = new THREE.SphereGeometry(data.radius, 32, 32);

    let material;
    if (data.isLightSource) {
      material = new THREE.MeshBasicMaterial({
        map: textureLoader.load(data.texture),
      });
    } else {
      material = new THREE.MeshStandardMaterial({
        map: textureLoader.load(data.texture),
        roughness: 0.85,
        metalness: 0.1,
      });
    }

    const mesh = new THREE.Mesh(geometry, material);
    mesh.name = data.name;
    mesh.userData = data;

    if (data.axialTilt) {
      mesh.rotation.z = data.axialTilt;
    }

    const objectGroup = new THREE.Group();
    objectGroup.add(mesh);

    // Add Rings
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
        map: textureLoader.load("textures/saturn_ring_texture.png"),
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.8,
      });
      const ringMesh = new THREE.Mesh(ringGeometry, ringMaterial);
      objectGroup.add(ringMesh);
    }

    scene.add(objectGroup);
    bodyGroups[data.name] = objectGroup; // Store group for moon attachment
    celestialBodies.push({ mesh, group: objectGroup, data }); // Add to master list

    // Sun Orbit Path
    if (data.orbitalRadius > 0) {
      const segments = 128;
      const orbitPoints = Array.from({ length: segments + 1 }, (_, i) => {
        const angle = (i / segments) * Math.PI * 2;
        return new THREE.Vector3(
          Math.cos(angle) * data.orbitalRadius,
          0,
          Math.sin(angle) * data.orbitalRadius
        );
      });
      const orbitGeometry = new THREE.BufferGeometry().setFromPoints(
        orbitPoints
      );
      const orbitMaterial = new THREE.LineBasicMaterial({
        color: 0xaaaaaa,
        transparent: true,
        opacity: 0.25,
      });
      const orbitLine = new THREE.Line(orbitGeometry, orbitMaterial);
      orbitGroup.add(orbitLine);
    }
  });

  // --- Second Pass: Create Moons and attach ---
  solarSystemData.forEach((parentData) => {
    if (parentData.moons?.length > 0) {
      // Use optional chaining
      const parentGroup = bodyGroups[parentData.name];
      if (!parentGroup) return; // Skip if parent not found

      parentData.moons.forEach((moonData) => {
        const moonGeometry = new THREE.SphereGeometry(moonData.radius, 16, 16);
        const moonMaterial = new THREE.MeshStandardMaterial({
          map: textureLoader.load(moonData.texture),
          roughness: 0.9,
          metalness: 0.1,
        });
        const moonMesh = new THREE.Mesh(moonGeometry, moonMaterial);
        moonMesh.name = moonData.name;
        moonData.parent = parentData.name;
        moonMesh.userData = moonData;

        const moonGroup = new THREE.Group();
        moonGroup.add(moonMesh);

        parentGroup.add(moonGroup); // Attach moon group to parent group

        celestialBodies.push({
          mesh: moonMesh,
          group: moonGroup,
          data: moonData,
        }); // Add to master list

        // Moon Orbit Path
        if (moonData.orbitalRadius > 0) {
          const segments = 64;
          const orbitPoints = Array.from({ length: segments + 1 }, (_, i) => {
            const angle = (i / segments) * Math.PI * 2;
            return new THREE.Vector3(
              Math.cos(angle) * moonData.orbitalRadius,
              0,
              Math.sin(angle) * moonData.orbitalRadius
            );
          });
          const orbitGeometry = new THREE.BufferGeometry().setFromPoints(
            orbitPoints
          );
          const orbitMaterial = new THREE.LineBasicMaterial({
            color: 0x888888,
            transparent: true,
            opacity: 0.4,
          });
          const orbitLine = new THREE.Line(orbitGeometry, orbitMaterial);
          parentGroup.add(orbitLine); // Add orbit to parent group
        }
      });
    }
  });

  // --- Background Stars ---
  const starGeometry = new THREE.SphereGeometry(2000, 64, 64);
  const starMaterial = new THREE.MeshBasicMaterial({
    map: textureLoader.load("textures/starfield_texture.jpg"),
    side: THREE.BackSide,
  });
  const starField = new THREE.Mesh(starGeometry, starMaterial);
  scene.add(starField);

  console.log("Celestial bodies created:", celestialBodies.length);
  return { celestialBodies }; // Return the list of bodies
}
