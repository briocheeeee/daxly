import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import HomePage from './components/HomePage';
import SignUpPage from './components/SignUpPage';
import LoginPage from './components/LoginPage';
import ForgotPasswordPage from './components/ForgotPasswordPage';
import DocsPage from './components/DocsPage';
import ChatPage from './components/ChatPage';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/docs" element={<DocsPage />} />
          <Route path="/chat" element={<ChatPage />} />
          <Route path="/:chatId" element={<ChatPage />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;