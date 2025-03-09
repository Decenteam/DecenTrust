import React from 'react';

const TrustCard = ({ data }) => {
  const { 
    title, 
    lastUpdated, 
    totalAssets, 
    beneficiaries, 
    aiTrustee, 
    aiStatus, 
    nextDistribution, 
    growthRate, 
    lockUntil, 
    icon: Icon, 
    iconBgColor, 
    iconColor 
  } = data;

  return (
    <div className="rounded-xl bg-gradient-to-r from-gray-800 to-gray-700 p-1">
      <div className="bg-gray-800 rounded-lg p-5 h-full">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center">
            <div className={`h-10 w-10 rounded-lg ${iconBgColor} flex items-center justify-center mr-3`}>
              <Icon className={`h-5 w-5 ${iconColor}`} />
            </div>
            <div>
              <h3 className="font-bold">{title}</h3>
              <p className="text-xs text-gray-400">上次更新: {lastUpdated}</p>
            </div>
          </div>
          <div className="text-right">
            <div className="text-sm text-gray-400">總資產</div>
            <div className="font-bold text-lg">{totalAssets}</div>
          </div>
        </div>
        
        <div className="space-y-3">
          <div className="flex justify-between items-center text-sm">
            <div className="text-gray-400">受益人</div>
            <div>{beneficiaries}</div>
          </div>
          <div className="flex justify-between items-center text-sm">
            <div className="text-gray-400">AI受託人</div>
            <div className="flex items-center">
              <span className={`h-2 w-2 rounded-full bg-${aiStatus === 'active' ? 'green' : 'yellow'}-400 mr-2`}></span>
              {aiTrustee}
            </div>
          </div>
          {nextDistribution && (
            <div className="flex justify-between items-center text-sm">
              <div className="text-gray-400">下次分配</div>
              <div>{nextDistribution}</div>
            </div>
          )}
          {growthRate && (
            <div className="flex justify-between items-center text-sm">
              <div className="text-gray-400">增長率 (YTD)</div>
              <div className="text-green-400">{growthRate}</div>
            </div>
          )}
          {lockUntil && (
            <div className="flex justify-between items-center text-sm">
              <div className="text-gray-400">鎖定至</div>
              <div>{lockUntil}</div>
            </div>
          )}
        </div>
        
        <div className="mt-4 pt-4 border-t border-gray-700 flex justify-end">
          <button className="text-indigo-400 hover:text-indigo-300 text-sm font-medium">管理信託</button>
        </div>
      </div>
    </div>
  );
};

export default TrustCard;