
export type NavigationTab =
  | 'home'
  | 'what-we-do'
  | 'how-it-works'
  | 'services'
  | 'process'
  | 'catalog'
  | 'pricing'
  | 'credibility'
  | 'journal'
  | 'support'
  | 'contact'
  | 'faqs'
  | 'testimonials';

// --- CATALOG DOMAIN TYPES ---

export type StudyPlanCategory = 'K-12 Advanced' | 'University' | 'Professional';
export type EducationLevel = 'High School Honors' | 'Undergraduate Honors' | "Master's Degree Path" | 'PhD Foundation' | 'Executive Specialist';
export type FacultyDomain = 'Computer Science & AI' | 'Physics & Mathematics' | 'Cybersecurity' | 'Bioengineering' | 'Quantitative Finance' | 'Aerospace Engineering';
export type CountryStandard = 'United States Curriculum' | 'United Kingdom Standard' | 'European Union Standard' | 'Global STEM Standard';

export interface StudyPlan {
  id: string;
  title: string;
  category: StudyPlanCategory;
  faculty: FacultyDomain;
  department: string;
  level: EducationLevel;
  country: CountryStandard;
  duration: string;
  coursesCount: number;
  credits: number;
  rating: number;
  enrolledCount: string;
  tag: string;
  description: string;
  prerequisites: string[];
  modules: string[];
}

export interface StudyPlanFilterState {
  searchTerm: string;
  category: string;
  faculty: string;
  level: string;
  country: string;
}

// --- CONTENT & MEDIA TYPES ---
export interface JournalArticle {
  id: string;
  title: string;
  category: string;
  date: string;
  readTime: string;
  author: string;
  snippet: string;
  doi: string;
}

export interface FAQItem {
  id: string;
  category: string;
  question: string;
  answer: string;
}

export interface Testimonial {
  id: string;
  author: string;
  role: string;
  institution: string;
  quote: string;
  metric: string;
  category: string;
}

export interface ProcessStep {
  stepNumber: string;
  title: string;
  subtitle: string;
  description: string;
  outputArtifact: string;
}

export interface LearningMode {
  id: string;
  title: string;
  iconName: string;
  description: string;
  keyFeature: string;
}

export interface TuitionTier {
  id: string;
  name: string;
  monthlyPrice: number;
  annualDiscountPrice: number;
  description: string;
  isPopular?: boolean;
  features: string[];
  targetAudience: string;
}


