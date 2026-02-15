// NCERT chapter metadata configuration with official PDF links
export interface Chapter {
  id: number;
  title: string;
  pdfUrl?: string;
}

export interface Part {
  name: string;
  chapters: Chapter[];
}

export interface Subject {
  name: string;
  chapters?: Chapter[];
  parts?: Part[];
}

export interface ClassData {
  class: string;
  subjects: {
    physics: Subject;
    chemistry: Subject;
    biology: Subject;
    mathematics: Subject;
  };
}

// Class 11 NCERT Data with official PDF links
const class11Data: ClassData = {
  class: 'Class 11',
  subjects: {
    physics: {
      name: 'Physics',
      chapters: [
        {
          id: 1,
          title: 'Physical World',
          pdfUrl: 'https://ncert.nic.in/textbook/pdf/keph101.pdf',
        },
        {
          id: 2,
          title: 'Units and Measurements',
          pdfUrl: 'https://ncert.nic.in/textbook/pdf/keph102.pdf',
        },
        {
          id: 3,
          title: 'Motion in a Straight Line',
          pdfUrl: 'https://ncert.nic.in/textbook/pdf/keph103.pdf',
        },
        {
          id: 4,
          title: 'Motion in a Plane',
          pdfUrl: 'https://ncert.nic.in/textbook/pdf/keph104.pdf',
        },
        {
          id: 5,
          title: 'Laws of Motion',
          pdfUrl: 'https://ncert.nic.in/textbook/pdf/keph105.pdf',
        },
        {
          id: 6,
          title: 'Work, Energy and Power',
          pdfUrl: 'https://ncert.nic.in/textbook/pdf/keph106.pdf',
        },
        {
          id: 7,
          title: 'System of Particles and Rotational Motion',
          pdfUrl: 'https://ncert.nic.in/textbook/pdf/keph107.pdf',
        },
        {
          id: 8,
          title: 'Gravitation',
          pdfUrl: 'https://ncert.nic.in/textbook/pdf/keph108.pdf',
        },
        {
          id: 9,
          title: 'Mechanical Properties of Solids',
          pdfUrl: 'https://ncert.nic.in/textbook/pdf/keph201.pdf',
        },
        {
          id: 10,
          title: 'Mechanical Properties of Fluids',
          pdfUrl: 'https://ncert.nic.in/textbook/pdf/keph202.pdf',
        },
        {
          id: 11,
          title: 'Thermal Properties of Matter',
          pdfUrl: 'https://ncert.nic.in/textbook/pdf/keph203.pdf',
        },
        {
          id: 12,
          title: 'Thermodynamics',
          pdfUrl: 'https://ncert.nic.in/textbook/pdf/keph204.pdf',
        },
        {
          id: 13,
          title: 'Kinetic Theory',
          pdfUrl: 'https://ncert.nic.in/textbook/pdf/keph205.pdf',
        },
        {
          id: 14,
          title: 'Oscillations',
          pdfUrl: 'https://ncert.nic.in/textbook/pdf/keph206.pdf',
        },
        {
          id: 15,
          title: 'Waves',
          pdfUrl: 'https://ncert.nic.in/textbook/pdf/keph207.pdf',
        },
      ],
    },
    chemistry: {
      name: 'Chemistry',
      parts: [
        {
          name: 'Part 1',
          chapters: [
            {
              id: 1,
              title: 'Some Basic Concepts of Chemistry',
              pdfUrl: 'https://ncert.nic.in/textbook/pdf/kech101.pdf',
            },
            {
              id: 2,
              title: 'Structure of Atom',
              pdfUrl: 'https://ncert.nic.in/textbook/pdf/kech102.pdf',
            },
            {
              id: 3,
              title: 'Classification of Elements and Periodicity in Properties',
              pdfUrl: 'https://ncert.nic.in/textbook/pdf/kech103.pdf',
            },
            {
              id: 4,
              title: 'Chemical Bonding and Molecular Structure',
              pdfUrl: 'https://ncert.nic.in/textbook/pdf/kech104.pdf',
            },
            {
              id: 5,
              title: 'States of Matter',
              pdfUrl: 'https://ncert.nic.in/textbook/pdf/kech105.pdf',
            },
            {
              id: 6,
              title: 'Thermodynamics',
              pdfUrl: 'https://ncert.nic.in/textbook/pdf/kech106.pdf',
            },
            {
              id: 7,
              title: 'Equilibrium',
              pdfUrl: 'https://ncert.nic.in/textbook/pdf/kech107.pdf',
            },
          ],
        },
        {
          name: 'Part 2',
          chapters: [
            {
              id: 8,
              title: 'Redox Reactions',
              pdfUrl: 'https://ncert.nic.in/textbook/pdf/kech201.pdf',
            },
            {
              id: 9,
              title: 'Hydrogen',
              pdfUrl: 'https://ncert.nic.in/textbook/pdf/kech202.pdf',
            },
            {
              id: 10,
              title: 'The s-Block Elements',
              pdfUrl: 'https://ncert.nic.in/textbook/pdf/kech203.pdf',
            },
            {
              id: 11,
              title: 'The p-Block Elements',
              pdfUrl: 'https://ncert.nic.in/textbook/pdf/kech204.pdf',
            },
            {
              id: 12,
              title: 'Organic Chemistry - Some Basic Principles and Techniques',
              pdfUrl: 'https://ncert.nic.in/textbook/pdf/kech205.pdf',
            },
            {
              id: 13,
              title: 'Hydrocarbons',
              pdfUrl: 'https://ncert.nic.in/textbook/pdf/kech206.pdf',
            },
            {
              id: 14,
              title: 'Environmental Chemistry',
              pdfUrl: 'https://ncert.nic.in/textbook/pdf/kech207.pdf',
            },
          ],
        },
      ],
    },
    biology: {
      name: 'Biology',
      chapters: [
        {
          id: 1,
          title: 'The Living World',
          pdfUrl: 'https://ncert.nic.in/textbook/pdf/kebo101.pdf',
        },
        {
          id: 2,
          title: 'Biological Classification',
          pdfUrl: 'https://ncert.nic.in/textbook/pdf/kebo102.pdf',
        },
        {
          id: 3,
          title: 'Plant Kingdom',
          pdfUrl: 'https://ncert.nic.in/textbook/pdf/kebo103.pdf',
        },
        {
          id: 4,
          title: 'Animal Kingdom',
          pdfUrl: 'https://ncert.nic.in/textbook/pdf/kebo104.pdf',
        },
        {
          id: 5,
          title: 'Morphology of Flowering Plants',
          pdfUrl: 'https://ncert.nic.in/textbook/pdf/kebo105.pdf',
        },
        {
          id: 6,
          title: 'Anatomy of Flowering Plants',
          pdfUrl: 'https://ncert.nic.in/textbook/pdf/kebo106.pdf',
        },
        {
          id: 7,
          title: 'Structural Organisation in Animals',
          pdfUrl: 'https://ncert.nic.in/textbook/pdf/kebo107.pdf',
        },
        {
          id: 8,
          title: 'Cell: The Unit of Life',
          pdfUrl: 'https://ncert.nic.in/textbook/pdf/kebo108.pdf',
        },
        {
          id: 9,
          title: 'Biomolecules',
          pdfUrl: 'https://ncert.nic.in/textbook/pdf/kebo109.pdf',
        },
        {
          id: 10,
          title: 'Cell Cycle and Cell Division',
          pdfUrl: 'https://ncert.nic.in/textbook/pdf/kebo110.pdf',
        },
        {
          id: 11,
          title: 'Transport in Plants',
          pdfUrl: 'https://ncert.nic.in/textbook/pdf/kebo111.pdf',
        },
        {
          id: 12,
          title: 'Mineral Nutrition',
          pdfUrl: 'https://ncert.nic.in/textbook/pdf/kebo112.pdf',
        },
        {
          id: 13,
          title: 'Photosynthesis in Higher Plants',
          pdfUrl: 'https://ncert.nic.in/textbook/pdf/kebo113.pdf',
        },
        {
          id: 14,
          title: 'Respiration in Plants',
          pdfUrl: 'https://ncert.nic.in/textbook/pdf/kebo114.pdf',
        },
        {
          id: 15,
          title: 'Plant Growth and Development',
          pdfUrl: 'https://ncert.nic.in/textbook/pdf/kebo115.pdf',
        },
        {
          id: 16,
          title: 'Digestion and Absorption',
          pdfUrl: 'https://ncert.nic.in/textbook/pdf/kebo116.pdf',
        },
        {
          id: 17,
          title: 'Breathing and Exchange of Gases',
          pdfUrl: 'https://ncert.nic.in/textbook/pdf/kebo117.pdf',
        },
        {
          id: 18,
          title: 'Body Fluids and Circulation',
          pdfUrl: 'https://ncert.nic.in/textbook/pdf/kebo118.pdf',
        },
        {
          id: 19,
          title: 'Excretory Products and their Elimination',
          pdfUrl: 'https://ncert.nic.in/textbook/pdf/kebo119.pdf',
        },
        {
          id: 20,
          title: 'Locomotion and Movement',
          pdfUrl: 'https://ncert.nic.in/textbook/pdf/kebo120.pdf',
        },
        {
          id: 21,
          title: 'Neural Control and Coordination',
          pdfUrl: 'https://ncert.nic.in/textbook/pdf/kebo121.pdf',
        },
        {
          id: 22,
          title: 'Chemical Coordination and Integration',
          pdfUrl: 'https://ncert.nic.in/textbook/pdf/kebo122.pdf',
        },
      ],
    },
    mathematics: {
      name: 'Mathematics',
      parts: [
        {
          name: 'Part 1',
          chapters: [
            {
              id: 1,
              title: 'Sets',
              pdfUrl: 'https://ncert.nic.in/textbook/pdf/kemh101.pdf',
            },
            {
              id: 2,
              title: 'Relations and Functions',
              pdfUrl: 'https://ncert.nic.in/textbook/pdf/kemh102.pdf',
            },
            {
              id: 3,
              title: 'Trigonometric Functions',
              pdfUrl: 'https://ncert.nic.in/textbook/pdf/kemh103.pdf',
            },
            {
              id: 4,
              title: 'Principle of Mathematical Induction',
              pdfUrl: 'https://ncert.nic.in/textbook/pdf/kemh104.pdf',
            },
            {
              id: 5,
              title: 'Complex Numbers and Quadratic Equations',
              pdfUrl: 'https://ncert.nic.in/textbook/pdf/kemh105.pdf',
            },
            {
              id: 6,
              title: 'Linear Inequalities',
              pdfUrl: 'https://ncert.nic.in/textbook/pdf/kemh106.pdf',
            },
            {
              id: 7,
              title: 'Permutations and Combinations',
              pdfUrl: 'https://ncert.nic.in/textbook/pdf/kemh107.pdf',
            },
            {
              id: 8,
              title: 'Binomial Theorem',
              pdfUrl: 'https://ncert.nic.in/textbook/pdf/kemh108.pdf',
            },
            {
              id: 9,
              title: 'Sequences and Series',
              pdfUrl: 'https://ncert.nic.in/textbook/pdf/kemh109.pdf',
            },
          ],
        },
        {
          name: 'Part 2',
          chapters: [
            {
              id: 10,
              title: 'Straight Lines',
              pdfUrl: 'https://ncert.nic.in/textbook/pdf/kemh201.pdf',
            },
            {
              id: 11,
              title: 'Conic Sections',
              pdfUrl: 'https://ncert.nic.in/textbook/pdf/kemh202.pdf',
            },
            {
              id: 12,
              title: 'Introduction to Three Dimensional Geometry',
              pdfUrl: 'https://ncert.nic.in/textbook/pdf/kemh203.pdf',
            },
            {
              id: 13,
              title: 'Limits and Derivatives',
              pdfUrl: 'https://ncert.nic.in/textbook/pdf/kemh204.pdf',
            },
            {
              id: 14,
              title: 'Mathematical Reasoning',
              pdfUrl: 'https://ncert.nic.in/textbook/pdf/kemh205.pdf',
            },
            {
              id: 15,
              title: 'Statistics',
              pdfUrl: 'https://ncert.nic.in/textbook/pdf/kemh206.pdf',
            },
            {
              id: 16,
              title: 'Probability',
              pdfUrl: 'https://ncert.nic.in/textbook/pdf/kemh207.pdf',
            },
          ],
        },
      ],
    },
  },
};

