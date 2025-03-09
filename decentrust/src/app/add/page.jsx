"use client";
import React, { useState } from 'react';
import { ArrowLeft, CreditCard, Info, BarChart2, ChevronDown, DollarSign, Percent } from 'lucide-react';
import Navbar from '../../component/Navbar';

const AddInvestment = () => {
  const [selectedTrust, setSelectedTrust] = useState('家庭資產信託');
  const [investmentAmount, setInvestmentAmount] = useState('');
  const [investmentType, setInvestmentType] = useState('ETH');

  // 模擬信託數據
  const trustOptions = [
    { id: 1, name: "家庭資產信託", icon: CreditCard, iconBgColor: "bg-indigo-900", iconColor: "text-indigo-400", balance: "3.45 ETH" },
    { id: 2, name: "退休投資信託", icon: BarChart2, iconBgColor: "bg-purple-900", iconColor: "text-purple-400", balance: "12.8 ETH" },
    { id: 3, name: "教育基金信託", icon: CreditCard, iconBgColor: "bg-blue-900", iconColor: "text-blue-400", balance: "5.67 ETH" }
  ];

  // 尋找選定的信託
  const selectedTrustData = trustOptions.find(trust => trust.name === selectedTrust);
  
  // 資產類型選項
  const assetTypes = ["ETH", "USDC", "BTC", "DAI"];
  
  // 推薦的投資配置
  const recommendedAllocations = [
    { name: "保守型", description: "低風險，穩定收益", allocation: [
      { asset: "穩定幣", percentage: 60 },
      { asset: "藍籌加密貨幣", percentage: 30 },
      { asset: "DeFi收益產品", percentage: 10 }
    ]},
    { name: "平衡型", description: "中等風險與回報", allocation: [
      { asset: "穩定幣", percentage: 40 },
      { asset: "藍籌加密貨幣", percentage: 40 },
      { asset: "DeFi收益產品", percentage: 20 }
    ]},
    { name: "進取型", description: "高風險，高潛在回報", allocation: [
      { asset: "穩定幣", percentage: 20 },
      { asset: "藍籌加密貨幣", percentage: 50 },
      { asset: "DeFi收益產品", percentage: 30 }
    ]}
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white font-sans">
      <Navbar />
      
      <div className="container mx-auto px-4 py-6">
        <div className="mb-6">
          <button className="flex items-center text-gray-400 hover:text-white transition-colors">
            <ArrowLeft className="h-4 w-4 mr-2" />
            <span>返回信託儀表板</span>
          </button>
        </div>
        
        <h1 className="text-2xl font-bold mb-8">增加信託投資</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2 space-y-6">
            {/* 選擇信託 */}
            <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
              <h2 className="text-lg font-semibold mb-4">選擇信託</h2>
              
              <div className="space-y-3">
                {trustOptions.map(trust => {
                  const Icon = trust.icon;
                  return (
                    <div 
                      key={trust.id}
                      onClick={() => setSelectedTrust(trust.name)}
                      className={`flex items-center justify-between p-3 rounded-lg cursor-pointer transition-colors ${selectedTrust === trust.name ? 'bg-gray-700' : 'bg-gray-800 hover:bg-gray-700'}`}
                    >
                      <div className="flex items-center">
                        <div className={`h-10 w-10 rounded-lg ${trust.iconBgColor} flex items-center justify-center mr-3`}>
                          <Icon className={`h-5 w-5 ${trust.iconColor}`} />
                        </div>
                        <div>
                          <h3 className="font-medium">{trust.name}</h3>
                          <p className="text-xs text-gray-400">當前餘額: {trust.balance}</p>
                        </div>
                      </div>
                      <div className={`h-5 w-5 rounded-full border ${selectedTrust === trust.name ? 'bg-indigo-500 border-indigo-500' : 'border-gray-600'} flex items-center justify-center`}>
                        {selectedTrust === trust.name && <div className="h-2 w-2 rounded-full bg-white"></div>}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            
            {/* 投資金額 */}
            <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
              <h2 className="text-lg font-semibold mb-4">投資金額</h2>
              
              <div className="relative">
                <input
                  type="text"
                  value={investmentAmount}
                  onChange={(e) => setInvestmentAmount(e.target.value)}
                  placeholder="輸入金額"
                  className="w-full bg-gray-700 rounded-lg py-3 px-4 pr-20 text-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <div className="absolute right-2 top-1/2 transform -translate-y-1/2">
                  <select
                    value={investmentType}
                    onChange={(e) => setInvestmentType(e.target.value)}
                    className="bg-gray-600 rounded-lg py-1 px-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  >
                    {assetTypes.map(type => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                </div>
              </div>
              
              <div className="mt-4 flex gap-3">
                <button className="bg-gray-700 hover:bg-gray-600 rounded-lg px-4 py-2 text-sm">+ 1 {investmentType}</button>
                <button className="bg-gray-700 hover:bg-gray-600 rounded-lg px-4 py-2 text-sm">+ 5 {investmentType}</button>
                <button className="bg-gray-700 hover:bg-gray-600 rounded-lg px-4 py-2 text-sm">+ 10 {investmentType}</button>
                <button className="bg-gray-700 hover:bg-gray-600 rounded-lg px-4 py-2 text-sm">全部</button>
              </div>
              
              <div className="mt-4 text-sm text-gray-400 flex items-center">
                <Info className="h-4 w-4 mr-2" />
                <span>當前錢包餘額：42.5 ETH</span>
              </div>
            </div>
            
            {/* 投資配置 */}
            <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
              <h2 className="text-lg font-semibold mb-4">投資配置建議</h2>
              
              <div className="space-y-6">
                {recommendedAllocations.map((allocation, index) => (
                  <div key={index} className="bg-gray-700 rounded-lg p-4">
                    <div className="flex justify-between items-center mb-3">
                      <h3 className="font-medium">{allocation.name}</h3>
                      <span className="text-xs text-gray-400">{allocation.description}</span>
                    </div>
                    
                    <div className="space-y-2">
                      {allocation.allocation.map((item, idx) => (
                        <div key={idx} className="flex items-center justify-between text-sm">
                          <span>{item.asset}</span>
                          <span className="text-indigo-400">{item.percentage}%</span>
                        </div>
                      ))}
                    </div>
                    
                    <button className="w-full mt-4 bg-indigo-600 hover:bg-indigo-700 rounded-lg py-2 font-medium transition-colors">
                      選擇此配置
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          {/* 摘要 */}
          <div className="md:col-span-1">
            <div className="bg-gray-800 rounded-xl p-6 border border-gray-700 sticky top-20">
              <h2 className="text-lg font-semibold mb-4">投資摘要</h2>
              
              {selectedTrustData && (
                <div className="mb-6">
                  <div className="flex items-center mb-4">
                    <div className={`h-10 w-10 rounded-lg ${selectedTrustData.iconBgColor} flex items-center justify-center mr-3`}>
                      <selectedTrustData.icon className={`h-5 w-5 ${selectedTrustData.iconColor}`} />
                    </div>
                    <div>
                      <h3 className="font-medium">{selectedTrustData.name}</h3>
                    </div>
                  </div>
                </div>
              )}
              
              <div className="space-y-4 mb-6">
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">投資金額</span>
                  <span className="font-medium">{investmentAmount || '0'} {investmentType}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">投資配置</span>
                  <span className="font-medium">自定義</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">估計年化回報</span>
                  <span className="text-green-400">+5.8%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">智能合約費用</span>
                  <span className="font-medium">0.005 ETH</span>
                </div>
              </div>
              
              <div className="pt-4 border-t border-gray-700">
                <button className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 rounded-lg py-3 font-medium transition-colors">
                  確認投資
                </button>
                <button className="w-full mt-3 border border-gray-600 hover:border-gray-500 rounded-lg py-3 font-medium transition-colors">
                  取消
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddInvestment;