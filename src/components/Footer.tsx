import React from 'react';
import { Facebook, Instagram, Youtube, Mail, Phone, MapPin, Heart, ExternalLink } from 'lucide-react';

interface FooterProps {
  language: string;
  setCurrentPage: (page: string) => void;
}

const Footer: React.FC<FooterProps> = ({ language, setCurrentPage }) => {
  const content = {
    english: {
      description: 'Sri Selva Mariamman Temple - A sacred sanctuary serving devotees with divine blessings and spiritual guidance for generations.',
      quickLinks: {
        title: 'Quick Links',
        links: [
          { label: 'Home', page: 'home' },
          { label: 'About Temple', page: 'about' },
          { label: 'Online Services', page: 'services' },
          { label: 'Donations', page: 'donations' },
          { label: 'Events', page: 'events' },
          { label: 'Gallery', page: 'gallery' }
        ]
      },
      services: {
        title: 'Temple Services',
        items: [
          'Kavadi Booking',
          'Special Archana',
          'Pooja Services',
          'Annadhanam',
          'Wedding Hall',
          'Cultural Programs'
        ]
      },
      contact: {
        title: 'Contact Information',
        address: '77/24, Nethaji St, Chidambaram, Tamil Nadu 608001',
        phone: '+91 98765 43210',
        email: 'info@mariammantemple.org',
        timings: 'Daily: 11:00 AM - 7:00 PM'
      },
      legal: {
        title: 'Legal Information',
        items: [
          'Temple Trust Registration: TN/123/2020',
          '80G Tax Exemption Available',
          'FCRA Registration: 123456789',
          'Privacy Policy',
          'Terms of Service',
          'Refund Policy'
        ]
      },
      social: {
        title: 'Follow Us',
        platforms: [
          { name: 'Facebook', icon: Facebook, url: 'https://www.facebook.com/MUKUN8888/' },
          { name: 'Instagram', icon: Instagram, url: 'https://www.instagram.com/p/DMm40cgRwWa/' },
          { name: 'YouTube', icon: Youtube, url: '#' }
        ]
      },
      copyright: '© 2024 Sri Selva Mariamman Temple. All rights reserved.',
      developedBy: 'Developed by Rajendran Vignesh.'
    },
    tamil: {
      description: 'ஸ்ரீ செல்வ மாரியம்மன் கோயில் - தலைமுறைகளாக பக்தர்களுக்கு தெய்வீக ஆசீர்வாதங்களும் ஆன்மீக வழிகாட்டுதலும் வழங்கும் புனித சரணாலயம்.',
      quickLinks: {
        title: 'விரைவு இணைப்புகள்',
        links: [
          { label: 'முகப்பு', page: 'home' },
          { label: 'கோவில் பற்றி', page: 'about' },
          { label: 'ஆன்லைன் சேவைகள்', page: 'services' },
          { label: 'நன்கொடை', page: 'donations' },
          { label: 'நிகழ்வுகள்', page: 'events' },
          { label: 'படக்காட்சி', page: 'gallery' }
        ]
      },
      services: {
        title: 'கோவில் சேவைகள்',
        items: [
          'காவடி முன்பதிவு',
          'சிறப்பு அர்ச்சனை',
          'பூஜை சேவைகள்',
          'அன்னதானம்',
          'திருமண மண்டபம்',
          'கலாச்சார நிகழ்ச்சிகள்'
        ]
      },
      contact: {
        title: 'தொடர்பு தகவல்',
        address: '77/24, நேதாஜி தெரு, சிதம்பரம், தமிழ்நாடு 608001',
        phone: '+91 98765 43210',
        email: 'info@mariammantemple.org',
        timings: 'தினமும்: காலை 7:00 - இரவு 11:00'
      },
      legal: {
        title: 'சட்ட தகவல்',
        items: [
          'கோவில் அறக்கட்டளை பதிவு: TN/123/2020',
          '80G வரி விலக்கு கிடைக்கும்',
          'FCRA பதிவு: 123456789',
          'தனியுரிமை கொள்கை',
          'சேவை விதிமுறைகள்',
          'பணம் திரும்ப கொள்கை'
        ]
      },
      social: {
        title: 'எங்களை பின்பற்றவும்',
        platforms: [
          { name: 'Facebook', icon: Facebook, url: 'https://www.facebook.com/MUKUN8888/' },
          { name: 'Instagram', icon: Instagram, url: 'https://www.instagram.com/p/DMm40cgRwWa/' },
          { name: 'YouTube', icon: Youtube, url: '#' }
        ]
      },
      copyright: '© 2024 அருள்மிகு மாரியம்மன் கோவில். அனைத்து உரிமைகளும் பாதுகாக்கப்பட்டவை.',
      developedBy: 'டிஜிட்டல் தரிசனத்திற்காக பக்தியுடன் உருவாக்கப்பட்டது'
    }
  };

  return (
    <footer className="bg-gradient-to-br from-red-900 via-red-800 to-yellow-800 text-white">
      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Temple Info */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center">
                <span className="text-red-800 font-bold text-lg">ॐ</span>
              </div>
              <div>
                <h3 className="text-xl font-bold text-yellow-200">
                  {language === 'english' ? 'Sri Selva Mariamman Temple' : 'ஸ்ரீ செல்வ மாரியம்மன் கோயில்'}
                </h3>
                <p className="text-sm text-yellow-300">
                  {language === 'english' ? 'Official Digital Portal' : 'அதிகாரபூர்வ டிஜிட்டல் வாயில்'}
                </p>
              </div>
            </div>

            <p className="text-yellow-100 leading-relaxed mb-6 max-w-md">
              {content[language].description}
            </p>

            {/* Social Links */}
            <div>
              <h4 className="text-yellow-200 font-semibold mb-4">{content[language].social.title}</h4>
              <div className="flex space-x-4">
                {content[language].social.platforms.map((platform, index) => (
                  <a
                    target='_blank'
                    key={index}
                    href={platform.url}
                    className="w-10 h-10 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-colors"
                    aria-label={platform.name}
                  >
                    <platform.icon className="h-5 w-5" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-yellow-200 font-semibold mb-6">{content[language].quickLinks.title}</h4>
            <ul className="space-y-3">
              {content[language].quickLinks.links.map((link, index) => (
                <li key={index}>
                  <button
                   onClick={(e) => {
                    e.preventDefault();
                    setCurrentPage(link.page);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                    
                    className="text-yellow-100 hover:text-yellow-200 transition-colors flex items-center space-x-2 group"
                  >
                    <span className="w-1 h-1 bg-yellow-400 rounded-full group-hover:w-2 transition-all"></span>
                    <span>{link.label}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-yellow-200 font-semibold mb-6">{content[language].contact.title}</h4>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 text-yellow-400 flex-shrink-0 mt-1" />
                <p className="text-yellow-100 text-sm leading-relaxed">
                  {content[language].contact.address}
                </p>
              </div>

              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-yellow-400 flex-shrink-0" />
                <p className="text-yellow-100 text-sm">
                  {content[language].contact.phone}
                </p>
              </div>

              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-yellow-400 flex-shrink-0" />
                <p className="text-yellow-100 text-sm">
                  {content[language].contact.email}
                </p>
              </div>

              <div className="bg-white/10 rounded-lg p-4 mt-4">
                <p className="text-yellow-200 font-medium text-sm mb-1">
                  {language === 'english' ? 'Darshan Timings' : 'தரிசன நேரம்'}
                </p>
                <p className="text-yellow-100 text-sm">
                  {content[language].contact.timings}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Services & Legal */}
        {/* <div className="grid md:grid-cols-2 gap-8 mb-8 pt-8 border-t border-white/20"> */}
          {/* Temple Services */}
          {/* <div>
            <h4 className="text-yellow-200 font-semibold mb-4">{content[language].services.title}</h4>
            <div className="grid grid-cols-2 gap-2">
              {content[language].services.items.map((service, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <div className="w-1 h-1 bg-yellow-400 rounded-full"></div>
                  <span className="text-yellow-100 text-sm">{service}</span>
                </div>
              ))}
            </div>
          </div> */}

          {/* Legal Information */}
          {/* <div>
            <h4 className="text-yellow-200 font-semibold mb-4">{content[language].legal.title}</h4>
            <div className="space-y-2">
              {content[language].legal.items.map((item, index) => (
                <div key={index} className="flex items-start space-x-2">
                  {index < 3 ? (
                    <div className="w-1 h-1 bg-yellow-400 rounded-full mt-2 flex-shrink-0"></div>
                  ) : (
                    <ExternalLink className="h-3 w-3 text-yellow-400 mt-1 flex-shrink-0" />
                  )}
                  <span className="text-yellow-100 text-sm hover:text-yellow-200 transition-colors cursor-pointer">
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </div> */}
        {/* </div> */}

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/20">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-yellow-100 text-sm">
              {content[language].copyright}
            </div>

            <div className="flex items-center space-x-2 text-yellow-200 text-sm">
              <Heart className="h-4 w-4 text-red-400" />
              <a target='_blank' style={{textDecoration:"underline"}} href='https://www.linkedin.com/in/vignesh-r-a79595350/'>{content[language].developedBy}</a>
            </div>
          </div>
        </div>

        {/* Trust Info Banner */}
        {/* <div className="mt-6 bg-white/10 rounded-lg p-4 text-center">
          <p className="text-yellow-100 text-sm">
            {language === 'english'
              ? '🏛️ Registered Religious Trust | 🎯 80G Tax Benefits Available | 🌍 Serving Global Tamil Community'
              : '🏛️ பதிவுசெய்யப்பட்ட மத அறக்கட்டளை | 🎯 80G வரி சலுகைகள் கிடைக்கும் | 🌍 உலகளாவிய தமிழ் சமுதாயத்திற்கு சேவை'
            }
          </p>
        </div> */}
      </div>
    </footer>
  );
};

export default Footer;