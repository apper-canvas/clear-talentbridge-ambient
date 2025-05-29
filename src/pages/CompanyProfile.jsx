import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { toast } from 'react-toastify'
import ApperIcon from '../components/ApperIcon'

const CompanyProfile = () => {
  const [activeTab, setActiveTab] = useState('overview')
  const [editMode, setEditMode] = useState(false)
  const [formData, setFormData] = useState({
    // Company Info
    name: 'TechCorp Inc.',
    tagline: 'Building the future of technology',
    description: 'TechCorp Inc. is a leading technology company focused on creating innovative solutions that transform how businesses operate. Founded in 2015, we have grown to become a trusted partner for companies worldwide.',
    website: 'https://techcorp.com',
    industry: 'Technology',
    size: '501-1000',
    founded: '2015',
    headquarters: 'San Francisco, CA',
    
    // Contact Info
    email: 'hr@techcorp.com',
    phone: '+1 (555) 123-4567',
    
    // Social Media
    linkedin: 'https://linkedin.com/company/techcorp',
    twitter: 'https://twitter.com/techcorp',
    
    // Company Culture
    values: ['Innovation', 'Collaboration', 'Excellence', 'Integrity'],
    benefits: [
      'Competitive salary and equity',
      'Comprehensive health insurance',
      'Flexible work arrangements',
      '401(k) with company matching',
      'Professional development budget',
      'Unlimited PTO'
    ],
    
    // Office locations
    locations: [
      {
        city: 'San Francisco',
        address: '123 Tech Street, San Francisco, CA 94105',
        employees: 150,
        isHeadquarters: true
      },
      {
        city: 'New York',
        address: '456 Innovation Ave, New York, NY 10001',
        employees: 75,
        isHeadquarters: false
      }
    ]
  })

  const [newValue, setNewValue] = useState('')
  const [newBenefit, setNewBenefit] = useState('')
  const [companyLogo, setCompanyLogo] = useState(null)

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const addValue = () => {
    if (newValue.trim() && !formData.values.includes(newValue.trim())) {
      setFormData(prev => ({
        ...prev,
        values: [...prev.values, newValue.trim()]
      }))
      setNewValue('')
    }
  }

  const removeValue = (valueToRemove) => {
    setFormData(prev => ({
      ...prev,
      values: prev.values.filter(value => value !== valueToRemove)
    }))
  }

  const addBenefit = () => {
    if (newBenefit.trim() && !formData.benefits.includes(newBenefit.trim())) {
      setFormData(prev => ({
        ...prev,
        benefits: [...prev.benefits, newBenefit.trim()]
      }))
      setNewBenefit('')
    }
  }

  const removeBenefit = (benefitToRemove) => {
    setFormData(prev => ({
      ...prev,
      benefits: prev.benefits.filter(benefit => benefit !== benefitToRemove)
    }))
  }

  const handleLogoUpload = (e) => {
    const file = e.target.files[0]
    if (file) {
      setCompanyLogo(file)
      toast.success('Company logo uploaded successfully!')
    }
  }

  const handleSave = () => {
    setEditMode(false)
    toast.success('Company profile updated successfully!')
    console.log('Updated profile:', formData)
  }

  const handleCancel = () => {
    setEditMode(false)
    // Reset to original data if needed
  }

  const renderOverview = () => (
    <div className="space-y-8">
      {/* Company Header */}
      <div className="flex flex-col md:flex-row md:items-start md:justify-between">
        <div className="flex items-start space-x-4 mb-6 md:mb-0">
          <div className="w-20 h-20 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center text-white text-2xl font-bold flex-shrink-0">
            {companyLogo ? (
              <img 
                src={URL.createObjectURL(companyLogo)} 
                alt="Company Logo" 
                className="w-20 h-20 rounded-xl object-cover"
              />
            ) : (
              formData.name.substring(0, 2)
            )}
          </div>
          <div>
            {editMode ? (
              <div className="space-y-3">
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  className="text-2xl font-bold bg-transparent border-b-2 border-primary focus:outline-none text-surface-900 dark:text-surface-100"
                />
                <input
                  type="text"
                  value={formData.tagline}
                  onChange={(e) => handleInputChange('tagline', e.target.value)}
                  className="text-lg bg-transparent border-b border-surface-300 dark:border-surface-600 focus:outline-none text-surface-600 dark:text-surface-300"
                />
              </div>
            ) : (
              <div>
                <h1 className="text-2xl font-bold text-surface-900 dark:text-surface-100 mb-1">
                  {formData.name}
                </h1>
                <p className="text-lg text-surface-600 dark:text-surface-300">
                  {formData.tagline}
                </p>
              </div>
            )}
          </div>
        </div>
        
        {editMode && (
          <div>
            <label className="cursor-pointer">
              <span className="px-4 py-2 neu-button rounded-xl font-medium text-surface-700 dark:text-surface-300 hover:text-primary transition-colors">
                Upload Logo
              </span>
              <input 
                type="file" 
                accept="image/*" 
                onChange={handleLogoUpload}
                className="hidden"
              />
            </label>
          </div>
        )}
      </div>

      {/* Company Description */}
      <div>
        <h3 className="text-lg font-semibold text-surface-900 dark:text-surface-100 mb-3">
          About Us
        </h3>
        {editMode ? (
          <textarea
            rows={4}
            value={formData.description}
            onChange={(e) => handleInputChange('description', e.target.value)}
            className="w-full px-4 py-3 bg-white dark:bg-surface-800 border border-surface-200 dark:border-surface-700 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all resize-none"
          />
        ) : (
          <p className="text-surface-700 dark:text-surface-300">
            {formData.description}
          </p>
        )}
      </div>

      {/* Company Stats */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'Industry', value: formData.industry, field: 'industry' },
          { label: 'Company Size', value: formData.size, field: 'size' },
          { label: 'Founded', value: formData.founded, field: 'founded' },
          { label: 'Headquarters', value: formData.headquarters, field: 'headquarters' }
        ].map((stat, index) => (
          <div key={index} className="bg-surface-50 dark:bg-surface-800/50 rounded-xl p-4">
            <h4 className="text-sm font-medium text-surface-600 dark:text-surface-400 mb-2">
              {stat.label}
            </h4>
            {editMode ? (
              <input
                type="text"
                value={stat.value}
                onChange={(e) => handleInputChange(stat.field, e.target.value)}
                className="w-full bg-transparent border-b border-surface-300 dark:border-surface-600 focus:outline-none text-surface-900 dark:text-surface-100"
              />
            ) : (
              <p className="font-semibold text-surface-900 dark:text-surface-100">
                {stat.value}
              </p>
            )}
          </div>
        ))}
      </div>

      {/* Contact Info */}
      <div>
        <h3 className="text-lg font-semibold text-surface-900 dark:text-surface-100 mb-4">
          Contact Information
        </h3>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <ApperIcon name="Mail" className="h-5 w-5 text-primary" />
              {editMode ? (
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className="flex-1 bg-transparent border-b border-surface-300 dark:border-surface-600 focus:outline-none text-surface-700 dark:text-surface-300"
                />
              ) : (
                <span className="text-surface-700 dark:text-surface-300">{formData.email}</span>
              )}
            </div>
            <div className="flex items-center space-x-3">
              <ApperIcon name="Phone" className="h-5 w-5 text-primary" />
              {editMode ? (
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  className="flex-1 bg-transparent border-b border-surface-300 dark:border-surface-600 focus:outline-none text-surface-700 dark:text-surface-300"
                />
              ) : (
                <span className="text-surface-700 dark:text-surface-300">{formData.phone}</span>
              )}
            </div>
            <div className="flex items-center space-x-3">
              <ApperIcon name="Globe" className="h-5 w-5 text-primary" />
              {editMode ? (
                <input
                  type="url"
                  value={formData.website}
                  onChange={(e) => handleInputChange('website', e.target.value)}
                  className="flex-1 bg-transparent border-b border-surface-300 dark:border-surface-600 focus:outline-none text-surface-700 dark:text-surface-300"
                />
              ) : (
                <a href={formData.website} target="_blank" rel="noopener noreferrer" className="text-primary hover:text-primary-dark">
                  {formData.website}
                </a>
              )}
            </div>
          </div>
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <ApperIcon name="Linkedin" className="h-5 w-5 text-primary" />
              {editMode ? (
                <input
                  type="url"
                  value={formData.linkedin}
                  onChange={(e) => handleInputChange('linkedin', e.target.value)}
                  className="flex-1 bg-transparent border-b border-surface-300 dark:border-surface-600 focus:outline-none text-surface-700 dark:text-surface-300"
                />
              ) : (
                <a href={formData.linkedin} target="_blank" rel="noopener noreferrer" className="text-primary hover:text-primary-dark">
                  LinkedIn
                </a>
              )}
            </div>
            <div className="flex items-center space-x-3">
              <ApperIcon name="Twitter" className="h-5 w-5 text-primary" />
              {editMode ? (
                <input
                  type="url"
                  value={formData.twitter}
                  onChange={(e) => handleInputChange('twitter', e.target.value)}
                  className="flex-1 bg-transparent border-b border-surface-300 dark:border-surface-600 focus:outline-none text-surface-700 dark:text-surface-300"
                />
              ) : (
                <a href={formData.twitter} target="_blank" rel="noopener noreferrer" className="text-primary hover:text-primary-dark">
                  Twitter
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )

  const renderCulture = () => (
    <div className="space-y-8">
      {/* Company Values */}
      <div>
        <h3 className="text-lg font-semibold text-surface-900 dark:text-surface-100 mb-4">
          Our Values
        </h3>
        {editMode && (
          <div className="flex gap-2 mb-4">
            <input
              type="text"
              placeholder="Add a value"
              value={newValue}
              onChange={(e) => setNewValue(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addValue())}
              className="flex-1 px-4 py-3 bg-white dark:bg-surface-800 border border-surface-200 dark:border-surface-700 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
            />
            <button
              onClick={addValue}
              className="px-6 py-3 bg-gradient-to-r from-primary to-secondary text-white rounded-xl font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-300"
            >
              Add
            </button>
          </div>
        )}
        <div className="grid md:grid-cols-2 gap-4">
          {formData.values.map((value, index) => (
            <div key={index} className="flex items-center justify-between p-4 bg-surface-50 dark:bg-surface-800/50 rounded-xl">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
                  <ApperIcon name="Heart" className="h-4 w-4 text-white" />
                </div>
                <span className="font-medium text-surface-900 dark:text-surface-100">{value}</span>
              </div>
              {editMode && (
                <button
                  onClick={() => removeValue(value)}
                  className="text-red-500 hover:text-red-700 transition-colors"
                >
                  <ApperIcon name="X" className="h-4 w-4" />
                </button>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Benefits */}
      <div>
        <h3 className="text-lg font-semibold text-surface-900 dark:text-surface-100 mb-4">
          Benefits & Perks
        </h3>
        {editMode && (
          <div className="flex gap-2 mb-4">
            <input
              type="text"
              placeholder="Add a benefit"
              value={newBenefit}
              onChange={(e) => setNewBenefit(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addBenefit())}
              className="flex-1 px-4 py-3 bg-white dark:bg-surface-800 border border-surface-200 dark:border-surface-700 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
            />
            <button
              onClick={addBenefit}
              className="px-6 py-3 bg-gradient-to-r from-primary to-secondary text-white rounded-xl font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-300"
            >
              Add
            </button>
          </div>
        )}
        <div className="space-y-3">
          {formData.benefits.map((benefit, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-surface-50 dark:bg-surface-800/50 rounded-xl">
              <div className="flex items-center space-x-3">
                <ApperIcon name="CheckCircle" className="h-5 w-5 text-green-500" />
                <span className="text-surface-700 dark:text-surface-300">{benefit}</span>
              </div>
              {editMode && (
                <button
                  onClick={() => removeBenefit(benefit)}
                  className="text-red-500 hover:text-red-700 transition-colors"
                >
                  <ApperIcon name="X" className="h-4 w-4" />
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )

  const renderLocations = () => (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-surface-900 dark:text-surface-100">
        Office Locations
      </h3>
      <div className="grid md:grid-cols-2 gap-6">
        {formData.locations.map((location, index) => (
          <div key={index} className="bg-surface-50 dark:bg-surface-800/50 rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-lg font-semibold text-surface-900 dark:text-surface-100">
                {location.city}
              </h4>
              {location.isHeadquarters && (
                <span className="px-2 py-1 bg-primary/10 text-primary rounded-full text-xs font-medium">
                  Headquarters
                </span>
              )}
            </div>
            <div className="space-y-3">
              <div className="flex items-start space-x-2">
                <ApperIcon name="MapPin" className="h-4 w-4 text-primary mt-0.5" />
                <span className="text-sm text-surface-600 dark:text-surface-300">
                  {location.address}
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <ApperIcon name="Users" className="h-4 w-4 text-primary" />
                <span className="text-sm text-surface-600 dark:text-surface-300">
                  {location.employees} employees
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )

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
            <div className="flex items-center space-x-4">
              {editMode ? (
                <>
                  <button
                    onClick={handleCancel}
                    className="px-4 py-2 neu-button rounded-xl font-medium text-surface-700 dark:text-surface-300 hover:text-primary transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSave}
                    className="px-4 py-2 bg-gradient-to-r from-primary to-secondary text-white rounded-xl font-medium hover:shadow-lg transition-all"
                  >
                    Save Changes
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => setEditMode(true)}
                    className="px-4 py-2 neu-button rounded-xl font-medium text-surface-700 dark:text-surface-300 hover:text-primary transition-colors"
                  >
                    <ApperIcon name="Edit" className="h-4 w-4 inline mr-1" />
                    Edit Profile
                  </button>
                  <Link 
                    to="/"
                    className="px-4 py-2 neu-button rounded-xl font-medium text-surface-700 dark:text-surface-300 hover:text-primary transition-colors"
                  >
                    Back to Home
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <motion.div 
          className="text-center mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl font-bold mb-4">
            Company <span className="gradient-text">Profile</span>
          </h1>
          <p className="text-lg text-surface-600 dark:text-surface-300">
            Manage your company information and showcase your culture.
          </p>
        </motion.div>

        {/* Tabs */}
        <motion.div 
          className="flex justify-center mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <div className="glass-card rounded-2xl p-2 flex space-x-2">
            {[
              { id: 'overview', label: 'Overview', icon: 'Building2' },
              { id: 'culture', label: 'Culture', icon: 'Heart' },
              { id: 'locations', label: 'Locations', icon: 'MapPin' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                  activeTab === tab.id
                    ? 'bg-gradient-to-r from-primary to-secondary text-white'
                    : 'text-surface-700 dark:text-surface-300 hover:text-primary'
                }`}
              >
                <ApperIcon name={tab.icon} className="h-4 w-4" />
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </motion.div>

        {/* Content */}
        <motion.div 
          className="glass-card rounded-2xl p-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {activeTab === 'overview' && renderOverview()}
          {activeTab === 'culture' && renderCulture()}
          {activeTab === 'locations' && renderLocations()}
        </motion.div>
      </div>
    </div>
  )
}

export default CompanyProfile