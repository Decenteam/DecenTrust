import React from 'react';
import { Shield, Menu, User, Bell } from 'lucide-react';
import ConnetWalletBtn from './connetWalletBTN';
const Navbar = () => {
  return (
    <nav className="border-b border-gray-700 bg-gray-900 backdrop-blur-md bg-opacity-90 px-6 py-4 flex items-center justify-between sticky top-0 z-50">
      <div className="flex items-center space-x-2">
        <Shield className="text-indigo-400 h-7 w-7" />
        <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-400">DecenTrust</span>
      </div>
      
      <div className="hidden md:flex items-center space-x-8">
        <a href="/" className="hover:text-indigo-400 transition-colors text-gray-400">信託管理</a>
        <a href="add" className="hover:text-indigo-400 transition-colors text-gray-400">創建</a>
        <a href="portfolio" className="hover:text-indigo-400 transition-colors text-gray-400">投資組合</a>
        <a href="#" className="hover:text-indigo-400 transition-colors text-gray-400">文檔</a>
      </div>
      
      <div className="flex items-center space-x-4">
        <Bell className="h-5 w-5 text-gray-400 hover:text-white cursor-pointer" />
        <div className="h-8 w-8 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 flex items-center justify-center cursor-pointer">
          <User className="h-4 w-4" />
        </div>
        <Menu className="h-5 w-5 md:hidden cursor-pointer" />
      </div>
      <div className="relative group">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full blur opacity-60 group-hover:opacity-100 transition duration-300"></div>
            <div className="relative">
              <ConnetWalletBtn />
            </div>
          </div>
    </nav>
  );
};

export default Navbar;