export const STUDY_PLANS_DATA: StudyPlan[] = [
  {
    id: 'sp-101',
    title: 'Advanced AI & Neural Systems Engineering',
    category: 'University',
    faculty: 'Computer Science & AI',
    department: 'Machine Intelligence',
    level: "Master's Degree Path",
    country: 'United States Curriculum',
    duration: '24 Months (Structured)',
    coursesCount: 16,
    credits: 60,
    rating: 4.95,
    enrolledCount: '1,420 Active Scholars',
    tag: 'Advanced AI Research',
    description: 'A rigorous academic path focusing on deep learning architectures, transformer dynamics, state-space models (SSMs), and autonomous distributed system design.',
    prerequisites: ['Linear Algebra & Vector Calculus', 'Probability Theory', 'Python / C++ Mechanics'],
    modules: [
      'Mathematical Foundations of High-Dimensional Optimization',
      'Advanced Transformer Architectures & Attention Mechanics',
      'Reinforcement Learning & Monte Carlo Tree Search Systems',
      'Neural Hardware Synthesis & Distributed Inference Acceleration'
    ]
  },
  {
    id: 'sp-102',
    title: 'Quantum Computing & Theoretical Information Systems',
    category: 'University',
    faculty: 'Physics & Mathematics',
    department: 'Theoretical Physics',
    level: 'PhD Foundation',
    country: 'Global STEM Standard',
    duration: '36 Months',
    coursesCount: 20,
    credits: 90,
    rating: 4.98,
    enrolledCount: '680 Doctoral Fellows',
    tag: 'Quantum Physics',
    description: 'Rigorous exploration of qubit state control, quantum error correction algorithms, Hamiltonian simulation, and hybrid classical-quantum algorithms.',
    prerequisites: ['Complex Analysis', 'Hilbert Space Operators', 'Quantum Mechanics I'],
    modules: [
      'Hilbert Space Vector Analysis & Operator Theory',
      'Quantum Gate Synthesis & Decoherence Mitigation',
      'Shor & Grover Computational Proofs in Practice',
      'Topological Quantum Computing Architectures'
    ]
  },
  {
    id: 'sp-103',
    title: 'Cybersecurity Architecture & Cryptographic Engineering',
    category: 'Professional',
    faculty: 'Cybersecurity',
    department: 'Defense & Network Security',
    level: 'Executive Specialist',
    country: 'United Kingdom Standard',
    duration: '12 Months',
    coursesCount: 12,
    credits: 45,
    rating: 4.89,
    enrolledCount: '2,890 Engineers',
    tag: 'Cyber Warfare & Zero Trust',
    description: 'Post-quantum cryptography protocols, zero-trust infrastructure engineering, automated formal verification of kernel code, and threat simulation.',
    prerequisites: ['Assembly / Rust Programming', 'Discrete Mathematics', 'Computer Networking'],
    modules: [
      'Zero-Knowledge Proof Systems (zk-SNARKs & zk-STARKs)',
      'Automated Vulnerability Discovery & Symbolic Execution',
      'Hardware Security Modules (HSM) & Enclave Isolation',
      'Enterprise Zero-Trust Policy Frameworks'
    ]
  },
  {
    id: 'sp-104',
    title: 'Biomedical Informatics & Genomic Computational Modeling',
    category: 'University',
    faculty: 'Bioengineering',
    department: 'Computational Biology',
    level: 'Undergraduate Honors',
    country: 'Global STEM Standard',
    duration: '48 Months',
    coursesCount: 32,
    credits: 120,
    rating: 4.92,
    enrolledCount: '1,150 Students',
    tag: 'Biotech & Genomics',
    description: 'Combining CRISPR sequence prediction, protein folding simulations, and clinical trial epidemiological machine learning.',
    prerequisites: ['Organic Chemistry', 'Calculus II', 'General Biology'],
    modules: [
      'Molecular Genetics & DNA Sequence Alignment Math',
      'AlphaFold Mechanics & Tertiary Structure Prediction',
      'Clinical Trial Biomarker Analysis Pipelines',
      'Ethical AI Deployment in Genetic Therapies'
    ]
  },
  {
    id: 'sp-105',
    title: 'Advanced STEM Honors Mathematics & Physics Core',
    category: 'K-12 Advanced',
    faculty: 'Physics & Mathematics',
    department: 'Advanced Placement & Olympiad',
    level: 'High School Honors',
    country: 'United States Curriculum',
    duration: '18 Months',
    coursesCount: 10,
    credits: 30,
    rating: 4.96,
    enrolledCount: '3,400 Young Scholars',
    tag: 'K-12 Excellence',
    description: 'Tailored for exceptional high school scholars aiming for top international math and physics competitions and elite university tracks.',
    prerequisites: ['Single Variable Calculus', 'General Physics I'],
    modules: [
      'Multivariable Calculus & Vector Analysis',
      'Classical Mechanics & Lagrangian Formulations',
      'Abstract Algebra Principles for Pre-College Scholars',
      'Rigorous Proof Writing Methodologies'
    ]
  },
  {
    id: 'sp-106',
    title: 'Quantitative Finance & Algorithmic Market Microstructure',
    category: 'Professional',
    faculty: 'Quantitative Finance',
    department: 'Quantitative Analysis',
    level: "Master's Degree Path",
    country: 'European Union Standard',
    duration: '18 Months',
    coursesCount: 14,
    credits: 50,
    rating: 4.91,
    enrolledCount: '1,980 Traders & Quants',
    tag: 'FinTech & Math',
    description: 'Stochastic calculus, Black-Scholes partial differential equations, order book dynamics, and low-latency execution algorithms.',
    prerequisites: ['Measure Theory', 'Probability & Statistics', 'C++ Data Structures'],
    modules: [
      'Stochastic Differential Equations & Ito Calculus',
      'High-Frequency Limit Order Book Simulation',
      'Machine Learning for Risk Factor Decomposition',
      'Regulatory Compliance & Model Stress Testing'
    ]
  }
];