// Class 12 NCERT Data with official PDF links
const class12Data: ClassData = {
  class: 'Class 12',
  subjects: {
    physics: {
      name: 'Physics',
      parts: [
        {
          name: 'Part 1',
          chapters: [
            {
              id: 1,
              title: 'Electric Charges and Fields',
              pdfUrl: 'https://ncert.nic.in/textbook/pdf/leph101.pdf',
            },
            {
              id: 2,
              title: 'Electrostatic Potential and Capacitance',
              pdfUrl: 'https://ncert.nic.in/textbook/pdf/leph102.pdf',
            },
            {
              id: 3,
              title: 'Current Electricity',
              pdfUrl: 'https://ncert.nic.in/textbook/pdf/leph103.pdf',
            },
            {
              id: 4,
              title: 'Moving Charges and Magnetism',
              pdfUrl: 'https://ncert.nic.in/textbook/pdf/leph104.pdf',
            },
            {
              id: 5,
              title: 'Magnetism and Matter',
              pdfUrl: 'https://ncert.nic.in/textbook/pdf/leph105.pdf',
            },
            {
              id: 6,
              title: 'Electromagnetic Induction',
              pdfUrl: 'https://ncert.nic.in/textbook/pdf/leph106.pdf',
            },
            {
              id: 7,
              title: 'Alternating Current',
              pdfUrl: 'https://ncert.nic.in/textbook/pdf/leph107.pdf',
            },
            {
              id: 8,
              title: 'Electromagnetic Waves',
              pdfUrl: 'https://ncert.nic.in/textbook/pdf/leph108.pdf',
            },
          ],
        },
        {
          name: 'Part 2',
          chapters: [
            {
              id: 9,
              title: 'Ray Optics and Optical Instruments',
              pdfUrl: 'https://ncert.nic.in/textbook/pdf/leph201.pdf',
            },
            {
              id: 10,
              title: 'Wave Optics',
              pdfUrl: 'https://ncert.nic.in/textbook/pdf/leph202.pdf',
            },
            {
              id: 11,
              title: 'Dual Nature of Radiation and Matter',
              pdfUrl: 'https://ncert.nic.in/textbook/pdf/leph203.pdf',
            },
            {
              id: 12,
              title: 'Atoms',
              pdfUrl: 'https://ncert.nic.in/textbook/pdf/leph204.pdf',
            },
            {
              id: 13,
              title: 'Nuclei',
              pdfUrl: 'https://ncert.nic.in/textbook/pdf/leph205.pdf',
            },
            {
              id: 14,
              title: 'Semiconductor Electronics: Materials, Devices and Simple Circuits',
              pdfUrl: 'https://ncert.nic.in/textbook/pdf/leph206.pdf',
            },
          ],
        },
      ],
    },
    chemistry: {
      name: 'Chemistry',
      parts: [
        {
          name: 'Part 1',
          chapters: [
            {
              id: 1,
              title: 'The Solid State',
              pdfUrl: 'https://ncert.nic.in/textbook/pdf/lech101.pdf',
            },
            {
              id: 2,
              title: 'Solutions',
              pdfUrl: 'https://ncert.nic.in/textbook/pdf/lech102.pdf',
            },
            {
              id: 3,
              title: 'Electrochemistry',
              pdfUrl: 'https://ncert.nic.in/textbook/pdf/lech103.pdf',
            },
            {
              id: 4,
              title: 'Chemical Kinetics',
              pdfUrl: 'https://ncert.nic.in/textbook/pdf/lech104.pdf',
            },
            {
              id: 5,
              title: 'Surface Chemistry',
              pdfUrl: 'https://ncert.nic.in/textbook/pdf/lech105.pdf',
            },
            {
              id: 6,
              title: 'General Principles and Processes of Isolation of Elements',
              pdfUrl: 'https://ncert.nic.in/textbook/pdf/lech106.pdf',
            },
            {
              id: 7,
              title: 'The p-Block Elements',
              pdfUrl: 'https://ncert.nic.in/textbook/pdf/lech107.pdf',
            },
            {
              id: 8,
              title: 'The d- and f-Block Elements',
              pdfUrl: 'https://ncert.nic.in/textbook/pdf/lech108.pdf',
            },
            {
              id: 9,
              title: 'Coordination Compounds',
              pdfUrl: 'https://ncert.nic.in/textbook/pdf/lech109.pdf',
            },
          ],
        },
        {
          name: 'Part 2',
          chapters: [
            {
              id: 10,
              title: 'Haloalkanes and Haloarenes',
              pdfUrl: 'https://ncert.nic.in/textbook/pdf/lech201.pdf',
            },
            {
              id: 11,
              title: 'Alcohols, Phenols and Ethers',
              pdfUrl: 'https://ncert.nic.in/textbook/pdf/lech202.pdf',
            },
            {
              id: 12,
              title: 'Aldehydes, Ketones and Carboxylic Acids',
              pdfUrl: 'https://ncert.nic.in/textbook/pdf/lech203.pdf',
            },
            {
              id: 13,
              title: 'Amines',
              pdfUrl: 'https://ncert.nic.in/textbook/pdf/lech204.pdf',
            },
            {
              id: 14,
              title: 'Biomolecules',
              pdfUrl: 'https://ncert.nic.in/textbook/pdf/lech205.pdf',
            },
            {
              id: 15,
              title: 'Polymers',
              pdfUrl: 'https://ncert.nic.in/textbook/pdf/lech206.pdf',
            },
            {
              id: 16,
              title: 'Chemistry in Everyday Life',
              pdfUrl: 'https://ncert.nic.in/textbook/pdf/lech207.pdf',
            },
          ],
        },
      ],
    },
    biology: {
      name: 'Biology',
      chapters: [
        {
          id: 1,
          title: 'Reproduction in Organisms',
          pdfUrl: 'https://ncert.nic.in/textbook/pdf/lebo101.pdf',
        },
        {
          id: 2,
          title: 'Sexual Reproduction in Flowering Plants',
          pdfUrl: 'https://ncert.nic.in/textbook/pdf/lebo102.pdf',
        },
        {
          id: 3,
          title: 'Human Reproduction',
          pdfUrl: 'https://ncert.nic.in/textbook/pdf/lebo103.pdf',
        },
        {
          id: 4,
          title: 'Reproductive Health',
          pdfUrl: 'https://ncert.nic.in/textbook/pdf/lebo104.pdf',
        },
        {
          id: 5,
          title: 'Principles of Inheritance and Variation',
          pdfUrl: 'https://ncert.nic.in/textbook/pdf/lebo105.pdf',
        },
        {
          id: 6,
          title: 'Molecular Basis of Inheritance',
          pdfUrl: 'https://ncert.nic.in/textbook/pdf/lebo106.pdf',
        },
        {
          id: 7,
          title: 'Evolution',
          pdfUrl: 'https://ncert.nic.in/textbook/pdf/lebo107.pdf',
        },
        {
          id: 8,
          title: 'Human Health and Disease',
          pdfUrl: 'https://ncert.nic.in/textbook/pdf/lebo108.pdf',
        },
        {
          id: 9,
          title: 'Strategies for Enhancement in Food Production',
          pdfUrl: 'https://ncert.nic.in/textbook/pdf/lebo109.pdf',
        },
        {
          id: 10,
          title: 'Microbes in Human Welfare',
          pdfUrl: 'https://ncert.nic.in/textbook/pdf/lebo110.pdf',
        },
        {
          id: 11,
          title: 'Biotechnology: Principles and Processes',
          pdfUrl: 'https://ncert.nic.in/textbook/pdf/lebo111.pdf',
        },
        {
          id: 12,
          title: 'Biotechnology and its Applications',
          pdfUrl: 'https://ncert.nic.in/textbook/pdf/lebo112.pdf',
        },
        {
          id: 13,
          title: 'Organisms and Populations',
          pdfUrl: 'https://ncert.nic.in/textbook/pdf/lebo113.pdf',
        },
        {
          id: 14,
          title: 'Ecosystem',
          pdfUrl: 'https://ncert.nic.in/textbook/pdf/lebo114.pdf',
        },
        {
          id: 15,
          title: 'Biodiversity and Conservation',
          pdfUrl: 'https://ncert.nic.in/textbook/pdf/lebo115.pdf',
        },
        {
          id: 16,
          title: 'Environmental Issues',
          pdfUrl: 'https://ncert.nic.in/textbook/pdf/lebo116.pdf',
        },
      ],
    },
    mathematics: {
      name: 'Mathematics',
      parts: [
        {
          name: 'Part 1',
          chapters: [
            {
              id: 1,
              title: 'Relations and Functions',
              pdfUrl: 'https://ncert.nic.in/textbook/pdf/lemh101.pdf',
            },
            {
              id: 2,
              title: 'Inverse Trigonometric Functions',
              pdfUrl: 'https://ncert.nic.in/textbook/pdf/lemh102.pdf',
            },
            {
              id: 3,
              title: 'Matrices',
              pdfUrl: 'https://ncert.nic.in/textbook/pdf/lemh103.pdf',
            },
            {
              id: 4,
              title: 'Determinants',
              pdfUrl: 'https://ncert.nic.in/textbook/pdf/lemh104.pdf',
            },
            {
              id: 5,
              title: 'Continuity and Differentiability',
              pdfUrl: 'https://ncert.nic.in/textbook/pdf/lemh105.pdf',
            },
            {
              id: 6,
              title: 'Application of Derivatives',
              pdfUrl: 'https://ncert.nic.in/textbook/pdf/lemh106.pdf',
            },
          ],
        },
        {
          name: 'Part 2',
          chapters: [
            {
              id: 7,
              title: 'Integrals',
              pdfUrl: 'https://ncert.nic.in/textbook/pdf/lemh201.pdf',
            },
            {
              id: 8,
              title: 'Application of Integrals',
              pdfUrl: 'https://ncert.nic.in/textbook/pdf/lemh202.pdf',
            },
            {
              id: 9,
              title: 'Differential Equations',
              pdfUrl: 'https://ncert.nic.in/textbook/pdf/lemh203.pdf',
            },
            {
              id: 10,
              title: 'Vector Algebra',
              pdfUrl: 'https://ncert.nic.in/textbook/pdf/lemh204.pdf',
            },
            {
              id: 11,
              title: 'Three Dimensional Geometry',
              pdfUrl: 'https://ncert.nic.in/textbook/pdf/lemh205.pdf',
            },
            {
              id: 12,
              title: 'Linear Programming',
              pdfUrl: 'https://ncert.nic.in/textbook/pdf/lemh206.pdf',
            },
            {
              id: 13,
              title: 'Probability',
              pdfUrl: 'https://ncert.nic.in/textbook/pdf/lemh207.pdf',
            },
          ],
        },
      ],
    },
  },
};

export const ncertData = {
  class11: class11Data,
  class12: class12Data,
};
