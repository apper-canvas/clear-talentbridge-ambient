import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { toast } from 'react-toastify'
import ApperIcon from './ApperIcon'

const ResumeBuilder = () => {
  const [selectedTemplate, setSelectedTemplate] = useState('modern')
  const [activeSection, setActiveSection] = useState('personal')
  const [resumeData, setResumeData] = useState({
    personal: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      location: '',
      title: '',
      summary: ''
    },
    experience: [
      {
        id: 1,
        company: '',
        position: '',
        startDate: '',
        endDate: '',
        current: false,
        description: ''
      }
    ],
    education: [
      {
        id: 1,
        institution: '',
        degree: '',
        field: '',
        startDate: '',
        endDate: '',
        gpa: ''
      }
    ],
    skills: [],
    projects: [
      {
        id: 1,
        name: '',
        description: '',
        technologies: '',
        link: ''
      }
    ],
    certifications: [
      {
        id: 1,
        name: '',
        issuer: '',
        date: '',
        link: ''
      }
    ]
  })
  const [newSkill, setNewSkill] = useState('')
  const [savedResumes, setSavedResumes] = useState([])
  const [currentResumeName, setCurrentResumeName] = useState('')
  const [showSaveModal, setShowSaveModal] = useState(false)
  const [showLoadModal, setShowLoadModal] = useState(false)
  const previewRef = useRef()

  const templates = {
    modern: {
      name: 'Modern',
      description: 'Clean and contemporary design with accent colors',
      preview: '/templates/modern-preview.jpg'
    },
    classic: {
      name: 'Classic',
      description: 'Traditional professional layout',
      preview: '/templates/classic-preview.jpg'
    },
    creative: {
      name: 'Creative',
      description: 'Eye-catching design for creative professionals',
      preview: '/templates/creative-preview.jpg'
    }
  }

  const sections = [
    { id: 'personal', label: 'Personal Info', icon: 'User' },
    { id: 'experience', label: 'Experience', icon: 'Briefcase' },
    { id: 'education', label: 'Education', icon: 'GraduationCap' },
    { id: 'skills', label: 'Skills', icon: 'Code' },
    { id: 'projects', label: 'Projects', icon: 'FolderOpen' },
    { id: 'certifications', label: 'Certifications', icon: 'Award' }
  ]

  const updatePersonal = (field, value) => {
    setResumeData(prev => ({
      ...prev,
      personal: {
        ...prev.personal,
        [field]: value
      }
    }))
  }

  const addExperience = () => {
    const newExp = {
      id: Date.now(),
      company: '',
      position: '',
      startDate: '',
      endDate: '',
      current: false,
      description: ''
    }
    setResumeData(prev => ({
      ...prev,
      experience: [...prev.experience, newExp]
    }))
  }

  const updateExperience = (id, field, value) => {
    setResumeData(prev => ({
      ...prev,
      experience: prev.experience.map(exp => 
        exp.id === id ? { ...exp, [field]: value } : exp
      )
    }))
  }

  const removeExperience = (id) => {
    setResumeData(prev => ({
      ...prev,
      experience: prev.experience.filter(exp => exp.id !== id)
    }))
  }

  const addEducation = () => {
    const newEdu = {
      id: Date.now(),
      institution: '',
      degree: '',
      field: '',
      startDate: '',
      endDate: '',
      gpa: ''
    }
    setResumeData(prev => ({
      ...prev,
      education: [...prev.education, newEdu]
    }))
  }

  const updateEducation = (id, field, value) => {
    setResumeData(prev => ({
      ...prev,
      education: prev.education.map(edu => 
        edu.id === id ? { ...edu, [field]: value } : edu
      )
    }))
  }

  const removeEducation = (id) => {
    setResumeData(prev => ({
      ...prev,
      education: prev.education.filter(edu => edu.id !== id)
    }))
  }

  const addSkill = () => {
    if (!newSkill.trim()) return
    
    if (resumeData.skills.includes(newSkill.trim())) {
      toast.warning('Skill already added')
      return
    }

    setResumeData(prev => ({
      ...prev,
      skills: [...prev.skills, newSkill.trim()]
    }))
    setNewSkill('')
    toast.success('Skill added successfully')
  }

  const removeSkill = (skillToRemove) => {
    setResumeData(prev => ({
      ...prev,
      skills: prev.skills.filter(skill => skill !== skillToRemove)
    }))
  }

  const addProject = () => {
    const newProject = {
      id: Date.now(),
      name: '',
      description: '',
      technologies: '',
      link: ''
    }
    setResumeData(prev => ({
      ...prev,
      projects: [...prev.projects, newProject]
    }))
  }

  const updateProject = (id, field, value) => {
    setResumeData(prev => ({
      ...prev,
      projects: prev.projects.map(project => 
        project.id === id ? { ...project, [field]: value } : project
      )
    }))
  }

  const removeProject = (id) => {
    setResumeData(prev => ({
      ...prev,
      projects: prev.projects.filter(project => project.id !== id)
    }))
  }

  const addCertification = () => {
    const newCert = {
      id: Date.now(),
      name: '',
      issuer: '',
      date: '',
      link: ''
    }
    setResumeData(prev => ({
      ...prev,
      certifications: [...prev.certifications, newCert]
    }))
  }

  const updateCertification = (id, field, value) => {
    setResumeData(prev => ({
      ...prev,
      certifications: prev.certifications.map(cert => 
        cert.id === id ? { ...cert, [field]: value } : cert
      )
    }))
  }

  const removeCertification = (id) => {
    setResumeData(prev => ({
      ...prev,
      certifications: prev.certifications.filter(cert => cert.id !== id)
    }))
  }

  const saveResume = () => {
    if (!currentResumeName.trim()) {
      toast.error('Please enter a resume name')
      return
    }

    const resume = {
      id: Date.now(),
      name: currentResumeName,
      template: selectedTemplate,
      data: resumeData,
      savedAt: new Date().toLocaleDateString()
    }

    const existingIndex = savedResumes.findIndex(r => r.name === currentResumeName)
    if (existingIndex >= 0) {
      setSavedResumes(prev => prev.map((r, i) => i === existingIndex ? resume : r))
      toast.success('Resume updated successfully!')
    } else {
      setSavedResumes(prev => [...prev, resume])
      toast.success('Resume saved successfully!')
    }

    localStorage.setItem('savedResumes', JSON.stringify([...savedResumes, resume]))
    setShowSaveModal(false)
  }

  const loadResume = (resume) => {
    setResumeData(resume.data)
    setSelectedTemplate(resume.template)
    setCurrentResumeName(resume.name)
    setShowLoadModal(false)
    toast.success('Resume loaded successfully!')
  }

  const deleteResume = (resumeId) => {
    setSavedResumes(prev => prev.filter(r => r.id !== resumeId))
    toast.success('Resume deleted successfully!')
  }

  const downloadPDF = () => {
    // In a real application, this would generate and download a PDF
    toast.success('PDF download feature would be implemented here')
  }

  const renderPersonalSection = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">
            First Name *
          </label>
          <input
            type="text"
            value={resumeData.personal.firstName}
            onChange={(e) => updatePersonal('firstName', e.target.value)}
            className="w-full px-4 py-3 rounded-xl border-2 border-surface-200 dark:border-surface-700 bg-white dark:bg-surface-800 text-surface-900 dark:text-surface-100 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-200"
            placeholder="John"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">
            Last Name *
          </label>
          <input
            type="text"
            value={resumeData.personal.lastName}
            onChange={(e) => updatePersonal('lastName', e.target.value)}
            className="w-full px-4 py-3 rounded-xl border-2 border-surface-200 dark:border-surface-700 bg-white dark:bg-surface-800 text-surface-900 dark:text-surface-100 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-200"
            placeholder="Doe"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">
            Email *
          </label>
          <input
            type="email"
            value={resumeData.personal.email}
            onChange={(e) => updatePersonal('email', e.target.value)}
            className="w-full px-4 py-3 rounded-xl border-2 border-surface-200 dark:border-surface-700 bg-white dark:bg-surface-800 text-surface-900 dark:text-surface-100 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-200"
            placeholder="john.doe@email.com"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">
            Phone
          </label>
          <input
            type="tel"
            value={resumeData.personal.phone}
            onChange={(e) => updatePersonal('phone', e.target.value)}
            className="w-full px-4 py-3 rounded-xl border-2 border-surface-200 dark:border-surface-700 bg-white dark:bg-surface-800 text-surface-900 dark:text-surface-100 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-200"
            placeholder="(555) 123-4567"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">
            Location
          </label>
          <input
            type="text"
            value={resumeData.personal.location}
            onChange={(e) => updatePersonal('location', e.target.value)}
            className="w-full px-4 py-3 rounded-xl border-2 border-surface-200 dark:border-surface-700 bg-white dark:bg-surface-800 text-surface-900 dark:text-surface-100 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-200"
            placeholder="San Francisco, CA"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">
            Professional Title
          </label>
          <input
            type="text"
            value={resumeData.personal.title}
            onChange={(e) => updatePersonal('title', e.target.value)}
            className="w-full px-4 py-3 rounded-xl border-2 border-surface-200 dark:border-surface-700 bg-white dark:bg-surface-800 text-surface-900 dark:text-surface-100 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-200"
            placeholder="Senior Software Engineer"
          />
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">
          Professional Summary
        </label>
        <textarea
          value={resumeData.personal.summary}
          onChange={(e) => updatePersonal('summary', e.target.value)}
          rows={4}
          className="w-full px-4 py-3 rounded-xl border-2 border-surface-200 dark:border-surface-700 bg-white dark:bg-surface-800 text-surface-900 dark:text-surface-100 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-200 resize-none"
          placeholder="Brief summary of your professional background and key achievements..."
        />
      </div>
    </div>
  )

  const renderExperienceSection = () => (
    <div className="space-y-6">
      {resumeData.experience.map((exp, index) => (
        <div key={exp.id} className="border border-surface-200 dark:border-surface-700 rounded-xl p-6">
          <div className="flex justify-between items-center mb-4">
            <h4 className="text-lg font-semibold text-surface-900 dark:text-surface-100">
              Experience {index + 1}
            </h4>
            {resumeData.experience.length > 1 && (
              <button
                onClick={() => removeExperience(exp.id)}
                className="p-2 text-red-500 hover:text-red-700 transition-colors"
              >
                <ApperIcon name="Trash2" className="h-4 w-4" />
              </button>
            )}
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">
                Company *
              </label>
              <input
                type="text"
                value={exp.company}
                onChange={(e) => updateExperience(exp.id, 'company', e.target.value)}
                className="w-full px-4 py-3 rounded-xl border-2 border-surface-200 dark:border-surface-700 bg-white dark:bg-surface-800 text-surface-900 dark:text-surface-100 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-200"
                placeholder="Company Name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">
                Position *
              </label>
              <input
                type="text"
                value={exp.position}
                onChange={(e) => updateExperience(exp.id, 'position', e.target.value)}
                className="w-full px-4 py-3 rounded-xl border-2 border-surface-200 dark:border-surface-700 bg-white dark:bg-surface-800 text-surface-900 dark:text-surface-100 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-200"
                placeholder="Job Title"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">
                Start Date
              </label>
              <input
                type="month"
                value={exp.startDate}
                onChange={(e) => updateExperience(exp.id, 'startDate', e.target.value)}
                className="w-full px-4 py-3 rounded-xl border-2 border-surface-200 dark:border-surface-700 bg-white dark:bg-surface-800 text-surface-900 dark:text-surface-100 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-200"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">
                End Date
              </label>
              <div className="space-y-2">
                <input
                  type="month"
                  value={exp.endDate}
                  onChange={(e) => updateExperience(exp.id, 'endDate', e.target.value)}
                  disabled={exp.current}
                  className="w-full px-4 py-3 rounded-xl border-2 border-surface-200 dark:border-surface-700 bg-white dark:bg-surface-800 text-surface-900 dark:text-surface-100 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-200 disabled:opacity-50"
                />
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={exp.current}
                    onChange={(e) => {
                      updateExperience(exp.id, 'current', e.target.checked)
                      if (e.target.checked) {
                        updateExperience(exp.id, 'endDate', '')
                      }
                    }}
                    className="rounded border-surface-300 text-primary focus:ring-primary"
                  />
                  <span className="text-sm text-surface-700 dark:text-surface-300">Current Position</span>
                </label>
              </div>
            </div>
          </div>
          
          <div className="mt-4">
            <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">
              Description
            </label>
            <textarea
              value={exp.description}
              onChange={(e) => updateExperience(exp.id, 'description', e.target.value)}
              rows={3}
              className="w-full px-4 py-3 rounded-xl border-2 border-surface-200 dark:border-surface-700 bg-white dark:bg-surface-800 text-surface-900 dark:text-surface-100 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-200 resize-none"
              placeholder="Describe your responsibilities and achievements..."
            />
          </div>
        </div>
      ))}
      
      <button
        onClick={addExperience}
        className="w-full px-6 py-3 border-2 border-dashed border-surface-300 dark:border-surface-600 rounded-xl text-surface-600 dark:text-surface-400 hover:border-primary hover:text-primary transition-all duration-200"
      >
        <div className="flex items-center justify-center space-x-2">
          <ApperIcon name="Plus" className="h-5 w-5" />
          <span>Add Experience</span>
        </div>
      </button>
    </div>
  )

  const renderPreview = () => {
    const templateClasses = {
      modern: 'bg-white text-gray-900 font-sans',
      classic: 'bg-white text-gray-900 font-serif',
      creative: 'bg-gradient-to-br from-blue-50 to-purple-50 text-gray-900 font-sans'
    }

    return (
      <div ref={previewRef} className={`p-8 min-h-[800px] ${templateClasses[selectedTemplate]} shadow-lg`}>
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">
            {resumeData.personal.firstName} {resumeData.personal.lastName}
          </h1>
          {resumeData.personal.title && (
            <h2 className="text-xl text-gray-600 mb-4">{resumeData.personal.title}</h2>
          )}
          <div className="flex flex-wrap gap-4 text-sm text-gray-600">
            {resumeData.personal.email && (
              <span className="flex items-center gap-1">
                <ApperIcon name="Mail" className="h-4 w-4" />
                {resumeData.personal.email}
              </span>
            )}
            {resumeData.personal.phone && (
              <span className="flex items-center gap-1">
                <ApperIcon name="Phone" className="h-4 w-4" />
                {resumeData.personal.phone}
              </span>
            )}
            {resumeData.personal.location && (
              <span className="flex items-center gap-1">
                <ApperIcon name="MapPin" className="h-4 w-4" />
                {resumeData.personal.location}
              </span>
            )}
          </div>
        </div>

        {/* Summary */}
        {resumeData.personal.summary && (
          <div className="mb-8">
            <h3 className="text-lg font-semibold mb-3 border-b-2 border-gray-300 pb-1">
              Professional Summary
            </h3>
            <p className="text-gray-700 leading-relaxed">{resumeData.personal.summary}</p>
          </div>
        )}

        {/* Experience */}
        {resumeData.experience.some(exp => exp.company || exp.position) && (
          <div className="mb-8">
            <h3 className="text-lg font-semibold mb-3 border-b-2 border-gray-300 pb-1">
              Professional Experience
            </h3>
            <div className="space-y-4">
              {resumeData.experience
                .filter(exp => exp.company || exp.position)
                .map((exp) => (
                  <div key={exp.id}>
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h4 className="font-semibold">{exp.position}</h4>
                        <p className="text-gray-600">{exp.company}</p>
                      </div>
                      <div className="text-sm text-gray-500">
                        {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                      </div>
                    </div>
                    {exp.description && (
                      <p className="text-gray-700 text-sm leading-relaxed">{exp.description}</p>
                    )}
                  </div>
                ))}
            </div>
          </div>
        )}

        {/* Education */}
        {resumeData.education.some(edu => edu.institution || edu.degree) && (
          <div className="mb-8">
            <h3 className="text-lg font-semibold mb-3 border-b-2 border-gray-300 pb-1">
              Education
            </h3>
            <div className="space-y-3">
              {resumeData.education
                .filter(edu => edu.institution || edu.degree)
                .map((edu) => (
                  <div key={edu.id}>
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-semibold">{edu.degree} {edu.field && `in ${edu.field}`}</h4>
                        <p className="text-gray-600">{edu.institution}</p>
                        {edu.gpa && <p className="text-sm text-gray-500">GPA: {edu.gpa}</p>}
                      </div>
                      <div className="text-sm text-gray-500">
                        {edu.startDate} - {edu.endDate}
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        )}

        {/* Skills */}
        {resumeData.skills.length > 0 && (
          <div className="mb-8">
            <h3 className="text-lg font-semibold mb-3 border-b-2 border-gray-300 pb-1">
              Skills
            </h3>
            <div className="flex flex-wrap gap-2">
              {resumeData.skills.map((skill, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-gray-200 text-gray-700 rounded-full text-sm"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Projects */}
        {resumeData.projects.some(proj => proj.name) && (
          <div className="mb-8">
            <h3 className="text-lg font-semibold mb-3 border-b-2 border-gray-300 pb-1">
              Projects
            </h3>
            <div className="space-y-3">
              {resumeData.projects
                .filter(proj => proj.name)
                .map((project) => (
                  <div key={project.id}>
                    <h4 className="font-semibold">{project.name}</h4>
                    {project.description && (
                      <p className="text-gray-700 text-sm mb-1">{project.description}</p>
                    )}
                    {project.technologies && (
                      <p className="text-gray-600 text-sm">Technologies: {project.technologies}</p>
                    )}
                    {project.link && (
                      <a href={project.link} className="text-blue-600 text-sm hover:underline">
                        View Project
                      </a>
                    )}
                  </div>
                ))}
            </div>
          </div>
        )}

        {/* Certifications */}
        {resumeData.certifications.some(cert => cert.name) && (
          <div className="mb-8">
            <h3 className="text-lg font-semibold mb-3 border-b-2 border-gray-300 pb-1">
              Certifications
            </h3>
            <div className="space-y-2">
              {resumeData.certifications
                .filter(cert => cert.name)
                .map((cert) => (
                  <div key={cert.id} className="flex justify-between items-start">
                    <div>
                      <h4 className="font-semibold">{cert.name}</h4>
                      <p className="text-gray-600 text-sm">{cert.issuer}</p>
                    </div>
                    <div className="text-sm text-gray-500">{cert.date}</div>
                  </div>
                ))}
            </div>
          </div>
        )}
      </div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      {/* Header */}
      <div className="glass-card rounded-2xl p-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold text-surface-900 dark:text-surface-100 mb-2">
              Resume Builder
            </h2>
            <p className="text-surface-600 dark:text-surface-400">
              Create professional resumes with our easy-to-use builder
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setShowLoadModal(true)}
              className="px-4 py-2 neu-button rounded-xl font-medium text-surface-700 dark:text-surface-300 hover:scale-105 transition-all duration-200"
            >
              <div className="flex items-center space-x-2">
                <ApperIcon name="FolderOpen" className="h-4 w-4" />
                <span>Load</span>
              </div>
            </button>
            <button
              onClick={() => setShowSaveModal(true)}
              className="px-4 py-2 neu-button rounded-xl font-medium text-surface-700 dark:text-surface-300 hover:scale-105 transition-all duration-200"
            >
              <div className="flex items-center space-x-2">
                <ApperIcon name="Save" className="h-4 w-4" />
                <span>Save</span>
              </div>
            </button>
            <button
              onClick={downloadPDF}
              className="px-4 py-2 bg-gradient-to-r from-primary to-secondary text-white rounded-xl font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-300"
            >
              <div className="flex items-center space-x-2">
                <ApperIcon name="Download" className="h-4 w-4" />
                <span>Download PDF</span>
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Template Selection */}
      <div className="glass-card rounded-2xl p-6">
        <h3 className="text-lg font-semibold text-surface-900 dark:text-surface-100 mb-4">
          Choose Template
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {Object.entries(templates).map(([key, template]) => (
            <button
              key={key}
              onClick={() => setSelectedTemplate(key)}
              className={`p-4 rounded-xl border-2 transition-all duration-200 text-left ${
                selectedTemplate === key
                  ? 'border-primary bg-primary/5'
                  : 'border-surface-200 dark:border-surface-700 hover:border-primary/50'
              }`}
            >
              <div className="aspect-[3/4] bg-surface-100 dark:bg-surface-800 rounded-lg mb-3 flex items-center justify-center">
                <ApperIcon name="FileText" className="h-8 w-8 text-surface-400" />
              </div>
              <h4 className="font-semibold text-surface-900 dark:text-surface-100">{template.name}</h4>
              <p className="text-sm text-surface-600 dark:text-surface-400 mt-1">{template.description}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Content Grid */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Form Section */}
        <div className="space-y-6">
          {/* Section Navigation */}
          <div className="glass-card rounded-2xl p-6">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              {sections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => setActiveSection(section.id)}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-xl font-medium transition-all duration-200 ${
                    activeSection === section.id
                      ? 'bg-primary text-white'
                      : 'text-surface-700 dark:text-surface-300 hover:bg-surface-100 dark:hover:bg-surface-700'
                  }`}
                >
                  <ApperIcon name={section.icon} className="h-4 w-4" />
                  <span className="text-sm">{section.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Form Content */}
          <div className="glass-card rounded-2xl p-6">
            <AnimatePresence mode="wait">
              {activeSection === 'personal' && (
                <motion.div
                  key="personal"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.2 }}
                >
                  <h3 className="text-lg font-semibold text-surface-900 dark:text-surface-100 mb-4">
                    Personal Information
                  </h3>
                  {renderPersonalSection()}
                </motion.div>
              )}

              {activeSection === 'experience' && (
                <motion.div
                  key="experience"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.2 }}
                >
                  <h3 className="text-lg font-semibold text-surface-900 dark:text-surface-100 mb-4">
                    Work Experience
                  </h3>
                  {renderExperienceSection()}
                </motion.div>
              )}

              {activeSection === 'skills' && (
                <motion.div
                  key="skills"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.2 }}
                >
                  <h3 className="text-lg font-semibold text-surface-900 dark:text-surface-100 mb-4">
                    Skills
                  </h3>
                  <div className="space-y-4">
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={newSkill}
                        onChange={(e) => setNewSkill(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && addSkill()}
                        placeholder="Add a skill (e.g., JavaScript, React, Python)"
                        className="flex-1 px-4 py-3 rounded-xl border-2 border-surface-200 dark:border-surface-700 bg-white dark:bg-surface-800 text-surface-900 dark:text-surface-100 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-200"
                      />
                      <button
                        onClick={addSkill}
                        className="px-6 py-3 bg-gradient-to-r from-primary to-secondary text-white rounded-xl font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-300"
                      >
                        <ApperIcon name="Plus" className="h-5 w-5" />
                      </button>
                    </div>
                    
                    {resumeData.skills.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {resumeData.skills.map((skill, index) => (
                          <div key={index} className="flex items-center gap-1 skill-tag">
                            <span>{skill}</span>
                            <button
                              onClick={() => removeSkill(skill)}
                              className="ml-1 text-primary hover:text-primary-dark"
                            >
                              <ApperIcon name="X" className="h-3 w-3" />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Preview Section */}
        <div className="glass-card rounded-2xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-surface-900 dark:text-surface-100">
              Live Preview
            </h3>
            <div className="text-sm text-surface-500 dark:text-surface-400">
              {templates[selectedTemplate].name} Template
            </div>
          </div>
          <div className="border border-surface-200 dark:border-surface-700 rounded-xl overflow-hidden max-h-[800px] overflow-y-auto">
            {renderPreview()}
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default ResumeBuilder