
import React, { useState } from 'react';
import { SearchView } from './components/SearchView';
import { AdminView } from './components/AdminView';
import { INITIAL_SURGICAL_CODES } from './constants';
import type { SurgicalCode } from './types';
import { useLocalStorage } from './hooks/useLocalStorage';
import { GearIcon } from './components/Icons';

function App() {
  const [isAdminView, setIsAdminView] = useState(false);
  const [codes, setCodes] = useLocalStorage<SurgicalCode[]>('surgicalCodes', INITIAL_SURGICAL_CODES);

  return (
    <div className="min-h-screen bg-gray-100 font-sans">
      <header className="bg-white shadow-md sticky top-0 z-10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <h1 className="text-xl md:text-2xl font-bold text-primary-700">
              VGHKS Surgical Code Finder
            </h1>
            <button
              onClick={() => setIsAdminView(!isAdminView)}
              className={`p-2 rounded-full transition-colors duration-300 ${isAdminView ? 'bg-primary-600 text-white' : 'bg-gray-200 text-gray-600 hover:bg-primary-500 hover:text-white'}`}
              aria-label={isAdminView ? "Go to Search View" : "Go to Admin Panel"}
            >
              <GearIcon className="w-6 h-6" />
            </button>
          </div>
        </div>
      </header>
      <main className="container mx-auto p-4 sm:p-6 lg:p-8">
        {isAdminView ? (
          <AdminView codes={codes} setCodes={setCodes} />
        ) : (
          <SearchView codes={codes} />
        )}
      </main>
       <footer className="bg-white mt-8 py-4">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center text-gray-500 text-sm">
          <p>&copy; {new Date().getFullYear()} VGHKS Code Finder. All data is stored locally in your browser.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
