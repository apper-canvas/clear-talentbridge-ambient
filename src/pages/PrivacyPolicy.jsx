import React from 'react'
import { motion } from 'framer-motion'
import { Shield, Eye, Lock, UserCheck, Database, Bell } from 'lucide-react'
import { Link } from 'react-router-dom'

const PrivacyPolicy = () => {
  const sections = [
    {
      icon: Database,
      title: 'Information We Collect',
      content: [
        'Personal Information: Name, email address, phone number, and professional details you provide when creating an account or profile.',
        'Profile Data: Work experience, education, skills, resume content, and other career-related information.',
        'Usage Data: How you interact with our platform, including pages visited, features used, and time spent on the site.',
        'Device Information: IP address, browser type, operating system, and device identifiers.',
        'Communication Data: Messages sent through our platform and customer support interactions.'
      ]
    },
    {
      icon: Eye,
      title: 'How We Use Your Information',
      content: [
        'Provide and improve our job matching and career services.',
        'Connect job seekers with potential employers and opportunities.',
        'Send relevant job recommendations and career-related communications.',
        'Analyze platform usage to enhance user experience and develop new features.',
        'Ensure platform security and prevent fraudulent activities.',
        'Comply with legal obligations and respond to legitimate requests.'
      ]
    },
    {
      icon: UserCheck,
      title: 'Information Sharing',
      content: [
        'With Employers: When you apply for jobs, we share relevant profile information with potential employers.',
        'Service Providers: We may share data with trusted third-party services that help us operate the platform.',
        'Legal Requirements: We may disclose information when required by law or to protect our rights and users.',
        'Business Transfers: In case of merger or acquisition, your information may be transferred to the new entity.',
        'We never sell your personal information to third parties for marketing purposes.'
      ]
    },
    {
      icon: Lock,
      title: 'Data Security',
      content: [
        'We implement industry-standard security measures to protect your personal information.',
        'All data transmission is encrypted using SSL/TLS protocols.',
        'Our servers are protected by firewalls and regular security audits.',
        'Access to personal data is restricted to authorized personnel only.',
        'We regularly update our security practices to address emerging threats.'
      ]
    },
    {
      icon: Bell,
      title: 'Your Rights and Choices',
      content: [
        'Access: You can view and download your personal information at any time.',
        'Update: You can modify your profile and account information through your dashboard.',
        'Delete: You can request deletion of your account and associated data.',
        'Opt-out: You can unsubscribe from marketing communications at any time.',
        'Data Portability: You can request a copy of your data in a machine-readable format.',
        'Contact us at privacy@talentbridge.com to exercise these rights.'
      ]
    }
  ]

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

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center mb-6">
            <Shield className="text-primary mr-4" size={48} />
            <h1 className="text-4xl md:text-5xl font-bold text-surface-900 dark:text-surface-100">
              Privacy <span className="gradient-text">Policy</span>
            </h1>
          </div>
          <p className="text-xl text-surface-600 dark:text-surface-400 max-w-3xl mx-auto">
            Your privacy is important to us. This policy explains how we collect, use, and protect your personal information.
          </p>
          <p className="text-sm text-surface-500 dark:text-surface-500 mt-4">
            Last updated: December 2024
          </p>
        </motion.div>

        {/* Introduction */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white dark:bg-surface-800 rounded-2xl shadow-soft p-8 mb-8"
        >
          <h2 className="text-2xl font-semibold text-surface-900 dark:text-surface-100 mb-4">
            Introduction
          </h2>
          <p className="text-surface-600 dark:text-surface-400 leading-relaxed">
            Welcome to TalentBridge. We are committed to protecting your privacy and ensuring the security of your personal information. 
            This Privacy Policy describes how we collect, use, disclose, and safeguard your information when you use our job placement 
            platform and related services. By using TalentBridge, you consent to the practices described in this policy.
          </p>
        </motion.div>

        {/* Policy Sections */}
        <div className="space-y-8">
          {sections.map((section, index) => {
            const Icon = section.icon
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + index * 0.1 }}
                className="bg-white dark:bg-surface-800 rounded-2xl shadow-soft p-8"
              >
                <div className="flex items-center mb-6">
                  <Icon className="text-primary mr-4" size={28} />
                  <h2 className="text-2xl font-semibold text-surface-900 dark:text-surface-100">
                    {section.title}
                  </h2>
                </div>
                <ul className="space-y-3">
                  {section.content.map((item, itemIndex) => (
                    <li key={itemIndex} className="flex items-start">
                      <span className="inline-block w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      <span className="text-surface-600 dark:text-surface-400 leading-relaxed">
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            )
          })}
        </div>

        {/* Cookies Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="bg-white dark:bg-surface-800 rounded-2xl shadow-soft p-8 mt-8"
        >
          <h2 className="text-2xl font-semibold text-surface-900 dark:text-surface-100 mb-4">
            Cookies and Tracking Technologies
          </h2>
          <p className="text-surface-600 dark:text-surface-400 leading-relaxed mb-4">
            We use cookies and similar tracking technologies to enhance your experience on our platform. These technologies help us:
          </p>
          <ul className="space-y-2 mb-4">
            <li className="flex items-start">
              <span className="inline-block w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></span>
              <span className="text-surface-600 dark:text-surface-400">Remember your preferences and settings</span>
            </li>
            <li className="flex items-start">
              <span className="inline-block w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></span>
              <span className="text-surface-600 dark:text-surface-400">Analyze how you use our services</span>
            </li>
            <li className="flex items-start">
              <span className="inline-block w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></span>
              <span className="text-surface-600 dark:text-surface-400">Provide personalized content and recommendations</span>
            </li>
          </ul>
          <p className="text-surface-600 dark:text-surface-400 leading-relaxed">
            You can control cookie settings through your browser preferences. However, disabling certain cookies may limit platform functionality.
          </p>
        </motion.div>

        {/* Children's Privacy */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
          className="bg-white dark:bg-surface-800 rounded-2xl shadow-soft p-8 mt-8"
        >
          <h2 className="text-2xl font-semibold text-surface-900 dark:text-surface-100 mb-4">
            Children's Privacy
          </h2>
          <p className="text-surface-600 dark:text-surface-400 leading-relaxed">
            TalentBridge is not intended for use by individuals under the age of 18. We do not knowingly collect personal information 
            from children under 18. If you are a parent or guardian and believe your child has provided us with personal information, 
            please contact us immediately, and we will take steps to remove such information from our systems.
          </p>
        </motion.div>

        {/* Changes to Policy */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0 }}
          className="bg-white dark:bg-surface-800 rounded-2xl shadow-soft p-8 mt-8"
        >
          <h2 className="text-2xl font-semibold text-surface-900 dark:text-surface-100 mb-4">
            Changes to This Privacy Policy
          </h2>
          <p className="text-surface-600 dark:text-surface-400 leading-relaxed">
            We may update this Privacy Policy from time to time to reflect changes in our practices or for other operational, 
            legal, or regulatory reasons. We will notify you of any material changes by posting the new Privacy Policy on this page 
            and updating the "Last updated" date. We encourage you to review this Privacy Policy periodically to stay informed 
            about how we protect your information.
          </p>
        </motion.div>

        {/* Contact Information */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1 }}
          className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-2xl p-8 mt-8 text-center"
        >
          <h2 className="text-2xl font-semibold text-surface-900 dark:text-surface-100 mb-4">
            Questions About This Policy?
          </h2>
          <p className="text-surface-600 dark:text-surface-400 mb-6">
            If you have any questions about this Privacy Policy or our data practices, please don't hesitate to contact us.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/contact-us"
              className="inline-flex items-center justify-center gap-2 bg-primary text-white px-6 py-3 rounded-xl hover:bg-primary-dark transition-colors font-medium"
            >
              Contact Us
            </Link>
            <a
              href="mailto:privacy@talentbridge.com"
              className="inline-flex items-center justify-center gap-2 bg-white dark:bg-surface-800 text-surface-900 dark:text-surface-100 px-6 py-3 rounded-xl hover:bg-surface-50 dark:hover:bg-surface-700 transition-colors font-medium border border-surface-300 dark:border-surface-600"
            >
              privacy@talentbridge.com
            </a>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default PrivacyPolicy