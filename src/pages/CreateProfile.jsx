import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { toast } from 'react-toastify'
import ApperIcon from '../components/ApperIcon'

const CreateProfile = () => {
  const [isProfileCreated, setIsProfileCreated] = useState(false)

  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState({
    // Personal Information
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    location: '',
    profileImage: null,
    
    // Professional Information
    title: '',
    summary: '',
    experience: '',
    industry: '',
    
    // Skills
    skills: [],
    newSkill: '',
    
    // Education
    education: [{
      degree: '',
      institution: '',
      year: '',
      gpa: ''
    }],
    
    // Work Experience
    workExperience: [{
      company: '',
      position: '',
      duration: '',
      description: ''
    }],
    
    // Preferences
    jobType: '',
    salaryRange: '',
    remoteWork: false,
    relocation: false
  })

  const totalSteps = 5

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleArrayFieldChange = (arrayName, index, field, value) => {
    setFormData(prev => ({
      ...prev,
      [arrayName]: prev[arrayName].map((item, i) => 
        i === index ? { ...item, [field]: value } : item
      )
    }))
  }

  const addArrayField = (arrayName) => {
    const newField = arrayName === 'education' 
      ? { degree: '', institution: '', year: '', gpa: '' }
      : { company: '', position: '', duration: '', description: '' }
    
    setFormData(prev => ({
      ...prev,
      [arrayName]: [...prev[arrayName], newField]
    }))
  }

  const removeArrayField = (arrayName, index) => {
    setFormData(prev => ({
      ...prev,
      [arrayName]: prev[arrayName].filter((_, i) => i !== index)
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

  const handleImageUpload = (e) => {
    const file = e.target.files[0]
    if (file) {
      setFormData(prev => ({ ...prev, profileImage: file }))
      toast.success('Profile image uploaded successfully!')
    }
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
    
    // Validate required fields
    const requiredFields = {
      firstName: 'First Name',
      lastName: 'Last Name',
      email: 'Email Address',
      location: 'Location',
      title: 'Professional Title',
      summary: 'Professional Summary',
      experience: 'Years of Experience',
      industry: 'Industry'
    }
    
    const missingFields = []
    Object.entries(requiredFields).forEach(([field, label]) => {
      if (!formData[field] || formData[field].trim() === '') {
        missingFields.push(label)
      }
    })
    
    if (missingFields.length > 0) {
      toast.error(`Please fill in required fields: ${missingFields.join(', ')}`)
      return
    }
    
    // Save profile data
    try {
      // Simulate saving to backend (using localStorage for demo)
      const profileData = {
        ...formData,
        createdAt: new Date().toISOString(),
        id: Date.now().toString()
      }
      
      localStorage.setItem('userProfile', JSON.stringify(profileData))
      
      setIsProfileCreated(true)
      toast.success('Profile created successfully!')
    } catch (error) {
      toast.error('Failed to create profile. Please try again.')
      console.error('Profile creation error:', error)
    }
  }


  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <h3 className="text-2xl font-semibold text-surface-900 dark:text-surface-100 mb-6">
              Personal Information
            </h3>
            
            {/* Profile Image */}
            <div className="text-center">
              <div className="w-24 h-24 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                {formData.profileImage ? (
                  <img 
                    src={URL.createObjectURL(formData.profileImage)} 
                    alt="Profile" 
                    className="w-24 h-24 rounded-full object-cover"
                  />
                ) : (
                  <ApperIcon name="User" className="h-12 w-12 text-primary" />
                )}
              </div>
              <label className="cursor-pointer">
                <span className="px-4 py-2 neu-button rounded-xl font-medium text-surface-700 dark:text-surface-300 hover:text-primary transition-colors">
                  Upload Profile Image
                </span>
                <input 
                  type="file" 
                  accept="image/*" 
                  onChange={handleImageUpload}
                  className="hidden"
                />
              </label>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">
                  First Name *
                </label>
                <input
                  type="text"
                  value={formData.firstName}
                  onChange={(e) => handleInputChange('firstName', e.target.value)}
                  className="w-full px-4 py-3 bg-white dark:bg-surface-800 border border-surface-200 dark:border-surface-700 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">
                  Last Name *
                </label>
                <input
                  type="text"
                  value={formData.lastName}
                  onChange={(e) => handleInputChange('lastName', e.target.value)}
                  className="w-full px-4 py-3 bg-white dark:bg-surface-800 border border-surface-200 dark:border-surface-700 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">
                Email Address *
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                className="w-full px-4 py-3 bg-white dark:bg-surface-800 border border-surface-200 dark:border-surface-700 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                required
              />
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  className="w-full px-4 py-3 bg-white dark:bg-surface-800 border border-surface-200 dark:border-surface-700 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">
                  Location *
                </label>
                <input
                  type="text"
                  placeholder="City, State"
                  value={formData.location}
                  onChange={(e) => handleInputChange('location', e.target.value)}
                  className="w-full px-4 py-3 bg-white dark:bg-surface-800 border border-surface-200 dark:border-surface-700 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                  required
                />
              </div>
            </div>
          </div>
        )

      case 2:
        return (
          <div className="space-y-6">
            <h3 className="text-2xl font-semibold text-surface-900 dark:text-surface-100 mb-6">
              Professional Information
            </h3>
            
            <div>
              <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">
                Professional Title *
              </label>
              <input
                type="text"
                placeholder="e.g., Senior Software Engineer"
                value={formData.title}
                onChange={(e) => handleInputChange('title', e.target.value)}
                className="w-full px-4 py-3 bg-white dark:bg-surface-800 border border-surface-200 dark:border-surface-700 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">
                Professional Summary *
              </label>
              <textarea
                rows={4}
                placeholder="Brief description of your professional background and goals..."
                value={formData.summary}
                onChange={(e) => handleInputChange('summary', e.target.value)}
                className="w-full px-4 py-3 bg-white dark:bg-surface-800 border border-surface-200 dark:border-surface-700 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all resize-none"
                required
              />
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">
                  Years of Experience *
                </label>
                <select
                  value={formData.experience}
                  onChange={(e) => handleInputChange('experience', e.target.value)}
                  className="w-full px-4 py-3 bg-white dark:bg-surface-800 border border-surface-200 dark:border-surface-700 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                  required
                >
                  <option value="">Select experience level</option>
                  <option value="0-1">0-1 years</option>
                  <option value="2-3">2-3 years</option>
                  <option value="4-6">4-6 years</option>
                  <option value="7-10">7-10 years</option>
                  <option value="10+">10+ years</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">
                  Industry *
                </label>
                <select
                  value={formData.industry}
                  onChange={(e) => handleInputChange('industry', e.target.value)}
                  className="w-full px-4 py-3 bg-white dark:bg-surface-800 border border-surface-200 dark:border-surface-700 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                  required
                >
                  <option value="">Select industry</option>
                  <option value="Technology">Technology</option>
                  <option value="Healthcare">Healthcare</option>
                  <option value="Finance">Finance</option>
                  <option value="Education">Education</option>
                  <option value="Marketing">Marketing</option>
                  <option value="Design">Design</option>
                  <option value="Sales">Sales</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>
          </div>
        )

      case 3:
        return (
          <div className="space-y-6">
            <h3 className="text-2xl font-semibold text-surface-900 dark:text-surface-100 mb-6">
              Skills
            </h3>
            
            <div>
              <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">
                Add Skills
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Enter a skill"
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
            </div>

            {formData.skills.length > 0 && (
              <div>
                <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">
                  Your Skills
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
        )

      case 4:
        return (
          <div className="space-y-6">
            <h3 className="text-2xl font-semibold text-surface-900 dark:text-surface-100 mb-6">
              Education & Experience
            </h3>
            
            {/* Education */}
            <div>
              <div className="flex justify-between items-center mb-4">
                <h4 className="text-lg font-medium text-surface-900 dark:text-surface-100">
                  Education
                </h4>
                <button
                  type="button"
                  onClick={() => addArrayField('education')}
                  className="px-4 py-2 neu-button rounded-xl font-medium text-surface-700 dark:text-surface-300 hover:text-primary transition-colors"
                >
                  <ApperIcon name="Plus" className="h-4 w-4 inline mr-1" />
                  Add Education
                </button>
              </div>
              
              {formData.education.map((edu, index) => (
                <div key={index} className="bg-surface-50 dark:bg-surface-800/50 rounded-xl p-4 mb-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">
                        Degree
                      </label>
                      <input
                        type="text"
                        placeholder="e.g., Bachelor of Science"
                        value={edu.degree}
                        onChange={(e) => handleArrayFieldChange('education', index, 'degree', e.target.value)}
                        className="w-full px-4 py-3 bg-white dark:bg-surface-800 border border-surface-200 dark:border-surface-700 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">
                        Institution
                      </label>
                      <input
                        type="text"
                        placeholder="University name"
                        value={edu.institution}
                        onChange={(e) => handleArrayFieldChange('education', index, 'institution', e.target.value)}
                        className="w-full px-4 py-3 bg-white dark:bg-surface-800 border border-surface-200 dark:border-surface-700 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">
                        Graduation Year
                      </label>
                      <input
                        type="text"
                        placeholder="2020"
                        value={edu.year}
                        onChange={(e) => handleArrayFieldChange('education', index, 'year', e.target.value)}
                        className="w-full px-4 py-3 bg-white dark:bg-surface-800 border border-surface-200 dark:border-surface-700 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">
                        GPA (Optional)
                      </label>
                      <input
                        type="text"
                        placeholder="3.8"
                        value={edu.gpa}
                        onChange={(e) => handleArrayFieldChange('education', index, 'gpa', e.target.value)}
                        className="w-full px-4 py-3 bg-white dark:bg-surface-800 border border-surface-200 dark:border-surface-700 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                      />
                    </div>
                  </div>
                  {formData.education.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeArrayField('education', index)}
                      className="mt-3 text-red-500 hover:text-red-700 transition-colors"
                    >
                      <ApperIcon name="Trash2" className="h-4 w-4 inline mr-1" />
                      Remove
                    </button>
                  )}
                </div>
              ))}
            </div>

            {/* Work Experience */}
            <div>
              <div className="flex justify-between items-center mb-4">
                <h4 className="text-lg font-medium text-surface-900 dark:text-surface-100">
                  Work Experience
                </h4>
                <button
                  type="button"
                  onClick={() => addArrayField('workExperience')}
                  className="px-4 py-2 neu-button rounded-xl font-medium text-surface-700 dark:text-surface-300 hover:text-primary transition-colors"
                >
                  <ApperIcon name="Plus" className="h-4 w-4 inline mr-1" />
                  Add Experience
                </button>
              </div>
              
              {formData.workExperience.map((work, index) => (
                <div key={index} className="bg-surface-50 dark:bg-surface-800/50 rounded-xl p-4 mb-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">
                        Company
                      </label>
                      <input
                        type="text"
                        placeholder="Company name"
                        value={work.company}
                        onChange={(e) => handleArrayFieldChange('workExperience', index, 'company', e.target.value)}
                        className="w-full px-4 py-3 bg-white dark:bg-surface-800 border border-surface-200 dark:border-surface-700 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">
                        Position
                      </label>
                      <input
                        type="text"
                        placeholder="Job title"
                        value={work.position}
                        onChange={(e) => handleArrayFieldChange('workExperience', index, 'position', e.target.value)}
                        className="w-full px-4 py-3 bg-white dark:bg-surface-800 border border-surface-200 dark:border-surface-700 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                      />
                    </div>
                  </div>
                  <div className="mt-4">
                    <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">
                      Duration
                    </label>
                    <input
                      type="text"
                      placeholder="e.g., Jan 2020 - Present"
                      value={work.duration}
                      onChange={(e) => handleArrayFieldChange('workExperience', index, 'duration', e.target.value)}
                      className="w-full px-4 py-3 bg-white dark:bg-surface-800 border border-surface-200 dark:border-surface-700 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                    />
                  </div>
                  <div className="mt-4">
                    <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">
                      Description
                    </label>
                    <textarea
                      rows={3}
                      placeholder="Describe your responsibilities and achievements..."
                      value={work.description}
                      onChange={(e) => handleArrayFieldChange('workExperience', index, 'description', e.target.value)}
                      className="w-full px-4 py-3 bg-white dark:bg-surface-800 border border-surface-200 dark:border-surface-700 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all resize-none"
                    />
                  </div>
                  {formData.workExperience.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeArrayField('workExperience', index)}
                      className="mt-3 text-red-500 hover:text-red-700 transition-colors"
                    >
                      <ApperIcon name="Trash2" className="h-4 w-4 inline mr-1" />
                      Remove
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        )

      case 5:
        return (
          <div className="space-y-6">
            <h3 className="text-2xl font-semibold text-surface-900 dark:text-surface-100 mb-6">
              Job Preferences
            </h3>
            
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">
                  Preferred Job Type
                </label>
                <select
                  value={formData.jobType}
                  onChange={(e) => handleInputChange('jobType', e.target.value)}
                  className="w-full px-4 py-3 bg-white dark:bg-surface-800 border border-surface-200 dark:border-surface-700 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
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
                  Salary Range
                </label>
                <select
                  value={formData.salaryRange}
                  onChange={(e) => handleInputChange('salaryRange', e.target.value)}
                  className="w-full px-4 py-3 bg-white dark:bg-surface-800 border border-surface-200 dark:border-surface-700 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                >
                  <option value="">Select salary range</option>
                  <option value="30-50k">$30,000 - $50,000</option>
                  <option value="50-70k">$50,000 - $70,000</option>
                  <option value="70-100k">$70,000 - $100,000</option>
                  <option value="100-150k">$100,000 - $150,000</option>
                  <option value="150k+">$150,000+</option>
                </select>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="remoteWork"
                  checked={formData.remoteWork}
                  onChange={(e) => handleInputChange('remoteWork', e.target.checked)}
                  className="h-4 w-4 text-primary focus:ring-primary border-surface-300 rounded"
                />
                <label htmlFor="remoteWork" className="ml-2 text-surface-700 dark:text-surface-300">
                  Open to remote work opportunities
                </label>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="relocation"
                  checked={formData.relocation}
                  onChange={(e) => handleInputChange('relocation', e.target.checked)}
                  className="h-4 w-4 text-primary focus:ring-primary border-surface-300 rounded"
                />
                <label htmlFor="relocation" className="ml-2 text-surface-700 dark:text-surface-300">
                  Willing to relocate for the right opportunity
                </label>
              </div>
            </div>
          </div>
        )

      default:
        return null
    }
  }


  const renderProfilePreview = () => {
    return (
      <div className="space-y-8">
        <div className="text-center">
          <h3 className="text-3xl font-bold text-surface-900 dark:text-surface-100 mb-2">
            Profile Preview
          </h3>
          <p className="text-surface-600 dark:text-surface-300">
            Your professional profile is ready!
          </p>
        </div>

        {/* Profile Header */}
        <div className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-2xl p-6">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
            <div className="w-32 h-32 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-full flex items-center justify-center">
              {formData.profileImage ? (
                <img 
                  src={URL.createObjectURL(formData.profileImage)} 
                  alt="Profile" 
                  className="w-32 h-32 rounded-full object-cover"
                />
              ) : (
                <ApperIcon name="User" className="h-16 w-16 text-primary" />
              )}
            </div>
            <div className="text-center md:text-left flex-1">
              <h2 className="text-3xl font-bold text-surface-900 dark:text-surface-100 mb-2">
                {formData.firstName} {formData.lastName}
              </h2>
              <p className="text-xl text-primary font-semibold mb-2">{formData.title}</p>
              <div className="flex flex-wrap justify-center md:justify-start gap-4 text-surface-600 dark:text-surface-300">
                <div className="flex items-center gap-1">
                  <ApperIcon name="MapPin" className="h-4 w-4" />
                  <span>{formData.location}</span>
                </div>
                <div className="flex items-center gap-1">
                  <ApperIcon name="Mail" className="h-4 w-4" />
                  <span>{formData.email}</span>
                </div>
                {formData.phone && (
                  <div className="flex items-center gap-1">
                    <ApperIcon name="Phone" className="h-4 w-4" />
                    <span>{formData.phone}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Professional Summary */}
        <div className="bg-white dark:bg-surface-800 rounded-xl p-6 border border-surface-200 dark:border-surface-700">
          <h4 className="text-xl font-semibold text-surface-900 dark:text-surface-100 mb-4 flex items-center gap-2">
            <ApperIcon name="FileText" className="h-5 w-5 text-primary" />
            Professional Summary
          </h4>
          <p className="text-surface-700 dark:text-surface-300 leading-relaxed">
            {formData.summary}
          </p>
          <div className="mt-4 flex flex-wrap gap-4">
            <div className="bg-primary/10 px-3 py-1 rounded-full">
              <span className="text-sm text-primary font-medium">
                {formData.experience} experience
              </span>
            </div>
            <div className="bg-secondary/10 px-3 py-1 rounded-full">
              <span className="text-sm text-secondary font-medium">
                {formData.industry}
              </span>
            </div>
          </div>
        </div>

        {/* Skills */}
        {formData.skills.length > 0 && (
          <div className="bg-white dark:bg-surface-800 rounded-xl p-6 border border-surface-200 dark:border-surface-700">
            <h4 className="text-xl font-semibold text-surface-900 dark:text-surface-100 mb-4 flex items-center gap-2">
              <ApperIcon name="Award" className="h-5 w-5 text-primary" />
              Skills
            </h4>
            <div className="flex flex-wrap gap-2">
              {formData.skills.map((skill, index) => (
                <div key={index} className="skill-tag">
                  <span>{skill}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="grid md:grid-cols-2 gap-6">
          {/* Education */}
          <div className="bg-white dark:bg-surface-800 rounded-xl p-6 border border-surface-200 dark:border-surface-700">
            <h4 className="text-xl font-semibold text-surface-900 dark:text-surface-100 mb-4 flex items-center gap-2">
              <ApperIcon name="GraduationCap" className="h-5 w-5 text-primary" />
              Education
            </h4>
            <div className="space-y-4">
              {formData.education.filter(edu => edu.degree || edu.institution).map((edu, index) => (
                <div key={index} className="border-l-4 border-primary/30 pl-4">
                  <h5 className="font-semibold text-surface-900 dark:text-surface-100">
                    {edu.degree || 'Degree'}
                  </h5>
                  <p className="text-surface-600 dark:text-surface-400">{edu.institution}</p>
                  <div className="flex justify-between items-center mt-1">
                    <span className="text-sm text-surface-500">{edu.year}</span>
                    {edu.gpa && (
                      <span className="text-sm text-primary font-medium">GPA: {edu.gpa}</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Work Experience */}
          <div className="bg-white dark:bg-surface-800 rounded-xl p-6 border border-surface-200 dark:border-surface-700">
            <h4 className="text-xl font-semibold text-surface-900 dark:text-surface-100 mb-4 flex items-center gap-2">
              <ApperIcon name="Briefcase" className="h-5 w-5 text-primary" />
              Work Experience
            </h4>
            <div className="space-y-4">
              {formData.workExperience.filter(work => work.company || work.position).map((work, index) => (
                <div key={index} className="border-l-4 border-secondary/30 pl-4">
                  <h5 className="font-semibold text-surface-900 dark:text-surface-100">
                    {work.position || 'Position'}
                  </h5>
                  <p className="text-surface-600 dark:text-surface-400">{work.company}</p>
                  <p className="text-sm text-surface-500 mb-2">{work.duration}</p>
                  {work.description && (
                    <p className="text-sm text-surface-700 dark:text-surface-300">
                      {work.description}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Job Preferences */}
        <div className="bg-white dark:bg-surface-800 rounded-xl p-6 border border-surface-200 dark:border-surface-700">
          <h4 className="text-xl font-semibold text-surface-900 dark:text-surface-100 mb-4 flex items-center gap-2">
            <ApperIcon name="Target" className="h-5 w-5 text-primary" />
            Job Preferences
          </h4>
          <div className="grid md:grid-cols-2 gap-4">
            {formData.jobType && (
              <div>
                <span className="text-sm font-medium text-surface-600 dark:text-surface-400">Job Type:</span>
                <p className="text-surface-900 dark:text-surface-100">{formData.jobType}</p>
              </div>
            )}
            {formData.salaryRange && (
              <div>
                <span className="text-sm font-medium text-surface-600 dark:text-surface-400">Salary Range:</span>
                <p className="text-surface-900 dark:text-surface-100">{formData.salaryRange}</p>
              </div>
            )}
          </div>
          <div className="mt-4 space-y-2">
            {formData.remoteWork && (
              <div className="flex items-center gap-2 text-surface-700 dark:text-surface-300">
                <ApperIcon name="Check" className="h-4 w-4 text-green-500" />
                <span>Open to remote work opportunities</span>
              </div>
            )}
            {formData.relocation && (
              <div className="flex items-center gap-2 text-surface-700 dark:text-surface-300">
                <ApperIcon name="Check" className="h-4 w-4 text-green-500" />
                <span>Willing to relocate for the right opportunity</span>
              </div>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => setIsProfileCreated(false)}
            className="px-6 py-3 neu-button rounded-xl font-medium text-surface-700 dark:text-surface-300 hover:text-primary transition-colors"
          >
            <ApperIcon name="Edit" className="h-4 w-4 inline mr-2" />
            Edit Profile
          </button>
          <Link
            to="/"
            className="px-8 py-3 bg-gradient-to-r from-primary to-secondary text-white rounded-xl font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-300 text-center"
          >
            <ApperIcon name="Home" className="h-4 w-4 inline mr-2" />
            Back to Home
          </Link>
        </div>
      </div>
    )
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
        {!isProfileCreated ? (
          <>
            {/* Header */}
            <motion.div 
              className="text-center mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-4xl font-bold mb-4">
                Create Your <span className="gradient-text">Profile</span>
              </h1>
              <p className="text-lg text-surface-600 dark:text-surface-300">
                Build a comprehensive profile to attract the best opportunities.
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
                      Create Profile
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
          </>
        ) : (
          <motion.div 
            className="glass-card rounded-2xl p-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {renderProfilePreview()}
          </motion.div>
        )}
      </div>
    </div>
  )
}

export default CreateProfile