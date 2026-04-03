import type { PYPPaperMetadata } from '../types';

export const jeeMain2024AllShifts: PYPPaperMetadata = {
  id: 'jee-main-2024-all-shifts',
  exam: 'JEE Main',
  year: 2024,
  shift: 'All Shifts',
  title: 'JEE Main 2024 (All Shifts)',
  durationSeconds: 10800, // 3 hours
  sections: [
    {
      name: 'Physics',
      questions: [
        {
          id: 1,
          prompt: 'A particle moves in a circular path with constant speed. What is the direction of acceleration?',
          options: [
            'Tangent to the circle',
            'Towards the center',
            'Away from the center',
            'Zero acceleration'
          ],
          correctAnswer: 1,
          solution: 'In uniform circular motion, the acceleration is centripetal, always directed towards the center of the circle.'
        },
        {
          id: 2,
          prompt: 'The SI unit of electric field intensity is:',
          options: ['N/C', 'C/N', 'J/C', 'C/J'],
          correctAnswer: 0,
          solution: 'Electric field intensity is force per unit charge, measured in Newton per Coulomb (N/C).'
        },
        {
          id: 3,
          prompt: 'Which of the following is a scalar quantity?',
          options: ['Force', 'Velocity', 'Work', 'Momentum'],
          correctAnswer: 2,
          solution: 'Work is a scalar quantity as it has only magnitude and no direction.'
        },
        {
          id: 4,
          prompt: 'The dimensional formula of Planck\'s constant is:',
          options: ['[ML²T⁻¹]', '[ML²T⁻²]', '[MLT⁻¹]', '[ML²T⁻³]'],
          correctAnswer: 0,
          solution: 'Planck\'s constant h = E/ν, where E is energy and ν is frequency. Dimension: [ML²T⁻²]/[T⁻¹] = [ML²T⁻¹]'
        },
        {
          id: 5,
          prompt: 'A convex lens of focal length 20 cm forms a real image at 60 cm. The object distance is:',
          options: ['30 cm', '15 cm', '10 cm', '40 cm'],
          correctAnswer: 0,
          solution: 'Using lens formula: 1/f = 1/v - 1/u. Given f=20cm, v=60cm. 1/20 = 1/60 - 1/u → u = 30 cm'
        },
        {
          id: 6,
          prompt: 'The escape velocity from Earth\'s surface is approximately:',
          options: ['11.2 km/s', '7.9 km/s', '9.8 km/s', '15.0 km/s'],
          correctAnswer: 0,
          solution: 'Escape velocity from Earth is approximately 11.2 km/s, calculated using v = √(2GM/R).'
        },
        {
          id: 7,
          prompt: 'In a Young\'s double slit experiment, the fringe width is:',
          options: ['λD/d', 'λd/D', 'Dd/λ', 'D/λd'],
          correctAnswer: 0,
          solution: 'Fringe width β = λD/d, where λ is wavelength, D is screen distance, and d is slit separation.'
        },
        {
          id: 8,
          prompt: 'The coefficient of linear expansion has dimensions:',
          options: ['[K⁻¹]', '[K]', '[LK⁻¹]', '[L⁻¹K⁻¹]'],
          correctAnswer: 0,
          solution: 'Coefficient of linear expansion α = ΔL/(L·ΔT), dimensionless length ratio per temperature, giving [K⁻¹].'
        },
        {
          id: 9,
          prompt: 'A wire of resistance R is stretched to double its length. The new resistance is:',
          options: ['R', '2R', '4R', 'R/2'],
          correctAnswer: 2,
          solution: 'When length doubles, area halves (volume constant). R = ρL/A, so new R = ρ(2L)/(A/2) = 4R.'
        },
        {
          id: 10,
          prompt: 'The magnetic field at the center of a circular coil carrying current is:',
          options: ['μ₀I/2r', 'μ₀I/r', '2μ₀I/r', 'μ₀Ir/2'],
          correctAnswer: 0,
          solution: 'Magnetic field at center of circular coil: B = μ₀I/2r, where I is current and r is radius.'
        }
      ]
    },
    {
      name: 'Chemistry',
      questions: [
        {
          id: 11,
          prompt: 'The IUPAC name of CH₃-CH(CH₃)-CH₂-CH₃ is:',
          options: ['2-methylbutane', '3-methylbutane', 'Isopentane', 'n-pentane'],
          correctAnswer: 0,
          solution: '2-methylbutane is the correct IUPAC name. The longest chain has 4 carbons with a methyl group at position 2.'
        },
        {
          id: 12,
          prompt: 'Which of the following is the strongest acid?',
          options: ['HF', 'HCl', 'HBr', 'HI'],
          correctAnswer: 3,
          solution: 'HI is the strongest acid among halogen acids due to weakest H-I bond and largest size of I⁻ ion.'
        },
        {
          id: 13,
          prompt: 'The oxidation state of Cr in K₂Cr₂O₇ is:',
          options: ['+6', '+7', '+5', '+4'],
          correctAnswer: 0,
          solution: 'In K₂Cr₂O₇: 2(+1) + 2x + 7(-2) = 0 → x = +6. Chromium has +6 oxidation state.'
        },
        {
          id: 14,
          prompt: 'Which quantum number determines the shape of an orbital?',
          options: ['Principal (n)', 'Azimuthal (l)', 'Magnetic (m)', 'Spin (s)'],
          correctAnswer: 1,
          solution: 'The azimuthal quantum number (l) determines the shape of the orbital (s, p, d, f).'
        },
        {
          id: 15,
          prompt: 'The hybridization of carbon in diamond is:',
          options: ['sp', 'sp²', 'sp³', 'sp³d'],
          correctAnswer: 2,
          solution: 'In diamond, each carbon atom forms 4 sigma bonds with tetrahedral geometry, indicating sp³ hybridization.'
        },
        {
          id: 16,
          prompt: 'Which of the following is an example of a Lewis acid?',
          options: ['NH₃', 'H₂O', 'BF₃', 'OH⁻'],
          correctAnswer: 2,
          solution: 'BF₃ is a Lewis acid as it can accept an electron pair due to incomplete octet of boron.'
        },
        {
          id: 17,
          prompt: 'The pH of 0.01 M HCl solution is:',
          options: ['1', '2', '3', '4'],
          correctAnswer: 1,
          solution: 'pH = -log[H⁺] = -log(0.01) = -log(10⁻²) = 2'
        },
        {
          id: 18,
          prompt: 'Which element has the highest electronegativity?',
          options: ['Oxygen', 'Fluorine', 'Nitrogen', 'Chlorine'],
          correctAnswer: 1,
          solution: 'Fluorine has the highest electronegativity (3.98 on Pauling scale) among all elements.'
        },
        {
          id: 19,
          prompt: 'The molecular geometry of SF₆ is:',
          options: ['Tetrahedral', 'Octahedral', 'Square planar', 'Trigonal bipyramidal'],
          correctAnswer: 1,
          solution: 'SF₆ has sp³d² hybridization with 6 bond pairs and no lone pairs, giving octahedral geometry.'
        },
        {
          id: 20,
          prompt: 'Which of the following is a primary alcohol?',
          options: ['2-propanol', '2-butanol', '1-butanol', 't-butanol'],
          correctAnswer: 2,
          solution: '1-butanol is a primary alcohol as the -OH group is attached to a carbon bonded to only one other carbon.'
        }
      ]
    },
    {
      name: 'Mathematics',
      questions: [
        {
          id: 21,
          prompt: 'The derivative of sin(x) with respect to x is:',
          options: ['cos(x)', '-cos(x)', 'sin(x)', '-sin(x)'],
          correctAnswer: 0,
          solution: 'd/dx[sin(x)] = cos(x) is a fundamental derivative formula.'
        },
        {
          id: 22,
          prompt: 'The value of ∫(1/x)dx is:',
          options: ['ln|x| + C', 'x² + C', '1/x² + C', 'e^x + C'],
          correctAnswer: 0,
          solution: 'The integral of 1/x is ln|x| + C, where C is the constant of integration.'
        },
        {
          id: 23,
          prompt: 'If A and B are two events such that P(A) = 0.4, P(B) = 0.5, and P(A∩B) = 0.2, then P(A∪B) is:',
          options: ['0.7', '0.9', '0.6', '0.8'],
          correctAnswer: 0,
          solution: 'P(A∪B) = P(A) + P(B) - P(A∩B) = 0.4 + 0.5 - 0.2 = 0.7'
        },
        {
          id: 24,
          prompt: 'The number of ways to arrange 5 different books on a shelf is:',
          options: ['120', '60', '24', '720'],
          correctAnswer: 0,
          solution: 'Number of arrangements = 5! = 5×4×3×2×1 = 120'
        },
        {
          id: 25,
          prompt: 'The equation of a circle with center (2, 3) and radius 5 is:',
          options: [
            '(x-2)² + (y-3)² = 25',
            '(x+2)² + (y+3)² = 25',
            '(x-2)² + (y-3)² = 5',
            'x² + y² = 25'
          ],
          correctAnswer: 0,
          solution: 'Circle equation: (x-h)² + (y-k)² = r², where (h,k) is center and r is radius.'
        },
        {
          id: 26,
          prompt: 'The determinant of a 2×2 matrix [[a,b],[c,d]] is:',
          options: ['ad - bc', 'ac - bd', 'ab - cd', 'ad + bc'],
          correctAnswer: 0,
          solution: 'For a 2×2 matrix, determinant = ad - bc'
        },
        {
          id: 27,
          prompt: 'The sum of first n natural numbers is:',
          options: ['n(n+1)/2', 'n(n-1)/2', 'n²', '(n+1)²/2'],
          correctAnswer: 0,
          solution: 'Sum of first n natural numbers = 1+2+3+...+n = n(n+1)/2'
        },
        {
          id: 28,
          prompt: 'The slope of a line perpendicular to y = 2x + 3 is:',
          options: ['-1/2', '2', '-2', '1/2'],
          correctAnswer: 0,
          solution: 'If slope of line is m, perpendicular line has slope -1/m. Here m=2, so perpendicular slope = -1/2.'
        },
        {
          id: 29,
          prompt: 'The value of log₁₀(1000) is:',
          options: ['3', '2', '4', '10'],
          correctAnswer: 0,
          solution: 'log₁₀(1000) = log₁₀(10³) = 3'
        },
        {
          id: 30,
          prompt: 'The roots of the equation x² - 5x + 6 = 0 are:',
          options: ['2 and 3', '1 and 6', '-2 and -3', '5 and 1'],
          correctAnswer: 0,
          solution: 'Factoring: (x-2)(x-3) = 0, so x = 2 or x = 3'
        }
      ]
    }
  ]
};
