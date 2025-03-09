"use client";
import React, { useState } from 'react';
import { PieChart, Pie, Line, LineChart, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell, BarChart, Bar } from 'recharts';
import { ArrowUp, ArrowDown, Calendar, Download, Filter, RefreshCcw, Settings, Clock } from 'lucide-react';
import Navbar from '../../component/Navbar';

const PortfolioPage = () => {
  const [timeRange, setTimeRange] = useState('1m');
  
  // 模擬資產數據
  const assetData = [
    { name: 'ETH', value: 45, amount: '15.8 ETH', usdValue: '$32,450', change: 12.4 },
    { name: 'BTC', value: 25, amount: '0.56 BTC', usdValue: '$18,200', change: 8.7 },
    { name: 'USDC', value: 15, amount: '12,500 USDC', usdValue: '$12,500', change: 0.1 },
    { name: 'DAI', value: 10, amount: '8,300 DAI', usdValue: '$8,300', change: 0.2 },
    { name: 'LINK', value: 5, amount: '750 LINK', usdValue: '$4,125', change: -3.5 },
  ];
  
  // 模擬信託分配數據
  const trustAllocationData = [
    { name: '家庭資產信託', value: 45, color: '#6366f1' },
    { name: '退休投資信託', value: 40, color: '#a855f7' },
    { name: '教育基金信託', value: 15, color: '#3b82f6' },
  ];
  
  // 模擬時間序列數據
  const performanceData = [
    { name: '2月', ethValue: 10.5, usdValue: 21000, totalValue: 36500 },
    { name: '3月', ethValue: 12.2, usdValue: 22500, totalValue: 39800 },
    { name: '4月', ethValue: 14.8, usdValue: 23000, totalValue: 42300 },
    { name: '5月', ethValue: 13.5, usdValue: 24500, totalValue: 43500 },
    { name: '6月', ethValue: 15.2, usdValue: 25000, totalValue: 47500 },
    { name: '7月', ethValue: 16.8, usdValue: 27000, totalValue: 54200 },
    { name: '8月', ethValue: 17.5, usdValue: 29000, totalValue: 59800 },
    { name: '9月', ethValue: 19.2, usdValue: 31000, totalValue: 64800 },
    { name: '10月', ethValue: 18.5, usdValue: 32000, totalValue: 67500 },
    { name: '11月', ethValue: 20.2, usdValue: 33500, totalValue: 72000 },
    { name: '12月', ethValue: 21.5, usdValue: 35000, totalValue: 75500 },
    { name: '1月', ethValue: 22.8, usdValue: 38000, totalValue: 78500 },
  ];
  
  // 計算總價值
  const totalValue = assetData.reduce((total, asset) => {
    return total + parseInt(asset.usdValue.replace(/[^0-9.-]+/g, ''));
  }, 0);
  
  // 時間範圍選項
  const timeRangeOptions = [
    { value: '1w', label: '1週' },
    { value: '1m', label: '1個月' },
    { value: '3m', label: '3個月' },
    { value: '6m', label: '6個月' },
    { value: '1y', label: '1年' },
    { value: 'all', label: '全部' },
  ];
  
  // 顏色
  const COLORS = ['#6366f1', '#8b5cf6', '#ec4899', '#14b8a6', '#f97316', '#f43f5e'];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white font-sans">
      <Navbar />
      
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">投資組合概覽</h1>
          
          <div className="flex items-center space-x-3 mt-4 md:mt-0">
            <button className="flex items-center bg-gray-700 hover:bg-gray-600 rounded-lg px-4 py-2">
              <Download className="h-4 w-4 mr-2" />
              <span>導出報告</span>
            </button>
            <button className="flex items-center bg-gray-700 hover:bg-gray-600 rounded-lg px-4 py-2">
              <RefreshCcw className="h-4 w-4 mr-2" />
              <span>刷新數據</span>
            </button>
            <button className="flex items-center bg-gray-700 hover:bg-gray-600 rounded-lg px-4 py-2">
              <Settings className="h-4 w-4" />
            </button>
          </div>
        </div>
        
        {/* 投資組合總覽 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
            <h2 className="text-lg font-semibold mb-4">總資產價值</h2>
            <div className="text-3xl font-bold mb-2">${totalValue.toLocaleString()}</div>
            <div className="flex items-center text-green-400 mb-4">
              <ArrowUp className="h-4 w-4 mr-1" />
              <span>+$2,345 (3.1%)</span>
            </div>
            <div className="flex items-center text-xs text-gray-400">
              <Clock className="h-3 w-3 mr-1" />
              <span>上次更新: 今天 14:30</span>
            </div>
          </div>
          
          <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
            <h2 className="text-lg font-semibold mb-4">ETH 價值</h2>
            <div className="text-3xl font-bold mb-2">22.8 ETH</div>
            <div className="flex items-center text-green-400 mb-4">
              <ArrowUp className="h-4 w-4 mr-1" />
              <span>+1.3 ETH (6.2%)</span>
            </div>
            <div className="flex items-center text-xs text-gray-400">
              <Clock className="h-3 w-3 mr-1" />
              <span>當前ETH價格: $2,050.25</span>
            </div>
          </div>
          
          <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
            <h2 className="text-lg font-semibold mb-4">30天收益</h2>
            <div className="text-3xl font-bold mb-2">+$3,560</div>
            <div className="flex items-center text-green-400 mb-4">
              <ArrowUp className="h-4 w-4 mr-1" />
              <span>+4.8%</span>
            </div>
            <div className="text-xs text-gray-400">
              <div className="bg-gray-700 h-2 rounded-full overflow-hidden mt-2">
                <div className="bg-gradient-to-r from-indigo-500 to-purple-500 h-full" style={{ width: '65%' }}></div>
              </div>
              <div className="flex justify-between mt-1">
                <span>目標: +$5,500</span>
                <span>65%</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* 資產分配和績效圖表 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="bg-gray-800 rounded-xl p-6 border border-gray-700 md:col-span-2">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-semibold">投資組合績效</h2>
              <div className="flex bg-gray-700 rounded-lg overflow-hidden">
                {timeRangeOptions.map(option => (
                  <button
                    key={option.value}
                    onClick={() => setTimeRange(option.value)}
                    className={`px-3 py-1 text-xs ${timeRange === option.value ? 'bg-indigo-600' : 'hover:bg-gray-600'}`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>
            
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={performanceData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                  <XAxis dataKey="name" stroke="#aaa" />
                  <YAxis stroke="#aaa" />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#1f2937', borderColor: '#374151' }}
                    itemStyle={{ color: '#fff' }}
                  />
                  <Legend />
                  <Line type="monotone" dataKey="totalValue" stroke="#6366f1" strokeWidth={2} dot={false} name="總價值 ($)" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
          
          <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
            <h2 className="text-lg font-semibold mb-6">資產分配</h2>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={assetData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={2}
                    dataKey="value"
                  >
                    {assetData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#1f2937', borderColor: '#374151' }}
                    itemStyle={{ color: '#fff' }}
                    formatter={(value) => `${value}%`}
                  />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
        
        {/* 資產列表 */}
        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700 mb-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-semibold">資產清單</h2>
            <button className="flex items-center bg-gray-700 hover:bg-gray-600 rounded-lg px-3 py-1 text-sm">
              <Filter className="h-4 w-4 mr-1" />
              <span>篩選</span>
            </button>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-700">
                  <th className="text-left py-3 px-4 font-medium text-gray-400">資產</th>
                  <th className="text-right py-3 px-4 font-medium text-gray-400">數量</th>
                  <th className="text-right py-3 px-4 font-medium text-gray-400">USD價值</th>
                  <th className="text-right py-3 px-4 font-medium text-gray-400">分配</th>
                  <th className="text-right py-3 px-4 font-medium text-gray-400">24h變化</th>
                </tr>
              </thead>
              <tbody>
                {assetData.map((asset, index) => (
                  <tr key={index} className="border-b border-gray-700">
                    <td className="py-4 px-4">
                      <div className="flex items-center">
                        <div className="h-8 w-8 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 flex items-center justify-center mr-3">
                          <span className="font-bold text-xs">{asset.name.substring(0, 2)}</span>
                        </div>
                        <span className="font-medium">{asset.name}</span>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-right">{asset.amount}</td>
                    <td className="py-4 px-4 text-right">{asset.usdValue}</td>
                    <td className="py-4 px-4 text-right">{asset.value}%</td>
                    <td className={`py-4 px-4 text-right ${asset.change >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                      <div className="flex items-center justify-end">
                        {asset.change >= 0 ? <ArrowUp className="h-3 w-3 mr-1" /> : <ArrowDown className="h-3 w-3 mr-1" />}
                        <span>{Math.abs(asset.change)}%</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        
        {/* 信託分配和額外統計 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
            <h2 className="text-lg font-semibold mb-6">信託分配</h2>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={trustAllocationData}
                  layout="vertical"
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#444" horizontal={false} />
                  <XAxis type="number" stroke="#aaa" />
                  <YAxis dataKey="name" type="category" stroke="#aaa" width={100} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#1f2937', borderColor: '#374151' }}
                    itemStyle={{ color: '#fff' }}
                    formatter={(value) => `${value}%`}
                  />
                  <Bar dataKey="value" radius={[0, 4, 4, 0]}>
                    {trustAllocationData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
          
          <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
            <h2 className="text-lg font-semibold mb-6">投資組合分析</h2>
            
            <div className="space-y-6">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-400">股權vs債券比例</span>
                  <span className="font-medium">70:30</span>
                </div>
                <div className="bg-gray-700 h-2 rounded-full overflow-hidden">
                  <div className="bg-indigo-500 h-full" style={{ width: '70%' }}></div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-400">風險評分</span>
                  <span className="font-medium">中等 (65/100)</span>
                </div>
                <div className="bg-gray-700 h-2 rounded-full overflow-hidden">
                  <div className="bg-yellow-500 h-full" style={{ width: '65%' }}></div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-400">分散度</span>
                  <span className="font-medium">良好</span>
                </div>
                <div className="bg-gray-700 h-2 rounded-full overflow-hidden">
                  <div className="bg-green-500 h-full" style={{ width: '75%' }}></div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-400">年化收益率 (估計)</span>
                  <span className="font-medium text-green-400">+12.5%</span>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-400">AI投資建議</span>
                  <span className="text-indigo-400 cursor-pointer">查看詳情</span>
                </div>
                <div className="text-sm">
                  基於目前市場趨勢，建議增加穩定幣投資比例，減少BTC敞口。
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PortfolioPage;