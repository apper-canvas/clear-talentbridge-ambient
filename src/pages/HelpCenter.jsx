import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Search, ChevronDown, ChevronRight, MessageCircle, Phone, Mail, FileText, Users, Settings, Star } from 'lucide-react'
import { toast } from 'react-toastify'
import { Link } from 'react-router-dom'

const HelpCenter = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const [expandedFAQ, setExpandedFAQ] = useState(null)
  const [selectedCategory, setSelectedCategory] = useState('all')

  const categories = [
    { id: 'all', name: 'All Topics', icon: FileText },
    { id: 'account', name: 'Account & Profile', icon: Users },
    { id: 'jobs', name: 'Jobs & Applications', icon: MessageCircle },
    { id: 'technical', name: 'Technical Support', icon: Settings },
    { id: 'billing', name: 'Billing & Payments', icon: Star }
  ]

  const faqs = [
    {
      id: 1,
      category: 'account',
      question: 'How do I create a professional profile?',
      answer: 'To create a compelling profile, go to the Create Profile section and fill in your personal information, work experience, education, and skills. Make sure to add a professional photo and write a compelling summary that highlights your strengths and career objectives.'
    },
    {
      id: 2,
      category: 'account',
      question: 'How can I update my resume?',
      answer: 'You can update your resume by visiting the Upload Resume section. You can either upload a new file or edit your existing resume using our built-in editor. Make sure your resume is in PDF or DOC format and under 5MB in size.'
    },
    {
      id: 3,
      category: 'jobs',
      question: 'How do I apply for jobs?',
      answer: 'Browse available jobs in the Browse Jobs section, click on any job that interests you, and click the "Apply Now" button. You can attach a cover letter and your resume will be automatically included from your profile.'
    },
    {
      id: 4,
      category: 'jobs',
      question: 'How can I track my job applications?',
      answer: 'Go to the Applications tab in your dashboard to see all your submitted applications. You can track the status of each application, view employer responses, and manage your application history.'
    },
    {
      id: 5,
      category: 'technical',
      question: 'What browsers are supported?',
      answer: 'TalentBridge works best on modern browsers including Chrome, Firefox, Safari, and Edge. We recommend keeping your browser updated to the latest version for the best experience.'
    },
    {
      id: 6,
      category: 'technical',
      question: 'Why can\'t I upload my resume?',
      answer: 'Make sure your resume file is in PDF or DOC format and under 5MB in size. Also, check your internet connection and try refreshing the page. If the problem persists, contact our support team.'
    },
    {
      id: 7,
      category: 'jobs',
      question: 'How do skill assessments work?',
      answer: 'Skill assessments are interactive quizzes that test your knowledge in specific areas. Complete assessments to earn verified skill badges that appear on your profile and help employers find you for relevant positions.'
    },
    {
      id: 8,
      category: 'billing',
      question: 'Is TalentBridge free to use?',
      answer: 'Yes! TalentBridge is completely free for job seekers. You can create profiles, apply for jobs, take skill assessments, and use all core features at no cost.'
    }
  ]

  const filteredFAQs = faqs.filter(faq => {
    const matchesCategory = selectedCategory === 'all' || faq.category === selectedCategory
    const matchesSearch = faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  const handleSearch = (e) => {
    setSearchQuery(e.target.value)
  }

  const toggleFAQ = (faqId) => {
    setExpandedFAQ(expandedFAQ === faqId ? null : faqId)
  }

  const handleContactSupport = () => {
    toast.info('Redirecting to contact form...')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-surface-50 via-blue-50 to-purple-50 dark:from-surface-900 dark:via-surface-800 dark:to-surface-900">
      {/* Header */}
      <div className="bg-white/80 dark:bg-surface-800/80 backdrop-blur-md border-b border-surface-200 dark:border-surface-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <Link to="/" className="text-2xl font-bold gradient-text">
              TalentBridge
            </Link>
            <nav className="hidden md:flex space-x-8">
              <Link to="/" className="text-surface-600 dark:text-surface-300 hover:text-primary transition-colors">
                Home
              </Link>
              <Link to="/browse-jobs" className="text-surface-600 dark:text-surface-300 hover:text-primary transition-colors">
                Browse Jobs
              </Link>
              <Link to="/contact-us" className="text-surface-600 dark:text-surface-300 hover:text-primary transition-colors">
                Contact
              </Link>
            </nav>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-surface-900 dark:text-surface-100 mb-4">
            How can we <span className="gradient-text">help you?</span>
          </h1>
          <p className="text-xl text-surface-600 dark:text-surface-400 mb-8">
            Find answers to common questions or get in touch with our support team
          </p>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-surface-400" size={20} />
            <input
              type="text"
              placeholder="Search for help articles..."
              value={searchQuery}
              onChange={handleSearch}
              className="w-full pl-12 pr-4 py-4 bg-white dark:bg-surface-800 border border-surface-300 dark:border-surface-600 rounded-2xl text-surface-900 dark:text-surface-100 placeholder-surface-500 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
            />
          </div>
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid md:grid-cols-3 gap-6 mb-16"
        >
          <Link to="/contact-us" className="group">
            <div className="bg-white dark:bg-surface-800 p-6 rounded-2xl shadow-soft hover:shadow-xl transition-all duration-300 border-2 border-transparent hover:border-primary/30">
              <MessageCircle className="text-primary mb-4" size={32} />
              <h3 className="text-xl font-semibold text-surface-900 dark:text-surface-100 mb-2">
                Contact Support
              </h3>
              <p className="text-surface-600 dark:text-surface-400">
                Get help from our support team via email or live chat
              </p>
            </div>
          </Link>

          <div onClick={handleContactSupport} className="group cursor-pointer">
            <div className="bg-white dark:bg-surface-800 p-6 rounded-2xl shadow-soft hover:shadow-xl transition-all duration-300 border-2 border-transparent hover:border-secondary/30">
              <Phone className="text-secondary mb-4" size={32} />
              <h3 className="text-xl font-semibold text-surface-900 dark:text-surface-100 mb-2">
                Phone Support
              </h3>
              <p className="text-surface-600 dark:text-surface-400">
                Call us at 1-800-TALENT for immediate assistance
              </p>
            </div>
          </div>

          <div onClick={handleContactSupport} className="group cursor-pointer">
            <div className="bg-white dark:bg-surface-800 p-6 rounded-2xl shadow-soft hover:shadow-xl transition-all duration-300 border-2 border-transparent hover:border-accent/30">
              <Mail className="text-accent mb-4" size={32} />
              <h3 className="text-xl font-semibold text-surface-900 dark:text-surface-100 mb-2">
                Email Support
              </h3>
              <p className="text-surface-600 dark:text-surface-400">
                Send us an email at support@talentbridge.com
              </p>
            </div>
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Categories Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-1"
          >
            <div className="bg-white dark:bg-surface-800 rounded-2xl shadow-soft p-6">
              <h3 className="text-lg font-semibold text-surface-900 dark:text-surface-100 mb-4">
                Categories
              </h3>
              <div className="space-y-2">
                {categories.map((category) => {
                  const Icon = category.icon
                  return (
                    <button
                      key={category.id}
                      onClick={() => setSelectedCategory(category.id)}
                      className={`w-full flex items-center gap-3 p-3 rounded-xl transition-all duration-200 text-left ${
                        selectedCategory === category.id
                          ? 'bg-primary/10 text-primary border-2 border-primary/20'
                          : 'text-surface-600 dark:text-surface-400 hover:bg-surface-100 dark:hover:bg-surface-700'
                      }`}
                    >
                      <Icon size={18} />
                      <span className="font-medium">{category.name}</span>
                    </button>
                  )
                })}
              </div>
            </div>
          </motion.div>

          {/* FAQ Section */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="lg:col-span-3"
          >
            <div className="bg-white dark:bg-surface-800 rounded-2xl shadow-soft p-6">
              <h3 className="text-2xl font-semibold text-surface-900 dark:text-surface-100 mb-6">
                Frequently Asked Questions
              </h3>
              
              {filteredFAQs.length === 0 ? (
                <div className="text-center py-12">
                  <FileText className="mx-auto text-surface-400 mb-4" size={48} />
                  <p className="text-surface-600 dark:text-surface-400">
                    No articles found matching your search.
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {filteredFAQs.map((faq) => (
                    <motion.div
                      key={faq.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="border border-surface-200 dark:border-surface-700 rounded-xl overflow-hidden"
                    >
                      <button
                        onClick={() => toggleFAQ(faq.id)}
                        className="w-full flex items-center justify-between p-4 text-left hover:bg-surface-50 dark:hover:bg-surface-700 transition-colors"
                      >
                        <span className="font-medium text-surface-900 dark:text-surface-100">
                          {faq.question}
                        </span>
                        {expandedFAQ === faq.id ? (
                          <ChevronDown className="text-primary" size={20} />
                        ) : (
                          <ChevronRight className="text-surface-400" size={20} />
                        )}
                      </button>
                      
                      {expandedFAQ === faq.id && (
                        <motion.div
                          initial={{ height: 0 }}
                          animate={{ height: 'auto' }}
                          exit={{ height: 0 }}
                          className="overflow-hidden"
                        >
                          <div className="p-4 pt-0 text-surface-600 dark:text-surface-400 leading-relaxed">
                            {faq.answer}
                          </div>
                        </motion.div>
                      )}
                    </motion.div>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        </div>

        {/* Still Need Help Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-16 text-center"
        >
          <div className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-2xl p-8">
            <h3 className="text-2xl font-semibold text-surface-900 dark:text-surface-100 mb-4">
              Still need help?
            </h3>
            <p className="text-surface-600 dark:text-surface-400 mb-6">
              Can't find what you're looking for? Our support team is here to help.
            </p>
            <Link
              to="/contact-us"
              className="inline-flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-xl hover:bg-primary-dark transition-colors font-medium"
            >
              <MessageCircle size={20} />
              Contact Support
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default HelpCenter