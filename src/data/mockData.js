export const BRAND_INFO = {
  name: "8MOTO",
  fullName: "8Moto Bharat",
  founder: "Sangram Devekar Patil",
  headquarters: "Pune, Maharashtra, India",
  tagline: "Unleash The Sahyadri Monsoon. Master The Uncharted.",
  foundedYear: 2012,
  flagshipEvent: "Pune Offroad Expedition (POE)",
  coordinates: "18.5204° N, 73.8567° E",
  phone: "+91 98220 8MOTO",
  email: "expeditions@8moto.in",
  socials: {
    instagram: "https://instagram.com/8moto_bharat",
    youtube: "https://youtube.com/@8moto_india",
    facebook: "https://facebook.com/8moto.in"
  }
};

export const TELEMETRY_STATS = [
  { value: "13+", label: "POE Editions Conquered", sub: "Annual Flagship Since 2012" },
  { value: "5,200+", label: "Kilometers of Raw Trail", sub: "Sahyadri Rugged Terrain" },
  { value: "3,800+", label: "Riders & Drivers United", sub: "ADVs, Dirt Bikes & 4x4s" },
  { value: "100%", label: "Marshal & Safety Record", sub: "Medical & Winch Support" },
];

export const EXPEDITIONS = [
  {
    id: "poe-2026",
    title: "Pune Offroad Expedition (POE 14)",
    tag: "Flagship Annual Raid",
    isFlagship: true,
    difficulty: "Hard Enduro & Pro 4x4",
    difficultyLevel: 3,
    location: "Lavasa & Mulshi Valley, Pune",
    duration: "2 Days / 1 Night",
    elevation: "1,280m Peak",
    terrain: "Deep Monsoon Mud, River Boulders, Steep Slicks",
    dates: "August 15-16, 2026",
    seatsLeft: 24,
    image: "/images/poe_expedition.jpg",
    price: "₹6,499",
    category: ["ADV Motorcycle", "Enduro Dirt Bike", "4x4 SUV"],
    description: "The crown jewel of Indian off-roading. Tackle severe riverbed boulder crawls, 40-degree red clay slopes, and low-visibility ridge lines surrounded by the raging monsoon.",
    stages: [
      { name: "Stage 1: The Red Mud Gully", dist: "18 KM", terrain: "Clay Ruts & Trench Drops" },
      { name: "Stage 2: Boulder Bed Crossing", dist: "12 KM", terrain: "Submerged River Rocks" },
      { name: "Stage 3: The Fogline Incline", dist: "22 KM", terrain: "High-Altitude Mist & Slicks" }
    ]
  },
  {
    id: "sahyadri-ridge-recon",
    title: "Sahyadri Mountain Ridge Recon",
    tag: "High-Altitude ADV Tour",
    isFlagship: false,
    difficulty: "Intermediate Dual-Sport",
    difficultyLevel: 2,
    location: "Bhor & Varandha Ghats",
    duration: "Single Day Expedition",
    elevation: "1,150m",
    terrain: "Broken Tarmac, Loose Scree, Forest Trails",
    dates: "September 05, 2026",
    seatsLeft: 14,
    image: "/images/hero_monsoon.jpg",
    price: "₹3,299",
    category: ["ADV Motorcycle", "Scrambler"],
    description: "An exhilarating trail tracing ancient Maratha fortress ridges. Perfect for ADV riders looking to push past tarmac limitations into technical forest trails.",
    stages: [
      { name: "Stage 1: Waterfall Pass", dist: "25 KM", terrain: "Gravel & Stream Forcing" },
      { name: "Stage 2: Fort Ridge Climb", dist: "19 KM", terrain: "Loose Shale & Rutted Hairpins" }
    ]
  },
  {
    id: "konkan-riverbed-cross",
    title: "Konkan Rainforest Riverbed Raid",
    tag: "Hardcore 4x4 & Enduro",
    isFlagship: false,
    difficulty: "Hard Enduro & 4x4 Crawl",
    difficultyLevel: 3,
    location: "Tamhini & Konkan Foothills",
    duration: "2 Days Camp Out",
    elevation: "890m",
    terrain: "Submerged Boulders, Jungle Creeks, Quicksand",
    dates: "October 10-11, 2026",
    seatsLeft: 8,
    image: "/images/poe_expedition.jpg",
    price: "₹7,999",
    category: ["4x4 SUV", "Enduro Dirt Bike"],
    description: "Deep into the dense Western Ghats rainforest. Involves continuous winch recovery, rocky stream navigation, and overnight jungle trail bivouac.",
    stages: [
      { name: "Stage 1: The Black Water Crossing", dist: "14 KM", terrain: "River Bed & Silt" },
      { name: "Stage 2: Devil's Staircase", dist: "16 KM", terrain: "45° Wet Basalt Steps" }
    ]
  },
  {
    id: "trail-scout-intro",
    title: "Trail Scout: Fundamentals Safari",
    tag: "Beginner & Soft-Roader Friendly",
    isFlagship: false,
    difficulty: "Novice & Intermediate",
    difficultyLevel: 1,
    location: "Panshet Backwaters, Pune",
    duration: "Single Day Run",
    elevation: "750m",
    terrain: "Lakeside Mud, Grassy Hills, Light Gravel",
    dates: "Every Alternate Sunday",
    seatsLeft: 19,
    image: "/images/poe_expedition.jpg",
    price: "₹2,199",
    category: ["ADV Motorcycle", "Stock 4x4 / AWD"],
    description: "The ideal gateway into trail riding. Guided by certified 8Moto marshals, this relaxed expedition teaches throttle control, tire air-down strategies, and safe water crossing.",
    stages: [
      { name: "Stage 1: Lakeside Drift Ruts", dist: "20 KM", terrain: "Grass & Firm Dirt" },
      { name: "Stage 2: Splashdown Creek", dist: "15 KM", terrain: "Shallow Pebble River" }
    ]
  }
];

