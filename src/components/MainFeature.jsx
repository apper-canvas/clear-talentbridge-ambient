import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { toast } from 'react-toastify'
import ApperIcon from './ApperIcon'
import JobSearch from './JobSearch'
import ResumeBuilder from './ResumeBuilder'

const MainFeature = () => {
  const [activeTab, setActiveTab] = useState('search')
const [showCreateModal, setShowCreateModal] = useState(false)
  const [createFormData, setCreateFormData] = useState({
    candidateName: '',
    candidateEmail: '',
    position: '',
    company: '',
    department: '',
    location: '',
    experience: '',
    salary: '',
    skills: [],
    status: 'applied',
    notes: ''
  })
  const [createFormErrors, setCreateFormErrors] = useState({})
  const [newSkill, setNewSkill] = useState('')
const [applicationFilters, setApplicationFilters] = useState({
    search: '',
    position: '',
    status: ''
  })
  const [selectedApplicationTab, setSelectedApplicationTab] = useState('all')
  const [applications, setApplications] = useState([
    {
      id: 1,
      candidateName: 'Sarah Johnson',
      candidateEmail: 'sarah.johnson@email.com',
      position: 'Senior React Developer',
      department: 'Engineering',
      appliedDate: '2024-01-15',
      status: 'under_review',
      experience: '6 years',
      location: 'San Francisco, CA',
      salary: '$120,000 - $140,000',
      resume: 'sarah-johnson-resume.pdf',
      coverLetter: 'Passionate about building scalable web applications...',
      skills: ['React', 'TypeScript', 'Node.js', 'GraphQL'],
      avatar: '👩‍💻',
      rating: 4.8,
      notes: 'Strong technical background, good cultural fit.'
    },
    {
      id: 2,
      candidateName: 'Michael Chen',
      candidateEmail: 'michael.chen@email.com',
      position: 'UX/UI Designer',
      department: 'Design',
      appliedDate: '2024-01-12',
      status: 'interview_scheduled',
      experience: '4 years',
      location: 'New York, NY',
      salary: '$85,000 - $100,000',
      resume: 'michael-chen-resume.pdf',
      coverLetter: 'Creative designer with a passion for user experience...',
      skills: ['Figma', 'Adobe Creative Suite', 'Prototyping'],
      avatar: '👨‍🎨',
      rating: 4.6,
      notes: 'Excellent portfolio, scheduled for design challenge.'
    },
    {
      id: 3,
      candidateName: 'Emily Rodriguez',
      candidateEmail: 'emily.rodriguez@email.com',
      position: 'Data Scientist',
      department: 'Analytics',
      appliedDate: '2024-01-10',
      status: 'offer_sent',
      experience: '5 years',
      location: 'Austin, TX',
      salary: '$110,000 - $130,000',
      resume: 'emily-rodriguez-resume.pdf',
      coverLetter: 'Data scientist with expertise in machine learning...',
      skills: ['Python', 'Machine Learning', 'TensorFlow', 'SQL'],
      avatar: '👩‍🔬',
      rating: 4.9,
      notes: 'Outstanding technical interview, offer extended.'
    },
    {
      id: 4,
      candidateName: 'David Park',
      candidateEmail: 'david.park@email.com',
      position: 'DevOps Engineer',
      department: 'Infrastructure',
      appliedDate: '2024-01-08',
      status: 'rejected',
      experience: '7 years',
      location: 'Seattle, WA',
      salary: '$125,000 - $145,000',
      resume: 'david-park-resume.pdf',
      coverLetter: 'DevOps engineer specializing in cloud infrastructure...',
      skills: ['AWS', 'Kubernetes', 'Docker', 'Terraform'],
      avatar: '👨‍💼',
      rating: 3.8,
      notes: 'Good technical skills but not the right cultural fit.'
    },
    {
      id: 5,
      candidateName: 'Jessica Taylor',
      candidateEmail: 'jessica.taylor@email.com',
      position: 'Product Manager',
      department: 'Product',
      appliedDate: '2024-01-05',
      status: 'hired',
      experience: '8 years',
      location: 'Remote',
      salary: '$130,000 - $150,000',
      resume: 'jessica-taylor-resume.pdf',
      coverLetter: 'Experienced product manager with a track record...',
      skills: ['Product Strategy', 'Agile', 'User Research'],
      avatar: '👩‍💼',
      rating: 4.7,
      notes: 'Excellent experience, great leadership skills. Hired!'
    }
  ])

  const statusConfig = {
    applied: { label: 'Applied', color: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400', icon: 'FileText' },
    under_review: { label: 'Under Review', color: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400', icon: 'Eye' },
    interview_scheduled: { label: 'Interview Scheduled', color: 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400', icon: 'Calendar' },
    offer_sent: { label: 'Offer Sent', color: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400', icon: 'Gift' },
    hired: { label: 'Hired', color: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400', icon: 'CheckCircle' },
    rejected: { label: 'Rejected', color: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400', icon: 'XCircle' }
  }

  const updateApplicationStatus = (applicationId, status) => {
    setApplications(prev => prev.map(app => 
      app.id === applicationId ? { ...app, status } : app
    ))
    toast.success('Application status updated successfully!')
  }

  const getApplicationCounts = () => {
    return {
      all: applications.length,
      applied: applications.filter(app => app.status === 'applied').length,
      under_review: applications.filter(app => app.status === 'under_review').length,
      interview_scheduled: applications.filter(app => app.status === 'interview_scheduled').length,
      offer_sent: applications.filter(app => app.status === 'offer_sent').length,
      hired: applications.filter(app => app.status === 'hired').length,
      rejected: applications.filter(app => app.status === 'rejected').length
    }
  }

  const filteredApplications = applications.filter(app => {
    const matchesTab = selectedApplicationTab === 'all' || app.status === selectedApplicationTab
    const matchesSearch = app.candidateName.toLowerCase().includes(applicationFilters.search.toLowerCase()) ||
                         app.candidateEmail.toLowerCase().includes(applicationFilters.search.toLowerCase())
    const matchesPosition = applicationFilters.position === '' || app.position.toLowerCase().includes(applicationFilters.position.toLowerCase())
    const matchesStatus = applicationFilters.status === '' || app.status === applicationFilters.status
    
    return matchesTab && matchesSearch && matchesPosition && matchesStatus
  })

  const applicationCounts = getApplicationCounts()
// Create Application Functions
  const validateCreateForm = () => {
    const errors = {}
    
    if (!createFormData.candidateName.trim()) {
      errors.candidateName = 'Candidate name is required'
    }
    
    if (!createFormData.candidateEmail.trim()) {
      errors.candidateEmail = 'Email is required'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(createFormData.candidateEmail)) {
      errors.candidateEmail = 'Please enter a valid email address'
    }
    
    if (!createFormData.position.trim()) {
      errors.position = 'Position is required'
    }
    
    if (!createFormData.company.trim()) {
      errors.company = 'Company is required'
    }
    
    if (!createFormData.department.trim()) {
      errors.department = 'Department is required'
    }
    
    if (!createFormData.location.trim()) {
      errors.location = 'Location is required'
    }
    
    if (!createFormData.experience.trim()) {
      errors.experience = 'Experience level is required'
    }
    
    setCreateFormErrors(errors)
    return Object.keys(errors).length === 0
  }

  const handleCreateFormChange = (field, value) => {
    setCreateFormData(prev => ({
      ...prev,
      [field]: value
    }))
    
    // Clear error when user starts typing
    if (createFormErrors[field]) {
      setCreateFormErrors(prev => ({
        ...prev,
        [field]: ''
      }))
    }
  }

  const addSkill = () => {
    if (newSkill.trim() && !createFormData.skills.includes(newSkill.trim())) {
      setCreateFormData(prev => ({
        ...prev,
        skills: [...prev.skills, newSkill.trim()]
      }))
      setNewSkill('')
    }
  }

  const removeSkill = (skillToRemove) => {
    setCreateFormData(prev => ({
      ...prev,
      skills: prev.skills.filter(skill => skill !== skillToRemove)
    }))
  }

  const handleCreateSubmit = (e) => {
    e.preventDefault()
    
    if (!validateCreateForm()) {
      toast.error('Please fix the form errors before submitting')
      return
    }

    const newApplication = {
      id: Math.max(...applications.map(app => app.id)) + 1,
      candidateName: createFormData.candidateName,
      candidateEmail: createFormData.candidateEmail,
      position: createFormData.position,
      department: createFormData.department,
      appliedDate: new Date().toISOString().split('T')[0],
      status: createFormData.status,
      experience: createFormData.experience,
      location: createFormData.location,
      salary: createFormData.salary || 'Not specified',
      resume: `${createFormData.candidateName.toLowerCase().replace(/\s+/g, '-')}-resume.pdf`,
      coverLetter: createFormData.notes || 'No cover letter provided.',
      skills: createFormData.skills,
      avatar: '👤',
      rating: 4.0,
      notes: createFormData.notes
    }

    setApplications(prev => [newApplication, ...prev])
    
    // Reset form
    setCreateFormData({
      candidateName: '',
      candidateEmail: '',
      position: '',
      company: '',
      department: '',
      location: '',
      experience: '',
      salary: '',
      skills: [],
      status: 'applied',
      notes: ''
    })
    setCreateFormErrors({})
    setShowCreateModal(false)
    
    toast.success(`Application for ${newApplication.candidateName} created successfully!`)
  }

  const resetCreateForm = () => {
    setCreateFormData({
      candidateName: '',
      candidateEmail: '',
      position: '',
      company: '',
      department: '',
      location: '',
      experience: '',
      salary: '',
      skills: [],
      status: 'applied',
      notes: ''
    })
    setCreateFormErrors({})
    setNewSkill('')
  }
  const [profile, setProfile] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    location: '',
    currentRole: '',
    experienceLevel: '',
    preferredJobType: '',
    skills: [],
    about: '',
    documents: [],
    skillAssessments: [],
    certificates: []
  })
// Profile Management State
  const [isEditingProfile, setIsEditingProfile] = useState(false)
  const [profileFormData, setProfileFormData] = useState({
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@email.com',
    phone: '+1 (555) 123-4567',
    location: 'San Francisco, CA',
    currentRole: 'Senior React Developer',
    experienceLevel: 'Senior Level (6-8 years)',
    preferredJobType: 'Full-time',
    skills: ['React', 'JavaScript', 'TypeScript', 'Node.js', 'Python'],
    about: 'Passionate software developer with 7+ years of experience building scalable web applications. Specialized in React, Node.js, and cloud technologies.',
    documents: [
      { id: 1, name: 'John_Doe_Resume.pdf', type: 'Resume', uploadDate: '2024-01-15', size: '245 KB' },
      { id: 2, name: 'Cover_Letter.pdf', type: 'Cover Letter', uploadDate: '2024-01-10', size: '89 KB' }
    ],
    skillAssessments: [
      { id: 1, skill: 'React Development', score: 92, level: 'Expert', completedDate: '2024-01-12' },
      { id: 2, skill: 'JavaScript Fundamentals', score: 88, level: 'Advanced', completedDate: '2024-01-08' }
    ],
    certificates: [
      { id: 1, name: 'AWS Certified Developer', issuer: 'Amazon', issueDate: '2023-11-15', expiryDate: '2026-11-15' },
      { id: 2, name: 'React Professional Certificate', issuer: 'Meta', issueDate: '2023-09-20', expiryDate: null }
    ]
  })
  const [profileFormErrors, setProfileFormErrors] = useState({})
  const [newProfileSkill, setNewProfileSkill] = useState('')

  // Profile Functions
  const calculateProfileCompletion = () => {
    const fields = [
      profileFormData.firstName,
      profileFormData.lastName,
      profileFormData.email,
      profileFormData.phone,
      profileFormData.location,
      profileFormData.currentRole,
      profileFormData.experienceLevel,
      profileFormData.about,
      profileFormData.skills.length > 0,
      profileFormData.documents.length > 0
    ]
    
    const completedFields = fields.filter(field => field && field !== '').length
    return Math.round((completedFields / fields.length) * 100)
  }

  const validateProfileForm = () => {
    const errors = {}
    
    if (!profileFormData.firstName.trim()) {
      errors.firstName = 'First name is required'
    }
    
    if (!profileFormData.lastName.trim()) {
      errors.lastName = 'Last name is required'
    }
    
    if (!profileFormData.email.trim()) {
      errors.email = 'Email is required'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(profileFormData.email)) {
      errors.email = 'Please enter a valid email address'
    }
    
    if (!profileFormData.phone.trim()) {
      errors.phone = 'Phone number is required'
    }
    
    if (!profileFormData.location.trim()) {
      errors.location = 'Location is required'
    }
    
    setProfileFormErrors(errors)
    return Object.keys(errors).length === 0
  }

  const handleProfileFormChange = (field, value) => {
    setProfileFormData(prev => ({
      ...prev,
      [field]: value
    }))
    
    // Clear error when user starts typing
    if (profileFormErrors[field]) {
      setProfileFormErrors(prev => ({
        ...prev,
        [field]: ''
      }))
    }
  }

  const addProfileSkill = () => {
    if (newProfileSkill.trim() && !profileFormData.skills.includes(newProfileSkill.trim())) {
      setProfileFormData(prev => ({
        ...prev,
        skills: [...prev.skills, newProfileSkill.trim()]
      }))
      setNewProfileSkill('')
      toast.success('Skill added successfully!')
    }
  }

  const removeProfileSkill = (skillToRemove) => {
    setProfileFormData(prev => ({
      ...prev,
      skills: prev.skills.filter(skill => skill !== skillToRemove)
    }))
    toast.success('Skill removed successfully!')
  }

  const handleProfileSubmit = (e) => {
    e.preventDefault()
    
    if (!validateProfileForm()) {
      toast.error('Please fix the form errors before submitting')
      return
    }

    // Simulate saving profile data
    setProfile(profileFormData)
    setIsEditingProfile(false)
    toast.success('Profile updated successfully!')
  }

  const handleDocumentUpload = () => {
    // Simulate document upload
    const newDocument = {
      id: Math.max(...profileFormData.documents.map(doc => doc.id), 0) + 1,
      name: 'New_Document.pdf',
      type: 'Resume',
      uploadDate: new Date().toISOString().split('T')[0],
      size: '156 KB'
    }
    
    setProfileFormData(prev => ({
      ...prev,
      documents: [...prev.documents, newDocument]
    }))
    
    toast.success('Document uploaded successfully!')
  }

  const removeDocument = (documentId) => {
    setProfileFormData(prev => ({
      ...prev,
      documents: prev.documents.filter(doc => doc.id !== documentId)
    }))
    toast.success('Document removed successfully!')
  }

  const completionPercentage = calculateProfileCompletion()
// Skill Assessment State
  const [selectedAssessment, setSelectedAssessment] = useState(null)
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState({})
  const [timeRemaining, setTimeRemaining] = useState(null)
  const [showResults, setShowResults] = useState(false)
  const [assessmentResults, setAssessmentResults] = useState(null)

  // Assessment data
  const assessments = [
    {
      id: 1,
      title: 'React Development',
      description: 'Test your knowledge of React concepts, hooks, and best practices',
      duration: 30,
      questions: 15,
      difficulty: 'Intermediate',
      icon: '⚛️',
      category: 'Frontend',
      questions_data: [
        {
          id: 1,
          question: 'What is the purpose of React Hooks?',
          options: [
            'To manage component state and lifecycle in functional components',
            'To style React components',
            'To handle routing in React applications',
            'To optimize performance automatically'
          ],
          correct: 0
        },
        {
          id: 2,
          question: 'Which hook would you use to perform side effects in a functional component?',
          options: ['useState', 'useEffect', 'useContext', 'useReducer'],
          correct: 1
        },
        {
          id: 3,
          question: 'What is the virtual DOM in React?',
          options: [
            'A real representation of the DOM',
            'A lightweight JavaScript representation of the real DOM',
            'A styling framework',
            'A database for React applications'
          ],
          correct: 1
        },
        {
          id: 4,
          question: 'How do you pass data from a parent component to a child component?',
          options: [
            'Using state',
            'Using props',
            'Using context',
            'Using refs'
          ],
          correct: 1
        },
        {
          id: 5,
          question: 'What is the purpose of the useCallback hook?',
          options: [
            'To memoize values',
            'To memoize functions',
            'To manage state',
            'To handle side effects'
          ],
          correct: 1
        }
      ]
    },
    {
      id: 2,
      title: 'JavaScript Fundamentals',
      description: 'Assess your understanding of core JavaScript concepts and ES6+ features',
      duration: 25,
      questions: 12,
      difficulty: 'Beginner',
      icon: '🟨',
      category: 'Programming',
      questions_data: [
        {
          id: 1,
          question: 'What is the difference between let and var in JavaScript?',
          options: [
            'No difference',
            'let has block scope, var has function scope',
            'var is newer than let',
            'let is faster than var'
          ],
          correct: 1
        },
        {
          id: 2,
          question: 'Which of the following is not a primitive data type in JavaScript?',
          options: [
            'string',
            'number',
            'object',
            'boolean'
          ],
          correct: 2
        },
        {
          id: 3,
          question: 'What does the === operator do?',
          options: [
            'Assigns a value',
            'Compares values only',
            'Compares values and types',
            'Logical AND operation'
          ],
          correct: 2
        }
      ]
    },
    {
      id: 3,
      title: 'Python Programming',
      description: 'Evaluate your Python skills including data structures and algorithms',
      duration: 35,
      questions: 18,
      difficulty: 'Advanced',
      icon: '🐍',
      category: 'Programming',
      questions_data: [
        {
          id: 1,
          question: 'Which of the following is the correct way to define a list in Python?',
          options: [
            'list = []',
            'list = {}',
            'list = ()',
            'list = ""'
          ],
          correct: 0
        },
        {
          id: 2,
          question: 'What is the output of print(type([]))?',
          options: [
            '<class "list">',
            '<class "array">',
            '<class "tuple">',
            '<class "dict">'
          ],
          correct: 0
        }
      ]
    },
    {
      id: 4,
      title: 'Data Analysis',
      description: 'Test your knowledge of data analysis concepts and tools',
      duration: 40,
      questions: 20,
      difficulty: 'Intermediate',
      icon: '📊',
      category: 'Data Science',
      questions_data: [
        {
          id: 1,
          question: 'What is the primary purpose of data analysis?',
          options: [
            'To collect data',
            'To extract insights and patterns from data',
            'To store data',
            'To delete unnecessary data'
          ],
          correct: 1
        }
      ]
    },
    {
      id: 5,
      title: 'UI/UX Design',
      description: 'Assess your understanding of design principles and user experience',
      duration: 20,
      questions: 10,
      difficulty: 'Beginner',
      icon: '🎨',
      category: 'Design',
      questions_data: [
        {
          id: 1,
          question: 'What does UX stand for?',
          options: [
            'User Experience',
            'User Excellence',
            'Universal Experience',
            'Unified Experience'
          ],
          correct: 0
        }
      ]
    },
    {
      id: 6,
      title: 'Node.js Backend',
      description: 'Test your server-side JavaScript and API development skills',
      duration: 30,
      questions: 15,
      difficulty: 'Intermediate',
      icon: '🟢',
      category: 'Backend',
      questions_data: [
        {
          id: 1,
          question: 'What is Node.js?',
          options: [
            'A frontend framework',
            'A JavaScript runtime built on Chrome\'s V8 engine',
            'A database',
            'A web browser'
          ],
          correct: 1
        }
      ]
    }
  ]

  // Assessment Functions
  const startAssessment = (assessment) => {
    setSelectedAssessment(assessment)
    setCurrentQuestion(0)
    setAnswers({})
    setTimeRemaining(assessment.duration * 60) // Convert to seconds
    setShowResults(false)
    toast.success(`Started ${assessment.title} assessment!`)
  }

  const selectAnswer = (questionId, answerIndex) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: answerIndex
    }))
  }

  const nextQuestion = () => {
    if (currentQuestion < selectedAssessment.questions_data.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    } else {
      finishAssessment()
    }
  }

  const previousQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1)
    }
  }

  const finishAssessment = () => {
    // Calculate results
    let correctAnswers = 0
    selectedAssessment.questions_data.forEach(question => {
      if (answers[question.id] === question.correct) {
        correctAnswers++
      }
    })

    const score = Math.round((correctAnswers / selectedAssessment.questions_data.length) * 100)
    const results = {
      score,
      correctAnswers,
      totalQuestions: selectedAssessment.questions_data.length,
      level: score >= 90 ? 'Expert' : score >= 75 ? 'Advanced' : score >= 60 ? 'Intermediate' : 'Beginner',
      passed: score >= 60
    }

    setAssessmentResults(results)
    setShowResults(true)
    toast.success(`Assessment completed! Score: ${score}%`)
  }

  const retakeAssessment = () => {
    setSelectedAssessment(null)
    setShowResults(false)
    setAssessmentResults(null)
  }

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  const tabs = [
    { id: 'search', label: 'Find Jobs', icon: 'Search' },
    { id: 'resume', label: 'Resume Builder', icon: 'FileText' },
    { id: 'interview', label: 'Interview Tips', icon: 'MessageSquare' },
    { id: 'post', label: 'Post Job', icon: 'Plus' },
    { id: 'applications', label: 'My Applications', icon: 'Briefcase' },
    { id: 'assessments', label: 'Skill Assessments', icon: 'Award' },
    { id: 'profile', label: 'My Profile', icon: 'User' }
  ]

  const [bookmarkedTips, setBookmarkedTips] = useState([])
  const [completedSections, setCompletedSections] = useState([])
  const [expandedTip, setExpandedTip] = useState(null)
  const [selectedTipCategory, setSelectedTipCategory] = useState('all')

  const interviewTips = [
    {
      id: 1,
      category: 'preparation',
      title: 'Research the Company',
      content: 'Thoroughly research the company\'s mission, values, recent news, and culture. Visit their website, read their blog, and check their social media presence. Understanding the company shows genuine interest and helps you tailor your responses.',
      tips: [
        'Study the job description carefully and match your skills',
        'Research the interviewer\'s background on LinkedIn',
        'Prepare specific examples of how you can contribute',
        'Learn about the company\'s competitors and industry trends'
      ]
    },
    {
      id: 2,
      category: 'preparation',
      title: 'Prepare Your STAR Stories',
      content: 'Use the STAR method (Situation, Task, Action, Result) to structure your behavioral interview responses. Prepare 5-7 compelling stories that demonstrate different skills and achievements.',
      tips: [
        'Situation: Set the context for your story',
        'Task: Describe what you needed to accomplish',
        'Action: Explain the specific steps you took',
        'Result: Share the outcomes and what you learned'
      ]
    },
    {
      id: 3,
      category: 'common-questions',
      title: 'Tell Me About Yourself',
      content: 'This is often the first question. Craft a 2-3 minute elevator pitch that covers your background, key achievements, and why you\'re interested in this role.',
      tips: [
        'Start with your current role and key responsibilities',
        'Highlight 2-3 major accomplishments',
        'Connect your experience to the role you\'re applying for',
        'End with why you\'re excited about this opportunity'
      ]
    },
    {
      id: 4,
      category: 'common-questions',
      title: 'Why Do You Want This Job?',
      content: 'Show genuine interest in the role and company. Connect your career goals with what the position offers.',
      tips: [
        'Mention specific aspects of the role that excite you',
        'Reference your research about the company',
        'Explain how this role fits your career trajectory',
        'Avoid focusing solely on salary or benefits'
      ]
    },
    {
      id: 5,
      category: 'behavioral',
      title: 'Describe a Challenge You Overcame',
      content: 'Choose a specific, relevant example that demonstrates problem-solving skills and resilience. Focus on your actions and the positive outcome.',
      tips: [
        'Select a challenge relevant to the job you\'re applying for',
        'Emphasize your problem-solving process',
        'Highlight collaboration if you worked with others',
        'Quantify the results when possible'
      ]
    },
    {
      id: 6,
      category: 'behavioral',
      title: 'Leadership Experience',
      content: 'Even without a formal leadership title, you can demonstrate leadership through initiative, mentoring, or project management.',
      tips: [
        'Include examples of informal leadership',
        'Mention times you motivated or guided others',
        'Discuss projects you initiated or drove forward',
        'Show how you handled conflict or difficult decisions'
      ]
    },
    {
      id: 7,
      category: 'technical',
      title: 'Technical Problem Solving',
      content: 'For technical roles, be prepared to solve problems on the spot. Think out loud and explain your reasoning process.',
      tips: [
        'Ask clarifying questions before starting',
        'Explain your thought process step by step',
        'Consider edge cases and potential issues',
        'Discuss trade-offs in your solution'
      ]
    },
    {
      id: 8,
      category: 'technical',
      title: 'System Design Questions',
      content: 'For senior technical roles, practice designing scalable systems. Focus on high-level architecture rather than implementation details.',
      tips: [
        'Start with clarifying requirements and constraints',
        'Begin with a simple solution, then scale it',
        'Discuss data storage, caching, and load balancing',
        'Consider monitoring, security, and failure scenarios'
      ]
    },
    {
      id: 9,
      category: 'follow-up',
      title: 'Questions to Ask the Interviewer',
      content: 'Prepare thoughtful questions that show your interest and help you evaluate if the role is right for you.',
      tips: [
        'Ask about team dynamics and collaboration',
        'Inquire about growth opportunities and career development',
        'Understand the biggest challenges facing the team',
        'Learn about the company culture and work-life balance'
      ]
    },
    {
      id: 10,
      category: 'follow-up',
      title: 'Post-Interview Thank You',
      content: 'Send a personalized thank-you email within 24 hours. Reiterate your interest and add any points you forgot to mention.',
      tips: [
        'Personalize the message for each interviewer',
        'Reference specific topics from your conversation',
        'Reaffirm your interest and qualifications',
        'Keep it concise but genuine'
      ]
    }
  ]

  const tipCategories = [
    { id: 'all', name: 'All Tips', icon: 'BookOpen' },
    { id: 'preparation', name: 'Preparation', icon: 'CheckSquare' },
    { id: 'common-questions', name: 'Common Questions', icon: 'HelpCircle' },
    { id: 'behavioral', name: 'Behavioral', icon: 'Users' },
    { id: 'technical', name: 'Technical', icon: 'Code' },
    { id: 'follow-up', name: 'Follow-up', icon: 'Send' }
  ]

  const toggleBookmark = (tipId) => {
    setBookmarkedTips(prev => 
      prev.includes(tipId)
        ? prev.filter(id => id !== tipId)
        : [...prev, tipId]
    )
    toast.success(
      bookmarkedTips.includes(tipId) 
        ? 'Tip removed from bookmarks' 
        : 'Tip bookmarked successfully'
    )
  }

  const markSectionComplete = (tipId) => {
    setCompletedSections(prev => 
      prev.includes(tipId)
        ? prev.filter(id => id !== tipId)
        : [...prev, tipId]
    )
    toast.success(
      completedSections.includes(tipId)
        ? 'Section marked as incomplete'
        : 'Section completed! Great job!'
    )
  }

  const toggleTipExpansion = (tipId) => {
    setExpandedTip(expandedTip === tipId ? null : tipId)
  }

  const filteredTips = interviewTips.filter(tip => 
    selectedTipCategory === 'all' || tip.category === selectedTipCategory
  )


  return (
    <div className="max-w-6xl mx-auto">
      {/* Tab Navigation */}
      <div className="flex flex-wrap justify-center gap-2 mb-8">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center space-x-2 px-6 py-3 rounded-2xl font-semibold transition-all duration-300 ${
              activeTab === tab.id
                ? 'bg-gradient-to-r from-primary to-secondary text-white shadow-lg'
                : 'neu-button text-surface-700 dark:text-surface-300'
            }`}
          >
            <ApperIcon name={tab.icon} className="h-5 w-5" />
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {/* Job Search Tab */}
        {activeTab === 'search' && (
          <JobSearch key="search" profile={profile} />
        )}

        {/* Resume Builder Tab */}
        {activeTab === 'resume' && (
          <ResumeBuilder key="resume" />
        )
        }


        )}



        {/* Interview Tips Tab */}
        {activeTab === 'interview' && (
          <motion.div
            key="interview"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <div className="glass-card rounded-2xl p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-surface-900 dark:text-surface-100">
                  Interview Tips & Guides
                </h3>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-surface-600 dark:text-surface-400">
                    {completedSections.length}/{interviewTips.length} completed
                  </span>
                  <div className="w-16 h-2 bg-surface-200 dark:bg-surface-700 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-primary to-secondary transition-all duration-300"
                      style={{ width: `${(completedSections.length / interviewTips.length) * 100}%` }}
                    />
                  </div>
                </div>
              </div>

              {/* Category Filter */}
              <div className="flex flex-wrap gap-2 mb-6">
                {tipCategories.map(category => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedTipCategory(category.id)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-xl font-medium transition-all ${
                      selectedTipCategory === category.id
                        ? 'bg-primary text-white shadow-lg'
                        : 'bg-surface-100 dark:bg-surface-700 text-surface-600 dark:text-surface-400 hover:bg-surface-200 dark:hover:bg-surface-600'
                    }`}
                  >
                    <ApperIcon name={category.icon} className="h-4 w-4" />
                    {category.name}
                  </button>
                ))}
              </div>

              {/* Tips Grid */}
              <div className="grid gap-4">
                {filteredTips.map(tip => (
                  <motion.div
                    key={tip.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="bg-white dark:bg-surface-700 rounded-xl border border-surface-200 dark:border-surface-600 overflow-hidden"
                  >
                    <div className="p-4">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <h4 className="text-lg font-semibold text-surface-900 dark:text-surface-100 mb-2">
                            {tip.title}
                          </h4>
                          <p className="text-surface-600 dark:text-surface-400 text-sm leading-relaxed">
                            {tip.content}
                          </p>
                        </div>
                        
                        <div className="flex items-center gap-2 ml-4">
                          <button
                            onClick={() => toggleBookmark(tip.id)}
                            className={`p-2 rounded-lg transition-colors ${
                              bookmarkedTips.includes(tip.id)
                                ? 'bg-yellow-100 text-yellow-600 dark:bg-yellow-900/30 dark:text-yellow-400'
                                : 'bg-surface-100 dark:bg-surface-600 text-surface-500 hover:text-yellow-600'
                            }`}
                            title={bookmarkedTips.includes(tip.id) ? 'Remove bookmark' : 'Bookmark tip'}
                          >
                            <ApperIcon name="Star" className={`h-4 w-4 ${bookmarkedTips.includes(tip.id) ? 'fill-current' : ''}`} />
                          </button>
                          
                          <button
                            onClick={() => markSectionComplete(tip.id)}
                            className={`p-2 rounded-lg transition-colors ${
                              completedSections.includes(tip.id)
                                ? 'bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400'
                                : 'bg-surface-100 dark:bg-surface-600 text-surface-500 hover:text-green-600'
                            }`}
                            title={completedSections.includes(tip.id) ? 'Mark as incomplete' : 'Mark as complete'}
                          >
                            <ApperIcon name="CheckCircle" className={`h-4 w-4 ${completedSections.includes(tip.id) ? 'fill-current' : ''}`} />
                          </button>
                        </div>
                      </div>

                      {/* Expandable Tips Section */}
                      <button
                        onClick={() => toggleTipExpansion(tip.id)}
                        className="flex items-center gap-2 text-primary hover:text-primary-dark transition-colors text-sm font-medium"
                      >
                        <ApperIcon 
                          name={expandedTip === tip.id ? 'ChevronUp' : 'ChevronDown'} 
                          className="h-4 w-4" 
                        />
                        {expandedTip === tip.id ? 'Hide' : 'Show'} detailed tips
                      </button>

                      {expandedTip === tip.id && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="mt-4 pt-4 border-t border-surface-200 dark:border-surface-600"
                        >
                          <h5 className="font-medium text-surface-800 dark:text-surface-200 mb-3">
                            Key Points to Remember:
                          </h5>
                          <ul className="space-y-2">
                            {tip.tips.map((tipPoint, index) => (
                              <li key={index} className="flex items-start gap-2 text-sm text-surface-600 dark:text-surface-400">
                                <ApperIcon name="ArrowRight" className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                                {tipPoint}
                              </li>
                            ))}
                          </ul>
                        </motion.div>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>

              {filteredTips.length === 0 && (
                <div className="text-center py-12">
                  <ApperIcon name="Search" className="h-16 w-16 text-surface-300 mx-auto mb-4" />
                  <p className="text-surface-600 dark:text-surface-400">
                    No tips found for the selected category.
                  </p>
                </div>
              )}

              {/* Quick Actions */}
              <div className="mt-8 pt-6 border-t border-surface-200 dark:border-surface-600">
                <h4 className="text-lg font-semibold text-surface-900 dark:text-surface-100 mb-4">
                  Quick Actions
                </h4>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  <button
                    onClick={() => toast.info('Mock interview feature coming soon!')}
                    className="flex items-center gap-3 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl border border-blue-200 dark:border-blue-800 hover:shadow-md transition-all"
                  >
                    <ApperIcon name="Video" className="h-5 w-5 text-blue-600" />
                    <div className="text-left">
                      <div className="font-medium text-blue-900 dark:text-blue-100">Practice Interview</div>
                      <div className="text-sm text-blue-600 dark:text-blue-400">Mock interview session</div>
                    </div>
                  </button>
                  
                  <button
                    onClick={() => toast.info('Question bank feature coming soon!')}
                    className="flex items-center gap-3 p-4 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-xl border border-green-200 dark:border-green-800 hover:shadow-md transition-all"
                  >
                    <ApperIcon name="HelpCircle" className="h-5 w-5 text-green-600" />
                    <div className="text-left">
                      <div className="font-medium text-green-900 dark:text-green-100">Question Bank</div>
                      <div className="text-sm text-green-600 dark:text-green-400">Practice common questions</div>
                    </div>
                  </button>
                  
                  <button
                    onClick={() => {
                      const bookmarkedCount = bookmarkedTips.length
                      const completedCount = completedSections.length
                      toast.info(`You have ${bookmarkedCount} bookmarked tips and completed ${completedCount} sections!`)
                    }}
                    className="flex items-center gap-3 p-4 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-xl border border-purple-200 dark:border-purple-800 hover:shadow-md transition-all"
                  >
                    <ApperIcon name="BarChart" className="h-5 w-5 text-purple-600" />
                    <div className="text-left">
                      <div className="font-medium text-purple-900 dark:text-purple-100">Progress Report</div>
                      <div className="text-sm text-purple-600 dark:text-purple-400">View your preparation status</div>
                    </div>
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}


        {/* Post Job Tab */}
        {activeTab === 'post' && (
          <motion.div
            key="post"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <div className="glass-card rounded-2xl p-6">
              <h3 className="text-2xl font-bold mb-6 text-surface-900 dark:text-surface-100">
                Post a New Job
              </h3>
              <div className="text-center py-12">
                <ApperIcon name="Plus" className="h-16 w-16 text-surface-300 mx-auto mb-4" />
                <p className="text-surface-600 dark:text-surface-400">
                  Job posting functionality will be implemented here
                </p>
              </div>
            </div>
          </motion.div>
        )}
{/* Applications Tab */}
        {activeTab === 'applications' && (
          <motion.div
            key="applications"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <div className="glass-card rounded-2xl p-6">
              <h3 className="text-2xl font-bold mb-6 text-surface-900 dark:text-surface-100">
                My Applications
              </h3>

{/* Add Application Button */}
              <div className="flex justify-between items-center mb-6">
                <p className="text-surface-600 dark:text-surface-400">
                  Manage and track all your job applications
                </p>
                <button
                  onClick={() => setShowCreateModal(true)}
                  className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-primary to-secondary text-white rounded-xl font-medium hover:shadow-lg transition-all duration-300"
                >
                  <ApperIcon name="Plus" className="h-5 w-5" />
                  Add Application
                </button>
              </div>
              {/* Stats Cards */}
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4 mb-8">
                {Object.entries(applicationCounts).map(([status, count]) => {
                  const config = statusConfig[status] || { label: 'All', color: 'bg-surface-100 text-surface-700 dark:bg-surface-700 dark:text-surface-300', icon: 'FileText' }
                  const isActive = selectedApplicationTab === status
                  
                  return (
                    <button
                      key={status}
                      onClick={() => setSelectedApplicationTab(status)}
                      className={`p-4 rounded-xl text-center transition-all duration-300 ${
                        isActive 
                          ? 'bg-gradient-to-r from-primary to-secondary text-white transform scale-105' 
                          : 'glass-card hover:shadow-lg'
                      }`}
                    >
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center mx-auto mb-2 ${
                        isActive ? 'bg-white/20' : 'bg-primary/10'
                      }`}>
                        <ApperIcon 
                          name={config.icon} 
                          className={`h-4 w-4 ${isActive ? 'text-white' : 'text-primary'}`} 
                        />
                      </div>
                      <div className={`text-2xl font-bold mb-1 ${isActive ? 'text-white' : 'text-surface-900 dark:text-surface-100'}`}>
                        {count}
                      </div>
                      <div className={`text-xs ${isActive ? 'text-white/80' : 'text-surface-600 dark:text-surface-400'}`}>
                        {status === 'all' ? 'All' : config.label}
                      </div>
                    </button>
                  )
                })}
              </div>

              {/* Filters */}
              <div className="bg-white dark:bg-surface-700 rounded-xl p-6 mb-8 border border-surface-200 dark:border-surface-600">
                <div className="grid md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">
                      Search Candidates
                    </label>
                    <div className="relative">
                      <ApperIcon name="Search" className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-surface-400" />
                      <input
                        type="text"
                        placeholder="Name or email"
                        value={applicationFilters.search}
                        onChange={(e) => setApplicationFilters({...applicationFilters, search: e.target.value})}
                        className="w-full pl-10 pr-4 py-3 bg-white dark:bg-surface-800 border border-surface-200 dark:border-surface-700 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">
                      Position
                    </label>
                    <input
                      type="text"
                      placeholder="Job position"
                      value={applicationFilters.position}
                      onChange={(e) => setApplicationFilters({...applicationFilters, position: e.target.value})}
                      className="w-full px-4 py-3 bg-white dark:bg-surface-800 border border-surface-200 dark:border-surface-700 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">
                      Status
                    </label>
                    <select
                      value={applicationFilters.status}
                      onChange={(e) => setApplicationFilters({...applicationFilters, status: e.target.value})}
                      className="w-full px-4 py-3 bg-white dark:bg-surface-800 border border-surface-200 dark:border-surface-700 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                    >
                      <option value="">All Statuses</option>
                      {Object.entries(statusConfig).map(([status, config]) => (
                        <option key={status} value={status}>{config.label}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* Applications List */}
              <div className="space-y-4">
                {filteredApplications.map((application, index) => {
                  const statusInfo = statusConfig[application.status]
                  
                  return (
                    <motion.div
                      key={application.id}
                      className="application-card"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                    >
                      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                        <div className="flex items-start space-x-4 mb-4 lg:mb-0">
                          <div className="w-12 h-12 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-xl flex items-center justify-center text-xl flex-shrink-0">
                            {application.avatar}
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center space-x-3 mb-2">
                              <h3 className="text-lg font-semibold text-surface-900 dark:text-surface-100">
                                {application.candidateName}
                              </h3>
                              <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusInfo.color}`}>
                                {statusInfo.label}
                              </span>
                            </div>
                            <p className="text-primary font-medium mb-1">{application.position}</p>
                            <p className="text-sm text-surface-600 dark:text-surface-400 mb-2">
                              {application.candidateEmail} • Applied {new Date(application.appliedDate).toLocaleDateString()}
                            </p>
                            <div className="flex flex-wrap items-center gap-4 text-xs text-surface-500 dark:text-surface-400">
                              <span>{application.experience} experience</span>
                              <span>{application.location}</span>
                              <span>{application.department}</span>
                              <div className="flex items-center space-x-1">
                                <ApperIcon name="Star" className="h-3 w-3 text-yellow-500" />
                                <span>{application.rating}/5.0</span>
                              </div>
                            </div>
                            <div className="flex flex-wrap gap-1 mt-2">
                              {application.skills.slice(0, 3).map((skill, skillIndex) => (
                                <span key={skillIndex} className="px-2 py-1 bg-surface-100 dark:bg-surface-700 text-xs rounded-md">
                                  {skill}
                                </span>
                              ))}
                              {application.skills.length > 3 && (
                                <span className="text-xs text-surface-500 dark:text-surface-400">
                                  +{application.skills.length - 3} more
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex flex-col sm:flex-row gap-2 lg:ml-4">
                          <div className="relative">
                            <select
                              value={application.status}
                              onChange={(e) => updateApplicationStatus(application.id, e.target.value)}
                              className="px-4 py-2 bg-white dark:bg-surface-800 border border-surface-200 dark:border-surface-700 rounded-xl text-sm focus:ring-2 focus:ring-primary focus:border-transparent transition-all appearance-none pr-8"
                            >
                              {Object.entries(statusConfig).map(([status, config]) => (
                                <option key={status} value={status}>{config.label}</option>
                              ))}
                            </select>
                            <ApperIcon name="ChevronDown" className="absolute right-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-surface-400 pointer-events-none" />
                          </div>
                          <button 
                            onClick={() => toast.info(`Viewing details for ${application.candidateName}`)}
                            className="px-4 py-2 neu-button rounded-xl text-sm font-medium text-surface-700 dark:text-surface-300 hover:text-primary transition-colors"
                          >
                            <ApperIcon name="Eye" className="h-4 w-4 inline mr-1" />
                            View
                          </button>
                          <button 
                            onClick={() => toast.info(`Opening contact for ${application.candidateName}`)}
                            className="px-4 py-2 neu-button rounded-xl text-sm font-medium text-surface-700 dark:text-surface-300 hover:text-primary transition-colors"
                          >
                            <ApperIcon name="MessageSquare" className="h-4 w-4 inline mr-1" />
                            Contact
                          </button>
                        </div>
                      </div>
                      
                      {application.notes && (
                        <div className="mt-4 pt-4 border-t border-surface-200 dark:border-surface-700">
                          <p className="text-sm text-surface-600 dark:text-surface-300">
                            <span className="font-medium">Notes:</span> {application.notes}
                          </p>
                        </div>
                      )}
                    </motion.div>
                  )
                })}

                {filteredApplications.length === 0 && (
                  <div className="text-center py-12">
                    <ApperIcon name="FileText" className="h-16 w-16 text-surface-300 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-surface-900 dark:text-surface-100 mb-2">
                      No applications found
                    </h3>
                    <p className="text-surface-600 dark:text-surface-300">
                      {selectedApplicationTab === 'all' 
                        ? 'No applications match your current filters.' 
                        : `No applications with status "${statusConfig[selectedApplicationTab]?.label || selectedApplicationTab}".`}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
{/* Create Application Modal */}
        {showCreateModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <motion.div 
              className="bg-white dark:bg-surface-800 rounded-2xl p-6 max-w-4xl w-full max-h-[90vh] overflow-y-auto"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-surface-900 dark:text-surface-100">
                  Create New Application
                </h3>
                <button
                  onClick={() => {
                    setShowCreateModal(false)
                    resetCreateForm()
                  }}
                  className="p-2 hover:bg-surface-100 dark:hover:bg-surface-700 rounded-lg transition-colors"
                >
                  <ApperIcon name="X" className="h-6 w-6 text-surface-500" />
                </button>
              </div>

              <form onSubmit={handleCreateSubmit} className="space-y-6">
                {/* Candidate Information */}
                <div className="bg-surface-50 dark:bg-surface-700 rounded-xl p-4">
                  <h4 className="text-lg font-semibold text-surface-900 dark:text-surface-100 mb-4">
                    Candidate Information
                  </h4>
                  
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        value={createFormData.candidateName}
                        onChange={(e) => handleCreateFormChange('candidateName', e.target.value)}
                        className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all ${
                          createFormErrors.candidateName 
                            ? 'border-red-500 bg-red-50 dark:bg-red-900/20' 
                            : 'border-surface-200 dark:border-surface-700 bg-white dark:bg-surface-800'
                        }`}
                        placeholder="Enter candidate's full name"
                      />
                      {createFormErrors.candidateName && (
                        <p className="text-red-500 text-sm mt-1">{createFormErrors.candidateName}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        value={createFormData.candidateEmail}
                        onChange={(e) => handleCreateFormChange('candidateEmail', e.target.value)}
                        className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all ${
                          createFormErrors.candidateEmail 
                            ? 'border-red-500 bg-red-50 dark:bg-red-900/20' 
                            : 'border-surface-200 dark:border-surface-700 bg-white dark:bg-surface-800'
                        }`}
                        placeholder="candidate@email.com"
                      />
                      {createFormErrors.candidateEmail && (
                        <p className="text-red-500 text-sm mt-1">{createFormErrors.candidateEmail}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">
                        Location *
                      </label>
                      <input
                        type="text"
                        value={createFormData.location}
                        onChange={(e) => handleCreateFormChange('location', e.target.value)}
                        className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all ${
                          createFormErrors.location 
                            ? 'border-red-500 bg-red-50 dark:bg-red-900/20' 
                            : 'border-surface-200 dark:border-surface-700 bg-white dark:bg-surface-800'
                        }`}
                        placeholder="City, State/Country"
                      />
                      {createFormErrors.location && (
                        <p className="text-red-500 text-sm mt-1">{createFormErrors.location}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">
                        Experience Level *
                      </label>
                      <select
                        value={createFormData.experience}
                        onChange={(e) => handleCreateFormChange('experience', e.target.value)}
                        className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all ${
                          createFormErrors.experience 
                            ? 'border-red-500 bg-red-50 dark:bg-red-900/20' 
                            : 'border-surface-200 dark:border-surface-700 bg-white dark:bg-surface-800'
                        }`}
                      >
                        <option value="">Select experience level</option>
                        <option value="Entry Level (0-2 years)">Entry Level (0-2 years)</option>
                        <option value="Mid Level (3-5 years)">Mid Level (3-5 years)</option>
                        <option value="Senior Level (6-8 years)">Senior Level (6-8 years)</option>
                        <option value="Lead/Principal (9+ years)">Lead/Principal (9+ years)</option>
                      </select>
                      {createFormErrors.experience && (
                        <p className="text-red-500 text-sm mt-1">{createFormErrors.experience}</p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Job Information */}
                <div className="bg-surface-50 dark:bg-surface-700 rounded-xl p-4">
                  <h4 className="text-lg font-semibold text-surface-900 dark:text-surface-100 mb-4">
                    Job Information
                  </h4>
                  
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">
                        Position *
                      </label>
                      <input
                        type="text"
                        value={createFormData.position}
                        onChange={(e) => handleCreateFormChange('position', e.target.value)}
                        className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all ${
                          createFormErrors.position 
                            ? 'border-red-500 bg-red-50 dark:bg-red-900/20' 
                            : 'border-surface-200 dark:border-surface-700 bg-white dark:bg-surface-800'
                        }`}
                        placeholder="e.g., Senior React Developer"
                      />
                      {createFormErrors.position && (
                        <p className="text-red-500 text-sm mt-1">{createFormErrors.position}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">
                        Company *
                      </label>
                      <input
                        type="text"
                        value={createFormData.company}
                        onChange={(e) => handleCreateFormChange('company', e.target.value)}
                        className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all ${
                          createFormErrors.company 
                            ? 'border-red-500 bg-red-50 dark:bg-red-900/20' 
                            : 'border-surface-200 dark:border-surface-700 bg-white dark:bg-surface-800'
                        }`}
                        placeholder="Company name"
                      />
                      {createFormErrors.company && (
                        <p className="text-red-500 text-sm mt-1">{createFormErrors.company}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">
                        Department *
                      </label>
                      <input
                        type="text"
                        value={createFormData.department}
                        onChange={(e) => handleCreateFormChange('department', e.target.value)}
                        className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all ${
                          createFormErrors.department 
                            ? 'border-red-500 bg-red-50 dark:bg-red-900/20' 
                            : 'border-surface-200 dark:border-surface-700 bg-white dark:bg-surface-800'
                        }`}
                        placeholder="e.g., Engineering, Design, Marketing"
                      />
                      {createFormErrors.department && (
                        <p className="text-red-500 text-sm mt-1">{createFormErrors.department}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">
                        Salary Range
                      </label>
                      <input
                        type="text"
                        value={createFormData.salary}
                        onChange={(e) => handleCreateFormChange('salary', e.target.value)}
                        className="w-full px-4 py-3 border border-surface-200 dark:border-surface-700 bg-white dark:bg-surface-800 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                        placeholder="e.g., $80,000 - $100,000"
                      />
                    </div>
                  </div>
                </div>

                {/* Skills */}
                <div className="bg-surface-50 dark:bg-surface-700 rounded-xl p-4">
                  <h4 className="text-lg font-semibold text-surface-900 dark:text-surface-100 mb-4">
                    Skills
                  </h4>
                  
                  <div className="space-y-4">
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={newSkill}
                        onChange={(e) => setNewSkill(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addSkill())}
                        className="flex-1 px-4 py-2 border border-surface-200 dark:border-surface-700 bg-white dark:bg-surface-800 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                        placeholder="Add a skill (press Enter or click Add)"
                      />
                      <button
                        type="button"
                        onClick={addSkill}
                        className="px-4 py-2 bg-primary text-white rounded-xl hover:bg-primary-dark transition-colors"
                      >
                        Add
                      </button>
                    </div>

                    {createFormData.skills.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {createFormData.skills.map((skill, index) => (
                          <span
                            key={index}
                            className="flex items-center gap-2 px-3 py-1 bg-primary/10 text-primary rounded-full text-sm"
                          >
                            {skill}
                            <button
                              type="button"
                              onClick={() => removeSkill(skill)}
                              className="hover:text-red-500 transition-colors"
                            >
                              <ApperIcon name="X" className="h-3 w-3" />
                            </button>
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Application Settings */}
                <div className="bg-surface-50 dark:bg-surface-700 rounded-xl p-4">
                  <h4 className="text-lg font-semibold text-surface-900 dark:text-surface-100 mb-4">
                    Application Settings
                  </h4>
                  
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">
                        Initial Status
                      </label>
                      <select
                        value={createFormData.status}
                        onChange={(e) => handleCreateFormChange('status', e.target.value)}
                        className="w-full px-4 py-3 border border-surface-200 dark:border-surface-700 bg-white dark:bg-surface-800 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                      >
                        {Object.entries(statusConfig).map(([status, config]) => (
                          <option key={status} value={status}>{config.label}</option>
                        ))}
                      </select>
                    </div>

                    <div className="md:col-span-1">
                      <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">
                        Notes
                      </label>
                      <textarea
                        value={createFormData.notes}
                        onChange={(e) => handleCreateFormChange('notes', e.target.value)}
                        rows={3}
                        className="w-full px-4 py-3 border border-surface-200 dark:border-surface-700 bg-white dark:bg-surface-800 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                        placeholder="Additional notes about the application..."
                      />
                    </div>
                  </div>
                </div>

                {/* Form Actions */}
                <div className="flex gap-4 pt-4 border-t border-surface-200 dark:border-surface-600">
                  <button
                    type="button"
                    onClick={() => {
                      setShowCreateModal(false)
                      resetCreateForm()
                    }}
                    className="flex-1 px-6 py-3 border border-surface-200 dark:border-surface-700 text-surface-700 dark:text-surface-300 rounded-xl font-medium hover:bg-surface-50 dark:hover:bg-surface-700 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 px-6 py-3 bg-gradient-to-r from-primary to-secondary text-white rounded-xl font-medium hover:shadow-lg transition-all duration-300"
                  >
                    Create Application
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
{/* Skill Assessments Tab */}
        {activeTab === 'assessments' && (
          <motion.div
            key="assessments"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {/* Assessment Results View */}
            {showResults && assessmentResults ? (
              <div className="space-y-8">
                <motion.div 
                  className="text-center mb-8"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6 }}
                >
                  <div className={`w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6 ${
                    assessmentResults.passed 
                      ? 'bg-gradient-to-br from-green-400 to-green-600' 
                      : 'bg-gradient-to-br from-red-400 to-red-600'
                  }`}>
                    <ApperIcon 
                      name={assessmentResults.passed ? 'CheckCircle' : 'XCircle'} 
                      className="h-12 w-12 text-white" 
                    />
                  </div>
                  <h1 className="text-4xl font-bold mb-4">
                    Assessment <span className="gradient-text">Complete!</span>
                  </h1>
                  <p className="text-lg text-surface-600 dark:text-surface-300">
                    {selectedAssessment.title}
                  </p>
                </motion.div>

                <motion.div 
                  className="glass-card rounded-2xl p-8 mb-8"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                >
                  <div className="text-center mb-8">
                    <div className="text-6xl font-bold gradient-text mb-2">
                      {assessmentResults.score}%
                    </div>
                    <p className="text-xl text-surface-600 dark:text-surface-300">
                      Your Score
                    </p>
                  </div>

                  <div className="grid md:grid-cols-3 gap-6 mb-8">
                    <div className="text-center p-4 bg-surface-50 dark:bg-surface-800/50 rounded-xl">
                      <div className="text-2xl font-bold text-surface-900 dark:text-surface-100">
                        {assessmentResults.correctAnswers}/{assessmentResults.totalQuestions}
                      </div>
                      <p className="text-surface-600 dark:text-surface-400">Correct Answers</p>
                    </div>
                    <div className="text-center p-4 bg-surface-50 dark:bg-surface-800/50 rounded-xl">
                      <div className="text-2xl font-bold text-surface-900 dark:text-surface-100">
                        {assessmentResults.level}
                      </div>
                      <p className="text-surface-600 dark:text-surface-400">Skill Level</p>
                    </div>
                    <div className="text-center p-4 bg-surface-50 dark:bg-surface-800/50 rounded-xl">
                      <div className={`text-2xl font-bold ${
                        assessmentResults.passed ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {assessmentResults.passed ? 'Passed' : 'Failed'}
                      </div>
                      <p className="text-surface-600 dark:text-surface-400">Result</p>
                    </div>
                  </div>

                  <div className="text-center space-y-4">
                    <p className="text-surface-600 dark:text-surface-300">
                      {assessmentResults.passed 
                        ? 'Congratulations! You have demonstrated proficiency in this skill.' 
                        : 'Keep practicing! Consider reviewing the topics and retaking the assessment.'}
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                      <button
                        onClick={retakeAssessment}
                        className="px-6 py-3 neu-button rounded-xl font-semibold text-surface-700 dark:text-surface-300 hover:text-primary transition-colors"
                      >
                        Take Another Assessment
                      </button>
                      <button
                        onClick={() => {
                          setActiveTab('search')
                          retakeAssessment()
                        }}
                        className="px-6 py-3 bg-gradient-to-r from-primary to-secondary text-white rounded-xl font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-300"
                      >
                        Back to Home
                      </button>
                    </div>
                  </div>
                </motion.div>
              </div>
            ) : selectedAssessment ? (
              /* Quiz Interface */
              <div className="space-y-8">
                <motion.div 
                  className="mb-8"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                >
                  <div className="flex justify-between items-center mb-4">
                    <h1 className="text-2xl font-bold text-surface-900 dark:text-surface-100">
                      {selectedAssessment.title}
                    </h1>
                    <div className="flex items-center space-x-4">
                      {timeRemaining && (
                        <div className="flex items-center space-x-2">
                          <ApperIcon name="Clock" className="h-4 w-4 text-surface-600 dark:text-surface-300" />
                          <span className="font-medium text-surface-700 dark:text-surface-300">
                            {formatTime(timeRemaining)}
                          </span>
                        </div>
                      )}
                      <span className="text-surface-600 dark:text-surface-300">
                        Question {currentQuestion + 1} of {selectedAssessment.questions_data.length}
                      </span>
                    </div>
                  </div>
                  <div className="w-full bg-surface-200 dark:bg-surface-700 rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-primary to-secondary h-2 rounded-full transition-all duration-300"
                      style={{width: `${((currentQuestion + 1) / selectedAssessment.questions_data.length) * 100}%`}}
                    ></div>
                  </div>
                </motion.div>

                <motion.div 
                  className="glass-card rounded-2xl p-8"
                  key={currentQuestion}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6 }}
                >
                  <h2 className="text-xl font-semibold text-surface-900 dark:text-surface-100 mb-6">
                    {selectedAssessment.questions_data[currentQuestion].question}
                  </h2>
                  
                  <div className="space-y-3 mb-8">
                    {selectedAssessment.questions_data[currentQuestion].options.map((option, index) => (
                      <button
                        key={index}
                        onClick={() => selectAnswer(selectedAssessment.questions_data[currentQuestion].id, index)}
                        className={`w-full p-4 text-left rounded-xl border-2 transition-all duration-200 ${
                          answers[selectedAssessment.questions_data[currentQuestion].id] === index
                            ? 'border-primary bg-primary/10 text-primary'
                            : 'border-surface-200 dark:border-surface-700 hover:border-primary hover:bg-primary/5'
                        }`}
                      >
                        <div className="flex items-center space-x-3">
                          <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                            answers[selectedAssessment.questions_data[currentQuestion].id] === index
                              ? 'border-primary bg-primary'
                              : 'border-surface-300 dark:border-surface-600'
                          }`}>
                            {answers[selectedAssessment.questions_data[currentQuestion].id] === index && (
                              <ApperIcon name="Check" className="h-3 w-3 text-white" />
                            )}
                          </div>
                          <span>{option}</span>
                        </div>
                      </button>
                    ))}
                  </div>

                  <div className="flex justify-between">
                    <button
                      onClick={previousQuestion}
                      disabled={currentQuestion === 0}
                      className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                        currentQuestion === 0
                          ? 'bg-surface-200 dark:bg-surface-700 text-surface-400 cursor-not-allowed'
                          : 'neu-button text-surface-700 dark:text-surface-300 hover:text-primary'
                      }`}
                    >
                      Previous
                    </button>
                    
                    <button
                      onClick={nextQuestion}
                      disabled={answers[selectedAssessment.questions_data[currentQuestion].id] === undefined}
                      className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                        answers[selectedAssessment.questions_data[currentQuestion].id] === undefined
                          ? 'bg-surface-200 dark:bg-surface-700 text-surface-400 cursor-not-allowed'
                          : 'bg-gradient-to-r from-primary to-secondary text-white hover:shadow-lg transform hover:scale-105'
                      }`}
                    >
                      {currentQuestion === selectedAssessment.questions_data.length - 1 ? 'Finish' : 'Next'}
                    </button>
                  </div>
                </motion.div>
              </div>
            ) : (
              /* Assessment Selection Grid */
              <div className="space-y-8">
                <motion.div 
                  className="text-center mb-8"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                >
                  <h1 className="text-4xl font-bold mb-4">
                    Skill <span className="gradient-text">Assessment</span>
                  </h1>
                  <p className="text-lg text-surface-600 dark:text-surface-300 max-w-2xl mx-auto">
                    Test your skills and get certified. Showcase your expertise to potential employers.
                  </p>
                </motion.div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {assessments.map((assessment, index) => (
                    <motion.div
                      key={assessment.id}
                      className="assessment-card"
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                    >
                      <div className="text-center mb-4">
                        <div className="text-4xl mb-3">{assessment.icon}</div>
                        <h3 className="text-xl font-semibold text-surface-900 dark:text-surface-100 mb-2">
                          {assessment.title}
                        </h3>
                        <p className="text-surface-600 dark:text-surface-300 text-sm mb-4">
                          {assessment.description}
                        </p>
                      </div>
                      
                      <div className="space-y-3 mb-6">
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-surface-600 dark:text-surface-400">Duration:</span>
                          <span className="text-sm font-medium text-surface-900 dark:text-surface-100">
                            {assessment.duration} minutes
                          </span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-surface-600 dark:text-surface-400">Questions:</span>
                          <span className="text-sm font-medium text-surface-900 dark:text-surface-100">
                            {assessment.questions}
                          </span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-surface-600 dark:text-surface-400">Difficulty:</span>
                          <span className={`text-sm font-medium px-2 py-1 rounded-full ${
                            assessment.difficulty === 'Beginner' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' :
                            assessment.difficulty === 'Intermediate' ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400' :
                            'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
                          }`}>
                            {assessment.difficulty}
                          </span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-surface-600 dark:text-surface-400">Category:</span>
                          <span className="text-sm font-medium text-primary">
                            {assessment.category}
                          </span>
                        </div>
                      </div>
                      
                      <button
                        onClick={() => startAssessment(assessment)}
                        disabled={assessment.questions_data.length === 0}
                        className={`w-full py-3 rounded-xl font-semibold transition-all duration-300 ${
                          assessment.questions_data.length === 0
                            ? 'bg-surface-200 dark:bg-surface-700 text-surface-400 cursor-not-allowed'
                            : 'bg-gradient-to-r from-primary to-secondary text-white hover:shadow-lg transform hover:scale-105'
                        }`}
                      >
                        {assessment.questions_data.length === 0 ? 'Coming Soon' : 'Start Assessment'}
                      </button>
                    </motion.div>
                  ))}
                </div>

                <motion.div 
                  className="mt-16 glass-card rounded-2xl p-8"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                >
                  <h2 className="text-2xl font-bold text-center text-surface-900 dark:text-surface-100 mb-8">
                    Why Take Skill Assessments?
                  </h2>
                  <div className="grid md:grid-cols-3 gap-6">
                    {[
                      {
                        icon: 'Award',
                        title: 'Get Certified',
                        description: 'Earn certificates that validate your skills and expertise'
                      },
                      {
                        icon: 'TrendingUp',
                        title: 'Stand Out',
                        description: 'Differentiate yourself from other candidates with verified skills'
                      },
                      {
                        icon: 'Target',
                        title: 'Better Matches',
                        description: 'Get matched with jobs that truly fit your skill level'
                      }
                    ].map((benefit, index) => (
                      <div key={index} className="text-center">
                        <div className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center mx-auto mb-4">
                          <ApperIcon name={benefit.icon} className="h-6 w-6 text-white" />
                        </div>
                        <h3 className="text-lg font-semibold text-surface-900 dark:text-surface-100 mb-2">
                          {benefit.title}
                        </h3>
                        <p className="text-surface-600 dark:text-surface-300">
                          {benefit.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </motion.div>
              </div>
            )}
          </motion.div>
        )}
{/* Profile Tab */}
        {activeTab === 'profile' && (
          <motion.div
            key="profile"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <div className="space-y-8">
              {/* Profile Header */}
              <div className="glass-card rounded-2xl p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-2xl font-bold text-surface-900 dark:text-surface-100">
                    My Profile
                  </h3>
                  <button
                    onClick={() => setIsEditingProfile(!isEditingProfile)}
                    className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                      isEditingProfile
                        ? 'bg-surface-200 dark:bg-surface-700 text-surface-700 dark:text-surface-300'
                        : 'bg-gradient-to-r from-primary to-secondary text-white hover:shadow-lg'
                    }`}
                  >
                    <ApperIcon name={isEditingProfile ? 'X' : 'Edit'} className="h-5 w-5" />
                    {isEditingProfile ? 'Cancel' : 'Edit Profile'}
                  </button>
                </div>

                {/* Profile Completion */}
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-surface-700 dark:text-surface-300">
                      Profile Completion
                    </span>
                    <span className="text-sm text-surface-600 dark:text-surface-400">
                      {completionPercentage}%
                    </span>
                  </div>
                  <div className="w-full bg-surface-200 dark:bg-surface-700 rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-primary to-secondary h-2 rounded-full transition-all duration-300"
                      style={{ width: `${completionPercentage}%` }}
                    />
                  </div>
                </div>

                {/* Profile Form/Display */}
                {isEditingProfile ? (
                  <form onSubmit={handleProfileSubmit} className="space-y-6">
                    {/* Personal Information */}
                    <div className="bg-surface-50 dark:bg-surface-700 rounded-xl p-4">
                      <h4 className="text-lg font-semibold text-surface-900 dark:text-surface-100 mb-4">
                        Personal Information
                      </h4>
                      
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">
                            First Name *
                          </label>
                          <input
                            type="text"
                            value={profileFormData.firstName}
                            onChange={(e) => handleProfileFormChange('firstName', e.target.value)}
                            className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all ${
                              profileFormErrors.firstName 
                                ? 'border-red-500 bg-red-50 dark:bg-red-900/20' 
                                : 'border-surface-200 dark:border-surface-700 bg-white dark:bg-surface-800'
                            }`}
                            placeholder="Enter your first name"
                          />
                          {profileFormErrors.firstName && (
                            <p className="text-red-500 text-sm mt-1">{profileFormErrors.firstName}</p>
                          )}
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">
                            Last Name *
                          </label>
                          <input
                            type="text"
                            value={profileFormData.lastName}
                            onChange={(e) => handleProfileFormChange('lastName', e.target.value)}
                            className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all ${
                              profileFormErrors.lastName 
                                ? 'border-red-500 bg-red-50 dark:bg-red-900/20' 
                                : 'border-surface-200 dark:border-surface-700 bg-white dark:bg-surface-800'
                            }`}
                            placeholder="Enter your last name"
                          />
                          {profileFormErrors.lastName && (
                            <p className="text-red-500 text-sm mt-1">{profileFormErrors.lastName}</p>
                          )}
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">
                            Email Address *
                          </label>
                          <input
                            type="email"
                            value={profileFormData.email}
                            onChange={(e) => handleProfileFormChange('email', e.target.value)}
                            className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all ${
                              profileFormErrors.email 
                                ? 'border-red-500 bg-red-50 dark:bg-red-900/20' 
                                : 'border-surface-200 dark:border-surface-700 bg-white dark:bg-surface-800'
                            }`}
                            placeholder="your.email@example.com"
                          />
                          {profileFormErrors.email && (
                            <p className="text-red-500 text-sm mt-1">{profileFormErrors.email}</p>
                          )}
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">
                            Phone Number *
                          </label>
                          <input
                            type="tel"
                            value={profileFormData.phone}
                            onChange={(e) => handleProfileFormChange('phone', e.target.value)}
                            className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all ${
                              profileFormErrors.phone 
                                ? 'border-red-500 bg-red-50 dark:bg-red-900/20' 
                                : 'border-surface-200 dark:border-surface-700 bg-white dark:bg-surface-800'
                            }`}
                            placeholder="+1 (555) 123-4567"
                          />
                          {profileFormErrors.phone && (
                            <p className="text-red-500 text-sm mt-1">{profileFormErrors.phone}</p>
                          )}
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">
                            Location *
                          </label>
                          <input
                            type="text"
                            value={profileFormData.location}
                            onChange={(e) => handleProfileFormChange('location', e.target.value)}
                            className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all ${
                              profileFormErrors.location 
                                ? 'border-red-500 bg-red-50 dark:bg-red-900/20' 
                                : 'border-surface-200 dark:border-surface-700 bg-white dark:bg-surface-800'
                            }`}
                            placeholder="City, State/Country"
                          />
                          {profileFormErrors.location && (
                            <p className="text-red-500 text-sm mt-1">{profileFormErrors.location}</p>
                          )}
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">
                            Current Role
                          </label>
                          <input
                            type="text"
                            value={profileFormData.currentRole}
                            onChange={(e) => handleProfileFormChange('currentRole', e.target.value)}
                            className="w-full px-4 py-3 border border-surface-200 dark:border-surface-700 bg-white dark:bg-surface-800 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                            placeholder="e.g., Senior React Developer"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">
                            Experience Level
                          </label>
                          <select
                            value={profileFormData.experienceLevel}
                            onChange={(e) => handleProfileFormChange('experienceLevel', e.target.value)}
                            className="w-full px-4 py-3 border border-surface-200 dark:border-surface-700 bg-white dark:bg-surface-800 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                          >
                            <option value="">Select experience level</option>
                            <option value="Entry Level (0-2 years)">Entry Level (0-2 years)</option>
                            <option value="Mid Level (3-5 years)">Mid Level (3-5 years)</option>
                            <option value="Senior Level (6-8 years)">Senior Level (6-8 years)</option>
                            <option value="Lead/Principal (9+ years)">Lead/Principal (9+ years)</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">
                            Preferred Job Type
                          </label>
                          <select
                            value={profileFormData.preferredJobType}
                            onChange={(e) => handleProfileFormChange('preferredJobType', e.target.value)}
                            className="w-full px-4 py-3 border border-surface-200 dark:border-surface-700 bg-white dark:bg-surface-800 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                          >
                            <option value="">Select job type</option>
                            <option value="Full-time">Full-time</option>
                            <option value="Part-time">Part-time</option>
                            <option value="Contract">Contract</option>
                            <option value="Freelance">Freelance</option>
                            <option value="Remote">Remote</option>
                            <option value="Hybrid">Hybrid</option>
                          </select>
                        </div>
                      </div>

                      <div className="mt-4">
                        <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">
                          About Me
                        </label>
                        <textarea
                          value={profileFormData.about}
                          onChange={(e) => handleProfileFormChange('about', e.target.value)}
                          rows={4}
                          className="w-full px-4 py-3 border border-surface-200 dark:border-surface-700 bg-white dark:bg-surface-800 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                          placeholder="Tell us about yourself, your experience, and what you're passionate about..."
                        />
                      </div>
                    </div>

                    {/* Skills Section */}
                    <div className="bg-surface-50 dark:bg-surface-700 rounded-xl p-4">
                      <h4 className="text-lg font-semibold text-surface-900 dark:text-surface-100 mb-4">
                        Skills
                      </h4>
                      
                      <div className="space-y-4">
                        <div className="flex gap-2">
                          <input
                            type="text"
                            value={newProfileSkill}
                            onChange={(e) => setNewProfileSkill(e.target.value)}
                            onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addProfileSkill())}
                            className="flex-1 px-4 py-2 border border-surface-200 dark:border-surface-700 bg-white dark:bg-surface-800 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                            placeholder="Add a skill (press Enter or click Add)"
                          />
                          <button
                            type="button"
                            onClick={addProfileSkill}
                            className="px-4 py-2 bg-primary text-white rounded-xl hover:bg-primary-dark transition-colors"
                          >
                            Add
                          </button>
                        </div>

                        {profileFormData.skills.length > 0 && (
                          <div className="flex flex-wrap gap-2">
                            {profileFormData.skills.map((skill, index) => (
                              <span
                                key={index}
                                className="flex items-center gap-2 px-3 py-1 bg-primary/10 text-primary rounded-full text-sm"
                              >
                                {skill}
                                <button
                                  type="button"
                                  onClick={() => removeProfileSkill(skill)}
                                  className="hover:text-red-500 transition-colors"
                                >
                                  <ApperIcon name="X" className="h-3 w-3" />
                                </button>
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Form Actions */}
                    <div className="flex gap-4 pt-4 border-t border-surface-200 dark:border-surface-600">
                      <button
                        type="button"
                        onClick={() => setIsEditingProfile(false)}
                        className="flex-1 px-6 py-3 border border-surface-200 dark:border-surface-700 text-surface-700 dark:text-surface-300 rounded-xl font-medium hover:bg-surface-50 dark:hover:bg-surface-700 transition-colors"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="flex-1 px-6 py-3 bg-gradient-to-r from-primary to-secondary text-white rounded-xl font-medium hover:shadow-lg transition-all duration-300"
                      >
                        Save Changes
                      </button>
                    </div>
                  </form>
                ) : (
                  /* Profile Display */
                  <div className="space-y-6">
                    {/* Personal Information Display */}
                    <div className="bg-surface-50 dark:bg-surface-700 rounded-xl p-4">
                      <h4 className="text-lg font-semibold text-surface-900 dark:text-surface-100 mb-4">
                        Personal Information
                      </h4>
                      
                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-medium text-surface-600 dark:text-surface-400 mb-1">
                            Full Name
                          </label>
                          <p className="text-lg font-medium text-surface-900 dark:text-surface-100">
                            {profileFormData.firstName} {profileFormData.lastName}
                          </p>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-surface-600 dark:text-surface-400 mb-1">
                            Email
                          </label>
                          <p className="text-lg text-surface-900 dark:text-surface-100">
                            {profileFormData.email}
                          </p>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-surface-600 dark:text-surface-400 mb-1">
                            Phone
                          </label>
                          <p className="text-lg text-surface-900 dark:text-surface-100">
                            {profileFormData.phone}
                          </p>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-surface-600 dark:text-surface-400 mb-1">
                            Location
                          </label>
                          <p className="text-lg text-surface-900 dark:text-surface-100">
                            {profileFormData.location}
                          </p>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-surface-600 dark:text-surface-400 mb-1">
                            Current Role
                          </label>
                          <p className="text-lg text-surface-900 dark:text-surface-100">
                            {profileFormData.currentRole || 'Not specified'}
                          </p>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-surface-600 dark:text-surface-400 mb-1">
                            Experience Level
                          </label>
                          <p className="text-lg text-surface-900 dark:text-surface-100">
                            {profileFormData.experienceLevel || 'Not specified'}
                          </p>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-surface-600 dark:text-surface-400 mb-1">
                            Preferred Job Type
                          </label>
                          <p className="text-lg text-surface-900 dark:text-surface-100">
                            {profileFormData.preferredJobType || 'Not specified'}
                          </p>
                        </div>
                      </div>

                      {profileFormData.about && (
                        <div className="mt-6">
                          <label className="block text-sm font-medium text-surface-600 dark:text-surface-400 mb-2">
                            About Me
                          </label>
                          <p className="text-surface-900 dark:text-surface-100 leading-relaxed">
                            {profileFormData.about}
                          </p>
                        </div>
                      )}
                    </div>

                    {/* Skills Display */}
                    {profileFormData.skills.length > 0 && (
                      <div className="bg-surface-50 dark:bg-surface-700 rounded-xl p-4">
                        <h4 className="text-lg font-semibold text-surface-900 dark:text-surface-100 mb-4">
                          Skills
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {profileFormData.skills.map((skill, index) => (
                            <span
                              key={index}
                              className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Documents Section */}
              <div className="glass-card rounded-2xl p-6">
                <div className="flex items-center justify-between mb-6">
                  <h4 className="text-xl font-semibold text-surface-900 dark:text-surface-100">
                    Documents
                  </h4>
                  <button
                    onClick={handleDocumentUpload}
                    className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-xl font-medium hover:bg-primary-dark transition-colors"
                  >
                    <ApperIcon name="Upload" className="h-4 w-4" />
                    Upload Document
                  </button>
                </div>

                {profileFormData.documents.length > 0 ? (
                  <div className="grid gap-4">
                    {profileFormData.documents.map((document) => (
                      <motion.div
                        key={document.id}
                        className="flex items-center justify-between p-4 bg-surface-50 dark:bg-surface-700 rounded-xl"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-red-100 dark:bg-red-900/30 rounded-lg flex items-center justify-center">
                            <ApperIcon name="FileText" className="h-5 w-5 text-red-600 dark:text-red-400" />
                          </div>
                          <div>
                            <p className="font-medium text-surface-900 dark:text-surface-100">
                              {document.name}
                            </p>
                            <p className="text-sm text-surface-600 dark:text-surface-400">
                              {document.type} • {document.size} • Uploaded {new Date(document.uploadDate).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => toast.info(`Downloading ${document.name}`)}
                            className="p-2 text-surface-600 dark:text-surface-400 hover:text-primary transition-colors"
                            title="Download"
                          >
                            <ApperIcon name="Download" className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => removeDocument(document.id)}
                            className="p-2 text-surface-600 dark:text-surface-400 hover:text-red-500 transition-colors"
                            title="Delete"
                          >
                            <ApperIcon name="Trash2" className="h-4 w-4" />
                          </button>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <ApperIcon name="FileText" className="h-12 w-12 text-surface-300 mx-auto mb-3" />
                    <p className="text-surface-600 dark:text-surface-400">
                      No documents uploaded yet. Upload your resume and other relevant documents.
                    </p>
                  </div>
                )}
              </div>

              {/* Skill Assessments Section */}
              <div className="glass-card rounded-2xl p-6">
                <div className="flex items-center justify-between mb-6">
                  <h4 className="text-xl font-semibold text-surface-900 dark:text-surface-100">
                    Skill Assessments
                  </h4>
                  <button
                    onClick={() => setActiveTab('assessments')}
                    className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-xl font-medium hover:bg-primary-dark transition-colors"
                  >
                    <ApperIcon name="Award" className="h-4 w-4" />
                    Take Assessment
                  </button>
                </div>

                {profileFormData.skillAssessments.length > 0 ? (
                  <div className="grid gap-4">
                    {profileFormData.skillAssessments.map((assessment) => (
                      <motion.div
                        key={assessment.id}
                        className="flex items-center justify-between p-4 bg-surface-50 dark:bg-surface-700 rounded-xl"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                      >
                        <div className="flex items-center gap-3">
                          <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                            assessment.level === 'Expert' ? 'bg-green-100 dark:bg-green-900/30' :
                            assessment.level === 'Advanced' ? 'bg-blue-100 dark:bg-blue-900/30' :
                            assessment.level === 'Intermediate' ? 'bg-yellow-100 dark:bg-yellow-900/30' :
                            'bg-surface-200 dark:bg-surface-600'
                          }`}>
                            <ApperIcon name="Award" className={`h-5 w-5 ${
                              assessment.level === 'Expert' ? 'text-green-600 dark:text-green-400' :
                              assessment.level === 'Advanced' ? 'text-blue-600 dark:text-blue-400' :
                              assessment.level === 'Intermediate' ? 'text-yellow-600 dark:text-yellow-400' :
                              'text-surface-500'
                            }`} />
                          </div>
                          <div>
                            <p className="font-medium text-surface-900 dark:text-surface-100">
                              {assessment.skill}
                            </p>
                            <p className="text-sm text-surface-600 dark:text-surface-400">
                              Score: {assessment.score}% • Level: {assessment.level} • Completed {new Date(assessment.completedDate).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                          assessment.level === 'Expert' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' :
                          assessment.level === 'Advanced' ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400' :
                          assessment.level === 'Intermediate' ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400' :
                          'bg-surface-100 text-surface-700 dark:bg-surface-700 dark:text-surface-300'
                        }`}>
                          {assessment.level}
                        </span>
                      </motion.div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <ApperIcon name="Award" className="h-12 w-12 text-surface-300 mx-auto mb-3" />
                    <p className="text-surface-600 dark:text-surface-400">
                      No skill assessments completed yet. Take assessments to showcase your skills.
                    </p>
                  </div>
                )}
              </div>

              {/* Certificates Section */}
              <div className="glass-card rounded-2xl p-6">
                <h4 className="text-xl font-semibold text-surface-900 dark:text-surface-100 mb-6">
                  Certificates
                </h4>

                {profileFormData.certificates.length > 0 ? (
                  <div className="grid gap-4">
                    {profileFormData.certificates.map((certificate) => (
                      <motion.div
                        key={certificate.id}
                        className="flex items-center justify-between p-4 bg-surface-50 dark:bg-surface-700 rounded-xl"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-yellow-100 dark:bg-yellow-900/30 rounded-lg flex items-center justify-center">
                            <ApperIcon name="Award" className="h-5 w-5 text-yellow-600 dark:text-yellow-400" />
                          </div>
                          <div>
                            <p className="font-medium text-surface-900 dark:text-surface-100">
                              {certificate.name}
                            </p>
                            <p className="text-sm text-surface-600 dark:text-surface-400">
                              Issued by {certificate.issuer} • {new Date(certificate.issueDate).toLocaleDateString()}
                              {certificate.expiryDate && ` • Expires ${new Date(certificate.expiryDate).toLocaleDateString()}`}
                            </p>
                          </div>
                        </div>
                        <button
                          onClick={() => toast.info(`Viewing certificate: ${certificate.name}`)}
                          className="text-primary hover:text-primary-dark transition-colors"
                        >
                          <ApperIcon name="ExternalLink" className="h-4 w-4" />
                        </button>
                      </motion.div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <ApperIcon name="Award" className="h-12 w-12 text-surface-300 mx-auto mb-3" />
                    <p className="text-surface-600 dark:text-surface-400">
                      No certificates added yet. Add your professional certifications and achievements.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default MainFeature