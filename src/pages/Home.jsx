import { Link } from 'react-router-dom'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import MainFeature from '../components/MainFeature'
import ApperIcon from '../components/ApperIcon'

const Home = () => {
  const [darkMode, setDarkMode] = useState(false)

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [darkMode])

  const stats = [
    { number: '10K+', label: 'Active Jobs', icon: 'Briefcase' },
    { number: '50K+', label: 'Job Seekers', icon: 'Users' },
    { number: '5K+', label: 'Companies', icon: 'Building2' },
    { number: '98%', label: 'Success Rate', icon: 'TrendingUp' }
  ]

  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 glass-card border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <motion.div 
              className="flex items-center space-x-3"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center">
                <ApperIcon name="Zap" className="h-6 w-6 text-white" />
              </div>
              <span className="text-xl font-bold gradient-text">TalentBridge</span>
            </motion.div>

            <div className="flex items-center space-x-4">
              <button
                onClick={() => setDarkMode(!darkMode)}
                className="p-2 rounded-xl neu-button"
              >
                <ApperIcon 
                  name={darkMode ? 'Sun' : 'Moon'} 
                  className="h-5 w-5 text-surface-600 dark:text-surface-300" 
                />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <motion.h1 
              className="text-4xl sm:text-5xl lg:text-7xl font-bold mb-6 leading-tight"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              Bridge Talent with
              <span className="gradient-text block mt-2">Opportunity</span>
            </motion.h1>
            
            <motion.p 
              className="text-lg sm:text-xl text-surface-600 dark:text-surface-300 max-w-3xl mx-auto mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Connect with your dream job or find the perfect candidate through our intelligent matching platform. 
              Experience seamless job placement like never before.
            </motion.p>

            <motion.div 
              className="flex flex-col sm:flex-row gap-4 justify-center mb-16"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <button className="px-8 py-4 bg-gradient-to-r from-primary to-secondary text-white rounded-2xl font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300">
                <div className="flex items-center space-x-2">
                  <ApperIcon name="Search" className="h-5 w-5" />
                  <span>Find Jobs</span>
                </div>
              </button>
              <button className="px-8 py-4 neu-button rounded-2xl font-semibold text-surface-700 dark:text-surface-300">
                <div className="flex items-center space-x-2">
                  <ApperIcon name="Plus" className="h-5 w-5" />
                  <span>Post a Job</span>
                </div>
              </button>
            </motion.div>

            {/* Stats */}
            <motion.div 
              className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-8 mb-16"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              {stats.map((stat, index) => (
                <div key={index} className="text-center p-4 sm:p-6 glass-card rounded-2xl">
                  <div className="w-12 h-12 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-xl flex items-center justify-center mx-auto mb-3">
                    <ApperIcon name={stat.icon} className="h-6 w-6 text-primary" />
                  </div>
                  <div className="text-2xl sm:text-3xl font-bold text-surface-900 dark:text-surface-100">
                    {stat.number}
                  </div>
                  <div className="text-sm text-surface-600 dark:text-surface-400">
                    {stat.label}
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Main Feature */}
          <MainFeature />
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-primary/5 to-secondary/5">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Why Choose <span className="gradient-text">TalentBridge</span>?
            </h2>
            <p className="text-lg text-surface-600 dark:text-surface-300 max-w-2xl mx-auto">
              Our platform offers cutting-edge features designed to make job matching effortless and effective.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: 'Brain',
                title: 'AI-Powered Matching',
                description: 'Our intelligent algorithms match candidates with perfect job opportunities based on skills, experience, and preferences.'
              },
              {
                icon: 'MessageSquare',
                title: 'Real-Time Communication',
                description: 'Connect instantly with employers and candidates through our integrated messaging system.'
              },
              {
                icon: 'BarChart3',
                title: 'Application Tracking',
                description: 'Monitor your job applications and recruitment process with detailed analytics and progress tracking.'
              },
              {
                icon: 'Shield',
                title: 'Verified Profiles',
                description: 'All profiles and companies are verified to ensure authenticity and build trust in our community.'
              },
              {
                icon: 'Clock',
                title: 'Quick Placement',
                description: 'Streamlined process that reduces time-to-hire and helps candidates find jobs faster.'
              },
              {
                icon: 'Award',
                title: 'Skill Assessment',
                description: 'Comprehensive skill evaluation tools to showcase your abilities and stand out from the crowd.'
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                className="p-6 glass-card rounded-2xl floating-card"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <div className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center mb-4">
                  <ApperIcon name={feature.icon} className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-surface-900 dark:text-surface-100">
                  {feature.title}
                </h3>
                <p className="text-surface-600 dark:text-surface-300">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 px-4 sm:px-6 lg:px-8 bg-surface-900 dark:bg-surface-950">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center">
                  <ApperIcon name="Zap" className="h-6 w-6 text-white" />
                </div>
                <span className="text-xl font-bold text-white">TalentBridge</span>
              </div>
              <p className="text-surface-400">
                Connecting talent with opportunity through intelligent job matching.
              </p>
            </div>
            
            {[
              {
                title: 'For Job Seekers',
                links: ['Browse Jobs', 'Create Profile', 'Upload Resume', 'Skill Assessment']
              },
              {
                title: 'For Employers',
                links: ['Post Jobs', 'Search Candidates', 'Manage Applications', 'Company Profile']
              },
              {
                title: 'Support',
                links: ['Help Center', 'Contact Us', 'Privacy Policy', 'Terms of Service']
              }
            ].map((section, index) => (
              <div key={index}>
                <h4 className="text-lg font-semibold text-white mb-4">{section.title}</h4>
                <ul className="space-y-2">
                  {section.links.map((link, linkIndex) => (
                    <li key={linkIndex}>
                      <Link to={link === 'Browse Jobs' ? '/browse-jobs' : link === 'Create Profile' ? '/create-profile' : link === 'Upload Resume' ? '/upload-resume' : link === 'Skill Assessment' ? '/skill-assessment' : link === 'Post Jobs' ? '/post-jobs' : link === 'Search Candidates' ? '/search-candidates' : link === 'Manage Applications' ? '/manage-applications' : link === 'Company Profile' ? '/company-profile' : link === 'Help Center' ? '/help-center' : link === 'Contact Us' ? '/contact-us' : link === 'Privacy Policy' ? '/privacy-policy' : '/terms-of-service'} className="text-surface-400 hover:text-primary transition-colors">
                        {link}
                      </Link>

                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          
          <div className="border-t border-surface-800 pt-8 text-center">
            <p className="text-surface-400">
              © 2024 TalentBridge. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Home