import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { toast } from 'react-toastify'
import ApperIcon from '../components/ApperIcon'

const SearchCandidates = () => {
  const [candidates, setCandidates] = useState([])
  const [loading, setLoading] = useState(true)
  const [filters, setFilters] = useState({
    search: '',
    location: '',
    skills: '',
    experience: '',
    availability: ''
  })
  const [savedCandidates, setSavedCandidates] = useState(new Set())
  const [selectedCandidate, setSelectedCandidate] = useState(null)

  // Mock candidate data
  const mockCandidates = [
    {
      id: 1,
      name: 'Sarah Johnson',
      title: 'Senior React Developer',
      location: 'San Francisco, CA',
      experience: '6 years',
      skills: ['React', 'TypeScript', 'Node.js', 'GraphQL', 'AWS'],
      avatar: '👩‍💻',
      summary: 'Passionate full-stack developer with expertise in modern web technologies and cloud platforms.',
      availability: 'Immediate',
      salary: '$120,000 - $140,000',
      education: 'BS Computer Science - Stanford University',
      lastActive: '2 hours ago',
      verified: true,
      rating: 4.9
    },
    {
      id: 2,
      name: 'Michael Chen',
      title: 'UX/UI Designer',
      location: 'New York, NY',
      experience: '4 years',
      skills: ['Figma', 'Adobe Creative Suite', 'Prototyping', 'User Research', 'Sketch'],
      avatar: '👨‍🎨',
      summary: 'Creative designer focused on user-centered design and intuitive user experiences.',
      availability: '2 weeks',
      salary: '$85,000 - $100,000',
      education: 'MFA Design - Parsons School of Design',
      lastActive: '1 day ago',
      verified: true,
      rating: 4.8
    },
    {
      id: 3,
      name: 'Emily Rodriguez',
      title: 'Data Scientist',
      location: 'Austin, TX',
      experience: '5 years',
      skills: ['Python', 'Machine Learning', 'TensorFlow', 'SQL', 'R'],
      avatar: '👩‍🔬',
      summary: 'Data scientist with strong background in machine learning and statistical analysis.',
      availability: '1 month',
      salary: '$110,000 - $130,000',
      education: 'PhD Data Science - UT Austin',
      lastActive: '3 hours ago',
      verified: true,
      rating: 4.9
    },
    {
      id: 4,
      name: 'David Park',
      title: 'DevOps Engineer',
      location: 'Seattle, WA',
      experience: '7 years',
      skills: ['AWS', 'Kubernetes', 'Docker', 'Terraform', 'Jenkins'],
      avatar: '👨‍💼',
      summary: 'DevOps engineer specializing in cloud infrastructure and automation.',
      availability: 'Immediate',
      salary: '$125,000 - $145,000',
      education: 'BS Computer Engineering - University of Washington',
      lastActive: '5 hours ago',
      verified: true,
      rating: 4.7
    },
    {
      id: 5,
      name: 'Jessica Taylor',
      title: 'Product Manager',
      location: 'Remote',
      experience: '8 years',
      skills: ['Product Strategy', 'Agile', 'User Research', 'Analytics', 'Roadmapping'],
      avatar: '👩‍💼',
      summary: 'Experienced product manager with a track record of launching successful products.',
      availability: '3 weeks',
      salary: '$130,000 - $150,000',
      education: 'MBA - Harvard Business School',
      lastActive: '1 hour ago',
      verified: true,
      rating: 4.8
    },
    {
      id: 6,
      name: 'Alex Thompson',
      title: 'Marketing Specialist',
      location: 'Chicago, IL',
      experience: '3 years',
      skills: ['Digital Marketing', 'SEO', 'Content Strategy', 'Analytics', 'Social Media'],
      avatar: '👨‍📢',
      summary: 'Digital marketing specialist with expertise in growth marketing and content strategy.',
      availability: '2 weeks',
      salary: '$70,000 - $85,000',
      education: 'BA Marketing - Northwestern University',
      lastActive: '2 days ago',
      verified: false,
      rating: 4.6
    }
  ]

  useEffect(() => {
    // Simulate loading candidates
    setTimeout(() => {
      setCandidates(mockCandidates)
      setLoading(false)
    }, 1000)
  }, [])

  const filteredCandidates = candidates.filter(candidate => {
    return (
      candidate.name.toLowerCase().includes(filters.search.toLowerCase()) ||
      candidate.title.toLowerCase().includes(filters.search.toLowerCase()) ||
      candidate.skills.some(skill => skill.toLowerCase().includes(filters.search.toLowerCase()))
    ) &&
    (filters.location === '' || candidate.location.toLowerCase().includes(filters.location.toLowerCase())) &&
    (filters.skills === '' || candidate.skills.some(skill => skill.toLowerCase().includes(filters.skills.toLowerCase()))) &&
    (filters.experience === '' || candidate.experience.includes(filters.experience)) &&
    (filters.availability === '' || candidate.availability === filters.availability)
  })

  const handleSaveCandidate = (candidateId) => {
    const newSavedCandidates = new Set(savedCandidates)
    if (savedCandidates.has(candidateId)) {
      newSavedCandidates.delete(candidateId)
      toast.info('Candidate removed from saved list')
    } else {
      newSavedCandidates.add(candidateId)
      toast.success('Candidate saved successfully!')
    }
    setSavedCandidates(newSavedCandidates)
  }

  const handleContactCandidate = (candidate) => {
    toast.success(`Message sent to ${candidate.name}!`)
  }

  const handleViewProfile = (candidate) => {
    setSelectedCandidate(candidate)
  }

  if (selectedCandidate) {
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
              <button
                onClick={() => setSelectedCandidate(null)}
                className="px-4 py-2 neu-button rounded-xl font-medium text-surface-700 dark:text-surface-300 hover:text-primary transition-colors"
              >
                Back to Search
              </button>
            </div>
          </div>
        </nav>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <motion.div 
            className="glass-card rounded-2xl p-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-8">
              <div className="flex items-start space-x-4 mb-4 md:mb-0">
                <div className="w-20 h-20 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-xl flex items-center justify-center text-4xl">
                  {selectedCandidate.avatar}
                </div>
                <div>
                  <div className="flex items-center space-x-2 mb-1">
                    <h1 className="text-2xl font-bold text-surface-900 dark:text-surface-100">
                      {selectedCandidate.name}
                    </h1>
                    {selectedCandidate.verified && (
                      <ApperIcon name="CheckCircle" className="h-6 w-6 text-green-500" />
                    )}
                  </div>
                  <p className="text-primary font-semibold text-lg mb-2">{selectedCandidate.title}</p>
                  <div className="flex flex-wrap items-center gap-4 text-sm text-surface-600 dark:text-surface-400">
                    <div className="flex items-center space-x-1">
                      <ApperIcon name="MapPin" className="h-4 w-4" />
                      <span>{selectedCandidate.location}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <ApperIcon name="Clock" className="h-4 w-4" />
                      <span>{selectedCandidate.experience} experience</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <ApperIcon name="Star" className="h-4 w-4 text-yellow-500" />
                      <span>{selectedCandidate.rating}/5.0</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={() => handleContactCandidate(selectedCandidate)}
                  className="px-6 py-3 bg-gradient-to-r from-primary to-secondary text-white rounded-xl font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-300"
                >
                  <ApperIcon name="MessageSquare" className="h-4 w-4 inline mr-2" />
                  Contact
                </button>
                <button
                  onClick={() => handleSaveCandidate(selectedCandidate.id)}
                  className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                    savedCandidates.has(selectedCandidate.id)
                      ? 'bg-primary text-white'
                      : 'neu-button text-surface-700 dark:text-surface-300 hover:text-primary'
                  }`}
                >
                  <ApperIcon 
                    name={savedCandidates.has(selectedCandidate.id) ? 'Heart' : 'Heart'} 
                    className={`h-4 w-4 inline mr-2 ${savedCandidates.has(selectedCandidate.id) ? 'fill-current' : ''}`}
                  />
                  {savedCandidates.has(selectedCandidate.id) ? 'Saved' : 'Save'}
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="grid md:grid-cols-3 gap-8">
              <div className="md:col-span-2 space-y-6">
                {/* Summary */}
                <div>
                  <h3 className="text-lg font-semibold text-surface-900 dark:text-surface-100 mb-3">
                    Professional Summary
                  </h3>
                  <p className="text-surface-700 dark:text-surface-300">
                    {selectedCandidate.summary}
                  </p>
                </div>

                {/* Skills */}
                <div>
                  <h3 className="text-lg font-semibold text-surface-900 dark:text-surface-100 mb-3">
                    Skills
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedCandidate.skills.map((skill, index) => (
                      <span key={index} className="skill-tag">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Education */}
                <div>
                  <h3 className="text-lg font-semibold text-surface-900 dark:text-surface-100 mb-3">
                    Education
                  </h3>
                  <p className="text-surface-700 dark:text-surface-300">
                    {selectedCandidate.education}
                  </p>
                </div>
              </div>

              <div className="space-y-6">
                {/* Quick Info */}
                <div className="bg-surface-50 dark:bg-surface-800/50 rounded-xl p-4">
                  <h4 className="font-semibold text-surface-900 dark:text-surface-100 mb-3">
                    Quick Info
                  </h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-surface-600 dark:text-surface-400">Availability:</span>
                      <span className="font-medium">{selectedCandidate.availability}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-surface-600 dark:text-surface-400">Salary Range:</span>
                      <span className="font-medium">{selectedCandidate.salary}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-surface-600 dark:text-surface-400">Last Active:</span>
                      <span className="font-medium">{selectedCandidate.lastActive}</span>
                    </div>
                  </div>
                </div>

                {/* Contact Info */}
                <div className="bg-surface-50 dark:bg-surface-800/50 rounded-xl p-4">
                  <h4 className="font-semibold text-surface-900 dark:text-surface-100 mb-3">
                    Contact Options
                  </h4>
                  <div className="space-y-2">
                    <button className="w-full text-left p-2 rounded-lg hover:bg-surface-100 dark:hover:bg-surface-700 transition-colors">
                      <div className="flex items-center space-x-2">
                        <ApperIcon name="Mail" className="h-4 w-4 text-primary" />
                        <span className="text-sm">Send Email</span>
                      </div>
                    </button>
                    <button className="w-full text-left p-2 rounded-lg hover:bg-surface-100 dark:hover:bg-surface-700 transition-colors">
                      <div className="flex items-center space-x-2">
                        <ApperIcon name="MessageSquare" className="h-4 w-4 text-primary" />
                        <span className="text-sm">Direct Message</span>
                      </div>
                    </button>
                    <button className="w-full text-left p-2 rounded-lg hover:bg-surface-100 dark:hover:bg-surface-700 transition-colors">
                      <div className="flex items-center space-x-2">
                        <ApperIcon name="Calendar" className="h-4 w-4 text-primary" />
                        <span className="text-sm">Schedule Interview</span>
                      </div>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    )
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
            Search <span className="gradient-text">Candidates</span>
          </h1>
          <p className="text-lg text-surface-600 dark:text-surface-300 max-w-2xl mx-auto">
            Find the perfect candidates for your open positions.
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
                Search
              </label>
              <div className="relative">
                <ApperIcon name="Search" className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-surface-400" />
                <input
                  type="text"
                  placeholder="Name, title, or skills"
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
                Skills
              </label>
              <input
                type="text"
                placeholder="Required skills"
                value={filters.skills}
                onChange={(e) => setFilters({...filters, skills: e.target.value})}
                className="w-full px-4 py-3 bg-white dark:bg-surface-800 border border-surface-200 dark:border-surface-700 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
              />
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
                <option value="">All Experience</option>
                <option value="1">1-2 years</option>
                <option value="3">3-5 years</option>
                <option value="6">6+ years</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">
                Availability
              </label>
              <select
                value={filters.availability}
                onChange={(e) => setFilters({...filters, availability: e.target.value})}
                className="w-full px-4 py-3 bg-white dark:bg-surface-800 border border-surface-200 dark:border-surface-700 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
              >
                <option value="">All Availability</option>
                <option value="Immediate">Immediate</option>
                <option value="2 weeks">2 weeks</option>
                <option value="1 month">1 month</option>
                <option value="3 weeks">3 weeks</option>
              </select>
            </div>
          </div>
        </motion.div>

        {/* Results */}
        {loading ? (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <p className="text-surface-600 dark:text-surface-300">
                {filteredCandidates.length} candidates found
              </p>
            </div>

            <div className="grid gap-6">
              {filteredCandidates.map((candidate, index) => (
                <motion.div
                  key={candidate.id}
                  className="glass-card rounded-2xl p-6 hover:shadow-xl transition-all duration-300"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                    <div className="flex items-start space-x-4 mb-4 lg:mb-0">
                      <div className="w-16 h-16 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-xl flex items-center justify-center text-2xl flex-shrink-0">
                        {candidate.avatar}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          <h3 className="text-xl font-semibold text-surface-900 dark:text-surface-100">
                            {candidate.name}
                          </h3>
                          {candidate.verified && (
                            <ApperIcon name="CheckCircle" className="h-5 w-5 text-green-500" />
                          )}
                        </div>
                        <p className="text-primary font-medium mb-2">{candidate.title}</p>
                        <div className="flex flex-wrap items-center gap-4 text-sm text-surface-600 dark:text-surface-400 mb-3">
                          <div className="flex items-center space-x-1">
                            <ApperIcon name="MapPin" className="h-4 w-4" />
                            <span>{candidate.location}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <ApperIcon name="Clock" className="h-4 w-4" />
                            <span>{candidate.experience} experience</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <ApperIcon name="Star" className="h-4 w-4 text-yellow-500" />
                            <span>{candidate.rating}/5.0</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <ApperIcon name="DollarSign" className="h-4 w-4" />
                            <span>{candidate.salary}</span>
                          </div>
                        </div>
                        <div className="flex flex-wrap gap-2 mb-3">
                          {candidate.skills.slice(0, 5).map((skill, skillIndex) => (
                            <span key={skillIndex} className="skill-tag text-xs">
                              {skill}
                            </span>
                          ))}
                          {candidate.skills.length > 5 && (
                            <span className="text-xs text-surface-500 dark:text-surface-400">
                              +{candidate.skills.length - 5} more
                            </span>
                          )}
                        </div>
                        <p className="text-surface-600 dark:text-surface-300 text-sm line-clamp-2">
                          {candidate.summary}
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-col sm:flex-row lg:flex-col gap-3 lg:ml-4">
                      <button
                        onClick={() => handleViewProfile(candidate)}
                        className="px-6 py-3 bg-gradient-to-r from-primary to-secondary text-white rounded-xl font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-300"
                      >
                        View Profile
                      </button>
                      <button
                        onClick={() => handleContactCandidate(candidate)}
                        className="px-6 py-3 neu-button rounded-xl font-semibold text-surface-700 dark:text-surface-300 hover:text-primary transition-colors"
                      >
                        Contact
                      </button>
                      <button
                        onClick={() => handleSaveCandidate(candidate.id)}
                        className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                          savedCandidates.has(candidate.id)
                            ? 'bg-primary text-white'
                            : 'neu-button text-surface-700 dark:text-surface-300 hover:text-primary'
                        }`}
                      >
                        <div className="flex items-center space-x-2">
                          <ApperIcon 
                            name={savedCandidates.has(candidate.id) ? 'Heart' : 'Heart'} 
                            className={`h-4 w-4 ${savedCandidates.has(candidate.id) ? 'fill-current' : ''}`}
                          />
                          <span>{savedCandidates.has(candidate.id) ? 'Saved' : 'Save'}</span>
                        </div>
                      </button>
                    </div>
                  </div>
                  <div className="flex justify-between items-center mt-4 pt-4 border-t border-surface-200 dark:border-surface-700">
                    <span className="text-sm text-surface-500 dark:text-surface-400">
                      Available: {candidate.availability}
                    </span>
                    <span className="text-sm text-surface-500 dark:text-surface-400">
                      Last active: {candidate.lastActive}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>

            {filteredCandidates.length === 0 && (
              <div className="text-center py-12">
                <ApperIcon name="Users" className="h-16 w-16 text-surface-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-surface-900 dark:text-surface-100 mb-2">
                  No candidates found
                </h3>
                <p className="text-surface-600 dark:text-surface-300">
                  Try adjusting your search criteria to find more candidates.
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default SearchCandidates