import React, { useState } from 'react';
import { Search, Zap, Clock, DollarSign } from 'lucide-react';
import { parseLevelData } from '../utils/csvParser';
import { formatTime } from '../utils/calculator';

export const DataTable: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const levelData = parseLevelData();

  const filteredData = levelData.filter(item =>
    item.fromLevel.toString().includes(searchTerm) ||
    item.toLevel.toString().includes(searchTerm)
  );

  return (
    <div className="min-h-screen pt-24 pb-12 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-5xl font-bold bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent mb-4">
            Level Data
          </h2>
          <p className="text-gray-400 text-lg">
            Complete breakdown of EXP requirements for each level
          </p>
        </div>

        {/* Controls */}
        <div className="bg-gradient-to-br from-gray-900/50 to-gray-800/30 backdrop-blur-xl rounded-3xl p-6 mb-8 border border-cyan-500/20 shadow-2xl shadow-cyan-500/10">
          <div className="flex justify-center">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search levels..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-black/40 border border-gray-600/50 rounded-xl pl-12 pr-4 py-3 text-white focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-all duration-300"
              />
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="bg-gradient-to-br from-gray-900/50 to-gray-800/30 backdrop-blur-xl rounded-3xl border border-cyan-500/20 shadow-2xl shadow-cyan-500/10 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gradient-to-r from-cyan-900/50 to-blue-900/50 border-b border-cyan-500/30">
                  <th 
                    className="px-6 py-4 text-left text-cyan-400 font-bold uppercase tracking-wider"
                  >
                    Level Range
                  </th>
                  <th 
                    className="px-6 py-4 text-left text-cyan-400 font-bold uppercase tracking-wider"
                  >
                    <div className="flex items-center space-x-2">
                      <Zap className="w-4 h-4" />
                      <span>EXP Needed</span>
                    </div>
                  </th>
                  <th 
                    className="px-6 py-4 text-left text-cyan-400 font-bold uppercase tracking-wider"
                  >
                    <div className="flex items-center space-x-2">
                      <Clock className="w-4 h-4" />
                      <span>Time Required</span>
                    </div>
                  </th>
                  <th 
                    className="px-6 py-4 text-left text-cyan-400 font-bold uppercase tracking-wider"
                  >
                    <div className="flex items-center space-x-2">
                      <DollarSign className="w-4 h-4" />
                      <span>Cost (USD)</span>
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredData.map((item, index) => (
                  <tr
                    key={`${item.fromLevel}-${item.toLevel}`}
                    className="border-b border-gray-700/30 hover:bg-cyan-500/5 transition-all duration-300 group"
                    style={{
                      animationDelay: `${index * 50}ms`
                    }}
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-transparent border border-cyan-500/50 rounded-lg flex items-center justify-center text-cyan-400 font-bold text-sm hover:bg-cyan-500/10 transition-all duration-300">
                          {item.fromLevel}
                        </div>
                        <div className="w-4 h-0.5 bg-gradient-to-r from-cyan-400 to-blue-400 group-hover:from-cyan-300 group-hover:to-blue-300 transition-all duration-300"></div>
                        <div className="w-8 h-8 bg-transparent border border-purple-500/50 rounded-lg flex items-center justify-center text-purple-400 font-bold text-sm hover:bg-purple-500/10 transition-all duration-300">
                          {item.toLevel}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-white font-bold text-lg">
                        {item.expNeeded.toLocaleString()}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-cyan-400 font-medium">
                        {formatTime(item.totalHours)}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-green-400 font-bold">
                        ${item.costUSD.toFixed(2)}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};