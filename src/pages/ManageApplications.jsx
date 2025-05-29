import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { toast } from 'react-toastify'
import ApperIcon from '../components/ApperIcon'

const ManageApplications = () => {
  const [applications, setApplications] = useState([])
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('all')
  const [selectedApplication, setSelectedApplication] = useState(null)
  const [showStatusModal, setShowStatusModal] = useState(false)
  const [newStatus, setNewStatus] = useState('')
  const [filters, setFilters] = useState({
    search: '',
    position: '',
    status: ''
  })

  // Mock applications data
  const mockApplications = [
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
  ]

  const statusConfig = {
    applied: { label: 'Applied', color: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400', icon: 'FileText' },
    under_review: { label: 'Under Review', color: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400', icon: 'Eye' },
    interview_scheduled: { label: 'Interview Scheduled', color: 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400', icon: 'Calendar' },
    offer_sent: { label: 'Offer Sent', color: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400', icon: 'Gift' },
    hired: { label: 'Hired', color: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400', icon: 'CheckCircle' },
    rejected: { label: 'Rejected', color: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400', icon: 'XCircle' }
  }

  useEffect(() => {
    // Simulate loading applications
    setTimeout(() => {
      setApplications(mockApplications)
      setLoading(false)
    }, 1000)
  }, [])

  const filteredApplications = applications.filter(app => {
    const matchesTab = activeTab === 'all' || app.status === activeTab
    const matchesSearch = app.candidateName.toLowerCase().includes(filters.search.toLowerCase()) ||
                         app.candidateEmail.toLowerCase().includes(filters.search.toLowerCase())
    const matchesPosition = filters.position === '' || app.position.toLowerCase().includes(filters.position.toLowerCase())
    const matchesStatus = filters.status === '' || app.status === filters.status
    
    return matchesTab && matchesSearch && matchesPosition && matchesStatus
  })

  const updateApplicationStatus = (applicationId, status) => {
    setApplications(prev => prev.map(app => 
      app.id === applicationId ? { ...app, status } : app
    ))
    toast.success('Application status updated successfully!')
    setShowStatusModal(false)
    setSelectedApplication(null)
  }

  const handleStatusChange = (application, status) => {
    setSelectedApplication(application)
    setNewStatus(status)
    setShowStatusModal(true)
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

  const counts = getApplicationCounts()

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
            Manage <span className="gradient-text">Applications</span>
          </h1>
          <p className="text-lg text-surface-600 dark:text-surface-300 max-w-2xl mx-auto">
            Track and manage all job applications for your open positions.
          </p>
        </motion.div>

        {/* Stats Cards */}
        <motion.div 
          className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          {Object.entries(counts).map(([status, count]) => {
            const config = statusConfig[status] || { label: 'All', color: 'bg-surface-100 text-surface-700 dark:bg-surface-700 dark:text-surface-300', icon: 'FileText' }
            const isActive = activeTab === status
            
            return (
              <button
                key={status}
                onClick={() => setActiveTab(status)}
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
        </motion.div>

        {/* Filters */}
        <motion.div 
          className="glass-card rounded-2xl p-6 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
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
                  value={filters.search}
                  onChange={(e) => setFilters({...filters, search: e.target.value})}
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
                value={filters.position}
                onChange={(e) => setFilters({...filters, position: e.target.value})}
                className="w-full px-4 py-3 bg-white dark:bg-surface-800 border border-surface-200 dark:border-surface-700 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">
                Status
              </label>
              <select
                value={filters.status}
                onChange={(e) => setFilters({...filters, status: e.target.value})}
                className="w-full px-4 py-3 bg-white dark:bg-surface-800 border border-surface-200 dark:border-surface-700 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
              >
                <option value="">All Statuses</option>
                {Object.entries(statusConfig).map(([status, config]) => (
                  <option key={status} value={status}>{config.label}</option>
                ))}
              </select>
            </div>
          </div>
        </motion.div>

        {/* Applications List */}
        {loading ? (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          </div>
        ) : (
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
                      <button className="px-4 py-2 neu-button rounded-xl text-sm font-medium text-surface-700 dark:text-surface-300 hover:text-primary transition-colors">
                        <ApperIcon name="Eye" className="h-4 w-4 inline mr-1" />
                        View
                      </button>
                      <button className="px-4 py-2 neu-button rounded-xl text-sm font-medium text-surface-700 dark:text-surface-300 hover:text-primary transition-colors">
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
                  {activeTab === 'all' 
                    ? 'No applications match your current filters.' 
                    : `No applications with status "${statusConfig[activeTab]?.label || activeTab}".`}
                </p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Status Update Modal */}
      {showStatusModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <motion.div 
            className="bg-white dark:bg-surface-800 rounded-2xl p-6 max-w-md w-full"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            <h3 className="text-lg font-semibold text-surface-900 dark:text-surface-100 mb-4">
              Update Application Status
            </h3>
            <p className="text-surface-600 dark:text-surface-300 mb-6">
              Are you sure you want to update {selectedApplication?.candidateName}'s application status to "{statusConfig[newStatus]?.label}"?
            </p>
            <div className="flex space-x-3">
              <button
                onClick={() => setShowStatusModal(false)}
                className="flex-1 px-4 py-2 neu-button rounded-xl font-medium text-surface-700 dark:text-surface-300"
              >
                Cancel
              </button>
              <button
                onClick={() => updateApplicationStatus(selectedApplication.id, newStatus)}
                className="flex-1 px-4 py-2 bg-gradient-to-r from-primary to-secondary text-white rounded-xl font-medium"
              >
                Update
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  )
}

export default ManageApplications