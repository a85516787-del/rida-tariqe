
import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { 
  PlusCircle, Save, Trash2, Brain, Clock, Layout, Type, Layers, 
  Image as ImageIcon, Video, Music, X, Lock, UserPlus, ArrowRight,
  CheckCircle2, ListChecks, HelpCircle
} from 'lucide-react';

interface ExerciseQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
  level: string;
  category: string;
  media?: {
    image?: string;
    video?: string;
    audio?: string;
  };
}

const ExercisesPage: React.FC = () => {
  // Mock authentication state
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  const [exercises, setExercises] = useState<ExerciseQuestion[]>([]);
  const [formData, setFormData] = useState({
    question: '',
    option1: '',
    option2: '',
    option3: '',
    option4: '',
    correctAnswer: '',
    explanation: '',
    level: 'Débutant',
    category: 'Grammaire'
  });

  const [media, setMedia] = useState<{
    image?: string;
    video?: string;
    audio?: string;
  }>({});

  const imageInputRef = useRef<HTMLInputElement>(null);
  const videoInputRef = useRef<HTMLInputElement>(null);
  const audioInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, type: 'image' | 'video' | 'audio') => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setMedia(prev => ({ ...prev, [type]: url }));
    }
  };

  const handleAddExercise = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.question || !formData.correctAnswer) return;

    const newExercise: ExerciseQuestion = {
      id: Date.now().toString(),
      question: formData.question,
      options: [formData.option1, formData.option2, formData.option3, formData.option4].filter(o => o !== ''),
      correctAnswer: formData.correctAnswer,
      explanation: formData.explanation,
      level: formData.level,
      category: formData.category,
      media: { ...media }
    };

    setExercises([newExercise, ...exercises]);
    
    // Reset
    setFormData({
      question: '',
      option1: '',
      option2: '',
      option3: '',
      option4: '',
      correctAnswer: '',
      explanation: '',
      level: 'Débutant',
      category: 'Grammaire'
    });
    setMedia({});
  };

  const removeExercise = (id: string) => {
    setExercises(exercises.filter(ex => ex.id !== id));
  };

  const removeMedia = (type: 'image' | 'video' | 'audio') => {
    setMedia(prev => {
      const updated = { ...prev };
      delete updated[type];
      return updated;
    });
  };

  if (!isLoggedIn) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-24 text-center">
        <div className="inline-flex items-center justify-center w-24 h-24 bg-blue-50 text-blue-600 rounded-3xl mb-8 shadow-inner border border-blue-100">
          <Lock size={40} />
        </div>
        <h1 className="text-4xl font-bold text-slate-900 mb-6">Zone de Création d'Exercices</h1>
        <p className="text-xl text-slate-500 mb-10 max-w-2xl mx-auto leading-relaxed">
          Pour créer des quiz interactifs et des défis pour vos élèves, vous devez d'abord vous connecter à votre espace enseignant.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link 
            to="/signup" 
            className="w-full sm:w-auto flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-2xl font-bold shadow-xl shadow-blue-500/20 transition-all transform hover:scale-105 active:scale-95"
          >
            <UserPlus size={20} />
            Créer un compte
          </Link>
          <button 
            onClick={() => setIsLoggedIn(true)}
            className="w-full sm:w-auto flex items-center justify-center gap-2 text-slate-600 font-bold px-8 py-4 rounded-2xl border border-slate-200 hover:bg-slate-50 transition-all"
          >
            Se connecter
            <ArrowRight size={20} />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 animate-in fade-in duration-700">
      <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-4xl font-bold mb-4 flex items-center gap-3">
            <Brain className="text-blue-600" />
            Studio d'Exercices
          </h1>
          <p className="text-slate-600">Créez des questions interactives avec supports multimédias.</p>
        </div>
        <div className="flex items-center gap-3 bg-blue-50 text-blue-700 px-4 py-2 rounded-full text-sm font-semibold border border-blue-100">
          <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
          Mode Éditeur Actif
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-12">
        {/* Form Column */}
        <div className="lg:col-span-1">
          <div className="bg-white border border-slate-200 rounded-2xl shadow-sm p-6 sticky top-24 max-h-[80vh] overflow-y-auto custom-scrollbar">
            <h2 className="text-xl font-bold mb-6 flex items-center gap-2 text-blue-600">
              <PlusCircle size={24} />
              Nouvel Exercice
            </h2>
            <form onSubmit={handleAddExercise} className="space-y-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1 flex items-center gap-2">
                    <HelpCircle size={16} className="text-slate-400" /> Question
                  </label>
                  <textarea
                    required
                    placeholder="ex: Quel est le pluriel de 'cheval' ?"
                    className="w-full px-4 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all resize-none"
                    value={formData.question}
                    onChange={e => setFormData({ ...formData, question: e.target.value })}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-1 flex items-center gap-2">
                      <Layers size={16} className="text-slate-400" /> Niveau
                    </label>
                    <select
                      className="w-full px-4 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                      value={formData.level}
                      onChange={e => setFormData({ ...formData, level: e.target.value })}
                    >
                      <option>Débutant</option>
                      <option>Intermédiaire</option>
                      <option>Avancé</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-1 flex items-center gap-2">
                      <Layout size={16} className="text-slate-400" /> Catégorie
                    </label>
                    <select
                      className="w-full px-4 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                      value={formData.category}
                      onChange={e => setFormData({ ...formData, category: e.target.value })}
                    >
                      <option>Grammaire</option>
                      <option>Vocabulaire</option>
                      <option>Culture</option>
                      <option>Prononciation</option>
                    </select>
                  </div>
                </div>

                {/* Options */}
                <div className="space-y-3">
                  <label className="block text-sm font-semibold text-slate-700 flex items-center gap-2">
                    <ListChecks size={16} className="text-slate-400" /> Choix de réponses
                  </label>
                  {[1, 2, 3, 4].map((num) => (
                    <div key={num} className="flex items-center gap-2">
                      <input
                        type="text"
                        placeholder={`Option ${num}`}
                        className="flex-grow px-4 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                        value={(formData as any)[`option${num}`]}
                        onChange={e => setFormData({ ...formData, [`option${num}`]: e.target.value })}
                      />
                      <input
                        type="radio"
                        name="correctAnswer"
                        className="w-5 h-5 text-blue-600 focus:ring-blue-500"
                        checked={formData.correctAnswer === (formData as any)[`option${num}`] && formData.correctAnswer !== ''}
                        onChange={() => setFormData({ ...formData, correctAnswer: (formData as any)[`option${num}`] })}
                      />
                    </div>
                  ))}
                  <p className="text-[10px] text-slate-400 italic">Cochez le bouton radio à côté de la bonne réponse.</p>
                </div>

                {/* Media Upload Zone */}
                <div className="space-y-3">
                  <label className="block text-sm font-semibold text-slate-700">Support Visuel/Audio</label>
                  <div className="grid grid-cols-3 gap-3">
                    {/* Image */}
                    <div onClick={() => imageInputRef.current?.click()} className={`relative aspect-square border-2 border-dashed rounded-xl flex flex-col items-center justify-center cursor-pointer transition-all ${media.image ? 'border-blue-500 bg-blue-50' : 'border-slate-200 hover:border-blue-400'}`}>
                      {media.image ? (
                        <>
                          <img src={media.image} className="w-full h-full object-cover rounded-lg" alt="" />
                          <button onClick={(e) => { e.stopPropagation(); removeMedia('image'); }} className="absolute -top-2 -right-2 bg-red-500 text-white p-1 rounded-full shadow-lg"><X size={12}/></button>
                        </>
                      ) : (
                        <ImageIcon size={20} className="text-slate-400" />
                      )}
                      <input type="file" ref={imageInputRef} className="hidden" accept="image/*" onChange={(e) => handleFileChange(e, 'image')} />
                    </div>
                    {/* Video */}
                    <div onClick={() => videoInputRef.current?.click()} className={`relative aspect-square border-2 border-dashed rounded-xl flex flex-col items-center justify-center cursor-pointer transition-all ${media.video ? 'border-red-500 bg-red-50' : 'border-slate-200 hover:border-red-400'}`}>
                      {media.video ? (
                        <>
                          <Video size={24} className="text-red-500" />
                          <button onClick={(e) => { e.stopPropagation(); removeMedia('video'); }} className="absolute -top-2 -right-2 bg-red-500 text-white p-1 rounded-full shadow-lg"><X size={12}/></button>
                        </>
                      ) : (
                        <Video size={20} className="text-slate-400" />
                      )}
                      <input type="file" ref={videoInputRef} className="hidden" accept="video/*" onChange={(e) => handleFileChange(e, 'video')} />
                    </div>
                    {/* Audio */}
                    <div onClick={() => audioInputRef.current?.click()} className={`relative aspect-square border-2 border-dashed rounded-xl flex flex-col items-center justify-center cursor-pointer transition-all ${media.audio ? 'border-green-500 bg-green-50' : 'border-slate-200 hover:border-green-400'}`}>
                      {media.audio ? (
                        <>
                          <Music size={24} className="text-green-500" />
                          <button onClick={(e) => { e.stopPropagation(); removeMedia('audio'); }} className="absolute -top-2 -right-2 bg-red-500 text-white p-1 rounded-full shadow-lg"><X size={12}/></button>
                        </>
                      ) : (
                        <Music size={20} className="text-slate-400" />
                      )}
                      <input type="file" ref={audioInputRef} className="hidden" accept="audio/*" onChange={(e) => handleFileChange(e, 'audio')} />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1">Explication du corrigé</label>
                  <textarea
                    rows={2}
                    placeholder="Pourquoi est-ce la bonne réponse ?"
                    className="w-full px-4 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all resize-none text-sm"
                    value={formData.explanation}
                    onChange={e => setFormData({ ...formData, explanation: e.target.value })}
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-xl shadow-lg shadow-blue-200 transition-all transform active:scale-95 flex items-center justify-center gap-2"
              >
                <Save size={20} />
                Publier l'exercice
              </button>
            </form>
          </div>
        </div>

        {/* List Column */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-slate-800">Banque d'exercices ({exercises.length})</h2>
          </div>
          
          {exercises.length === 0 ? (
            <div className="bg-slate-50 border-2 border-dashed border-slate-200 rounded-3xl p-20 text-center">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 text-slate-300">
                <Brain size={32} />
              </div>
              <h3 className="text-lg font-bold text-slate-800">Aucun exercice créé</h3>
              <p className="text-slate-500">Utilisez le formulaire pour bâtir votre premier défi interactif.</p>
            </div>
          ) : (
            <div className="grid gap-6">
              {exercises.map(ex => (
                <div key={ex.id} className="bg-white border border-slate-100 p-6 rounded-2xl shadow-sm hover:shadow-md transition-all">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex flex-wrap gap-2">
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-blue-100 text-blue-700">{ex.level}</span>
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-slate-100 text-slate-600">{ex.category}</span>
                      {ex.media?.image && <ImageIcon size={14} className="text-blue-400" />}
                      {ex.media?.audio && <Music size={14} className="text-green-400" />}
                      {ex.media?.video && <Video size={14} className="text-red-400" />}
                    </div>
                    <button 
                      onClick={() => removeExercise(ex.id)}
                      className="p-2 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                  
                  <h3 className="text-xl font-bold text-slate-900 mb-4">{ex.question}</h3>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
                    {ex.options.map((opt, i) => (
                      <div 
                        key={i} 
                        className={`p-3 rounded-xl border text-sm font-medium flex justify-between items-center ${
                          opt === ex.correctAnswer ? 'bg-green-50 border-green-200 text-green-700' : 'bg-slate-50 border-slate-100 text-slate-600'
                        }`}
                      >
                        {opt}
                        {opt === ex.correctAnswer && <CheckCircle2 size={16} />}
                      </div>
                    ))}
                  </div>
                  
                  {ex.explanation && (
                    <div className="bg-blue-50 p-3 rounded-xl border border-blue-100">
                      <p className="text-xs text-blue-700 italic"><strong>Note :</strong> {ex.explanation}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      
      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #e2e8f0; border-radius: 10px; }
      `}</style>
    </div>
  );
};

export default ExercisesPage;
