import React from 'react';
import { MessageSquare, ChevronRight } from 'lucide-react';
import ChatMessage from './ChatMessage';

const ChatPanel = () => {
  // 模擬聊天數據
  const chatMessages = [
    { id: 1, text: "您好！我是您的AI受託人。您的家庭資產信託本月獲得了+3.2%的收益。有什麼我可以幫您的嗎？", isUser: false },
    { id: 2, text: "我想了解一下退休信託的最新表現。", isUser: true },
    { id: 3, text: "您的退休信託本季度表現優異，增長了8.2%。根據市場分析，我建議增加對可再生能源領域的分配比例。您是否希望查看詳細報告？", isUser: false }
  ];
  
  const quickQuestions = [
    "信託表現報告",
    "調整投資策略",
    "更新受益人"
  ];

  return (
    <div className="bg-gray-800 rounded-xl h-full overflow-hidden border border-gray-700">
      <div className="bg-gray-900 p-4 border-b border-gray-700">
        <h3 className="font-bold flex items-center">
          <MessageSquare className="h-5 w-5 mr-2 text-indigo-400" />
          AI受託人聊天
        </h3>
      </div>
      
      <div className="p-4 h-96 overflow-y-auto">
        <div className="space-y-4">
          {chatMessages.map(message => (
            <ChatMessage 
              key={message.id} 
              message={message.text} 
              isUser={message.isUser} 
            />
          ))}
        </div>
      </div>
      
      <div className="p-4 border-t border-gray-700">
        <div className="relative">
          <input 
            type="text" 
            placeholder="向您的AI受託人提問..." 
            className="w-full bg-gray-700 rounded-lg py-3 px-4 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <button className="absolute right-3 top-1/2 transform -translate-y-1/2">
            <ChevronRight className="h-5 w-5 text-indigo-400" />
          </button>
        </div>
        
        <div className="mt-4">
          <div className="text-xs text-gray-400 mb-2">快速問題</div>
          <div className="flex flex-wrap gap-2">
            {quickQuestions.map((question, index) => (
              <button 
                key={index} 
                className="bg-gray-700 hover:bg-gray-600 rounded-full px-3 py-1 text-xs"
              >
                {question}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatPanel;