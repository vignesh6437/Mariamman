import React, { useState } from 'react';
import { Calendar, Clock, CreditCard, CheckCircle, User, Phone, Mail, Star } from 'lucide-react';
import MotionDiv from '../components/MotionDiv'; // Adjust the import path as necessary

interface ServicesProps {
  language: string;
}

const Services: React.FC<ServicesProps> = ({ language }) => {
  const [activeService, setActiveService] = useState('kavadi');
  const [bookingForm, setBookingForm] = useState({
    name: '',
    phone: '',
    email: '',
    date: '',
    time: '',
    count: 1,
    specialRequests: ''
  });
  const [showBookingForm, setShowBookingForm] = useState(false);

  const services = {
    english: {
      kavadi: {
        title: 'Kavadi Booking',
        price: '₹500',
        description: 'Sacred offering carried by devotees to fulfill vows and seek blessings',
        features: ['Traditional Kavadi', 'Flower Decoration', 'Prasadam', 'Certificate'],
        availability: 'Available daily except festival days'
      },
      archana: {
        title: 'Archana & Alankaram',
        price: '₹200',
        description: 'Special prayers with flower decoration for the deity',
        features: ['108 Names Chanting', 'Fresh Flowers', 'Kumkum & Turmeric', 'Prasadam'],
        availability: 'Available all days'
      },
      pooja: {
        title: 'Special Pooja',
        price: '₹300',
        description: 'Comprehensive ritual worship with special offerings',
        features: ['Complete Ritual', 'Fruits & Sweets', 'Sacred Fire', 'Blessing Certificate'],
        availability: 'Pre-booking required'
      },
      hundi: {
        title: 'Hundi Donation',
        price: 'As per devotion',
        description: 'Make sacred donations for temple maintenance and activities',
        features: ['Tax Benefits', 'Digital Receipt', 'Monthly Report', 'Blessing Card'],
        availability: 'Always open'
      }
    },
    tamil: {
      kavadi: {
        title: 'காவடி முன்பதிவு',
        price: '₹500',
        description: 'நேர்த்திகடன் நிறைவேற்றவும் ஆசீர்வாதம் பெறவும் பக்தர்கள் சுமக்கும் புனித காணிக்கை',
        features: ['பாரம்பரிய காவடி', 'பூ அலங்காரம்', 'பிரசாதம்', 'சான்றிதழ்'],
        availability: 'திருவிழா நாட்களைத் தவிர தினமும் கிடைக்கும்'
      },
      archana: {
        title: 'அர்ச்சனை மற்றும் அலங்காரம்',
        price: '₹200',
        description: 'கடவுளுக்கு பூ அலங்காரத்துடன் சிறப்பு பிரார்த்தனைகள்',
        features: ['108 நாமங்கள்', 'புதிய பூக்கள்', 'குங்குமம் & மஞ்சள்', 'பிரசாதம்'],
        availability: 'எல்லா நாட்களும் கிடைக்கும்'
      },
      pooja: {
        title: 'சிறப்பு பூஜை',
        price: '₹300',
        description: 'சிறப்பு காணிக்கைகளுடன் முழுமையான சடங்கு வழிபாடு',
        features: ['முழு சடங்கு', 'பழங்கள் & இனிப்புகள்', 'புனித நெருப்பு', 'ஆசி சான்றிதழ்'],
        availability: 'முன்பதிவு தேவை'
      },
      hundi: {
        title: 'உண்டியல் நன்கொடை',
        price: 'பக்தியின்படி',
        description: 'கோவில் பராமரிப்பு மற்றும் செயல்பாடுகளுக்கு புனித நன்கொடை',
        features: ['வரி சலுகை', 'டிஜிட்டல் ரசீது', 'மாதாந்திர அறிக்கை', 'ஆசீர்வாத அட்டை'],
        availability: 'எப்போதும் திறந்திருக்கும்'
      }
    }
  };

  const handleBooking = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would integrate with your booking system
    alert(language === 'english' ? 'Booking confirmed! You will receive a confirmation email shortly.' : 'முன்பதிவு உறுதிபடுத்தப்பட்டது! விரைவில் உறுதிப்படுத்தல் மின்னஞ்சல் பெறுவீர்கள்.');
    setShowBookingForm(false);
    setBookingForm({
      name: '',
      phone: '',
      email: '',
      date: '',
      time: '',
      count: 1,
      specialRequests: ''
    });
  };

  return (
    <MotionDiv className="min-h-screen bg-gradient-to-br from-amber-50 to-red-50 py-20">
      <MotionDiv className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <MotionDiv className="text-center mb-16">
          <h1 className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-red-800 to-yellow-600 bg-clip-text text-transparent mb-4">
            {language === 'english' ? 'Online Temple Services' : 'ஆன்லைன் கோவில் சேவைகள்'}
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {language === 'english' 
              ? 'Book sacred services and offerings from the comfort of your home with our secure online platform'
              : 'எங்கள் பாதுகாப்பான ஆன்லайன் தளத்தின் மூலம் உங்கள் வீட்டிலிருந்தே புனித சேவைகள் மற்றும் காணிக்கைகளை முன்பதிவு செய்யுங்கள்'
            }
          </p>
        </MotionDiv>

        {/* Service Categories */}
        <MotionDiv className="grid lg:grid-cols-4 gap-6 mb-12">
          {Object.keys(services[language]).map((serviceKey) => {
            const service = services[language][serviceKey];
            return (
              <button
                key={serviceKey}
                onClick={() => setActiveService(serviceKey)}
                className={`p-6 rounded-2xl text-left transition-all duration-300 transform hover:scale-105 ${
                  activeService === serviceKey
                    ? 'bg-gradient-to-br from-red-600 to-yellow-500 text-white shadow-2xl'
                    : 'bg-white text-gray-800 shadow-lg hover:shadow-xl'
                }`}
              >
                <MotionDiv className="flex items-center justify-between mb-4">
                  <MotionDiv className={`p-3 rounded-lg ${
                    activeService === serviceKey ? 'bg-white/20' : 'bg-red-100'
                  }`}>
                    <Star className={`h-6 w-6 ${
                      activeService === serviceKey ? 'text-white' : 'text-red-600'
                    }`} />
                  </MotionDiv>
                  <span className={`text-lg font-bold ${
                    activeService === serviceKey ? 'text-yellow-200' : 'text-red-600'
                  }`}>
                    {service.price}
                  </span>
                </MotionDiv>
                <h3 className="text-xl font-bold mb-2">{service.title}</h3>
                <p className={`text-sm ${
                  activeService === serviceKey ? 'text-white/90' : 'text-gray-600'
                }`}>
                  {service.description}
                </p>
              </button>
            );
          })}
        </MotionDiv>

        {/* Service Details */}
        <MotionDiv className="grid lg:grid-cols-3 gap-8">
          {/* Service Info */}
          <MotionDiv className="lg:col-span-2">
            <MotionDiv className="bg-white rounded-2xl shadow-xl p-8">
              <MotionDiv className="flex items-center justify-between mb-6">
                <h2 className="text-3xl font-bold text-gray-800">
                  {services[language][activeService].title}
                </h2>
                <span className="text-2xl font-bold text-red-600">
                  {services[language][activeService].price}
                </span>
              </MotionDiv>

              <p className="text-gray-600 text-lg mb-8 leading-relaxed">
                {services[language][activeService].description}
              </p>

              <MotionDiv className="mb-8">
                <h3 className="text-xl font-bold text-gray-800 mb-4">
                  {language === 'english' ? 'What\'s Included' : 'உள்ளடக்கப்பட்டது'}
                </h3>
                <MotionDiv className="grid md:grid-cols-2 gap-4">
                  {services[language][activeService].features.map((feature, index) => (
                    <MotionDiv key={index} className="flex items-center space-x-3">
                      <CheckCircle className="h-5 w-5 text-green-600" />
                      <span className="text-gray-700">{feature}</span>
                    </MotionDiv>
                  ))}
                </MotionDiv>
              </MotionDiv>

              <MotionDiv className="bg-gradient-to-r from-yellow-50 to-red-50 rounded-xl p-6 mb-8">
                <MotionDiv className="flex items-center space-x-3">
                  <Clock className="h-6 w-6 text-red-600" />
                  <MotionDiv>
                    <h4 className="font-bold text-gray-800">
                      {language === 'english' ? 'Availability' : 'கிடைக்கும் நேரம்'}
                    </h4>
                    <p className="text-gray-600">{services[language][activeService].availability}</p>
                  </MotionDiv>
                </MotionDiv>
              </MotionDiv>

              <button
                onClick={() => setShowBookingForm(true)}
                className="w-full bg-gradient-to-r from-red-600 to-yellow-500 hover:from-red-500 hover:to-yellow-400 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                {language === 'english' ? 'Book Now' : 'இப்போதே முன்பதிவு செய்யுங்கள்'}
              </button>
            </MotionDiv>
          </MotionDiv>

          {/* Quick Stats */}
          <MotionDiv className="space-y-6">
            <MotionDiv className="bg-white rounded-2xl shadow-xl p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-6">
                {language === 'english' ? 'Service Statistics' : 'சேவை புள்ளிவிவரங்கள்'}
              </h3>
              <MotionDiv className="space-y-4">
                <MotionDiv className="flex justify-between items-center">
                  <span className="text-gray-600">{language === 'english' ? 'Today\'s Bookings' : 'இன்றைய முன்பதிவுகள்'}</span>
                  <span className="font-bold text-red-600">27</span>
                </MotionDiv>
                <MotionDiv className="flex justify-between items-center">
                  <span className="text-gray-600">{language === 'english' ? 'Available Slots' : 'கிடைக்கும் இடங்கள்'}</span>
                  <span className="font-bold text-green-600">15</span>
                </MotionDiv>
                <MotionDiv className="flex justify-between items-center">
                  <span className="text-gray-600">{language === 'english' ? 'Next Available' : 'அடுத்து கிடைக்கும்'}</span>
                  <span className="font-bold text-blue-600">2:00 PM</span>
                </MotionDiv>
              </MotionDiv>
            </MotionDiv>

            <MotionDiv className="bg-white rounded-2xl shadow-xl p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-6">
                {language === 'english' ? 'Customer Reviews' : 'வாடிக்கையாளர் மதிப்புரைகள்'}
              </h3>
              <MotionDiv className="space-y-4">
                <MotionDiv className="bg-gray-50 rounded-lg p-4">
                  <MotionDiv className="flex items-center mb-2">
                    <MotionDiv className="flex text-yellow-400">
                      {[1,2,3,4,5].map(i => <Star key={i} className="h-4 w-4 fill-current" />)}
                    </MotionDiv>
                    <span className="ml-2 text-sm text-gray-600">Priya S.</span>
                  </MotionDiv>
                  <p className="text-sm text-gray-700">
                    {language === 'english' 
                      ? 'Excellent service! Very smooth booking process.'
                      : 'சிறந்த சேவை! மிகவும் எளிதான முன்பதிவு செயல்முறை.'
                    }
                  </p>
                </MotionDiv>
                <MotionDiv className="bg-gray-50 rounded-lg p-4">
                  <MotionDiv className="flex items-center mb-2">
                    <MotionDiv className="flex text-yellow-400">
                      {[1,2,3,4,5].map(i => <Star key={i} className="h-4 w-4 fill-current" />)}
                    </MotionDiv>
                    <span className="ml-2 text-sm text-gray-600">Raj M.</span>
                  </MotionDiv>
                  <p className="text-sm text-gray-700">
                    {language === 'english' 
                      ? 'Blessed to be able to book online. Highly recommend!'
                      : 'ஆன்லைனில் முன்பதிவு செய்ய முடிந்ததில் ஆசீர்வாதம்!'
                    }
                  </p>
                </MotionDiv>
              </MotionDiv>
            </MotionDiv>
          </MotionDiv>
        </MotionDiv>

        {/* Booking Form Modal */}
        {showBookingForm && (
          <MotionDiv className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <MotionDiv className="bg-white rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
              <MotionDiv className="p-6">
                <MotionDiv className="flex items-center justify-between mb-6">
                  <h3 className="text-2xl font-bold text-gray-800">
                    {language === 'english' ? 'Book Service' : 'சேவை முன்பதிவு'}
                  </h3>
                  <button
                    onClick={() => setShowBookingForm(false)}
                    className="text-gray-500 hover:text-gray-700 text-2xl"
                  >
                    ×
                  </button>
                </MotionDiv>

                <form onSubmit={handleBooking} className="space-y-6">
                  <MotionDiv>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <User className="inline h-4 w-4 mr-1" />
                      {language === 'english' ? 'Full Name' : 'முழு பெயர்'}
                    </label>
                    <input
                      type="text"
                      required
                      value={bookingForm.name}
                      onChange={(e) => setBookingForm({...bookingForm, name: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                      placeholder={language === 'english' ? 'Enter your name' : 'உங்கள் பெயரை உள்ளிடுங்கள்'}
                    />
                  </MotionDiv>

                  <MotionDiv>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <Phone className="inline h-4 w-4 mr-1" />
                      {language === 'english' ? 'Phone Number' : 'தொலைபேசி எண்'}
                    </label>
                    <input
                      type="tel"
                      required
                      value={bookingForm.phone}
                      onChange={(e) => setBookingForm({...bookingForm, phone: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                      placeholder="+91 98765 43210"
                    />
                  </MotionDiv>

                  <MotionDiv>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <Mail className="inline h-4 w-4 mr-1" />
                      {language === 'english' ? 'Email Address' : 'மின்னஞ்சல் முகவரி'}
                    </label>
                    <input
                      type="email"
                      required
                      value={bookingForm.email}
                      onChange={(e) => setBookingForm({...bookingForm, email: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                      placeholder="your@email.com"
                    />
                  </MotionDiv>

                  <MotionDiv className="grid grid-cols-2 gap-4">
                    <MotionDiv>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        <Calendar className="inline h-4 w-4 mr-1" />
                        {language === 'english' ? 'Date' : 'தேதி'}
                      </label>
                      <input
                        type="date"
                        required
                        value={bookingForm.date}
                        onChange={(e) => setBookingForm({...bookingForm, date: e.target.value})}
                        min={new Date().toISOString().split('T')[0]}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                      />
                    </MotionDiv>
                    <MotionDiv>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        <Clock className="inline h-4 w-4 mr-1" />
                        {language === 'english' ? 'Time' : 'நேரம்'}
                      </label>
                      <select
                        required
                        value={bookingForm.time}
                        onChange={(e) => setBookingForm({...bookingForm, time: e.target.value})}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                      >
                        <option value="">Select Time</option>
                        <option value="06:00">6:00 AM</option>
                        <option value="08:00">8:00 AM</option>
                        <option value="10:00">10:00 AM</option>
                        <option value="12:00">12:00 PM</option>
                        <option value="14:00">2:00 PM</option>
                        <option value="16:00">4:00 PM</option>
                        <option value="18:00">6:00 PM</option>
                      </select>
                    </MotionDiv>
                  </MotionDiv>

                  <MotionDiv>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {language === 'english' ? 'Special Requests' : 'சிறப்பு கோரிக்கைகள்'}
                    </label>
                    <textarea
                      value={bookingForm.specialRequests}
                      onChange={(e) => setBookingForm({...bookingForm, specialRequests: e.target.value})}
                      rows={3}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                      placeholder={language === 'english' ? 'Any special requests or instructions...' : 'ஏதேனும் சிறப்பு கோரிக்கைகள் அல்லது அறிவுரைகள்...'}
                    />
                  </MotionDiv>

                  <MotionDiv className="flex space-x-4">
                    <button
                      type="button"
                      onClick={() => setShowBookingForm(false)}
                      className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      {language === 'english' ? 'Cancel' : 'ரத்து'}
                    </button>
                    <button
                      type="submit"
                      className="flex-1 bg-gradient-to-r from-red-600 to-yellow-500 text-white px-6 py-3 rounded-lg hover:from-red-500 hover:to-yellow-400 transition-all transform hover:scale-105"
                    >
                      <CreditCard className="inline h-4 w-4 mr-2" />
                      {language === 'english' ? 'Confirm Booking' : 'முன்பதிவை உறுதிப்படுத்து'}
                    </button>
                  </MotionDiv>
                </form>
              </MotionDiv>
            </MotionDiv>
          </MotionDiv>
        )}
      </MotionDiv>
    </MotionDiv>
  );
};

export default Services;