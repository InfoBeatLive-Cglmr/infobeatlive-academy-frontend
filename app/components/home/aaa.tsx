import React, { useState, useEffect, useMemo, FC, ChangeEvent, FormEvent } from 'react';
import { GraduationCap, ShieldCheck, BrainCircuit, Search, ArrowRight, ChevronRight,Terminal, 
X, Menu, Play, Check, HelpCircle, RefreshCw, Star, ChevronDown, CheckCircle2,} from 'lucide-react';

// --- NAVIGATION & ROUTING TYPES ---
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
    category: 'Institutional Accreditation',
    question: 'How does InfoBeatLive Academy maintain institutional credibility and standards?',
    answer: 'InfoBeatLive Academy operates under strict academic oversight from our global Academic Advisory Board, composed of senior professors and domain experts. All curricula undergo annual peer review, formal prerequisite mapping, and continuous outcome assessment.'
  },
  {
    id: 'faq-2',
    category: 'Platform Architecture',
    question: 'Is this a casual video course site or a true structured degree-level platform?',
    answer: 'InfoBeatLive Academy is explicitly built for serious academic and professional mastery. Every program features verified syllabus graphs, daily proctored assessment checks, real-time code/proof validation, and oral Socratic defense options.'
  },
  {
    id: 'faq-3',
    category: 'AI Instructor System',
    question: 'How does the AI Instructor differ from generic consumer AI chatbots?',
    answer: 'Generic chatbots generate plausible text without pedagogical constraints. The InfoBeatLive AI Instructor operates on grounded academic knowledge bases, enforces strict Socratic guidance rules, checks step-by-step mathematical proofs, and dynamically adapts difficulty based on your diagnostic learning profile.'
  },
  {
    id: 'faq-4',
    category: 'Assessments & Certification',
    question: 'What credentials or certificates are awarded upon mastery?',
    answer: 'Upon completing all course modules, proctored comprehensive exams, and capstone research projects, scholars receive cryptographically verifiable digital credentials containing detailed competency transcripts.'
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

export const PROCESS_STEPS: ProcessStep[] = [
  {
    stepNumber: '01',
    title: 'Diagnostic Diagnostic Profiling',
    subtitle: 'Mathematical & Conceptual Baseline Assessment',
    description: 'Evaluating baseline conceptual strengths, mathematical foundation, and target academic objectives via diagnostic problem vectors.',
    outputArtifact: 'Diagnostic Knowledge Map'
  },
  {
    stepNumber: '02',
    title: 'Curriculum Graph Generation',
    subtitle: 'DAG Dependency Synthesis',
    description: 'Synthesizing a bespoke, Directed Acyclic Graph (DAG) study path with zero redundancy and optimal cognitive load balance.',
    outputArtifact: 'Validated Program Graph'
  },
  {
    stepNumber: '03',
    title: 'Socratic Interactive Instruction',
    subtitle: 'Multimodal AI Faculty Engagement',
    description: 'Engaging with real-time AI Faculty through multimodal text, LaTeX formula derivations, interactive code environments, and Socratic voice dialogue.',
    outputArtifact: 'Session Transcript & Notes'
  },
  {
    stepNumber: '04',
    title: 'Deliberate Practice & Proof Verification',
    subtitle: 'Active Problem Synthesis',
    description: 'Solving adaptive problem sets, rigorous proof verifications, and real-world sandbox system implementations.',
    outputArtifact: 'Verified Proof Submissions'
  },
  {
    stepNumber: '05',
    title: 'Automated Formal Feedback',
    subtitle: 'Line-by-Line Logic Diagnostic',
    description: 'Receiving line-by-line syntax analysis, mathematical step logic verification, and targeted diagnostic recommendations.',
    outputArtifact: 'Diagnostic Score Report'
  },
  {
    stepNumber: '06',
    title: 'Proctored Milestone Examinations',
    subtitle: 'Comprehensive Mastery Evaluation',
    description: 'Demonstrating complete domain mastery through timed proctored diagnostic exams and oral Socratic defense simulations.',
    outputArtifact: 'Proctored Exam Grade'
  },
  {
    stepNumber: '07',
    title: 'Academic Faculty Peer Review',
    subtitle: 'Capstone Research Submission',
    description: 'Verification of research capstone submissions by domain specialists, industry leaders, and peer review board members.',
    outputArtifact: 'Peer-Reviewed Research'
  },
  {
    stepNumber: '08',
    title: 'Transcript Issuance & Progression',
    subtitle: 'Cryptographic Credentialing',
    description: 'Issuance of cryptographically signed transcripts and unlocking advanced research modules or doctoral tracks.',
    outputArtifact: 'Cryptographic Credential'
  }
];

export const TUITION_TIERS: TuitionTier[] = [
  {
    id: 'tier-1',
    name: 'Academic Tier',
    monthlyPrice: 49,
    annualDiscountPrice: 39,
    description: 'Ideal for independent self-paced scholars seeking structured curricula and diagnostic assessments.',
    targetAudience: 'Self-Paced Scholars & High School STEM Honors',
    features: [
      'Access to 5 Concurrent Academic Courses',
      'Socratic Text AI Faculty Engine',
      'Automated Diagnostic Problem Set Grading',
      'Standard Credential Transcript'
    ]
  },
  {
    id: 'tier-2',
    name: 'Academic Plus Tier',
    monthlyPrice: 99,
    annualDiscountPrice: 79,
    description: 'Our most popular tier for undergraduate and master-level scholars needing proctored exam verification.',
    isPopular: true,
    targetAudience: 'Undergraduate, Master & Professional Engineers',
    features: [
      'Unlimited Course Enrollments',
      'Multimodal Voice & Text AI Faculty Engine',
      'Proctored Comprehensive Milestone Exams',
      'Oral Socratic Defense Simulations',
      'Cryptographically Verified Transcripts & Badges'
    ]
  },
  {
    id: 'tier-3',
    name: 'Academic Pro / Research',
    monthlyPrice: 249,
    annualDiscountPrice: 199,
    description: 'Designed for doctoral researchers, university professors, and enterprise technical leads requiring specialized mentorship.',
    targetAudience: 'Doctoral Candidates & Enterprise R&D Teams',
    features: [
      'All Academic Plus Tier Features',
      '1-on-1 Faculty Advisory Review Board Access',
      'Custom Research DAG Curriculum Synthesis',
      'Unlimited Sandbox Computing & HPC Resources',
      'Priority Institutional & Admissions Support'
    ]
  }
];


export const cn = (...classes: (string | boolean | undefined | null)[]): string => {
  return classes.filter(Boolean).join(' ');
};


interface HeaderProps {
  activeTab: NavigationTab;
  setActiveTab: (tab: NavigationTab) => void;
  onOpenAuth: () => void;
}

export const InstitutionalHeader: FC<HeaderProps> = ({ activeTab, setActiveTab, onOpenAuth }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);

  const navItems: { id: NavigationTab; label: string }[] = [
    { id: 'home', label: 'HOME' },
    { id: 'catalog', label: 'STUDY PLANS' },
    { id: 'how-it-works', label: 'HOW IT WORKS' },
    { id: 'services', label: 'SERVICES' },
    { id: 'process', label: 'PROCESS' },
    { id: 'pricing', label: 'TUITION' },
    { id: 'credibility', label: 'PHILOSOPHY' },
    { id: 'journal', label: 'RESEARCH' },
    { id: 'support', label: 'SUPPORT' }
  ];

  return (
    <header className="sticky top-0 z-40 bg-[#08090D]/90 backdrop-blur-xl border-b border-zinc-800/80 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Brand Logo */}
        <button
          onClick={() => setActiveTab('home')}
          className="flex items-center space-x-3 group text-left focus:outline-none"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-zinc-800 to-zinc-950 border border-zinc-700/80 flex items-center justify-center shadow-lg group-hover:border-amber-500/50 transition-colors">
            <GraduationCap className="w-5 h-5 text-amber-400" />
          </div>
          <div>
            <div className="flex items-center space-x-1.5">
              <span className="font-serif tracking-tight text-lg font-bold text-zinc-100 group-hover:text-amber-300 transition-colors">
                INFOBEATLIVE
              </span>
              <span className="text-[10px] uppercase font-mono px-1.5 py-0.5 rounded bg-amber-400/10 text-amber-400 border border-amber-400/20 font-semibold">
                ACADEMY
              </span>
            </div>
            <p className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest">
              Higher Institutional Learning
            </p>
          </div>
        </button>

        {/* Desktop Navigation Links */}
        <nav className="hidden xl:flex items-center space-x-1 font-medium text-xs tracking-wider text-zinc-300">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={cn(
                'px-3.5 py-2 rounded-lg transition-all',
                activeTab === item.id
                  ? 'text-amber-400 bg-amber-400/10 border border-amber-400/20 font-semibold'
                  : 'hover:text-zinc-100 hover:bg-zinc-800/50'
              )}
            >
              {item.label}
            </button>
          ))}
        </nav>

        {/* CTAs */}
        <div className="hidden lg:flex items-center space-x-3">
          <button
            onClick={onOpenAuth}
            className="text-xs font-semibold uppercase tracking-wider text-zinc-300 hover:text-white px-4 py-2.5 rounded-lg hover:bg-zinc-800/60 transition-all border border-transparent hover:border-zinc-700"
          >
            Sign In
          </button>
          <button
            onClick={() => setActiveTab('catalog')}
            className="text-xs font-semibold uppercase tracking-wider text-black bg-gradient-to-r from-amber-300 via-amber-400 to-amber-500 hover:brightness-110 px-5 py-2.5 rounded-lg shadow-lg shadow-amber-500/10 transition-all flex items-center space-x-2"
          >
            <span>Explore Programs</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="xl:hidden p-2 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-white"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-zinc-950 border-b border-zinc-800 px-4 py-6 space-y-3">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                setActiveTab(item.id);
                setMobileMenuOpen(false);
              }}
              className={cn(
                'block w-full text-left px-4 py-3 rounded-lg text-sm font-medium transition-colors',
                activeTab === item.id
                  ? 'bg-amber-400/10 text-amber-400 border border-amber-400/20'
                  : 'text-zinc-300 hover:bg-zinc-900'
              )}
            >
              {item.label}
            </button>
          ))}
          <div className="pt-4 border-t border-zinc-800 flex flex-col space-y-2">
            <button
              onClick={() => {
                onOpenAuth();
                setMobileMenuOpen(false);
              }}
              className="w-full text-center text-xs uppercase tracking-wider font-semibold py-3 rounded-lg border border-zinc-700 text-zinc-200"
            >
              Sign In
            </button>
            <button
              onClick={() => {
                setActiveTab('catalog');
                setMobileMenuOpen(false);
              }}
              className="w-full text-center text-xs uppercase tracking-wider font-semibold py-3 rounded-lg bg-amber-400 text-black font-bold"
            >
              Explore Programs
            </button>
          </div>
        </div>
      )}
    </header>
  );
};


