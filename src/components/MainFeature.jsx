import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { toast } from 'react-toastify'
import ApperIcon from './ApperIcon'
import JobSearch from './JobSearch'
import ResumeBuilder from './ResumeBuilder'

const MainFeature = () => {
  const [activeTab, setActiveTab] = useState('search')
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

  const tabs = [
    { id: 'search', label: 'Find Jobs', icon: 'Search' },
    { id: 'resume', label: 'Resume Builder', icon: 'FileText' },
    { id: 'post', label: 'Post Job', icon: 'Plus' },
    { id: 'applications', label: 'My Applications', icon: 'Briefcase' },
    { id: 'assessments', label: 'Skill Assessments', icon: 'Award' },
    { id: 'profile', label: 'My Profile', icon: 'User' }
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
          <JobSearch key="search" profile={profile} />
        )}

        {/* Resume Builder Tab */}
        {activeTab === 'resume' && (
          <ResumeBuilder key="resume" />
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
              <div className="text-center py-12">
                <ApperIcon name="Briefcase" className="h-16 w-16 text-surface-300 mx-auto mb-4" />
                <p className="text-surface-600 dark:text-surface-400">
                  Applications management will be implemented here
                </p>
              </div>
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
            <div className="glass-card rounded-2xl p-6">
              <h3 className="text-2xl font-bold mb-6 text-surface-900 dark:text-surface-100">
                Skill Assessments
              </h3>
              <div className="text-center py-12">
                <ApperIcon name="Award" className="h-16 w-16 text-surface-300 mx-auto mb-4" />
                <p className="text-surface-600 dark:text-surface-400">
                  Skill assessments will be implemented here
                </p>
              </div>
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
                My Profile
              </h3>
              <div className="text-center py-12">
                <ApperIcon name="User" className="h-16 w-16 text-surface-300 mx-auto mb-4" />
                <p className="text-surface-600 dark:text-surface-400">
                  Profile management will be implemented here
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default MainFeature