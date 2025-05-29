import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Mail, Phone, MapPin, MessageCircle, Clock, Send, CheckCircle } from 'lucide-react'
import { toast } from 'react-toastify'
import { Link } from 'react-router-dom'

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    category: 'general',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const categories = [
    { value: 'general', label: 'General Inquiry' },
    { value: 'technical', label: 'Technical Support' },
    { value: 'billing', label: 'Billing Question' },
    { value: 'feedback', label: 'Feedback' },
    { value: 'partnership', label: 'Partnership' }
  ]

  const contactMethods = [
    {
      icon: Mail,
      title: 'Email Us',
      description: 'Send us an email and we\'ll respond within 24 hours',
      contact: 'support@talentbridge.com',
      color: 'text-primary'
    },
    {
      icon: Phone,
      title: 'Call Us',
      description: 'Speak with our support team directly',
      contact: '1-800-TALENT (825-368)',
      color: 'text-secondary'
    },
    {
      icon: MessageCircle,
      title: 'Live Chat',
      description: 'Chat with us in real-time for immediate help',
      contact: 'Available 9 AM - 6 PM EST',
      color: 'text-accent'
    }
  ]

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      toast.error('Please fill in all required fields')
      return
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      toast.error('Please enter a valid email address')
      return
    }

    setIsSubmitting(true)
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      setIsSubmitted(true)
      toast.success('Your message has been sent successfully!')
      
      // Reset form after successful submission
      setTimeout(() => {
        setFormData({
          name: '',
          email: '',
          subject: '',
          category: 'general',
          message: ''
        })
        setIsSubmitted(false)
      }, 3000)
    } catch (error) {
      toast.error('Failed to send message. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleLiveChat = () => {
    toast.info('Live chat feature coming soon!')
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
              <Link to="/help-center" className="text-surface-600 dark:text-surface-300 hover:text-primary transition-colors">
                Help Center
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
            Get in <span className="gradient-text">Touch</span>
          </h1>
          <p className="text-xl text-surface-600 dark:text-surface-400 max-w-3xl mx-auto">
            Have a question, need support, or want to share feedback? We're here to help and would love to hear from you.
          </p>
        </motion.div>

        {/* Contact Methods */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid md:grid-cols-3 gap-6 mb-16"
        >
          {contactMethods.map((method, index) => {
            const Icon = method.icon
            return (
              <div
                key={index}
                onClick={method.title === 'Live Chat' ? handleLiveChat : undefined}
                className={`bg-white dark:bg-surface-800 p-6 rounded-2xl shadow-soft hover:shadow-xl transition-all duration-300 border-2 border-transparent hover:border-primary/30 ${
                  method.title === 'Live Chat' ? 'cursor-pointer' : ''
                }`}
              >
                <Icon className={`${method.color} mb-4`} size={32} />
                <h3 className="text-xl font-semibold text-surface-900 dark:text-surface-100 mb-2">
                  {method.title}
                </h3>
                <p className="text-surface-600 dark:text-surface-400 mb-3">
                  {method.description}
                </p>
                <p className="font-medium text-surface-900 dark:text-surface-100">
                  {method.contact}
                </p>
              </div>
            )
          })}
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="bg-white dark:bg-surface-800 rounded-2xl shadow-soft p-8">
              <h3 className="text-2xl font-semibold text-surface-900 dark:text-surface-100 mb-6">
                Send us a Message
              </h3>
              
              {isSubmitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-8"
                >
                  <CheckCircle className="text-green-500 mx-auto mb-4" size={48} />
                  <h4 className="text-xl font-semibold text-surface-900 dark:text-surface-100 mb-2">
                    Message Sent!
                  </h4>
                  <p className="text-surface-600 dark:text-surface-400">
                    Thank you for contacting us. We'll get back to you within 24 hours.
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-surface-50 dark:bg-surface-700 border border-surface-300 dark:border-surface-600 rounded-xl text-surface-900 dark:text-surface-100 placeholder-surface-500 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
                        placeholder="Your full name"
                        required
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-surface-50 dark:bg-surface-700 border border-surface-300 dark:border-surface-600 rounded-xl text-surface-900 dark:text-surface-100 placeholder-surface-500 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
                        placeholder="your.email@example.com"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">
                      Category
                    </label>
                    <select
                      name="category"
                      value={formData.category}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-surface-50 dark:bg-surface-700 border border-surface-300 dark:border-surface-600 rounded-xl text-surface-900 dark:text-surface-100 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
                    >
                      {categories.map((category) => (
                        <option key={category.value} value={category.value}>
                          {category.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">
                      Subject *
                    </label>
                    <input
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-surface-50 dark:bg-surface-700 border border-surface-300 dark:border-surface-600 rounded-xl text-surface-900 dark:text-surface-100 placeholder-surface-500 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
                      placeholder="Brief description of your inquiry"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">
                      Message *
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      rows={6}
                      className="w-full px-4 py-3 bg-surface-50 dark:bg-surface-700 border border-surface-300 dark:border-surface-600 rounded-xl text-surface-900 dark:text-surface-100 placeholder-surface-500 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all resize-none"
                      placeholder="Please provide details about your question or concern..."
                      required
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full flex items-center justify-center gap-2 bg-primary text-white px-6 py-3 rounded-xl hover:bg-primary-dark transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send size={20} />
                        Send Message
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </motion.div>

          {/* Office Information */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="space-y-8"
          >
            {/* Office Location */}
            <div className="bg-white dark:bg-surface-800 rounded-2xl shadow-soft p-8">
              <h3 className="text-2xl font-semibold text-surface-900 dark:text-surface-100 mb-6">
                Our Office
              </h3>
              
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <MapPin className="text-primary mt-1" size={20} />
                  <div>
                    <h4 className="font-medium text-surface-900 dark:text-surface-100">
                      Headquarters
                    </h4>
                    <p className="text-surface-600 dark:text-surface-400">
                      123 Innovation Drive<br />
                      Tech Valley, CA 94025<br />
                      United States
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <Clock className="text-primary mt-1" size={20} />
                  <div>
                    <h4 className="font-medium text-surface-900 dark:text-surface-100">
                      Business Hours
                    </h4>
                    <p className="text-surface-600 dark:text-surface-400">
                      Monday - Friday: 9:00 AM - 6:00 PM PST<br />
                      Saturday: 10:00 AM - 2:00 PM PST<br />
                      Sunday: Closed
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div className="bg-white dark:bg-surface-800 rounded-2xl shadow-soft p-8">
              <h3 className="text-xl font-semibold text-surface-900 dark:text-surface-100 mb-6">
                Quick Links
              </h3>
              
              <div className="space-y-3">
                <Link
                  to="/help-center"
                  className="block text-primary hover:text-primary-dark transition-colors"
                >
                  → Help Center & FAQ
                </Link>
                <Link
                  to="/privacy-policy"
                  className="block text-primary hover:text-primary-dark transition-colors"
                >
                  → Privacy Policy
                </Link>
                <Link
                  to="/terms-of-service"
                  className="block text-primary hover:text-primary-dark transition-colors"
                >
                  → Terms of Service
                </Link>
                <Link
                  to="/browse-jobs"
                  className="block text-primary hover:text-primary-dark transition-colors"
                >
                  → Browse Jobs
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default ContactUs