interface FacultyTerminalProps {
  initialPrompt?: string;
}

export const AIFacultyTerminal: FC<FacultyTerminalProps> = ({ initialPrompt }) => {
  const [tutorQuery, setTutorQuery] = useState<string>(
    initialPrompt || 'Explain the mathematical difference between a Transformer model and a State Space Model (SSM)'
  );
  const [tutorOutput, setTutorOutput] = useState<string>('');
  const [isGenerating, setIsGenerating] = useState<boolean>(false);

  const handleRunTutorDemo = (customPrompt?: string) => {
    const promptToUse = customPrompt || tutorQuery;
    setIsGenerating(true);
    setTutorOutput('');

    setTimeout(() => {
      if (promptToUse.includes('Transformer') || promptToUse.includes('SSM')) {
        setTutorOutput(
          `**Academic Diagnostic Analysis & Derivation:**\n\n1. **Attention Complexity**: Standard Transformer Self-Attention scales as O(N²) quadratic time complexity relative to sequence length N.\n2. **State Space Models (SSMs / Mamba)**: SSMs map continuous input x(t) to output y(t) through a hidden state h(t), achieving O(N) linear time scaling.\n\n**Mathematical Formulation:**\n$$h'(t) = Ah(t) + Bx(t)$$\n$$y(t) = Ch(t) + Dx(t)$$\n\n**Pedagogical Conclusion**: SSMs excel in ultra-long context streams, whereas Transformers maintain expressiveness in dense, non-causal reasoning tasks.`
        );
      } else if (promptToUse.includes('Quantum') || promptToUse.includes('Hadamard')) {
        setTutorOutput(
          `**Quantum Superposition & Operator State:**\n\nConsider an arbitrary qubit state |ψ⟩ = α|0⟩ + β|1⟩ where |α|² + |β|² = 1.\n\nWhen applying a Hadamard Gate (H):\n$$H = \\frac{1}{\\sqrt{2}} \\begin{pmatrix} 1 & 1 \\\\ 1 & -1 \\end{pmatrix}$$\n\nResulting state maps |0⟩ into equal superposition state (|0⟩ + |1⟩)/√2. Proceeding to construct quantum error correction circuits.`
        );
      } else {
        setTutorOutput(
          `**Academic Response Generated:**\n\nFor the requested inquiry "${promptToUse}", our institutional framework breaks this down into 3 prerequisite proof structures: \n1. Axiomatic definition setup\n2. Formal derivation under boundary conditions\n3. Empirical verification against diagnostic test vectors.`
        );
      }
      setIsGenerating(false);
    }, 1100);
  };

  return (
    <div className="bg-zinc-950 rounded-2xl border border-zinc-800 p-6 shadow-2xl space-y-4">
      <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
        <div className="flex items-center space-x-2">
          <Terminal className="w-4 h-4 text-amber-400" />
          <span className="text-xs font-mono text-zinc-400">
            INFOBEATLIVE_FACULTY_TERMINAL_V1.0
          </span>
        </div>
        <span className="text-[10px] font-mono text-amber-400/80 uppercase">MODE: SOCRATIC</span>
      </div>

      <div className="space-y-3">
        <div className="bg-zinc-900/60 p-3 rounded-lg border border-zinc-800">
          <p className="text-[10px] font-mono text-zinc-500 uppercase">SCHOLAR INQUIRY:</p>
          <p className="text-xs text-zinc-200 font-mono mt-1">{tutorQuery}</p>
        </div>

        <div className="bg-amber-400/[0.02] p-4 rounded-lg border border-amber-400/20 min-h-[180px] font-mono text-xs text-zinc-300 whitespace-pre-wrap leading-relaxed">
          {isGenerating ? (
            <div className="flex items-center space-x-2 text-amber-400 animate-pulse">
              <RefreshCw className="w-4 h-4 animate-spin" />
              <span>Synthesizing Academic Diagnostic Proof...</span>
            </div>
          ) : tutorOutput ? (
            tutorOutput
          ) : (
            <span className="text-zinc-600">
              Click "Execute Prompt Test" or select a topic to view structured output.
            </span>
          )}
        </div>
      </div>

      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-2">
        <button
          onClick={() => handleRunTutorDemo()}
          className="px-4 py-2.5 rounded-lg bg-amber-400 hover:bg-amber-300 text-black font-bold text-xs uppercase tracking-wider transition-all"
        >
          Execute Prompt Test
        </button>
        <span className="text-[10px] font-mono text-zinc-500 text-right">
          LATENCY: 18ms • ZERO HALLUCINATION VERIFIED
        </span>
      </div>
    </div>
  );
};


