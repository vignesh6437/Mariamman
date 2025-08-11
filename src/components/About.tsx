import React, { useState } from 'react';
import { Clock, Users, Award, MapPin, ChevronRight } from 'lucide-react';

interface AboutProps {
  language: string;
}

const About: React.FC<AboutProps> = ({ language }) => {
  const [activeTab, setActiveTab] = useState('history');

  const content = {
    english: {
      title: 'About Arulmigu Mariamman Temple',
      subtitle: 'A Sacred Heritage Spanning Centuries',
      tabs: [
        { id: 'history', label: 'Temple History' },
        { id: 'architecture', label: 'Architecture' },
        { id: 'festivals', label: 'Festivals' },
        { id: 'trustees', label: 'Trust Board' }
      ],
      history: {
        title: 'Sacred History',
        timeline: [
          {
            year: '1650',
            title: 'Foundation',
            description: 'The temple was established by devotees who experienced divine visions of Goddess Mariamman.'
          },
          {
            year: '1850',
            title: 'Major Renovation',
            description: 'Significant architectural improvements were made, including the iconic gopuram structure.'
          },
          {
            year: '1950',
            title: 'Community Growth',
            description: 'The temple became a central hub for the growing Tamil community in the region.'
          },
          {
            year: '2020',
            title: 'Digital Transformation',
            description: 'Launch of online services and digital connectivity for global devotees.'
          }
        ]
      }
    },
    tamil: {
      title: 'அருள்மிகு மாரியம்மன் கோவில் பற்றி',
      subtitle: 'நூற்றாண்டுகள் பழமையான புனித பாரம்பரியம்',
      tabs: [
        { id: 'history', label: 'கோவில் வரலாறு' },
        { id: 'architecture', label: 'கட்டிடக்கலை' },
        { id: 'festivals', label: 'திருவிழாக்கள்' },
        { id: 'trustees', label: 'அறங்காவலர் குழு' }
      ],
      history: {
        title: 'புனித வரலாறு',
        timeline: [
          {
            year: '1650',
            title: 'தோற்றம்',
            description: 'மாரியம்மன் அம்மனின் தெய்வீக தரிசனம் பெற்ற பக்தர்களால் இக்கோவில் நிறுவப்பட்டது.'
          },
          {
            year: '1850',
            title: 'பெரும் புனரமைப்பு',
            description: 'கோபுர கட்டிடம் உட்பட குறிப்பிடத்தக்க கட்டிடக்கலை மேம்பாடுகள் செய்யப்பட்டன.'
          },
          {
            year: '1950',
            title: 'சமூக வளர்ச்சி',
            description: 'இப்பகுதியில் வளர்ந்து வரும் தமிழ் சமுதாயத்தின் மைய மையமாக இக்கோவில் மாறியது.'
          },
          {
            year: '2020',
            title: 'டிஜிட்டல் மாற்றம்',
            description: 'உலகளாவிய பக்தர்களுக்கான ஆன்லைன் சேவைகள் மற்றும் டிஜிட்டல் இணைப்பு தொடக்கம்.'
          }
        ]
      }
    }
  };

  const stats = [
    { icon: Clock, value: '375+', label: language === 'english' ? 'Years of Heritage' : 'ஆண்டுகள் பாரம்பரியம்' },
    { icon: Users, value: '50K+', label: language === 'english' ? 'Annual Devotees' : 'வருடாந்திர பக்தர்கள்' },
    { icon: Award, value: '25+', label: language === 'english' ? 'Religious Events' : 'மத நிகழ்வுகள்' },
    { icon: MapPin, value: '10+', label: language === 'english' ? 'Branch Temples' : 'கிளை கோவில்கள்' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-red-50 py-20">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-red-800 to-yellow-600 bg-clip-text text-transparent mb-4">
            {content[language].title}
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {content[language].subtitle}
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {stats.map((stat, index) => (
            <div key={index} className="text-center p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
              <stat.icon className="h-8 w-8 text-red-600 mx-auto mb-4" />
              <div className="text-3xl font-bold text-red-800 mb-2">{stat.value}</div>
              <div className="text-sm text-gray-600">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar Navigation */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-24">
              <h3 className="text-xl font-bold text-gray-800 mb-6">
                {language === 'english' ? 'Explore' : 'ஆராயுங்கள்'}
              </h3>
              {content[language].tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full text-left px-4 py-3 rounded-lg mb-2 flex items-center justify-between transition-all ${
                    activeTab === tab.id
                      ? 'bg-gradient-to-r from-red-600 to-yellow-500 text-white'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <span>{tab.label}</span>
                  <ChevronRight className="h-4 w-4" />
                </button>
              ))}
            </div>
          </div>

          {/* Content Area */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-2xl shadow-lg p-8">
              {activeTab === 'history' && (
                <div>
                  <h2 className="text-3xl font-bold text-gray-800 mb-8">
                    {content[language].history.title}
                  </h2>
                  
                  <div className="space-y-8">
                    {content[language].history.timeline.map((event, index) => (
                      <div key={index} className="flex items-start space-x-6">
                        <div className="flex-shrink-0">
                          <div className="w-16 h-16 bg-gradient-to-br from-red-600 to-yellow-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
                            {event.year.slice(-2)}
                          </div>
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center mb-2">
                            <h3 className="text-xl font-bold text-red-800">{event.title}</h3>
                            <span className="ml-3 px-3 py-1 bg-yellow-100 text-yellow-800 text-sm rounded-full">
                              {event.year}
                            </span>
                          </div>
                          <p className="text-gray-600 leading-relaxed">{event.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'architecture' && (
                <div>
                  <h2 className="text-3xl font-bold text-gray-800 mb-8">
                    {language === 'english' ? 'Divine Architecture' : 'தெய்வீக கட்டிடக்கலை'}
                  </h2>
                  <div className="grid md:grid-cols-2 gap-8">
                    <div className="space-y-4">
                      <h3 className="text-xl font-semibold text-red-800">
                        {language === 'english' ? 'Architectural Features' : 'கட்டிடக்கலை அம்சங்கள்'}
                      </h3>
                      <ul className="space-y-2 text-gray-600">
                        <li>• {language === 'english' ? 'Traditional Dravidian Style Gopuram' : 'பாரம்பரிய திராவிட பாணி கோபுரம்'}</li>
                        <li>• {language === 'english' ? 'Intricately Carved Pillars' : 'நுணுக்கமாக செதுக்கப்பட்ட தூண்கள்'}</li>
                        <li>• {language === 'english' ? 'Sacred Sanctum Sanctorum' : 'புனித கருவறை'}</li>
                        <li>• {language === 'english' ? 'Beautiful Mandapam Halls' : 'அழகிய மண்டப அரங்கங்கள்'}</li>
                      </ul>
                    </div>
                    <div className="bg-gradient-to-br from-red-100 to-yellow-100 rounded-xl p-6">
                      <p className="text-gray-700 leading-relaxed">
                        {language === 'english' 
                          ? 'The temple showcases exquisite Dravidian architecture with intricate stone carvings, towering gopurams, and sacred geometrical patterns that reflect ancient Tamil architectural traditions.'
                          : 'இக்கோவில் நுணுக்கமான கல் சிற்பங்கள், உயர்ந்த கோபுரங்கள் மற்றும் பண்டைய தமிழ் கட்டிடக்கலை பாரம்பரியங்களை பிரதிபலிக்கும் புனித வடிவியல் வடிவங்களுடன் அழகிய திராவிட கட்டிடக்கலையை வெளிப்படுத்துகிறது.'
                        }
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'festivals' && (
                <div>
                  <h2 className="text-3xl font-bold text-gray-800 mb-8">
                    {language === 'english' ? 'Sacred Festivals' : 'புனித திருவிழாக்கள்'}
                  </h2>
                  <div className="grid md:grid-cols-2 gap-6">
                    {[
                      {
                        name: language === 'english' ? 'Mariamman Thiruvizha' : 'மாரியம்மன் திருவிழா',
                        month: language === 'english' ? 'March-April' : 'மார்ச்-ஏப்ரல்',
                        description: language === 'english' ? 'Grand annual festival celebrating Goddess Mariamman' : 'மாரியம்மன் அம்மனைக் கொண்டாடும் பெரிய வருடாந்திர திருவிழா'
                      },
                      {
                        name: language === 'english' ? 'Aadi Pooram' : 'ஆடி பூரம்',
                        month: language === 'english' ? 'July-August' : 'ஜூலை-ஆகஸ்ட்',
                        description: language === 'english' ? 'Auspicious celebration during Aadi month' : 'ஆடி மாதத்தில் நடக்கும் சுபமான கொண்டாட்டம்'
                      },
                      {
                        name: language === 'english' ? 'Panguni Uthiram' : 'பங்குனி உத்திரம்',
                        month: language === 'english' ? 'March' : 'மார்ச்',
                        description: language === 'english' ? 'Divine marriage celebration' : 'தெய்வீக திருமண கொண்டாட்டம்'
                      },
                      {
                        name: language === 'english' ? 'Monthly Pournami' : 'மாதாந்திர பௌர்ணமி',
                        month: language === 'english' ? 'Monthly' : 'மாதாந்திரம்',
                        description: language === 'english' ? 'Full moon day special prayers' : 'பௌர்ணமி நாள் சிறப்பு வழிபாடு'
                      }
                    ].map((festival, index) => (
                      <div key={index} className="bg-gradient-to-br from-red-50 to-yellow-50 rounded-xl p-6 border border-red-100">
                        <h3 className="text-xl font-bold text-red-800 mb-2">{festival.name}</h3>
                        <p className="text-sm text-yellow-600 font-medium mb-3">{festival.month}</p>
                        <p className="text-gray-600">{festival.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'trustees' && (
                <div>
                  <h2 className="text-3xl font-bold text-gray-800 mb-8">
                    {language === 'english' ? 'Trust Board Members' : 'அறங்காவலர் குழு உறுப்பினர்கள்'}
                  </h2>
                  <div className="grid md:grid-cols-2 gap-6">
                    {[
                      {
                        name: 'Sri. Rajesh Kumar',
                        position: language === 'english' ? 'Chairman' : 'தலைவர்',
                        experience: '15+ years'
                      },
                      {
                        name: 'Smt. Kamala Devi',
                        position: language === 'english' ? 'Secretary' : 'செயலாளர்',
                        experience: '12+ years'
                      },
                      {
                        name: 'Sri. Murugan',
                        position: language === 'english' ? 'Treasurer' : 'பொருளாளர்',
                        experience: '10+ years'
                      },
                      {
                        name: 'Sri. Venkatesh',
                        position: language === 'english' ? 'Trustee' : 'அறங்காவலர்',
                        experience: '8+ years'
                      }
                    ].map((member, index) => (
                      <div key={index} className="bg-white border border-gray-200 rounded-xl p-6 text-center">
                        <div className="w-20 h-20 bg-gradient-to-br from-red-600 to-yellow-500 rounded-full mx-auto mb-4 flex items-center justify-center text-white text-2xl font-bold">
                          {member.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <h3 className="text-xl font-bold text-gray-800 mb-1">{member.name}</h3>
                        <p className="text-red-600 font-medium mb-2">{member.position}</p>
                        <p className="text-sm text-gray-500">{member.experience}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;