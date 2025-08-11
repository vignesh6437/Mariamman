import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock, MessageCircle, Send, CheckCircle } from 'lucide-react';

interface ContactProps {
  language: string;
}

const Contact: React.FC<ContactProps> = ({ language }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [showSuccess, setShowSuccess] = useState(false);

  const content = {
    english: {
      title: 'Contact & Visit Information',
      subtitle: 'Get in touch with us or plan your visit to our sacred temple',
      form: {
        title: 'Send us a Message',
        name: 'Full Name',
        email: 'Email Address',
        phone: 'Phone Number',
        subject: 'Subject',
        message: 'Your Message',
        submit: 'Send Message',
        success: 'Thank you! Your message has been sent successfully.'
      },
      contactInfo: {
        title: 'Temple Information',
        address: 'Temple Address',
        addressValue: '123 Temple Street, Sacred District, Tamil Nadu 600001',
        phone: 'Temple Office',
        phoneValue: '+91 98765 43210',
        email: 'Email',
        emailValue: 'info@mariammantemple.org',
        whatsapp: 'WhatsApp',
        whatsappValue: '+91 98765 43210'
      },
      timings: {
        title: 'Darshan Timings',
        morning: 'Morning',
        morningTime: '5:30 AM - 12:00 PM',
        evening: 'Evening',
        eveningTime: '4:00 PM - 9:00 PM',
        special: 'Special Poojas',
        specialTime: '6:00 AM & 7:00 PM',
        note: 'Temple remains closed during afternoon hours (12:00 PM - 4:00 PM)'
      }
    },
    tamil: {
      title: 'தொடர்பு & வருகை தகவல்',
      subtitle: 'எங்களைத் தொடர்பு கொள்ளவும் அல்லது எங்கள் புனித கோவிலுக்கு உங்கள் வருகையைத் திட்டமிடவும்',
      form: {
        title: 'எங்களுக்கு ஒரு செய்தி அனுப்புங்கள்',
        name: 'முழு பெயர்',
        email: 'மின்னஞ்சல் முகவரி',
        phone: 'தொலைபேசி எண்',
        subject: 'விषயம்',
        message: 'உங்கள் செய்தி',
        submit: 'செய்தி அனுப்பவும்',
        success: 'நன்றி! உங்கள் செய்தி வெற்றிகரமாக அனுப்பப்பட்டது.'
      },
      contactInfo: {
        title: 'கோவில் தகவல்',
        address: 'கோவில் முகவரி',
        addressValue: '123 கோவில் தெரு, புனித மாவட்டம், தமிழ்நாடு 600001',
        phone: 'கோவில் அலுவலகம்',
        phoneValue: '+91 98765 43210',
        email: 'மின்னஞ்சல்',
        emailValue: 'info@mariammantemple.org',
        whatsapp: 'வாட்ஸ்ஆப்',
        whatsappValue: '+91 98765 43210'
      },
      timings: {
        title: 'தரிசன நேரம்',
        morning: 'காலை',
        morningTime: 'காலை 5:30 - மதியம் 12:00',
        evening: 'மாலை',
        eveningTime: 'மாலை 4:00 - இரவு 9:00',
        special: 'சிறப்பு பூஜைகள்',
        specialTime: 'காலை 6:00 & மாலை 7:00',
        note: 'மதிய நேரங்களில் கோவில் மூடப்பட்டிருக்கும் (மதியம் 12:00 - மாலை 4:00)'
      }
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would integrate with your email service
    setShowSuccess(true);
    setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
    setTimeout(() => setShowSuccess(false), 5000);
  };

  const faqData = {
    english: [
      {
        question: 'What are the temple visiting hours?',
        answer: 'The temple is open from 5:30 AM to 12:00 PM and 4:00 PM to 9:00 PM daily. Special poojas are conducted at 6:00 AM and 7:00 PM.'
      },
      {
        question: 'Can I book services online?',
        answer: 'Yes, you can book various services like Kavadi, Archana, and Special Poojas through our online services page.'
      },
      {
        question: 'Is photography allowed inside the temple?',
        answer: 'Photography is allowed in common areas but restricted in the sanctum sanctorum. Please respect the sacred space.'
      },
      {
        question: 'Are there parking facilities available?',
        answer: 'Yes, we have adequate parking facilities available for devotees. Additional parking is arranged during festivals.'
      }
    ],
    tamil: [
      {
        question: 'கோவில் வருகை நேரம் என்ன?',
        answer: 'கோவில் தினமும் காலை 5:30 முதல் மதியம் 12:00 வரையும், மாலை 4:00 முதல் இரவு 9:00 வரையும் திறந்திருக்கும். சிறப்பு பூஜைகள் காலை 6:00 மற்றும் மாலை 7:00 மணிக்கு நடத்தப்படுகின்றன.'
      },
      {
        question: 'ஆன்லைனில் சேவைகளை முன்பதிவு செய்ய முடியுமா?',
        answer: 'ஆம், எங்கள் ஆன்லைன் சேவைகள் பக்கத்தின் மூலம் காவடி, அர்ச்சனை மற்றும் சிறப்பு பூஜைகள் போன்ற பல்வேறு சேவைகளை நீங்கள் முன்பதிவு செய்யலாம்.'
      },
      {
        question: 'கோவிலுக்குள் புகைப்படம் எடுக்க அனுமதி உண்டா?',
        answer: 'பொதுவான பகுதிகளில் புகைப்படம் எடுக்க அனுமதி உண்டு ஆனால் கருவறையில் தடைசெய்யப்பட்டுள்ளது. புனித இடத்தை மதியுங்கள்.'
      },
      {
        question: 'பார்க்கிங் வசதிகள் உள்ளனவா?',
        answer: 'ஆம், பக்தர்களுக்கு போதுமான பார்க்கிங் வசதிகள் உள்ளன. திருவிழாக்களின் போது கூடுதல் பார்க்கிங் ஏற்பாடு செய்யப்படுகிறது.'
      }
    ]
  };

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

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          {/* Contact Form */}
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-8 flex items-center">
              <MessageCircle className="h-6 w-6 mr-3 text-red-600" />
              {content[language].form.title}
            </h2>

            {showSuccess && (
              <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center text-green-800">
                <CheckCircle className="h-5 w-5 mr-2" />
                {content[language].form.success}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {content[language].form.name}
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-colors"
                  placeholder={content[language].form.name}
                />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {content[language].form.email}
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-colors"
                    placeholder="your@email.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {content[language].form.phone}
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-colors"
                    placeholder="+91 98765 43210"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {content[language].form.subject}
                </label>
                <select
                  required
                  value={formData.subject}
                  onChange={(e) => setFormData({...formData, subject: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-colors"
                >
                  <option value="">{language === 'english' ? 'Select Subject' : 'விषயத்தைத் தேர்ந்தெடுக்கவும்'}</option>
                  <option value="booking">{language === 'english' ? 'Service Booking' : 'சேவை முன்பதிவு'}</option>
                  <option value="donation">{language === 'english' ? 'Donation Inquiry' : 'நன்கொடை விசாரணை'}</option>
                  <option value="event">{language === 'english' ? 'Event Information' : 'நிகழ்வு தகவல்'}</option>
                  <option value="general">{language === 'english' ? 'General Inquiry' : 'பொதுவான விசாரணை'}</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {content[language].form.message}
                </label>
                <textarea
                  required
                  rows={5}
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-colors resize-none"
                  placeholder={language === 'english' ? 'Please describe your inquiry...' : 'தயவுசெய்து உங்கள் விசாரணையை விவரிக்கவும்...'}
                />
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-red-600 to-yellow-500 hover:from-red-500 hover:to-yellow-400 text-white px-8 py-4 rounded-lg font-bold transition-all duration-300 transform hover:scale-105 flex items-center justify-center"
              >
                <Send className="h-5 w-5 mr-2" />
                {content[language].form.submit}
              </button>
            </form>
          </div>

          {/* Contact Information */}
          <div className="space-y-8">
            {/* Temple Info */}
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-8">
                {content[language].contactInfo.title}
              </h2>

              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <MapPin className="h-6 w-6 text-red-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-1">
                      {content[language].contactInfo.address}
                    </h3>
                    <p className="text-gray-600">
                      {content[language].contactInfo.addressValue}
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Phone className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-1">
                      {content[language].contactInfo.phone}
                    </h3>
                    <p className="text-gray-600">
                      {content[language].contactInfo.phoneValue}
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Mail className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-1">
                      {content[language].contactInfo.email}
                    </h3>
                    <p className="text-gray-600">
                      {content[language].contactInfo.emailValue}
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <MessageCircle className="h-6 w-6 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-1">
                      {content[language].contactInfo.whatsapp}
                    </h3>
                    <p className="text-gray-600">
                      {content[language].contactInfo.whatsappValue}
                    </p>
                    <button className="mt-2 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg text-sm transition-colors">
                      {language === 'english' ? 'Chat on WhatsApp' : 'வாட்ஸ்ஆப்பில் அரட்டை'}
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Temple Timings */}
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-8 flex items-center">
                <Clock className="h-6 w-6 mr-3 text-yellow-600" />
                {content[language].timings.title}
              </h2>

              <div className="space-y-4">
                <div className="flex justify-between items-center py-3 border-b border-gray-100">
                  <span className="font-semibold text-gray-800">
                    {content[language].timings.morning}
                  </span>
                  <span className="text-gray-600">
                    {content[language].timings.morningTime}
                  </span>
                </div>

                <div className="flex justify-between items-center py-3 border-b border-gray-100">
                  <span className="font-semibold text-gray-800">
                    {content[language].timings.evening}
                  </span>
                  <span className="text-gray-600">
                    {content[language].timings.eveningTime}
                  </span>
                </div>

                <div className="flex justify-between items-center py-3 border-b border-gray-100">
                  <span className="font-semibold text-gray-800">
                    {content[language].timings.special}
                  </span>
                  <span className="text-gray-600">
                    {content[language].timings.specialTime}
                  </span>
                </div>
              </div>

              <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                <p className="text-sm text-yellow-800">
                  <strong>{language === 'english' ? 'Note:' : 'குறிப்பு:'}</strong> {content[language].timings.note}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Google Maps Embed */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-16">
          <h2 className="text-2xl font-bold text-gray-800 mb-8">
            {language === 'english' ? 'Temple Location' : 'கோவில் இருப்பிடம்'}
          </h2>
          <div className="aspect-video bg-gray-200 rounded-xl overflow-hidden">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1790.0516832740198!2d79.69666841307934!3d11.398620240212109!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a54c3f5dbb1fb67%3A0x2d5fb16b8eea5999!2sSri%20selvamariamman%20kovil!5e1!3m2!1sen!2sin!4v1754737336000!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="rounded-xl"
            />
          </div>
          <div className="mt-4 text-center">
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-colors">
              {language === 'english' ? 'Get Directions' : 'திசைகளைப் பெறவும்'}
            </button>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-8">
            {language === 'english' ? 'Frequently Asked Questions' : 'அடிக்கடி கேட்கப்படும் கேள்விகள்'}
          </h2>

          <div className="space-y-6">
            {faqData[language].map((faq, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-3">
                  {faq.question}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;