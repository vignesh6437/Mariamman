import React, { useState, useEffect } from 'react';
import { Menu, Globe, Phone, MapPin } from 'lucide-react';
import '../index.css';
interface HeaderProps {
  currentPage: string;
  setCurrentPage: (page: string) => void;
  language: string;
  setLanguage: (lang: string) => void;
}

interface Props {
  language: "english" | "tamil";
}

const RotatingBanner: React.FC<Props> = ({ language }) => {
  const contactInfo = (
    <div className="flex items-center space-x-4 text-white text-sm md:text-base">
      <div className="flex items-center space-x-1">
        <Phone className="h-4 w-4" />
        <span>+91 98765 43210</span>
      </div>
      <div className="flex items-center space-x-1">
        <MapPin className="h-4 w-4" />
        <span>
          {language === "english"
            ? "Daily Darshan: 7:00 AM - 11:00 PM"
            : "தினசரி தரிசன நேரம்: காலை 7:00 - இரவு 11:00"}
        </span>
      </div>
    </div>
  );

  const quotes = [
    "ஓம் சக்தி பராசக்தி, சமயபுரத்தாளே போற்றி",
    "எங்கள் குறை தீர்க்கும் தாயே போற்றி, அருள் வழங்கும் அம்மனே போற்றி",
    "அம்பிகையே போற்றி, அன்னை மாரியம்மா போற்றி",
    "குறைதீர்க்கும் அம்மனே போற்றி",
  ];

  // Merge the contact info with the quotes
  const allItems = [contactInfo, ...quotes];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % allItems.length);
    }, 5000); // Change every 5 seconds

    return () => clearInterval(interval);
  }, [allItems.length]);

  return (
<div className="relative h-6 w-full md:w-[52rem] overflow-hidden mt-2" style={{marginLeft: "2%"}}>
  <p
    key={currentIndex}
    className="absolute w-full text-amber-300 font-semibold tracking-wide animate-slide-from-top text-xs sm:text-sm md:text-base"
  >
    {typeof allItems[currentIndex] === "string" ? (
      <span>{allItems[currentIndex]}</span>
    ) : (
      allItems[currentIndex] // JSX contactInfo
    )}
  </p>
</div>)
};

const Header: React.FC<HeaderProps> = ({ currentPage, setCurrentPage, language, setLanguage }) => {
  const menuItems = {
    english: [
      { id: 'home', label: 'Home' },
      { id: 'about', label: 'About Temple' },
      { id: 'services', label: 'Online Services' },
      { id: 'donations', label: 'Donations' },
      { id: 'events', label: 'Events' },
      { id: 'gallery', label: 'Gallery' },
      { id: 'contact', label: 'Contact' },
    ],
    tamil: [
      { id: 'home', label: 'முகப்பு' },
      { id: 'about', label: 'கோவில் வரலாறு' },
      { id: 'services', label: 'ஆன்லைன் சேவைகள்' },
      { id: 'donations', label: 'நன்கொடை' },
      { id: 'events', label: 'திருவிழாக்கள்' },
      { id: 'gallery', label: 'படக்காட்சி' },
      { id: 'contact', label: 'தொடர்பு' },
    ],
  };

  return (
    <>
      {/* Top Info Bar */}
      <div className="bg-gradient-to-r from-red-800 to-red-900 text-white py-2 px-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center text-sm">
          <RotatingBanner language={language} />
          <button
            onClick={() => setLanguage(language === 'english' ? 'tamil' : 'english')}
            className="flex items-center space-x-1 hover:bg-red-700 px-2 py-1 rounded transition-colors"
          >
            <Globe className="h-4 w-4" />
            <span>{language === 'english' ? 'தமிழ்' : 'English'}</span>
          </button>
        </div>
      </div>

      {/* Main Header */}
      <header className="bg-white shadow-lg sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-br from-red-600 to-yellow-500 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-lg">ॐ</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-red-800 to-yellow-600 bg-clip-text text-transparent">
                  {language === 'english'
                    ? 'Sri Selva Mariamman Temple'
                    : 'ஸ்ரீ செல்வ மாரியம்மன் கோயில்'}
                </h1>
                <p className="text-sm text-gray-600">
                  {language === 'english' ? '77/24, Nethaji St, Chidambaram, Tamil Nadu 608001' : '77/24, நேதாஜி தெரு, சிதம்பரம், தமிழ்நாடு 608001'}
                </p>
              </div>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex space-x-8">
              {menuItems[language].map((item) => (
                <button
                  key={item.id}
                  onClick={(e) => {
                    e.preventDefault(); // stops the default anchor jump
                    setCurrentPage(item.id);
                    window.scrollTo({
                      top: 0,
                      behavior: "smooth" // smooth scrolling to top
                    });
                  }}
                  className={`px-3 py-2 rounded-lg font-medium transition-all duration-200 ${currentPage === item.id
                    ? 'bg-gradient-to-r from-red-600 to-yellow-500 text-white shadow-lg'
                    : 'text-gray-700 hover:text-red-600 hover:bg-red-50'
                    }`}
                >
                  {item.label}
                </button>
              ))}
            </nav>

            {/* Mobile Menu Button */}
            <button className="lg:hidden p-2 text-gray-600 hover:text-red-600">
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
