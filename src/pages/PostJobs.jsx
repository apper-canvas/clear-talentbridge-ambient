import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { toast } from 'react-toastify'
import ApperIcon from '../components/ApperIcon'

const PostJobs = () => {
  const [formData, setFormData] = useState({
    title: '',
    company: '',
    location: '',
    type: '',
    experience: '',
    salary: {
      min: '',
      max: '',
      currency: 'USD'
    },
    description: '',
    requirements: '',
    benefits: '',
    skills: [],
    newSkill: '',
    remote: false,
    urgent: false,
    category: '',
    applicationDeadline: ''
  })

  const [currentStep, setCurrentStep] = useState(1)
  const totalSteps = 3

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleSalaryChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      salary: { ...prev.salary, [field]: value }
    }))
  }

  const addSkill = () => {
    if (formData.newSkill.trim() && !formData.skills.includes(formData.newSkill.trim())) {
      setFormData(prev => ({
        ...prev,
        skills: [...prev.skills, prev.newSkill.trim()],
        newSkill: ''
      }))
    }
  }

  const removeSkill = (skillToRemove) => {
    setFormData(prev => ({
      ...prev,
      skills: prev.skills.filter(skill => skill !== skillToRemove)
    }))
  }

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    toast.success('Job posted successfully!')
    console.log('Job data:', formData)
    // Reset form
    setFormData({
      title: '',
      company: '',
      location: '',
      type: '',
      experience: '',
      salary: { min: '', max: '', currency: 'USD' },
      description: '',
      requirements: '',
      benefits: '',
      skills: [],
      newSkill: '',
      remote: false,
      urgent: false,
      category: '',
      applicationDeadline: ''
    })
    setCurrentStep(1)
  }

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <h3 className="text-2xl font-semibold text-surface-900 dark:text-surface-100 mb-6">
              Basic Information
            </h3>
            
            <div>
              <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">
                Job Title *
              </label>
              <input
                type="text"
                placeholder="e.g., Senior React Developer"
                value={formData.title}
                onChange={(e) => handleInputChange('title', e.target.value)}
                className="w-full px-4 py-3 bg-white dark:bg-surface-800 border border-surface-200 dark:border-surface-700 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                required
              />
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">
                  Company Name *
                </label>
                <input
                  type="text"
                  placeholder="Your company name"
                  value={formData.company}
                  onChange={(e) => handleInputChange('company', e.target.value)}
                  className="w-full px-4 py-3 bg-white dark:bg-surface-800 border border-surface-200 dark:border-surface-700 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">
                  Location *
                </label>
                <input
                  type="text"
                  placeholder="City, State or Remote"
                  value={formData.location}
                  onChange={(e) => handleInputChange('location', e.target.value)}
                  className="w-full px-4 py-3 bg-white dark:bg-surface-800 border border-surface-200 dark:border-surface-700 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                  required
                />
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">
                  Job Type *
                </label>
                <select
                  value={formData.type}
                  onChange={(e) => handleInputChange('type', e.target.value)}
                  className="w-full px-4 py-3 bg-white dark:bg-surface-800 border border-surface-200 dark:border-surface-700 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                  required
                >
                  <option value="">Select job type</option>
                  <option value="Full-time">Full-time</option>
                  <option value="Part-time">Part-time</option>
                  <option value="Contract">Contract</option>
                  <option value="Freelance">Freelance</option>
                  <option value="Internship">Internship</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">
                  Experience Level *
                </label>
                <select
                  value={formData.experience}
                  onChange={(e) => handleInputChange('experience', e.target.value)}
                  className="w-full px-4 py-3 bg-white dark:bg-surface-800 border border-surface-200 dark:border-surface-700 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                  required
                >
                  <option value="">Select experience level</option>
                  <option value="Entry-level">Entry-level</option>
                  <option value="Mid-level">Mid-level</option>
                  <option value="Senior">Senior</option>
                  <option value="Executive">Executive</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">
                  Category *
                </label>
                <select
                  value={formData.category}
                  onChange={(e) => handleInputChange('category', e.target.value)}
                  className="w-full px-4 py-3 bg-white dark:bg-surface-800 border border-surface-200 dark:border-surface-700 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                  required
                >
                  <option value="">Select category</option>
                  <option value="Technology">Technology</option>
                  <option value="Design">Design</option>
                  <option value="Marketing">Marketing</option>
                  <option value="Sales">Sales</option>
                  <option value="Finance">Finance</option>
                  <option value="Healthcare">Healthcare</option>
                  <option value="Education">Education</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">
                Salary Range
              </label>
              <div className="grid grid-cols-3 gap-2">
                <input
                  type="number"
                  placeholder="Min salary"
                  value={formData.salary.min}
                  onChange={(e) => handleSalaryChange('min', e.target.value)}
                  className="px-4 py-3 bg-white dark:bg-surface-800 border border-surface-200 dark:border-surface-700 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                />
                <input
                  type="number"
                  placeholder="Max salary"
                  value={formData.salary.max}
                  onChange={(e) => handleSalaryChange('max', e.target.value)}
                  className="px-4 py-3 bg-white dark:bg-surface-800 border border-surface-200 dark:border-surface-700 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                />
                <select
                  value={formData.salary.currency}
                  onChange={(e) => handleSalaryChange('currency', e.target.value)}
                  className="px-4 py-3 bg-white dark:bg-surface-800 border border-surface-200 dark:border-surface-700 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                >
                  <option value="USD">USD</option>
                  <option value="EUR">EUR</option>
                  <option value="GBP">GBP</option>
                  <option value="CAD">CAD</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">
                Application Deadline
              </label>
              <input
                type="date"
                value={formData.applicationDeadline}
                onChange={(e) => handleInputChange('applicationDeadline', e.target.value)}
                className="w-full px-4 py-3 bg-white dark:bg-surface-800 border border-surface-200 dark:border-surface-700 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
              />
            </div>

            <div className="space-y-4">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="remote"
                  checked={formData.remote}
                  onChange={(e) => handleInputChange('remote', e.target.checked)}
                  className="h-4 w-4 text-primary focus:ring-primary border-surface-300 rounded"
                />
                <label htmlFor="remote" className="ml-2 text-surface-700 dark:text-surface-300">
                  Remote work available
                </label>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="urgent"
                  checked={formData.urgent}
                  onChange={(e) => handleInputChange('urgent', e.target.checked)}
                  className="h-4 w-4 text-primary focus:ring-primary border-surface-300 rounded"
                />
                <label htmlFor="urgent" className="ml-2 text-surface-700 dark:text-surface-300">
                  Urgent hiring
                </label>
              </div>
            </div>
          </div>
        )

      case 2:
        return (
          <div className="space-y-6">
            <h3 className="text-2xl font-semibold text-surface-900 dark:text-surface-100 mb-6">
              Job Description & Requirements
            </h3>
            
            <div>
              <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">
                Job Description *
              </label>
              <textarea
                rows={6}
                placeholder="Describe the role, responsibilities, and what makes this position exciting..."
                value={formData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                className="w-full px-4 py-3 bg-white dark:bg-surface-800 border border-surface-200 dark:border-surface-700 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all resize-none"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">
                Requirements *
              </label>
              <textarea
                rows={5}
                placeholder="List the required qualifications, experience, and technical skills..."
                value={formData.requirements}
                onChange={(e) => handleInputChange('requirements', e.target.value)}
                className="w-full px-4 py-3 bg-white dark:bg-surface-800 border border-surface-200 dark:border-surface-700 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all resize-none"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">
                Benefits & Perks
              </label>
              <textarea
                rows={4}
                placeholder="Describe the benefits, perks, and what makes your company a great place to work..."
                value={formData.benefits}
                onChange={(e) => handleInputChange('benefits', e.target.value)}
                className="w-full px-4 py-3 bg-white dark:bg-surface-800 border border-surface-200 dark:border-surface-700 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all resize-none"
              />
            </div>
          </div>
        )

      case 3:
        return (
          <div className="space-y-6">
            <h3 className="text-2xl font-semibold text-surface-900 dark:text-surface-100 mb-6">
              Skills & Final Details
            </h3>
            
            <div>
              <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">
                Required Skills
              </label>
              <div className="flex gap-2 mb-3">
                <input
                  type="text"
                  placeholder="Add a skill"
                  value={formData.newSkill}
                  onChange={(e) => handleInputChange('newSkill', e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addSkill())}
                  className="flex-1 px-4 py-3 bg-white dark:bg-surface-800 border border-surface-200 dark:border-surface-700 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                />
                <button
                  type="button"
                  onClick={addSkill}
                  className="px-6 py-3 bg-gradient-to-r from-primary to-secondary text-white rounded-xl font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-300"
                >
                  Add
                </button>
              </div>
              
              {formData.skills.length > 0 && (
                <div>
                  <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">
                    Added Skills
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {formData.skills.map((skill, index) => (
                      <div key={index} className="skill-tag group cursor-pointer" onClick={() => removeSkill(skill)}>
                        <span>{skill}</span>
                        <ApperIcon name="X" className="h-3 w-3 ml-1 group-hover:text-red-500" />
                      </div>
                    ))}
                  </div>
                  <p className="text-xs text-surface-500 dark:text-surface-400 mt-2">
                    Click on a skill to remove it
                  </p>
                </div>
              )}
            </div>

            {/* Job Preview */}
            <div className="bg-surface-50 dark:bg-surface-800/50 rounded-xl p-6">
              <h4 className="text-lg font-semibold text-surface-900 dark:text-surface-100 mb-4">
                Job Preview
              </h4>
              <div className="space-y-3 text-sm">
                <div><span className="font-medium">Title:</span> {formData.title || 'Not specified'}</div>
                <div><span className="font-medium">Company:</span> {formData.company || 'Not specified'}</div>
                <div><span className="font-medium">Location:</span> {formData.location || 'Not specified'}</div>
                <div><span className="font-medium">Type:</span> {formData.type || 'Not specified'}</div>
                <div><span className="font-medium">Experience:</span> {formData.experience || 'Not specified'}</div>
                <div><span className="font-medium">Category:</span> {formData.category || 'Not specified'}</div>
                {(formData.salary.min || formData.salary.max) && (
                  <div>
                    <span className="font-medium">Salary:</span> 
                    {formData.salary.min && `${formData.salary.currency} ${formData.salary.min}`}
                    {formData.salary.min && formData.salary.max && ' - '}
                    {formData.salary.max && `${formData.salary.currency} ${formData.salary.max}`}
                  </div>
                )}
                {formData.skills.length > 0 && (
                  <div>
                    <span className="font-medium">Skills:</span> {formData.skills.join(', ')}
                  </div>
                )}
                {formData.remote && <div className="text-primary font-medium">✓ Remote work available</div>}
                {formData.urgent && <div className="text-red-500 font-medium">🔥 Urgent hiring</div>}
              </div>
            </div>
          </div>
        )

      default:
        return null
    }
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

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <motion.div 
          className="text-center mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl font-bold mb-4">
            Post a <span className="gradient-text">Job</span>
          </h1>
          <p className="text-lg text-surface-600 dark:text-surface-300">
            Find the perfect candidate for your team.
          </p>
        </motion.div>

        {/* Progress Bar */}
        <motion.div 
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <div className="flex justify-between items-center mb-4">
            {Array.from({ length: totalSteps }, (_, index) => {
              const stepNumber = index + 1
              const isActive = stepNumber === currentStep
              const isCompleted = stepNumber < currentStep
              
              return (
                <div key={stepNumber} className="flex items-center">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-all ${
                    isActive 
                      ? 'bg-gradient-to-r from-primary to-secondary text-white' 
                      : isCompleted 
                        ? 'bg-green-500 text-white'
                        : 'bg-surface-200 dark:bg-surface-700 text-surface-600 dark:text-surface-400'
                  }`}>
                    {isCompleted ? (
                      <ApperIcon name="Check" className="h-5 w-5" />
                    ) : (
                      stepNumber
                    )}
                  </div>
                  {stepNumber < totalSteps && (
                    <div className={`w-16 h-1 mx-2 rounded transition-all ${
                      isCompleted ? 'bg-green-500' : 'bg-surface-200 dark:bg-surface-700'
                    }`} />
                  )}
                </div>
              )
            })}
          </div>
          <div className="text-center">
            <span className="text-sm text-surface-600 dark:text-surface-400">
              Step {currentStep} of {totalSteps}
            </span>
          </div>
        </motion.div>

        {/* Form */}
        <motion.div 
          className="glass-card rounded-2xl p-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <form onSubmit={handleSubmit}>
            {renderStep()}

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-8">
              <button
                type="button"
                onClick={prevStep}
                disabled={currentStep === 1}
                className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                  currentStep === 1
                    ? 'bg-surface-200 dark:bg-surface-700 text-surface-400 cursor-not-allowed'
                    : 'neu-button text-surface-700 dark:text-surface-300 hover:text-primary'
                }`}
              >
                Previous
              </button>
              
              {currentStep === totalSteps ? (
                <button
                  type="submit"
                  className="px-8 py-3 bg-gradient-to-r from-primary to-secondary text-white rounded-xl font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-300"
                >
                  Post Job
                </button>
              ) : (
                <button
                  type="button"
                  onClick={nextStep}
                  className="px-6 py-3 bg-gradient-to-r from-primary to-secondary text-white rounded-xl font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-300"
                >
                  Next
                </button>
              )}
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  )
}

export default PostJobs