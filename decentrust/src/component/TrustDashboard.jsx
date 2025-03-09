// 5. TrustDashboard 信託儀表板組件
import React from 'react';
import { ChevronRight, CreditCard, BarChart2 } from 'lucide-react';
import TrustCard from './TrustCard';

const TrustDashboard = () => {
  // 模擬信託數據
  const trustsData = [
    {
      id: 1,
      title: "家庭資產信託",
      lastUpdated: "今天 14:30",
      totalAssets: "3.45 ETH",
      beneficiaries: "李明 (主要), 王華 (次要)",
      aiTrustee: "TrustAgent #A245",
      aiStatus: "active",
      nextDistribution: "2025年4月15日",
      icon: CreditCard,
      iconBgColor: "bg-indigo-900",
      iconColor: "text-indigo-400"
    },
    {
      id: 2,
      title: "退休投資信託",
      lastUpdated: "昨天 09:15",
      totalAssets: "12.8 ETH",
      beneficiaries: "自己",
      aiTrustee: "FinanceAgent #B112",
      aiStatus: "active",
      growthRate: "+8.2%",
      icon: BarChart2,
      iconBgColor: "bg-purple-900",
      iconColor: "text-purple-400"
    },
    {
      id: 3,
      title: "教育基金信託",
      lastUpdated: "3天前",
      totalAssets: "5.67 ETH",
      beneficiaries: "張小明 (子女)",
      aiTrustee: "EduAgent #C330",
      aiStatus: "warning",
      lockUntil: "2030年9月1日",
      icon: CreditCard,
      iconBgColor: "bg-blue-900",
      iconColor: "text-blue-400"
    }
  ];

  return (
    <div className="w-full md:w-2/3 space-y-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">您的信託</h2>
        <button className="text-sm text-indigo-400 hover:text-indigo-300 flex items-center">
          查看全部 <ChevronRight className="h-4 w-4 ml-1" />
        </button>
      </div>
      
      {trustsData.map(trust => (
        <TrustCard key={trust.id} data={trust} />
      ))}
    </div>
  );
};

export default TrustDashboard;
 