
import React, { useState } from 'react';
import { Award, Mail, Lock, User, CheckCircle2, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const SignupPage: React.FC = () => {
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSuccess(true);
  };

  if (isSuccess) {
    return (
      <div className="max-w-md mx-auto mt-24 px-4 text-center">
        <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-8 animate-bounce">
          <CheckCircle2 size={40} />
        </div>
        <h1 className="text-3xl font-bold mb-4">Bienvenue à l'Académie !</h1>
        <p className="text-slate-600 mb-8 leading-relaxed">
          Votre compte a été créé avec succès. Un e-mail de confirmation vous a été envoyé.
        </p>
        <Link 
          to="/" 
          className="inline-flex items-center gap-2 bg-blue-600 text-white px-8 py-4 rounded-xl font-bold shadow-lg hover:bg-blue-700 transition-all"
        >
          Accéder à l'accueil
          <ArrowRight size={20} />
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-16 grid lg:grid-cols-2 gap-16 items-center">
      <div>
        <div className="flex items-center gap-3 text-blue-600 font-bold mb-6">
          <Award size={32} />
          <span className="text-xl">L'Académie de Français</span>
        </div>
        <h1 className="text-5xl font-bold text-slate-900 mb-6 leading-tight">
          Rejoignez la plus grande communauté de <span className="text-blue-600">francophones</span>
        </h1>
        <p className="text-xl text-slate-500 mb-10 leading-relaxed">
          Accédez à des cours exclusifs, suivez vos progrès et échangez avec des professeurs natifs du monde entier.
        </p>
        
        <div className="space-y-6">
          {[
            "Accès illimité à l'Espace Création",
            "Pratique illimitée avec Marc (Tuteur IA)",
            "Badges de progression certifiés",
            "Ressources pédagogiques téléchargeables"
          ].map((feature, i) => (
            <div key={i} className="flex items-center gap-3 font-medium text-slate-700">
              <CheckCircle2 className="text-blue-500" size={20} />
              {feature}
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white border border-slate-200 rounded-3xl shadow-2xl p-8 md:p-12">
        <h2 className="text-2xl font-bold mb-8">Créer votre compte</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Prénom</label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input 
                  type="text" 
                  required
                  className="w-full pl-12 pr-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                  placeholder="Jean"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Nom</label>
              <input 
                type="text" 
                required
                className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                placeholder="Dupont"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">E-mail professionnel</label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input 
                type="email" 
                required
                className="w-full pl-12 pr-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                placeholder="jean.dupont@exemple.fr"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Mot de passe</label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input 
                type="password" 
                required
                className="w-full pl-12 pr-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                placeholder="••••••••"
              />
            </div>
          </div>

          <p className="text-xs text-slate-400">
            En cliquant sur s'inscrire, vous acceptez nos <a href="#" className="text-blue-500 underline">conditions générales</a> et notre <a href="#" className="text-blue-500 underline">politique de confidentialité</a>.
          </p>

          <button 
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-xl shadow-lg shadow-blue-200 transition-all transform active:scale-[0.98]"
          >
            S'inscrire gratuitement
          </button>

          <div className="text-center pt-4">
            <span className="text-slate-500 text-sm">Déjà membre ? </span>
            <button type="button" className="text-blue-600 font-bold text-sm hover:underline">Se connecter</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignupPage;
