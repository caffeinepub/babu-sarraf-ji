// NCERT chapter metadata configuration
export interface Chapter {
  id: number;
  title: string;
  pdfUrl?: string; // Optional - if not provided, shows "PDF not available"
}

export interface Subject {
  name: string;
  chapters: Chapter[];
}

export interface ClassData {
  class: string;
  subjects: {
    physics: Subject;
    chemistry: Subject;
    biology: Subject;
  };
}

// Class 11 NCERT Data
const class11Data: ClassData = {
  class: "Class 11",
  subjects: {
    physics: {
      name: "Physics",
      chapters: [
        { id: 1, title: "Physical World" },
        { id: 2, title: "Units and Measurements" },
        { id: 3, title: "Motion in a Straight Line" },
        { id: 4, title: "Motion in a Plane" },
        { id: 5, title: "Laws of Motion" },
        { id: 6, title: "Work, Energy and Power" },
        { id: 7, title: "System of Particles and Rotational Motion" },
        { id: 8, title: "Gravitation" },
        { id: 9, title: "Mechanical Properties of Solids" },
        { id: 10, title: "Mechanical Properties of Fluids" },
        { id: 11, title: "Thermal Properties of Matter" },
        { id: 12, title: "Thermodynamics" },
        { id: 13, title: "Kinetic Theory" },
        { id: 14, title: "Oscillations" },
        { id: 15, title: "Waves" },
      ],
    },
    chemistry: {
      name: "Chemistry",
      chapters: [
        { id: 1, title: "Some Basic Concepts of Chemistry" },
        { id: 2, title: "Structure of Atom" },
        { id: 3, title: "Classification of Elements and Periodicity in Properties" },
        { id: 4, title: "Chemical Bonding and Molecular Structure" },
        { id: 5, title: "States of Matter" },
        { id: 6, title: "Thermodynamics" },
        { id: 7, title: "Equilibrium" },
        { id: 8, title: "Redox Reactions" },
        { id: 9, title: "Hydrogen" },
        { id: 10, title: "The s-Block Elements" },
        { id: 11, title: "The p-Block Elements" },
        { id: 12, title: "Organic Chemistry - Some Basic Principles and Techniques" },
        { id: 13, title: "Hydrocarbons" },
        { id: 14, title: "Environmental Chemistry" },
      ],
    },
    biology: {
      name: "Biology",
      chapters: [
        { id: 1, title: "The Living World" },
        { id: 2, title: "Biological Classification" },
        { id: 3, title: "Plant Kingdom" },
        { id: 4, title: "Animal Kingdom" },
        { id: 5, title: "Morphology of Flowering Plants" },
        { id: 6, title: "Anatomy of Flowering Plants" },
        { id: 7, title: "Structural Organisation in Animals" },
        { id: 8, title: "Cell: The Unit of Life" },
        { id: 9, title: "Biomolecules" },
        { id: 10, title: "Cell Cycle and Cell Division" },
        { id: 11, title: "Transport in Plants" },
        { id: 12, title: "Mineral Nutrition" },
        { id: 13, title: "Photosynthesis in Higher Plants" },
        { id: 14, title: "Respiration in Plants" },
        { id: 15, title: "Plant Growth and Development" },
        { id: 16, title: "Digestion and Absorption" },
        { id: 17, title: "Breathing and Exchange of Gases" },
        { id: 18, title: "Body Fluids and Circulation" },
        { id: 19, title: "Excretory Products and their Elimination" },
        { id: 20, title: "Locomotion and Movement" },
        { id: 21, title: "Neural Control and Coordination" },
        { id: 22, title: "Chemical Coordination and Integration" },
      ],
    },
  },
};

// Class 12 NCERT Data
const class12Data: ClassData = {
  class: "Class 12",
  subjects: {
    physics: {
      name: "Physics",
      chapters: [
        { id: 1, title: "Electric Charges and Fields" },
        { id: 2, title: "Electrostatic Potential and Capacitance" },
        { id: 3, title: "Current Electricity" },
        { id: 4, title: "Moving Charges and Magnetism" },
        { id: 5, title: "Magnetism and Matter" },
        { id: 6, title: "Electromagnetic Induction" },
        { id: 7, title: "Alternating Current" },
        { id: 8, title: "Electromagnetic Waves" },
        { id: 9, title: "Ray Optics and Optical Instruments" },
        { id: 10, title: "Wave Optics" },
        { id: 11, title: "Dual Nature of Radiation and Matter" },
        { id: 12, title: "Atoms" },
        { id: 13, title: "Nuclei" },
        { id: 14, title: "Semiconductor Electronics: Materials, Devices and Simple Circuits" },
      ],
    },
    chemistry: {
      name: "Chemistry",
      chapters: [
        { id: 1, title: "The Solid State" },
        { id: 2, title: "Solutions" },
        { id: 3, title: "Electrochemistry" },
        { id: 4, title: "Chemical Kinetics" },
        { id: 5, title: "Surface Chemistry" },
        { id: 6, title: "General Principles and Processes of Isolation of Elements" },
        { id: 7, title: "The p-Block Elements" },
        { id: 8, title: "The d- and f-Block Elements" },
        { id: 9, title: "Coordination Compounds" },
        { id: 10, title: "Haloalkanes and Haloarenes" },
        { id: 11, title: "Alcohols, Phenols and Ethers" },
        { id: 12, title: "Aldehydes, Ketones and Carboxylic Acids" },
        { id: 13, title: "Amines" },
        { id: 14, title: "Biomolecules" },
        { id: 15, title: "Polymers" },
        { id: 16, title: "Chemistry in Everyday Life" },
      ],
    },
    biology: {
      name: "Biology",
      chapters: [
        { id: 1, title: "Reproduction in Organisms" },
        { id: 2, title: "Sexual Reproduction in Flowering Plants" },
        { id: 3, title: "Human Reproduction" },
        { id: 4, title: "Reproductive Health" },
        { id: 5, title: "Principles of Inheritance and Variation" },
        { id: 6, title: "Molecular Basis of Inheritance" },
        { id: 7, title: "Evolution" },
        { id: 8, title: "Human Health and Disease" },
        { id: 9, title: "Strategies for Enhancement in Food Production" },
        { id: 10, title: "Microbes in Human Welfare" },
        { id: 11, title: "Biotechnology: Principles and Processes" },
        { id: 12, title: "Biotechnology and its Applications" },
        { id: 13, title: "Organisms and Populations" },
        { id: 14, title: "Ecosystem" },
        { id: 15, title: "Biodiversity and Conservation" },
        { id: 16, title: "Environmental Issues" },
      ],
    },
  },
};

export const ncertData = {
  class11: class11Data,
  class12: class12Data,
};
