export type CertificateDocType = 'testimonial' | 'result_sheet';

export interface CourseResult {
  id: string;
  courseTitle: string;
  testScore: number;
  examScore: number;
  totalScore: number;
  grade: 'A' | 'B' | 'C' | 'D' | 'F';
  remark: 'Excellent' | 'Good' | 'Average' | 'Poor' | 'Fail';
}

export interface StudentProfile {
  id: string;
  certificateName: string;
  studentName: string;
  matricNumber: string;
  programTitle: string;
  faculty: string;
  institution: string;
  graduationDate: string;
  verificationCode: string;
  cumulativeGpa: number;
  maxGpa: number;
  overallPercentage: number;
  degreeClass: 'First Class' | 'Second Class Upper' | 'Second Class Lower' | 'Third Class' | 'Pass';
  overallRemark: 'Excellent' | 'Good' | 'Average' | 'Poor';
  testimonialBody: string;
}

export interface CertificateData {
  profile: StudentProfile;
  results: CourseResult[];
}

// Mock Certificates Database
const MOCK_CERTIFICATES: Record<string, CertificateData> = {
  'cert_msc_cs': {
    profile: {
      id: 'cert_msc_cs',
      certificateName: 'M.Sc. Computer Science Degree Certificate',
      studentName: 'Abdurrahman Sale',
      matricNumber: 'BUK/2026/CSC/1092',
      programTitle: 'Master of Science in Computer Science',
      faculty: 'Faculty of Computing & Information Technology',
      institution: 'InfoBeatLive AI Academy',
      graduationDate: 'August 20, 2026',
      verificationCode: 'IBL-VERIFY-2026-99482X',
      cumulativeGpa: 4.82,
      maxGpa: 5.00,
      overallPercentage: 89.4,
      degreeClass: 'First Class',
      overallRemark: 'Excellent',
      testimonialBody: `This is to certify that Abdurrahman Sale has completed the prescribed master's degree coursework and practical software architecture requirements in Computer Science & Artificial Intelligence. During his tenure, he demonstrated exceptional technical prowess in system design, backend scalability, autonomous AI agents, and cloud computing architectures. He is of exemplary character and holds high promise for academic research and global technology leadership.`
    },
    results: [
      { id: 'cr_1', courseTitle: 'Advanced Distributed Systems', testScore: 28, examScore: 65, totalScore: 93, grade: 'A', remark: 'Excellent' },
      { id: 'cr_2', courseTitle: 'Advanced Deep Learning', testScore: 26, examScore: 61, totalScore: 87, grade: 'A', remark: 'Excellent' },
      { id: 'cr_3', courseTitle: 'Cloud Native Engineering', testScore: 24, examScore: 54, totalScore: 78, grade: 'B', remark: 'Good' },
      { id: 'cr_4', courseTitle: 'High-Performance Database Systems', testScore: 29, examScore: 63, totalScore: 92, grade: 'A', remark: 'Excellent' },
      { id: 'cr_5', courseTitle: 'Autonomous AI Agents', testScore: 27, examScore: 58, totalScore: 85, grade: 'A', remark: 'Excellent' },
      { id: 'cr_6', courseTitle: 'Enterprise Cryptography', testScore: 21, examScore: 45, totalScore: 66, grade: 'C', remark: 'Average' },
      { id: 'cr_7', courseTitle: 'Advanced Microservices', testScore: 21, examScore: 65, totalScore: 86, grade: 'A', remark: 'Excellent' },
      { id: 'cr_8', courseTitle: 'Neural Network Architectures', testScore: 21, examScore: 70, totalScore: 92, grade: 'A', remark: 'Excellent' },
      { id: 'cr_9', courseTitle: 'Advanced Kubernetes Engine', testScore: 21, examScore: 55, totalScore: 76, grade: 'B', remark: 'Good' },
      { id: 'cr_10', courseTitle: 'Vector Database Search', testScore: 21, examScore: 45, totalScore: 66, grade: 'C', remark: 'Average' },
      { id: 'cr_11', courseTitle: 'Advanced API Security', testScore: 21, examScore: 60, totalScore: 81, grade: 'A', remark: 'Excellent' },
      { id: 'cr_12', courseTitle: 'Enterprise Database Indexing', testScore: 21, examScore: 50, totalScore: 71, grade: 'B', remark: 'Good' }
    ]
  },
  'cert_bsc_se': {
    profile: {
      id: 'cert_bsc_se',
      certificateName: 'B.Sc. Software Engineering Certificate',
      studentName: 'Abdurrahman Sale',
      matricNumber: 'BUK/2023/SWE/0411',
      programTitle: 'Bachelor of Science in Software Engineering',
      faculty: 'Faculty of Computing & Information Technology',
      institution: 'InfoBeatLive AI Academy',
      graduationDate: 'March 15, 2024',
      verificationCode: 'IBL-VERIFY-2024-11847Z',
      cumulativeGpa: 4.75,
      maxGpa: 5.00,
      overallPercentage: 86.2,
      degreeClass: 'First Class',
      overallRemark: 'Excellent',
      testimonialBody: `This is to certify that Abdurrahman Sale has completed the undergraduate software engineering curriculum with distinction. He showed mastery over core algorithmic principles, full-stack software development, and relational database architecture.`
    },
    results: [
      { id: 'cr_101', courseTitle: 'Data Structures & Algorithms', testScore: 27, examScore: 62, totalScore: 89, grade: 'A', remark: 'Excellent' },
      { id: 'cr_102', courseTitle: 'Object-Oriented Architecture', testScore: 25, examScore: 58, totalScore: 83, grade: 'A', remark: 'Excellent' },
      { id: 'cr_103', courseTitle: 'Operating System Design', testScore: 22, examScore: 51, totalScore: 73, grade: 'B', remark: 'Good' }
    ]
  }
};

/**
 * Fetch available certificate options for dropdown selectors
 */
export async function fetchCertificateList(): Promise<Array<{ id: string; name: string }>> {
  await new Promise((resolve) => setTimeout(resolve, 300));
  return Object.values(MOCK_CERTIFICATES).map((item) => ({
    id: item.profile.id,
    name: item.profile.certificateName
  }));
}

/**
 * Fetch detailed certificate payload by certificate ID
 */
export async function fetchCertificateById(certId: string): Promise<CertificateData> {
  await new Promise((resolve) => setTimeout(resolve, 500));
  const data = MOCK_CERTIFICATES[certId];
  if (!data) {
    throw new Error('Certificate not found');
  }
  return data;
}