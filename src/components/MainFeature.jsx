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
    documents: []
  })
  const [newSkill, setNewSkill] = useState('')
  const [dragActive, setDragActive] = useState(false)

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


  const [filteredJobs, setFilteredJobs] = useState(mockJobs)

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

    setFilteredJobs(filtered)
    toast.success(`Found ${filtered.length} job${filtered.length !== 1 ? 's' : ''} matching your criteria`)
  }

  const handleApply = (jobId) => {
    const job = mockJobs.find(j => j.id === jobId)
    const existingApplication = applications.find(app => app.jobId === jobId)
    
    if (existingApplication) {
      toast.info('You have already applied for this position')
      return
    }

    const newApplication = {
      id: Date.now(),
      jobId,
      jobTitle: job.title,
      company: job.company,
      status: 'pending',
      appliedAt: new Date().toLocaleDateString()
    }

    setApplications([...applications, newApplication])
    toast.success(`Successfully applied for ${job.title} at ${job.company}`)
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


  const tabs = [
    { id: 'search', label: 'Find Jobs', icon: 'Search' },
    { id: 'post', label: 'Post Job', icon: 'Plus' },
    { id: 'applications', label: 'My Applications', icon: 'FileText' },
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
                    <div key={application.id} className="border border-surface-200 dark:border-surface-700 rounded-xl p-4">
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
                              : application.status === 'rejected'
                              ? 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300'
                              : 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300'
                          }`}>
                            {application.status.charAt(0).toUpperCase() + application.status.slice(1)}
                          </span>
                          <button className="p-2 text-surface-400 hover:text-surface-600 dark:hover:text-surface-300">
                            <ApperIcon name="MoreVertical" className="h-5 w-5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </motion.div>

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

    </div>
  )
}

export default MainFeature