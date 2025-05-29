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