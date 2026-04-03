import type { PYPPaperMetadata } from '../types';

export const neet2024: PYPPaperMetadata = {
  id: 'neet-2024',
  exam: 'NEET',
  year: 2024,
  title: 'NEET 2024',
  durationSeconds: 12000, // 3 hours 20 minutes
  sections: [
    {
      name: 'Physics',
      questions: [
        {
          id: 1,
          prompt: 'The SI unit of energy is:',
          options: ['Watt', 'Joule', 'Newton', 'Pascal'],
          correctAnswer: 1
        },
        {
          id: 2,
          prompt: 'Which of the following is a scalar quantity?',
          options: ['Velocity', 'Force', 'Temperature', 'Acceleration'],
          correctAnswer: 2
        },
        {
          id: 3,
          prompt: 'The acceleration due to gravity on Earth is approximately:',
          options: ['9.8 m/s', '9.8 m/s²', '9.8 km/s', '9.8 km/s²'],
          correctAnswer: 1
        },
        {
          id: 4,
          prompt: 'Ohm\'s law is given by:',
          options: ['V = IR', 'V = I/R', 'V = R/I', 'I = VR'],
          correctAnswer: 0
        },
        {
          id: 5,
          prompt: 'The phenomenon of bending of light around obstacles is called:',
          options: ['Reflection', 'Refraction', 'Diffraction', 'Dispersion'],
          correctAnswer: 2
        },
        {
          id: 6,
          prompt: 'The unit of electric current is:',
          options: ['Volt', 'Ampere', 'Ohm', 'Coulomb'],
          correctAnswer: 1
        },
        {
          id: 7,
          prompt: 'A convex lens is also called:',
          options: ['Diverging lens', 'Converging lens', 'Concave lens', 'Plane lens'],
          correctAnswer: 1
        },
        {
          id: 8,
          prompt: 'The first law of thermodynamics is based on conservation of:',
          options: ['Mass', 'Energy', 'Momentum', 'Charge'],
          correctAnswer: 1
        },
        {
          id: 9,
          prompt: 'The SI unit of frequency is:',
          options: ['Second', 'Hertz', 'Meter', 'Radian'],
          correctAnswer: 1
        },
        {
          id: 10,
          prompt: 'Which of the following is a renewable source of energy?',
          options: ['Coal', 'Petroleum', 'Solar', 'Natural gas'],
          correctAnswer: 2
        }
      ]
    },
    {
      name: 'Chemistry',
      questions: [
        {
          id: 11,
          prompt: 'The chemical formula of common salt is:',
          options: ['NaCl', 'KCl', 'CaCl₂', 'MgCl₂'],
          correctAnswer: 0
        },
        {
          id: 12,
          prompt: 'Which of the following is an inert gas?',
          options: ['Oxygen', 'Nitrogen', 'Helium', 'Hydrogen'],
          correctAnswer: 2
        },
        {
          id: 13,
          prompt: 'The pH of acidic solution is:',
          options: ['Less than 7', 'Equal to 7', 'Greater than 7', 'Equal to 14'],
          correctAnswer: 0
        },
        {
          id: 14,
          prompt: 'Which of the following is a transition metal?',
          options: ['Sodium', 'Calcium', 'Iron', 'Aluminum'],
          correctAnswer: 2
        },
        {
          id: 15,
          prompt: 'The molecular formula of methane is:',
          options: ['CH₄', 'C₂H₆', 'C₃H₈', 'C₄H₁₀'],
          correctAnswer: 0
        },
        {
          id: 16,
          prompt: 'Which of the following is an oxidizing agent?',
          options: ['H₂', 'CO', 'O₂', 'NH₃'],
          correctAnswer: 2
        },
        {
          id: 17,
          prompt: 'The number of valence electrons in chlorine is:',
          options: ['5', '6', '7', '8'],
          correctAnswer: 2
        },
        {
          id: 18,
          prompt: 'Which of the following is a saturated hydrocarbon?',
          options: ['Ethene', 'Ethyne', 'Ethane', 'Benzene'],
          correctAnswer: 2
        },
        {
          id: 19,
          prompt: 'The process of converting liquid to vapor is called:',
          options: ['Condensation', 'Evaporation', 'Sublimation', 'Freezing'],
          correctAnswer: 1
        },
        {
          id: 20,
          prompt: 'Which of the following is a weak acid?',
          options: ['HCl', 'H₂SO₄', 'CH₃COOH', 'HNO₃'],
          correctAnswer: 2
        }
      ]
    },
    {
      name: 'Botany',
      questions: [
        {
          id: 21,
          prompt: 'The process by which plants make their food is called:',
          options: ['Respiration', 'Photosynthesis', 'Transpiration', 'Digestion'],
          correctAnswer: 1
        },
        {
          id: 22,
          prompt: 'Chlorophyll is present in:',
          options: ['Mitochondria', 'Nucleus', 'Chloroplast', 'Ribosome'],
          correctAnswer: 2
        },
        {
          id: 23,
          prompt: 'The male reproductive part of a flower is:',
          options: ['Pistil', 'Stamen', 'Sepal', 'Petal'],
          correctAnswer: 1
        },
        {
          id: 24,
          prompt: 'Which of the following is a root vegetable?',
          options: ['Potato', 'Carrot', 'Tomato', 'Brinjal'],
          correctAnswer: 1
        },
        {
          id: 25,
          prompt: 'The loss of water from leaves is called:',
          options: ['Respiration', 'Transpiration', 'Evaporation', 'Condensation'],
          correctAnswer: 1
        },
        {
          id: 26,
          prompt: 'Which plant hormone promotes cell division?',
          options: ['Auxin', 'Gibberellin', 'Cytokinin', 'Abscisic acid'],
          correctAnswer: 2
        },
        {
          id: 27,
          prompt: 'The vascular tissue that transports water in plants is:',
          options: ['Phloem', 'Xylem', 'Cambium', 'Epidermis'],
          correctAnswer: 1
        },
        {
          id: 28,
          prompt: 'Which of the following is a leguminous plant?',
          options: ['Wheat', 'Rice', 'Pea', 'Maize'],
          correctAnswer: 2
        },
        {
          id: 29,
          prompt: 'The opening on the leaf surface for gas exchange is called:',
          options: ['Stomata', 'Lenticel', 'Hydathode', 'Cuticle'],
          correctAnswer: 0
        },
        {
          id: 30,
          prompt: 'Which of the following is a monocot plant?',
          options: ['Pea', 'Bean', 'Maize', 'Sunflower'],
          correctAnswer: 2
        }
      ]
    },
    {
      name: 'Zoology',
      questions: [
        {
          id: 31,
          prompt: 'The largest organ in the human body is:',
          options: ['Liver', 'Brain', 'Skin', 'Heart'],
          correctAnswer: 2
        },
        {
          id: 32,
          prompt: 'Which blood group is called universal donor?',
          options: ['A', 'B', 'AB', 'O'],
          correctAnswer: 3
        },
        {
          id: 33,
          prompt: 'The functional unit of kidney is:',
          options: ['Neuron', 'Nephron', 'Alveoli', 'Villus'],
          correctAnswer: 1
        },
        {
          id: 34,
          prompt: 'Which vitamin is produced in the skin by sunlight?',
          options: ['Vitamin A', 'Vitamin B', 'Vitamin C', 'Vitamin D'],
          correctAnswer: 3
        },
        {
          id: 35,
          prompt: 'The respiratory pigment in human blood is:',
          options: ['Chlorophyll', 'Hemoglobin', 'Melanin', 'Carotene'],
          correctAnswer: 1
        },
        {
          id: 36,
          prompt: 'Which gland is known as the master gland?',
          options: ['Thyroid', 'Pituitary', 'Adrenal', 'Pancreas'],
          correctAnswer: 1
        },
        {
          id: 37,
          prompt: 'The number of chambers in human heart is:',
          options: ['2', '3', '4', '5'],
          correctAnswer: 2
        },
        {
          id: 38,
          prompt: 'Which of the following is a vestigial organ in humans?',
          options: ['Liver', 'Appendix', 'Kidney', 'Stomach'],
          correctAnswer: 1
        },
        {
          id: 39,
          prompt: 'The study of insects is called:',
          options: ['Ornithology', 'Entomology', 'Herpetology', 'Ichthyology'],
          correctAnswer: 1
        },
        {
          id: 40,
          prompt: 'Which of the following is a warm-blooded animal?',
          options: ['Frog', 'Fish', 'Snake', 'Bird'],
          correctAnswer: 3
        }
      ]
    }
  ]
};
