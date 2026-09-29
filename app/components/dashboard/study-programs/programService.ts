// Enums (optional but recommended for consistency)
export type StudyPace = 'full_time' | 'part_time' | 'self_paced';

export type TopicStatus = 'pending' | 'in_progress' | 'completed';

// Topic Interface (matches StudyProgramTopics)
export interface StudyProgramTopic {
  id: string;
  programId: string;
  title: string;
  description: string;
  content?: any; // JSON from Prisma
  audioUrl?: string;
  imageUrl?: string;
  videoUrl?: string;
  status: TopicStatus;
  isCompleted: boolean;
  createdAt: string;
  updatedAt: string;
}

// Main Study Program Interface (matches StudyPrograms)
export interface StudyProgram {
  id: string;
  userId: string;
  title?: string;
  description?: string;

  country: string;
  institutionType: string;
  qualificationType: string;
  institutionName: string;
  fieldOfStudy: string;
  language: string;
  studyPace: StudyPace;
  learningGoals: string;

  topicsCompleted?: number;
  totalTopics?: number;
  completionPercentage?: number;

  topics: StudyProgramTopic[];

  createdAt: string;
  updatedAt: string;
}

export const INITIAL_MOCK_STUDY_PROGRAMS: StudyProgram[] = [
  {
    id: 'study_prog_01',
    userId: 'user_001',

    title: 'AI-Powered Career & Planning',
    description:
      `A structured study program designed to guide students in selecting career paths, understanding academic 
      requirements, and aligning lifestyle expectations.`,

    country: 'United States',
    institutionType: 'University',
    qualificationType: 'Bachelor Degree',
    institutionName: 'InfoBeatLive AI Faculty',
    fieldOfStudy: 'Computer Science & Career Intelligence',

    
    topicsCompleted:3,
    totalTopics: 12,
    completionPercentage: 35,

    language: 'English',

    studyPace: 'full_time',
    learningGoals:
      'Help students discover optimal career paths, understand real-world industry expectations, and align education with future income and lifestyle goals.',

    createdAt: '2026-01-01',
    updatedAt: '2026-01-10',

    topics: [
      {
        id: 'topic_01',
        programId: 'study_prog_01',
        title: 'Introduction to Career Intelligence',
        description:
          'Understand how career paths are structured globally and how to choose a field based on strengths and market demand.',
        content: {
          modules: [
            'Career Landscape Overview',
            'High-Income Skills Analysis',
            'Future of Work Trends',
          ],
        },
        videoUrl: '',
        audioUrl: '',
        imageUrl: '',
        status: 'completed',
        isCompleted: true,
        createdAt: '2026-01-01',
        updatedAt: '2026-01-02',
      },
      {
        id: 'topic_02',
        programId: 'study_prog_01',
        title: 'Field of Study Selection',
        description:
          'Deep dive into selecting the right academic field based on personal goals and global opportunities.',
        content: {
          modules: [
            'STEM vs Business vs Creative Fields',
            'Demand vs Passion Tradeoff',
            'Global Job Market Insights',
          ],
        },
        status: 'in_progress',
        isCompleted: false,
        createdAt: '2026-01-02',
        updatedAt: '2026-01-05',
      },
      {
        id: 'topic_03',
        programId: 'study_prog_01',
        title: 'University & Country Selection',
        description:
          'Compare countries, universities, and cost of education vs ROI.',
        content: {
          modules: [
            'USA vs UK vs Canada vs Europe',
            'Tuition vs ROI',
            'Visa & Work Opportunities',
          ],
        },
        status: 'pending',
        isCompleted: false,
        createdAt: '2026-01-03',
        updatedAt: '2026-01-03',
      },
    ],
  },
    {
    id: 'study_prog_02',
    userId: 'user_001',

    title: 'AI-Powered Career & Planning',
    description:
      'A structured study program designed to guide students in selecting career paths, understanding academic requirements, and aligning lifestyle expectations.',

    country: 'United States',
    institutionType: 'University',
    qualificationType: 'Bachelor Degree',
    institutionName: 'InfoBeatLive AI Faculty',
    fieldOfStudy: 'Computer Science & Career Intelligence',

    
    topicsCompleted:3,
    totalTopics: 12,
    completionPercentage: 35,

    language: 'English',

    studyPace: 'full_time',
    learningGoals:
      'Help students discover optimal career paths, understand real-world industry expectations, and align education with future income and lifestyle goals.',

    createdAt: '2026-01-01',
    updatedAt: '2026-01-10',

    topics: [
      {
        id: 'topic_01',
        programId: 'study_prog_01',
        title: 'Introduction to Career Intelligence',
        description:
          'Understand how career paths are structured globally and how to choose a field based on strengths and market demand.',
        content: {
          modules: [
            'Career Landscape Overview',
            'High-Income Skills Analysis',
            'Future of Work Trends',
          ],
        },
        videoUrl: '',
        audioUrl: '',
        imageUrl: '',
        status: 'completed',
        isCompleted: true,
        createdAt: '2026-01-01',
        updatedAt: '2026-01-02',
      },
      {
        id: 'topic_02',
        programId: 'study_prog_01',
        title: 'Field of Study Selection',
        description:
          'Deep dive into selecting the right academic field based on personal goals and global opportunities.',
        content: {
          modules: [
            'STEM vs Business vs Creative Fields',
            'Demand vs Passion Tradeoff',
            'Global Job Market Insights',
          ],
        },
        status: 'in_progress',
        isCompleted: false,
        createdAt: '2026-01-02',
        updatedAt: '2026-01-05',
      },
      {
        id: 'topic_03',
        programId: 'study_prog_01',
        title: 'University & Country Selection',
        description:
          'Compare countries, universities, and cost of education vs ROI.',
        content: {
          modules: [
            'USA vs UK vs Canada vs Europe',
            'Tuition vs ROI',
            'Visa & Work Opportunities',
          ],
        },
        status: 'pending',
        isCompleted: false,
        createdAt: '2026-01-03',
        updatedAt: '2026-01-03',
      },
    ],
  },
    {
    id: 'study_prog_03',
    userId: 'user_001',

    title: 'AI-Powered Career & Planning',
    description:
      'A structured study program designed to guide students in selecting career paths, understanding academic requirements, and aligning lifestyle expectations.',

    country: 'United States',
    institutionType: 'University',
    qualificationType: 'Bachelor Degree',
    institutionName: 'InfoBeatLive AI Faculty',
    fieldOfStudy: 'Computer Science & Career Intelligence',

    
    topicsCompleted:3,
    totalTopics: 12,
    completionPercentage: 35,

    language: 'English',

    studyPace: 'full_time',
    learningGoals:
      'Help students discover optimal career paths, understand real-world industry expectations, and align education with future income and lifestyle goals.',

    createdAt: '2026-01-01',
    updatedAt: '2026-01-10',

    topics: [
      {
        id: 'topic_01',
        programId: 'study_prog_01',
        title: 'Introduction to Career Intelligence',
        description:
          'Understand how career paths are structured globally and how to choose a field based on strengths and market demand.',
        content: {
          modules: [
            'Career Landscape Overview',
            'High-Income Skills Analysis',
            'Future of Work Trends',
          ],
        },
        videoUrl: '',
        audioUrl: '',
        imageUrl: '',
        status: 'completed',
        isCompleted: true,
        createdAt: '2026-01-01',
        updatedAt: '2026-01-02',
      },
      {
        id: 'topic_02',
        programId: 'study_prog_01',
        title: 'Field of Study Selection',
        description:
          'Deep dive into selecting the right academic field based on personal goals and global opportunities.',
        content: {
          modules: [
            'STEM vs Business vs Creative Fields',
            'Demand vs Passion Tradeoff',
            'Global Job Market Insights',
          ],
        },
        status: 'in_progress',
        isCompleted: false,
        createdAt: '2026-01-02',
        updatedAt: '2026-01-05',
      },
      {
        id: 'topic_03',
        programId: 'study_prog_01',
        title: 'University & Country Selection',
        description:
          'Compare countries, universities, and cost of education vs ROI.',
        content: {
          modules: [
            'USA vs UK vs Canada vs Europe',
            'Tuition vs ROI',
            'Visa & Work Opportunities',
          ],
        },
        status: 'pending',
        isCompleted: false,
        createdAt: '2026-01-03',
        updatedAt: '2026-01-03',
      },
    ],
  },
    {
    id: 'study_prog_04',
    userId: 'user_001',

    title: 'AI-Powered Career & Planning',
    description:
      'A structured study program designed to guide students in selecting career paths, understanding academic requirements, and aligning lifestyle expectations.',

    country: 'United States',
    institutionType: 'University',
    qualificationType: 'Bachelor Degree',
    institutionName: 'InfoBeatLive AI Faculty',
    fieldOfStudy: 'Computer Science & Career Intelligence',

    
    topicsCompleted:3,
    totalTopics: 12,
    completionPercentage: 35,

    language: 'English',

    studyPace: 'full_time',
    learningGoals:
      'Help students discover optimal career paths, understand real-world industry expectations, and align education with future income and lifestyle goals.',

    createdAt: '2026-01-01',
    updatedAt: '2026-01-10',

    topics: [
      {
        id: 'topic_01',
        programId: 'study_prog_01',
        title: 'Introduction to Career Intelligence',
        description:
          'Understand how career paths are structured globally and how to choose a field based on strengths and market demand.',
        content: {
          modules: [
            'Career Landscape Overview',
            'High-Income Skills Analysis',
            'Future of Work Trends',
          ],
        },
        videoUrl: '',
        audioUrl: '',
        imageUrl: '',
        status: 'completed',
        isCompleted: true,
        createdAt: '2026-01-01',
        updatedAt: '2026-01-02',
      },
      {
        id: 'topic_02',
        programId: 'study_prog_01',
        title: 'Field of Study Selection',
        description:
          'Deep dive into selecting the right academic field based on personal goals and global opportunities.',
        content: {
          modules: [
            'STEM vs Business vs Creative Fields',
            'Demand vs Passion Tradeoff',
            'Global Job Market Insights',
          ],
        },
        status: 'in_progress',
        isCompleted: false,
        createdAt: '2026-01-02',
        updatedAt: '2026-01-05',
      },
      {
        id: 'topic_03',
        programId: 'study_prog_01',
        title: 'University & Country Selection',
        description:
          'Compare countries, universities, and cost of education vs ROI.',
        content: {
          modules: [
            'USA vs UK vs Canada vs Europe',
            'Tuition vs ROI',
            'Visa & Work Opportunities',
          ],
        },
        status: 'pending',
        isCompleted: false,
        createdAt: '2026-01-03',
        updatedAt: '2026-01-03',
      },
    ],
  },
    {
    id: 'study_prog_05',
    userId: 'user_001',

    title: 'AI-Powered Career &  Planning',
    description:
      'A structured study program designed to guide students in selecting career paths, understanding academic requirements, and aligning lifestyle expectations.',

    country: 'United States',
    institutionType: 'University',
    qualificationType: 'Bachelor Degree',
    institutionName: 'InfoBeatLive AI Faculty',
    fieldOfStudy: 'Computer Science & Career Intelligence',

    
    topicsCompleted:3,
    totalTopics: 12,
    completionPercentage: 35,

    language: 'English',

    studyPace: 'full_time',
    learningGoals:
      'Help students discover optimal career paths, understand real-world industry expectations, and align education with future income and lifestyle goals.',

    createdAt: '2026-01-01',
    updatedAt: '2026-01-10',

    topics: [
      {
        id: 'topic_01',
        programId: 'study_prog_01',
        title: 'Introduction to Career Intelligence',
        description:
          'Understand how career paths are structured globally and how to choose a field based on strengths and market demand.',
        content: {
          modules: [
            'Career Landscape Overview',
            'High-Income Skills Analysis',
            'Future of Work Trends',
          ],
        },
        videoUrl: '',
        audioUrl: '',
        imageUrl: '',
        status: 'completed',
        isCompleted: true,
        createdAt: '2026-01-01',
        updatedAt: '2026-01-02',
      },
      {
        id: 'topic_02',
        programId: 'study_prog_01',
        title: 'Field of Study Selection',
        description:
          'Deep dive into selecting the right academic field based on personal goals and global opportunities.',
        content: {
          modules: [
            'STEM vs Business vs Creative Fields',
            'Demand vs Passion Tradeoff',
            'Global Job Market Insights',
          ],
        },
        status: 'in_progress',
        isCompleted: false,
        createdAt: '2026-01-02',
        updatedAt: '2026-01-05',
      },
      {
        id: 'topic_03',
        programId: 'study_prog_01',
        title: 'University & Country Selection',
        description:
          'Compare countries, universities, and cost of education vs ROI.',
        content: {
          modules: [
            'USA vs UK vs Canada vs Europe',
            'Tuition vs ROI',
            'Visa & Work Opportunities',
          ],
        },
        status: 'pending',
        isCompleted: false,
        createdAt: '2026-01-03',
        updatedAt: '2026-01-03',
      },
    ],
  },
    {
    id: 'study_prog_06',
    userId: 'user_001',

    title: 'AI-Powered Career &  Planning',
    description:
      'A structured study program designed to guide students in selecting career paths, understanding academic requirements, and aligning lifestyle expectations.',

    country: 'United States',
    institutionType: 'University',
    qualificationType: 'Bachelor Degree',
    institutionName: 'InfoBeatLive AI Faculty',
    fieldOfStudy: 'Computer Science & Career Intelligence',

    
    topicsCompleted:3,
    totalTopics: 12,
    completionPercentage: 35,

    language: 'English',

    studyPace: 'full_time',
    learningGoals:
      'Help students discover optimal career paths, understand real-world industry expectations, and align education with future income and lifestyle goals.',

    createdAt: '2026-01-01',
    updatedAt: '2026-01-10',

    topics: [
      {
        id: 'topic_01',
        programId: 'study_prog_01',
        title: 'Introduction to Career Intelligence',
        description:
          'Understand how career paths are structured globally and how to choose a field based on strengths and market demand.',
        content: {
          modules: [
            'Career Landscape Overview',
            'High-Income Skills Analysis',
            'Future of Work Trends',
          ],
        },
        videoUrl: '',
        audioUrl: '',
        imageUrl: '',
        status: 'completed',
        isCompleted: true,
        createdAt: '2026-01-01',
        updatedAt: '2026-01-02',
      },
      {
        id: 'topic_02',
        programId: 'study_prog_01',
        title: 'Field of Study Selection',
        description:
          'Deep dive into selecting the right academic field based on personal goals and global opportunities.',
        content: {
          modules: [
            'STEM vs Business vs Creative Fields',
            'Demand vs Passion Tradeoff',
            'Global Job Market Insights',
          ],
        },
        status: 'in_progress',
        isCompleted: false,
        createdAt: '2026-01-02',
        updatedAt: '2026-01-05',
      },
      {
        id: 'topic_03',
        programId: 'study_prog_01',
        title: 'University & Country Selection',
        description:
          'Compare countries, universities, and cost of education vs ROI.',
        content: {
          modules: [
            'USA vs UK vs Canada vs Europe',
            'Tuition vs ROI',
            'Visa & Work Opportunities',
          ],
        },
        status: 'pending',
        isCompleted: false,
        createdAt: '2026-01-03',
        updatedAt: '2026-01-03',
      },
    ],
  },
];
