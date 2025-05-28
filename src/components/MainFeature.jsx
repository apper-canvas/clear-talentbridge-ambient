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
  const [applications, setApplications] = useState([])
  const [newJob, setNewJob] = useState({
    title: '',
    company: '',
    location: '',
    type: '',
    salary: '',
    description: ''
  })

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
      logo: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=100&h=100&fit=crop&crop=face'
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
      logo: 'https://images.unsplash.com/photo-1553028826-f4804151e596?w=100&h=100&fit=crop&crop=face'
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
      logo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face'
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
      logo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face'
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

  const tabs = [
    { id: 'search', label: 'Find Jobs', icon: 'Search' },
    { id: 'post', label: 'Post Job', icon: 'Plus' },
    { id: 'applications', label: 'My Applications', icon: 'FileText' }
  ]

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
                  className="job-card"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                    <div className="flex items-start space-x-4">
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
                    
                    <div className="flex flex-col sm:flex-row gap-3">
                      <button className="px-6 py-3 neu-button rounded-xl font-medium text-surface-700 dark:text-surface-300 hover:scale-105 transition-all duration-200">
                        <div className="flex items-center space-x-2">
                          <ApperIcon name="Bookmark" className="h-4 w-4" />
                          <span>Save</span>
                        </div>
                      </button>
                      <button
                        onClick={() => handleApply(job.id)}
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
        )}
      </AnimatePresence>
    </div>
  )
}

export default MainFeature