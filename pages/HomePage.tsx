
import React from 'react';
import { Link } from 'react-router-dom';
import { Brain, MessageSquare, Award, Globe, Sparkles, ChevronRight, UserPlus, PlusCircle } from 'lucide-react';

const HomePage: React.FC = () => {
  return (
    <div className="space-y-24">
      {/* Hero Section */}
      <section className="relative h-[80vh] flex items-center overflow-hidden bg-slate-900">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80&w=2073&auto=format&fit=crop" 
            className="w-full h-full object-cover opacity-40" 
            alt="Paris background" 
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-900/40 to-transparent"></div>
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 text-sm font-medium mb-6 border border-blue-500/30">
              <Sparkles size={16} />
              <span>Nouveau : Zone d'Exercices Interactive</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold text-white leading-tight mb-6">
              Vivez le Français <span className="text-blue-400">Pleinement</span>
            </h1>
            <p className="text-xl text-slate-300 mb-10 leading-relaxed">
              Créez vos propres parcours, testez vos connaissances avec nos exercices et accédez à des ressources infinies.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link 
                to="/signup" 
                className="inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all transform hover:scale-105 shadow-xl shadow-blue-500/20"
              >
                <UserPlus size={20} />
                Créer un compte
              </Link>
              <Link 
                to="/exercises" 
                className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white border border-white/20 backdrop-blur-md px-8 py-4 rounded-xl font-semibold text-lg transition-all"
              >
                <Brain size={20} />
                Faire des Exercices
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Pourquoi rejoindre l'Académie ?</h2>
          <p className="text-slate-600 max-w-2xl mx-auto">Une plateforme conçue pour les créateurs et les passionnés de la langue française.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              title: "Outils de Création",
              desc: "Construisez vos leçons personnalisées avec notre éditeur intuitif.",
              icon: PlusCircle,
              color: "bg-blue-100 text-blue-600"
            },
            {
              title: "Défis Hebdomadaires",
              desc: "Progressez rapidement grâce à nos séries d'exercices thématiques.",
              icon: Brain,
              color: "bg-red-100 text-red-600"
            },
            {
              title: "Échanges Culturels",
              desc: "Connectez-vous avec d'autres étudiants et partagez vos ressources.",
              icon: Globe,
              color: "bg-green-100 text-green-600"
            }
          ].map((feature, i) => (
            <div key={i} className="p-8 rounded-2xl bg-white border border-slate-100 hover:shadow-xl transition-shadow group">
              <div className={`w-14 h-14 ${feature.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                <feature.icon size={28} />
              </div>
              <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
              <p className="text-slate-600 leading-relaxed">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Stats section */}
      <section className="bg-slate-50 py-24">
        <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-4xl font-bold mb-6">Prenez le contrôle de votre apprentissage</h2>
            <p className="text-slate-600 mb-8">Ne soyez plus un simple spectateur. Devenez un acteur de votre éducation en créant vos propres contenus pédagogiques.</p>
            <Link 
              to="/lessons"
              className="inline-flex items-center gap-2 text-blue-600 font-bold hover:gap-4 transition-all"
            >
              Découvrir le studio de création
              <ChevronRight size={20} />
            </Link>
          </div>
          <div className="relative">
            <img 
              src="https://images.unsplash.com/photo-1543269865-cbf427effbad?q=80&w=2070&auto=format&fit=crop" 
              className="rounded-3xl shadow-2xl" 
              alt="Students learning" 
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