export const JOURNAL_ARTICLES: JournalArticle[] = [
  {
    id: 'art-1',
    title: 'Beyond Passive Lectures: The Cognitive Architecture of Active AI Tutoring',
    category: 'Pedagogical Science',
    date: 'August 12, 2026',
    readTime: '8 min read',
    author: 'Dr. Evelyn Vance, Chief Academic Officer',
    snippet: 'How formal assessment loops combined with continuous cognitive diagnostic models increase knowledge retention by 310% compared to traditional asynchronous video platforms.',
    doi: '10.1038/s41586-026-0912-x'
  },
  {
    id: 'art-2',
    title: 'Formal Verification of Academic Curricula in STEM Education',
    category: 'Curriculum Design',
    date: 'July 28, 2026',
    readTime: '12 min read',
    author: 'Prof. Marcus Sterling, Chair of AI Faculty',
    snippet: 'Mapping prerequisite dependencies using Directed Acyclic Graphs (DAGs) to prevent learning gaps in advanced quantum physics and higher mathematics.',
    doi: '10.1038/s41586-026-0888-y'
  },
  {
    id: 'art-3',
    title: 'The Role of Autonomous Socratic Dialogue in Post-Secondary Instruction',
    category: 'Educational Psychology',
    date: 'June 19, 2026',
    readTime: '6 min read',
    author: 'Academic Board Research Team',
    snippet: 'An empirical analysis of 10,000 doctoral and master scholars utilizing voice-guided Socratic inquiry during complex problem synthesis.',
    doi: '10.1038/s41586-026-0741-z'
  }
];

export const FAQS_DATA: FAQItem[] = [
  {
    id: 'faq-1',
    category: 'System Architecture',
    question: 'How is InfoBeatLive Academy different from traditional online course marketplaces?',
    answer: 'Traditional marketplaces sell disconnected video playlists with optional quizzes and self-guided browsing. InfoBeatLive Academy is a system-governed virtual university structured into Faculties, Departments, Programs, Levels, Semesters, and Courses. Learning is strictly sequential, timetable-driven, and automatically enforced.'
  },
  {
    id: 'faq-2',
    category: 'AI Faculty Engine',
    question: 'How do the AI voice instructors conduct classes during live sessions?',
    answer: 'The AI Faculty Engine delivers structured voice lectures (ranging from 20 to 120 minutes) accompanied by real-time visual aids, slides, and code/math breakdowns. Unlike static videos, the AI instructor dynamically responds to questions, pauses for Socratic comprehension checks, and adapts explanations based on student input.'
  },
  {
    id: 'faq-3',
    category: 'Academic Progression',
    question: 'Can I jump directly to advanced topics or skip courses I already know?',
    answer: 'No. To maintain institutional academic integrity, the platform enforces automated prerequisite locks. You must complete continuous assessments, quizzes, and end-of-semester proctored exams to unlock subsequent courses, semesters, or academic levels.'
  },
  {
    id: 'faq-4',
    category: 'Curriculum Standards',
    question: 'Are the programs tailored to national or regional educational standards?',
    answer: 'Yes. InfoBeatLive Academy maps its academic structures and course curricula to country-specific educational frameworks, ensuring the depth, nomenclature, credit systems, and subject hierarchies align with accredited regional tertiary standards.'
  },
  {
    id: 'faq-5',
    category: 'Classroom & Pacing',
    question: 'Is the learning experience entirely self-paced or structured on a timetable?',
    answer: 'While you can complete lectures on your own schedule, the system generates automated daily timetables and study guides to establish academic discipline. This eliminates decision fatigue and ensures steady progression through the semester.'
  },
  {
    id: 'faq-6',
    category: 'Proctored Examinations',
    question: 'How do proctored examinations and evaluations work on the platform?',
    answer: 'At the end of each course and semester, students undergo system-proctored, timed examinations evaluated by the AI examination engine. These test deep synthesis, mathematical proofing, and problem-solving rather than rote memorization.'
  },
  {
    id: 'faq-7',
    category: 'AI vs. Chatbots',
    question: 'Is the AI instructor just a wrapper around a general chat model?',
    answer: 'No. Standard chatbots generate unconstrained text responses. Our AI Faculty Engine operates within grounded, domain-specific academic knowledge bases under strict pedagogical rules—acting as an active instructor, oral examiner, and proctor.'
  },
  {
    id: 'faq-8',
    category: 'Credentials & Transcripts',
    question: 'What do I receive upon successfully completing a program?',
    answer: 'Graduates receive cryptographically verifiable institutional certificates alongside full academic transcripts detailing semester GPAs, course credits, proctored exam scores, and demonstrated skill competencies.'
  },
  {
    id: 'faq-9',
    category: 'Assessment & Grading',
    question: 'What happens if I fail a course examination or continuous assessment?',
    answer: 'If you fail to meet the mastery threshold for a course or exam, the system generates targeted remedial study modules and allows you to retake the evaluation once key prerequisite concepts have been reviewed.'
  },
  {
    id: 'faq-10',
    category: 'Practical & Applied Skills',
    question: 'Does the Academy focus purely on theory, or is practical work included?',
    answer: 'Every program balances theoretical foundations with practical application. Courses include lab exercises, automated code/proof validation, and capstone project assignments that must be verified before graduation.'
  },
  {
    id: 'faq-11',
    category: 'Student Experience',
    question: 'Do I need specialized hardware or expensive AI subscriptions to participate?',
    answer: 'No. InfoBeatLive Academy runs directly in standard web browsers on modest desktop or laptop setups without requiring external AI subscriptions or specialized GPU hardware on the student\'s end.'
  },
  {
    id: 'faq-12',
    category: 'Enrollment & Admission',
    question: 'How do I start studying a program at InfoBeatLive Academy?',
    answer: 'You begin by selecting your country framework and target program during institutional enrollment. Once placed in your Faculty, Department, and Level, the system initializes your semester timetable and unlocks your entry-level courses.'
  }
];

