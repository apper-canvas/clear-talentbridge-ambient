import { useState } from 'react'
import { motion } from 'framer-motion'
import { toast } from 'react-toastify'
import ApperIcon from './ApperIcon'

const JobSearch = ({ profile }) => {
  const [searchQuery, setSearchQuery] = useState('')
  const [location, setLocation] = useState('')
  const [jobType, setJobType] = useState('')
  const [salaryRange, setSalaryRange] = useState('')
  const [selectedJob, setSelectedJob] = useState(null)
  const [showCoverLetterModal, setShowCoverLetterModal] = useState(false)
  const [coverLetterType, setCoverLetterType] = useState('write')
  const [coverLetterText, setCoverLetterText] = useState('')
  const [coverLetterFile, setCoverLetterFile] = useState(null)
  const [applicationJobId, setApplicationJobId] = useState(null)

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
      description: 'We are looking for a Senior React Developer to join our dynamic team. You will be responsible for developing and maintaining high-quality web applications using modern React ecosystem.',
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
      description: 'Join our creative team as a UX/UI Designer and help shape the future of digital experiences.',
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

  const handleJobClick = (job) => {
    setSelectedJob(job)
  }

  const closeJobDetails = () => {
    setSelectedJob(null)
  }

  const handleApply = (jobId) => {
    setApplicationJobId(jobId)
    setShowCoverLetterModal(true)
    setCoverLetterText('')
    setCoverLetterFile(null)
    setCoverLetterType('write')
  }

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  return (
    <motion.div
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
  )
}

export default JobSearch