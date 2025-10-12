
import React from 'react';
import { ARTICLES } from '../constants';

export const ArticlesPage: React.FC = () => (
  <div className="container mx-auto px-4 py-8">
    <div className="flex flex-col lg:flex-row gap-8">
      <main className="lg:w-3/4">
        <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Health & Wellness Articles</h1>
            <p className="text-gray-600">Curated medical content by experts to keep you informed.</p>
        </div>
        
        <div className="space-y-8">
          {ARTICLES.map((article) => (
            <div key={article.id} className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden flex flex-col md:flex-row transition-shadow hover:shadow-md">
                <img src={article.image} alt={article.title} className="w-full md:w-1/3 h-48 md:h-auto object-cover" />
                <div className="p-6 flex flex-col">
                  <span className="text-xs font-semibold text-teal-700 uppercase tracking-wider mb-2">{article.category}</span>
                  <h2 className="text-xl font-bold text-gray-800 mb-2 flex-grow">{article.title}</h2>
                  <p className="text-gray-600 mb-4">{article.excerpt}</p>
                  <button className="text-teal-700 font-semibold hover:text-teal-800 self-start">
                    Read More &rarr;
                  </button>
                </div>
            </div>
          ))}
        </div>
      </main>
      
      <aside className="lg:w-1/4">
        <div className="sticky top-24 space-y-6">
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                <h3 className="font-semibold text-gray-800 mb-4">Categories</h3>
                <ul className="space-y-2">
                <li><button className="text-sm text-gray-600 hover:text-teal-700 w-full text-left">Nutrition</button></li>
                <li><button className="text-sm text-gray-600 hover:text-teal-700 w-full text-left">Fitness</button></li>
                <li><button className="text-sm text-gray-600 hover:text-teal-700 w-full text-left">Mental Health</button></li>
                <li><button className="text-sm text-gray-600 hover:text-teal-700 w-full text-left">Disease Prevention</button></li>
                <li><button className="text-sm text-gray-600 hover:text-teal-700 w-full text-left">Children's Health</button></li>
                </ul>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                <h3 className="font-semibold text-gray-800 mb-4">Popular Posts</h3>
                <div className="space-y-4">
                <div>
                    <h4 className="font-medium text-gray-800 hover:text-teal-700 cursor-pointer">Understanding Common Cold vs. Flu</h4>
                    <p className="text-xs text-gray-500 mt-1">A quick guide to tell them apart.</p>
                </div>
                <div>
                    <h4 className="font-medium text-gray-800 hover:text-teal-700 cursor-pointer">Benefits of Drinking More Water</h4>
                    <p className="text-xs text-gray-500 mt-1">It's more important than you think.</p>
                </div>
                </div>
            </div>
        </div>
      </aside>
    </div>
  </div>
);