export const TESTIMONIALS_DATA: Testimonial[] = [
  {
    id: 'test-1',
    author: 'Dr. Aris Thorne',
    role: 'Principal AI Researcher',
    institution: 'Quantum AI Systems Lab',
    quote: 'The DAG-structured curriculum removed months of redundant foundational reading. The Socratic engine probed my mathematical understanding rather than giving easy answer keys.',
    metric: 'Mastered Transformer & SSM Math in 4 Months',
    category: 'AI & Machine Intelligence'
  },
  {
    id: 'test-2',
    author: 'Prof. Elena Rostova',
    role: 'Department Head',
    institution: 'European STEM Institute',
    quote: 'InfoBeatLive Academy sets the benchmark for online institutional rigor. The proctored proof verification system guarantees that scholars possess genuine theoretical competence.',
    metric: 'Adopted across 12 University Departments',
    category: 'Academic Faculty'
  },
  {
    id: 'test-3',
    author: 'Marcus Vance',
    role: 'Lead Cryptography Specialist',
    institution: 'Global Defense Systems',
    quote: 'The zero-knowledge proof module was identical to real-world production cryptographic engineering. The automated diagnostic feedback prevented hours of syntax dead-ends.',
    metric: 'Promoted to Executive Security Director',
    category: 'Cybersecurity Engineering'
  }
];

export interface ProcessStep {
  stepNumber: string;
  title: string;
  subtitle: string;
  outputArtifact: string;
  description: string;
}

