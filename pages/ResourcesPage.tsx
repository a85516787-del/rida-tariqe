
import React, { useState } from 'react';
import { FLASHCARDS } from '../constants';
import { RefreshCw, Volume2, Bookmark, ExternalLink } from 'lucide-react';

const Flashcard: React.FC<{ card: typeof FLASHCARDS[0] }> = ({ card }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div 
      className="perspective-1000 w-full h-64 cursor-pointer"
      onClick={() => setIsFlipped(!isFlipped)}
    >
      <div className={`relative w-full h-full transition-transform duration-500 transform-style-3d ${isFlipped ? 'rotate-y-180' : ''}`}>
        {/* Front */}
        <div className="absolute inset-0 backface-hidden bg-white border-2 border-slate-100 rounded-3xl flex flex-col items-center justify-center p-8 shadow-sm hover:shadow-md transition-shadow">
          <span className="text-blue-600 font-medium text-sm mb-4">Français</span>
          <h3 className="text-3xl font-bold text-slate-900 text-center">{card.french}</h3>
          <div className="mt-6 flex items-center gap-2 text-slate-400">
            <Volume2 size={18} />
            <span className="text-sm italic">{card.pronunciation}</span>
          </div>
        </div>
        
        {/* Back */}
        <div className="absolute inset-0 backface-hidden rotate-y-180 bg-blue-600 border-2 border-blue-500 rounded-3xl flex flex-col items-center justify-center p-8 shadow-sm text-white">
          <span className="text-blue-200 font-medium text-sm mb-4">Arabe (العربية)</span>
          <h3 className="text-3xl font-bold text-center" dir="rtl">{card.arabic}</h3>
          <p className="mt-4 text-sm text-blue-100">Cliquez pour revenir</p>
        </div>
      </div>
    </div>
  );
};

const ResourcesPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'flashcards' | 'links'>('flashcards');

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold mb-4">Espace Ressources</h1>
        <p className="text-slate-600">Tout ce dont vous avez besoin pour approfondir votre apprentissage.</p>
        
        <div className="flex justify-center mt-10">
          <div className="flex bg-slate-100 p-1 rounded-2xl">
            <button 
              onClick={() => setActiveTab('flashcards')}
              className={`px-8 py-3 rounded-xl font-semibold transition-all ${
                activeTab === 'flashcards' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500'
              }`}
            >
              Cartes Mémo
            </button>
            <button 
              onClick={() => setActiveTab('links')}
              className={`px-8 py-3 rounded-xl font-semibold transition-all ${
                activeTab === 'links' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500'
              }`}
            >
              Liens Utiles
            </button>
          </div>
        </div>
      </div>

      {activeTab === 'flashcards' ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {FLASHCARDS.map((card) => (
            <Flashcard key={card.id} card={card} />
          ))}
          <div className="border-2 border-dashed border-slate-200 rounded-3xl flex flex-col items-center justify-center p-8 text-slate-400 hover:bg-slate-50 transition-colors cursor-pointer">
            <RefreshCw size={32} className="mb-4" />
            <p className="font-semibold">Plus de cartes bientôt</p>
          </div>
        </div>
      ) : (
        <div className="max-w-4xl mx-auto space-y-6">
          {[
            { title: "Bescherelle", url: "https://bescherelle.com", desc: "La référence pour la conjugaison française." },
            { title: "Le Monde", url: "https://lemonde.fr", desc: "Suivez l'actualité pour enrichir votre vocabulaire." },
            { title: "TV5Monde Apprendre", url: "https://apprendre.tv5monde.com", desc: "Exercices de compréhension orale gratuits." },
            { title: "Larousse", url: "https://larousse.fr", desc: "Dictionnaire en ligne complet." }
          ].map((link, i) => (
            <a 
              key={i} 
              href={link.url} 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center justify-between p-6 bg-white border border-slate-200 rounded-2xl hover:border-blue-400 hover:shadow-md transition-all group"
            >
              <div className="flex items-center gap-4">
                <div className="bg-slate-100 p-3 rounded-xl text-slate-600 group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors">
                  <Bookmark size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-lg">{link.title}</h4>
                  <p className="text-slate-500 text-sm">{link.desc}</p>
                </div>
              </div>
              <ExternalLink className="text-slate-300 group-hover:text-blue-500" size={20} />
            </a>
          ))}
        </div>
      )}

      {/* Tailwind extras for flipping effect */}
      <style>{`
        .perspective-1000 { perspective: 1000px; }
        .transform-style-3d { transform-style: preserve-3d; }
        .backface-hidden { backface-visibility: hidden; }
        .rotate-y-180 { transform: rotateY(180deg); }
      `}</style>
    </div>
  );
};

export default ResourcesPage;
