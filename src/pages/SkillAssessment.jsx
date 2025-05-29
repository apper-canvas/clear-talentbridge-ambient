import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { toast } from 'react-toastify'
import ApperIcon from '../components/ApperIcon'

const SkillAssessment = () => {
  const [selectedAssessment, setSelectedAssessment] = useState(null)
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState({})
  const [timeRemaining, setTimeRemaining] = useState(null)
  const [showResults, setShowResults] = useState(false)
  const [assessmentResults, setAssessmentResults] = useState(null)

  // Mock assessment data
  const assessments = [
    {
      id: 1,
      title: 'React Development',
      description: 'Test your knowledge of React concepts, hooks, and best practices',
      duration: 30,
      questions: 15,
      difficulty: 'Intermediate',
      icon: '⚛️',
      category: 'Frontend',
      questions_data: [
        {
          id: 1,
          question: 'What is the purpose of React Hooks?',
          options: [
            'To manage component state and lifecycle in functional components',
            'To style React components',
            'To handle routing in React applications',
            'To optimize performance automatically'
          ],
          correct: 0
        },
        {
          id: 2,
          question: 'Which hook would you use to perform side effects in a functional component?',
          options: ['useState', 'useEffect', 'useContext', 'useReducer'],
          correct: 1
        },
        {
          id: 3,
          question: 'What is the virtual DOM in React?',
          options: [
            'A real representation of the DOM',
            'A lightweight JavaScript representation of the real DOM',
            'A styling framework',
            'A database for React applications'
          ],
          correct: 1
        }
      ]
    },
    {
      id: 2,
      title: 'JavaScript Fundamentals',
      description: 'Assess your understanding of core JavaScript concepts and ES6+ features',
      duration: 25,
      questions: 12,
      difficulty: 'Beginner',
      icon: '🟨',
      category: 'Programming',
      questions_data: [
        {
          id: 1,
          question: 'What is the difference between let and var in JavaScript?',
          options: [
            'No difference',
            'let has block scope, var has function scope',
            'var is newer than let',
            'let is faster than var'
          ],
          correct: 1
        }
      ]
    },
    {
      id: 3,
      title: 'Python Programming',
      description: 'Evaluate your Python skills including data structures and algorithms',
      duration: 35,
      questions: 18,
      difficulty: 'Advanced',
      icon: '🐍',
      category: 'Programming',
      questions_data: []
    },
    {
      id: 4,
      title: 'Data Analysis',
      description: 'Test your knowledge of data analysis concepts and tools',
      duration: 40,
      questions: 20,
      difficulty: 'Intermediate',
      icon: '📊',
      category: 'Data Science',
      questions_data: []
    },
    {
      id: 5,
      title: 'UI/UX Design',
      description: 'Assess your understanding of design principles and user experience',
      duration: 20,
      questions: 10,
      difficulty: 'Beginner',
      icon: '🎨',
      category: 'Design',
      questions_data: []
    },
    {
      id: 6,
      title: 'Node.js Backend',
      description: 'Test your server-side JavaScript and API development skills',
      duration: 30,
      questions: 15,
      difficulty: 'Intermediate',
      icon: '🟢',
      category: 'Backend',
      questions_data: []
    }
  ]

  const startAssessment = (assessment) => {
    setSelectedAssessment(assessment)
    setCurrentQuestion(0)
    setAnswers({})
    setTimeRemaining(assessment.duration * 60) // Convert to seconds
    setShowResults(false)
    toast.success(`Started ${assessment.title} assessment!`)
  }

  const selectAnswer = (questionId, answerIndex) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: answerIndex
    }))
  }

  const nextQuestion = () => {
    if (currentQuestion < selectedAssessment.questions_data.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    } else {
      finishAssessment()
    }
  }

  const previousQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1)
    }
  }

  const finishAssessment = () => {
    // Calculate results
    let correctAnswers = 0
    selectedAssessment.questions_data.forEach(question => {
      if (answers[question.id] === question.correct) {
        correctAnswers++
      }
    })

    const score = Math.round((correctAnswers / selectedAssessment.questions_data.length) * 100)
    const results = {
      score,
      correctAnswers,
      totalQuestions: selectedAssessment.questions_data.length,
      level: score >= 90 ? 'Expert' : score >= 75 ? 'Advanced' : score >= 60 ? 'Intermediate' : 'Beginner',
      passed: score >= 60
    }

    setAssessmentResults(results)
    setShowResults(true)
    toast.success(`Assessment completed! Score: ${score}%`)
  }

  const retakeAssessment = () => {
    setSelectedAssessment(null)
    setShowResults(false)
    setAssessmentResults(null)
  }

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  if (showResults && assessmentResults) {
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
            </div>
          </div>
        </nav>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <motion.div 
            className="text-center mb-8"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
          >
            <div className={`w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6 ${
              assessmentResults.passed 
                ? 'bg-gradient-to-br from-green-400 to-green-600' 
                : 'bg-gradient-to-br from-red-400 to-red-600'
            }`}>
              <ApperIcon 
                name={assessmentResults.passed ? 'CheckCircle' : 'XCircle'} 
                className="h-12 w-12 text-white" 
              />
            </div>
            <h1 className="text-4xl font-bold mb-4">
              Assessment <span className="gradient-text">Complete!</span>
            </h1>
            <p className="text-lg text-surface-600 dark:text-surface-300">
              {selectedAssessment.title}
            </p>
          </motion.div>

          <motion.div 
            className="glass-card rounded-2xl p-8 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <div className="text-center mb-8">
              <div className="text-6xl font-bold gradient-text mb-2">
                {assessmentResults.score}%
              </div>
              <p className="text-xl text-surface-600 dark:text-surface-300">
                Your Score
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="text-center p-4 bg-surface-50 dark:bg-surface-800/50 rounded-xl">
                <div className="text-2xl font-bold text-surface-900 dark:text-surface-100">
                  {assessmentResults.correctAnswers}/{assessmentResults.totalQuestions}
                </div>
                <p className="text-surface-600 dark:text-surface-400">Correct Answers</p>
              </div>
              <div className="text-center p-4 bg-surface-50 dark:bg-surface-800/50 rounded-xl">
                <div className="text-2xl font-bold text-surface-900 dark:text-surface-100">
                  {assessmentResults.level}
                </div>
                <p className="text-surface-600 dark:text-surface-400">Skill Level</p>
              </div>
              <div className="text-center p-4 bg-surface-50 dark:bg-surface-800/50 rounded-xl">
                <div className={`text-2xl font-bold ${
                  assessmentResults.passed ? 'text-green-600' : 'text-red-600'
                }`}>
                  {assessmentResults.passed ? 'Passed' : 'Failed'}
                </div>
                <p className="text-surface-600 dark:text-surface-400">Result</p>
              </div>
            </div>

            <div className="text-center space-y-4">
              <p className="text-surface-600 dark:text-surface-300">
                {assessmentResults.passed 
                  ? 'Congratulations! You have demonstrated proficiency in this skill.' 
                  : 'Keep practicing! Consider reviewing the topics and retaking the assessment.'}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={retakeAssessment}
                  className="px-6 py-3 neu-button rounded-xl font-semibold text-surface-700 dark:text-surface-300 hover:text-primary transition-colors"
                >
                  Take Another Assessment
                </button>
                <Link
                  to="/"
                  className="px-6 py-3 bg-gradient-to-r from-primary to-secondary text-white rounded-xl font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-300"
                >
                  Back to Home
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    )
  }

  if (selectedAssessment) {
    const currentQ = selectedAssessment.questions_data[currentQuestion]
    
    return (
      <div className="min-h-screen bg-gradient-to-br from-surface-50 via-blue-50 to-purple-50 dark:from-surface-900 dark:via-surface-800 dark:to-surface-900">
        {/* Navigation */}
        <nav className="glass-card border-b border-white/10 sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center">
                  <ApperIcon name="Zap" className="h-6 w-6 text-white" />
                </div>
                <span className="text-xl font-bold gradient-text">TalentBridge</span>
              </div>
              <div className="flex items-center space-x-4">
                {timeRemaining && (
                  <div className="flex items-center space-x-2">
                    <ApperIcon name="Clock" className="h-4 w-4 text-surface-600 dark:text-surface-300" />
                    <span className="font-medium text-surface-700 dark:text-surface-300">
                      {formatTime(timeRemaining)}
                    </span>
                  </div>
                )}
                <button
                  onClick={retakeAssessment}
                  className="px-4 py-2 neu-button rounded-xl font-medium text-surface-700 dark:text-surface-300 hover:text-primary transition-colors"
                >
                  Exit Assessment
                </button>
              </div>
            </div>
          </div>
        </nav>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Progress */}
          <motion.div 
            className="mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex justify-between items-center mb-4">
              <h1 className="text-2xl font-bold text-surface-900 dark:text-surface-100">
                {selectedAssessment.title}
              </h1>
              <span className="text-surface-600 dark:text-surface-300">
                Question {currentQuestion + 1} of {selectedAssessment.questions_data.length}
              </span>
            </div>
            <div className="w-full bg-surface-200 dark:bg-surface-700 rounded-full h-2">
              <div 
                className="bg-gradient-to-r from-primary to-secondary h-2 rounded-full transition-all duration-300"
                style={{width: `${((currentQuestion + 1) / selectedAssessment.questions_data.length) * 100}%`}}
              ></div>
            </div>
          </motion.div>

          {/* Question */}
          <motion.div 
            className="glass-card rounded-2xl p-8"
            key={currentQuestion}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-xl font-semibold text-surface-900 dark:text-surface-100 mb-6">
              {currentQ.question}
            </h2>
            
            <div className="space-y-3 mb-8">
              {currentQ.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => selectAnswer(currentQ.id, index)}
                  className={`w-full p-4 text-left rounded-xl border-2 transition-all duration-200 ${
                    answers[currentQ.id] === index
                      ? 'border-primary bg-primary/10 text-primary'
                      : 'border-surface-200 dark:border-surface-700 hover:border-primary hover:bg-primary/5'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                      answers[currentQ.id] === index
                        ? 'border-primary bg-primary'
                        : 'border-surface-300 dark:border-surface-600'
                    }`}>
                      {answers[currentQ.id] === index && (
                        <ApperIcon name="Check" className="h-3 w-3 text-white" />
                      )}
                    </div>
                    <span>{option}</span>
                  </div>
                </button>
              ))}
            </div>

            {/* Navigation */}
            <div className="flex justify-between">
              <button
                onClick={previousQuestion}
                disabled={currentQuestion === 0}
                className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                  currentQuestion === 0
                    ? 'bg-surface-200 dark:bg-surface-700 text-surface-400 cursor-not-allowed'
                    : 'neu-button text-surface-700 dark:text-surface-300 hover:text-primary'
                }`}
              >
                Previous
              </button>
              
              <button
                onClick={nextQuestion}
                disabled={answers[currentQ.id] === undefined}
                className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                  answers[currentQ.id] === undefined
                    ? 'bg-surface-200 dark:bg-surface-700 text-surface-400 cursor-not-allowed'
                    : 'bg-gradient-to-r from-primary to-secondary text-white hover:shadow-lg transform hover:scale-105'
                }`}
              >
                {currentQuestion === selectedAssessment.questions_data.length - 1 ? 'Finish' : 'Next'}
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    )
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

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <motion.div 
          className="text-center mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl font-bold mb-4">
            Skill <span className="gradient-text">Assessment</span>
          </h1>
          <p className="text-lg text-surface-600 dark:text-surface-300 max-w-2xl mx-auto">
            Test your skills and get certified. Showcase your expertise to potential employers.
          </p>
        </motion.div>

        {/* Assessments Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {assessments.map((assessment, index) => (
            <motion.div
              key={assessment.id}
              className="assessment-card"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <div className="text-center mb-4">
                <div className="text-4xl mb-3">{assessment.icon}</div>
                <h3 className="text-xl font-semibold text-surface-900 dark:text-surface-100 mb-2">
                  {assessment.title}
                </h3>
                <p className="text-surface-600 dark:text-surface-300 text-sm mb-4">
                  {assessment.description}
                </p>
              </div>
              
              <div className="space-y-3 mb-6">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-surface-600 dark:text-surface-400">Duration:</span>
                  <span className="text-sm font-medium text-surface-900 dark:text-surface-100">
                    {assessment.duration} minutes
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-surface-600 dark:text-surface-400">Questions:</span>
                  <span className="text-sm font-medium text-surface-900 dark:text-surface-100">
                    {assessment.questions}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-surface-600 dark:text-surface-400">Difficulty:</span>
                  <span className={`text-sm font-medium px-2 py-1 rounded-full ${
                    assessment.difficulty === 'Beginner' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' :
                    assessment.difficulty === 'Intermediate' ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400' :
                    'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
                  }`}>
                    {assessment.difficulty}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-surface-600 dark:text-surface-400">Category:</span>
                  <span className="text-sm font-medium text-primary">
                    {assessment.category}
                  </span>
                </div>
              </div>
              
              <button
                onClick={() => startAssessment(assessment)}
                disabled={assessment.questions_data.length === 0}
                className={`w-full py-3 rounded-xl font-semibold transition-all duration-300 ${
                  assessment.questions_data.length === 0
                    ? 'bg-surface-200 dark:bg-surface-700 text-surface-400 cursor-not-allowed'
                    : 'bg-gradient-to-r from-primary to-secondary text-white hover:shadow-lg transform hover:scale-105'
                }`}
              >
                {assessment.questions_data.length === 0 ? 'Coming Soon' : 'Start Assessment'}
              </button>
            </motion.div>
          ))}
        </div>

        {/* Benefits Section */}
        <motion.div 
          className="mt-16 glass-card rounded-2xl p-8"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <h2 className="text-2xl font-bold text-center text-surface-900 dark:text-surface-100 mb-8">
            Why Take Skill Assessments?
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: 'Award',
                title: 'Get Certified',
                description: 'Earn certificates that validate your skills and expertise'
              },
              {
                icon: 'TrendingUp',
                title: 'Stand Out',
                description: 'Differentiate yourself from other candidates with verified skills'
              },
              {
                icon: 'Target',
                title: 'Better Matches',
                description: 'Get matched with jobs that truly fit your skill level'
              }
            ].map((benefit, index) => (
              <div key={index} className="text-center">
                <div className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center mx-auto mb-4">
                  <ApperIcon name={benefit.icon} className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-surface-900 dark:text-surface-100 mb-2">
                  {benefit.title}
                </h3>
                <p className="text-surface-600 dark:text-surface-300">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default SkillAssessment