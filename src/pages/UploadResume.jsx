import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { toast } from 'react-toastify'
import ApperIcon from '../components/ApperIcon'

const UploadResume = () => {
  const [dragActive, setDragActive] = useState(false)
  const [uploadedFile, setUploadedFile] = useState(null)
  const [uploading, setUploading] = useState(false)
  const [resumeData, setResumeData] = useState(null)
  const [previewMode, setPreviewMode] = useState('parsed')

  const handleDrag = (e) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true)
    } else if (e.type === 'dragleave') {
      setDragActive(false)
    }
  }

  const handleDrop = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0])
    }
  }

  const handleFileInput = (e) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0])
    }
  }

  const handleFile = async (file) => {
    // Validate file type
    const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document']
    if (!allowedTypes.includes(file.type)) {
      toast.error('Please upload a PDF or Word document')
      return
    }

    // Validate file size (5MB limit)
    if (file.size > 5 * 1024 * 1024) {
      toast.error('File size must be less than 5MB')
      return
    }

    setUploadedFile(file)
    setUploading(true)

    // Simulate upload and parsing
    setTimeout(() => {
      setUploading(false)
      toast.success('Resume uploaded and parsed successfully!')
      
      // Mock parsed resume data
      setResumeData({
        name: 'John Doe',
        email: 'john.doe@email.com',
        phone: '+1 (555) 123-4567',
        location: 'San Francisco, CA',
        title: 'Senior Software Engineer',
        summary: 'Experienced software engineer with 8+ years in full-stack development, specializing in React, Node.js, and cloud technologies.',
        skills: ['React', 'JavaScript', 'Node.js', 'Python', 'AWS', 'Docker', 'PostgreSQL', 'GraphQL'],
        experience: [
          {
            company: 'Tech Innovations Inc.',
            position: 'Senior Software Engineer',
            duration: 'Jan 2020 - Present',
            description: 'Lead development of scalable web applications using React and Node.js'
          },
          {
            company: 'StartupCorp',
            position: 'Full Stack Developer',
            duration: 'Jun 2018 - Dec 2019',
            description: 'Developed and maintained multiple client projects using modern web technologies'
          }
        ],
        education: [
          {
            degree: 'Bachelor of Computer Science',
            institution: 'University of California, Berkeley',
            year: '2018'
          }
        ]
      })
    }, 2000)
  }

  const handleRemoveFile = () => {
    setUploadedFile(null)
    setResumeData(null)
    toast.info('Resume removed')
  }

  const handleSaveResume = () => {
    toast.success('Resume saved to your profile!')
  }

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
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

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <motion.div 
          className="text-center mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl font-bold mb-4">
            Upload Your <span className="gradient-text">Resume</span>
          </h1>
          <p className="text-lg text-surface-600 dark:text-surface-300 max-w-2xl mx-auto">
            Upload your resume and let our AI extract and organize your information automatically.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Upload Section */}
          <motion.div 
            className="space-y-6"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <div className="glass-card rounded-2xl p-6">
              <h2 className="text-2xl font-semibold text-surface-900 dark:text-surface-100 mb-6">
                Upload Resume
              </h2>
              
              {!uploadedFile ? (
                <div
                  className={`border-2 border-dashed rounded-xl p-8 text-center transition-all duration-300 ${
                    dragActive 
                      ? 'border-primary bg-primary/5' 
                      : 'border-surface-300 dark:border-surface-600 hover:border-primary hover:bg-primary/5'
                  }`}
                  onDragEnter={handleDrag}
                  onDragLeave={handleDrag}
                  onDragOver={handleDrag}
                  onDrop={handleDrop}
                >
                  <ApperIcon name="Upload" className="h-12 w-12 text-surface-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-surface-900 dark:text-surface-100 mb-2">
                    Drag and drop your resume here
                  </h3>
                  <p className="text-surface-600 dark:text-surface-300 mb-4">
                    Or click to browse files
                  </p>
                  <label className="cursor-pointer">
                    <span className="px-6 py-3 bg-gradient-to-r from-primary to-secondary text-white rounded-xl font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-300 inline-block">
                      Choose File
                    </span>
                    <input 
                      type="file" 
                      accept=".pdf,.doc,.docx" 
                      onChange={handleFileInput}
                      className="hidden"
                    />
                  </label>
                  <p className="text-xs text-surface-500 dark:text-surface-400 mt-4">
                    Supported formats: PDF, DOC, DOCX (Max 5MB)
                  </p>
                </div>
              ) : (
                <div className="bg-surface-50 dark:bg-surface-800/50 rounded-xl p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-green-600 rounded-xl flex items-center justify-center">
                        <ApperIcon name="FileText" className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-surface-900 dark:text-surface-100">
                          {uploadedFile.name}
                        </h4>
                        <p className="text-sm text-surface-600 dark:text-surface-400">
                          {formatFileSize(uploadedFile.size)}
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={handleRemoveFile}
                      className="p-2 text-red-500 hover:text-red-700 transition-colors"
                    >
                      <ApperIcon name="X" className="h-5 w-5" />
                    </button>
                  </div>
                  
                  {uploading && (
                    <div className="mt-4">
                      <div className="flex items-center space-x-2 mb-2">
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary"></div>
                        <span className="text-sm text-surface-600 dark:text-surface-300">
                          Processing resume...
                        </span>
                      </div>
                      <div className="w-full bg-surface-200 dark:bg-surface-700 rounded-full h-2">
                        <div className="bg-gradient-to-r from-primary to-secondary h-2 rounded-full animate-pulse" style={{width: '60%'}}></div>
                      </div>
                    </div>
                  )}
                  
                  {resumeData && (
                    <div className="mt-4 space-y-3">
                      <div className="flex items-center space-x-2 text-green-600">
                        <ApperIcon name="CheckCircle" className="h-5 w-5" />
                        <span className="font-medium">Resume processed successfully!</span>
                      </div>
                      <button
                        onClick={handleSaveResume}
                        className="w-full px-4 py-3 bg-gradient-to-r from-primary to-secondary text-white rounded-xl font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-300"
                      >
                        Save to Profile
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Tips */}
            <div className="glass-card rounded-2xl p-6">
              <h3 className="text-lg font-semibold text-surface-900 dark:text-surface-100 mb-4">
                Resume Tips
              </h3>
              <div className="space-y-3">
                {[
                  'Use a clean, professional format',
                  'Include relevant keywords for your industry',
                  'Keep it concise (1-2 pages maximum)',
                  'Include quantifiable achievements',
                  'Use action verbs to describe your experience'
                ].map((tip, index) => (
                  <div key={index} className="flex items-start space-x-2">
                    <ApperIcon name="CheckCircle" className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-surface-600 dark:text-surface-300">{tip}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Preview Section */}
          <motion.div 
            className="space-y-6"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {resumeData ? (
              <div className="glass-card rounded-2xl p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-semibold text-surface-900 dark:text-surface-100">
                    Parsed Information
                  </h2>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => setPreviewMode('parsed')}
                      className={`px-3 py-1 rounded-lg text-sm transition-all ${
                        previewMode === 'parsed'
                          ? 'bg-primary text-white'
                          : 'bg-surface-100 dark:bg-surface-700 text-surface-600 dark:text-surface-300'
                      }`}
                    >
                      Parsed
                    </button>
                    <button
                      onClick={() => setPreviewMode('original')}
                      className={`px-3 py-1 rounded-lg text-sm transition-all ${
                        previewMode === 'original'
                          ? 'bg-primary text-white'
                          : 'bg-surface-100 dark:bg-surface-700 text-surface-600 dark:text-surface-300'
                      }`}
                    >
                      Original
                    </button>
                  </div>
                </div>
                
                {previewMode === 'parsed' ? (
                  <div className="space-y-6">
                    {/* Personal Info */}
                    <div>
                      <h3 className="text-lg font-semibold text-surface-900 dark:text-surface-100 mb-3">
                        Personal Information
                      </h3>
                      <div className="bg-surface-50 dark:bg-surface-800/50 rounded-xl p-4 space-y-2">
                        <p><span className="font-medium">Name:</span> {resumeData.name}</p>
                        <p><span className="font-medium">Email:</span> {resumeData.email}</p>
                        <p><span className="font-medium">Phone:</span> {resumeData.phone}</p>
                        <p><span className="font-medium">Location:</span> {resumeData.location}</p>
                        <p><span className="font-medium">Title:</span> {resumeData.title}</p>
                      </div>
                    </div>

                    {/* Summary */}
                    <div>
                      <h3 className="text-lg font-semibold text-surface-900 dark:text-surface-100 mb-3">
                        Professional Summary
                      </h3>
                      <div className="bg-surface-50 dark:bg-surface-800/50 rounded-xl p-4">
                        <p className="text-surface-700 dark:text-surface-300">{resumeData.summary}</p>
                      </div>
                    </div>

                    {/* Skills */}
                    <div>
                      <h3 className="text-lg font-semibold text-surface-900 dark:text-surface-100 mb-3">
                        Skills
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {resumeData.skills.map((skill, index) => (
                          <span key={index} className="skill-tag">
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Experience */}
                    <div>
                      <h3 className="text-lg font-semibold text-surface-900 dark:text-surface-100 mb-3">
                        Work Experience
                      </h3>
                      <div className="space-y-4">
                        {resumeData.experience.map((exp, index) => (
                          <div key={index} className="bg-surface-50 dark:bg-surface-800/50 rounded-xl p-4">
                            <h4 className="font-semibold text-surface-900 dark:text-surface-100">
                              {exp.position}
                            </h4>
                            <p className="text-primary font-medium">{exp.company}</p>
                            <p className="text-sm text-surface-600 dark:text-surface-400 mb-2">
                              {exp.duration}
                            </p>
                            <p className="text-surface-700 dark:text-surface-300">
                              {exp.description}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Education */}
                    <div>
                      <h3 className="text-lg font-semibold text-surface-900 dark:text-surface-100 mb-3">
                        Education
                      </h3>
                      <div className="space-y-3">
                        {resumeData.education.map((edu, index) => (
                          <div key={index} className="bg-surface-50 dark:bg-surface-800/50 rounded-xl p-4">
                            <h4 className="font-semibold text-surface-900 dark:text-surface-100">
                              {edu.degree}
                            </h4>
                            <p className="text-primary font-medium">{edu.institution}</p>
                            <p className="text-sm text-surface-600 dark:text-surface-400">
                              {edu.year}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="bg-surface-50 dark:bg-surface-800/50 rounded-xl p-6 text-center">
                    <ApperIcon name="FileText" className="h-16 w-16 text-surface-300 mx-auto mb-4" />
                    <p className="text-surface-600 dark:text-surface-300">
                      Original document preview would be displayed here
                    </p>
                  </div>
                )}
              </div>
            ) : (
              <div className="glass-card rounded-2xl p-6">
                <div className="text-center py-12">
                  <ApperIcon name="Upload" className="h-16 w-16 text-surface-300 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-surface-900 dark:text-surface-100 mb-2">
                    No Resume Uploaded
                  </h3>
                  <p className="text-surface-600 dark:text-surface-300">
                    Upload a resume to see the parsed information here.
                  </p>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default UploadResume