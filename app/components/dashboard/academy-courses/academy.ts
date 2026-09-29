export type StudyPace = 'full_time' | 'part_time';
export type MaritalStatus = 'single' | 'married' | 'divorced' | 'widowed';
export type EmploymentStatus = 'employed' | 'self_employed' | 'unemployed' | 'student';

export interface ScheduleConfig {
  studyPace: StudyPace;
  hoursPerDay?: number;
  lecturesPerDay?: number;
  lectureDurationMinutes?: number;
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
}

export interface CurriculumSemester {
  semesterNumber: number;
  title: string;
  totalLectures: number;
  coreModules: string[];
}


export interface EnrolledProgramCardData {
  id: string;
  programTitle: string;
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
  studyPace: StudyPace;
  hoursPerDay?: number;
  lecturesPerDay?: number;
  lectureDurationMinutes?: number;
  selectedDays?: string[];
  enrollmentDate: string;
  estimatedGraduationDate: string;
  completionPercentage: number;
  totalSemestersOrSessions: number;
  currentSemester: number;
  totalSessions:number;
  completedSessions:number;
  totalCreditsRequired: number;
  creditsEarned: number;
  programDescription: string;
  scheduleSummary: string;
  aiCurriculumBreakdown: CurriculumSemester[];
  prerequisitesMet: string[];
  careerPathways: string[];
}