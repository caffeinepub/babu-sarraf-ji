import type { PYPPaperMetadata } from '../types';

export const jeeMain2021: PYPPaperMetadata = {
  id: 'jee-main-2021',
  exam: 'JEE Main',
  year: 2021,
  title: 'JEE Main 2021',
  durationSeconds: 10800,
  sections: [
    {
      name: 'Physics',
      questions: [
        {
          id: 1,
          prompt: 'The SI unit of force is:',
          options: ['Joule', 'Newton', 'Watt', 'Pascal'],
          correctAnswer: 1
        },
        {
          id: 2,
          prompt: 'Which of the following is a fundamental force?',
          options: ['Tension', 'Friction', 'Gravitational', 'Normal force'],
          correctAnswer: 2
        },
        {
          id: 3,
          prompt: 'The resistance of a conductor is directly proportional to:',
          options: ['Length', 'Area', 'Temperature', 'Current'],
          correctAnswer: 0
        },
        {
          id: 4,
          prompt: 'A ray of light traveling from a denser to rarer medium:',
          options: ['Bends towards normal', 'Bends away from normal', 'Does not bend', 'Gets absorbed'],
          correctAnswer: 1
        },
        {
          id: 5,
          prompt: 'The energy stored in a capacitor is proportional to:',
          options: ['V', 'V²', 'V³', '1/V'],
          correctAnswer: 1
        },
        {
          id: 6,
          prompt: 'Which of the following has the highest specific heat capacity?',
          options: ['Water', 'Iron', 'Copper', 'Aluminum'],
          correctAnswer: 0
        },
        {
          id: 7,
          prompt: 'The phenomenon of interference is observed in:',
          options: ['Particles only', 'Waves only', 'Both particles and waves', 'Neither'],
          correctAnswer: 1
        },
        {
          id: 8,
          prompt: 'The unit of magnetic field intensity is:',
          options: ['Weber', 'Tesla', 'Henry', 'Gauss'],
          correctAnswer: 1
        },
        {
          id: 9,
          prompt: 'A body is said to be in equilibrium when:',
          options: ['It is at rest', 'It moves with constant velocity', 'Net force is zero', 'All of the above'],
          correctAnswer: 3
        },
        {
          id: 10,
          prompt: 'The photoelectric effect was explained by:',
          options: ['Newton', 'Einstein', 'Planck', 'Bohr'],
          correctAnswer: 1
        }
      ]
    },
    {
      name: 'Chemistry',
      questions: [
        {
          id: 11,
          prompt: 'The most abundant element in Earth\'s crust is:',
          options: ['Silicon', 'Oxygen', 'Aluminum', 'Iron'],
          correctAnswer: 1
        },
        {
          id: 12,
          prompt: 'Which of the following is a greenhouse gas?',
          options: ['N₂', 'O₂', 'CO₂', 'Ar'],
          correctAnswer: 2
        },
        {
          id: 13,
          prompt: 'The process of rusting of iron is:',
          options: ['Reduction', 'Oxidation', 'Neutralization', 'Sublimation'],
          correctAnswer: 1
        },
        {
          id: 14,
          prompt: 'Which of the following is a strong base?',
          options: ['NH₃', 'NaOH', 'Ca(OH)₂', 'Al(OH)₃'],
          correctAnswer: 1
        },
        {
          id: 15,
          prompt: 'The number of moles in 22.4 L of any gas at STP is:',
          options: ['0.5', '1', '2', '22.4'],
          correctAnswer: 1
        },
        {
          id: 16,
          prompt: 'Which of the following is an endothermic process?',
          options: ['Combustion', 'Respiration', 'Photosynthesis', 'Neutralization'],
          correctAnswer: 2
        },
        {
          id: 17,
          prompt: 'The shape of ammonia (NH₃) molecule is:',
          options: ['Linear', 'Trigonal planar', 'Pyramidal', 'Tetrahedral'],
          correctAnswer: 2
        },
        {
          id: 18,
          prompt: 'Which of the following is a homogeneous mixture?',
          options: ['Sand and water', 'Oil and water', 'Salt solution', 'Milk'],
          correctAnswer: 2
        },
        {
          id: 19,
          prompt: 'The number of neutrons in ¹⁴C is:',
          options: ['6', '8', '14', '20'],
          correctAnswer: 1
        },
        {
          id: 20,
          prompt: 'Which of the following is a polymer?',
          options: ['Glucose', 'Starch', 'Fructose', 'Sucrose'],
          correctAnswer: 1
        }
      ]
    },
    {
      name: 'Mathematics',
      questions: [
        {
          id: 21,
          prompt: 'The value of sin(30°) is:',
          options: ['1/2', '√3/2', '1', '0'],
          correctAnswer: 0
        },
        {
          id: 22,
          prompt: 'The derivative of e^x is:',
          options: ['e^x', 'xe^(x-1)', '1/e^x', 'ln(x)'],
          correctAnswer: 0
        },
        {
          id: 23,
          prompt: 'The number of sides in a pentagon is:',
          options: ['4', '5', '6', '7'],
          correctAnswer: 1
        },
        {
          id: 24,
          prompt: 'If A and B are mutually exclusive events, then P(A∩B) is:',
          options: ['0', '1', 'P(A)', 'P(B)'],
          correctAnswer: 0
        },
        {
          id: 25,
          prompt: 'The range of sin(x) is:',
          options: ['[-1, 1]', '[0, 1]', '[-∞, ∞]', '[0, ∞]'],
          correctAnswer: 0
        },
        {
          id: 26,
          prompt: 'The value of log₁₀(10) is:',
          options: ['0', '1', '10', '100'],
          correctAnswer: 1
        },
        {
          id: 27,
          prompt: 'The distance between points (0,0) and (3,4) is:',
          options: ['5', '7', '12', '25'],
          correctAnswer: 0
        },
        {
          id: 28,
          prompt: 'The sum of interior angles of a quadrilateral is:',
          options: ['180°', '270°', '360°', '540°'],
          correctAnswer: 2
        },
        {
          id: 29,
          prompt: 'The value of i² (where i is the imaginary unit) is:',
          options: ['1', '-1', 'i', '0'],
          correctAnswer: 1
        },
        {
          id: 30,
          prompt: 'The coefficient of x² in (x+2)³ is:',
          options: ['3', '6', '12', '8'],
          correctAnswer: 2
        }
      ]
    }
  ]
};
