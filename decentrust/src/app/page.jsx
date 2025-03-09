// 6. App 主應用組件
import React from 'react';
import Navbar from '../component/Navbar';
import TrustDashboard from '../component/TrustDashboard';
import ChatPanel from '../component/ChatPanel'
const App = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white font-sans">
      <Navbar />
      
      <div className="container mx-auto px-4 py-6 flex flex-col md:flex-row gap-6">
        <TrustDashboard />
        
        <div className="w-full md:w-1/3">
          <ChatPanel />
        </div>
      </div>
    </div>
  );
};

export default App;