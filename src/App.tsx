import React, { useState } from 'react';
import { Navigation } from './components/Navigation';
import { Calculator } from './components/Calculator';
import { DataTable } from './components/DataTable';
import { Background } from './components/Background';
import { Footer } from './components/Footer';

function App() {
  const [activeTab, setActiveTab] = useState<'calculator' | 'data'>('calculator');

  return (
    <div className="min-h-screen text-white relative">
      <Background />
      <Navigation activeTab={activeTab} onTabChange={setActiveTab} />
      
      <main className="relative z-10">
        {activeTab === 'calculator' ? <Calculator /> : <DataTable />}
      </main>
      
      <Footer />
    </div>
  );
}

export default App;