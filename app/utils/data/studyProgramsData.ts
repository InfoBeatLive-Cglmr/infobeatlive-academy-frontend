export interface AcademicTier {
  id: string;
  label: string;
  description: string;
  requiresFieldOfStudy: boolean;
  fieldPlaceholder?: string;
  levels: string[]; // High-level generalized qualifications/stages
}

export interface CountryAcademicConfig {
  countryCode: string; // ISO 2-letter
  countryName: string;
  flagEmoji: string;
  institutions: AcademicTier[];
}

export const GLOBAL_ACADEMIC_DATASET: CountryAcademicConfig[] = [
  {
    countryCode: 'US',
    countryName: 'United States',
    flagEmoji: '🇺🇸',
    institutions: [
      {
        id: 'k12_system',
        label: 'K-12 Education System',
        description: 'Elementary, middle, and high school diploma pathways.',
        requiresFieldOfStudy: false,
        levels: ['Elementary School', 'Middle School', 'High School Diploma']
      },
      {
        id: 'college_community',
        label: 'Community & Technical College',
        description: 'Two-year associate degree and professional diploma programs.',
        requiresFieldOfStudy: true,
        fieldPlaceholder: 'e.g. Cybersecurity Technology, Dental Hygiene',
        levels: ['Associate of Arts (AA)', 'Associate of Science (AS)', 'Vocational Certificate']
      },
      {
        id: 'university',
        label: 'University & Higher Education',
        description: 'Four-year undergraduate and graduate degree tracks.',
        requiresFieldOfStudy: true,
        fieldPlaceholder: 'e.g. Data Science, Mechanical Engineering, Finance',
        levels: [
          'Bachelor’s Degree (B.S. / B.A.)',
          'Master’s Degree (M.S. / M.A. / MBA)',
          'Doctoral Degree (Ph.D. / Ed.D. / Professional Doctorate)'
        ]
      }
    ]
  },
  {
    countryCode: 'UK',
    countryName: 'United Kingdom',
    flagEmoji: '🇬🇧',
    institutions: [
      {
        id: 'k12_system',
        label: 'Primary & Secondary Education',
        description: 'National Curriculum covering Key Stages, GCSEs, and A-Levels.',
        requiresFieldOfStudy: false,
        levels: ['Primary School (Key Stages 1-2)', 'Secondary School (GCSEs)', 'Sixth Form / Further Education (A-Levels)']
      },
      {
        id: 'college_further',
        label: 'Further Education College',
        description: 'Vocational training, foundation degrees, and higher national diplomas.',
        requiresFieldOfStudy: true,
        fieldPlaceholder: 'e.g. Software Development, Creative Arts Technology',
        levels: ['Higher National Certificate (HNC)', 'Higher National Diploma (HND)', 'Foundation Degree']
      },
      {
        id: 'university',
        label: 'University Higher Education',
        description: 'Undergraduate and postgraduate degree programs.',
        requiresFieldOfStudy: true,
        fieldPlaceholder: 'e.g. Artificial Intelligence, Law, International Relations',
        levels: [
          'Bachelor’s Degree (BSc / BA / BEng)',
          'Master’s Degree (MSc / MA / MRes)',
          'Doctoral Degree (PhD / DPhil)'
        ]
      }
    ]
  },
  {
    countryCode: 'CA',
    countryName: 'Canada',
    flagEmoji: '🇨🇦',
    institutions: [
      {
        id: 'k12_system',
        label: 'K-12 School System',
        description: 'Provincial curriculum standards for elementary and secondary education.',
        requiresFieldOfStudy: false,
        levels: ['Elementary School', 'Junior High / Middle School', 'Secondary / High School Diploma']
      },
      {
        id: 'college_applied',
        label: 'College of Applied Arts & Technology',
        description: 'Career-focused diplomas, advanced diplomas, and certificates.',
        requiresFieldOfStudy: true,
        fieldPlaceholder: 'e.g. Cloud Architecture, Business Analytics',
        levels: ['College Certificate', 'College Diploma', 'Advanced College Diploma']
      },
      {
        id: 'university',
        label: 'University Degree Studies',
        description: 'Academic degree pathways across Canadian universities.',
        requiresFieldOfStudy: true,
        fieldPlaceholder: 'e.g. Software Engineering, Commerce, Health Sciences',
        levels: ['Bachelor’s Degree', 'Master’s Degree', 'Doctoral Degree (Ph.D.)']
      }
    ]
  },
    {
    countryCode: 'NG',
    countryName: 'Nigeria',
    flagEmoji: '🇳🇬',
    institutions: [
      {
        id: 'k12_system',
        label: 'K-12 Basic & Secondary Education',
        description: 'Early childhood, basic primary, and senior secondary curriculum standard.',
        requiresFieldOfStudy: false,
        levels: ['Nursery / Early Years', 'Primary Education', 'Secondary Education (Junior & Senior)']
      },
      {
        id: 'college_polytechnic',
        label: 'College & Polytechnic Track',
        description: 'Technical, vocational, and teacher education qualifications.',
        requiresFieldOfStudy: true,
        fieldPlaceholder: 'e.g. Electrical Engineering Technology, Business Admin',
        levels: [
          'College of Arts, Science & Technology (CASS)',
          'National Diploma (ND)',
          'Higher National Diploma (HND)',
          'Nigeria Certificate in Education (NCE)'
        ]
      },
      {
        id: 'university',
        label: 'University Tertiary Track',
        description: 'Undergraduate and postgraduate degree tracks.',
        requiresFieldOfStudy: true,
        fieldPlaceholder: 'e.g. Computer Science, Medicine & Surgery, Economics',
        levels: [
          'Bachelor’s Degree (B.Sc / B.A / B.Eng)',
          'Master’s Degree (M.Sc / M.A / MBA)',
          'Doctorate Degree (Ph.D)'
        ]
      }
    ]
  },
];

export const GLOBAL_PROFESSIONAL_PROGRAMS: AcademicTier = {
  id: 'professional_global',
  label: 'Professional & Executive Programs',
  description: 'Global industry certifications, technical tracks, and career development.',
  requiresFieldOfStudy: true,
  fieldPlaceholder: 'e.g. Lead System Architect, DevOps Director, Solution Architect',
  levels: [
    'Executive Leadership Certification',
    'Specialized Technical Track',
    'Industry License & Certification Prep',
    'Continuous Professional Development (CPD)'
  ]
};