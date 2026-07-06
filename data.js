/* ==========================================================================
   DATA.JS  —  THIS IS THE FILE YOU EDIT.
   ==========================================================================
   Everything on the site that's a "list" (experience, projects, skills,
   achievements) is generated from the arrays below by script.js.

   To add a new project:  copy one of the objects in PROJECTS, paste it
   as a new entry, and change the values. That's it — no HTML editing,
   no touching layout code. Same idea for EXPERIENCE / SKILLS / ACHIEVEMENTS.
   ========================================================================== */


/* ---------------------------------------------------------------------
   EXPERIENCE — most recent first
--------------------------------------------------------------------- */
const EXPERIENCE = [
  {
    role: "Junior AI/ML & Computer Vision Engineer",
    org: "Tractrix Opto Dynamics",
    period: "Feb 2025 — Present",
    points: [
      "Architected a self-reflective RAG system as a stateful agent graph: adaptive retrieval gating, LLM-based document relevance scoring, multi-stage conditional routing, and an automated hallucination-mitigation loop that classifies answers as supported / unsupported and triggers autonomous revision before the answer reaches a user.",
      "Led optimization of a real-time GStreamer video pipeline for edge AI devices — cut end-to-end inference latency by 35%, raised throughput from 18 to 30 FPS (2×), and reduced CPU utilization by 40%.",
      "Designed and shipped modular Flask microservices for camera ingestion, inference, recording, video transfer, and a client-server architecture with database state management — deployed extensively on Embedded devices."
    ]
  },
  {
    role: "Artificial Intelligence Intern",
    org: "Smart Prepper",
    period: "Aug 2024 — Nov 2024",
    points: [
      "Built an end-to-end flashcard generator (text / topic / multi-page PDF input, PDFs on AWS S3) producing LLM + RAG-generated Q&A flashcards at 1,000+ per hour, with secure upload and >80% successful conversion.",
      "Built a Mind Map Generator (Django + OpenAI) converting long unstructured notes into Markdown mind maps — cut manual summarization time by 70% in trials with UPSC aspirants.",
      "Implemented a Pinecone vector-embedding pipeline for semantic retrieval powering quiz/MCQ generation, improving MCQ relevance by 25%."
    ]
  },
  {
    role: "Lead, Technology — GDSC (Google Developer Student Clubs) & NLP Student",
    org: "IIIT Hyderabad",
    period: "Aug 2023 — Aug 2024",
    points: [
      "As Lead, ran sessions on machine learning and deep learning using TensorFlow, Colab, and Cloud Study Jams.",
      "As part of the NLP program, developed a CNN-based speaker recognition system reaching 97% accuracy."
    ]
  }
];


