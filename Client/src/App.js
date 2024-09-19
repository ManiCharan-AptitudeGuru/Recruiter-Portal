import React from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import Sidebar from './global/Sidebar/Sidebar';
import Header from './global/Header/Header';
import Footer from './global/Footer/Footer';
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
import Invoice from './pages/Invoice/Invoice';
import { GlobalStateProvider } from './context/GlobalStateContext';
import AdminDashboardPage from './pages/AdminDashboard/AdminDashboardPage';
import ReportDashboard from './components/ReportDashboard/Dashboard';
import CustomForm from './components/CustomForm/CustomForm';
import ReportBuilder from './components/ReportBuilder/ReportBuilder';
import ScheduleManager from './pages/ScheduleManager/ScheduleManager';
import ExportManager from './pages/ExportManager/ExportManager';

const AppContainer = styled.div`
  font-family: 'Arial', sans-serif;
  background-color: #f5f5f5;
  min-height: 100vh;
  display: flex;
`;

const MainContent = styled.main`
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

const ProtectedMainContent = styled(MainContent)`
  margin-left: 270px;
  width: calc(100% - 270px);
`;

const ContentArea = styled.div`
  flex-grow: 1;
`;

const FullWidthContent = styled.div`
  width: 100%;
  min-height: 100vh;
`;

const ProtectedLayout = ({ children }) => {
  return (
    <>
      <Sidebar />
      <ProtectedMainContent>
        <Header />
        <ContentArea>{children}</ContentArea>
        <Footer />
      </ProtectedMainContent>
    </>
  );
};

function AppContent() {
  const location = useLocation();
  const noLayoutRoutes = ['/login', '/register', '/verify', '/welcome', '/admin'];
  const showLayout = !noLayoutRoutes.some(route => location.pathname.startsWith(route));

  return (
    <GlobalStateProvider>
      <AppContainer>
        <Routes>
          <Route path="/" element={<ProtectedRoute />}>
          <Route
              path="/"
              element={<ProtectedLayout><Dashboard /></ProtectedLayout>}
            />
            <Route
              path="/job-postings"
              element={<ProtectedLayout><JobPostingDashboard /></ProtectedLayout>}
            />
            <Route
              path="/candidates"
              element={<ProtectedLayout><Candidates /></ProtectedLayout>}
            />
            <Route
              path="/settings"
              element={<ProtectedLayout><NotificationSettingsPage /></ProtectedLayout>}
            />
            <Route
              path="/job-applications/:postingId"
              element={<ProtectedLayout><ApplicationManagement /></ProtectedLayout>}
            />
            <Route
              path="/subscription"
              element={<ProtectedLayout><PremiumPlans /></ProtectedLayout>}
            />
            <Route
              path="/invoices"
              element={<ProtectedLayout><Invoice /></ProtectedLayout>}
            />
            <Route path= "/reports/dashboard" element={<ProtectedLayout><ReportDashboard/></ProtectedLayout>}/>
            <Route path="/reports/schedule" element={<ProtectedLayout><ScheduleManager/></ProtectedLayout>}/>
            <Route path="/reports/exports" element={<ProtectedLayout><ExportManager/></ProtectedLayout>}/>
            <Route path="/reports/custom-form" element={<ProtectedLayout><CustomForm/></ProtectedLayout>}/>
            <Route path="/reports/custom-form/user" element={<ProtectedLayout> <ReportBuilder/> </ProtectedLayout>}/>
          </Route>
      
          <Route path="/welcome" element={<FullWidthContent><HomePage /></FullWidthContent>} />
          <Route path="/login" element={<FullWidthContent><LoginPage /></FullWidthContent>} />
          <Route path="/register" element={<FullWidthContent><RegistrationPage /></FullWidthContent>} />
          <Route path="/verify" element={<FullWidthContent><VerificationPage /></FullWidthContent>} />
          <Route path="/verify/:id" element={<FullWidthContent><VerifyMail /></FullWidthContent>} />
          <Route path="/admin" element={<FullWidthContent><AdminDashboardPage /></FullWidthContent>} />
        </Routes>
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








// import React from 'react';
// import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
// import styled from 'styled-components';
// import Sidebar from './global/Sidebar/Sidebar';
// import Header from './global/Header/Header';
// import Footer from './global/Footer/Footer';
// import Dashboard from './pages/Dashboard/Dashboard';
// import JobPostingDashboard from './pages/JobPostingDashboard/JobPostingDashboard';
// import ApplicationManagement from './pages/ApplicationManagement/ApplicationManagement';
// import Candidates from './pages/Candidates/Candidates';
// import RegistrationPage from './pages/RegistrationPage/RegistrationPage';
// import LoginPage from './pages/LoginPage/LoginPage';
// import VerificationPage from './pages/VerificationPage/VerificationPage';
// import VerifyMail from './pages/VerifyEmailPage/VerifyEmailPage';
// import NotificationSettingsPage from './pages/NotificationSettingsPage/NotificationSettingsPage';
// import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
// import HomePage from './pages/HomePage/HomePage';
// import PremiumPlans from './components/PremiumPlans/PremiumPlans';
// import Invoice from './pages/Invoice/Invoice';
// import GstManagement from './pages/GstManagement/GstManagement';
// import { GlobalStateProvider } from './context/GlobalStateContext';
// import AdminDashboardPage from './pages/AdminDashboard/AdminDashboardPage';

// const AppContainer = styled.div`
//   font-family: 'Arial', sans-serif;
//   background-color: #f5f5f5;
//   min-height: 100vh;
//   display: flex;
// `;

// const MainContent = styled.main`
//   margin-left: 270px;
//   width: calc(100% - 270px);
//   min-height: 100vh;
//   display: flex;
//   flex-direction: column;
// `;

