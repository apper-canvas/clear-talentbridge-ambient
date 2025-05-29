import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { toast } from 'react-toastify'
import ApperIcon from './ApperIcon'

const MainFeature = () => {
  const [activeTab, setActiveTab] = useState('search')
  const [searchQuery, setSearchQuery] = useState('')
  const [location, setLocation] = useState('')
  const [jobType, setJobType] = useState('')
  const [salaryRange, setSalaryRange] = useState('')
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

  const [newSkill, setNewSkill] = useState('')
  const [dragActive, setDragActive] = useState(false)
  
  // Skill Assessment State
  const [selectedAssessment, setSelectedAssessment] = useState(null)
  const [currentQuiz, setCurrentQuiz] = useState(null)
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [selectedAnswers, setSelectedAnswers] = useState({})
  const [quizResults, setQuizResults] = useState(null)
  const [showQuizResults, setShowQuizResults] = useState(false)
  const [timeRemaining, setTimeRemaining] = useState(0)
  const [quizTimer, setQuizTimer] = useState(null)
  // Cover Letter State
  const [showCoverLetterModal, setShowCoverLetterModal] = useState(false)
  const [coverLetterType, setCoverLetterType] = useState('write') // 'write' or 'upload'
  const [coverLetterText, setCoverLetterText] = useState('')
  const [coverLetterFile, setCoverLetterFile] = useState(null)
  const [applicationJobId, setApplicationJobId] = useState(null)




  const [selectedJob, setSelectedJob] = useState(null)

  const [applications, setApplications] = useState([])
  const [newJob, setNewJob] = useState({
    title: '',
    company: '',
    location: '',
    type: '',
    salary: '',
    description: ''
  })

  // Extended job data with descriptions, requirements, and benefits

  // Mock job data
  const mockJobs = [
    {
      id: 1,
      title: 'Senior React Developer',
      company: 'TechCorp Inc.',
      location: 'San Francisco, CA',
      type: 'Full-time',
      salary: '$120K - $160K',
      skills: ['React', 'TypeScript', 'Node.js', 'GraphQL'],
      postedAt: '2 days ago',
      logo: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=100&h=100&fit=crop&crop=face',
      description: 'We are looking for a Senior React Developer to join our dynamic team. You will be responsible for developing and maintaining high-quality web applications using modern React ecosystem. This role involves collaborating with cross-functional teams to deliver exceptional user experiences.',
      requirements: [
        '5+ years of experience with React and JavaScript',
        'Strong knowledge of TypeScript and modern ES6+',
        'Experience with state management (Redux, Context API)',
        'Familiarity with testing frameworks (Jest, React Testing Library)',
        'Knowledge of Node.js and RESTful APIs',
        'Experience with Git and agile development practices'
      ],
      benefits: [
        'Competitive salary and equity package',
        'Health, dental, and vision insurance',
        'Flexible work hours and remote work options',
        'Professional development budget',
        'Free snacks and catered meals',
        '401(k) matching'
      ],
      companyInfo: {
        size: '100-500 employees',
        industry: 'Technology',
        founded: '2015',
        website: 'https://techcorp.com'
      }
    },
    {
      id: 2,
      title: 'UX/UI Designer',
      company: 'Design Studio',
      location: 'New York, NY',
      type: 'Full-time',
      salary: '$90K - $120K',
      skills: ['Figma', 'Adobe Creative Suite', 'Prototyping', 'User Research'],
      postedAt: '1 week ago',
      logo: 'https://images.unsplash.com/photo-1553028826-f4804151e596?w=100&h=100&fit=crop&crop=face',
      description: 'Join our creative team as a UX/UI Designer and help shape the future of digital experiences. You will work on diverse projects ranging from mobile apps to web platforms, conducting user research and creating intuitive designs that delight our users.',
      requirements: [
        '3+ years of experience in UX/UI design',
        'Proficiency in Figma and Adobe Creative Suite',
        'Strong portfolio showcasing design process',
        'Experience with user research and usability testing',
        'Knowledge of responsive design principles',
        'Understanding of front-end development basics'
      ],
      benefits: [
        'Creative and collaborative work environment',
        'Health and wellness programs',
        'Flexible PTO policy',
        'Design tools and software budget',
        'Conference and workshop attendance',
        'Team retreats and social events'
      ],
      companyInfo: {
        size: '50-100 employees',
        industry: 'Design & Creative',
        founded: '2012',
        website: 'https://designstudio.com'
      }
    },
    {
      id: 3,
      title: 'Product Manager',
      company: 'Innovation Labs',
      location: 'Austin, TX',
      type: 'Full-time',
      salary: '$110K - $140K',
      skills: ['Product Strategy', 'Agile', 'Analytics', 'Leadership'],
      postedAt: '3 days ago',
      logo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
      description: 'Lead product development initiatives as a Product Manager at Innovation Labs. You will drive product strategy, work closely with engineering and design teams, and ensure we build products that meet market needs and business objectives.',
      requirements: [
        '4+ years of product management experience',
        'Strong analytical and problem-solving skills',
        'Experience with agile development methodologies',
        'Knowledge of product analytics tools',
        'Excellent communication and leadership skills',
        'Technical background preferred'
      ],
      benefits: [
        'Stock options and performance bonuses',
        'Comprehensive healthcare coverage',
        'Unlimited vacation policy',
        'Learning and development stipend',
        'Modern office space and equipment',
        'Startup culture with growth opportunities'
      ],
      companyInfo: {
        size: '25-50 employees',
        industry: 'Technology Startup',
        founded: '2019',
        website: 'https://innovationlabs.com'
      }
    },
    {
      id: 4,
      title: 'Data Scientist',
      company: 'AI Dynamics',
      location: 'Seattle, WA',
      type: 'Full-time',
      salary: '$130K - $170K',
      skills: ['Python', 'Machine Learning', 'SQL', 'TensorFlow'],
      postedAt: '5 days ago',
      logo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
      description: 'Join our AI team as a Data Scientist and work on cutting-edge machine learning projects. You will analyze large datasets, build predictive models, and help drive data-driven decision making across the organization.',
      requirements: [
        'PhD or Masters in Data Science, Statistics, or related field',
        'Strong programming skills in Python and R',
        'Experience with machine learning frameworks',
        'Knowledge of SQL and database systems',
        'Statistical analysis and modeling expertise',
        'Experience with cloud platforms (AWS, GCP, Azure)'
      ],
      benefits: [
        'Highly competitive compensation package',
        'Research and conference budget',
        'Flexible work arrangements',
        'Health and wellness benefits',
        'Equity participation',
        'Cutting-edge technology stack'
      ],
      companyInfo: {
        size: '200-500 employees',
        industry: 'Artificial Intelligence',
        founded: '2017',
        website: 'https://aidynamics.com'
      }
    }
  ]

  // Skill Assessment Data
  const skillAssessments = [



    {
      id: 'ux-design-principles',
      title: 'UX Design Principles',
      skill: 'UX Design',
      difficulty: 'Intermediate',
      duration: 35,
      passingScore: 70,
      description: 'Fundamental UX design principles and best practices.',
      questions: [
        {
          id: 1,
          question: 'What is the primary goal of user experience design?',
          options: [
            'Make the interface look beautiful',
            'Create meaningful and relevant experiences for users',
            'Add as many features as possible',
            'Follow the latest design trends'
          ],
          correctAnswer: 1,
          explanation: 'UX design focuses on creating meaningful, relevant, and usable experiences for users.'
        },
        {
          id: 2,
          question: 'What is a user persona?',
          options: [
            'A real user of the product',
            'A fictional character representing user segments',
            'A design pattern',
            'A testing methodology'
          ],
          correctAnswer: 1,
          explanation: 'A user persona is a fictional character that represents a segment of your target audience.'
        },
        {
          id: 3,
          question: 'What is the difference between UX and UI design?',
          options: [
            'UX is visual design, UI is interaction design',
            'UX focuses on user experience, UI focuses on visual interface',
            'UX is for web, UI is for mobile',
            'There is no difference'
          ],
          correctAnswer: 1,
          explanation: 'UX design focuses on the overall user experience and journey, while UI design focuses on the visual and interactive elements of the interface.'
        },
        {
          id: 4,
          question: 'What is a wireframe in UX design?',
          options: [
            'A high-fidelity prototype',
            'A low-fidelity structural blueprint',
            'A color scheme guide',
            'A user research method'
          ],
          correctAnswer: 1,
          explanation: 'A wireframe is a low-fidelity structural blueprint that shows the basic layout and hierarchy of a page or screen.'
        },
        {
          id: 5,
          question: 'What is user journey mapping?',
          options: [
            'Creating navigation menus',
            'Visualizing the user\'s experience over time',
            'Designing page layouts',
            'Testing user interfaces'
          ],
          correctAnswer: 1,
          explanation: 'User journey mapping visualizes the process that a user goes through to accomplish a goal with your product or service.'
        },
        {
          id: 6,
          question: 'What is accessibility in UX design?',
          options: [
            'Making designs look modern',
            'Ensuring products are usable by people with disabilities',
            'Creating mobile-friendly designs',
            'Using popular design trends'
          ],
          correctAnswer: 1,
          explanation: 'Accessibility ensures that products and services are usable by people with various abilities and disabilities.'
        },
        {
          id: 7,
          question: 'What is A/B testing in UX?',
          options: [
            'Testing two different user groups',
            'Comparing two versions of a design',
            'Testing on different devices',
            'Testing accessibility features'
          ],
          correctAnswer: 1,
          explanation: 'A/B testing compares two versions of a design to determine which performs better based on user behavior and metrics.'
        },
        {
          id: 8,
          question: 'What is a design system?',
          options: [
            'A software for designing',
            'A collection of reusable components and guidelines',
            'A design methodology',
            'A type of prototype'
          ],
          correctAnswer: 1,
          explanation: 'A design system is a collection of reusable components, patterns, and guidelines that ensure consistency across products.'
        },
        {
          id: 9,
          question: 'What is usability testing?',
          options: [
            'Testing if designs look good',
            'Observing users interact with a product',
            'Testing code functionality',
            'Testing loading speeds'
          ],
          correctAnswer: 1,
          explanation: 'Usability testing involves observing real users as they attempt to complete tasks with a product to identify usability issues.'
        },
        {
          id: 10,
          question: 'What is information architecture in UX?',
          options: [
            'The visual design of interfaces',
            'The structural design of shared information environments',
            'The coding structure of websites',
            'The hardware architecture'
          ],
          correctAnswer: 1,
          explanation: 'Information architecture involves organizing and structuring content in a way that helps users find information and complete tasks.'
        },
      ]
    }
  ]



  const [filteredJobs, setFilteredJobs] = useState(mockJobs)

  // Enhanced job search with skill assessment integration
  const getSkillMatchScore = (jobSkills, userProfile) => {
    if (!jobSkills || !userProfile.skills) return 0
    
    let totalScore = 0
    let verifiedSkills = 0
    
    jobSkills.forEach(skill => {
      if (userProfile.skills.includes(skill)) {
        // Check if skill is verified through assessment
        const certificate = userProfile.certificates.find(cert => 
          cert.skill.toLowerCase() === skill.toLowerCase()
        )
        
        if (certificate) {
          // Verified skill gets higher score based on proficiency
          const proficiencyMultiplier = {
            'Expert': 1.0,
            'Advanced': 0.9,
            'Intermediate': 0.8,
            'Beginner': 0.7
          }
          totalScore += (proficiencyMultiplier[certificate.proficiencyLevel] || 0.7)
          verifiedSkills++
        } else {
          // Unverified skill gets lower score
          totalScore += 0.5
        }
      }
    })
    
    return {
      score: totalScore / jobSkills.length,
      verifiedSkills,
      totalSkills: jobSkills.length
    }
  }


  const handleSearch = () => {
    let filtered = mockJobs

    if (searchQuery) {
      filtered = filtered.filter(job => 
        job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.skills.some(skill => skill.toLowerCase().includes(searchQuery.toLowerCase()))
      )
    }

    if (location) {
      filtered = filtered.filter(job => 
        job.location.toLowerCase().includes(location.toLowerCase())
      )
    }

    if (jobType) {
      filtered = filtered.filter(job => job.type === jobType)
    }

    // Enhanced sorting with skill assessment scores
    if (profile.skills.length > 0 || profile.certificates.length > 0) {
      filtered = filtered.map(job => {
        const matchData = getSkillMatchScore(job.skills, profile)
        return {
          ...job,
          skillMatchScore: matchData.score,
          verifiedSkillsCount: matchData.verifiedSkills,
          skillMatchPercentage: Math.round(matchData.score * 100)
        }
      })
      
      // Sort by skill match score (verified skills first)
      filtered.sort((a, b) => {
        if (b.skillMatchScore !== a.skillMatchScore) {
          return b.skillMatchScore - a.skillMatchScore
        }
        return b.verifiedSkillsCount - a.verifiedSkillsCount
      })
    }

    setFilteredJobs(filtered)
    toast.success(`Found ${filtered.length} job${filtered.length !== 1 ? 's' : ''} matching your criteria`)
  }


  const handleApply = (jobId) => {
    setApplicationJobId(jobId)
    setShowCoverLetterModal(true)
    setCoverLetterText('')
    setCoverLetterFile(null)
    setCoverLetterType('write')
  }

  const submitApplication = () => {
    const job = mockJobs.find(j => j.id === applicationJobId)
    const existingApplication = applications.find(app => app.jobId === applicationJobId)
    
    if (existingApplication) {
      toast.info('You have already applied for this position')
      setShowCoverLetterModal(false)
      return
    }

    // Validate cover letter if provided
    if (coverLetterType === 'write' && coverLetterText.trim() && coverLetterText.trim().length < 50) {
      toast.error('Cover letter must be at least 50 characters long')
      return
    }

    if (coverLetterType === 'upload' && coverLetterFile && coverLetterFile.size > 5 * 1024 * 1024) {
      toast.error('Cover letter file must be less than 5MB')
      return
    }

    const newApplication = {
      id: Date.now(),
      jobId: applicationJobId,
      jobTitle: job.title,
      company: job.company,
      status: 'pending',
      appliedAt: new Date().toLocaleDateString(),
      coverLetter: {
        type: coverLetterType,
        content: coverLetterType === 'write' ? coverLetterText.trim() : null,
        file: coverLetterType === 'upload' ? {
          name: coverLetterFile?.name,
          size: coverLetterFile?.size,
          url: coverLetterFile ? URL.createObjectURL(coverLetterFile) : null
        } : null
      },
      statusHistory: [
        {
          status: 'pending',
          date: new Date().toLocaleDateString(),
          note: 'Application submitted'
        }
      ]
    }

    setApplications([...applications, newApplication])
    setShowCoverLetterModal(false)
    
    const coverLetterMsg = (coverLetterType === 'write' && coverLetterText.trim()) || (coverLetterType === 'upload' && coverLetterFile) 
      ? ' with cover letter' 
      : ''
    
    toast.success(`Successfully applied for ${job.title} at ${job.company}${coverLetterMsg}`)
  }

  const handleCoverLetterFileUpload = (files) => {
    const file = files[0]
    if (!file) return

    // Validate file type
    const allowedTypes = ['.pdf', '.doc', '.docx', '.txt']
    const fileExtension = '.' + file.name.split('.').pop().toLowerCase()
    if (!allowedTypes.includes(fileExtension)) {
      toast.error('Please upload PDF, DOC, DOCX, or TXT files only')
      return
    }

    // Validate file size (5MB limit)
    if (file.size > 5 * 1024 * 1024) {
      toast.error('File size must be less than 5MB')
      return
    }

    setCoverLetterFile(file)
    toast.success('Cover letter file selected successfully')
  }

  const updateApplicationStatus = (applicationId, newStatus, note = '') => {
    setApplications(prev => prev.map(app => {
      if (app.id === applicationId) {
        const updatedApp = {
          ...app,
          status: newStatus,
          statusHistory: [
            ...app.statusHistory,
            {
              status: newStatus,
              date: new Date().toLocaleDateString(),
              note: note || `Status updated to ${newStatus}`
            }
          ]
        }
        return updatedApp
      }
      return app
    }))
    toast.success(`Application status updated to ${newStatus}`)
  }



  const handlePostJob = () => {
    if (!newJob.title || !newJob.company || !newJob.location) {
      toast.error('Please fill in all required fields')
      return
    }

    const jobPost = {
      id: Date.now(),
      ...newJob,
      postedAt: 'Just now',
      skills: [],
      logo: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=100&h=100&fit=crop&crop=face'
    }

    setFilteredJobs([jobPost, ...filteredJobs])
    setNewJob({
      title: '',
      company: '',
      location: '',
      type: '',
      salary: '',
      description: ''
    })
    toast.success('Job posted successfully!')
  }

  const handleJobClick = (job) => {
    setSelectedJob(job)
  }

  const closeJobDetails = () => {
    setSelectedJob(null)
  }

  // Close modal on escape key
  const handleKeyDown = (e) => {
    if (e.key === 'Escape') {
      closeJobDetails()
    }
  }

  // Close modal on backdrop click
  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      closeJobDetails()
    }
  }

  // Skill Assessment Functions
  const startAssessment = (assessment) => {
    setSelectedAssessment(assessment)
    setCurrentQuiz(assessment)
    setCurrentQuestionIndex(0)
    setSelectedAnswers({})
    setQuizResults(null)
    setShowQuizResults(false)
    setTimeRemaining(assessment.duration * 60) // Convert to seconds
    
    // Start timer
    const timer = setInterval(() => {
      setTimeRemaining(prev => {
        if (prev <= 1) {
          clearInterval(timer)
          submitQuiz()
          return 0
        }
        return prev - 1
      })
    }, 1000)
    
    setQuizTimer(timer)
    toast.info(`Assessment started! You have ${assessment.duration} minutes to complete.`)
  }

  const selectAnswer = (questionId, answerIndex) => {
    setSelectedAnswers(prev => ({
      ...prev,
      [questionId]: answerIndex
    }))
  }

  const nextQuestion = () => {
    if (currentQuestionIndex < currentQuiz.questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1)
    }
  }

  const previousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1)
    }
  }

  const submitQuiz = () => {
    if (quizTimer) {
      clearInterval(quizTimer)
      setQuizTimer(null)
    }

    const questions = currentQuiz.questions
    let correctAnswers = 0
    
    const detailedResults = questions.map(question => {
      const userAnswer = selectedAnswers[question.id]
      const isCorrect = userAnswer === question.correctAnswer
      if (isCorrect) correctAnswers++
      
      return {
        questionId: question.id,
        question: question.question,
        userAnswer,
        correctAnswer: question.correctAnswer,
        isCorrect,
        explanation: question.explanation,
        options: question.options
      }
    })
    
    const score = Math.round((correctAnswers / questions.length) * 100)
    const passed = score >= currentQuiz.passingScore
    
    const results = {
      assessmentId: currentQuiz.id,
      skill: currentQuiz.skill,
      score,
      correctAnswers,
      totalQuestions: questions.length,
      passed,
      timeTaken: (currentQuiz.duration * 60) - timeRemaining,
      completedAt: new Date().toLocaleDateString(),
      detailedResults
    }
    
    setQuizResults(results)
    setShowQuizResults(true)
    
    // Add to skill assessments
    setProfile(prev => ({
      ...prev,
      skillAssessments: [...prev.skillAssessments.filter(a => a.assessmentId !== currentQuiz.id), results]
    }))
    
    // Generate certificate if passed
    if (passed) {
      const proficiencyLevel = score >= 90 ? 'Expert' : score >= 80 ? 'Advanced' : score >= 70 ? 'Intermediate' : 'Beginner'
      
      const certificate = {
        id: Date.now(),
        skill: currentQuiz.skill,
        assessmentTitle: currentQuiz.title,
        score,
        proficiencyLevel,
        earnedAt: new Date().toLocaleDateString(),
        certificateId: `CERT-${currentQuiz.skill.toUpperCase()}-${Date.now()}`
      }
      
      setProfile(prev => ({
        ...prev,
        certificates: [...prev.certificates.filter(c => c.skill !== currentQuiz.skill), certificate]
      }))
      
      toast.success(`🎉 Congratulations! You earned a ${proficiencyLevel} certificate in ${currentQuiz.skill}!`)
    } else {
      toast.info(`Assessment completed. Score: ${score}%. You need ${currentQuiz.passingScore}% to pass.`)
    }
  }

  const retakeAssessment = () => {
    setShowQuizResults(false)
    setCurrentQuiz(null)
    setSelectedAssessment(null)
    setCurrentQuestionIndex(0)
    setSelectedAnswers({})
    setQuizResults(null)
    setTimeRemaining(0)
  }

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`
  }



  const tabs = [
    { id: 'search', label: 'Find Jobs', icon: 'Search' },
    { id: 'post', label: 'Post Job', icon: 'Plus' },
    { id: 'applications', label: 'My Applications', icon: 'FileText' },
    { id: 'assessments', label: 'Skill Assessments', icon: 'Award' },
    { id: 'profile', label: 'My Profile', icon: 'User' }
  ]


  const handleProfileSave = () => {
    if (!profile.firstName || !profile.lastName || !profile.email) {
      toast.error('Please fill in all required fields')
      return
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(profile.email)) {
      toast.error('Please enter a valid email address')
      return
    }

    // Save to localStorage for demonstration
    localStorage.setItem('userProfile', JSON.stringify(profile))
    toast.success('Profile saved successfully!')
  }

  const handleAddSkill = () => {
    if (!newSkill.trim()) return
    
    if (profile.skills.includes(newSkill.trim())) {
      toast.warning('Skill already added')
      return
    }

    setProfile(prev => ({
      ...prev,
      skills: [...prev.skills, newSkill.trim()]
    }))
    setNewSkill('')
    toast.success('Skill added successfully')
  }

  const handleRemoveSkill = (skillToRemove) => {
    setProfile(prev => ({
      ...prev,
      skills: prev.skills.filter(skill => skill !== skillToRemove)
    }))
    toast.success('Skill removed')
  }

  const handleFileUpload = (files) => {
    const file = files[0]
    if (!file) return

    // Validate file type
    const allowedTypes = ['.pdf', '.doc', '.docx', '.txt']
    const fileExtension = '.' + file.name.split('.').pop().toLowerCase()
    if (!allowedTypes.includes(fileExtension)) {
      toast.error('Please upload PDF, DOC, DOCX, or TXT files only')
      return
    }

    // Validate file size (10MB limit)
    if (file.size > 10 * 1024 * 1024) {
      toast.error('File size must be less than 10MB')
      return
    }

    // Check if file already exists
    if (profile.documents.some(doc => doc.name === file.name)) {
      toast.warning('A file with this name already exists')
      return
    }

    // Create file object with metadata
    const fileData = {
      id: Date.now(),
      name: file.name,
      size: file.size,
      type: file.type,
      uploadedAt: new Date().toLocaleDateString(),
      url: URL.createObjectURL(file) // For demonstration - in real app, this would be server URL
    }

    setProfile(prev => ({
      ...prev,
      documents: [...prev.documents, fileData]
    }))

    toast.success('File uploaded successfully!')
  }

  const handleDrag = (e) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true)
    } else if (e.type === 'dragleave') {
      setDragActive(false)
    }
  }

  const handleDrop = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
    
    const files = Array.from(e.dataTransfer.files)
    if (files && files.length > 0) {
      handleFileUpload(files)
    }
  }

  const handleDeleteDocument = (docId) => {
    setProfile(prev => ({
      ...prev,
      documents: prev.documents.filter(doc => doc.id !== docId)
    }))
    toast.success('Document deleted successfully')
  }

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }


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
          <motion.div
            key="search"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="space-y-8"
          >
            {/* Search Filters */}
            <div className="glass-card rounded-2xl p-6">
              <h3 className="text-xl font-semibold mb-6 text-surface-900 dark:text-surface-100">
                Find Your Dream Job
              </h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                <div>
                  <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">
                    Job Title / Skills
                  </label>
                  <div className="relative">
                    <ApperIcon name="Search" className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-surface-400" />
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="React Developer..."
                      className="w-full pl-10 pr-4 py-3 rounded-xl border-2 border-surface-200 dark:border-surface-700 bg-white dark:bg-surface-800 text-surface-900 dark:text-surface-100 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-200"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">
                    Location
                  </label>
                  <div className="relative">
                    <ApperIcon name="MapPin" className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-surface-400" />
                    <input
                      type="text"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      placeholder="San Francisco, CA"
                      className="w-full pl-10 pr-4 py-3 rounded-xl border-2 border-surface-200 dark:border-surface-700 bg-white dark:bg-surface-800 text-surface-900 dark:text-surface-100 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-200"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">
                    Job Type
                  </label>
                  <select
                    value={jobType}
                    onChange={(e) => setJobType(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border-2 border-surface-200 dark:border-surface-700 bg-white dark:bg-surface-800 text-surface-900 dark:text-surface-100 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-200"
                  >
                    <option value="">All Types</option>
                    <option value="Full-time">Full-time</option>
                    <option value="Part-time">Part-time</option>
                    <option value="Contract">Contract</option>
                    <option value="Internship">Internship</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">
                    Salary Range
                  </label>
                  <select
                    value={salaryRange}
                    onChange={(e) => setSalaryRange(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border-2 border-surface-200 dark:border-surface-700 bg-white dark:bg-surface-800 text-surface-900 dark:text-surface-100 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-200"
                  >
                    <option value="">Any Salary</option>
                    <option value="0-50k">$0 - $50K</option>
                    <option value="50k-100k">$50K - $100K</option>
                    <option value="100k-150k">$100K - $150K</option>
                    <option value="150k+">$150K+</option>
                  </select>
                </div>
              </div>

              <button
                onClick={handleSearch}
                className="w-full sm:w-auto px-8 py-3 bg-gradient-to-r from-primary to-secondary text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
              >
                <div className="flex items-center justify-center space-x-2">
                  <ApperIcon name="Search" className="h-5 w-5" />
                  <span>Search Jobs</span>
                </div>
              </button>
            </div>

            {/* Job Results */}
            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-surface-900 dark:text-surface-100">
                {filteredJobs.length} Job{filteredJobs.length !== 1 ? 's' : ''} Found
              </h4>
              
              {filteredJobs.map((job) => (
                <motion.div
                  key={job.id}
                  className="job-card cursor-pointer"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  onClick={() => handleJobClick(job)}
                >
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                    <div className="flex items-start space-x-4 flex-1">
                      <img
                        src={job.logo}
                        alt={job.company}
                        className="w-16 h-16 rounded-xl object-cover border-2 border-surface-200 dark:border-surface-700"
                      />
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-surface-900 dark:text-surface-100 mb-1">
                          {job.title}
                        </h3>
                        <p className="text-lg text-surface-700 dark:text-surface-300 mb-2">
                          {job.company}
                        </p>
                        <div className="flex flex-wrap items-center gap-4 text-sm text-surface-600 dark:text-surface-400 mb-3">
                          <div className="flex items-center space-x-1">
                            <ApperIcon name="MapPin" className="h-4 w-4" />
                            <span>{job.location}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <ApperIcon name="Clock" className="h-4 w-4" />
                            <span>{job.type}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <ApperIcon name="DollarSign" className="h-4 w-4" />
                            <span>{job.salary}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <ApperIcon name="Calendar" className="h-4 w-4" />
                            <span>{job.postedAt}</span>
                          </div>
                        </div>
                        {job.skillMatchScore && (
                          <div className="flex items-center space-x-1 text-xs">
                            <ApperIcon name="Target" className="h-3 w-3" />
                            <span className="text-green-600 dark:text-green-400 font-medium">
                              {job.skillMatchPercentage}% skill match
                            </span>
                            {job.verifiedSkillsCount > 0 && (
                              <span className="text-blue-600 dark:text-blue-400">| {job.verifiedSkillsCount} verified</span>
                            )}
                          </div>
                        )}

                        {job.skills && job.skills.length > 0 && (
                          <div className="flex flex-wrap gap-2">
                            {job.skills.map((skill, index) => (
                              <span key={index} className="skill-tag">
                                {skill}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex flex-col sm:flex-row gap-3" onClick={(e) => e.stopPropagation()}>
                      <button className="px-6 py-3 neu-button rounded-xl font-medium text-surface-700 dark:text-surface-300 hover:scale-105 transition-all duration-200">
                        <div className="flex items-center space-x-2">
                          <ApperIcon name="Bookmark" className="h-4 w-4" />
                          <span>Save</span>
                        </div>
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          handleApply(job.id)
                        }}
                        className="px-6 py-3 bg-gradient-to-r from-primary to-secondary text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
                      >
                        <div className="flex items-center space-x-2">
                          <ApperIcon name="Send" className="h-4 w-4" />
                          <span>Apply Now</span>
                        </div>
                      </button>
                    </div>
                  </div>
                </motion.div>

              ))}
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
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">
                    Job Title *
                  </label>
                  <input
                    type="text"
                    value={newJob.title}
                    onChange={(e) => setNewJob({...newJob, title: e.target.value})}
                    placeholder="Senior React Developer"
                    className="w-full px-4 py-3 rounded-xl border-2 border-surface-200 dark:border-surface-700 bg-white dark:bg-surface-800 text-surface-900 dark:text-surface-100 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-200"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">
                    Company Name *
                  </label>
                  <input
                    type="text"
                    value={newJob.company}
                    onChange={(e) => setNewJob({...newJob, company: e.target.value})}
                    placeholder="TechCorp Inc."
                    className="w-full px-4 py-3 rounded-xl border-2 border-surface-200 dark:border-surface-700 bg-white dark:bg-surface-800 text-surface-900 dark:text-surface-100 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-200"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">
                    Location *
                  </label>
                  <input
                    type="text"
                    value={newJob.location}
                    onChange={(e) => setNewJob({...newJob, location: e.target.value})}
                    placeholder="San Francisco, CA"
                    className="w-full px-4 py-3 rounded-xl border-2 border-surface-200 dark:border-surface-700 bg-white dark:bg-surface-800 text-surface-900 dark:text-surface-100 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-200"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">
                    Job Type
                  </label>
                  <select
                    value={newJob.type}
                    onChange={(e) => setNewJob({...newJob, type: e.target.value})}
                    className="w-full px-4 py-3 rounded-xl border-2 border-surface-200 dark:border-surface-700 bg-white dark:bg-surface-800 text-surface-900 dark:text-surface-100 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-200"
                  >
                    <option value="">Select Type</option>
                    <option value="Full-time">Full-time</option>
                    <option value="Part-time">Part-time</option>
                    <option value="Contract">Contract</option>
                    <option value="Internship">Internship</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">
                    Salary Range
                  </label>
                  <input
                    type="text"
                    value={newJob.salary}
                    onChange={(e) => setNewJob({...newJob, salary: e.target.value})}
                    placeholder="$120K - $160K"
                    className="w-full px-4 py-3 rounded-xl border-2 border-surface-200 dark:border-surface-700 bg-white dark:bg-surface-800 text-surface-900 dark:text-surface-100 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-200"
                  />
                </div>

                <div className="lg:col-span-2">
                  <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">
                    Job Description
                  </label>
                  <textarea
                    value={newJob.description}
                    onChange={(e) => setNewJob({...newJob, description: e.target.value})}
                    placeholder="Describe the role, responsibilities, and requirements..."
                    rows={6}
                    className="w-full px-4 py-3 rounded-xl border-2 border-surface-200 dark:border-surface-700 bg-white dark:bg-surface-800 text-surface-900 dark:text-surface-100 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-200 resize-none"
                  />
                </div>
              </div>

              <div className="flex justify-end mt-8">
                <button
                  onClick={handlePostJob}
                  className="px-8 py-3 bg-gradient-to-r from-primary to-secondary text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
                >
                  <div className="flex items-center space-x-2">
                    <ApperIcon name="Send" className="h-5 w-5" />
                    <span>Post Job</span>
                  </div>
                </button>
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
                My Applications ({applications.length})
              </h3>
              
              {applications.length === 0 ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-surface-100 dark:bg-surface-800 rounded-full flex items-center justify-center mx-auto mb-4">
                    <ApperIcon name="FileText" className="h-8 w-8 text-surface-400" />
                  </div>
                  <p className="text-surface-600 dark:text-surface-400 mb-4">
                    No applications yet. Start applying to jobs to see them here!
                  </p>
                  <button
                    onClick={() => setActiveTab('search')}
                    className="px-6 py-3 bg-gradient-to-r from-primary to-secondary text-white rounded-xl font-semibold"
                  >
                    Browse Jobs
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  {applications.map((application) => (
                    <div key={application.id} className="border border-surface-200 dark:border-surface-700 rounded-xl p-6">
                      <div className="flex flex-col space-y-4">
                        {/* Application Header */}
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                          <div>
                            <h4 className="text-lg font-semibold text-surface-900 dark:text-surface-100">
                              {application.jobTitle}
                            </h4>
                            <p className="text-surface-600 dark:text-surface-300">
                              {application.company}
                            </p>
                            <p className="text-sm text-surface-500 dark:text-surface-400">
                              Applied on {application.appliedAt}
                            </p>
                          </div>
                          <div className="flex items-center space-x-3">
                            <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                              application.status === 'pending' 
                                ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300'
                                : application.status === 'reviewed'
                                ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300'
                                : application.status === 'interview'
                                ? 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300'
                                : application.status === 'offer'
                                ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300'
                                : application.status === 'hired'
                                ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300'
                                : 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300'
                            }`}>
                              <div className="flex items-center space-x-1">
                                <ApperIcon name={
                                  application.status === 'pending' ? 'Clock' :
                                  application.status === 'reviewed' ? 'Eye' :
                                  application.status === 'interview' ? 'Users' :
                                  application.status === 'offer' ? 'Gift' :
                                  application.status === 'hired' ? 'CheckCircle' :
                                  'XCircle'
                                } className="h-3 w-3" />
                                <span>{application.status.charAt(0).toUpperCase() + application.status.slice(1)}</span>
                              </div>
                            </span>
                            
                            {/* Status Update Dropdown */}
                            <select
                              value={application.status}
                              onChange={(e) => updateApplicationStatus(application.id, e.target.value)}
                              className="px-3 py-1 rounded-lg border border-surface-300 dark:border-surface-600 bg-white dark:bg-surface-800 text-sm"
                            >
                              <option value="pending">Pending</option>
                              <option value="reviewed">Reviewed</option>
                              <option value="interview">Interview</option>
                              <option value="offer">Offer</option>
                              <option value="hired">Hired</option>
                              <option value="rejected">Rejected</option>
                            </select>
                          </div>
                        </div>

                        {/* Cover Letter Section */}
                        {application.coverLetter && (application.coverLetter.content || application.coverLetter.file) && (
                          <div className="border-t border-surface-200 dark:border-surface-700 pt-4">
                            <h5 className="text-md font-semibold text-surface-900 dark:text-surface-100 mb-2 flex items-center space-x-2">
                              <ApperIcon name="FileText" className="h-4 w-4" />
                              <span>Cover Letter</span>
                            </h5>
                            {application.coverLetter.type === 'write' && application.coverLetter.content && (
                              <div className="bg-surface-50 dark:bg-surface-800 rounded-lg p-4">
                                <p className="text-surface-700 dark:text-surface-300 text-sm leading-relaxed">
                                  {application.coverLetter.content.length > 200 
                                    ? `${application.coverLetter.content.substring(0, 200)}...`
                                    : application.coverLetter.content
                                  }
                                </p>
                                {application.coverLetter.content.length > 200 && (
                                  <button 
                                    onClick={() => {
                                      // Toggle full text view - could be implemented with state
                                      toast.info('Full cover letter view feature coming soon')
                                    }}
                                    className="text-primary hover:text-primary-dark text-sm mt-2"
                                  >
                                    Read more
                                  </button>
                                )}
                              </div>
                            )}
                            {application.coverLetter.type === 'upload' && application.coverLetter.file && (
                              <div className="bg-surface-50 dark:bg-surface-800 rounded-lg p-4">
                                <div className="flex items-center space-x-3">
                                  <div className="w-8 h-8 bg-primary/20 rounded-lg flex items-center justify-center">
                                    <ApperIcon name="FileText" className="h-4 w-4 text-primary" />
                                  </div>
                                  <div className="flex-1">
                                    <p className="font-medium text-surface-900 dark:text-surface-100 text-sm">
                                      {application.coverLetter.file.name}
                                    </p>
                                    <p className="text-surface-500 dark:text-surface-400 text-xs">
                                      {formatFileSize(application.coverLetter.file.size)}
                                    </p>
                                  </div>
                                  <a
                                    href={application.coverLetter.file.url}
                                    download={application.coverLetter.file.name}
                                    className="p-2 text-surface-400 hover:text-primary transition-colors"
                                    title="Download Cover Letter"
                                  >
                                    <ApperIcon name="Download" className="h-4 w-4" />
                                  </a>
                                </div>
                              </div>
                            )}
                          </div>
                        )}

                        {/* Status Timeline */}
                        {application.statusHistory && application.statusHistory.length > 1 && (
                          <div className="border-t border-surface-200 dark:border-surface-700 pt-4">
                            <h5 className="text-md font-semibold text-surface-900 dark:text-surface-100 mb-3 flex items-center space-x-2">
                              <ApperIcon name="Timeline" className="h-4 w-4" />
                              <span>Application Timeline</span>
                            </h5>
                            <div className="space-y-3">
                              {application.statusHistory.slice().reverse().map((entry, index) => (
                                <div key={index} className="flex items-start space-x-3">
                                  <div className={`w-2 h-2 rounded-full mt-2 ${
                                    entry.status === 'pending' ? 'bg-yellow-500' :
                                    entry.status === 'reviewed' ? 'bg-blue-500' :
                                    entry.status === 'interview' ? 'bg-purple-500' :
                                    entry.status === 'offer' ? 'bg-green-500' :
                                    entry.status === 'hired' ? 'bg-emerald-500' :
                                    'bg-red-500'
                                  }`}></div>
                                  <div className="flex-1">
                                    <p className="text-sm font-medium text-surface-900 dark:text-surface-100">
                                      {entry.status.charAt(0).toUpperCase() + entry.status.slice(1)}
                                    </p>
                                    <p className="text-xs text-surface-500 dark:text-surface-400">
                                      {entry.date} • {entry.note}
                                    </p>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}

            </div>
          </motion.div>
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
            <div className="space-y-6">
              {!currentQuiz && !showQuizResults && (
                <>
                  {/* Assessment Overview */}
                  <div className="glass-card rounded-2xl p-6">
                    <div className="flex items-center justify-between mb-6">
                      <div>
                        <h3 className="text-2xl font-bold text-surface-900 dark:text-surface-100">
                          Skill Assessments
                        </h3>
                        <p className="text-surface-600 dark:text-surface-400 mt-2">
                          Verify your skills and improve your job matching with certified assessments
                        </p>
                      </div>
                      <div className="text-right">
                        <div className="text-sm text-surface-500 dark:text-surface-400">Completed</div>
                        <div className="text-2xl font-bold text-primary">{profile.certificates.length}</div>
                      </div>
                    </div>
                    
                    {/* Certificates Display */}
                    {profile.certificates.length > 0 && (
                      <div className="mb-6">
                        <h4 className="text-lg font-semibold mb-3 text-surface-900 dark:text-surface-100">
                          Your Certificates
                        </h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {profile.certificates.map((cert) => (
                            <div key={cert.id} className="certificate-card">
                              <div className="flex items-center justify-between mb-2">
                                <div className="flex items-center space-x-2">
                                  <ApperIcon name="Award" className="h-5 w-5 text-yellow-600" />
                                  <span className="font-semibold text-surface-900 dark:text-surface-100">
                                    {cert.skill}
                                  </span>
                                </div>
                                <span className={`skill-badge ${
                                  cert.proficiencyLevel === 'Expert' ? 'bg-gradient-to-r from-purple-100 to-purple-200 dark:from-purple-900/30 dark:to-purple-800/30 text-purple-700 dark:text-purple-400' :
                                  cert.proficiencyLevel === 'Advanced' ? 'bg-gradient-to-r from-blue-100 to-blue-200 dark:from-blue-900/30 dark:to-blue-800/30 text-blue-700 dark:text-blue-400' :
                                  cert.proficiencyLevel === 'Intermediate' ? 'bg-gradient-to-r from-green-100 to-green-200 dark:from-green-900/30 dark:to-green-800/30 text-green-700 dark:text-green-400' :
                                  'bg-gradient-to-r from-yellow-100 to-yellow-200 dark:from-yellow-900/30 dark:to-yellow-800/30 text-yellow-700 dark:text-yellow-400'
                                }`}>
                                  {cert.proficiencyLevel}
                                </span>
                              </div>
                              <div className="text-sm text-surface-600 dark:text-surface-400">
                                Score: {cert.score}% • Earned {cert.earnedAt}
                              </div>
                              <div className="text-xs text-surface-500 dark:text-surface-500 mt-1">
                                Certificate ID: {cert.certificateId}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Available Assessments */}
                  <div className="glass-card rounded-2xl p-6">
                    <h4 className="text-xl font-semibold mb-6 text-surface-900 dark:text-surface-100">
                      Available Assessments
                    </h4>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {skillAssessments.map((assessment) => {
                        const isCompleted = profile.skillAssessments.some(a => a.assessmentId === assessment.id)
                        const lastAttempt = profile.skillAssessments.find(a => a.assessmentId === assessment.id)
                        const hasCertificate = profile.certificates.some(c => c.skill === assessment.skill)
                        
                        return (
                          <div key={assessment.id} className="assessment-card">
                            <div className="flex items-start justify-between mb-4">
                              <div>
                                <h5 className="text-lg font-semibold text-surface-900 dark:text-surface-100 mb-1">
                                  {assessment.title}
                                </h5>
                                <div className="flex items-center space-x-4 text-sm text-surface-600 dark:text-surface-400">
                                  <span className="flex items-center space-x-1">
                                    <ApperIcon name="Clock" className="h-4 w-4" />
                                    <span>{assessment.duration} min</span>
                                  </span>
                                  <span className="flex items-center space-x-1">
                                    <ApperIcon name="Target" className="h-4 w-4" />
                                    <span>{assessment.difficulty}</span>
                                  </span>
                                  <span className="flex items-center space-x-1">
                                    <ApperIcon name="CheckCircle" className="h-4 w-4" />
                                    <span>{assessment.passingScore}% to pass</span>
                                  </span>
                                </div>
                              </div>
                              {hasCertificate && (
                                <div className="skill-badge">
                                  <ApperIcon name="Award" className="h-4 w-4" />
                                  Certified
                                </div>
                              )}
                            </div>
                            
                            <p className="text-surface-700 dark:text-surface-300 mb-4 text-sm">
                              {assessment.description}
                            </p>
                            
                            {isCompleted && (
                              <div className="mb-4 p-3 bg-surface-50 dark:bg-surface-800 rounded-lg">
                                <div className="flex items-center justify-between text-sm">
                                  <span className="text-surface-600 dark:text-surface-400">Last Score:</span>
                                  <span className={`font-medium ${
                                    lastAttempt.passed ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
                                  }`}>
                                    {lastAttempt.score}% ({lastAttempt.passed ? 'Passed' : 'Failed'})
                                  </span>
                                </div>
                                <div className="text-xs text-surface-500 dark:text-surface-500 mt-1">
                                  Completed {lastAttempt.completedAt}
                                </div>
                              </div>
                            )}
                            
                            <button
                              onClick={() => startAssessment(assessment)}
                              className="w-full px-4 py-3 bg-gradient-to-r from-primary to-secondary text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
                            >
                              <div className="flex items-center justify-center space-x-2">
                                <ApperIcon name="Play" className="h-4 w-4" />
                                <span>{isCompleted ? 'Retake Assessment' : 'Start Assessment'}</span>
                              </div>
                            </button>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                </>
              )}
              
              {/* Quiz Interface */}
              {currentQuiz && !showQuizResults && (
                <div className="glass-card rounded-2xl p-6">
                  {/* Quiz Header */}
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h3 className="text-xl font-semibold text-surface-900 dark:text-surface-100">
                        {currentQuiz.title}
                      </h3>
                      <p className="text-surface-600 dark:text-surface-400">
                        Question {currentQuestionIndex + 1} of {currentQuiz.questions.length}
                      </p>
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-surface-500 dark:text-surface-400">Time Remaining</div>
                      <div className={`text-lg font-bold ${
                        timeRemaining < 300 ? 'text-red-600 dark:text-red-400' : 'text-primary'
                      }`}>
                        {formatTime(timeRemaining)}
                      </div>
                    </div>
                  </div>
                  
                  {/* Progress Bar */}
                  <div className="mb-6">
                    <div className="w-full bg-surface-200 dark:bg-surface-700 rounded-full h-2">
                      <div 
                        className="bg-gradient-to-r from-primary to-secondary h-2 rounded-full transition-all duration-300"
                        style={{ width: `${((currentQuestionIndex + 1) / currentQuiz.questions.length) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                  
                  {/* Current Question */}
                  {currentQuiz.questions[currentQuestionIndex] && (
                    <div>
                      <h4 className="text-lg font-semibold mb-6 text-surface-900 dark:text-surface-100">
                        {currentQuiz.questions[currentQuestionIndex].question}
                      </h4>
                      
                      <div className="space-y-3 mb-8">
                        {currentQuiz.questions[currentQuestionIndex].options.map((option, index) => (
                          <div
                            key={index}
                            className={`quiz-option ${
                              selectedAnswers[currentQuiz.questions[currentQuestionIndex].id] === index ? 'selected' : ''
                            }`}
                            onClick={() => selectAnswer(currentQuiz.questions[currentQuestionIndex].id, index)}
                          >
                            <div className="flex items-center space-x-3">
                              <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                                selectedAnswers[currentQuiz.questions[currentQuestionIndex].id] === index
                                  ? 'border-primary bg-primary'
                                  : 'border-surface-300 dark:border-surface-600'
                              }`}>
                                {selectedAnswers[currentQuiz.questions[currentQuestionIndex].id] === index && (
                                  <div className="w-2 h-2 bg-white rounded-full"></div>
                                )}
                              </div>
                              <span className="text-surface-900 dark:text-surface-100">{option}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                      
                      {/* Navigation Buttons */}
                      <div className="flex justify-between">
                        <button
                          onClick={previousQuestion}
                          disabled={currentQuestionIndex === 0}
                          className="px-6 py-3 neu-button rounded-xl font-medium text-surface-700 dark:text-surface-300 disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105 transition-all duration-200"
                        >
                          <div className="flex items-center space-x-2">
                            <ApperIcon name="ChevronLeft" className="h-4 w-4" />
                            <span>Previous</span>
                          </div>
                        </button>
                        
                        {currentQuestionIndex === currentQuiz.questions.length - 1 ? (
                          <button
                            onClick={submitQuiz}
                            className="px-6 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
                          >
                            <div className="flex items-center space-x-2">
                              <ApperIcon name="CheckCircle" className="h-4 w-4" />
                              <span>Submit Quiz</span>
                            </div>
                          </button>
                        ) : (
                          <button
                            onClick={nextQuestion}
                            disabled={selectedAnswers[currentQuiz.questions[currentQuestionIndex].id] === undefined}
                            className="px-6 py-3 bg-gradient-to-r from-primary to-secondary text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            <div className="flex items-center space-x-2">
                              <span>Next</span>
                              <ApperIcon name="ChevronRight" className="h-4 w-4" />
                            </div>
                          </button>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              )}
              
              {/* Quiz Results */}
              {showQuizResults && quizResults && (
                <div className="glass-card rounded-2xl p-6">
                  <div className="text-center mb-8">
                    <div className={`w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 ${
                      quizResults.passed 
                        ? 'bg-gradient-to-br from-green-100 to-green-200 dark:from-green-900/30 dark:to-green-800/30'
                        : 'bg-gradient-to-br from-red-100 to-red-200 dark:from-red-900/30 dark:to-red-800/30'
                    }`}>
                      <ApperIcon 
                        name={quizResults.passed ? "CheckCircle" : "XCircle"} 
                        className={`h-10 w-10 ${
                          quizResults.passed ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
                        }`} 
                      />
                    </div>
                    
                    <h3 className="text-2xl font-bold text-surface-900 dark:text-surface-100 mb-2">
                      {quizResults.passed ? '🎉 Congratulations!' : 'Assessment Complete'}
                    </h3>
                    
                    <p className="text-surface-600 dark:text-surface-400 mb-4">
                      {quizResults.passed 
                        ? 'You passed the assessment and earned a certificate!' 
                        : `You scored ${quizResults.score}%. You need ${currentQuiz.passingScore}% to pass.`
                      }
                    </p>
                    
                    <div className="grid grid-cols-3 gap-4 mb-6">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-primary">{quizResults.score}%</div>
                        <div className="text-sm text-surface-500 dark:text-surface-500">Score</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-primary">{quizResults.correctAnswers}/{quizResults.totalQuestions}</div>
                        <div className="text-sm text-surface-500 dark:text-surface-500">Correct</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-primary">{formatTime(quizResults.timeTaken)}</div>
                        <div className="text-sm text-surface-500 dark:text-surface-500">Time</div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Detailed Results */}
                  <div className="mb-8">
                    <h4 className="text-lg font-semibold mb-4 text-surface-900 dark:text-surface-100">
                      Question Review
                    </h4>
                    
                    <div className="space-y-4">
                      {quizResults.detailedResults.map((result, index) => (
                        <div key={result.questionId} className="border border-surface-200 dark:border-surface-700 rounded-xl p-4">
                          <div className="flex items-start justify-between mb-3">
                            <h5 className="font-medium text-surface-900 dark:text-surface-100 flex-1">
                              {index + 1}. {result.question}
                            </h5>
                            <div className={`flex items-center space-x-1 text-sm font-medium ${
                              result.isCorrect ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
                            }`}>
                              <ApperIcon name={result.isCorrect ? "Check" : "X"} className="h-4 w-4" />
                              <span>{result.isCorrect ? 'Correct' : 'Incorrect'}</span>
                            </div>
                          </div>
                          
                          <div className="space-y-2 text-sm">
                            {result.options.map((option, optionIndex) => (
                              <div
                                key={optionIndex}
                                className={`p-2 rounded ${
                                  optionIndex === result.correctAnswer
                                    ? 'quiz-option correct'
                                    : optionIndex === result.userAnswer && !result.isCorrect
                                    ? 'quiz-option incorrect'
                                    : 'bg-surface-50 dark:bg-surface-800'
                                }`}
                              >
                                <div className="flex items-center space-x-2">
                                  {optionIndex === result.correctAnswer && (
                                    <ApperIcon name="Check" className="h-4 w-4 text-green-600" />
                                  )}
                                  {optionIndex === result.userAnswer && !result.isCorrect && (
                                    <ApperIcon name="X" className="h-4 w-4 text-red-600" />
                                  )}
                                  <span>{option}</span>
                                </div>
                              </div>
                            ))}
                          </div>
                          
                          {result.explanation && (
                            <div className="mt-3 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                              <div className="flex items-start space-x-2">
                                <ApperIcon name="Info" className="h-4 w-4 text-blue-600 dark:text-blue-400 mt-0.5" />
                                <span className="text-sm text-blue-700 dark:text-blue-300">{result.explanation}</span>
                              </div>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  {/* Action Buttons */}
                  <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <button
                      onClick={retakeAssessment}
                      className="px-6 py-3 neu-button rounded-xl font-medium text-surface-700 dark:text-surface-300 hover:scale-105 transition-all duration-200"
                    >
                      <div className="flex items-center justify-center space-x-2">
                        <ApperIcon name="RotateCcw" className="h-4 w-4" />
                        <span>Take Another Assessment</span>
                      </div>
                    </button>
                    
                    {!quizResults.passed && (
                      <button
                        onClick={() => {
                          setShowQuizResults(false)
                          startAssessment(currentQuiz)
                        }}
                        className="px-6 py-3 bg-gradient-to-r from-primary to-secondary text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
                      >
                        <div className="flex items-center justify-center space-x-2">
                          <ApperIcon name="RefreshCw" className="h-4 w-4" />
                          <span>Retake This Assessment</span>
                        </div>
                      </button>
                    )}
                  </div>
                </div>
              )}
            </div>
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
            <div className="glass-card rounded-2xl p-6">
              <h3 className="text-2xl font-bold mb-6 text-surface-900 dark:text-surface-100">
                Create Your Profile
              </h3>
              
              <div className="space-y-8">
                {/* Personal Information */}
                <div>
                  <h4 className="text-lg font-semibold mb-4 text-surface-900 dark:text-surface-100">
                    Personal Information
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">
                        First Name *
                      </label>
                      <input
                        type="text"
                        value={profile.firstName}
                        onChange={(e) => setProfile({...profile, firstName: e.target.value})}
                        placeholder="John"
                        className="w-full px-4 py-3 rounded-xl border-2 border-surface-200 dark:border-surface-700 bg-white dark:bg-surface-800 text-surface-900 dark:text-surface-100 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-200"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">
                        Last Name *
                      </label>
                      <input
                        type="text"
                        value={profile.lastName}
                        onChange={(e) => setProfile({...profile, lastName: e.target.value})}
                        placeholder="Doe"
                        className="w-full px-4 py-3 rounded-xl border-2 border-surface-200 dark:border-surface-700 bg-white dark:bg-surface-800 text-surface-900 dark:text-surface-100 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-200"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        value={profile.email}
                        onChange={(e) => setProfile({...profile, email: e.target.value})}
                        placeholder="john.doe@example.com"
                        className="w-full px-4 py-3 rounded-xl border-2 border-surface-200 dark:border-surface-700 bg-white dark:bg-surface-800 text-surface-900 dark:text-surface-100 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-200"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        value={profile.phone}
                        onChange={(e) => setProfile({...profile, phone: e.target.value})}
                        placeholder="(555) 123-4567"
                        className="w-full px-4 py-3 rounded-xl border-2 border-surface-200 dark:border-surface-700 bg-white dark:bg-surface-800 text-surface-900 dark:text-surface-100 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-200"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">
                        Location
                      </label>
                      <input
                        type="text"
                        value={profile.location}
                        onChange={(e) => setProfile({...profile, location: e.target.value})}
                        placeholder="San Francisco, CA"
                        className="w-full px-4 py-3 rounded-xl border-2 border-surface-200 dark:border-surface-700 bg-white dark:bg-surface-800 text-surface-900 dark:text-surface-100 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-200"
                      />
                    </div>
                  </div>
                </div>

                {/* Professional Information */}
                <div>
                  <h4 className="text-lg font-semibold mb-4 text-surface-900 dark:text-surface-100">
                    Professional Information
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">
                        Current Role
                      </label>
                      <input
                        type="text"
                        value={profile.currentRole}
                        onChange={(e) => setProfile({...profile, currentRole: e.target.value})}
                        placeholder="Senior React Developer"
                        className="w-full px-4 py-3 rounded-xl border-2 border-surface-200 dark:border-surface-700 bg-white dark:bg-surface-800 text-surface-900 dark:text-surface-100 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-200"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">
                        Experience Level
                      </label>
                      <select
                        value={profile.experienceLevel}
                        onChange={(e) => setProfile({...profile, experienceLevel: e.target.value})}
                        className="w-full px-4 py-3 rounded-xl border-2 border-surface-200 dark:border-surface-700 bg-white dark:bg-surface-800 text-surface-900 dark:text-surface-100 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-200"
                      >
                        <option value="">Select Experience Level</option>
                        <option value="Entry Level">Entry Level (0-2 years)</option>
                        <option value="Mid Level">Mid Level (2-5 years)</option>
                        <option value="Senior Level">Senior Level (5-10 years)</option>
                        <option value="Executive">Executive (10+ years)</option>
                      </select>
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">
                        Preferred Job Type
                      </label>
                      <select
                        value={profile.preferredJobType}
                        onChange={(e) => setProfile({...profile, preferredJobType: e.target.value})}
                        className="w-full px-4 py-3 rounded-xl border-2 border-surface-200 dark:border-surface-700 bg-white dark:bg-surface-800 text-surface-900 dark:text-surface-100 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-200"
                      >
                        <option value="">Select Preferred Job Type</option>
                        <option value="Full-time">Full-time</option>
                        <option value="Part-time">Part-time</option>
                        <option value="Contract">Contract</option>
                        <option value="Freelance">Freelance</option>
                        <option value="Internship">Internship</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Skills Section */}
                <div>
                  <h4 className="text-lg font-semibold mb-4 text-surface-900 dark:text-surface-100">
                    Skills
                  </h4>
                  <div className="mb-4">
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={newSkill}
                        onChange={(e) => setNewSkill(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleAddSkill()}
                        placeholder="Add a skill (e.g., React, JavaScript, Python)"
                        className="flex-1 px-4 py-3 rounded-xl border-2 border-surface-200 dark:border-surface-700 bg-white dark:bg-surface-800 text-surface-900 dark:text-surface-100 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-200"
                      />
                      <button
                        onClick={handleAddSkill}
                        className="px-6 py-3 bg-gradient-to-r from-primary to-secondary text-white rounded-xl font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-300"
                      >
                        <ApperIcon name="Plus" className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                  {profile.certificates.length > 0 && (
                    <div className="mt-6">
                      <h5 className="text-md font-semibold mb-3 text-surface-900 dark:text-surface-100">
                        Skill Certificates ({profile.certificates.length})
                      </h5>
                      <div className="flex flex-wrap gap-2">
                        {profile.certificates.map((cert) => (
                          <div key={cert.id} className="skill-badge">
                            <ApperIcon name="Award" className="h-3 w-3" />
                            <span>{cert.skill} - {cert.proficiencyLevel}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {profile.skills.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {profile.skills.map((skill, index) => (
                        <div key={index} className="flex items-center gap-1 skill-tag">
                          <span>{skill}</span>
                          <button
                            onClick={() => handleRemoveSkill(skill)}
                            className="ml-1 text-primary hover:text-primary-dark"
                          >
                            <ApperIcon name="X" className="h-3 w-3" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* About Section */}
                <div>
                  <h4 className="text-lg font-semibold mb-4 text-surface-900 dark:text-surface-100">
                    About You
                  </h4>
                  <textarea
                    value={profile.about}
                    onChange={(e) => setProfile({...profile, about: e.target.value})}
                    placeholder="Tell us about yourself, your experience, and what you're looking for in your next role..."
                    rows={6}
                    className="w-full px-4 py-3 rounded-xl border-2 border-surface-200 dark:border-surface-700 bg-white dark:bg-surface-800 text-surface-900 dark:text-surface-100 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-200 resize-none"
                  />
                </div>

                {/* Resume/CV Upload */}
                <div>
                  <h4 className="text-lg font-semibold mb-4 text-surface-900 dark:text-surface-100">
                    Resume / CV Upload
                  </h4>
                  
                  {/* Upload Area */}
                  <div
                    className={`border-2 border-dashed rounded-xl p-8 text-center transition-all duration-300 ${
                      dragActive 
                        ? 'border-primary bg-primary/5' 
                        : 'border-surface-300 dark:border-surface-600 hover:border-primary hover:bg-primary/5'
                    }`}
                    onDragEnter={handleDrag}
                    onDragLeave={handleDrag}
                    onDragOver={handleDrag}
                    onDrop={handleDrop}
                  >
                    <div className="w-16 h-16 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                      <ApperIcon name="Upload" className="h-8 w-8 text-primary" />
                    </div>
                    <h5 className="text-lg font-semibold text-surface-900 dark:text-surface-100 mb-2">
                      Drop your files here, or{' '}
                      <label className="text-primary hover:text-primary-dark cursor-pointer">
                        browse
                        <input
                          type="file"
                          multiple={false}
                          accept=".pdf,.doc,.docx,.txt"
                          onChange={(e) => handleFileUpload(e.target.files)}
                          className="hidden"
                        />
                      </label>
                    </h5>
                    <p className="text-surface-600 dark:text-surface-400">
                      Supports: PDF, DOC, DOCX, TXT (Max 10MB)
                    </p>
                  </div>

                  {/* Uploaded Documents */}
                  {profile.documents.length > 0 && (
                    <div className="mt-6">
                      <h5 className="text-md font-semibold mb-3 text-surface-900 dark:text-surface-100">
                        Uploaded Documents ({profile.documents.length})
                      </h5>
                      <div className="space-y-3">
                        {profile.documents.map((doc) => (
                          <div key={doc.id} className="flex items-center justify-between p-4 border border-surface-200 dark:border-surface-700 rounded-xl">
                            <div className="flex items-center space-x-3">
                              <div className="w-10 h-10 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-lg flex items-center justify-center">
                                <ApperIcon name="FileText" className="h-5 w-5 text-primary" />
                              </div>
                              <div>
                                <p className="font-medium text-surface-900 dark:text-surface-100">{doc.name}</p>
                                <p className="text-sm text-surface-500 dark:text-surface-400">
                                  {formatFileSize(doc.size)} • Uploaded {doc.uploadedAt}
                                </p>
                              </div>
                            </div>
                            <div className="flex items-center space-x-2">
                              <a
                                href={doc.url}
                                download={doc.name}
                                className="p-2 text-surface-400 hover:text-primary transition-colors"
                                title="Download"
                              >
                                <ApperIcon name="Download" className="h-5 w-5" />
                              </a>
                              <button
                                onClick={() => handleDeleteDocument(doc.id)}
                                className="p-2 text-surface-400 hover:text-red-500 transition-colors"
                                title="Delete"
                              >
                                <ApperIcon name="Trash2" className="h-5 w-5" />
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Save Button */}
                <div className="flex justify-end pt-6 border-t border-surface-200 dark:border-surface-700">
                  <button
                    onClick={handleProfileSave}
                    className="px-8 py-3 bg-gradient-to-r from-primary to-secondary text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
                  >
                    <div className="flex items-center space-x-2">
                      <ApperIcon name="Save" className="h-5 w-5" />
                      <span>Save Profile</span>
                    </div>
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}

      </AnimatePresence>



      {/* Job Details Modal */}
      <AnimatePresence>
        {selectedJob && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={handleBackdropClick}
            onKeyDown={handleKeyDown}
            tabIndex={-1}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="glass-card rounded-2xl p-6 max-w-4xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-start space-x-4">
                  <img
                    src={selectedJob.logo}
                    alt={selectedJob.company}
                    className="w-20 h-20 rounded-xl object-cover border-2 border-surface-200 dark:border-surface-700"
                  />
                  <div>
                    <h2 className="text-3xl font-bold text-surface-900 dark:text-surface-100 mb-2">
                      {selectedJob.title}
                    </h2>
                    <p className="text-xl text-surface-700 dark:text-surface-300 mb-3">
                      {selectedJob.company}
                    </p>
                    <div className="flex flex-wrap items-center gap-4 text-sm text-surface-600 dark:text-surface-400">
                      <div className="flex items-center space-x-1">
                        <ApperIcon name="MapPin" className="h-4 w-4" />
                        <span>{selectedJob.location}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <ApperIcon name="Clock" className="h-4 w-4" />
                        <span>{selectedJob.type}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <ApperIcon name="DollarSign" className="h-4 w-4" />
                        <span>{selectedJob.salary}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <ApperIcon name="Calendar" className="h-4 w-4" />
                        <span>{selectedJob.postedAt}</span>
                      </div>
                    </div>
                  </div>
                </div>
                <button
                  onClick={closeJobDetails}
                  className="p-2 hover:bg-surface-100 dark:hover:bg-surface-700 rounded-lg transition-colors"
                >
                  <ApperIcon name="X" className="h-6 w-6 text-surface-500" />
                </button>
              </div>

              {/* Skills */}
              {selectedJob.skills && selectedJob.skills.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-surface-900 dark:text-surface-100 mb-3">
                    Required Skills
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedJob.skills.map((skill, index) => (
                      <span key={index} className="skill-tag">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Job Description */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-surface-900 dark:text-surface-100 mb-3">
                  Job Description
                </h3>
                <p className="text-surface-700 dark:text-surface-300 leading-relaxed">
                  {selectedJob.description}
                </p>
              </div>

              {/* Requirements */}
              {selectedJob.requirements && (
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-surface-900 dark:text-surface-100 mb-3">
                    Requirements
                  </h3>
                  <ul className="space-y-2">
                    {selectedJob.requirements.map((requirement, index) => (
                      <li key={index} className="flex items-start space-x-2">
                        <ApperIcon name="Check" className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                        <span className="text-surface-700 dark:text-surface-300">{requirement}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Benefits */}
              {selectedJob.benefits && (
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-surface-900 dark:text-surface-100 mb-3">
                    Benefits & Perks
                  </h3>
                  <ul className="space-y-2">
                    {selectedJob.benefits.map((benefit, index) => (
                      <li key={index} className="flex items-start space-x-2">
                        <ApperIcon name="Gift" className="h-5 w-5 text-blue-500 mt-0.5 flex-shrink-0" />
                        <span className="text-surface-700 dark:text-surface-300">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Company Info */}
              {selectedJob.companyInfo && (
                <div className="mb-8">
                  <h3 className="text-lg font-semibold text-surface-900 dark:text-surface-100 mb-3">
                    About {selectedJob.company}
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div>
                      <p className="text-sm text-surface-500 dark:text-surface-400">Company Size</p>
                      <p className="font-medium text-surface-900 dark:text-surface-100">{selectedJob.companyInfo.size}</p>
                    </div>
                    <div>
                      <p className="text-sm text-surface-500 dark:text-surface-400">Industry</p>
                      <p className="font-medium text-surface-900 dark:text-surface-100">{selectedJob.companyInfo.industry}</p>
                    </div>
                    <div>
                      <p className="text-sm text-surface-500 dark:text-surface-400">Founded</p>
                      <p className="font-medium text-surface-900 dark:text-surface-100">{selectedJob.companyInfo.founded}</p>
                    </div>
                    <div>
                      <p className="text-sm text-surface-500 dark:text-surface-400">Website</p>
                      <a
                        href={selectedJob.companyInfo.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-medium text-primary hover:text-primary-dark transition-colors"
                      >
                        Visit Website
                      </a>
                    </div>
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 justify-end">
                <button className="px-6 py-3 neu-button rounded-xl font-medium text-surface-700 dark:text-surface-300 hover:scale-105 transition-all duration-200">
                  <div className="flex items-center justify-center space-x-2">
                    <ApperIcon name="Bookmark" className="h-4 w-4" />
                    <span>Save Job</span>
                  </div>
                </button>
                <button
                  onClick={() => {
                    handleApply(selectedJob.id)
                    closeJobDetails()
                  }}
                  className="px-6 py-3 bg-gradient-to-r from-primary to-secondary text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
                >
                  <div className="flex items-center justify-center space-x-2">
                    <ApperIcon name="Send" className="h-4 w-4" />
                    <span>Apply Now</span>
                  </div>
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Cover Letter Modal */}
      <AnimatePresence>
        {showCoverLetterModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={(e) => {
              if (e.target === e.currentTarget) {
                setShowCoverLetterModal(false)
              }
            }}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="glass-card rounded-2xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-xl font-semibold text-surface-900 dark:text-surface-100">
                    Complete Your Application
                  </h3>
                  <p className="text-surface-600 dark:text-surface-400 mt-1">
                    Add a cover letter to strengthen your application (optional)
                  </p>
                </div>
                <button
                  onClick={() => setShowCoverLetterModal(false)}
                  className="p-2 hover:bg-surface-100 dark:hover:bg-surface-700 rounded-lg transition-colors"
                >
                  <ApperIcon name="X" className="h-5 w-5 text-surface-500" />
                </button>
              </div>

              {/* Cover Letter Type Selector */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-3">
                  Cover Letter Option
                </label>
                <div className="grid grid-cols-2 gap-4">
                  <button
                    onClick={() => setCoverLetterType('write')}
                    className={`p-4 rounded-xl border-2 transition-all duration-200 ${
                      coverLetterType === 'write'
                        ? 'border-primary bg-primary/5 text-primary'
                        : 'border-surface-200 dark:border-surface-700 hover:border-primary/50'
                    }`}
                  >
                    <div className="flex flex-col items-center space-y-2">
                      <ApperIcon name="Edit3" className="h-6 w-6" />
                      <span className="font-medium">Write Cover Letter</span>
                      <span className="text-xs text-surface-500 dark:text-surface-400">Compose directly</span>
                    </div>
                  </button>
                  <button
                    onClick={() => setCoverLetterType('upload')}
                    className={`p-4 rounded-xl border-2 transition-all duration-200 ${
                      coverLetterType === 'upload'
                        ? 'border-primary bg-primary/5 text-primary'
                        : 'border-surface-200 dark:border-surface-700 hover:border-primary/50'
                    }`}
                  >
                    <div className="flex flex-col items-center space-y-2">
                      <ApperIcon name="Upload" className="h-6 w-6" />
                      <span className="font-medium">Upload File</span>
                      <span className="text-xs text-surface-500 dark:text-surface-400">PDF, DOC, DOCX</span>
                    </div>
                  </button>
                </div>
              </div>

              {/* Cover Letter Content */}
              {coverLetterType === 'write' && (
                <div className="mb-6">
                  <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">
                    Cover Letter Content
                  </label>
                  <textarea
                    value={coverLetterText}
                    onChange={(e) => setCoverLetterText(e.target.value)}
                    placeholder="Dear Hiring Manager,\n\nI am writing to express my strong interest in the [Position Title] role at [Company Name]. With my background in [relevant experience], I am excited about the opportunity to contribute to your team...\n\nThank you for considering my application.\n\nSincerely,\n[Your Name]"
                    rows={12}
                    className="w-full px-4 py-3 rounded-xl border-2 border-surface-200 dark:border-surface-700 bg-white dark:bg-surface-800 text-surface-900 dark:text-surface-100 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-200 resize-none"
                  />
                  <div className="flex justify-between items-center mt-2">
                    <span className="text-xs text-surface-500 dark:text-surface-400">
                      {coverLetterText.length} characters
                    </span>
                    {coverLetterText.length > 0 && coverLetterText.length < 50 && (
                      <span className="text-xs text-red-500">Minimum 50 characters recommended</span>
                    )}
                  </div>
                </div>
              )}

              {coverLetterType === 'upload' && (
                <div className="mb-6">
                  <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">
                    Upload Cover Letter
                  </label>
                  <div className={`border-2 border-dashed rounded-xl p-6 text-center transition-all duration-300 ${
                    coverLetterFile
                      ? 'border-green-300 bg-green-50 dark:bg-green-900/20'
                      : 'border-surface-300 dark:border-surface-600 hover:border-primary hover:bg-primary/5'
                  }`}>
                    {coverLetterFile ? (
                      <div className="flex flex-col items-center space-y-3">
                        <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-xl flex items-center justify-center">
                          <ApperIcon name="FileText" className="h-6 w-6 text-green-600 dark:text-green-400" />
                        </div>
                        <div>
                          <p className="font-medium text-surface-900 dark:text-surface-100">{coverLetterFile.name}</p>
                          <p className="text-sm text-surface-500 dark:text-surface-400">{formatFileSize(coverLetterFile.size)}</p>
                        </div>
                        <button
                          onClick={() => setCoverLetterFile(null)}
                          className="text-sm text-red-600 hover:text-red-700"
                        >
                          Remove file
                        </button>
                      </div>
                    ) : (
                      <div>
                        <div className="w-12 h-12 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-xl flex items-center justify-center mx-auto mb-3">
                          <ApperIcon name="Upload" className="h-6 w-6 text-primary" />
                        </div>
                        <p className="text-surface-900 dark:text-surface-100 font-medium mb-1">
                          Drop your cover letter here, or{' '}
                          <label className="text-primary hover:text-primary-dark cursor-pointer">
                            browse
                            <input
                              type="file"
                              accept=".pdf,.doc,.docx,.txt"
                              onChange={(e) => handleCoverLetterFileUpload(e.target.files)}
                              className="hidden"
                            />
                          </label>
                        </p>
                        <p className="text-sm text-surface-500 dark:text-surface-400">
                          Supports: PDF, DOC, DOCX, TXT (Max 5MB)
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 justify-end">
                <button
                  onClick={() => setShowCoverLetterModal(false)}
                  className="px-6 py-3 neu-button rounded-xl font-medium text-surface-700 dark:text-surface-300 hover:scale-105 transition-all duration-200"
                >
                  Cancel
                </button>
                <button
                  onClick={submitApplication}
                  className="px-6 py-3 bg-gradient-to-r from-primary to-secondary text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
                >
                  <div className="flex items-center justify-center space-x-2">
                    <ApperIcon name="Send" className="h-4 w-4" />
                    <span>Submit Application</span>
                  </div>
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>


    </div>
  )
}

export default MainFeature