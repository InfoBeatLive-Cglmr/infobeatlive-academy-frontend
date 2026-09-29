// Reuse enums (keep consistent across your system)
export type EmploymentStatus =
  | 'employed'
  | 'self_employed'
  | 'unemployed'
  | 'student';

export type MaritalStatus =
  | 'single'
  | 'married'
  | 'divorced'
  | 'widowed';

export type TopicStatus = 'pending' | 'in_progress' | 'completed';

// Topic Interface (CheckBestFitsTopics)
export interface CheckBestFitTopic {
  id: string;
  checkingId: string;

  title: string;
  description: string;

  content?: any;
  audioUrl?: string;
  imageUrl?: string;
  videoUrl?: string;

  status: TopicStatus;
  isCompleted: boolean;

  createdAt: string;
  updatedAt: string;
}

// Main Interface (CheckBestFits)
export interface CheckBestFit {
  id: string;
  userId: string;

  title?: string;
  description?: string;

  country: string;
  educationLevel: string;
  dateOfBirth: string;

  employmentStatus: EmploymentStatus;
  maritalStatus: MaritalStatus;
  numberOfChildren: number;

  language: string;

  topicsCompleted?: number;
  totalTopics?: number;
  completionPercentage?: number;

  industryOrWorkField: string;
  dreamCareerRole: string;

  previousFieldsOfStudy?: string;
  additionalContext?: string;

  topics: CheckBestFitTopic[];

  createdAt: string;
  updatedAt: string;
}

