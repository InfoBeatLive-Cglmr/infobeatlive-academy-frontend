export interface Topic {
  id: string;
  title: string;
  description: string;
  duration: string;
  isCompleted?: boolean;
}

export interface ModuleItem {
  id: string;
  moduleCode: string;
  title: string;
  topicsCount: number;
}

export interface CourseInfo {
  subjectName: string;
  courseTitle: string;
  institution: string;
  framework: string;
  level: string;
  semesterSession: string;
  graduationDate: string;
  topics: Topic[];
  modules: ModuleItem[];
  lecturers: Array<{ name: string; title: string; avatar: string }>;
}

export interface LectureResource {
  id: string;
  title: string;
  type: 'pdf' | 'audio' | 'transcript' | 'zip';
  size: string;
  downloadUrl: string;
}

export interface StagedQuestion {
  text: string;
  audioBlobUrl?: string | null;
  attachedFile?: string | null;
  submittedAt?: string;
}