export const ACADEMY_COURSES = [];

export const SAFETY_PILLARS = [
  {
    icon: "ShieldAlert",
    title: "Paramedic & Trauma Quick Response",
    desc: "Mobile medical unit equipped with splints, oxygen, and emergency trauma triage trailing every batch."
  },
  {
    icon: "Wrench",
    title: "Heavy Recovery 4x4 Fleet",
    desc: "Custom Gypsy & Thar rigs outfitted with 12,000lb Warn winches, plasma ropes, and heavy toolkits."
  },
  {
    icon: "Radio",
    title: "VHF Satellite & Trail Comms",
    desc: "Zero mobile network in the deep valley is never an issue — all trail marshals maintain live frequency contact."
  },
  {
    icon: "Navigation",
    title: "Reconnaissance Pre-Run GPS Check",
    desc: "Every trail is scouted 48 hours prior to event day to audit landslide risks and rising river levels."
  }
];

export const MEDIA_GALLERY = [
  {
    id: 1,
    title: "POE 13: The Lavasa Monsoon Deluge",
    type: "Photo Reel",
    category: "Expedition",
    image: "/images/hero_monsoon.jpg",
    caption: "Over 180 adventure motorcycles and 4x4 rigs tackling 1,200m ridge trails in relentless monsoon downpours."
  },
  {
    id: 2,
    title: "Rock Crawl Riverbed Showdown",
    type: "Highlight Reel",
    category: "Competition",
    image: "/images/poe_expedition.jpg",
    caption: "Hard enduro riders battling submerged boulder fields alongside modified Maruti Gypsys."
  },
  {
    id: 3,
    title: "Sahyadri Ridge Recon Traverse",
    type: "Photo Reel",
    category: "Trail Recon",
    image: "/images/poe_expedition.jpg",
    caption: "Navigating rocky shelf switchbacks and riverbed approaches high on the Western Ghats."
  }
];

export const MERCH_PRODUCTS = [
  {
    id: "jersey-mud-pro",
    name: "8Moto 'Sahyadri Mud' Trail Jersey",
    category: "Riding Apparel",
    price: "₹1,899",
    badge: "Quick Dry & Vented",
    sizes: ["M", "L", "XL", "XXL"]
  },
  {
    id: "kinetic-strap-9m",
    name: "8Moto Heavy-Duty Kinetic Tow Strap (9M)",
    category: "Recovery Gear",
    price: "₹3,499",
    badge: "8.5 Ton Tested",
    sizes: ["Standard"]
  },
  {
    id: "snapback-ridge",
    name: "8Moto Offroad Expedition Snapback Cap",
    category: "Apparel",
    price: "₹899",
    badge: "Water Repellent",
    sizes: ["Adjustable"]
  },
  {
    id: "sticker-pack-rally",
    name: "Official 8Moto Trail Reflective Decal Pack",
    category: "Accessories",
    price: "₹449",
    badge: "3M Vinyl",
    sizes: ["Set of 12"]
  }
];

export const TESTIMONIALS = [
  {
    name: "Aditya Kulkarni",
    rig: "Royal Enfield Himalayan 450",
    role: "POE 12 & 13 Veteran",
    comment: "The Pune Offroad Expedition is unlike any motorcycle event in India. The sheer camaraderie when ten guys push a stuck bike out of a clay rut in pouring rain is unbeatable. 8Moto's marshals are absolute legends."
  },
  {
    name: "Rohan Deshmukh",
    rig: "Mahindra Thar 4x4 CRDe",
    role: "Off-Road Driver & Member",
    comment: "The 8Moto marshal crew doesn't do fake off-roading. They take you into raw, untamed terrain where recovery gear and trail discipline actually matter. Their safety and medical coverage gives you the confidence to push your machine."
  },
  {
    name: "Neha Varma",
    rig: "KTM 390 Adventure",
    role: "Monsoon Trail Rider",
    comment: "I was terrified of deep mud and stalling on rocky inclines. Joining the 8Moto monsoon trail convoy completely transformed my riding confidence. The marshals guided our tire placement at every riverbed, and now I ride Sahyadri trails with zero panic."
  }
];

export const FAQS = [
  {
    q: "What types of motorcycles are permitted in the Pune Offroad Expedition (POE)?",
    a: "Adventure motorcycles (KTM 390/250 Adv, Royal Enfield Himalayan/Scram, BMW GS, Triumph Tiger, Hero Xpulse) and purpose-built dirt/enduro motorcycles are eligible. Street bikes and commuter motorcycles without dual-sport tires are not permitted for safety reasons."
  },
  {
    q: "Can stock 4x4 SUVs participate in 8Moto events?",
    a: "Yes! We run separate classes for stock/mildly modified 4x4s (Thar, Gypsy, Jimny, Gurkha, D-Max) with AT tires, and an extreme class for locked/lifted rigs with winches and MT tires."
  },
  {
    q: "What happens if my machine breaks down or gets stuck in the jungle?",
    a: "8Moto operates full sweep crews: dedicated 4x4 recovery vehicles equipped with high-tensile winches and mobile toolkits follow every batch. You will never be left behind on the trail."
  },
  {
    q: "What mandatory riding gear is required?",
    a: "Full-face DOT/ECE helmet, off-road riding boots or sturdy ankle-protective boots, armored riding jacket and pants, and off-road gloves. Knee guards and chest protectors are strongly recommended."
  }
];
