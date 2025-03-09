import React from 'react';
import { Shield, User } from 'lucide-react';

const ChatMessage = ({ message, isUser }) => {
  return (
    <div className={`flex items-start ${isUser ? 'justify-end' : ''}`}>
      {!isUser && (
        <div className="h-8 w-8 rounded-full bg-indigo-600 flex items-center justify-center mr-3 flex-shrink-0">
          <Shield className="h-4 w-4" />
        </div>
      )}
      
      <div className={`${isUser ? 'bg-indigo-900 rounded-tr-none' : 'bg-gray-700 rounded-tl-none'} rounded-lg p-3 text-sm max-w-xs`}>
        <p>{message}</p>
      </div>
      
      {isUser && (
        <div className="h-8 w-8 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 flex items-center justify-center ml-3 flex-shrink-0">
          <User className="h-4 w-4" />
        </div>
      )}
    </div>
  );
};

export default ChatMessage;