/* ---------------------------------------------------------------------
   PROJECTS
   - tags: shown as chips, also usable for future filtering
   - links: leave "demo" as null if there's no live demo yet
--------------------------------------------------------------------- */
const PROJECTS = [
  {
    title: "MeetingMind",
    subtitle: "AI-powered meeting orchestration agent",
    description:
      "A 5-agent LangGraph pipeline that turns raw meeting transcripts into executed actions. It understands the meeting, extracts action items with owner/deadline/confidence, reflects on and filters out vague items, routes each valid action to the right MCP tool, and only executes what a human explicitly approves.",
    highlights: [
      "Integrated 4 MCP servers (Gmail, Google Calendar, Jira, Slack) for real tool execution",
      "Human-in-the-loop approval flow — nothing fires without explicit sign-off",
      "FastAPI backend, SQLAlchemy/SQLite persistence, full LangSmith tracing",
      "Streamlit dashboard for transcript upload, review, approval and audit trail"
    ],
    tags: ["LangGraph", "Multi-Agent", "MCP", "FastAPI", "Human-in-the-Loop", "LangSmith"],
    links: { github: "https://github.com/dineshramv13/MeetingMind-AI-Powered-Meeting-Orchestration-Agent", demo: null }
  },
  {
    title: "Agentic Healthcare Voice Assistant Agent",
    subtitle: "Voice first agentic RAG, fully Autonomus",
    description:
      "A stateful LangGraph voice agent for healthcare reception — safety check → intent classification → conditional routing → hybrid RAG retrieval → generation → grounding verification — mirroring how production clinical voice AI is designed, with hardcoded, zero-LLM emergency handling for safety.",
    highlights: [
      "Self-corrective RAG: an independent verifier LLM call confirms grounding before any answer ships, retrying up to twice before falling back to a human callback",
      "Hybrid retrieval: BM25 + dense vectors fused with Reciprocal Rank Fusion (built from scratch), refined by a local cross-encoder reranker, with HyDE query transformation",
      "Full local voice pipeline — Whisper STT, energy-threshold VAD, pyttsx3 TTS in isolated subprocesses — no API cost",
      "RAGAS-style evaluation harness across a 50-query golden set: faithfulness, relevance, context precision, emergency recall, P95 latency, A/B prompt comparisons"
    ],
    tags: ["LangGraph", "RAG", "Whisper", "ChromaDB", "FastAPI", "RAGAS", "Safety Guardrails"],
    links: { github: "https://github.com/dineshramv13/Agentic_Healthcare_Voice_Assistant", demo: null }
  },
  {
    title: "Advanced Multi-Agent Blog Writer",
    subtitle: "5-agent research & writing orchestration",
    description:
      "A stateful multi-agent content pipeline (Router → Research → Orchestrator → parallel Workers → Reducer) built with LangGraph. A classifier routes each request across three execution modes — closed, hybrid, or open — before research and writing agents run in parallel and get reduced into a final, cited piece.",
    highlights: [
      "Tavily-powered real-time web research with evidence and citations",
      "Full LangSmith observability across every agent trace",
      "Deployed on AWS EC2 via Docker with a GitHub Actions CI/CD pipeline for auto-deployment"
    ],
    tags: ["LangGraph", "Multi-Agent", "Tavily", "AWS EC2", "Docker", "CI/CD"],
    links: { github: "https://github.com/dineshramv13/Advanced_Multi_Agent_Blog_Writer", demo: null }
  },
   {
    title: "Network Security — ML Threat Detection Pipeline",
    subtitle: "End-to-end MLOps for phishing/security data",
    description:
      "A full ETL-to-deployment ML pipeline for network security data: raw CSVs are extracted and pushed into MongoDB, cleaned and feature-selected, then trained with Scikit-learn models tuned via GridSearchCV. The whole lifecycle is tracked with MLflow and versioned on DagsHub, and served through a FastAPI app with train/predict endpoints.",
    highlights: [
      "ETL pipeline: CSV → JSON → MongoDB, with a dedicated data-cleaning and feature-selection stage",
      "GridSearchCV hyperparameter tuning across multiple Scikit-learn models, evaluated on R² score",
      "MLflow experiment tracking (params, metrics, artifacts) with DagsHub for dataset/model version control",
      "FastAPI service: /train to run the training pipeline, /predict to upload a CSV and get predictions back as an HTML table",
      "Custom exception handling and structured logging (INFO/ERROR) across the whole application"
    ],
    tags: ["MLOps", "Python", "Scikit-learn", "FastAPI", "MongoDB", "MLflow", "DagsHub", "ETL"],
    links: { github: "https://github.com/dineshramv13/networksecurity", demo: null }
  },
  {
    title: "Sign Language Recognition App",
    subtitle: "Real-time ASL letter recognition → sentences",
    description:
      "A real-time American Sign Language recognition app using MediaPipe Hands to extract 21 hand landmarks (42 normalized features) per frame, classified letter-by-letter with a Random Forest model. Recognized letters build into a running word, with previously signed words tracked to form full sentences — all through an interactive Streamlit interface.",
    highlights: [
      "MediaPipe Hands landmark extraction, normalized for scale and position invariance",
      "Random Forest Classifier for letter recognition, with the trained model and label map cached to disk to skip retraining",
      "Real-time webcam prediction pipeline: capture → landmark extraction → classification → sentence building",
      "Streamlit GUI supporting model training, static-image testing, and live real-time prediction in one app"
    ],
    tags: ["OpenCV", "MediaPipe", "Computer Vision", "Random Forest", "Streamlit", "Python"],
    links: { github: "https://github.com/dineshramv13/Sign-Language-Recognition-App", demo: null }
  }
  ,
  {
    title: "More RAG, LLM & agent experiments",
    subtitle: "PDF chatbots · summarizers · local LLaMA · Gemini pipelines",
    description:
      "A running collection of smaller RAG chatbots, document summarizers, and LLM pipelines — some running fully local on LLaMA, others on Gemini — where I try out new retrieval, evaluation, or agent-orchestration ideas before they graduate into bigger projects.",
    highlights: [],
    tags: ["RAG", "LLM Pipelines", "Local LLaMA", "Gemini"],
    links: { github: "https://github.com/dineshramv13?tab=repositories", demo: null }
  }
];


/* ---------------------------------------------------------------------
   SKILLS — grouped into categories, shown as chip clusters
--------------------------------------------------------------------- */
const SKILLS = [
  {
    group: "Generative & Agentic AI",
    items: ["LLMs", "RAG", "Agentic AI", "LangChain", "LangGraph", "Prompt Engineering", "Multi-Agent Systems", "MCP"]
  },
  {
    group: "ML / DL",
    items: ["Scikit-learn", "TensorFlow", "Keras", "OpenCV", "Deep Learning", "Data Structures & Algorithms"]
  },
  {
    group: "Languages & Data",
    items: ["Python", "C", "SQL", "HTML", "CSS", "MongoDB", "FAISS", "ChromaDB", "Pinecone"]
  },
  {
    group: "Backend & Cloud",
    items: ["FastAPI", "Django", "Flask", "AWS", "Docker", "GitHub Actions", "CI/CD", "MLOps"]
  }
];


/* ---------------------------------------------------------------------
   ACHIEVEMENTS & EDUCATION
--------------------------------------------------------------------- */
const ACHIEVEMENTS = [
  { title: "Research paper publication", detail: "Published research paper on sign language" },
  { title: "MIT iQuHACK 2023", detail: "Microsoft's Quantum challenge track" },
  { title: "Amazon ML Challenge", detail: "National-level competition, 103 position of 5000" },
  { title: "NPTEL Elite", detail: "Certification with Elite distinction" },
  { title: "National Hackathons", detail: "Multiple (SIH, KAVACH, etc) hackathon participations" },
  { title: "Cisco CCNA · IBM · Udemy", detail: "Professional certifications" },
  { title: "B.Tech, CSE — HITAM", detail: "CGPA 9.01 · 2021 – 2025" }
];
