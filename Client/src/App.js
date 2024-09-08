import React from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import Navbar from './global/Navbar/Navbar';
import Dashboard from './pages/Dashboard/Dashboard';
import JobPostingDashboard from './pages/JobPostingDashboard/JobPostingDashboard';
import ApplicationManagement from './pages/ApplicationManagement/ApplicationManagement';
import Candidates from './pages/Candidates/Candidates';
import RegistrationPage from './pages/RegistrationPage/RegistrationPage';
import LoginPage from './pages/LoginPage/LoginPage';
import VerificationPage from './pages/VerificationPage/VerificationPage';
import VerifyMail from './pages/VerifyEmailPage/VerifyEmailPage';
import NotificationSettingsPage from './pages/NotificationSettingsPage/NotificationSettingsPage';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import HomePage from './pages/HomePage/HomePage';
import PremiumPlans from './components/PremiumPlans/PremiumPlans';
import { GlobalStateProvider } from './context/GlobalStateContext';
import AdminDashboardPage from './pages/AdminDashboard/AdminDashboardPage';

const AppContainer = styled.div`
  font-family: 'Arial', sans-serif;
  background-color: #f5f5f5;
  min-height: 100vh;
`;

const ContentContainer = styled.div`
  padding: 20px;
  margin-left: ${props => props.showNavbar ? '250px' : '0'};
`;

function AppContent() {
  const location = useLocation();
  const noNavbarRoutes = ['/login', '/register', '/verify', '/welcome', '/admin'];
  const showNavbar = !noNavbarRoutes.some(route => location.pathname.startsWith(route));

  return (
    <GlobalStateProvider>
    <AppContainer>
      {showNavbar && <Navbar />}
      <ContentContainer showNavbar={showNavbar}>
        <Routes>
        <Route  path="/" element={<ProtectedRoute />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/job-postings" element={<JobPostingDashboard />} />
          <Route path="/candidates" element={<Candidates />} />
          <Route path="/settings" element={<NotificationSettingsPage />} />
          <Route path="/job-applications/:postingId" element={<ApplicationManagement />} />
          <Route path="/subscription" element={<PremiumPlans/>}/>
          </Route>
          <Route path="/welcome" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegistrationPage />} />
          <Route path="/verify" element={<VerificationPage />} />
          <Route path="/verify/:id" element={<VerifyMail />} />
          <Route path="/admin" element={<AdminDashboardPage />} />
        </Routes>
      </ContentContainer>
    </AppContainer>
    </GlobalStateProvider>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;



/*

<AppContainer>
      {showNavbar && <Navbar />}
      <ContentContainer showNavbar={showNavbar}>
        <Routes>
          <Route path="/welcome" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegistrationPage />} />
          <Route path="/verify" element={<VerificationPage />} />
          <Route path="/verify-email" element={<VerifyMail />} />
          <Route path="/" element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } />
          <Route path="/job-postings" element={
            <ProtectedRoute>
              <JobPostingDashboard />
            </ProtectedRoute>
          } />
          <Route path="/candidates" element={
            <ProtectedRoute>
              <Candidates />
            </ProtectedRoute>
          } />
          <Route path="/job-applications/:postingId" element={
            <ProtectedRoute>
              <ApplicationManagement />
            </ProtectedRoute>
          } />
        </Routes>
      </ContentContainer>
    </AppContainer>

*/