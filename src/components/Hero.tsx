import React, { useEffect, useState } from 'react';
import { Calendar, Heart, Sparkles, ChevronLeft, ChevronRight } from 'lucide-react';
import gopuram1 from "../images/gopuram1.png";
import mariamman from "../images/Mariamman.png";
import vilaku from "../images/vilaku1.png";

interface HeroProps {
  language: string;
  setCurrentPage: (page: string) => void;
}

const Hero: React.FC<HeroProps> = ({ language, setCurrentPage }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [currentImage, setCurrentImage] = useState(0);

  const backgroundImages = [gopuram1, mariamman, vilaku];

  useEffect(() => {
    setIsVisible(true);
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % backgroundImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const heroContent = {
    english: {
      welcome: 'Welcome to Sri\u00A0Selva\u00A0Mariamman Temple',
      subtitle: 'Experience Divine Blessings in the Digital Age',
      description: 'Join thousands of devotees in seeking the divine grace of Goddess Mariamman. Book online services, make donations, and stay connected with our sacred traditions.',
    },
    tamil: {
      welcome: 'ஸ்ரீ செல்வமாரியம்மன் கோயிலுக்கு வரவேற்கிறோம்',
      subtitle: 'டிஜிட்டல் யுகத்தில் தெய்வீக ஆசீர்வாதங்களை அனுபவியுங்கள்',
      description: 'மாரியம்மன் அம்மனின் தெய்வீக அருளைப் பெற ஆயிரக்கணக்கான பக்தர்களுடன் இணையுங்கள். ஆன்லைன் சேவைகளை முன்பதிவு செய்யுங்கள், நன்கொடைகள் வழங்குங்கள்.',
    }
  };

  const features = [
    { icon: Calendar, text: language === 'english' ? 'Online Booking' : 'ஆன்லைன் முன்பதிவு' },
    { icon: Heart, text: language === 'english' ? 'Secure Donations' : 'பாதுகாப்பான நன்கொடை' },
    { icon: Sparkles, text: language === 'english' ? 'Live Events' : 'நேரடி நிகழ்ச்சிகள்' }
  ];

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Background Slider */}
      <div className="absolute inset-0">
        {backgroundImages.map((url, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${index === currentImage ? 'opacity-100' : 'opacity-0'} bg-cover bg-top md:bg-center bg-blend-overlay`}
            style={{
              backgroundImage: `url(${url})`
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent"></div>
          </div>
        ))}

        {/* Navigation Buttons */}
        <div className="absolute inset-0 flex justify-between items-center px-2 sm:px-4 z-20">
          <button
            onClick={() => setCurrentImage((prev) => (prev - 1 + backgroundImages.length) % backgroundImages.length)}
            className="bg-black/40 hover:bg-black/60 text-white p-1 sm:p-2 rounded-full transition"
          >
            <ChevronLeft size={20} className="sm:size-6" />
          </button>
          <button
            onClick={() => setCurrentImage((prev) => (prev + 1) % backgroundImages.length)}
            className="bg-black/40 hover:bg-black/60 text-white p-1 sm:p-2 rounded-full transition"
          >
            <ChevronRight size={20} className="sm:size-6" />
          </button>
        </div>
      </div>

      {/* Hero Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <div className="grid lg:grid-cols-2 gap-8 items-center min-h-[70vh]">
          {/* Left Content */}
          <div className={`text-white transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <h1 className="text-2xl sm:text-4xl lg:text-6xl font-bold leading-tight mb-4">
              {heroContent[language].welcome}
            </h1>
            <h2 className="text-lg sm:text-xl lg:text-2xl text-yellow-200 font-medium mb-4">
              {heroContent[language].subtitle}
            </h2>
            <p className="text-base sm:text-lg text-white/90 leading-relaxed max-w-xl">
              {heroContent[language].description}
            </p>

            {/* Features */}
            <div className="flex flex-wrap gap-3 mt-6">
              {features.map((feature, index) => (
                <div key={index} className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm px-3 py-2 rounded-lg">
                  <feature.icon className="h-4 w-4 sm:h-5 sm:w-5 text-yellow-300" />
                  <span className="text-xs sm:text-sm font-medium">{feature.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-5 h-8 sm:w-6 sm:h-10 border-2 border-white/50 rounded-full flex justify-center">
          <div className="w-1 h-2 sm:h-3 bg-white/70 rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
