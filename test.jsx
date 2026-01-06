import React, { useState, useEffect } from 'react';
import { Home, MessageCircle, Book, TrendingUp, Settings, Clock, Users, ThumbsUp, Send, Play, Pause, X } from 'lucide-react';

const MeditationApp = () => {
  const [activeTab, setActiveTab] = useState('home');
  const [meditating, setMeditating] = useState(false);
  const [meditationTime, setMeditationTime] = useState(0);
  const [selectedDuration, setSelectedDuration] = useState(20);
  const [expandedStep, setExpandedStep] = useState(null);
  const [expandedPost, setExpandedPost] = useState(null);
  const [userDays, setUserDays] = useState(12);
  const [showNewPost, setShowNewPost] = useState(false);
  const [newPostTitle, setNewPostTitle] = useState('');
  const [newPostContent, setNewPostContent] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  
  // טיימר מדיטציה
  useEffect(() => {
    let interval;
    if (meditating) {
      interval = setInterval(() => {
        setMeditationTime(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [meditating]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const steps = [
    {
      title: "1. נשימה נוחה",
      content: ["שחק עם הנשימה", "משקל, עומק, מרקם", "מצא מה הגוף רוצה לנשום", "💡 היה 'סומליה' של הנשימה"]
    },
    {
      title: "2. שימור",
      content: ["שמור את הנשימה הנוחה", "כשהראש נודד - הבחן ✓", "'הודות לזה אפנק את עצמי'", "חזור 100 פעם אם צריך"]
    },
    {
      title: "3. סריקת גוף",
      content: ["התחל ממרכז הבטן", "בכל חלק: יש מתח?", "נסה להרגיע", "עבור על כל הנקודות"]
    },
    {
      title: "4. נקודת עוגן",
      content: ["בחר נקודה שהגיבה הכי טוב", "יכולה להיות כל נקודה", "זו הבסיס שלך"]
    },
    {
      title: "5. הרחבת מודעות",
      content: ["מנקודת העוגן החוצה", "תן לתחושה הטובה להתפשט", "נקודות מתחברות"]
    },
    {
      title: "6. הגוף כולו נושם",
      content: ["כל תא עולה ודועך", "מרענן, ממלא, מחייה", "אושר אמיתי", "✨ שהה כאן"]
    }
  ];

  const [forumPosts, setForumPosts] = useState([
    {
      id: 1,
      category: "beginners",
      author: "יוסי",
      time: "לפני 12 דק'",
      title: "סוף סוף הרגשתי את השלב 4!",
      content: "אחרי 23 ימים של תרגול יומי, היום בבוקר פתאום הרגשתי את הנקודה בחזה שממש הגיבה. זה היה כל כך ברור! המשיכו, זה קורה!",
      likes: 23,
      comments: 8,
      badge: "🌿"
    },
    {
      id: 2,
      category: "tips",
      author: "מיכל",
      time: "לפני שעה",
      title: "איך יודעים שהנשימה 'נוחה'?",
      content: "אני מתחילה ויש לי בלבול. מה זה אומר נשימה נוחה? לפעמים אני חושבת שמצאתי אבל אז אני לא בטוחה...",
      likes: 47,
      comments: 15,
      badge: "🌱",
      bestAnswer: "התשובה שעזרה לי: אל תחפשי משהו מושלם. נשימה נוחה = נשימה שלא דוחפת אותך לשנות אותה. זהו. - דני"
    },
    {
      id: 3,
      category: "progress",
      author: "דני",
      time: "לפני 3 שעות",
      title: "30 ימים רצופים - מה למדתי",
      content: "הגעתי ל-30 ימים! דברים שלמדתי: 1) העקביות חשובה מהאורך 2) אין 'טוב' ו'רע' 3) כל ישיבה שונה 4) הפורום הזה הציל אותי כמה פעמים",
      likes: 89,
      comments: 24,
      badge: "🌿"
    },
    {
      id: 4,
      category: "partners",
      author: "רונית",
      time: "לפני 5 שעות",
      title: "מחפשת שותפה לתרגול - תל אביב",
      content: "מישהי מתל אביב רוצה להיפגש פעם בשבוע למדיטציה משותפת? אני בשלב 2-3, מתרגלת כבר חודשיים.",
      likes: 12,
      comments: 7,
      badge: "🌿"
    },
    {
      id: 5,
      category: "advanced",
      author: "אלי",
      time: "אתמול",
      title: "AMA - 8 חודשים של תרגול יומי",
      content: "השגתי את הספיגה הראשונה לפני חודשיים. שמח לענות על שאלות ולשתף מהדרך.",
      likes: 156,
      comments: 43,
      badge: "💎"
    }
  ]);

  const categories = [
    { id: 'all', name: 'הכל', icon: '📋' },
    { id: 'beginners', name: 'מתחילים', icon: '💭' },
    { id: 'tips', name: 'טיפים', icon: '🎯' },
    { id: 'progress', name: 'יומנים', icon: '📈' },
    { id: 'partners', name: 'שותפים', icon: '🤝' },
    { id: 'advanced', name: 'מנוסים', icon: '🧘' }
  ];

  const filteredPosts = selectedCategory === 'all' 
    ? forumPosts 
    : forumPosts.filter(post => post.category === selectedCategory);

  const handleNewPost = () => {
    if (newPostTitle.trim() && newPostContent.trim()) {
      const newPost = {
        id: forumPosts.length + 1,
        category: selectedCategory === 'all' ? 'beginners' : selectedCategory,
        author: "אני",
        time: "עכשיו",
        title: newPostTitle,
        content: newPostContent,
        likes: 0,
        comments: 0,
        badge: "🌿"
      };
      setForumPosts([newPost, ...forumPosts]);
      setNewPostTitle('');
      setNewPostContent('');
      setShowNewPost(false);
    }
  };

  // מסך בית
  const HomeScreen = () => (
    <div className="p-6 space-y-6">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold text-gray-800">🧘‍♂️ מדיטציה</h1>
        <p className="text-gray-600">שיטת 6 השלבים</p>
      </div>

      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 shadow-sm">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">התחל מדיטציה</h2>
        <p className="text-gray-600 mb-4">כמה זמן תרצה לתרגל?</p>
        
        <div className="grid grid-cols-4 gap-3 mb-4">
          {[20, 30, 45, 60].map(time => (
            <button
              key={time}
              onClick={() => setSelectedDuration(time)}
              className={`py-3 rounded-xl font-semibold transition-all ${
                selectedDuration === time
                  ? 'bg-indigo-600 text-white shadow-lg scale-105'
                  : 'bg-white text-gray-700 hover:bg-gray-50'
              }`}
            >
              {time}
            </button>
          ))}
        </div>
        
        <button
          onClick={() => {
            setMeditating(true);
            setMeditationTime(0);
            setActiveTab('meditate');
          }}
          className="w-full bg-indigo-600 text-white py-4 rounded-xl font-semibold flex items-center justify-center gap-2 hover:bg-indigo-700 transition-all shadow-lg"
        >
          <Play size={20} />
          התחל {selectedDuration} דקות
        </button>
      </div>

      <div className="bg-amber-50 rounded-2xl p-6 shadow-sm">
        <div className="flex items-center gap-3 mb-3">
          <span className="text-2xl">🔥</span>
          <div>
            <h3 className="font-semibold text-gray-800">רצף של {userDays} ימים</h3>
            <p className="text-sm text-gray-600">המשך כך!</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <button
          onClick={() => setActiveTab('forum')}
          className="bg-white rounded-xl p-5 shadow-sm hover:shadow-md transition-all"
        >
          <MessageCircle className="text-indigo-600 mb-2" size={24} />
          <h3 className="font-semibold text-gray-800">פורום</h3>
          <p className="text-sm text-gray-500">הקהילה</p>
        </button>
        
        <button
          onClick={() => setActiveTab('book')}
          className="bg-white rounded-xl p-5 shadow-sm hover:shadow-md transition-all"
        >
          <Book className="text-indigo-600 mb-2" size={24} />
          <h3 className="font-semibold text-gray-800">הספר</h3>
          <p className="text-sm text-gray-500">גרסה חינמית</p>
        </button>
      </div>
    </div>
  );

  // מסך מדיטציה
  const MeditateScreen = () => {
    const remaining = selectedDuration * 60 - meditationTime;
    const progress = (meditationTime / (selectedDuration * 60)) * 100;

    return (
      <div className="p-6 space-y-6 min-h-screen bg-gradient-to-b from-indigo-50 to-blue-50">
        <div className="text-center space-y-4">
          <div className="text-6xl">🧘‍♂️</div>
          
          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <div className="text-4xl font-bold text-gray-800 mb-2">
              {formatTime(meditationTime)}
            </div>
            <div className="text-gray-600">
              נותרו: {formatTime(Math.max(0, remaining))}
            </div>
            
            <div className="w-full bg-gray-200 rounded-full h-2 mt-4">
              <div
                className="bg-indigo-600 h-2 rounded-full transition-all"
                style={{ width: `${Math.min(100, progress)}%` }}
              />
            </div>
          </div>

          <div className="flex gap-3">
            <button
              onClick={() => setMeditating(!meditating)}
              className="flex-1 bg-indigo-600 text-white py-4 rounded-xl font-semibold flex items-center justify-center gap-2 hover:bg-indigo-700 transition-all"
            >
              {meditating ? <Pause size={20} /> : <Play size={20} />}
              {meditating ? 'השהה' : 'המשך'}
            </button>
            
            <button
              onClick={() => {
                setMeditating(false);
                setMeditationTime(0);
                setActiveTab('home');
              }}
              className="bg-red-100 text-red-700 px-6 py-4 rounded-xl font-semibold hover:bg-red-200 transition-all"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-lg space-y-3">
          <h3 className="font-semibold text-gray-800 text-lg mb-4">מדריך השלבים</h3>
          
          {steps.map((step, idx) => (
            <div key={idx} className="border-b border-gray-100 last:border-0">
              <button
                onClick={() => setExpandedStep(expandedStep === idx ? null : idx)}
                className="w-full text-right py-3 flex items-center justify-between hover:bg-gray-50 rounded-lg px-2 transition-all"
              >
                <span className="font-semibold text-gray-700">{step.title}</span>
                <span className="text-gray-400">{expandedStep === idx ? '−' : '+'}</span>
              </button>
              
              {expandedStep === idx && (
                <div className="px-2 pb-4 space-y-2">
                  {step.content.map((item, i) => (
                    <div key={i} className="text-gray-600 text-sm pr-4">
                      • {item}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  };

  // מסך פורום
  const ForumScreen = () => (
    <div className="space-y-4">
      <div className="bg-gradient-to-br from-indigo-600 to-purple-600 p-6 text-white">
        <h2 className="text-2xl font-bold mb-2">💬 פורום הקהילה</h2>
        <p className="opacity-90">שיתוף, תמיכה והשראה</p>
      </div>

      <div className="px-4">
        <button
          onClick={() => setShowNewPost(true)}
          className="w-full bg-indigo-600 text-white py-3 rounded-xl font-semibold flex items-center justify-center gap-2 hover:bg-indigo-700 transition-all shadow-lg mb-4"
        >
          <Send size={18} />
          שתף משהו
        </button>

        <div className="flex gap-2 overflow-x-auto pb-2 mb-4">
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2 rounded-full whitespace-nowrap transition-all ${
                selectedCategory === cat.id
                  ? 'bg-indigo-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {cat.icon} {cat.name}
            </button>
          ))}
        </div>

        <div className="space-y-3">
          {filteredPosts.map(post => (
            <div key={post.id} className="bg-white rounded-xl p-5 shadow-sm hover:shadow-md transition-all">
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">{post.badge}</span>
                  <div>
                    <span className="font-semibold text-gray-800">{post.author}</span>
                    <span className="text-gray-500 text-sm mr-2">• {post.time}</span>
                  </div>
                </div>
              </div>
              
              <h3 className="font-semibold text-gray-800 mb-2">{post.title}</h3>
              
              <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                {post.content}
              </p>
              
              {post.bestAnswer && (
                <div className="bg-green-50 border-r-4 border-green-500 p-3 mb-3 text-sm text-gray-700">
                  <div className="font-semibold text-green-700 mb-1">✓ תשובה מועילה:</div>
                  {post.bestAnswer}
                </div>
              )}
              
              <div className="flex items-center gap-4 text-sm text-gray-500">
                <button className="flex items-center gap-1 hover:text-indigo-600 transition-colors">
                  <ThumbsUp size={16} />
                  {post.likes}
                </button>
                <button 
                  onClick={() => setExpandedPost(expandedPost === post.id ? null : post.id)}
                  className="flex items-center gap-1 hover:text-indigo-600 transition-colors"
                >
                  <MessageCircle size={16} />
                  {post.comments} תגובות
                </button>
              </div>

              {expandedPost === post.id && (
                <div className="mt-4 pt-4 border-t border-gray-100">
                  <div className="space-y-3">
                    <div className="bg-gray-50 rounded-lg p-3 text-sm">
                      <div className="font-semibold text-gray-700 mb-1">שרה • לפני שעה</div>
                      <p className="text-gray-600">תודה על השיתוף! עבר לי בדיוק אותו דבר!</p>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-3 text-sm">
                      <div className="font-semibold text-gray-700 mb-1">דוד • לפני 3 שעות</div>
                      <p className="text-gray-600">ממש מעורר השראה, המשך כך!</p>
                    </div>
                  </div>
                  <input
                    type="text"
                    placeholder="הוסף תגובה..."
                    className="w-full mt-3 px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {showNewPost && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl p-6 max-w-lg w-full">
            <h3 className="text-xl font-bold mb-4">פוסט חדש</h3>
            <input
              type="text"
              placeholder="כותרת..."
              value={newPostTitle}
              onChange={(e) => setNewPostTitle(e.target.value)}
              className="w-full px-4 py-3 border border-gray-200 rounded-lg mb-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <textarea
              placeholder="מה תרצה לשתף?"
              value={newPostContent}
              onChange={(e) => setNewPostContent(e.target.value)}
              rows={4}
              className="w-full px-4 py-3 border border-gray-200 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <div className="flex gap-3">
              <button
                onClick={handleNewPost}
                className="flex-1 bg-indigo-600 text-white py-3 rounded-xl font-semibold hover:bg-indigo-700"
              >
                פרסם
              </button>
              <button
                onClick={() => setShowNewPost(false)}
                className="px-6 bg-gray-100 text-gray-700 py-3 rounded-xl font-semibold hover:bg-gray-200"
              >
                ביטול
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  // מסך הספר
  const BookScreen = () => (
    <div className="p-6 space-y-6">
      <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl p-6 text-center shadow-lg">
        <div className="text-6xl mb-4">📕</div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">הספר המלא</h2>
        <p className="text-gray-600 mb-6">גרסה דיגיטלית בחינם</p>
        
        <div className="flex gap-3">
          <button className="flex-1 bg-indigo-600 text-white py-3 rounded-xl font-semibold hover:bg-indigo-700 transition-all">
            📖 קרא עכשיו
          </button>
          <button className="flex-1 bg-white text-gray-700 py-3 rounded-xl font-semibold hover:bg-gray-50 transition-all border border-gray-200">
            ⬇️ הורד PDF
          </button>
        </div>
      </div>

      <div className="bg-white rounded-2xl p-6 shadow-sm">
        <h3 className="font-semibold text-gray-800 mb-4">תוכן עניינים</h3>
        <div className="space-y-2">
          {[
            "1. מבוא לשיטה",
            "2. הבסיס: הנשימה הנוחה",
            "3. שימור המיקוד",
            "4. סריקת הגוף בעומק",
            "5. בחירת העוגן",
            "6. הרחבת המודעות",
            "7. הגוף כולו נושם",
            "8. מסלול ההתקדמות",
            "9. מכשולים נפוצים",
            "10. שאלות ותשובות"
          ].map((chapter, idx) => (
            <button
              key={idx}
              className="w-full text-right py-3 px-4 hover:bg-indigo-50 rounded-lg transition-all text-gray-700"
            >
              {chapter}
            </button>
          ))}
        </div>
      </div>

      <div className="bg-blue-50 rounded-xl p-5 border border-blue-100">
        <p className="text-sm text-blue-900">
          💡 <strong>עצה:</strong> קרא לפחות את 3 הפרקים הראשונים לפני המדיטציה הראשונה שלך
        </p>
      </div>
    </div>
  );

  // מסך התקדמות
  const ProgressScreen = () => (
    <div className="p-6 space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">📊 ההתקדמות שלך</h2>
      
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-xl p-5 shadow-sm">
          <div className="text-3xl mb-2">🔥</div>
          <div className="text-2xl font-bold text-gray-800">{userDays}</div>
          <div className="text-sm text-gray-600">ימים רצופים</div>
        </div>
        
        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-5 shadow-sm">
          <div className="text-3xl mb-2">⏱️</div>
          <div className="text-2xl font-bold text-gray-800">4.1</div>
          <div className="text-sm text-gray-600">סה"כ שעות</div>
        </div>
        
        <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-5 shadow-sm">
          <div className="text-3xl mb-2">📅</div>
          <div className="text-2xl font-bold text-gray-800">28</div>
          <div className="text-sm text-gray-600">דקות ממוצע</div>
        </div>
        
        <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-5 shadow-sm">
          <div className="text-3xl mb-2">🎯</div>
          <div className="text-2xl font-bold text-gray-800">2-3</div>
          <div className="text-sm text-gray-600">השלב שלך</div>
        </div>
      </div>

      <div className="bg-white rounded-2xl p-6 shadow-sm">
        <h3 className="font-semibold text-gray-800 mb-4">המסלול שלך</h3>
        
        <div className="space-y-4">
          <div className="relative">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center text-white font-bold flex-shrink-0">
                ✓
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-gray-800">שלב מוקדם</h4>
                <p className="text-sm text-gray-600">התועלת כמעט לא מורגשת, דורש עקביות</p>
                <div className="mt-2 text-xs bg-indigo-50 text-indigo-700 px-3 py-1 rounded-full inline-block">
                  ← אתה כאן
                </div>
              </div>
            </div>
            <div className="absolute right-4 top-8 bottom-0 w-0.5 bg-gray-200"></div>
          </div>

          <div className="relative">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center flex-shrink-0">
                <div className="w-3 h-3 rounded-full bg-gray-400"></div>
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-gray-700">שלב ביניים</h4>
                <p className="text-sm text-gray-500">הנשימה מספקת במיוחד, שליטה גדלה</p>
              </div>
            </div>
            <div className="absolute right-4 top-8 bottom-0 w-0.5 bg-gray-200"></div>
          </div>

          <div className="relative">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center flex-shrink-0">
                <div className="w-3 h-3 rounded-full bg-gray-400"></div>
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-gray-700">שלב עמוק</h4>
                <p className="text-sm text-gray-500">הבנת מקור הסבל, אושר אמיתי</p>
              </div>
            </div>
            <div className="absolute right-4 top-8 bottom-0 w-0.5 bg-gray-200"></div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center flex-shrink-0">
              <div className="w-3 h-3 rounded-full bg-gray-400"></div>
            </div>
            <div className="flex-1">
              <h4 className="font-semibold text-gray-700">מעבר המפתן</h4>
              <p className="text-sm text-gray-500">נירוואנה - סיום הסבל</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-5 shadow-sm border border-green-100">
        <h4 className="font-semibold text-gray-800 mb-2">💬 מהקהילה</h4>
        <p className="text-sm text-gray-700 italic mb-2">
          "באותו שלב כמוך הייתי מרגיש ש'כלום לא קורה'. המשך! ביום 18 משהו השתנה."
        </p>
        <p className="text-xs text-gray-600">- רונית, מתרגלת 8 חודשים</p>
      </div>

      <div className="bg-amber-50 rounded-xl p-5 border border-amber-100">
        <p className="text-sm text-amber-900">
          ⏳ <strong>הספיגה הראשונה</strong> יכולה לקרות תוך 7 ימים, 7 חודשים, או 7 שנים - תלוי בעומק ובעקביות
        </p>
      </div>
    </div>
  );

  return (
    <div className="max-w-md mx-auto bg-gray-50 min-h-screen pb-20" dir="rtl">
      {/* תוכן ראשי */}
      <div className="overflow-y-auto">
        {activeTab === 'home' && <HomeScreen />}
        {activeTab === 'forum' && <ForumScreen />}
        {activeTab === 'book' && <BookScreen />}
        {activeTab === 'progress' && <ProgressScreen />}
        {activeTab === 'meditate' && <MeditateScreen />}
      </div>

      {/* ניווט תחתון */}
      <div className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-white border-t border-gray-200 shadow-lg">
        <div className="flex justify-around items-center py-2">
          <button
            onClick={() => setActiveTab('home')}
            className={`flex flex-col items-center gap-1 px-4 py-2 rounded-xl transition-all ${
              activeTab === 'home' ? 'text-indigo-600 bg-indigo-50' : 'text-gray-500'
            }`}
          >
            <Home size={24} />
            <span className="text-xs">בית</span>
          </button>
          
          <button
            onClick={() => setActiveTab('forum')}
            className={`flex flex-col items-center gap-1 px-4 py-2 rounded-xl transition-all ${
              activeTab === 'forum' ? 'text-indigo-600 bg-indigo-50' : 'text-gray-500'
            }`}
          >
            <MessageCircle size={24} />
            <span className="text-xs">פורום</span>
          </button>
          
          <button
            onClick={() => setActiveTab('book')}
            className={`flex flex-col items-center gap-1 px-4 py-2 rounded-xl transition-all ${
              activeTab === 'book' ? 'text-indigo-600 bg-indigo-50' : 'text-gray-500'
            }`}
          >
            <Book size={24} />
            <span className="text-xs">ספר</span>
          </button>
          
          <button
            onClick={() => setActiveTab('progress')}
            className={`flex flex-col items-center gap-1 px-4 py-2 rounded-xl transition-all ${
              activeTab === 'progress' ? 'text-indigo-600 bg-indigo-50' : 'text-gray-500'
            }`}
          >
            <TrendingUp size={24} />
            <span className="text-xs">התקדמות</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default MeditationApp;