export const INITIAL_MOCK_CHECK_BEST_FITS: CheckBestFit[] = [
  {
    id: 'check_fit_01',
    userId: 'user_001',

    title: 'Career Path Fit Analysis',
    description:
      'AI-powered analysis to determine the most suitable career path, country, and study direction based on user profile and goals.',

    country: 'Nigeria',
    educationLevel: "Bachelor's Degree",
    dateOfBirth: '2000-08-15',

    employmentStatus: 'employed',
    maritalStatus: 'single',
    numberOfChildren: 0,

    language: 'English',

    topicsCompleted: 1,
    totalTopics: 3,
    completionPercentage: 33,

    industryOrWorkField: 'Software Engineering',
    dreamCareerRole: 'Senior Backend Engineer (Global Remote)',

    previousFieldsOfStudy: 'Computer Science',
    additionalContext:
      'Interested in relocating abroad or working remotely for US-based companies. Strong backend experience with Node.js and distributed systems.',

    createdAt: '2026-02-01',
    updatedAt: '2026-02-05',

    topics: [
      {
        id: 'fit_topic_01',
        checkingId: 'check_fit_01',
        title: 'Profile Analysis',
        description:
          'Analyze user background, education, and experience to determine strengths and gaps.',
        content: {
          insights: [
            'Strong backend engineering experience',
            'Good foundation in distributed systems',
            'Needs stronger global exposure',
          ],
        },
        status: 'completed',
        isCompleted: true,
        createdAt: '2026-02-01',
        updatedAt: '2026-02-02',
      },
      {
        id: 'fit_topic_02',
        checkingId: 'check_fit_01',
        title: 'Career Matching',
        description:
          'Match user profile to high-demand global career opportunities.',
        content: {
          matches: [
            'Backend Engineer (Remote US)',
            'Cloud Infrastructure Engineer',
            'Platform Engineer',
          ],
        },
        status: 'in_progress',
        isCompleted: false,
        createdAt: '2026-02-02',
        updatedAt: '2026-02-04',
      },
      {
        id: 'fit_topic_03',
        checkingId: 'check_fit_01',
        title: 'Country & Opportunity Fit',
        description:
          'Evaluate best countries and markets based on career goals and lifestyle expectations.',
        content: {
          countries: ['USA', 'Canada', 'Germany', 'Remote-first companies'],
        },
        status: 'pending',
        isCompleted: false,
        createdAt: '2026-02-03',
        updatedAt: '2026-02-03',
      },
    ],
  },
    {
    id: 'check_fit_02',
    userId: 'user_001',

    title: 'Career Path Fit Analysis',
    description:
      'AI-powered analysis to determine the most suitable career path, country, and study direction based on user profile and goals.',

    country: 'Nigeria',
    educationLevel: "Bachelor's Degree",
    dateOfBirth: '2000-08-15',

    employmentStatus: 'employed',
    maritalStatus: 'single',
    numberOfChildren: 0,

    language: 'English',

    topicsCompleted: 1,
    totalTopics: 3,
    completionPercentage: 33,

    industryOrWorkField: 'Software Engineering',
    dreamCareerRole: 'Senior Backend Engineer (Global Remote)',

    previousFieldsOfStudy: 'Computer Science',
    additionalContext:
      'Interested in relocating abroad or working remotely for US-based companies. Strong backend experience with Node.js and distributed systems.',

    createdAt: '2026-02-01',
    updatedAt: '2026-02-05',

    topics: [
      {
        id: 'fit_topic_01',
        checkingId: 'check_fit_01',
        title: 'Profile Analysis',
        description:
          'Analyze user background, education, and experience to determine strengths and gaps.',
        content: {
          insights: [
            'Strong backend engineering experience',
            'Good foundation in distributed systems',
            'Needs stronger global exposure',
          ],
        },
        status: 'completed',
        isCompleted: true,
        createdAt: '2026-02-01',
        updatedAt: '2026-02-02',
      },
      {
        id: 'fit_topic_02',
        checkingId: 'check_fit_01',
        title: 'Career Matching',
        description:
          'Match user profile to high-demand global career opportunities.',
        content: {
          matches: [
            'Backend Engineer (Remote US)',
            'Cloud Infrastructure Engineer',
            'Platform Engineer',
          ],
        },
        status: 'in_progress',
        isCompleted: false,
        createdAt: '2026-02-02',
        updatedAt: '2026-02-04',
      },
      {
        id: 'fit_topic_03',
        checkingId: 'check_fit_01',
        title: 'Country & Opportunity Fit',
        description:
          'Evaluate best countries and markets based on career goals and lifestyle expectations.',
        content: {
          countries: ['USA', 'Canada', 'Germany', 'Remote-first companies'],
        },
        status: 'pending',
        isCompleted: false,
        createdAt: '2026-02-03',
        updatedAt: '2026-02-03',
      },
    ],
  },
    {
    id: 'check_fit_03',
    userId: 'user_001',

    title: 'Career Path Fit Analysis',
    description:
      'AI-powered analysis to determine the most suitable career path, country, and study direction based on user profile and goals.',

    country: 'Nigeria',
    educationLevel: "Bachelor's Degree",
    dateOfBirth: '2000-08-15',

    employmentStatus: 'employed',
    maritalStatus: 'single',
    numberOfChildren: 0,

    language: 'English',

    topicsCompleted: 1,
    totalTopics: 3,
    completionPercentage: 33,

    industryOrWorkField: 'Software Engineering',
    dreamCareerRole: 'Senior Backend Engineer (Global Remote)',

    previousFieldsOfStudy: 'Computer Science',
    additionalContext:
      'Interested in relocating abroad or working remotely for US-based companies. Strong backend experience with Node.js and distributed systems.',

    createdAt: '2026-02-01',
    updatedAt: '2026-02-05',

    topics: [
      {
        id: 'fit_topic_01',
        checkingId: 'check_fit_01',
        title: 'Profile Analysis',
        description:
          'Analyze user background, education, and experience to determine strengths and gaps.',
        content: {
          insights: [
            'Strong backend engineering experience',
            'Good foundation in distributed systems',
            'Needs stronger global exposure',
          ],
        },
        status: 'completed',
        isCompleted: true,
        createdAt: '2026-02-01',
        updatedAt: '2026-02-02',
      },
      {
        id: 'fit_topic_02',
        checkingId: 'check_fit_01',
        title: 'Career Matching',
        description:
          'Match user profile to high-demand global career opportunities.',
        content: {
          matches: [
            'Backend Engineer (Remote US)',
            'Cloud Infrastructure Engineer',
            'Platform Engineer',
          ],
        },
        status: 'in_progress',
        isCompleted: false,
        createdAt: '2026-02-02',
        updatedAt: '2026-02-04',
      },
      {
        id: 'fit_topic_03',
        checkingId: 'check_fit_01',
        title: 'Country & Opportunity Fit',
        description:
          'Evaluate best countries and markets based on career goals and lifestyle expectations.',
        content: {
          countries: ['USA', 'Canada', 'Germany', 'Remote-first companies'],
        },
        status: 'pending',
        isCompleted: false,
        createdAt: '2026-02-03',
        updatedAt: '2026-02-03',
      },
    ],
  },
    {
    id: 'check_fit_04',
    userId: 'user_001',

    title: 'Career Path Fit Analysis',
    description:
      'AI-powered analysis to determine the most suitable career path, country, and study direction based on user profile and goals.',

    country: 'Nigeria',
    educationLevel: "Bachelor's Degree",
    dateOfBirth: '2000-08-15',

    employmentStatus: 'employed',
    maritalStatus: 'single',
    numberOfChildren: 0,

    language: 'English',

    topicsCompleted: 1,
    totalTopics: 3,
    completionPercentage: 33,

    industryOrWorkField: 'Software Engineering',
    dreamCareerRole: 'Senior Backend Engineer (Global Remote)',

    previousFieldsOfStudy: 'Computer Science',
    additionalContext:
      'Interested in relocating abroad or working remotely for US-based companies. Strong backend experience with Node.js and distributed systems.',

    createdAt: '2026-02-01',
    updatedAt: '2026-02-05',

    topics: [
      {
        id: 'fit_topic_01',
        checkingId: 'check_fit_01',
        title: 'Profile Analysis',
        description:
          'Analyze user background, education, and experience to determine strengths and gaps.',
        content: {
          insights: [
            'Strong backend engineering experience',
            'Good foundation in distributed systems',
            'Needs stronger global exposure',
          ],
        },
        status: 'completed',
        isCompleted: true,
        createdAt: '2026-02-01',
        updatedAt: '2026-02-02',
      },
      {
        id: 'fit_topic_02',
        checkingId: 'check_fit_01',
        title: 'Career Matching',
        description:
          'Match user profile to high-demand global career opportunities.',
        content: {
          matches: [
            'Backend Engineer (Remote US)',
            'Cloud Infrastructure Engineer',
            'Platform Engineer',
          ],
        },
        status: 'in_progress',
        isCompleted: false,
        createdAt: '2026-02-02',
        updatedAt: '2026-02-04',
      },
      {
        id: 'fit_topic_03',
        checkingId: 'check_fit_01',
        title: 'Country & Opportunity Fit',
        description:
          'Evaluate best countries and markets based on career goals and lifestyle expectations.',
        content: {
          countries: ['USA', 'Canada', 'Germany', 'Remote-first companies'],
        },
        status: 'pending',
        isCompleted: false,
        createdAt: '2026-02-03',
        updatedAt: '2026-02-03',
      },
    ],
  },
    {
    id: 'check_fit_05',
    userId: 'user_001',

    title: 'Career Path Fit Analysis',
    description:
      'AI-powered analysis to determine the most suitable career path, country, and study direction based on user profile and goals.',

    country: 'Nigeria',
    educationLevel: "Bachelor's Degree",
    dateOfBirth: '2000-08-15',

    employmentStatus: 'employed',
    maritalStatus: 'single',
    numberOfChildren: 0,

    language: 'English',

    topicsCompleted: 1,
    totalTopics: 3,
    completionPercentage: 33,

    industryOrWorkField: 'Software Engineering',
    dreamCareerRole: 'Senior Backend Engineer (Global Remote)',

    previousFieldsOfStudy: 'Computer Science',
    additionalContext:
      'Interested in relocating abroad or working remotely for US-based companies. Strong backend experience with Node.js and distributed systems.',

    createdAt: '2026-02-01',
    updatedAt: '2026-02-05',

    topics: [
      {
        id: 'fit_topic_01',
        checkingId: 'check_fit_01',
        title: 'Profile Analysis',
        description:
          'Analyze user background, education, and experience to determine strengths and gaps.',
        content: {
          insights: [
            'Strong backend engineering experience',
            'Good foundation in distributed systems',
            'Needs stronger global exposure',
          ],
        },
        status: 'completed',
        isCompleted: true,
        createdAt: '2026-02-01',
        updatedAt: '2026-02-02',
      },
      {
        id: 'fit_topic_02',
        checkingId: 'check_fit_01',
        title: 'Career Matching',
        description:
          'Match user profile to high-demand global career opportunities.',
        content: {
          matches: [
            'Backend Engineer (Remote US)',
            'Cloud Infrastructure Engineer',
            'Platform Engineer',
          ],
        },
        status: 'in_progress',
        isCompleted: false,
        createdAt: '2026-02-02',
        updatedAt: '2026-02-04',
      },
      {
        id: 'fit_topic_03',
        checkingId: 'check_fit_01',
        title: 'Country & Opportunity Fit',
        description:
          'Evaluate best countries and markets based on career goals and lifestyle expectations.',
        content: {
          countries: ['USA', 'Canada', 'Germany', 'Remote-first companies'],
        },
        status: 'pending',
        isCompleted: false,
        createdAt: '2026-02-03',
        updatedAt: '2026-02-03',
      },
    ],
  },
    {
    id: 'check_fit_06',
    userId: 'user_001',

    title: 'Career Path Fit Analysis',
    description:
      'AI-powered analysis to determine the most suitable career path, country, and study direction based on user profile and goals.',

    country: 'Nigeria',
    educationLevel: "Bachelor's Degree",
    dateOfBirth: '2000-08-15',

    employmentStatus: 'employed',
    maritalStatus: 'single',
    numberOfChildren: 0,

    language: 'English',

    topicsCompleted: 1,
    totalTopics: 3,
    completionPercentage: 33,

    industryOrWorkField: 'Software Engineering',
    dreamCareerRole: 'Senior Backend Engineer (Global Remote)',

    previousFieldsOfStudy: 'Computer Science',
    additionalContext:
      'Interested in relocating abroad or working remotely for US-based companies. Strong backend experience with Node.js and distributed systems.',

    createdAt: '2026-02-01',
    updatedAt: '2026-02-05',

    topics: [
      {
        id: 'fit_topic_01',
        checkingId: 'check_fit_01',
        title: 'Profile Analysis',
        description:
          'Analyze user background, education, and experience to determine strengths and gaps.',
        content: {
          insights: [
            'Strong backend engineering experience',
            'Good foundation in distributed systems',
            'Needs stronger global exposure',
          ],
        },
        status: 'completed',
        isCompleted: true,
        createdAt: '2026-02-01',
        updatedAt: '2026-02-02',
      },
      {
        id: 'fit_topic_02',
        checkingId: 'check_fit_01',
        title: 'Career Matching',
        description:
          'Match user profile to high-demand global career opportunities.',
        content: {
          matches: [
            'Backend Engineer (Remote US)',
            'Cloud Infrastructure Engineer',
            'Platform Engineer',
          ],
        },
        status: 'in_progress',
        isCompleted: false,
        createdAt: '2026-02-02',
        updatedAt: '2026-02-04',
      },
      {
        id: 'fit_topic_03',
        checkingId: 'check_fit_01',
        title: 'Country & Opportunity Fit',
        description:
          'Evaluate best countries and markets based on career goals and lifestyle expectations.',
        content: {
          countries: ['USA', 'Canada', 'Germany', 'Remote-first companies'],
        },
        status: 'pending',
        isCompleted: false,
        createdAt: '2026-02-03',
        updatedAt: '2026-02-03',
      },
    ],
  },
];