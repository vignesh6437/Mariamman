import React, { useState } from 'react';
import { Calendar as CalendarIcon, Clock, MapPin, Users, ChevronLeft, ChevronRight, Filter, Plus } from 'lucide-react';

interface EventsProps {
  language: string;
}

const Events: React.FC<EventsProps> = ({ language }) => {
  const [currentView, setCurrentView] = useState<'calendar' | 'list'>('calendar');
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [filterCategory, setFilterCategory] = useState('all');
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const content = {
    english: {
      title: 'Temple Events & Festivals',
      subtitle: 'Stay connected with our sacred celebrations and spiritual gatherings',
      viewButtons: ['Calendar View', 'List View'],
      filters: [
        { id: 'all', name: 'All Events' },
        { id: 'festivals', name: 'Festivals' },
        { id: 'poojas', name: 'Special Poojas' },
        { id: 'cultural', name: 'Cultural Events' },
        { id: 'community', name: 'Community Service' }
      ],
      addToCalendar: 'Add to Google Calendar'
    },
    tamil: {
      title: 'கோவில் நிகழ்வுகள் & திருவிழாக்கள்',
      subtitle: 'எங்கள் புனித கொண்டாட்டங்கள் மற்றும் ஆன்மீக கூட்டங்களுடன் தொடர்பில் இருங்கள்',
      viewButtons: ['நாட்காட்டி பார்வை', 'பட்டியல் பார்வை'],
      filters: [
        { id: 'all', name: 'அனைத்து நிகழ்வுகள்' },
        { id: 'festivals', name: 'திருவிழாக்கள்' },
        { id: 'poojas', name: 'சிறப்பு பூஜைகள்' },
        { id: 'cultural', name: 'கலாச்சார நிகழ்வுகள்' },
        { id: 'community', name: 'சமூக சேவை' }
      ],
      addToCalendar: 'Google காலெண்டரில் சேர்க்கவும்'
    }
  };

  const events = [
    {
      id: 1,
      title: language === 'english' ? 'Mariamman Thiruvizha' : 'மாரியம்மன் திருவிழா',
      date: '2024-03-15',
      time: '06:00 AM - 10:00 PM',
      category: 'festivals',
      description: language === 'english' ? 'Grand annual festival with cultural programs' : 'கலாச்சார நிகழ்ச்சிகளுடன் பெரிய வருடாந்திர திருவிழா',
      location: language === 'english' ? 'Temple Premises' : 'கோவில் வளாகம்',
      attendees: 5000,
      featured: true
    },
    {
      id: 2,
      title: language === 'english' ? 'Aadi Pooram Celebration' : 'ஆடி பூரம் கொண்டாட்டம்',
      date: '2024-07-21',
      time: '05:30 AM - 12:00 PM',
      category: 'festivals',
      description: language === 'english' ? 'Special celebration during Aadi month' : 'ஆடி மாத சிறப்பு கொண்டாட்டம்',
      location: language === 'english' ? 'Main Temple Hall' : 'முதன்மை கோவில் அரங்கம்',
      attendees: 2000
    },
    {
      id: 3,
      title: language === 'english' ? 'Weekly Abhishekam' : 'வாராந்திர அபிஷேகம்',
      date: '2024-02-18',
      time: '07:00 AM - 09:00 AM',
      category: 'poojas',
      description: language === 'english' ? 'Sacred bathing ceremony for the deity' : 'தெய்வத்திற்கான புனித குளியல் சடங்கு',
      location: language === 'english' ? 'Sanctum Sanctorum' : 'கருவறை',
      attendees: 300
    },
    {
      id: 4,
      title: language === 'english' ? 'Monthly Annadhanam' : 'மாதாந்திர அன்னதானம்',
      date: '2024-02-25',
      time: '12:00 PM - 03:00 PM',
      category: 'community',
      description: language === 'english' ? 'Free food distribution for devotees' : 'பக்தர்களுக்கு இலவச உணவு விநியோகம்',
      location: language === 'english' ? 'Community Hall' : 'சமூக அரங்கம்',
      attendees: 1500
    },
    {
      id: 5,
      title: language === 'english' ? 'Tamil New Year Celebration' : 'தமிழ் புத்தாண்டு கொண்டாட்டம்',
      date: '2024-04-14',
      time: '06:00 AM - 08:00 PM',
      category: 'cultural',
      description: language === 'english' ? 'Traditional Tamil New Year festivities' : 'பாரம்பரிய தமிழ் புத்தாண்டு கொண்டாட்டங்கள்',
      location: language === 'english' ? 'Temple Complex' : 'கோவில் வளாகம்',
      attendees: 3000
    }
  ];

  const getEventsForMonth = (month: Date) => {
    return events.filter(event => {
      const eventDate = new Date(event.date);
      return eventDate.getMonth() === month.getMonth() && 
             eventDate.getFullYear() === month.getFullYear();
    });
  };

  const getEventsForDate = (date: Date) => {
    const dateStr = date.toISOString().split('T')[0];
    return events.filter(event => event.date === dateStr);
  };

  const filteredEvents = events.filter(event => 
    filterCategory === 'all' || event.category === filterCategory
  );

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days = [];
    
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }
    
    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(day);
    }
    
    return days;
  };

  const nextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
  };

  const prevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(language === 'english' ? 'en-US' : 'ta-IN', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getCategoryColor = (category: string) => {
    const colors = {
      festivals: 'bg-red-500',
      poojas: 'bg-yellow-500',
      cultural: 'bg-blue-500',
      community: 'bg-green-500'
    };
    return colors[category] || 'bg-gray-500';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-red-50 py-20">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-red-800 to-yellow-600 bg-clip-text text-transparent mb-4">
            {content[language].title}
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {content[language].subtitle}
          </p>
        </div>

        {/* Controls */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <div className="flex flex-col lg:flex-row justify-between items-center space-y-4 lg:space-y-0">
            {/* View Toggle */}
            <div className="flex space-x-2">
              {content[language].viewButtons.map((button, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentView(index === 0 ? 'calendar' : 'list')}
                  className={`px-6 py-3 rounded-lg font-medium transition-all ${
                    (index === 0 && currentView === 'calendar') || (index === 1 && currentView === 'list')
                      ? 'bg-gradient-to-r from-red-600 to-yellow-500 text-white'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  {button}
                </button>
              ))}
            </div>

            {/* Filters */}
            <div className="flex items-center space-x-4">
              <Filter className="h-5 w-5 text-gray-600" />
              <select
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
              >
                {content[language].filters.map(filter => (
                  <option key={filter.id} value={filter.id}>
                    {filter.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Calendar View */}
        {currentView === 'calendar' && (
          <div className="bg-white rounded-2xl shadow-xl p-8">
            {/* Calendar Header */}
            <div className="flex items-center justify-between mb-8">
              <button
                onClick={prevMonth}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <ChevronLeft className="h-6 w-6" />
              </button>
              
              <h2 className="text-2xl font-bold text-gray-800">
                {currentMonth.toLocaleDateString(language === 'english' ? 'en-US' : 'ta-IN', {
                  month: 'long',
                  year: 'numeric'
                })}
              </h2>
              
              <button
                onClick={nextMonth}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <ChevronRight className="h-6 w-6" />
              </button>
            </div>

            {/* Calendar Grid */}
            <div className="grid grid-cols-7 gap-2">
              {/* Weekday Headers */}
              {(language === 'english' 
                ? ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
                : ['ஞா', 'தி', 'செ', 'பு', 'வி', 'வெ', 'ச']
              ).map((day, index) => (
                <div key={index} className="p-4 text-center font-semibold text-gray-600 bg-gray-50 rounded-lg">
                  {day}
                </div>
              ))}

              {/* Calendar Days */}
              {getDaysInMonth(currentMonth).map((day, index) => {
                if (!day) return <div key={index} className="p-4"></div>;
                
                const currentDate = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
                const dayEvents = getEventsForDate(currentDate);
                const isToday = new Date().toDateString() === currentDate.toDateString();
                
                return (
                  <div
                    key={index}
                    className={`p-2 min-h-[100px] border rounded-lg cursor-pointer transition-all hover:bg-gray-50 ${
                      isToday ? 'bg-blue-50 border-blue-300' : 'border-gray-200'
                    }`}
                    onClick={() => setSelectedDate(currentDate)}
                  >
                    <div className={`text-sm font-medium mb-2 ${
                      isToday ? 'text-blue-600' : 'text-gray-700'
                    }`}>
                      {day}
                    </div>
                    
                    <div className="space-y-1">
                      {dayEvents.slice(0, 2).map((event) => (
                        <div
                          key={event.id}
                          className={`text-xs p-1 rounded text-white truncate ${getCategoryColor(event.category)}`}
                          title={event.title}
                        >
                          {event.title}
                        </div>
                      ))}
                      {dayEvents.length > 2 && (
                        <div className="text-xs text-gray-500">
                          +{dayEvents.length - 2} more
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* List View */}
        {currentView === 'list' && (
          <div className="space-y-6">
            {filteredEvents.map((event) => (
              <div
                key={event.id}
                className={`bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow p-6 ${
                  event.featured ? 'ring-2 ring-yellow-400' : ''
                }`}
              >
                <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-4">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="text-2xl font-bold text-gray-800">{event.title}</h3>
                      {event.featured && (
                        <span className="px-3 py-1 bg-yellow-100 text-yellow-800 text-sm rounded-full">
                          {language === 'english' ? 'Featured' : 'சிறப்பு'}
                        </span>
                      )}
                      <span className={`px-3 py-1 text-white text-sm rounded-full ${getCategoryColor(event.category)}`}>
                        {content[language].filters.find(f => f.id === event.category)?.name}
                      </span>
                    </div>
                    
                    <p className="text-gray-600 text-lg mb-4">{event.description}</p>
                    
                    <div className="flex flex-wrap gap-6 text-sm text-gray-500">
                      <div className="flex items-center space-x-2">
                        <CalendarIcon className="h-4 w-4" />
                        <span>{formatDate(event.date)}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Clock className="h-4 w-4" />
                        <span>{event.time}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <MapPin className="h-4 w-4" />
                        <span>{event.location}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Users className="h-4 w-4" />
                        <span>{event.attendees.toLocaleString()} {language === 'english' ? 'expected' : 'எதிர்பார்க்கப்படுகிறது'}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex flex-col space-y-3 mt-4 lg:mt-0">
                    <button className="flex items-center space-x-2 bg-gradient-to-r from-red-600 to-yellow-500 hover:from-red-500 hover:to-yellow-400 text-white px-6 py-3 rounded-lg transition-all transform hover:scale-105">
                      <Plus className="h-4 w-4" />
                      <span>{content[language].addToCalendar}</span>
                    </button>
                    
                    <button className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                      {language === 'english' ? 'Set Reminder' : 'நினைவூட்டல் அமைக்கவும்'}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Event Details Modal for Selected Date */}
        {selectedDate && getEventsForDate(selectedDate).length > 0 && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h3 className="text-2xl font-bold text-gray-800">
                    {language === 'english' ? 'Events on' : 'நிகழ்வுகள்'} {formatDate(selectedDate.toISOString().split('T')[0])}
                  </h3>
                  <button
                    onClick={() => setSelectedDate(null)}
                    className="text-gray-500 hover:text-gray-700 text-2xl"
                  >
                    ×
                  </button>
                </div>
              </div>
              
              <div className="p-6 space-y-6">
                {getEventsForDate(selectedDate).map((event) => (
                  <div key={event.id} className="border border-gray-200 rounded-xl p-6">
                    <h4 className="text-xl font-bold text-gray-800 mb-2">{event.title}</h4>
                    <p className="text-gray-600 mb-4">{event.description}</p>
                    
                    <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-500">
                      <div className="flex items-center space-x-2">
                        <Clock className="h-4 w-4" />
                        <span>{event.time}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <MapPin className="h-4 w-4" />
                        <span>{event.location}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Users className="h-4 w-4" />
                        <span>{event.attendees.toLocaleString()} {language === 'english' ? 'expected' : 'எதிர்பார்க்கப்படுகிறது'}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className={`w-3 h-3 rounded-full ${getCategoryColor(event.category)}`}></div>
                        <span>{content[language].filters.find(f => f.id === event.category)?.name}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Events;