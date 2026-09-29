export type StudyPace = 'full_time' | 'part_time';
export type MaritalStatus = 'single' | 'married' | 'divorced' | 'widowed';
export type EmploymentStatus = 'employed' | 'self_employed' | 'unemployed' | 'student';

export interface ScheduleConfig {
  researchPace: StudyPace;
  hoursPerDay?: number;
  researchPerDay?: number;
  researchDurationMinutes?: number;
  selectedDays?: string[];
}

export interface EnrollmentFormData {
  countryCode: string;
  institutionTierId: string;
  levelQualificationId: string;
  institutionName: string;
  language: string;
  fieldOfStudy?: string;
  dateOfBirth: string;
  educationLevel: string;
  countryOfOrigin: string;
  maritalStatus: MaritalStatus;
  employmentStatus: EmploymentStatus;
  currentRoleOrExperience?: string;
  externalCoursesCompleted?: string;
  schedule: ScheduleConfig;
  careerBio: string;
  researchContext: string;
}

export interface CurriculumSemester {
  chapterNumber: number;
  title: string;
  totalPages: number;
  coreModules: string[];
}

export interface EnrolledLibraryCardData {
  id: string;
  researchTitle: string;
  institutionName: string;
  countryName: string;
  language: string;
  countryFlag: string;
  tierTitle: string;
  levelTitle: string;
  fieldOfStudy?: string;
  dateOfBirth: string;
  educationLevel: string;
  countryOfOrigin: string;
  maritalStatus: MaritalStatus;
  employmentStatus: EmploymentStatus;
  currentRoleOrExperience?: string;
  externalCoursesCompleted?: string;
  careerBio: string;
  researchPace: StudyPace;
  hoursPerDay?: number;
  researchPerDay?: number;
  researchDurationMinutes?: number;
  selectedDays?: string[];
  enrollmentDate: string;
  latestUpdate: string;
  completionPercentage: number;
  totalChapters: number;
  currentChapter: number;
  totalPages: number;
  pagesRead: number;
  researchDescription: string;
  scheduleSummary: string;
  aiCurriculumBreakdown: CurriculumSemester[];
  prerequisitesMet: string[];
  careerPathways: string[];
  researchContext:string;
}