import React, { useState, useEffect } from 'react';
import { Zap, Clock, DollarSign, TrendingUp, Sparkles } from 'lucide-react';
import { calculateLevelProgression, formatTime } from '../utils/calculator';
import { CalculationResult } from '../types';

export const Calculator: React.FC = () => {
  const [currentLevel, setCurrentLevel] = useState<number | ''>('');
  const [desiredLevel, setDesiredLevel] = useState<number | ''>('');
  const [result, setResult] = useState<CalculationResult | null>(null);
  const [totalToMax, setTotalToMax] = useState<CalculationResult | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);

  useEffect(() => {
    if (currentLevel && desiredLevel && typeof currentLevel === 'number' && typeof desiredLevel === 'number' && currentLevel < desiredLevel) {
      setIsCalculating(true);
      setTimeout(() => {
        const calculationResult = calculateLevelProgression(currentLevel, desiredLevel);
        setResult(calculationResult);
        setIsCalculating(false);
      }, 800);
    } else {
      setResult(null);
    }

    // Calculate total to level 100 when current level is set
    if (currentLevel && typeof currentLevel === 'number' && currentLevel >= 50 && currentLevel < 100) {
      const totalResult = calculateLevelProgression(currentLevel, 100);
      setTotalToMax(totalResult);
    } else {
      setTotalToMax(null);
    }
  }, [currentLevel, desiredLevel]);

  return (
    <div className="min-h-screen pt-24 pb-12 px-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-5xl font-bold bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent mb-4">
            EXP Calculator
          </h2>
          <p className="text-gray-400 text-lg">
            Calculate the time and cost to reach your desired level
          </p>
        </div>

        {/* Input Section */}
        <div className="bg-gradient-to-br from-gray-900/50 to-gray-800/30 backdrop-blur-xl rounded-3xl p-8 mb-8 border border-cyan-500/20 shadow-2xl shadow-cyan-500/10">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <label className="block text-cyan-400 font-medium text-sm uppercase tracking-wider">
                Current Level
              </label>
              <div className="relative group">
                <input
                  type="number"
                  min="50"
                  max="99"
                  placeholder="Enter level"
                  value={currentLevel}
                  onChange={(e) => setCurrentLevel(e.target.value === '' ? '' : parseInt(e.target.value))}
                  className="w-full bg-black/40 border border-cyan-500/30 rounded-xl px-6 py-4 text-white text-2xl font-bold focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-all duration-300 group-hover:border-cyan-400/50 placeholder-gray-500"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
              </div>
              {currentLevel && typeof currentLevel === 'number' && currentLevel < 50 && (
                <p className="text-red-400 text-sm mt-2">
                  Minimum current level should be 50
                </p>
              )}
            </div>

            <div className="space-y-4">
              <label className="block text-cyan-400 font-medium text-sm uppercase tracking-wider">
                Desired Level
              </label>
              <div className="relative group">
                <input
                  type="number"
                  min="50"
                  max="100"
                  placeholder="Enter level"
                  value={desiredLevel}
                  onChange={(e) => setDesiredLevel(e.target.value === '' ? '' : parseInt(e.target.value))}
                  className="w-full bg-black/40 border border-cyan-500/30 rounded-xl px-6 py-4 text-white text-2xl font-bold focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-all duration-300 group-hover:border-cyan-400/50 placeholder-gray-500"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
              </div>
            </div>
          </div>
        </div>

        {/* Results Section */}
        {isCalculating && (
          <div className="bg-gradient-to-br from-gray-900/50 to-gray-800/30 backdrop-blur-xl rounded-3xl p-8 border border-cyan-500/20 shadow-2xl shadow-cyan-500/10">
            <div className="flex items-center justify-center space-x-4">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-cyan-400"></div>
              <span className="text-cyan-400 font-medium">Calculating...</span>
            </div>
          </div>
        )}

        {result && !isCalculating && (
          <div className="space-y-6 animate-fadeIn">
            {/* Summary Cards */}
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-gradient-to-br from-cyan-900/30 to-cyan-800/20 backdrop-blur-xl rounded-2xl p-6 border border-cyan-500/30 shadow-xl shadow-cyan-500/10 transform hover:scale-105 transition-all duration-300">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-cyan-400 to-cyan-600 rounded-xl flex items-center justify-center">
                    <Clock className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm uppercase tracking-wider">Total Time</p>
                    <p className="text-2xl font-bold text-white">{formatTime(result.totalTime)}</p>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-green-900/30 to-green-800/20 backdrop-blur-xl rounded-2xl p-6 border border-green-500/30 shadow-xl shadow-green-500/10 transform hover:scale-105 transition-all duration-300">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-green-600 rounded-xl flex items-center justify-center">
                    <DollarSign className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm uppercase tracking-wider">Total Cost</p>
                    <p className="text-2xl font-bold text-white">${result.totalCost.toFixed(2)}</p>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-purple-900/30 to-purple-800/20 backdrop-blur-xl rounded-2xl p-6 border border-purple-500/30 shadow-xl shadow-purple-500/10 transform hover:scale-105 transition-all duration-300">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-purple-600 rounded-xl flex items-center justify-center">
                    <Zap className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm uppercase tracking-wider">Total EXP</p>
                    <p className="text-2xl font-bold text-white">{result.totalExp.toLocaleString()}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Total to Level 100 Section */}
        {totalToMax && currentLevel && typeof currentLevel === 'number' && currentLevel >= 50 && (
          <div className="mt-8 bg-gradient-to-br from-gray-900/40 to-gray-800/20 backdrop-blur-xl rounded-3xl p-8 border border-yellow-500/20 shadow-2xl shadow-yellow-500/10 animate-fadeIn">
            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent mb-2">
                Total to Level 100
              </h3>
              <p className="text-gray-400">Complete progression from level {currentLevel} to maximum level</p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-gradient-to-br from-yellow-900/20 to-orange-900/20 backdrop-blur-xl rounded-2xl p-6 border border-yellow-500/20 shadow-xl shadow-yellow-500/5">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-xl flex items-center justify-center">
                    <Clock className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm uppercase tracking-wider">Total Time</p>
                    <p className="text-xl font-bold text-white">{formatTime(totalToMax.totalTime)}</p>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-yellow-900/20 to-orange-900/20 backdrop-blur-xl rounded-2xl p-6 border border-yellow-500/20 shadow-xl shadow-yellow-500/5">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-xl flex items-center justify-center">
                    <DollarSign className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm uppercase tracking-wider">Total Cost</p>
                    <p className="text-xl font-bold text-white">${totalToMax.totalCost.toFixed(2)}</p>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-yellow-900/20 to-orange-900/20 backdrop-blur-xl rounded-2xl p-6 border border-yellow-500/20 shadow-xl shadow-yellow-500/5">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-xl flex items-center justify-center">
                    <Zap className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm uppercase tracking-wider">Total EXP</p>
                    <p className="text-xl font-bold text-white">{totalToMax.totalExp.toLocaleString()}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        {currentLevel && desiredLevel && typeof currentLevel === 'number' && typeof desiredLevel === 'number' && currentLevel >= desiredLevel && (
          <div className="bg-gradient-to-br from-red-900/30 to-red-800/20 backdrop-blur-xl rounded-3xl p-8 border border-red-500/30 shadow-xl shadow-red-500/10">
            <div className="text-center">
              <p className="text-red-400 text-lg font-medium">
                Desired level must be higher than current level
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};