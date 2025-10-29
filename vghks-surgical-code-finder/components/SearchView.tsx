import React, { useState, useMemo } from 'react';
import type { SurgicalCode } from '../types';
import { SearchIcon } from './Icons';

interface SearchViewProps {
  codes: SurgicalCode[];
}

const HighlightedText: React.FC<{ text: string; highlight: string }> = ({ text, highlight }) => {
  if (!highlight.trim()) {
    return <span>{text}</span>;
  }
  const keywords = highlight.trim().split(/\s+/).filter(Boolean).map(k => k.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'));
  if (keywords.length === 0) {
    return <span>{text}</span>;
  }
  const regex = new RegExp(`(${keywords.join('|')})`, 'gi');
  const parts = text.split(regex);
  return (
    <span>
      {parts.map((part, i) =>
        i % 2 === 1 ? (
          <mark key={i} className="bg-yellow-200 px-0 py-0 rounded">
            {part}
          </mark>
        ) : (
          <span key={i}>{part}</span>
        )
      )}
    </span>
  );
};


export const SearchView: React.FC<SearchViewProps> = ({ codes }) => {
  const [query, setQuery] = useState('');

  const filteredCodes = useMemo(() => {
    const keywords = query.toLowerCase().split(' ').filter(k => k.trim() !== '');
    if (keywords.length === 0) {
      return [];
    }
    return codes.filter(item => {
      const searchableText = `${item.code} ${item.name_ch} ${item.name_en}`.toLowerCase();
      return keywords.every(keyword => searchableText.includes(keyword));
    });
  }, [query, codes]);

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">Search Surgical Codes</h2>
        <p className="text-gray-600">Enter keywords to find a surgical code. Separate multiple keywords with a space for an AND search.</p>
      </div>
      
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <SearchIcon className="h-5 w-5 text-gray-400" />
        </div>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="e.g., Appendectomy, 73202E, 闌尾..."
          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-lg"
        />
      </div>

      <div className="bg-white p-4 rounded-lg shadow">
        {query && filteredCodes.length > 0 && (
          <p className="text-sm text-gray-500 mb-4">Found {filteredCodes.length} result(s) for "{query}".</p>
        )}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCodes.length > 0 ? (
            filteredCodes.map(code => (
              <div key={code.id} className="bg-gray-50 border border-gray-200 rounded-lg p-4 flex flex-col justify-between hover:shadow-lg transition-shadow">
                <div>
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-lg font-semibold text-primary-700">
                      <HighlightedText text={code.code} highlight={query} />
                    </h3>
                  </div>
                  <p className="text-gray-800 mb-2 text-base">
                    <HighlightedText text={code.name_ch} highlight={query} />
                  </p>
                  <p className="text-gray-600 text-sm">
                    <HighlightedText text={code.name_en} highlight={query} />
                  </p>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-1 md:col-span-2 lg:col-span-3 text-center py-10">
              <p className="text-gray-500">
                {query ? 'No results found.' : 'Start typing to see results.'}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};