interface PlanCardProps {
  plan: StudyPlan;
  onSelect: (plan: StudyPlan) => void;
}

export const StudyPlanCard: FC<PlanCardProps> = ({ plan, onSelect }) => {
  return (
    <div className="rounded-2xl bg-zinc-950 border border-zinc-800/90 hover:border-amber-500/50 transition-all p-6 flex flex-col justify-between space-y-6 group shadow-xl">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-mono uppercase bg-amber-400/10 text-amber-400 px-2.5 py-1 rounded border border-amber-400/20 font-semibold">
            {plan.category}
          </span>
          <span className="text-xs font-mono text-zinc-400 flex items-center space-x-1">
            <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
            <span>{plan.rating}</span>
          </span>
        </div>

        <h3 className="text-lg font-serif font-bold text-white group-hover:text-amber-300 transition-colors">
          {plan.title}
        </h3>

        <p className="text-xs text-zinc-400 leading-relaxed line-clamp-3">
          {plan.description}
        </p>

        <div className="pt-2 border-t border-zinc-900 text-[11px] font-mono text-zinc-400 space-y-1.5">
          <div className="flex justify-between">
            <span className="text-zinc-500">Faculty:</span>
            <span className="text-zinc-300">{plan.faculty}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-zinc-500">Duration:</span>
            <span className="text-zinc-300">{plan.duration}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-zinc-500">Courses / Credits:</span>
            <span className="text-zinc-300">
              {plan.coursesCount} Courses ({plan.credits} Credits)
            </span>
          </div>
        </div>
      </div>

      <button
        onClick={() => onSelect(plan)}
        className="w-full py-3 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 text-xs font-semibold uppercase tracking-wider text-zinc-200 transition-all flex items-center justify-center space-x-2 group-hover:border-amber-500/40"
      >
        <span>View Full Syllabus</span>
        <ChevronRight className="w-4 h-4 text-amber-400" />
      </button>
    </div>
  );
};

interface FilterPanelProps {
  filters: StudyPlanFilterState;
  setFilters: React.Dispatch<React.SetStateAction<StudyPlanFilterState>>;
  resultCount: number;
}

