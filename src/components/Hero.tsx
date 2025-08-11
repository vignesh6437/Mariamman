import React, { useEffect, useState } from 'react';
import { Calendar, Heart, Sparkles, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
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

  const backgroundImages = [
    gopuram1,
    mariamman,
    vilaku
  ];

  useEffect(() => {
    setIsVisible(true);
    const interval = setInterval(() => {
      goToNextImage();
    }, 5000); // Auto-slide every 5 seconds

    return () => clearInterval(interval);
  }, []);

  const goToNextImage = () => {
    setCurrentImage((prev) => (prev + 1) % backgroundImages.length);
  };

  const goToPrevImage = () => {
    setCurrentImage((prev) => (prev - 1 + backgroundImages.length) % backgroundImages.length);
  };

  const heroContent = {
    english: {
      welcome: 'Welcome to Sri\u00A0Selva\u00A0Mariamman\u00A0Temple',
      subtitle: 'Experience Divine Blessings in the Digital Age',
      description: 'Join thousands of devotees in seeking the divine grace of Goddess Mariamman. Book online services, make donations, and stay connected with our sacred traditions.',
      buttons: ['Book Kavadi', 'Donate Online', 'View Events']
    },
    tamil: {
      welcome: 'ஸ்ரீ செல்வமாரியம்மன் கோயிலுக்கு வரவேற்கிறோம்',
      subtitle: 'டிஜிட்டல் யுகத்தில் தெய்வீக ஆசீர்வாதங்களை அனுபவியுங்கள்',
      description: 'மாரியம்மன் அம்மனின் தெய்வீக அருளைப் பெற ஆயிரக்கணக்கான பக்தர்களுடன் இணையுங்கள். ஆன்லைன் சேவைகளை முன்பதிவு செய்யுங்கள், நன்கொடைகள் வழங்குங்கள்.',
      buttons: ['காவடி முன்பதிவு', 'ஆன்லைன் நன்கொடை', 'திருவிழாக்கள்']
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
      <div className="absolute inset-0 overflow-hidden">
        {backgroundImages.map((url, index) => (
          <div
            key={index}
            className={`absolute inset-0 z-0 transition-opacity duration-1000 ease-in-out ${index === currentImage ? 'opacity-100' : 'opacity-0'}`}
            style={{
              backgroundImage: `url(${url})`,
              backgroundSize: 'cover',
              backgroundPosition: window.innerWidth < 768 ? 'top center' : 'center',
              backgroundBlendMode: 'overlay'
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent"></div>
          </div>
        ))}

        {/* Navigation Buttons */}
        <div className="absolute inset-0 flex justify-between items-center px-4 z-20">
          <button
            onClick={goToPrevImage}
            className="bg-black/40 hover:bg-black/60 text-white p-2 rounded-full transition"
          >
            <ChevronLeft size={24} />
          </button>
          <button
            onClick={goToNextImage}
            className="bg-black/40 hover:bg-black/60 text-white p-2 rounded-full transition"
          >
            <ChevronRight size={24} />
          </button>
        </div>
      </div>

      {/* Hero Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-screen">
          {/* Left Content */}
          <div className={`text-white transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <div className="mb-6">
              {/* <div className="inline-flex items-center px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full mb-4">
                <span className="text-yellow-300 mr-2">🕉</span>
                <span className="text-sm font-medium">{language === 'english' ? 'Sacred Digital Portal' : 'புனித டிஜிட்டல் வாயில்'}</span>
              </div> */}

              <h1 className="text-4xl lg:text-6xl font-bold leading-tight mb-6">
                {heroContent[language].welcome}
              </h1>

              <h2 className="text-xl lg:text-2xl text-yellow-200 font-medium mb-6">
                {heroContent[language].subtitle}
              </h2>

              <p className="text-lg text-white/90 leading-relaxed max-w-xl">
                {heroContent[language].description}
              </p>
            </div>

            {/* CTA Buttons */}
            {/* <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <button
                onClick={() =>  alert("Navigating to Kavadi Booking Page")}
                className="relative z-50 group bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-400 hover:to-yellow-500 text-black px-8 py-4 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-2xl"
              >
                {heroContent[language].buttons[0]}
                <ArrowRight className="inline ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={() => setCurrentPage('donations')}
                className="group bg-white/20 backdrop-blur-sm border border-white/30 text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-red-800 transition-all duration-300 transform hover:scale-105"
              >
                {heroContent[language].buttons[1]}
                <Heart className="inline ml-2 h-5 w-5 group-hover:text-red-600 transition-colors" />
              </button>
            </div> */}

            {/* Features */}
            <div className="flex flex-wrap gap-6">
              {features.map((feature, index) => (
                <div key={index} className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg">
                  <feature.icon className="h-5 w-5 text-yellow-300" />
                  <span className="text-sm font-medium">{feature.text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Content - Stats */}
          {/* <div className={`transition-all duration-1000 delay-500 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20">
              <h3 className="text-2xl font-bold text-white mb-6">
                {language === 'english' ? 'Temple Statistics' : 'கோவில் புள்ளிவிவரங்கள்'}
              </h3>

              <div className="grid grid-cols-2 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-yellow-300 mb-2">1000+</div>
                  <div className="text-white/80 text-sm">{language === 'english' ? 'Daily Devotees' : 'தினசரி பக்தர்கள்'}</div>
                </div>

                <div className="text-center">
                  <div className="text-3xl font-bold text-yellow-300 mb-2">25+</div>
                  <div className="text-white/80 text-sm">{language === 'english' ? 'Annual Festivals' : 'வருடாந்திர திருவிழாக்கள்'}</div>
                </div>

                <div className="text-center">
                  <div className="text-3xl font-bold text-yellow-300 mb-2">500+</div>
                  <div className="text-white/80 text-sm">{language === 'english' ? 'Online Services' : 'ஆன்லைன் சேவைகள்'}</div>
                </div>

                <div className="text-center">
                  <div className="text-3xl font-bold text-yellow-300 mb-2">24/7</div>
                  <div className="text-white/80 text-sm">{language === 'english' ? 'Digital Access' : 'டிஜிட்டல் அணுகல்'}</div>
                </div>
              </div>

              <button
                onClick={() => setCurrentPage('events')}
                className="w-full mt-6 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105"
              >
                {heroContent[language].buttons[2]}
              </button>
            </div>
          </div> */}
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/70 rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
