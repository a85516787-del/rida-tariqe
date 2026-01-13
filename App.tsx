
import React from 'react';
import { HashRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { BookOpen, Home, Award, Menu, X, BookText, UserPlus, PlusCircle, Brain } from 'lucide-react';
import HomePage from './pages/HomePage';
import LessonsPage from './pages/LessonsPage';
import ExercisesPage from './pages/ExercisesPage';
import ResourcesPage from './pages/ResourcesPage';
import SignupPage from './pages/SignupPage';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const location = useLocation();

  const navLinks = [
    { name: 'Accueil', path: '/', icon: Home },
    { name: 'Espace Création', path: '/lessons', icon: PlusCircle },
    { name: 'Exercices', path: '/exercises', icon: Brain },
    { name: 'Ressources', path: '/resources', icon: BookText },
  ];

  return (
    <nav className="bg-white border-b border-slate-200 sticky top-0 z-50">
      <div className="french-flag-gradient"></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center gap-2">
            <Link to="/" className="flex items-center gap-2">
              <div className="bg-blue-600 p-2 rounded-lg text-white">
                <Award size={24} />
              </div>
              <span className="text-xl font-bold tracking-tight text-blue-900 hidden sm:block">
                L'Académie
              </span>
            </Link>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-4 lg:space-x-8">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    isActive 
                    ? 'text-blue-600 bg-blue-50' 
                    : 'text-slate-600 hover:text-blue-600 hover:bg-slate-50'
                  }`}
                >
                  <Icon size={18} />
                  {link.name}
                </Link>
              );
            })}
            <Link
              to="/signup"
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-all shadow-md hover:shadow-lg"
            >
              <UserPlus size={18} />
              Créer un compte
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 text-slate-600 hover:bg-slate-100 rounded-md"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-slate-100 px-4 pt-2 pb-6 space-y-1 shadow-lg">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const isActive = location.pathname === link.path;
            return (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg text-base font-medium ${
                  isActive 
                  ? 'text-blue-600 bg-blue-50' 
                  : 'text-slate-600 hover:bg-slate-50'
                }`}
              >
                <Icon size={20} />
                {link.name}
              </Link>
            );
          })}
          <Link
            to="/signup"
            onClick={() => setIsOpen(false)}
            className="flex items-center gap-3 px-4 py-3 rounded-lg text-base font-bold bg-blue-600 text-white mt-2"
          >
            <UserPlus size={20} />
            Créer un compte
          </Link>
        </div>
      )}
    </nav>
  );
};

const Footer: React.FC = () => (
  <footer className="bg-slate-900 text-white py-12 mt-20">
    <div className="max-w-7xl mx-auto px-4 text-center">
      <div className="flex justify-center gap-2 items-center mb-6">
        <Award size={28} className="text-blue-400" />
        <span className="text-2xl font-bold font-serif">L'Académie de Français</span>
      </div>
      <p className="text-slate-400 max-w-md mx-auto mb-8">
        La meilleure plateforme pour apprendre la langue de Molière avec plaisir et efficacité.
      </p>
      <div className="mt-8 pt-8 border-t border-slate-800 text-slate-600 text-xs">
        © {new Date().getFullYear()} L'Académie de Français. Tous droits réservés.
      </div>
    </div>
  </footer>
);

const App: React.FC = () => {
  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/lessons" element={<LessonsPage />} />
            <Route path="/exercises" element={<ExercisesPage />} />
            <Route path="/resources" element={<ResourcesPage />} />
            <Route path="/signup" element={<SignupPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
