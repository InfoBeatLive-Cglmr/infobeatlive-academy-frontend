import { CourseInfo, LectureResource } from './types';

export const MOCK_COURSE_INFO: CourseInfo = {
  subjectName: 'Advanced Computing & Artificial Intelligence',
  courseTitle: 'Distributed Microservices & Autonomous AI Systems',
  institution: 'InfoBeatLive AI Academy',
  framework: 'Enterprise Distributed Systems Protocol v4.2',
  level: 'Postgraduate Master Level',
  semesterSession: '2026 / Fall Semester - Session A',
  graduationDate: 'August 20, 2026',
  lecturers: [
    { name: 'Dr. Abdurrahman Sale', title: 'Principal Systems Architect & Professor', avatar: '/avatars/abdurrahman.jpg' },
    { name: 'Prof. A. S. Bayero', title: 'Dean, Faculty of Computing & AI', avatar: '/avatars/bayero.jpg' }
  ],
  topics: [
    { id: 't1', title: 'High-Throughput Vector Indexing', description: 'Exploring HNSW and IVF-PQ indexing mechanisms for real-time vector queries.', duration: '25 mins', isCompleted: true },
    { id: 't2', title: 'Distributed Consensus with Raft & Paxos', description: 'Fault-tolerant state replication across geo-distributed cloud clusters.', duration: '40 mins', isCompleted: true },
    { id: 't3', title: 'Autonomous Multi-Agent Handshakes', description: 'Architecting zero-trust agent communication protocols using async messaging.', duration: '35 mins', isCompleted: false },
    { id: 't4', title: 'Real-Time Telemetry & Database Sharding', description: 'Horizontal sharding patterns for high-concurrency enterprise workloads.', duration: '30 mins', isCompleted: false }
  ],
  modules: [
    { id: 'm1', moduleCode: 'CS-801', title: 'Foundations of Distributed Microservices', topicsCount: 6 },
    { id: 'm2', moduleCode: 'CS-802', title: 'Deep Neural Networks & Agent Optimization', topicsCount: 8 },
    { id: 'm3', moduleCode: 'CS-803', title: 'Enterprise API Security & Cryptography', topicsCount: 5 }
  ]
};

export const MOCK_RESOURCES: LectureResource[] = [
  { id: 'r1', title: 'Official Lecture Handout (PDF)', type: 'pdf', size: '4.2 MB', downloadUrl: '#' },
  { id: 'r2', title: 'Full Audio Recording (MP3 - 320kbps)', type: 'audio', size: '48.5 MB', downloadUrl: '#' }
 
];