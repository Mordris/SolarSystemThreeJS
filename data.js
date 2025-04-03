// =============================================================================
// data.js - Stores configuration data for celestial bodies
// =============================================================================
// Contains visual parameters (radius, speeds) and informational text for display.
// Note: Radii and distances are scaled for visualization, not astronomical accuracy.
// Speeds are relative for visual effect. Data sourced from NASA & general astronomy resources.

// +++ Global Speed Multiplier +++
// Adjust this value (e.g., 1, 5, 10, 20) to speed up/slow down the simulation
export const globalSpeedMultiplier = 5;

// --- Celestial Body Data ---
export const solarSystemData = [
  // --- Sun ---
  {
    name: "Sun",
    radius: 7,
    texture: "textures/sun_texture.jpg",
    orbitalRadius: 0,
    orbitalSpeed: 0,
    rotationSpeed: 0.004,
    isLightSource: true,
    info: {
      description:
        "The star at the center of our Solar System. Its gravity holds the system together. It's a nearly perfect ball of hot plasma, heated by nuclear fusion reactions in its core.",
      details: [
        "Type: G-type main-sequence star (G2V)",
        "Age: ~4.6 billion years",
        "Diameter: ~1.39 million km (109x Earth)",
        "Mass: ~333,000 x Earth",
        "Surface Temp: ~5,500 °C",
        "Core Temp: ~15 million °C",
        "Composition: ~74% Hydrogen, ~24% Helium",
      ],
    },
  },
  // --- Inner Planets ---
  {
    name: "Mercury",
    radius: 0.5,
    texture: "textures/mercury_texture.jpg",
    orbitalRadius: 18,
    orbitalSpeed: 0.04 * 1.6,
    rotationSpeed: 0.002,
    info: {
      description:
        "The smallest planet in the Solar System and closest to the Sun. It has a heavily cratered surface resembling Earth's Moon and extreme temperature variations.",
      details: [
        "Type: Terrestrial Planet",
        "Diameter: ~4,880 km",
        "Avg Distance from Sun: ~58 million km",
        "Orbital Period (Year): ~88 Earth days",
        "Rotation Period (Day): ~59 Earth days",
        "Surface Temp: -173°C to 427°C",
        "Moons: 0",
        "Atmosphere: Very thin (exosphere)",
        "Gravity: ~0.38 x Earth",
      ],
    },
  },
  {
    name: "Venus",
    radius: 0.9,
    texture: "textures/venus_texture.jpg",
    orbitalRadius: 25,
    orbitalSpeed: 0.025 * 1.6,
    rotationSpeed: -0.0015, // Retrograde
    info: {
      description:
        "Often called Earth's 'sister planet' due to similar size and mass. It has a thick, toxic atmosphere of carbon dioxide and sulfuric acid clouds, creating a runaway greenhouse effect.",
      details: [
        "Type: Terrestrial Planet",
        "Diameter: ~12,104 km",
        "Avg Distance from Sun: ~108 million km",
        "Orbital Period (Year): ~225 Earth days",
        "Rotation Period (Day): ~243 Earth days (Retrograde!)",
        "Surface Temp: ~462 °C (Hottest planet!)",
        "Moons: 0",
        "Atmosphere: Thick CO2 (92x Earth pressure)",
        "Gravity: ~0.91 x Earth",
      ],
    },
  },
  {
    name: "Earth",
    radius: 1,
    texture: "textures/earth_texture.jpg",
    orbitalRadius: 35,
    orbitalSpeed: 0.015 * 1.6,
    rotationSpeed: 0.01,
    info: {
      description:
        "Our home planet, the third from the Sun and the only known place in the universe to harbor life. It has liquid water on its surface and a protective atmosphere.",
      details: [
        "Type: Terrestrial Planet",
        "Diameter: ~12,742 km",
        "Avg Distance from Sun: ~150 million km (1 AU)",
        "Orbital Period (Year): ~365.25 days",
        "Rotation Period (Day): ~23.9 hours",
        "Axial Tilt: ~23.5 degrees",
        "Surface Temp: Avg ~15 °C",
        "Moons: 1 (The Moon)",
        "Atmosphere: Nitrogen, Oxygen",
        "Gravity: 1 G (standard)",
      ],
    },
    moons: [
      {
        name: "Moon",
        radius: 0.27,
        texture: "textures/moon_texture.jpg",
        orbitalRadius: 3,
        orbitalSpeed: 0.05,
        rotationSpeed: 0.005, // Rotation can approximate tidal lock visually
        info: {
          description:
            "Earth's only natural satellite and the fifth largest moon in the Solar System. Its gravitational pull causes Earth's tides.",
          details: [
            "Type: Natural Satellite",
            "Diameter: ~3,474 km",
            "Orbit (Earth): ~27.3 days",
            "Rotation: Tidally locked (same side always faces Earth)",
            "Surface Temp: -173°C to 127°C",
            "Gravity: ~0.165 x Earth",
            "Atmosphere: Negligible",
          ],
        },
      },
    ],
  },
  {
    name: "Mars",
    radius: 0.7,
    texture: "textures/mars_texture.jpg",
    orbitalRadius: 48,
    orbitalSpeed: 0.01 * 1.6,
    rotationSpeed: 0.0095,
    info: {
      description:
        "Known as the 'Red Planet' due to iron oxide on its surface. It's a cold, desert world with polar ice caps, canyons, extinct volcanoes (including Olympus Mons, the largest), and evidence of past liquid water.",
      details: [
        "Type: Terrestrial Planet",
        "Diameter: ~6,779 km",
        "Avg Distance from Sun: ~228 million km",
        "Orbital Period (Year): ~687 Earth days",
        "Rotation Period (Day): ~24.6 hours (Similar to Earth)",
        "Axial Tilt: ~25.2 degrees (Similar to Earth)",
        "Surface Temp: -153°C to 20°C",
        "Moons: 2 (Phobos, Deimos)",
        "Atmosphere: Thin CO2",
        "Gravity: ~0.38 x Earth",
      ],
    },
  },
  // --- Asteroid Belt ---
  {
    name: "Ceres",
    radius: 0.25,
    texture: "textures/ceres_texture.jpg",
    orbitalRadius: 60,
    orbitalSpeed: 0.007 * 1.6,
    rotationSpeed: 0.008,
    info: {
      description:
        "The largest object in the asteroid belt between Mars and Jupiter, and the only dwarf planet located in the inner Solar System. It may contain a significant amount of water ice.",
      details: [
        "Type: Dwarf Planet (Asteroid Belt)",
        "Diameter: ~940 km",
        "Avg Distance from Sun: ~414 million km",
        "Orbital Period (Year): ~4.6 Earth years",
        "Rotation Period (Day): ~9 hours",
        "Surface Temp: Avg ~-105 °C",
        "Moons: 0",
        "Gravity: ~0.029 x Earth",
      ],
    },
  },
  // --- Outer Planets ---
  {
    name: "Jupiter",
    radius: 4.0,
    texture: "textures/jupiter_texture.jpg",
    orbitalRadius: 85,
    orbitalSpeed: 0.005 * 1.6,
    rotationSpeed: 0.022,
    info: {
      description:
        "The largest planet in our Solar System, a gas giant primarily composed of hydrogen and helium. Famous for its Great Red Spot, a persistent giant storm, and its strong magnetic field.",
      details: [
        "Type: Gas Giant",
        "Diameter: ~139,820 km (11x Earth)",
        "Avg Distance from Sun: ~778 million km",
        "Orbital Period (Year): ~11.9 Earth years",
        "Rotation Period (Day): ~9.9 hours (Fastest rotation)",
        "Cloud Top Temp: ~-145 °C",
        "Moons: 95+ (incl. Io, Europa, Ganymede, Callisto)",
        "Atmosphere: Hydrogen, Helium",
        "Gravity: ~2.53 x Earth",
      ],
    },
  },
  {
    name: "Saturn",
    radius: 3.5,
    texture: "textures/saturn_texture.jpg",
    orbitalRadius: 120,
    orbitalSpeed: 0.003 * 1.6,
    rotationSpeed: 0.02,
    addRings: true,
    info: {
      description:
        "The sixth planet, a gas giant famous for its extensive and spectacular ring system, composed mostly of ice particles. It's the least dense planet in the Solar System.",
      details: [
        "Type: Gas Giant",
        "Diameter: ~116,460 km (9x Earth, w/o rings)",
        "Avg Distance from Sun: ~1.4 billion km",
        "Orbital Period (Year): ~29.5 Earth years",
        "Rotation Period (Day): ~10.7 hours",
        "Cloud Top Temp: ~-178 °C",
        "Moons: 146+ (incl. Titan, Enceladus)",
        "Atmosphere: Hydrogen, Helium",
        "Gravity: ~1.06 x Earth",
        "Feature: Prominent Ring System",
      ],
    },
  },
  {
    name: "Uranus",
    radius: 2.5,
    texture: "textures/uranus_texture.jpg",
    orbitalRadius: 160,
    orbitalSpeed: 0.002 * 1.6,
    rotationSpeed: 0.016,
    axialTilt: 97.77 * (Math.PI / 180),
    info: {
      description:
        "The seventh planet, an ice giant with a unique feature: it rotates on its side, with its axis tilted almost parallel to its orbit, possibly due to a past collision.",
      details: [
        "Type: Ice Giant",
        "Diameter: ~50,724 km (4x Earth)",
        "Avg Distance from Sun: ~2.9 billion km",
        "Orbital Period (Year): ~84 Earth years",
        "Rotation Period (Day): ~17.2 hours (Retrograde)",
        "Axial Tilt: ~97.8 degrees (Extreme!)",
        "Cloud Top Temp: ~-216 °C",
        "Moons: 27+ (incl. Titania, Oberon)",
        "Atmosphere: Hydrogen, Helium, Methane (causes blue color)",
        "Gravity: ~0.89 x Earth",
      ],
    },
  },
  {
    name: "Neptune",
    radius: 2.4,
    texture: "textures/neptune_texture.jpg",
    orbitalRadius: 200,
    orbitalSpeed: 0.001 * 1.6,
    rotationSpeed: 0.015,
    info: {
      description:
        "The eighth and farthest known planet from the Sun (since Pluto's reclassification). It's a dark, cold ice giant with the strongest winds in the Solar System and occasional large dark storms.",
      details: [
        "Type: Ice Giant",
        "Diameter: ~49,244 km (~3.9x Earth)",
        "Avg Distance from Sun: ~4.5 billion km",
        "Orbital Period (Year): ~165 Earth years",
        "Rotation Period (Day): ~16.1 hours",
        "Cloud Top Temp: ~-214 °C",
        "Moons: 14+ (incl. Triton)",
        "Atmosphere: Hydrogen, Helium, Methane",
        "Gravity: ~1.14 x Earth",
        "Feature: Supersonic Winds",
      ],
    },
  },
  // --- Outer Dwarf Planets ---
  {
    name: "Pluto",
    radius: 0.3,
    texture: "textures/pluto_texture.jpg",
    orbitalRadius: 240,
    orbitalSpeed: 0.0005 * 1.6,
    rotationSpeed: 0.003,
    info: {
      description:
        "A dwarf planet in the Kuiper Belt, a region of icy bodies beyond Neptune. It was considered the ninth planet until 2006. It has a surprisingly complex surface and a thin, seasonal atmosphere.",
      details: [
        "Type: Dwarf Planet (Kuiper Belt Object)",
        "Diameter: ~2,377 km",
        "Orbit: Highly Elliptical & Inclined",
        "Avg Distance from Sun: ~5.9 billion km",
        "Orbital Period (Year): ~248 Earth years",
        "Rotation Period (Day): ~6.4 Earth days (Retrograde)",
        "Surface Temp: Avg ~-229 °C",
        "Moons: 5 (incl. Charon)",
        "Atmosphere: Thin Nitrogen, Methane, CO (seasonal)",
        "Gravity: ~0.063 x Earth",
      ],
    },
  },
  {
    name: "Eris",
    radius: 0.32,
    texture: "textures/eris_texture.jpg",
    orbitalRadius: 280,
    orbitalSpeed: 0.0003 * 1.6,
    rotationSpeed: 0.002,
    info: {
      description:
        "One of the largest known dwarf planets, located in the scattered disc beyond the Kuiper Belt. Its discovery was a key factor in the IAU's 2006 definition of 'planet' and reclassification of Pluto.",
      details: [
        "Type: Dwarf Planet (Scattered Disc Object)",
        "Diameter: ~2,326 km (Similar to Pluto)",
        "Orbit: Very Elliptical & Inclined",
        "Avg Distance from Sun: ~10.1 billion km",
        "Orbital Period (Year): ~558 Earth years",
        "Rotation Period (Day): ~25.9 hours",
        "Surface Temp: Avg ~-240 °C",
        "Moons: 1 (Dysnomia)",
        "Gravity: ~0.084 x Earth (estimated)",
      ],
    },
  },
];