// const ContentArea = styled.div`
//   flex-grow: 1;
//   padding: 80px 20px 20px; // Adjusted top padding to account for fixed header
// `;

// const ProtectedLayout = ({ children }) => {
//   return (
//     <>
//       <Sidebar />
//       <MainContent>
//         <Header />
//         <ContentArea>{children}</ContentArea>
//         <Footer />
//       </MainContent>
//     </>
//   );
// };

// function AppContent() {
//   const location = useLocation();
//   const noLayoutRoutes = ['/login', '/register', '/verify', '/welcome', '/admin'];
//   const showLayout = !noLayoutRoutes.some(route => location.pathname.startsWith(route));

//   return (
//     <GlobalStateProvider>
//       <AppContainer>
//         <Routes>
//           <Route path="/" element={<ProtectedRoute />}>
//             <Route
//               path="/"
//               element={<ProtectedLayout><Dashboard /></ProtectedLayout>}
//             />
//             <Route
//               path="/job-postings"
//               element={<ProtectedLayout><JobPostingDashboard /></ProtectedLayout>}
//             />
//             <Route
//               path="/candidates"
//               element={<ProtectedLayout><Candidates /></ProtectedLayout>}
//             />
//             <Route
//               path="/settings"
//               element={<ProtectedLayout><NotificationSettingsPage /></ProtectedLayout>}
//             />
//             <Route
//               path="/job-applications/:postingId"
//               element={<ProtectedLayout><ApplicationManagement /></ProtectedLayout>}
//             />
//             <Route
//               path="/subscription"
//               element={<ProtectedLayout><PremiumPlans /></ProtectedLayout>}
//             />
//             <Route
//               path="/invoices"
//               element={<ProtectedLayout><Invoice /></ProtectedLayout>}
//             />
//             <Route
//               path="/gst-remainder"
//               element={<ProtectedLayout><GstManagement /></ProtectedLayout>}
//             />
//           </Route>
//           <Route path="/welcome" element={<HomePage />} />
//           <Route path="/login" element={<LoginPage />} />
//           <Route path="/register" element={<RegistrationPage />} />
//           <Route path="/verify" element={<VerificationPage />} />
//           <Route path="/verify/:id" element={<VerifyMail />} />
//           <Route path="/admin" element={<AdminDashboardPage />} />
//         </Routes>
//       </AppContainer>
//     </GlobalStateProvider>
//   );
// }

// function App() {
//   return (
//     <Router>
//       <AppContent />
//     </Router>
//   );
// }

// export default App;









// import React from 'react';
// import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
// import styled from 'styled-components';
// import Sidebar from './global/Sidebar/Sidebar';
// import Dashboard from './pages/Dashboard/Dashboard';
// import JobPostingDashboard from './pages/JobPostingDashboard/JobPostingDashboard';
// import ApplicationManagement from './pages/ApplicationManagement/ApplicationManagement';
// import Candidates from './pages/Candidates/Candidates';
// import RegistrationPage from './pages/RegistrationPage/RegistrationPage';
// import LoginPage from './pages/LoginPage/LoginPage';
// import VerificationPage from './pages/VerificationPage/VerificationPage';
// import VerifyMail from './pages/VerifyEmailPage/VerifyEmailPage';
// import NotificationSettingsPage from './pages/NotificationSettingsPage/NotificationSettingsPage';
// import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
// import HomePage from './pages/HomePage/HomePage';
// import PremiumPlans from './components/PremiumPlans/PremiumPlans';
// import Invoice from './pages/Invoice/Invoice';
// import GstManagement from './pages/GstManagement/GstManagement';
// import { GlobalStateProvider } from './context/GlobalStateContext';
// import AdminDashboardPage from './pages/AdminDashboard/AdminDashboardPage';

// const AppContainer = styled.div`
//   font-family: 'Arial', sans-serif;
//   background-color: #f5f5f5;
//   min-height: 100vh;
// `;

// const ContentContainer = styled.div`
//   padding: 20px;
//   margin-left: ${props => props.showNavbar ? '250px' : '0'};
// `;

// function AppContent() {
//   const location = useLocation();
//   const noNavbarRoutes = ['/login', '/register', '/verify', '/welcome', '/admin'];
//   const showNavbar = !noNavbarRoutes.some(route => location.pathname.startsWith(route));

//   return (
//     <GlobalStateProvider>
//     <AppContainer>
//       {showNavbar && <Sidebar />}
//       <ContentContainer showNavbar={showNavbar}>
//         <Routes>
//         <Route  path="/" element={<ProtectedRoute />}>
//           <Route path="/" element={<Dashboard />} />
//           <Route path="/job-postings" element={<JobPostingDashboard />} />
//           <Route path="/candidates" element={<Candidates />} />
//           <Route path="/settings" element={<NotificationSettingsPage />} />
//           <Route path="/job-applications/:postingId" element={<ApplicationManagement />} />
//           <Route path="/subscription" element={<PremiumPlans />}/>
//           <Route path="/invoices" element={<Invoice />}/>
//           <Route path="/gst-remainder" element={<GstManagement />}/>
//           </Route>
//           <Route path="/welcome" element={<HomePage />} />
//           <Route path="/login" element={<LoginPage />} />
//           <Route path="/register" element={<RegistrationPage />} />
//           <Route path="/verify" element={<VerificationPage />} />
//           <Route path="/verify/:id" element={<VerifyMail />} />
//           <Route path="/admin" element={<AdminDashboardPage />} />
//         </Routes>
//       </ContentContainer>
//     </AppContainer>
//     </GlobalStateProvider>
//   );
// }

// function App() {
//   return (
//     <Router>
//       <AppContent />
//     </Router>
//   );
// }

// export default App;
