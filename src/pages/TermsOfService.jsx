import React from 'react'
import { motion } from 'framer-motion'
import { FileText, Users, Shield, AlertTriangle, Scale, Gavel } from 'lucide-react'
import { Link } from 'react-router-dom'

const TermsOfService = () => {
  const sections = [
    {
      icon: Users,
      title: 'Acceptance of Terms',
      content: [
        'By accessing or using TalentBridge, you agree to be bound by these Terms of Service and all applicable laws and regulations.',
        'If you do not agree with any part of these terms, you may not use our services.',
        'These terms apply to all users of the platform, including job seekers, employers, and visitors.',
        'You must be at least 18 years old to use TalentBridge.',
        'By using our services, you represent that you have the legal capacity to enter into these terms.'
      ]
    },
    {
      icon: FileText,
      title: 'Use of Services',
      content: [
        'TalentBridge provides a platform connecting job seekers with employers and career opportunities.',
        'You may use our services only for lawful purposes and in accordance with these terms.',
        'You are responsible for maintaining the confidentiality of your account credentials.',
        'You agree to provide accurate, current, and complete information when creating your profile.',
        'You may not use our platform to post false, misleading, or fraudulent information.',
        'Commercial use of our services requires explicit written permission from TalentBridge.'
      ]
    },
    {
      icon: Shield,
      title: 'User Responsibilities',
      content: [
        'You are solely responsible for the content you post, including resumes, profiles, and job listings.',
        'You must not post content that is illegal, harmful, threatening, abusive, or violates intellectual property rights.',
        'You agree not to spam, harass, or engage in any disruptive behavior on the platform.',
        'You must respect the privacy and rights of other users.',
        'You are responsible for any activity that occurs under your account.',
        'You must promptly notify us of any unauthorized use of your account.'
      ]
    },
    {
      icon: Scale,
      title: 'Intellectual Property',
      content: [
        'TalentBridge and its original content, features, and functionality are owned by us and protected by copyright, trademark, and other laws.',
        'You retain ownership of content you submit, but grant us a license to use, display, and distribute it on our platform.',
        'You may not reproduce, distribute, modify, or create derivative works of our platform without permission.',
        'All trademarks, logos, and brand names are the property of their respective owners.',
        'We respect intellectual property rights and expect users to do the same.'
      ]
    },
    {
      icon: AlertTriangle,
      title: 'Prohibited Activities',
      content: [
        'Creating fake profiles or providing false information about your identity or qualifications.',
        'Posting job listings that are not legitimate or are designed to collect personal information fraudulently.',
        'Using automated tools or bots to access or interact with our platform.',
        'Attempting to gain unauthorized access to our systems or other user accounts.',
        'Engaging in any activity that could harm, disable, or impair our platform.',
        'Violating any applicable local, state, national, or international law.'
      ]
    },
    {
      icon: Gavel,
      title: 'Limitation of Liability',
      content: [
        'TalentBridge is provided "as is" without warranties of any kind, either express or implied.',
        'We do not guarantee the accuracy, completeness, or reliability of content posted by users.',
        'We are not responsible for the conduct of users or the outcome of job applications.',
        'Our liability is limited to the maximum extent permitted by law.',
        'We are not liable for any indirect, incidental, special, or consequential damages.',
        'You use our services at your own risk and discretion.'
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
            <Gavel className="text-primary mr-4" size={48} />
            <h1 className="text-4xl md:text-5xl font-bold text-surface-900 dark:text-surface-100">
              Terms of <span className="gradient-text">Service</span>
            </h1>
          </div>
          <p className="text-xl text-surface-600 dark:text-surface-400 max-w-3xl mx-auto">
            Please read these terms carefully before using TalentBridge. By using our services, you agree to these terms.
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
            Welcome to TalentBridge, a comprehensive job placement platform connecting talented professionals with exciting 
            career opportunities. These Terms of Service ("Terms") govern your use of our website, mobile applications, and 
            related services (collectively, the "Services"). By accessing or using TalentBridge, you enter into a legally 
            binding agreement with us and agree to comply with these Terms.
          </p>
        </motion.div>

        {/* Terms Sections */}
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

        {/* Account Termination */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="bg-white dark:bg-surface-800 rounded-2xl shadow-soft p-8 mt-8"
        >
          <h2 className="text-2xl font-semibold text-surface-900 dark:text-surface-100 mb-4">
            Account Termination
          </h2>
          <p className="text-surface-600 dark:text-surface-400 leading-relaxed mb-4">
            We reserve the right to suspend or terminate your account at any time for violations of these Terms or for any other reason. You may also terminate your account at any time by contacting us.
          </p>
          <ul className="space-y-2">
            <li className="flex items-start">
              <span className="inline-block w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></span>
              <span className="text-surface-600 dark:text-surface-400">Upon termination, your access to the platform will cease immediately</span>
            </li>
            <li className="flex items-start">
              <span className="inline-block w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></span>
              <span className="text-surface-600 dark:text-surface-400">We may retain certain information as required by law or for legitimate business purposes</span>
            </li>
            <li className="flex items-start">
              <span className="inline-block w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></span>
              <span className="text-surface-600 dark:text-surface-400">Termination does not relieve you of obligations incurred prior to termination</span>
            </li>
          </ul>
        </motion.div>

        {/* Governing Law */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
          className="bg-white dark:bg-surface-800 rounded-2xl shadow-soft p-8 mt-8"
        >
          <h2 className="text-2xl font-semibold text-surface-900 dark:text-surface-100 mb-4">
            Governing Law and Disputes
          </h2>
          <p className="text-surface-600 dark:text-surface-400 leading-relaxed mb-4">
            These Terms are governed by and construed in accordance with the laws of the State of California, without regard to its conflict of law principles. Any disputes arising from these Terms or your use of TalentBridge will be resolved through binding arbitration.
          </p>
          <p className="text-surface-600 dark:text-surface-400 leading-relaxed">
            Before initiating any formal dispute resolution, we encourage you to contact us directly to resolve any issues. Many concerns can be addressed quickly and amicably through direct communication.
          </p>
        </motion.div>

        {/* Changes to Terms */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0 }}
          className="bg-white dark:bg-surface-800 rounded-2xl shadow-soft p-8 mt-8"
        >
          <h2 className="text-2xl font-semibold text-surface-900 dark:text-surface-100 mb-4">
            Changes to These Terms
          </h2>
          <p className="text-surface-600 dark:text-surface-400 leading-relaxed">
            We may modify these Terms from time to time to reflect changes in our services, legal requirements, or business practices. 
            We will provide notice of material changes by posting the updated Terms on our platform and updating the "Last updated" date. 
            Your continued use of TalentBridge after such changes constitutes acceptance of the new Terms.
          </p>
        </motion.div>

        {/* Severability */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1 }}
          className="bg-white dark:bg-surface-800 rounded-2xl shadow-soft p-8 mt-8"
        >
          <h2 className="text-2xl font-semibold text-surface-900 dark:text-surface-100 mb-4">
            Severability and Entire Agreement
          </h2>
          <p className="text-surface-600 dark:text-surface-400 leading-relaxed mb-4">
            If any provision of these Terms is found to be unenforceable, the remaining provisions will remain in full force and effect. 
            These Terms, together with our Privacy Policy, constitute the entire agreement between you and TalentBridge regarding your use of our services.
          </p>
          <p className="text-surface-600 dark:text-surface-400 leading-relaxed">
            These Terms supersede any prior agreements or understandings between you and TalentBridge relating to the subject matter herein.
          </p>
        </motion.div>

        {/* Contact Information */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2 }}
          className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-2xl p-8 mt-8 text-center"
        >
          <h2 className="text-2xl font-semibold text-surface-900 dark:text-surface-100 mb-4">
            Questions About These Terms?
          </h2>
          <p className="text-surface-600 dark:text-surface-400 mb-6">
            If you have any questions about these Terms of Service, please contact us. We're here to help clarify any concerns you may have.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/contact-us"
              className="inline-flex items-center justify-center gap-2 bg-primary text-white px-6 py-3 rounded-xl hover:bg-primary-dark transition-colors font-medium"
            >
              Contact Us
            </Link>
            <a
              href="mailto:legal@talentbridge.com"
              className="inline-flex items-center justify-center gap-2 bg-white dark:bg-surface-800 text-surface-900 dark:text-surface-100 px-6 py-3 rounded-xl hover:bg-surface-50 dark:hover:bg-surface-700 transition-colors font-medium border border-surface-300 dark:border-surface-600"
            >
              legal@talentbridge.com
            </a>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default TermsOfService