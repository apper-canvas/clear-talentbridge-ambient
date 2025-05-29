import { Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import Home from './pages/Home'
import BrowseJobs from './pages/BrowseJobs'
import CreateProfile from './pages/CreateProfile'
import UploadResume from './pages/UploadResume'
import SkillAssessment from './pages/SkillAssessment'
import PostJobs from './pages/PostJobs'
import SearchCandidates from './pages/SearchCandidates'
import ManageApplications from './pages/ManageApplications'
import CompanyProfile from './pages/CompanyProfile'
import HelpCenter from './pages/HelpCenter'
import ContactUs from './pages/ContactUs'
import PrivacyPolicy from './pages/PrivacyPolicy'
import TermsOfService from './pages/TermsOfService'
import ResumeBuilder from './pages/ResumeBuilder'


import NotFound from './pages/NotFound'

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-surface-50 via-blue-50 to-purple-50 dark:from-surface-900 dark:via-surface-800 dark:to-surface-900">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/browse-jobs" element={<BrowseJobs />} />
        <Route path="/create-profile" element={<CreateProfile />} />
        <Route path="/upload-resume" element={<UploadResume />} />
        <Route path="/resume-builder" element={<ResumeBuilder />} />

        <Route path="/skill-assessment" element={<SkillAssessment />} />
        <Route path="/post-jobs" element={<PostJobs />} />
        <Route path="/search-candidates" element={<SearchCandidates />} />
        <Route path="/manage-applications" element={<ManageApplications />} />
        <Route path="/company-profile" element={<CompanyProfile />} />
        <Route path="/help-center" element={<HelpCenter />} />
        <Route path="/contact-us" element={<ContactUs />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/terms-of-service" element={<TermsOfService />} />

        <Route path="*" element={<NotFound />} />
      </Routes>
      
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        className="mt-16"
        toastClassName="bg-white dark:bg-surface-800 text-surface-900 dark:text-surface-100"
      />
    </div>
  )
}

export default App