
import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { 
  PlusCircle, Save, Trash2, BookOpen, Clock, Layout, Type, Layers, 
  Image as ImageIcon, Video, Music, X, Lock, UserPlus, ArrowRight
} from 'lucide-react';
import { Lesson } from '../types';

const LessonsPage: React.FC = () => {
  // Mock authentication state - in a real app this would come from a Context or Auth Provider
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [formData, setFormData] = useState<Partial<Lesson>>({
    level: 'Débutant',
    category: 'Vocabulaire',
    duration: '15 min'
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

  const handleAddLesson = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.description) return;

    const newLesson: Lesson = {
      id: Date.now().toString(),
      title: formData.title as string,
      level: formData.level as any,
      description: formData.description as string,
      category: formData.category as any,
      duration: formData.duration as string,
      media: { ...media }
    };

    setLessons([newLesson, ...lessons]);
    
    // Reset
    setFormData({
      title: '',
      description: '',
      level: 'Débutant',
      category: 'Vocabulaire',
      duration: '15 min'
    });
    setMedia({});
  };

  const removeLesson = (id: string) => {
    setLessons(lessons.filter(l => l.id !== id));
  };

  const removeMedia = (type: 'image' | 'video' | 'audio') => {
    setMedia(prev => {
      const updated = { ...prev };
      delete updated[type];
      return updated;
    });
  };

  // Protected View if not logged in
  if (!isLoggedIn) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-24 text-center">
        <div className="inline-flex items-center justify-center w-24 h-24 bg-blue-50 text-blue-600 rounded-3xl mb-8 shadow-inner border border-blue-100">
          <Lock size={40} />
        </div>
        <h1 className="text-4xl font-bold text-slate-900 mb-6">Zone de Création Sécurisée</h1>
        <p className="text-xl text-slate-500 mb-10 max-w-2xl mx-auto leading-relaxed">
          Pour commencer à concevoir vos propres leçons et partager votre savoir, vous devez d'abord rejoindre notre communauté d'éducateurs.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link 
            to="/signup" 
            className="w-full sm:w-auto flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-2xl font-bold shadow-xl shadow-blue-500/20 transition-all transform hover:scale-105 active:scale-95"
          >
            <UserPlus size={20} />
            Créer un compte maintenant
          </Link>
          <button 
            onClick={() => setIsLoggedIn(true)} // Just for testing/demo purposes
            className="w-full sm:w-auto flex items-center justify-center gap-2 text-slate-600 font-bold px-8 py-4 rounded-2xl border border-slate-200 hover:bg-slate-50 transition-all"
          >
            Se connecter
            <ArrowRight size={20} />
          </button>
        </div>
        <p className="mt-12 text-slate-400 text-sm italic">
          Gratuit pour tous les professeurs et créateurs de contenu.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 animate-in fade-in duration-700">
      <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-4xl font-bold mb-4">Studio de Création</h1>
          <p className="text-slate-600">Concevez des leçons multimédias riches et interactives.</p>
        </div>
        <div className="flex items-center gap-3 bg-green-50 text-green-700 px-4 py-2 rounded-full text-sm font-semibold border border-green-100">
          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
          Session Active
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-12">
        {/* Form Column */}
        <div className="lg:col-span-1">
          <div className="bg-white border border-slate-200 rounded-2xl shadow-sm p-6 sticky top-24">
            <h2 className="text-xl font-bold mb-6 flex items-center gap-2 text-blue-600">
              <PlusCircle size={24} />
              Nouvelle Leçon
            </h2>
            <form onSubmit={handleAddLesson} className="space-y-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1 flex items-center gap-2">
                    <Type size={16} className="text-slate-400" /> Titre du cours
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="ex: Le Passé Composé"
                    className="w-full px-4 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                    value={formData.title || ''}
                    onChange={e => setFormData({ ...formData, title: e.target.value })}
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
                      onChange={e => setFormData({ ...formData, level: e.target.value as any })}
                    >
                      <option>Débutant</option>
                      <option>Intermédiaire</option>
                      <option>Avancé</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-1 flex items-center gap-2">
                      <Clock size={16} className="text-slate-400" /> Durée
                    </label>
                    <input
                      type="text"
                      placeholder="15 min"
                      className="w-full px-4 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                      value={formData.duration || ''}
                      onChange={e => setFormData({ ...formData, duration: e.target.value })}
                    />
                  </div>
                </div>

                {/* Media Upload Zone */}
                <div className="space-y-3">
                  <label className="block text-sm font-semibold text-slate-700">Contenu Multimédia</label>
                  
                  <div className="grid grid-cols-3 gap-3">
                    {/* Image Upload */}
                    <div 
                      onClick={() => imageInputRef.current?.click()}
                      className={`relative aspect-square border-2 border-dashed rounded-xl flex flex-col items-center justify-center cursor-pointer transition-all ${media.image ? 'border-blue-500 bg-blue-50' : 'border-slate-200 hover:border-blue-400 hover:bg-slate-50'}`}
                    >
                      {media.image ? (
                        <>
                          <img src={media.image} className="w-full h-full object-cover rounded-lg" alt="Preview" />
                          <button onClick={(e) => { e.stopPropagation(); removeMedia('image'); }} className="absolute -top-2 -right-2 bg-red-500 text-white p-1 rounded-full shadow-lg"><X size={12}/></button>
                        </>
                      ) : (
                        <div className="flex flex-col items-center text-slate-400 text-center p-1">
                          <ImageIcon size={20} />
                          <span className="text-[10px] mt-1">Image</span>
                        </div>
                      )}
                      <input type="file" ref={imageInputRef} className="hidden" accept="image/*" onChange={(e) => handleFileChange(e, 'image')} />
                    </div>

                    {/* Video Upload */}
                    <div 
                      onClick={() => videoInputRef.current?.click()}
                      className={`relative aspect-square border-2 border-dashed rounded-xl flex flex-col items-center justify-center cursor-pointer transition-all ${media.video ? 'border-red-500 bg-red-50' : 'border-slate-200 hover:border-red-400 hover:bg-slate-50'}`}
                    >
                      {media.video ? (
                        <>
                          <Video size={24} className="text-red-500" />
                          <span className="text-[10px] mt-1 text-red-500 font-bold">OK</span>
                          <button onClick={(e) => { e.stopPropagation(); removeMedia('video'); }} className="absolute -top-2 -right-2 bg-red-500 text-white p-1 rounded-full shadow-lg"><X size={12}/></button>
                        </>
                      ) : (
                        <div className="flex flex-col items-center text-slate-400 text-center p-1">
                          <Video size={20} />
                          <span className="text-[10px] mt-1">Vidéo</span>
                        </div>
                      )}
                      <input type="file" ref={videoInputRef} className="hidden" accept="video/*" onChange={(e) => handleFileChange(e, 'video')} />
                    </div>

                    {/* Audio Upload */}
                    <div 
                      onClick={() => audioInputRef.current?.click()}
                      className={`relative aspect-square border-2 border-dashed rounded-xl flex flex-col items-center justify-center cursor-pointer transition-all ${media.audio ? 'border-green-500 bg-green-50' : 'border-slate-200 hover:border-green-400 hover:bg-slate-50'}`}
                    >
                      {media.audio ? (
                        <>
                          <Music size={24} className="text-green-500" />
                          <span className="text-[10px] mt-1 text-green-500 font-bold">OK</span>
                          <button onClick={(e) => { e.stopPropagation(); removeMedia('audio'); }} className="absolute -top-2 -right-2 bg-red-500 text-white p-1 rounded-full shadow-lg"><X size={12}/></button>
                        </>
                      ) : (
                        <div className="flex flex-col items-center text-slate-400 text-center p-1">
                          <Music size={20} />
                          <span className="text-[10px] mt-1">Audio</span>
                        </div>
                      )}
                      <input type="file" ref={audioInputRef} className="hidden" accept="audio/*" onChange={(e) => handleFileChange(e, 'audio')} />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1">Description</label>
                  <textarea
                    required
                    rows={3}
                    placeholder="Décrivez les objectifs pédagogiques..."
                    className="w-full px-4 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all resize-none"
                    value={formData.description || ''}
                    onChange={e => setFormData({ ...formData, description: e.target.value })}
                  ></textarea>
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-xl shadow-lg shadow-blue-200 transition-all transform active:scale-95 flex items-center justify-center gap-2"
              >
                <Save size={20} />
                Publier la leçon
              </button>
            </form>
          </div>
        </div>

        {/* List Column */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-slate-800">Catalogue de vos leçons ({lessons.length})</h2>
          </div>
          
          {lessons.length === 0 ? (
            <div className="bg-slate-50 border-2 border-dashed border-slate-200 rounded-3xl p-20 text-center">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 text-slate-300">
                <BookOpen size={32} />
              </div>
              <h3 className="text-lg font-bold text-slate-800">Commencez à créer</h3>
              <p className="text-slate-500">Ajoutez des fichiers multimédias pour rendre vos cours captivants.</p>
            </div>
          ) : (
            <div className="grid gap-6">
              {lessons.map(lesson => (
                <div key={lesson.id} className="bg-white border border-slate-100 p-6 rounded-2xl shadow-sm hover:shadow-md transition-all group">
                  <div className="flex flex-col md:flex-row gap-6">
                    {/* Media Preview in List */}
                    <div className="w-full md:w-48 h-32 bg-slate-100 rounded-xl overflow-hidden shrink-0 relative">
                      {lesson.media?.image ? (
                        <img src={lesson.media.image} className="w-full h-full object-cover" alt="" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-slate-300">
                          <ImageIcon size={32} />
                        </div>
                      )}
                      
                      <div className="absolute bottom-2 right-2 flex gap-1">
                        {lesson.media?.video && (
                          <div className="bg-red-500 text-white p-1 rounded shadow-sm">
                            <Video size={12} />
                          </div>
                        )}
                        {lesson.media?.audio && (
                          <div className="bg-green-500 text-white p-1 rounded shadow-sm">
                            <Music size={12} />
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="flex-grow space-y-2">
                      <div className="flex items-center gap-2">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                          lesson.level === 'Débutant' ? 'bg-green-100 text-green-700' :
                          lesson.level === 'Intermédiaire' ? 'bg-orange-100 text-orange-700' :
                          'bg-purple-100 text-purple-700'
                        }`}>
                          {lesson.level}
                        </span>
                        <span className="text-slate-400 text-xs">•</span>
                        <span className="text-blue-600 font-bold text-xs uppercase">{lesson.category}</span>
                      </div>
                      
                      <div className="flex justify-between items-start">
                        <h3 className="text-xl font-bold text-slate-900">{lesson.title}</h3>
                        <button 
                          onClick={() => removeLesson(lesson.id)}
                          className="p-2 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>

                      <p className="text-slate-500 text-sm line-clamp-2">{lesson.description}</p>
                      
                      <div className="flex items-center gap-4 pt-2">
                        <div className="flex items-center gap-1.5 text-slate-400 text-xs">
                          <Clock size={14} />
                          {lesson.duration}
                        </div>
                        {lesson.media?.audio && (
                          <div className="flex items-center gap-1.5 text-green-600 text-xs font-semibold">
                            <Music size={14} />
                            Audio inclus
                          </div>
                        )}
                        {lesson.media?.video && (
                          <div className="flex items-center gap-1.5 text-red-600 text-xs font-semibold">
                            <Video size={14} />
                            Vidéo incluse
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LessonsPage;