export const PROCESS_STEPS: ProcessStep[] = [
  {
    stepNumber: "01",
    title: "Institutional Program Enrollment",
    subtitle: "Academic Hierarchy Placement",
    outputArtifact: "Student Academic Record",
    description: "Students select their program based on country-specific education standards and are placed into a structured hierarchy: Faculty → Department → Program → Level → Semester."
  },
  {
    stepNumber: "02",
    title: "Daily Timetable & Schedule Assignment",
    subtitle: "Structured Learning Discipline",
    outputArtifact: "Automated Class Timetable",
    description: "The system generates structured daily class timetables and study guides, removing decision fatigue and enforcing academic routine."
  },
  {
    stepNumber: "03",
    title: "AI Faculty Interactive Classroom",
    subtitle: "Dynamic Voice & Media Instruction",
    outputArtifact: "Lecture Session Logs",
    description: "Students attend timed interactive lectures (20–120 minutes) delivered by dynamic AI voice instructors using visual aids, slides, and real-time concept breakdowns."
  },
  {
    stepNumber: "04",
    title: "Socratic Engagement & Concept Verification",
    subtitle: "Active Learning Enforcement",
    outputArtifact: "Diagnostic Assessment Score",
    description: "During and immediately following lectures, the AI faculty engine tests reasoning through targeted Socratic questioning, ensuring concepts are understood before advancing."
  },
  {
    stepNumber: "05",
    title: "Continuous Assessment & Practical Work",
    subtitle: "Prerequisite Lock System",
    outputArtifact: "Course Progress Index",
    description: "Students complete quizzes, assignments, and problem sets. The platform automatically evaluates performance and unlocks subsequent modules only when mastery thresholds are met."
  },
  {
    stepNumber: "06",
    title: "Proctored Examination & Evaluation",
    subtitle: "Institutional Rigor",
    outputArtifact: "Proctored Exam Report",
    description: "At the end of each semester, students undergo timed, system-proctored examinations evaluated by the AI examination engine to verify genuine skill acquisition."
  },
  {
    stepNumber: "07",
    title: "Automated Semester & Level Progression",
    subtitle: "Merit-Based Promotion",
    outputArtifact: "Verified Transcript",
    description: "Upon passing all required courses in a semester, the system automatically promotes the student to the next academic level or semester."
  },
  {
    stepNumber: "08",
    title: "Verified Graduation & Certification",
    subtitle: "Credential Attainment",
    outputArtifact: "Institutional Certificate",
    description: "Completing the full program curriculum unlocks official institutional certification backed by complete academic transcripts and verified performance metrics."
  }
];

export const TUITION_TIERS: TuitionTier[] = [
  {
    id: 'tier-1',
    name: 'Academic Basic',
    monthlyPrice: 29,
    annualDiscountPrice: 19,
    description: `Designed for individual students seeking structured academic discipline with single-program enrollment.`,
    targetAudience: 'Self-Paced Learners & High School STEM Honors',
    features: [
      'Single Program Enrollment (Faculty → Level)',
      'Text-based AI Faculty Engine & Socratic Guidance',
      'Daily Class Timetables & Study Guide Generation',
      'Automated Diagnostic Problem Set Grading',
      'Continuous Assessments & Automated Quizzes',
      'Standard Completion Credential Transcript'
    ]
  },
  {
    id: 'tier-2',
    name: 'Academic Plus',
    monthlyPrice: 79,
    annualDiscountPrice: 59,
    description: 'Our core institutional tier offering full interactive voice lectures, proctored exams, and automatic level promotion.',
    isPopular: true,
    targetAudience: 'Undergraduate, Post-Graduate & Full-Time Degree Students',
    features: [
      'Full Faculty Program Access & Multi-Semester Track',
      'AI Voice Faculty Engine (20–120 min lectures)',
      'Prerequisite Locks & Semester Progression',
      'System-Proctored Semester & Course Examinations',
      'Practical Labs, Code/Math Validation & Capstones',
      'Cryptographically Verified Transcripts & Diplomas'
    ]
  },
  {
    id: 'tier-3',
    name: 'Academic Pro / Research',
    monthlyPrice: 199,
    annualDiscountPrice: 149,
    description: 'Tailored for advanced researchers, and candidates requiring tailored country curriculum frameworks.',
    targetAudience: 'Doctoral Researchers, Dual-Degree Candidates & Institutional Leads',
    features: [
      'All University And Faculty Access Tier Features',
      'Multi-Faculty & Dual-Program Enrollment Access',
      'Country-Specific Curriculum Standard Alignment',
      'Oral Socratic Defense & Advanced Capstone Engine',
      'Priority Academic Board Review & Advisory Support',
      'Verified High-Distinction Institutional Transcripts'
    ]

  }
];

export const cn = (...classes: (string | boolean | undefined | null)[]): string => {
  return classes.filter(Boolean).join(' ');
};
