import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { toast } from 'react-toastify'
import ApperIcon from '../components/ApperIcon'

const BrowseJobs = () => {
  const [jobs, setJobs] = useState([])
  const [loading, setLoading] = useState(true)
  const [filters, setFilters] = useState({
    search: '',
    location: '',
    type: '',
    experience: '',
    salary: ''
  })
  const [savedJobs, setSavedJobs] = useState(new Set())

  // Mock job data
  const mockJobs = [
    {
      id: 1,
      title: 'Senior React Developer',
      company: 'TechCorp Inc.',
      location: 'San Francisco, CA',
      type: 'Full-time',
      experience: 'Senior',
      salary: '$120,000 - $150,000',
      description: 'We are seeking a talented Senior React Developer to join our dynamic team.',
      requirements: ['React', 'TypeScript', 'Node.js', 'GraphQL'],
      posted: '2 days ago',
      logo: '🚀'
    },
    {
      id: 2,
      title: 'UX/UI Designer',
      company: 'Design Studios',
      location: 'New York, NY',
      type: 'Full-time',
      experience: 'Mid-level',
      salary: '$80,000 - $100,000',
      description: 'Join our creative team to design beautiful and intuitive user experiences.',
      requirements: ['Figma', 'Adobe Creative Suite', 'Prototyping', 'User Research'],
      posted: '1 day ago',
      logo: '🎨'
    },
    {
      id: 3,
      title: 'DevOps Engineer',
      company: 'CloudTech Solutions',
      location: 'Austin, TX',
      type: 'Full-time',
      experience: 'Senior',
      salary: '$110,000 - $130,000',
      description: 'Looking for an experienced DevOps Engineer to manage our cloud infrastructure.',
      requirements: ['AWS', 'Kubernetes', 'Docker', 'CI/CD'],
      posted: '3 days ago',
      logo: '☁️'
    },
    {
      id: 4,
      title: 'Marketing Manager',
      company: 'Growth Marketing Co.',
      location: 'Remote',
      type: 'Full-time',
      experience: 'Mid-level',
      salary: '$70,000 - $90,000',
      description: 'Drive marketing strategies and campaigns for our growing startup.',
      requirements: ['Digital Marketing', 'Analytics', 'Content Strategy', 'SEO'],
      posted: '1 week ago',
      logo: '📈'
    },
    {
      id: 5,
      title: 'Python Data Scientist',
      company: 'AI Innovations',
      location: 'Boston, MA',
      type: 'Contract',
      experience: 'Senior',
      salary: '$130,000 - $160,000',
      description: 'Work on cutting-edge AI projects using Python and machine learning.',
      requirements: ['Python', 'Machine Learning', 'TensorFlow', 'SQL'],
      posted: '4 days ago',
      logo: '🤖'
    },
    {
      id: 6,
      title: 'Product Manager',
      company: 'Innovation Labs',
      location: 'Seattle, WA',
      type: 'Full-time',
      experience: 'Senior',
      salary: '$140,000 - $170,000',
      description: 'Lead product strategy and development for our flagship products.',
      requirements: ['Product Strategy', 'Agile', 'User Research', 'Analytics'],
      posted: '5 days ago',
      logo: '💡'
    }
  ]

  useEffect(() => {
    // Simulate loading jobs
    setTimeout(() => {
      setJobs(mockJobs)
      setLoading(false)
    }, 1000)
  }, [])

  const filteredJobs = jobs.filter(job => {
    return (
      job.title.toLowerCase().includes(filters.search.toLowerCase()) ||
      job.company.toLowerCase().includes(filters.search.toLowerCase())
    ) &&
    (filters.location === '' || job.location.toLowerCase().includes(filters.location.toLowerCase())) &&
    (filters.type === '' || job.type === filters.type) &&
    (filters.experience === '' || job.experience === filters.experience)
  })

  const handleSaveJob = (jobId) => {
    const newSavedJobs = new Set(savedJobs)
    if (savedJobs.has(jobId)) {
      newSavedJobs.delete(jobId)
      toast.info('Job removed from saved jobs')
    } else {
      newSavedJobs.add(jobId)
      toast.success('Job saved successfully!')
    }
    setSavedJobs(newSavedJobs)
  }

  const handleApplyJob = (job) => {
    toast.success(`Application submitted for ${job.title} at ${job.company}!`)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-surface-50 via-blue-50 to-purple-50 dark:from-surface-900 dark:via-surface-800 dark:to-surface-900">
      {/* Navigation */}
      <nav className="glass-card border-b border-white/10 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link to="/" className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center">
                <ApperIcon name="Zap" className="h-6 w-6 text-white" />
              </div>
              <span className="text-xl font-bold gradient-text">TalentBridge</span>
            </Link>
            <Link 
              to="/"
              className="px-4 py-2 neu-button rounded-xl font-medium text-surface-700 dark:text-surface-300 hover:text-primary transition-colors"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <motion.div 
          className="text-center mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl font-bold mb-4">
            Browse <span className="gradient-text">Jobs</span>
          </h1>
          <p className="text-lg text-surface-600 dark:text-surface-300 max-w-2xl mx-auto">
            Discover your next career opportunity from thousands of job listings.
          </p>
        </motion.div>

        {/* Filters */}
        <motion.div 
          className="glass-card rounded-2xl p-6 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-4">
            <div>
              <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">
                Search Jobs
              </label>
              <div className="relative">
                <ApperIcon name="Search" className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-surface-400" />
                <input
                  type="text"
                  placeholder="Job title or company"
                  value={filters.search}
                  onChange={(e) => setFilters({...filters, search: e.target.value})}
                  className="w-full pl-10 pr-4 py-3 bg-white dark:bg-surface-800 border border-surface-200 dark:border-surface-700 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">
                Location
              </label>
              <div className="relative">
                <ApperIcon name="MapPin" className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-surface-400" />
                <input
                  type="text"
                  placeholder="City, State"
                  value={filters.location}
                  onChange={(e) => setFilters({...filters, location: e.target.value})}
                  className="w-full pl-10 pr-4 py-3 bg-white dark:bg-surface-800 border border-surface-200 dark:border-surface-700 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">
                Job Type
              </label>
              <select
                value={filters.type}
                onChange={(e) => setFilters({...filters, type: e.target.value})}
                className="w-full px-4 py-3 bg-white dark:bg-surface-800 border border-surface-200 dark:border-surface-700 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
              >
                <option value="">All Types</option>
                <option value="Full-time">Full-time</option>
                <option value="Part-time">Part-time</option>
                <option value="Contract">Contract</option>
                <option value="Remote">Remote</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">
                Experience
              </label>
              <select
                value={filters.experience}
                onChange={(e) => setFilters({...filters, experience: e.target.value})}
                className="w-full px-4 py-3 bg-white dark:bg-surface-800 border border-surface-200 dark:border-surface-700 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
              >
                <option value="">All Levels</option>
                <option value="Entry-level">Entry-level</option>
                <option value="Mid-level">Mid-level</option>
                <option value="Senior">Senior</option>
                <option value="Executive">Executive</option>
              </select>
            </div>
            <div className="flex items-end">
              <button
                onClick={() => setFilters({ search: '', location: '', type: '', experience: '', salary: '' })}
                className="w-full px-4 py-3 neu-button rounded-xl font-medium text-surface-700 dark:text-surface-300 hover:text-primary transition-colors"
              >
                Clear Filters
              </button>
            </div>
          </div>
        </motion.div>

        {/* Job Results */}
        {loading ? (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <p className="text-surface-600 dark:text-surface-300">
                {filteredJobs.length} jobs found
              </p>
              <div className="flex items-center space-x-2">
                <ApperIcon name="SlidersHorizontal" className="h-4 w-4 text-surface-400" />
                <span className="text-sm text-surface-600 dark:text-surface-300">Sort by relevance</span>
              </div>
            </div>

            <div className="grid gap-6">
              {filteredJobs.map((job, index) => (
                <motion.div
                  key={job.id}
                  className="job-card"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                    <div className="flex items-start space-x-4 mb-4 lg:mb-0">
                      <div className="w-12 h-12 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-xl flex items-center justify-center text-2xl">
                        {job.logo}
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-semibold text-surface-900 dark:text-surface-100 mb-1">
                          {job.title}
                        </h3>
                        <p className="text-primary font-medium mb-2">{job.company}</p>
                        <div className="flex flex-wrap items-center gap-4 text-sm text-surface-600 dark:text-surface-400">
                          <div className="flex items-center space-x-1">
                            <ApperIcon name="MapPin" className="h-4 w-4" />
                            <span>{job.location}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <ApperIcon name="Clock" className="h-4 w-4" />
                            <span>{job.type}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <ApperIcon name="TrendingUp" className="h-4 w-4" />
                            <span>{job.experience}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <ApperIcon name="DollarSign" className="h-4 w-4" />
                            <span>{job.salary}</span>
                          </div>
                        </div>
                        <p className="text-surface-600 dark:text-surface-300 mt-3 line-clamp-2">
                          {job.description}
                        </p>
                        <div className="flex flex-wrap gap-2 mt-3">
                          {job.requirements.map((skill, skillIndex) => (
                            <span key={skillIndex} className="skill-tag">
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col sm:flex-row lg:flex-col gap-3 lg:ml-4">
                      <button
                        onClick={() => handleApplyJob(job)}
                        className="px-6 py-3 bg-gradient-to-r from-primary to-secondary text-white rounded-xl font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-300"
                      >
                        Apply Now
                      </button>
                      <button
                        onClick={() => handleSaveJob(job.id)}
                        className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                          savedJobs.has(job.id)
                            ? 'bg-primary text-white'
                            : 'neu-button text-surface-700 dark:text-surface-300 hover:text-primary'
                        }`}
                      >
                        <div className="flex items-center space-x-2">
                          <ApperIcon 
                            name={savedJobs.has(job.id) ? 'Heart' : 'Heart'} 
                            className={`h-4 w-4 ${savedJobs.has(job.id) ? 'fill-current' : ''}`}
                          />
                          <span>{savedJobs.has(job.id) ? 'Saved' : 'Save'}</span>
                        </div>
                      </button>
                    </div>
                  </div>
                  <div className="flex justify-between items-center mt-4 pt-4 border-t border-surface-200 dark:border-surface-700">
                    <span className="text-sm text-surface-500 dark:text-surface-400">
                      Posted {job.posted}
                    </span>
                    <button className="text-sm text-primary hover:text-primary-dark transition-colors">
                      View Details
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>

            {filteredJobs.length === 0 && (
              <div className="text-center py-12">
                <ApperIcon name="Search" className="h-16 w-16 text-surface-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-surface-900 dark:text-surface-100 mb-2">
                  No jobs found
                </h3>
                <p className="text-surface-600 dark:text-surface-300">
                  Try adjusting your search criteria to find more opportunities.
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default BrowseJobs