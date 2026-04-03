import type { PYPPaperMetadata } from '../types';

export const jeeMain2022: PYPPaperMetadata = {
  id: 'jee-main-2022',
  exam: 'JEE Main',
  year: 2022,
  title: 'JEE Main 2022',
  durationSeconds: 10800,
  sections: [
    {
      name: 'Physics',
      questions: [
        {
          id: 1,
          prompt: 'The dimensional formula for momentum is:',
          options: ['[MLT⁻¹]', '[MLT⁻²]', '[ML²T⁻¹]', '[ML²T⁻²]'],
          correctAnswer: 0
        },
        {
          id: 2,
          prompt: 'Which law of motion gives the definition of force?',
          options: ['First law', 'Second law', 'Third law', 'Law of gravitation'],
          correctAnswer: 1
        },
        {
          id: 3,
          prompt: 'The SI unit of electric charge is:',
          options: ['Ampere', 'Coulomb', 'Volt', 'Ohm'],
          correctAnswer: 1
        },
        {
          id: 4,
          prompt: 'A body moving with constant velocity has:',
          options: ['Zero acceleration', 'Constant acceleration', 'Variable acceleration', 'Infinite acceleration'],
          correctAnswer: 0
        },
        {
          id: 5,
          prompt: 'The wavelength of visible light ranges from:',
          options: ['100-200 nm', '200-400 nm', '400-700 nm', '700-1000 nm'],
          correctAnswer: 2
        },
        {
          id: 6,
          prompt: 'The speed of light in vacuum is approximately:',
          options: ['3×10⁶ m/s', '3×10⁷ m/s', '3×10⁸ m/s', '3×10⁹ m/s'],
          correctAnswer: 2
        },
        {
          id: 7,
          prompt: 'Kirchhoff\'s current law is based on conservation of:',
          options: ['Energy', 'Charge', 'Momentum', 'Mass'],
          correctAnswer: 1
        },
        {
          id: 8,
          prompt: 'The time period of a simple pendulum depends on:',
          options: ['Mass', 'Length', 'Amplitude', 'Material'],
          correctAnswer: 1
        },
        {
          id: 9,
          prompt: 'Which of the following is a non-conservative force?',
          options: ['Gravitational force', 'Electrostatic force', 'Friction', 'Spring force'],
          correctAnswer: 2
        },
        {
          id: 10,
          prompt: 'The unit of electric potential is:',
          options: ['Joule', 'Volt', 'Coulomb', 'Ampere'],
          correctAnswer: 1
        }
      ]
    },
    {
      name: 'Chemistry',
      questions: [
        {
          id: 11,
          prompt: 'The number of electrons in a neutral atom is equal to:',
          options: ['Atomic number', 'Mass number', 'Neutron number', 'Proton + Neutron'],
          correctAnswer: 0
        },
        {
          id: 12,
          prompt: 'Which of the following is an exothermic reaction?',
          options: ['Photosynthesis', 'Combustion', 'Electrolysis', 'Decomposition of water'],
          correctAnswer: 1
        },
        {
          id: 13,
          prompt: 'The common name of NaHCO₃ is:',
          options: ['Washing soda', 'Baking soda', 'Caustic soda', 'Soda ash'],
          correctAnswer: 1
        },
        {
          id: 14,
          prompt: 'Which gas is produced when metals react with acids?',
          options: ['Oxygen', 'Nitrogen', 'Hydrogen', 'Carbon dioxide'],
          correctAnswer: 2
        },
        {
          id: 15,
          prompt: 'The electronic configuration of sodium (Na, Z=11) is:',
          options: ['2,8', '2,8,1', '2,8,2', '2,9'],
          correctAnswer: 1
        },
        {
          id: 16,
          prompt: 'Which of the following is a reducing agent?',
          options: ['O₂', 'Cl₂', 'H₂', 'F₂'],
          correctAnswer: 2
        },
        {
          id: 17,
          prompt: 'The catalyst used in Haber process is:',
          options: ['Platinum', 'Iron', 'Nickel', 'Vanadium pentoxide'],
          correctAnswer: 1
        },
        {
          id: 18,
          prompt: 'Which of the following is an aromatic compound?',
          options: ['Cyclohexane', 'Benzene', 'Ethene', 'Propane'],
          correctAnswer: 1
        },
        {
          id: 19,
          prompt: 'The functional group in alcohols is:',
          options: ['-COOH', '-CHO', '-OH', '-NH₂'],
          correctAnswer: 2
        },
        {
          id: 20,
          prompt: 'Which metal is the best conductor of electricity?',
          options: ['Copper', 'Silver', 'Gold', 'Aluminum'],
          correctAnswer: 1
        }
      ]
    },
    {
      name: 'Mathematics',
      questions: [
        {
          id: 21,
          prompt: 'The value of cos(0°) is:',
          options: ['0', '1', '-1', '1/2'],
          correctAnswer: 1
        },
        {
          id: 22,
          prompt: 'The integral of cos(x) is:',
          options: ['sin(x) + C', '-sin(x) + C', 'cos(x) + C', '-cos(x) + C'],
          correctAnswer: 0
        },
        {
          id: 23,
          prompt: 'The number of diagonals in a hexagon is:',
          options: ['6', '9', '12', '15'],
          correctAnswer: 1
        },
        {
          id: 24,
          prompt: 'If matrix A is of order 3×2 and matrix B is of order 2×4, then AB is of order:',
          options: ['3×4', '2×2', '3×2', '2×4'],
          correctAnswer: 0
        },
        {
          id: 25,
          prompt: 'The domain of f(x) = √x is:',
          options: ['All real numbers', 'x ≥ 0', 'x > 0', 'x ≤ 0'],
          correctAnswer: 1
        },
        {
          id: 26,
          prompt: 'The value of e (Euler\'s number) is approximately:',
          options: ['2.71', '3.14', '1.41', '1.73'],
          correctAnswer: 0
        },
        {
          id: 27,
          prompt: 'The equation x² + y² = r² represents:',
          options: ['Parabola', 'Ellipse', 'Circle', 'Hyperbola'],
          correctAnswer: 2
        },
        {
          id: 28,
          prompt: 'The probability of getting a head in a single coin toss is:',
          options: ['0', '1/4', '1/2', '1'],
          correctAnswer: 2
        },
        {
          id: 29,
          prompt: 'The sum of first n odd numbers is:',
          options: ['n', 'n²', 'n(n+1)', '2n'],
          correctAnswer: 1
        },
        {
          id: 30,
          prompt: 'The value of tan(45°) is:',
          options: ['0', '1', '√3', '1/√3'],
          correctAnswer: 1
        }
      ]
    }
  ]
};
