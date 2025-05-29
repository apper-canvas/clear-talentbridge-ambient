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
        },
        {
          id: 4,
          question: 'How do you pass data from a parent component to a child component?',
          options: [
            'Using state',
            'Using props',
            'Using context',
            'Using refs'
          ],
          correct: 1
        },
        {
          id: 5,
          question: 'What is the purpose of the useCallback hook?',
          options: [
            'To memoize values',
            'To memoize functions',
            'To manage state',
            'To handle side effects'
          ],
          correct: 1
        },
        {
          id: 6,
          question: 'Which method is used to update state in a class component?',
          options: [
            'updateState()',
            'setState()',
            'changeState()',
            'modifyState()'
          ],
          correct: 1
        },
        {
          id: 7,
          question: 'What is JSX?',
          options: [
            'A JavaScript framework',
            'A syntax extension for JavaScript',
            'A CSS preprocessor',
            'A build tool'
          ],
          correct: 1
        },
        {
          id: 8,
          question: 'How do you handle forms in React?',
          options: [
            'Using controlled components',
            'Using uncontrolled components',
            'Both controlled and uncontrolled components',
            'React cannot handle forms'
          ],
          correct: 2
        },
        {
          id: 9,
          question: 'What is the purpose of React.memo()?',
          options: [
            'To memoize component state',
            'To prevent unnecessary re-renders',
            'To handle side effects',
            'To manage component lifecycle'
          ],
          correct: 1
        },
        {
          id: 10,
          question: 'Which hook is used for managing complex state logic?',
          options: [
            'useState',
            'useEffect',
            'useReducer',
            'useContext'
          ],
          correct: 2
        },
        {
          id: 11,
          question: 'What is the Context API used for?',
          options: [
            'State management across components',
            'Routing between pages',
            'Styling components',
            'Handling API calls'
          ],
          correct: 0
        },
        {
          id: 12,
          question: 'How do you optimize React application performance?',
          options: [
            'Using React.memo and useMemo',
            'Code splitting with React.lazy',
            'Avoiding unnecessary re-renders',
            'All of the above'
          ],
          correct: 3
        },
        {
          id: 13,
          question: 'What is the difference between useEffect and useLayoutEffect?',
          options: [
            'No difference',
            'useLayoutEffect runs synchronously after DOM mutations',
            'useEffect is deprecated',
            'useLayoutEffect is for styling only'
          ],
          correct: 1
        },
        {
          id: 14,
          question: 'How do you handle errors in React components?',
          options: [
            'Try-catch blocks',
            'Error boundaries',
            'Global error handlers',
            'React handles errors automatically'
          ],
          correct: 1
        },
        {
          id: 15,
          question: 'What is the purpose of keys in React lists?',
          options: [
            'For styling list items',
            'To help React identify which items have changed',
            'For accessibility',
            'Keys are not important'
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
        },
        {
          id: 2,
          question: 'Which of the following is not a primitive data type in JavaScript?',
          options: [
            'string',
            'number',
            'object',
            'boolean'
          ],
          correct: 2
        },
        {
          id: 3,
          question: 'What does the === operator do?',
          options: [
            'Assigns a value',
            'Compares values only',
            'Compares values and types',
            'Logical AND operation'
          ],
          correct: 2
        },
        {
          id: 4,
          question: 'How do you create a function in JavaScript?',
          options: [
            'function myFunc() {}',
            'const myFunc = () => {}',
            'const myFunc = function() {}',
            'All of the above'
          ],
          correct: 3
        },
        {
          id: 5,
          question: 'What is closure in JavaScript?',
          options: [
            'A way to close the browser',
            'A function that has access to outer scope variables',
            'A method to end a loop',
            'A type of error'
          ],
          correct: 1
        },
        {
          id: 6,
          question: 'Which method adds an element to the end of an array?',
          options: [
            'push()',
            'pop()',
            'shift()',
            'unshift()'
          ],
          correct: 0
        },
        {
          id: 7,
          question: 'What is the purpose of JSON.stringify()?',
          options: [
            'To parse JSON',
            'To convert JavaScript object to JSON string',
            'To validate JSON',
            'To format JSON'
          ],
          correct: 1
        },
        {
          id: 8,
          question: 'How do you handle asynchronous operations in JavaScript?',
          options: [
            'Callbacks',
            'Promises',
            'Async/await',
            'All of the above'
          ],
          correct: 3
        },
        {
          id: 9,
          question: 'What is the difference between null and undefined?',
          options: [
            'No difference',
            'null is assigned, undefined means not assigned',
            'undefined is assigned, null means not assigned',
            'Both are the same as false'
          ],
          correct: 1
        },
        {
          id: 10,
          question: 'Which ES6 feature allows you to extract values from arrays or objects?',
          options: [
            'Destructuring',
            'Spread operator',
            'Template literals',
            'Arrow functions'
          ],
          correct: 0
        },
        {
          id: 11,
          question: 'What is the purpose of the map() method?',
          options: [
            'To filter array elements',
            'To create a new array with transformed elements',
            'To find an element in array',
            'To sort array elements'
          ],
          correct: 1
        },
        {
          id: 12,
          question: 'How do you check if a variable is an array?',
          options: [
            'typeof variable === "array"',
            'Array.isArray(variable)',
            'variable instanceof Array',
            'Both b and c'
          ],
          correct: 3
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
      questions_data: [
        {
          id: 1,
          question: 'Which of the following is the correct way to define a list in Python?',
          options: [
            'list = []',
            'list = {}',
            'list = ()',
            'list = ""'
          ],
          correct: 0
        },
        {
          id: 2,
          question: 'What is the output of print(type([]))?',
          options: [
            '<class "list">',
            '<class "array">',
            '<class "tuple">',
            '<class "dict">'
          ],
          correct: 0
        },
        {
          id: 3,
          question: 'Which keyword is used to define a function in Python?',
          options: [
            'function',
            'def',
            'func',
            'define'
          ],
          correct: 1
        },
        {
          id: 4,
          question: 'What is the purpose of the __init__ method?',
          options: [
            'To initialize class variables',
            'To delete an object',
            'To inherit from parent class',
            'To import modules'
          ],
          correct: 0
        },
        {
          id: 5,
          question: 'Which data structure is used to store key-value pairs in Python?',
          options: [
            'List',
            'Tuple',
            'Dictionary',
            'Set'
          ],
          correct: 2
        },
        {
          id: 6,
          question: 'What is list comprehension in Python?',
          options: [
            'A way to understand lists',
            'A concise way to create lists',
            'A method to compress lists',
            'A type of loop'
          ],
          correct: 1
        },
        {
          id: 7,
          question: 'Which of the following is used for exception handling in Python?',
          options: [
            'try-catch',
            'try-except',
            'catch-throw',
            'handle-error'
          ],
          correct: 1
        },
        {
          id: 8,
          question: 'What is the difference between append() and extend() methods?',
          options: [
            'No difference',
            'append() adds single element, extend() adds multiple elements',
            'extend() adds single element, append() adds multiple elements',
            'Both do the same thing'
          ],
          correct: 1
        },
        {
          id: 9,
          question: 'Which library is commonly used for data manipulation in Python?',
          options: [
            'NumPy',
            'Pandas',
            'Matplotlib',
            'Requests'
          ],
          correct: 1
        },
        {
          id: 10,
          question: 'What is the time complexity of accessing an element in a dictionary?',
          options: [
            'O(1) average case',
            'O(n)',
            'O(log n)',
            'O(n²)'
          ],
          correct: 0
        },
        {
          id: 11,
          question: 'Which method is used to remove and return an element from a list?',
          options: [
            'remove()',
            'delete()',
            'pop()',
            'clear()'
          ],
          correct: 2
        },
        {
          id: 12,
          question: 'What is a lambda function in Python?',
          options: [
            'A named function',
            'An anonymous function',
            'A recursive function',
            'A built-in function'
          ],
          correct: 1
        },
        {
          id: 13,
          question: 'Which decorator is used to define a static method?',
          options: [
            '@staticmethod',
            '@classmethod',
            '@property',
            '@static'
          ],
          correct: 0
        },
        {
          id: 14,
          question: 'What is the purpose of the yield keyword?',
          options: [
            'To return a value from function',
            'To create a generator',
            'To pause execution',
            'To handle exceptions'
          ],
          correct: 1
        },
        {
          id: 15,
          question: 'Which of the following is immutable in Python?',
          options: [
            'List',
            'Dictionary',
            'Tuple',
            'Set'
          ],
          correct: 2
        },
        {
          id: 16,
          question: 'What is the Global Interpreter Lock (GIL)?',
          options: [
            'A security feature',
            'A mechanism that prevents multiple threads from executing Python code simultaneously',
            'A type of variable',
            'A debugging tool'
          ],
          correct: 1
        },
        {
          id: 17,
          question: 'Which method is used to sort a list in-place?',
          options: [
            'sorted()',
            'sort()',
            'order()',
            'arrange()'
          ],
          correct: 1
        },
        {
          id: 18,
          question: 'What is the difference between is and == operators?',
          options: [
            'No difference',
            'is checks identity, == checks equality',
            '== checks identity, is checks equality',
            'Both are deprecated'
          ],
          correct: 1
        }
      ]
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
      questions_data: [
        {
          id: 1,
          question: 'What is the primary purpose of data analysis?',
          options: [
            'To collect data',
            'To extract insights and patterns from data',
            'To store data',
            'To delete unnecessary data'
          ],
          correct: 1
        },
        {
          id: 2,
          question: 'Which of the following is a measure of central tendency?',
          options: [
            'Standard deviation',
            'Variance',
            'Mean',
            'Range'
          ],
          correct: 2
        },
        {
          id: 3,
          question: 'What does SQL stand for?',
          options: [
            'Structured Query Language',
            'Standard Query Language',
            'Simple Query Language',
            'Sequential Query Language'
          ],
          correct: 0
        },
        {
          id: 4,
          question: 'Which visualization is best for showing correlation between two variables?',
          options: [
            'Bar chart',
            'Pie chart',
            'Scatter plot',
            'Line chart'
          ],
          correct: 2
        },
        {
          id: 5,
          question: 'What is the difference between population and sample?',
          options: [
            'No difference',
            'Population is entire group, sample is subset',
            'Sample is entire group, population is subset',
            'Both terms mean the same thing'
          ],
          correct: 1
        },
        {
          id: 6,
          question: 'Which Python library is primarily used for data visualization?',
          options: [
            'NumPy',
            'Pandas',
            'Matplotlib',
            'Scikit-learn'
          ],
          correct: 2
        },
        {
          id: 7,
          question: 'What is the purpose of data cleaning?',
          options: [
            'To delete all data',
            'To remove errors and inconsistencies',
            'To compress data',
            'To backup data'
          ],
          correct: 1
        },
        {
          id: 8,
          question: 'Which statistical test is used to compare means of two groups?',
          options: [
            'Chi-square test',
            'T-test',
            'ANOVA',
            'Regression analysis'
          ],
          correct: 1
        },
        {
          id: 9,
          question: 'What is the purpose of normalization in data analysis?',
          options: [
            'To make data normal distribution',
            'To scale data to a common range',
            'To remove outliers',
            'To sort data'
          ],
          correct: 1
        },
        {
          id: 10,
          question: 'Which of the following is an example of categorical data?',
          options: [
            'Age',
            'Height',
            'Gender',
            'Temperature'
          ],
          correct: 2
        },
        {
          id: 11,
          question: 'What is the interquartile range (IQR)?',
          options: [
            'The range between Q1 and Q3',
            'The range between minimum and maximum',
            'The range around the mean',
            'The range of all quartiles'
          ],
          correct: 0
        },
        {
          id: 12,
          question: 'Which type of analysis is used to predict future values?',
          options: [
            'Descriptive analysis',
            'Predictive analysis',
            'Prescriptive analysis',
            'Diagnostic analysis'
          ],
          correct: 1
        },
        {
          id: 13,
          question: 'What is the purpose of hypothesis testing?',
          options: [
            'To create hypotheses',
            'To test statistical significance of findings',
            'To generate random data',
            'To clean data'
          ],
          correct: 1
        },
        {
          id: 14,
          question: 'Which measure indicates the spread of data?',
          options: [
            'Mean',
            'Median',
            'Mode',
            'Standard deviation'
          ],
          correct: 3
        },
        {
          id: 15,
          question: 'What is big data characterized by?',
          options: [
            'Volume only',
            'Velocity only',
            'Variety only',
            'Volume, Velocity, and Variety'
          ],
          correct: 3
        },
        {
          id: 16,
          question: 'Which technique is used to reduce dimensionality?',
          options: [
            'Principal Component Analysis (PCA)',
            'Linear regression',
            'Clustering',
            'Classification'
          ],
          correct: 0
        },
        {
          id: 17,
          question: 'What is the purpose of A/B testing?',
          options: [
            'To test two different versions',
            'To sort data alphabetically',
            'To clean data',
            'To visualize data'
          ],
          correct: 0
        },
        {
          id: 18,
          question: 'Which of the following is a time series analysis component?',
          options: [
            'Trend',
            'Seasonality',
            'Noise',
            'All of the above'
          ],
          correct: 3
        },
        {
          id: 19,
          question: 'What is the difference between correlation and causation?',
          options: [
            'No difference',
            'Correlation implies relationship, causation implies cause-effect',
            'Causation implies relationship, correlation implies cause-effect',
            'Both are the same'
          ],
          correct: 1
        },
        {
          id: 20,
          question: 'Which tool is commonly used for business intelligence and reporting?',
          options: [
            'Tableau',
            'Power BI',
            'QlikView',
            'All of the above'
          ],
          correct: 3
        }
      ]
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
      questions_data: [
        {
          id: 1,
          question: 'What does UX stand for?',
          options: [
            'User Experience',
            'User Excellence',
            'Universal Experience',
            'Unified Experience'
          ],
          correct: 0
        },
        {
          id: 2,
          question: 'Which principle focuses on making interfaces easy to understand?',
          options: [
            'Consistency',
            'Clarity',
            'Feedback',
            'Efficiency'
          ],
          correct: 1
        },
        {
          id: 3,
          question: 'What is the purpose of a wireframe?',
          options: [
            'To add colors to design',
            'To show the basic structure and layout',
            'To write code',
            'To test functionality'
          ],
          correct: 1
        },
        {
          id: 4,
          question: 'Which color combination provides the best accessibility?',
          options: [
            'Red text on green background',
            'Yellow text on white background',
            'Black text on white background',
            'Blue text on purple background'
          ],
          correct: 2
        },
        {
          id: 5,
          question: 'What is the ideal number of primary navigation items?',
          options: [
            '3-5 items',
            '5-7 items',
            '7-9 items',
            '10+ items'
          ],
          correct: 1
        },
        {
          id: 6,
          question: 'Which design principle suggests that similar elements should look similar?',
          options: [
            'Proximity',
            'Alignment',
            'Consistency',
            'Contrast'
          ],
          correct: 2
        },
        {
          id: 7,
          question: 'What is the purpose of user personas?',
          options: [
            'To decorate the design',
            'To represent target users',
            'To add complexity',
            'To increase development time'
          ],
          correct: 1
        },
        {
          id: 8,
          question: 'Which method is used to test usability with real users?',
          options: [
            'A/B testing',
            'User testing',
            'Code review',
            'Design review'
          ],
          correct: 1
        },
        {
          id: 9,
          question: 'What is the golden ratio in design?',
          options: [
            '1:1',
            '1:1.618',
            '1:2',
            '2:3'
          ],
          correct: 1
        },
        {
          id: 10,
          question: 'Which typography principle improves readability?',
          options: [
            'Using many different fonts',
            'Making all text the same size',
            'Appropriate line spacing and font size',
            'Using only decorative fonts'
          ],
          correct: 2
        }
      ]
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
      questions_data: [
        {
          id: 1,
          question: 'What is Node.js?',
          options: [
            'A frontend framework',
            'A JavaScript runtime built on Chrome\'s V8 engine',
            'A database',
            'A web browser'
          ],
          correct: 1
        },
        {
          id: 2,
          question: 'Which of the following is the package manager for Node.js?',
          options: [
            'npm',
            'pip',
            'gem',
            'composer'
          ],
          correct: 0
        },
        {
          id: 3,
          question: 'How do you import a module in Node.js?',
          options: [
            'import module from "module"',
            'require("module")',
            'include "module"',
            'load("module")'
          ],
          correct: 1
        },
        {
          id: 4,
          question: 'Which method is used to create an HTTP server in Node.js?',
          options: [
            'http.createServer()',
            'http.newServer()',
            'http.makeServer()',
            'http.buildServer()'
          ],
          correct: 0
        },
        {
          id: 5,
          question: 'What is Express.js?',
          options: [
            'A database',
            'A web application framework for Node.js',
            'A frontend library',
            'A testing framework'
          ],
          correct: 1
        },
        {
          id: 6,
          question: 'Which of the following is used for handling asynchronous operations?',
          options: [
            'Callbacks',
            'Promises',
            'Async/await',
            'All of the above'
          ],
          correct: 3
        },
        {
          id: 7,
          question: 'What is middleware in Express.js?',
          options: [
            'A database connection',
            'Functions that execute during request-response cycle',
            'A testing tool',
            'A deployment service'
          ],
          correct: 1
        },
        {
          id: 8,
          question: 'Which status code indicates a successful HTTP request?',
          options: [
            '404',
            '500',
            '200',
            '301'
          ],
          correct: 2
        },
        {
          id: 9,
          question: 'How do you handle environment variables in Node.js?',
          options: [
            'process.env',
            'env.get()',
            'system.env',
            'config.env'
          ],
          correct: 0
        },
        {
          id: 10,
          question: 'Which database is commonly used with Node.js?',
          options: [
            'MongoDB',
            'PostgreSQL',
            'MySQL',
            'All of the above'
          ],
          correct: 3
        },
        {
          id: 11,
          question: 'What is the purpose of the package.json file?',
          options: [
            'To store project metadata and dependencies',
            'To configure the database',
            'To handle routing',
            'To manage user sessions'
          ],
          correct: 0
        },
        {
          id: 12,
          question: 'Which method is used to handle POST requests in Express?',
          options: [
            'app.post()',
            'app.get()',
            'app.put()',
            'app.delete()'
          ],
          correct: 0
        },
        {
          id: 13,
          question: 'What is JWT used for?',
          options: [
            'Database queries',
            'Authentication and authorization',
            'File uploads',
            'Email sending'
          ],
          correct: 1
        },
        {
          id: 14,
          question: 'Which tool is commonly used for API testing?',
          options: [
            'Postman',
            'Insomnia',
            'Thunder Client',
            'All of the above'
          ],
          correct: 3
        },
        {
          id: 15,
          question: 'What is the event loop in Node.js?',
          options: [
            'A debugging tool',
            'A mechanism that handles asynchronous operations',
            'A database connection pool',
            'A server configuration'
          ],
          correct: 1
        }
      ]
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