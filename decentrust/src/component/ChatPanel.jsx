"use client";
import React, { useState, useEffect } from 'react';
import { MessageSquare, ChevronRight, Loader2, Settings, ChevronDown } from 'lucide-react';
import ChatMessage from './ChatMessage';

const ChatPanel = () => {
  // 初始聊天消息
  const initialMessages = [
    { id: 1, text: "您好！我是您的AI受託人。您的家庭資產信託本月獲得了+3.2%的收益。有什麼我可以幫您的嗎？", isUser: false }
  ];
  
  const [messages, setMessages] = useState(initialMessages);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [availableModels, setAvailableModels] = useState([]);
  const [selectedModel, setSelectedModel] = useState('llama3.2');
  const [showSettings, setShowSettings] = useState(false);
  const [isOllamaConnected, setIsOllamaConnected] = useState(false);
  
  const quickQuestions = [
    "信託表現報告",
    "調整投資策略",
    "更新受益人"
  ];
  
  // 獲取可用的AI模型
  useEffect(() => {
    const fetchModels = async () => {
      try {
        const response = await fetch('/api/ollama', {
          method: 'GET',
        });
        
        if (response.ok) {
          const data = await response.json();
          if (data.success && data.models) {
            setAvailableModels(data.models);
            setIsOllamaConnected(true);
            
            // 如果有可用模型，選擇第一個
            if (data.models.length > 0) {
              setSelectedModel(data.models[0].name);
            }
          }
        } else {
          setIsOllamaConnected(false);
        }
      } catch (error) {
        console.error('獲取模型列表出錯:', error);
        setIsOllamaConnected(false);
      }
    };
    
    fetchModels();
  }, []);

  // 處理發送消息
  const handleSendMessage = async (text) => {
    if (!text.trim()) return;
    
    // 如果Ollama未連接，顯示錯誤消息
    if (!isOllamaConnected) {
      const errorMessage = { 
        id: Date.now() + 1, 
        text: "Ollama服務似乎未運行。請確保您已安裝並運行Ollama，然後重新載入頁面。", 
        isUser: false 
      };
      setMessages(prev => [...prev, errorMessage]);
      return;
    }
    
    // 添加用戶消息到聊天
    const userMessage = { id: Date.now(), text, isUser: true };
    setMessages(prev => [...prev, userMessage]);
    
    // 清空輸入並設置載入狀態
    setInputMessage('');
    setIsLoading(true);
    
    try {
      // 發送請求到Ollama API
      const response = await fetch('/api/ollama', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          message: text,
          history: messages,
          model: selectedModel,
          options: {
            temperature: 0.7 // 可以根據需要調整
          }
        }),
      });
      
      if (!response.ok) {
        throw new Error('API請求失敗');
      }
      
      const data = await response.json();
      
      if (data.success) {
        // 添加AI回應
        const aiMessage = { id: Date.now() + 1, text: data.message, isUser: false };
        setMessages(prev => [...prev, aiMessage]);
      } else {
        // 添加錯誤消息
        const errorMessage = { id: Date.now() + 1, text: "抱歉，我現在無法回應。請稍後再試。", isUser: false };
        setMessages(prev => [...prev, errorMessage]);
      }
    } catch (error) {
      console.error('發送消息出錯:', error);
      // 添加錯誤消息
      const errorMessage = { id: Date.now() + 1, text: "連接AI服務時出現問題。請檢查您的網絡連接。", isUser: false };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  // 處理提交表單
  const handleSubmit = (e) => {
    e.preventDefault();
    handleSendMessage(inputMessage);
  };

  // 處理快速問題點擊
  const handleQuickQuestion = (question) => {
    handleSendMessage(question);
  };

  return (
    <div className="bg-gray-800 rounded-xl h-full overflow-hidden border border-gray-700">
      <div className="bg-gray-900 p-4 border-b border-gray-700">
        <div className="flex justify-between items-center">
          <h3 className="font-bold flex items-center">
            <MessageSquare className="h-5 w-5 mr-2 text-indigo-400" />
            AI受託人聊天
          </h3>
          
          <div className="relative">
            <button 
              onClick={() => setShowSettings(!showSettings)}
              className="text-gray-400 hover:text-white"
            >
              <Settings className="h-5 w-5" />
            </button>
            
            {showSettings && (
              <div className="absolute right-0 mt-2 w-60 bg-gray-700 rounded-lg shadow-lg z-10 p-3">
                <div className="text-sm font-medium mb-2">AI模型設置</div>
                <div className="mb-3">
                  <label className="text-xs text-gray-400 block mb-1">選擇模型</label>
                  <div className="relative">
                    <select
                      value={selectedModel}
                      onChange={(e) => setSelectedModel(e.target.value)}
                      className="w-full bg-gray-800 text-white rounded-lg py-2 px-3 pr-8 appearance-none text-sm"
                      disabled={availableModels.length === 0}
                    >
                      {availableModels.length === 0 ? (
                        <option>無可用模型</option>
                      ) : (
                        availableModels.map(model => (
                          <option key={model.name} value={model.name}>
                            {model.name}
                          </option>
                        ))
                      )}
                    </select>
                    <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  </div>
                </div>
                
                <div className="text-xs text-gray-400 flex items-center mt-3">
                  <div className={`h-2 w-2 rounded-full mr-1 ${isOllamaConnected ? 'bg-green-500' : 'bg-red-500'}`}></div>
                  <span>
                    {isOllamaConnected 
                      ? 'Ollama已連接' 
                      : 'Ollama未連接 - 請確保服務已運行'}
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      
      <div className="p-4 h-96 overflow-y-auto">
        <div className="space-y-4">
          {messages.map(message => (
            <ChatMessage 
              key={message.id} 
              message={message.text} 
              isUser={message.isUser} 
            />
          ))}
          
          {isLoading && (
            <div className="flex items-start">
              <div className="h-8 w-8 rounded-full bg-indigo-600 flex items-center justify-center mr-3 flex-shrink-0">
                <Loader2 className="h-4 w-4 animate-spin" />
              </div>
              <div className="bg-gray-700 rounded-lg rounded-tl-none p-3 text-sm max-w-xs">
                <p>正在思考...</p>
              </div>
            </div>
          )}
        </div>
      </div>
      
      <div className="p-4 border-t border-gray-700">
        <form onSubmit={handleSubmit} className="relative">
          <input 
            type="text" 
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            placeholder="向您的AI受託人提問..." 
            className="w-full bg-gray-700 rounded-lg py-3 px-4 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            disabled={isLoading}
          />
          <button 
            type="submit" 
            className="absolute right-3 top-1/2 transform -translate-y-1/2"
            disabled={isLoading}
          >
            <ChevronRight className={`h-5 w-5 ${isLoading ? 'text-gray-500' : 'text-indigo-400'}`} />
          </button>
        </form>
        
        <div className="mt-4">
          <div className="text-xs text-gray-400 mb-2">快速問題</div>
          <div className="flex flex-wrap gap-2">
            {quickQuestions.map((question, index) => (
              <button 
                key={index} 
                className="bg-gray-700 hover:bg-gray-600 rounded-full px-3 py-1 text-xs"
                onClick={() => handleQuickQuestion(question)}
                disabled={isLoading}
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