export const CatalogFilterPanel: FC<FilterPanelProps> = ({ filters, setFilters, resultCount }) => {
  const handleReset = () => {
    setFilters({
      searchTerm: '',
      category: 'All',
      faculty: 'All',
      level: 'All',
      country: 'All'
    });
  };

  return (
    <div className="p-6 rounded-2xl bg-zinc-950 border border-zinc-800 space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Search Bar */}
        <div className="relative sm:col-span-2 lg:col-span-1">
          <Search className="w-4 h-4 text-zinc-500 absolute left-3.5 top-3.5" />
          <input
            type="text"
            placeholder="Search keywords, topics..."
            value={filters.searchTerm}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setFilters((prev) => ({ ...prev, searchTerm: e.target.value }))
            }
            className="w-full bg-zinc-900 border border-zinc-800 rounded-xl pl-10 pr-4 py-2.5 text-xs text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-amber-500/50"
          />
        </div>

        {/* Category */}
        <div>
          <select
            value={filters.category}
            onChange={(e: ChangeEvent<HTMLSelectElement>) =>
              setFilters((prev) => ({ ...prev, category: e.target.value }))
            }
            className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-3 py-2.5 text-xs text-zinc-200 focus:outline-none focus:border-amber-500/50"
          >
            <option value="All">All Categories (K-12, University, Executive)</option>
            <option value="K-12 Advanced">K-12 Advanced STEM</option>
            <option value="University">University Degrees</option>
            <option value="Professional">Professional & Executive</option>
          </select>
        </div>

        {/* Faculty */}
        <div>
          <select
            value={filters.faculty}
            onChange={(e: ChangeEvent<HTMLSelectElement>) =>
              setFilters((prev) => ({ ...prev, faculty: e.target.value }))
            }
            className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-3 py-2.5 text-xs text-zinc-200 focus:outline-none focus:border-amber-500/50"
          >
            <option value="All">All Academic Faculties</option>
            <option value="Computer Science & AI">Computer Science & AI</option>
            <option value="Physics & Mathematics">Physics & Mathematics</option>
            <option value="Cybersecurity">Cybersecurity</option>
            <option value="Bioengineering">Bioengineering</option>
            <option value="Quantitative Finance">Quantitative Finance</option>
          </select>
        </div>

        {/* Level */}
        <div>
          <select
            value={filters.level}
            onChange={(e: ChangeEvent<HTMLSelectElement>) =>
              setFilters((prev) => ({ ...prev, level: e.target.value }))
            }
            className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-3 py-2.5 text-xs text-zinc-200 focus:outline-none focus:border-amber-500/50"
          >
            <option value="All">All Education Levels</option>
            <option value="High School Honors">High School Honors</option>
            <option value="Undergraduate Honors">Undergraduate Honors</option>
            <option value="Master's Degree Path">Master's Degree Path</option>
            <option value="PhD Foundation">PhD Foundation</option>
            <option value="Executive Specialist">Executive Specialist</option>
          </select>
        </div>
      </div>

      <div className="flex items-center justify-between text-xs text-zinc-400 pt-2 border-t border-zinc-900">
        <span>
          Showing <strong className="text-amber-400">{resultCount}</strong> accredited study plans
        </span>
        {(filters.searchTerm ||
          filters.category !== 'All' ||
          filters.faculty !== 'All' ||
          filters.level !== 'All') && (
          <button
            onClick={handleReset}
            className="text-amber-400 hover:underline flex items-center space-x-1"
          >
            <X className="w-3.5 h-3.5" />
            <span>Reset All Filters</span>
          </button>
        )}
      </div>
    </div>
  );
};


interface PlanModalProps {
  plan: StudyPlan | null;
  onClose: () => void;
  onEnroll: () => void;
}

export const StudyPlanDetailModal: FC<PlanModalProps> = ({ plan, onClose, onEnroll }) => {
  if (!plan) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-zinc-950 border border-zinc-800 rounded-3xl max-w-2xl w-full p-8 space-y-6 relative max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="space-y-2">
          <span className="text-[10px] font-mono uppercase bg-amber-400/10 text-amber-400 px-2.5 py-1 rounded border border-amber-400/20">
            {plan.category} • {plan.level}
          </span>
          <h2 className="text-2xl font-serif font-bold text-white pt-2">{plan.title}</h2>
          <p className="text-xs text-zinc-400 leading-relaxed">{plan.description}</p>
        </div>

        <div className="p-4 rounded-xl bg-zinc-900 border border-zinc-800 space-y-2 font-mono text-xs">
          <div className="flex justify-between text-zinc-300">
            <span>Faculty Domain:</span>
            <span className="text-amber-400">{plan.faculty}</span>
          </div>
          <div className="flex justify-between text-zinc-300">
            <span>Standard Credits:</span>
            <span className="text-amber-400">{plan.credits} Credits</span>
          </div>
          <div className="flex justify-between text-zinc-300">
            <span>Active Scholars:</span>
            <span className="text-amber-400">{plan.enrolledCount}</span>
          </div>
        </div>

        <div className="space-y-3">
          <h4 className="text-xs font-mono uppercase text-zinc-400">Core Prerequisite Modules:</h4>
          <div className="space-y-2">
            {plan.modules.map((mod, idx) => (
              <div key={idx} className="p-3 rounded-lg bg-zinc-900/60 border border-zinc-800/80 flex items-center space-x-3">
                <span className="text-xs font-mono text-amber-400">0{idx + 1}.</span>
                <span className="text-xs text-zinc-200">{mod}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="pt-4 border-t border-zinc-900 flex space-x-3">
          <button
            onClick={() => {
              onClose();
              onEnroll();
            }}
            className="flex-1 py-3.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-black font-bold text-xs uppercase tracking-wider"
          >
            Enroll In Plan
          </button>
          <button
            onClick={onClose}
            className="px-6 py-3.5 rounded-xl bg-zinc-900 text-zinc-300 text-xs font-semibold"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AuthModal: FC<AuthModalProps> = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  if (!isOpen) return null;

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    alert(`Scholar authenticated for: ${email || 'scholar@university.edu'}`);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-zinc-950 border border-zinc-800 rounded-3xl max-w-md w-full p-8 space-y-6 relative">
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-lg bg-zinc-900 text-zinc-400 hover:text-white"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="space-y-2 text-center">
          <div className="w-12 h-12 rounded-2xl bg-amber-400/10 border border-amber-400/20 flex items-center justify-center mx-auto text-amber-400">
            <GraduationCap className="w-6 h-6" />
          </div>
          <h3 className="text-2xl font-serif font-bold text-white">Scholar Access Portal</h3>
          <p className="text-xs text-zinc-400">Sign in to access your proctored dashboard and accredited study plans.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-[11px] font-mono uppercase text-zinc-400 mb-1">Scholar Email</label>
            <input
              type="email"
              required
              placeholder="scholar@university.edu"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-zinc-900 border border-zinc-800 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-amber-500/50"
            />
          </div>
          <div>
            <label className="block text-[11px] font-mono uppercase text-zinc-400 mb-1">Access Token / Password</label>
            <input
              type="password"
              required
              placeholder="••••••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-zinc-900 border border-zinc-800 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-amber-500/50"
            />
          </div>
          <button
            type="submit"
            className="w-full py-3.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-black font-bold text-xs uppercase tracking-wider"
          >
            Authenticate Scholar
          </button>
        </form>
      </div>
    </div>
  );
};


interface ViewProps {
  onNavigate: (tab: NavigationTab) => void;
  onOpenAuth: () => void;
}

export const HomePageView: FC<ViewProps> = ({ onNavigate, onOpenAuth }) => {
  return (
    <div className="space-y-24 pb-24">
      {/* 1. HERO SECTION */}
      <section className="relative pt-16 pb-12 lg:pt-24 lg:pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-amber-500/10 blur-[140px] rounded-full pointer-events-none" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-8 text-left">
            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-zinc-900/90 border border-zinc-700/80 shadow-inner">
              <ShieldCheck className="w-4 h-4 text-amber-400" />
              <span className="text-xs font-mono uppercase tracking-wider text-zinc-300">
                Standardized Rigor • Proctored Mastery
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold tracking-tight text-white leading-[1.12]">
              Architected for Serious Academic & Professional Mastery.
            </h1>

            <p className="text-base sm:text-lg text-zinc-400 font-normal leading-relaxed max-w-2xl">
              InfoBeatLive Academy provides a structured, multi-tier academic framework spanning K-12 advanced STEM, undergraduate honors, doctoral foundations, and senior professional engineering.
            </p>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-3 sm:space-y-0 sm:space-x-4 pt-2">
              <button
                onClick={() => onNavigate('catalog')}
                className="px-7 py-4 rounded-xl bg-gradient-to-r from-amber-300 via-amber-400 to-amber-500 text-black font-bold text-sm tracking-wider uppercase hover:brightness-110 shadow-xl shadow-amber-500/10 transition-all flex items-center justify-center space-x-2 group"
              >
                <span>Access University Catalog</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
              <button
                onClick={onOpenAuth}
                className="px-7 py-4 rounded-xl bg-zinc-900/90 hover:bg-zinc-800 text-zinc-200 border border-zinc-700 font-semibold text-sm tracking-wider uppercase transition-all flex items-center justify-center space-x-2"
              >
                <Play className="w-4 h-4 text-amber-400 fill-amber-400" />
                <span>Launch Faculty Preview</span>
              </button>
            </div>

            <div className="pt-6 grid grid-cols-3 gap-6 border-t border-zinc-800/80">
              <div>
                <p className="text-2xl font-bold font-mono text-amber-400">100%</p>
                <p className="text-xs text-zinc-500 uppercase tracking-wider mt-0.5">Verified Syllabus</p>
              </div>
              <div>
                <p className="text-2xl font-bold font-mono text-zinc-100">4,800+</p>
                <p className="text-xs text-zinc-500 uppercase tracking-wider mt-0.5">Academic Modules</p>
              </div>
              <div>
                <p className="text-2xl font-bold font-mono text-zinc-100">99.4%</p>
                <p className="text-xs text-zinc-500 uppercase tracking-wider mt-0.5">Exam Rigor Score</p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 relative">
            <div className="rounded-2xl bg-zinc-900/90 border border-zinc-800 p-6 shadow-2xl relative overflow-hidden backdrop-blur-xl space-y-5">
              <div className="flex items-center justify-between pb-4 border-b border-zinc-800">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 rounded-full bg-red-500/80" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                  <div className="w-3 h-3 rounded-full bg-green-500/80" />
                  <span className="ml-2 font-mono text-xs text-zinc-400">STUDY_DASHBOARD_V4.2</span>
                </div>
                <span className="inline-flex items-center text-[10px] font-mono bg-emerald-500/10 text-emerald-400 px-2 py-0.5 rounded border border-emerald-500/20">
                  • LIVE DIAGNOSTIC SESSION
                </span>
              </div>

              <div className="p-4 rounded-xl bg-zinc-950/80 border border-zinc-800/80 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono uppercase text-amber-400 tracking-wider">
                    ACTIVE ACADEMIC NODE
                  </span>
                  <span className="text-xs text-zinc-400 font-mono">Module 07 / 16</span>
                </div>
                <h4 className="text-sm font-semibold text-zinc-100">
                  Spectral Methods in Computational Fluid Dynamics
                </h4>
                <div className="w-full bg-zinc-800 h-1.5 rounded-full overflow-hidden">
                  <div className="bg-gradient-to-r from-amber-500 to-amber-300 h-full w-[72%]" />
                </div>
                <div className="flex justify-between text-[11px] font-mono text-zinc-400">
                  <span>Progress: 72% Mastered</span>
                  <span>Diagnostic Score: 94/100</span>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-amber-400/[0.03] border border-amber-400/20 space-y-2">
                <div className="flex items-center space-x-2">
                  <BrainCircuit className="w-4 h-4 text-amber-400" />
                  <span className="text-xs font-semibold text-amber-300">
                    AI Faculty Diagnostic Feedback
                  </span>
                </div>
                <p className="text-xs text-zinc-300 leading-relaxed font-mono">
                  "Your solution for Fourier decomposition in boundary layers demonstrates proper divergence limits. Proceed to Chebyshev polynomial discretization."
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. DIFFERENTIATION SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="text-xs font-mono uppercase tracking-widest text-amber-400 px-3 py-1 rounded bg-amber-400/10 border border-amber-400/20">
            Institutional Architecture
          </span>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-white">
            Why Fragmented AI Search & Casual Courses Fail Serious Learners.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="p-8 rounded-2xl bg-zinc-950 border border-zinc-800/80 space-y-6">
            <div className="flex items-center justify-between border-b border-zinc-800/80 pb-4">
              <h3 className="text-lg font-bold text-zinc-400">Generic AI Chat / Video Portals</h3>
              <span className="text-xs font-mono text-red-400/90 bg-red-500/10 px-2 py-1 rounded">
                High Retention Failure
              </span>
            </div>
            <ul className="space-y-4 text-sm text-zinc-400">
              <li className="flex items-start space-x-3">
                <X className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                <span>Random conversational threads without mathematical dependency graphs.</span>
              </li>
              <li className="flex items-start space-x-3">
                <X className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                <span>No proctored exam enforcement or rigorous proof diagnostic checks.</span>
              </li>
              <li className="flex items-start space-x-3">
                <X className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                <span>Superficial summaries prone to silent hallucinated logic errors.</span>
              </li>
            </ul>
          </div>

          <div className="p-8 rounded-2xl bg-gradient-to-br from-zinc-900 to-zinc-950 border border-amber-500/30 shadow-2xl space-y-6">
            <div className="flex items-center justify-between border-b border-zinc-800 pb-4">
              <h3 className="text-lg font-bold text-amber-300">InfoBeatLive Structured Pedagogy</h3>
              <span className="text-xs font-mono text-emerald-400 bg-emerald-500/10 px-2 py-1 rounded border border-emerald-500/20">
                Institutional Rigor
              </span>
            </div>
            <ul className="space-y-4 text-sm text-zinc-200">
              <li className="flex items-start space-x-3">
                <CheckCircle2 className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                <span>
                  <strong>Formally Verified DAG Curricula</strong> ensuring every topic builds upon prerequisite mathematical foundations.
                </span>
              </li>
              <li className="flex items-start space-x-3">
                <CheckCircle2 className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                <span>
                  <strong>Proctored Diagnostic Exams & Oral Defense</strong> evaluating genuine cognitive synthesis.
                </span>
              </li>
              <li className="flex items-start space-x-3">
                <CheckCircle2 className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                <span>
                  <strong>Grounded AI Faculty Engine</strong> enforcing strict Socratic questioning without factual drift.
                </span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* 3. TERMINAL INTERACTIVE SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-zinc-900/90 border border-zinc-800 p-8 lg:p-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-5 space-y-6">
              <span className="text-xs font-mono uppercase tracking-widest text-amber-400 px-3 py-1 rounded bg-amber-400/10 border border-amber-400/20">
                Socratic AI Faculty Engine
              </span>
              <h2 className="text-3xl font-serif font-bold text-white leading-tight">
                Real-Time Step-by-Step Guidance Engine.
              </h2>
              <p className="text-zinc-400 text-sm leading-relaxed">
                Test the interactive Socratic engine below to observe structured academic derivations and diagnostic logic feedback.
              </p>
            </div>
            <div className="lg:col-span-7">
              <AIFacultyTerminal />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};


export const CatalogPageView: FC<{ onSelectPlan: (plan: StudyPlan) => void }> = ({ onSelectPlan }) => {
  const [filters, setFilters] = useState<StudyPlanFilterState>({
    searchTerm: '',
    category: 'All',
    faculty: 'All',
    level: 'All',
    country: 'All'
  });

  const filteredPlans = useMemo(() => {
    return STUDY_PLANS_DATA.filter((plan) => {
      const matchesSearch =
        plan.title.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
        plan.description.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
        plan.department.toLowerCase().includes(filters.searchTerm.toLowerCase());
      const matchesCat = filters.category === 'All' || plan.category === filters.category;
      const matchesFac = filters.faculty === 'All' || plan.faculty === filters.faculty;
      const matchesLvl = filters.level === 'All' || plan.level === filters.level;

      return matchesSearch && matchesCat && matchesFac && matchesLvl;
    });
  }, [filters]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      <div className="space-y-4 text-left border-b border-zinc-800 pb-8">
        <span className="text-xs font-mono uppercase tracking-widest text-amber-400">
          Institutional Academic Catalog
        </span>
        <h1 className="text-4xl font-serif font-bold text-white">
          Structured Academic & Professional Study Plans
        </h1>
        <p className="text-zinc-400 text-sm max-w-3xl leading-relaxed">
          Filter accredited curricula by educational tier, academic faculty, and domain level. Every study plan contains DAG-verified prerequisite dependencies and proctored assessment milestones.
        </p>
      </div>

      <CatalogFilterPanel filters={filters} setFilters={setFilters} resultCount={filteredPlans.length} />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredPlans.map((plan) => (
          <StudyPlanCard key={plan.id} plan={plan} onSelect={onSelectPlan} />
        ))}
      </div>

      {filteredPlans.length === 0 && (
        <div className="text-center py-16 bg-zinc-950 rounded-2xl border border-zinc-800 space-y-3">
          <HelpCircle className="w-8 h-8 text-zinc-600 mx-auto" />
          <p className="text-zinc-300 font-medium">No study plans match your specified filter criteria.</p>
          <p className="text-xs text-zinc-500">Try broadening your search term or resetting the dropdown filters.</p>
        </div>
      )}
    </div>
  );
};


export const HowItWorksPageView: FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16">
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="text-xs font-mono uppercase tracking-widest text-amber-400">
          Methodological System
        </span>
        <h1 className="text-4xl font-serif font-bold text-white">
          How InfoBeatLive Academy Enforces Mastery
        </h1>
        <p className="text-zinc-400 text-sm leading-relaxed">
          An 8-step standardized academic engine engineered to transform foundational curiosity into verified theoretical and practical domain expertise.
        </p>
      </div>

      <div className="relative border-l border-zinc-800 ml-4 md:ml-32 space-y-12">
        {PROCESS_STEPS.map((step, idx) => (
          <div key={idx} className="relative pl-8 md:pl-12 group">
            <div className="absolute -left-4 top-0 w-8 h-8 rounded-full bg-zinc-950 border-2 border-amber-400 flex items-center justify-center text-amber-400 text-xs font-mono font-bold shadow-lg">
              {step.stepNumber}
            </div>

            <div className="p-6 rounded-2xl bg-zinc-950 border border-zinc-800/90 hover:border-amber-500/40 transition-all space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono text-amber-400 uppercase tracking-widest">
                  {step.subtitle}
                </span>
                <span className="text-[10px] font-mono text-zinc-500 uppercase bg-zinc-900 px-2 py-0.5 rounded">
                  Artifact: {step.outputArtifact}
                </span>
              </div>
              <h3 className="text-lg font-serif font-bold text-white group-hover:text-amber-300 transition-colors">
                {step.title}
              </h3>
              <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
                {step.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};


export const PricingPageView: FC<{ onOpenAuth: () => void }> = ({ onOpenAuth }) => {
  const [annualBilling, setAnnualBilling] = useState<boolean>(true);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16">
      <div className="text-center max-w-3xl mx-auto space-y-6">
        <span className="text-xs font-mono uppercase tracking-widest text-amber-400">
          Tuition & Investment
        </span>
        <h1 className="text-4xl font-serif font-bold text-white">
          Transparent Tuition Plans for Serious Scholars
        </h1>
        <p className="text-zinc-400 text-sm leading-relaxed">
          Invest in rigorous academic progress without hidden fees. All tiers include proctored assessments and complete syllabus access.
        </p>

        {/* Billing Switcher */}
        <div className="inline-flex items-center space-x-3 p-1.5 rounded-xl bg-zinc-900 border border-zinc-800">
          <button
            onClick={() => setAnnualBilling(false)}
            className={cn(
              'px-4 py-2 rounded-lg text-xs font-mono font-semibold transition-all',
              !annualBilling ? 'bg-zinc-800 text-amber-400 shadow' : 'text-zinc-400'
            )}
          >
            Monthly Billing
          </button>
          <button
            onClick={() => setAnnualBilling(true)}
            className={cn(
              'px-4 py-2 rounded-lg text-xs font-mono font-semibold transition-all flex items-center space-x-1.5',
              annualBilling ? 'bg-zinc-800 text-amber-400 shadow' : 'text-zinc-400'
            )}
          >
            <span>Annual Billing</span>
            <span className="text-[9px] bg-amber-400/20 text-amber-300 px-1.5 py-0.5 rounded uppercase">
              20% Off
            </span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {TUITION_TIERS.map((tier) => {
          const price = annualBilling ? tier.annualDiscountPrice : tier.monthlyPrice;
          return (
            <div
              key={tier.id}
              className={cn(
                'p-8 rounded-3xl bg-zinc-950 border flex flex-col justify-between space-y-8',
                tier.isPopular ? 'border-amber-400 shadow-2xl relative' : 'border-zinc-800'
              )}
            >
              {tier.isPopular && (
                <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-amber-400 text-black text-[10px] font-mono font-bold uppercase tracking-widest px-3 py-1 rounded-full shadow-lg">
                  MOST RECOMMENDED
                </span>
              )}

              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-serif font-bold text-white">{tier.name}</h3>
                  <p className="text-xs text-zinc-400 mt-2">{tier.description}</p>
                </div>

                <div className="flex items-baseline space-x-1">
                  <span className="text-4xl font-bold font-mono text-white">${price}</span>
                  <span className="text-xs font-mono text-zinc-500">/ month</span>
                </div>

                <div className="p-3 rounded-lg bg-zinc-900/60 border border-zinc-800/80 text-[11px] font-mono text-amber-300">
                  Target: {tier.targetAudience}
                </div>

                <ul className="space-y-3 pt-4 border-t border-zinc-900">
                  {tier.features.map((feat, j) => (
                    <li key={j} className="flex items-start space-x-3 text-xs text-zinc-300">
                      <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <button
                onClick={onOpenAuth}
                className={cn(
                  'w-full py-3.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all',
                  tier.isPopular
                    ? 'bg-amber-400 text-black hover:bg-amber-300'
                    : 'bg-zinc-900 hover:bg-zinc-800 text-zinc-200 border border-zinc-700'
                )}
              >
                Enroll Under {tier.name}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};


export const CredibilityPageView: FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16">
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="text-xs font-mono uppercase tracking-widest text-amber-400">
          Academic Philosophy & Integrity
        </span>
        <h1 className="text-4xl font-serif font-bold text-white">
          What InfoBeatLive Academy Is — and Is Not.
        </h1>
        <p className="text-zinc-400 text-sm leading-relaxed">
          We maintain explicit boundaries to preserve institutional academic integrity.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="p-8 rounded-2xl bg-zinc-950 border border-emerald-500/30 space-y-6">
          <h3 className="text-xl font-serif font-bold text-emerald-400 flex items-center space-x-2">
            <CheckCircle2 className="w-5 h-5 text-emerald-400" />
            <span>WHAT WE ARE</span>
          </h3>
          <ul className="space-y-4 text-sm text-zinc-300">
            <li className="flex items-start space-x-3">
              <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-1" />
              <span>A proctored academic environment for deep theoretical and applied mastery.</span>
            </li>
            <li className="flex items-start space-x-3">
              <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-1" />
              <span>A verified DAG curriculum provider ensuring zero missing mathematical prerequisites.</span>
            </li>
            <li className="flex items-start space-x-3">
              <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-1" />
              <span>An evidence-backed platform grounded in modern educational cognitive science.</span>
            </li>
          </ul>
        </div>

        <div className="p-8 rounded-2xl bg-zinc-950 border border-red-500/30 space-y-6">
          <h3 className="text-xl font-serif font-bold text-red-400 flex items-center space-x-2">
            <X className="w-5 h-5 text-red-400" />
            <span>WHAT WE ARE NOT</span>
          </h3>
          <ul className="space-y-4 text-sm text-zinc-400">
            <li className="flex items-start space-x-3">
              <X className="w-4 h-4 text-red-400 shrink-0 mt-1" />
              <span>A casual video marketplace or quick shortcut diploma mill.</span>
            </li>
            <li className="flex items-start space-x-3">
              <X className="w-4 h-4 text-red-400 shrink-0 mt-1" />
              <span>A generic chat engine providing answers without testing reasoning.</span>
            </li>
            <li className="flex items-start space-x-3">
              <X className="w-4 h-4 text-red-400 shrink-0 mt-1" />
              <span>A substitute for deliberate practice and personal problem synthesis.</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export const SupportPageView: FC = () => {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16">
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="text-xs font-mono uppercase tracking-widest text-amber-400">
          Help & Governance
        </span>
        <h1 className="text-4xl font-serif font-bold text-white">
          Frequently Asked Questions & Support Center
        </h1>
      </div>

      <div className="max-w-3xl mx-auto space-y-4">
        {FAQS_DATA.map((faq, idx) => (
          <div key={faq.id} className="rounded-2xl bg-zinc-950 border border-zinc-800 overflow-hidden">
            <button
              onClick={() => setOpenFaqIndex(openFaqIndex === idx ? null : idx)}
              className="w-full p-6 text-left flex items-center justify-between space-x-4 focus:outline-none"
            >
              <span className="text-base font-semibold text-zinc-100">{faq.question}</span>
              <ChevronDown
                className={cn(
                  'w-5 h-5 text-amber-400 transition-transform',
                  openFaqIndex === idx ? 'rotate-180' : ''
                )}
              />
            </button>

            {openFaqIndex === idx && (
              <div className="px-6 pb-6 text-xs sm:text-sm text-zinc-400 leading-relaxed border-t border-zinc-900/80 pt-4">
                {faq.answer}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};


export const InstitutionalFooter: FC<{ onNavigate: (tab: NavigationTab) => void }> = ({ onNavigate }) => {
  return (
    <footer className="border-t border-zinc-800 bg-zinc-950 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 rounded-lg bg-zinc-900 border border-zinc-700 flex items-center justify-center">
                <GraduationCap className="w-4 h-4 text-amber-400" />
              </div>
              <span className="font-serif font-bold text-lg text-white">INFOBEATLIVE ACADEMY</span>
            </div>
            <p className="text-xs text-zinc-400 max-w-sm leading-relaxed">
              Standardized higher academic learning platform offering structured curricula across K-12 advanced STEM, undergraduate honors, doctoral foundations, and senior professional engineering.
            </p>
            <p className="text-xs font-mono text-zinc-500">
              Contact: academy@infobeatlive.com | +1 XX XXXX XXXX
            </p>
          </div>

          <div>
            <h4 className="text-xs font-mono uppercase tracking-wider text-amber-400 mb-4">Navigational Paths</h4>
            <ul className="space-y-2 text-xs text-zinc-400">
              <li><button onClick={() => onNavigate('catalog')} className="hover:text-white">Study Plans Catalog</button></li>
              <li><button onClick={() => onNavigate('how-it-works')} className="hover:text-white">8-Step Methodology</button></li>
              <li><button onClick={() => onNavigate('services')} className="hover:text-white">Institutional Services</button></li>
              <li><button onClick={() => onNavigate('pricing')} className="hover:text-white">Tuition & Plans</button></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-mono uppercase tracking-wider text-amber-400 mb-4">Integrity & Research</h4>
            <ul className="space-y-2 text-xs text-zinc-400">
              <li><button onClick={() => onNavigate('credibility')} className="hover:text-white">Academic Philosophy</button></li>
              <li><button onClick={() => onNavigate('journal')} className="hover:text-white">Research Journal</button></li>
              <li><button onClick={() => onNavigate('support')} className="hover:text-white">Support & FAQ</button></li>
              <li><button onClick={() => onNavigate('contact')} className="hover:text-white">Admissions Query</button></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-mono uppercase tracking-wider text-amber-400 mb-4">Legal & Governance</h4>
            <ul className="space-y-2 text-xs text-zinc-400">
              <li><a href="#privacy" className="hover:text-white">Academic Privacy Policy</a></li>
              <li><a href="#terms" className="hover:text-white">Terms of Accreditation</a></li>
              <li><a href="#security" className="hover:text-white">Proctoring Protocols</a></li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-zinc-900 flex flex-col sm:flex-row justify-between items-center text-xs font-mono text-zinc-500">
          <p>© 2026 InfoBeatLive Academy. All Rights Reserved.</p>
          <p>Cryptographically Signed Transcripts • Proctored Mastery</p>
        </div>
      </div>
    </footer>
  );
};


export default function App() {
  const [activeTab, setActiveTab] = useState<NavigationTab>('home');
  const [authModalOpen, setAuthModalOpen] = useState<boolean>(false);
  const [selectedPlanDetail, setSelectedPlanDetail] = useState<StudyPlan | null>(null);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [activeTab]);

  return (
    <div className="min-h-screen bg-[#08090D] text-zinc-100 font-sans antialiased selection:bg-amber-400/20 selection:text-amber-300 relative overflow-x-hidden">
      {/* Top Global Accent Line */}
      <div className="h-1 w-full bg-gradient-to-r from-amber-500/0 via-amber-400 to-amber-500/0" />

      {/* GLOBAL HEADER */}
      <InstitutionalHeader
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenAuth={() => setAuthModalOpen(true)}
      />

      {/* VIEW ROUTER CONTROLLER */}
      <main className="min-h-[calc(100vh-80px)]">
        {activeTab === 'home' && (
          <HomePageView
            onNavigate={setActiveTab}
            onOpenAuth={() => setAuthModalOpen(true)}
          />
        )}

        {activeTab === 'catalog' && (
          <CatalogPageView onSelectPlan={(plan) => setSelectedPlanDetail(plan)} />
        )}

        {activeTab === 'how-it-works' && <HowItWorksPageView />}

        {activeTab === 'pricing' && (
          <PricingPageView onOpenAuth={() => setAuthModalOpen(true)} />
        )}

        {activeTab === 'credibility' && <CredibilityPageView />}

        {activeTab === 'support' && <SupportPageView />}

        {/* Fallback for other routes */}
        {(activeTab === 'what-we-do' ||
          activeTab === 'services' ||
          activeTab === 'process' ||
          activeTab === 'journal' ||
          activeTab === 'contact' ||
          activeTab === 'testimonials') && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center space-y-6">
            <span className="text-xs font-mono uppercase tracking-widest text-amber-400">
              Institutional View
            </span>
            <h1 className="text-4xl font-serif font-bold text-white capitalize">
              {activeTab.replace(/-/g, ' ')} Module
            </h1>
            <p className="text-zinc-400 max-w-xl mx-auto text-sm">
              You are navigating the {activeTab} portal. Explore accredited study plans or test our live Socratic faculty simulator.
            </p>
            <div className="pt-4 flex justify-center space-x-4">
              <button
                onClick={() => setActiveTab('catalog')}
                className="px-6 py-3 rounded-xl bg-amber-400 text-black font-bold text-xs uppercase tracking-wider"
              >
                Browse Study Catalog
              </button>
              <button
                onClick={() => setActiveTab('home')}
                className="px-6 py-3 rounded-xl bg-zinc-900 border border-zinc-700 text-zinc-300 font-semibold text-xs uppercase tracking-wider"
              >
                Return To Home
              </button>
            </div>
          </div>
        )}
      </main>

      {/* MODALS */}
      <StudyPlanDetailModal
        plan={selectedPlanDetail}
        onClose={() => setSelectedPlanDetail(null)}
        onEnroll={() => setAuthModalOpen(true)}
      />

      <AuthModal isOpen={authModalOpen} onClose={() => setAuthModalOpen(false)} />

      {/* GLOBAL FOOTER */}
      <InstitutionalFooter onNavigate={setActiveTab} />
    </div>
  );
}