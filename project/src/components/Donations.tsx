import React, { useState, useEffect } from 'react';
import { Heart, CreditCard, Smartphone, Building, TrendingUp, Users, Target, Download, CheckCircle } from 'lucide-react';

interface DonationsProps {
  language: string;
}

const Donations: React.FC<DonationsProps> = ({ language }) => {
  const [activeCategory, setActiveCategory] = useState('general');
  const [donationAmount, setDonationAmount] = useState('');
  const [customAmount, setCustomAmount] = useState('');
  const [showThankYou, setShowThankYou] = useState(false);
  const [smalldonotion, setsmalldonotion] = useState<Donation[]>([]);

  useEffect(() => {
    fetchPageLoadData();
  }, []);

  interface Donation {
    Name: string;
    Amount: string;
  }

  const fetchPageLoadData = async () => {
    try {
      const res = await fetch("http://localhost:16879/api/Donates/GetDonate", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!res.ok) {
        throw new Error(`HTTP error! Status: ${res.status}`);
      }

      const data = await res.json();

      if (data && Array.isArray(data.donate)) {
        setsmalldonotion(
          data.donate.map((record: { Name: string; Amount: string }) => ({
            Name: record.Name,
            Amount: record.Amount,
          }))
        );
      } else {
        console.error("Invalid data format:", data);
      }
    } catch (err) {
      console.error("Failed to fetch donation data:", err);
    }
  };



  const content = {
    english: {
      title: 'Support Our Sacred Mission',
      subtitle: 'Your generous donations help maintain the temple and serve the community',
      categories: [
        { id: 'general', name: 'General Donation', icon: Heart },
        { id: 'annadhanam', name: 'Annadhanam', icon: Users },
        { id: 'maintenance', name: 'Temple Maintenance', icon: Building },
        { id: 'festivals', name: 'Festival Fund', icon: Target }
      ],
      quickAmounts: ['₹100', '₹500', '₹1,000', '₹2,500', '₹5,000', 'Custom'],
      paymentMethods: ['UPI', 'Credit/Debit Card', 'Net Banking', 'Wallet']
    },
    tamil: {
      title: 'எங்கள் புனித பணிக்கு ஆதரவு',
      subtitle: 'உங்கள் தாராள நன்கொடைகள் கோவிலைப் பராமரிக்கவும் சமுதாயத்திற்கு சேவை செய்யவும் உதவுகிறது',
      categories: [
        { id: 'general', name: 'பொது நன்கொடை', icon: Heart },
        { id: 'annadhanam', name: 'அன்னதானம்', icon: Users },
        { id: 'maintenance', name: 'கோவில் பராமரிப்பு', icon: Building },
        { id: 'festivals', name: 'திருவிழா நிதி', icon: Target }
      ],
      quickAmounts: ['₹100', '₹500', '₹1,000', '₹2,500', '₹5,000', 'விரும்பிய தொகை'],
      paymentMethods: ['UPI', 'கிரெடிட்/டெபிட் கார்டு', 'நெட் பேங்கிங்', 'வாலட்']
    }
  };

  const campaigns = {
    english: [
      {
        id: 'annadhanam',
        title: 'Daily Annadhanam Program',
        description: 'Providing free meals to devotees and the needy',
        raised: 850000,
        target: 1200000,
        donors: 2340
      },
      {
        id: 'gopuram',
        title: 'Gopuram Renovation',
        description: 'Restoring the ancient temple tower',
        raised: 1500000,
        target: 2000000,
        donors: 890
      },
      {
        id: 'festival',
        title: 'Annual Festival Celebration',
        description: 'Supporting grand festival arrangements',
        raised: 450000,
        target: 600000,
        donors: 1250
      }
    ],
    tamil: [
      {
        id: 'annadhanam',
        title: 'தினசரி அன்னதான திட்டம்',
        description: 'பக்தர்கள் மற்றும் ஏழைகளுக்கு இலவச உணவு வழங்குதல்',
        raised: 850000,
        target: 1200000,
        donors: 2340
      },
      {
        id: 'gopuram',
        title: 'கோபுர புனரமைப்பு',
        description: 'பழமையான கோவில் கோபுரத்தை மீட்டமைத்தல்',
        raised: 1500000,
        target: 2000000,
        donors: 890
      },
      {
        id: 'festival',
        title: 'வருடாந்திர திருவிழா கொண்டாட்டம்',
        description: 'பெரிய திருவிழா ஏற்பாடுகளுக்கு ஆதரவு',
        raised: 450000,
        target: 600000,
        donors: 1250
      }
    ]
  };

  const handleDonation = (e: React.FormEvent) => {
    e.preventDefault();
    const amount = customAmount || donationAmount.replace('₹', '').replace(',', '');
    if (amount) {
      // Here you would integrate with payment gateway
      setShowThankYou(true);
      setTimeout(() => setShowThankYou(false), 5000);
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(amount);
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

        {/* Donation Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <div className="bg-white rounded-2xl shadow-lg p-6 text-center">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <TrendingUp className="h-6 w-6 text-green-600" />
            </div>
            <div className="text-2xl font-bold text-green-600 mb-1">₹25L+</div>
            <div className="text-sm text-gray-600">{language === 'english' ? 'Total Raised' : 'மொத்த நன்கொடை'}</div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6 text-center">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="h-6 w-6 text-blue-600" />
            </div>
            <div className="text-2xl font-bold text-blue-600 mb-1">4,500+</div>
            <div className="text-sm text-gray-600">{language === 'english' ? 'Donors' : 'நன்கொடையாளர்கள்'}</div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6 text-center">
            <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Target className="h-6 w-6 text-orange-600" />
            </div>
            <div className="text-2xl font-bold text-orange-600 mb-1">8</div>
            <div className="text-sm text-gray-600">{language === 'english' ? 'Active Campaigns' : 'செயலில் உள்ள பிரச்சாரங்கள்'}</div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6 text-center">
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Heart className="h-6 w-6 text-purple-600" />
            </div>
            <div className="text-2xl font-bold text-purple-600 mb-1">95%</div>
            <div className="text-sm text-gray-600">{language === 'english' ? 'Transparency' : 'வெளிப்படைத்தன்மை'}</div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Donation Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-8">
                {language === 'english' ? 'Make a Donation' : 'நன்கொடை வழங்கவும்'}
              </h2>

              {/* Category Selection */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-gray-700 mb-4">
                  {language === 'english' ? 'Select Category' : 'வகையைத் தேர்ந்தெடுக்கவும்'}
                </h3>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                  {content[language].categories.map((category) => (
                    <button
                      key={category.id}
                      onClick={() => setActiveCategory(category.id)}
                      className={`p-4 rounded-xl text-center transition-all ${activeCategory === category.id
                        ? 'bg-gradient-to-br from-red-600 to-yellow-500 text-white'
                        : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
                        }`}
                    >
                      <category.icon className="h-6 w-6 mx-auto mb-2" />
                      <span className="text-sm font-medium">{category.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Amount Selection */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-gray-700 mb-4">
                  {language === 'english' ? 'Choose Amount' : 'தொகையைத் தேர்ந்தெடுக்கவும்'}
                </h3>
                <div className="grid grid-cols-3 lg:grid-cols-6 gap-3 mb-4">
                  {content[language].quickAmounts.map((amount, index) => (
                    <button
                      key={index}
                      onClick={() => {
                        if (amount === 'Custom' || amount === 'விரும்பிய தொகை') {
                          setDonationAmount('');
                        } else {
                          setDonationAmount(amount);
                          setCustomAmount('');
                        }
                      }}
                      className={`p-3 rounded-lg border-2 transition-all ${donationAmount === amount
                        ? 'border-red-500 bg-red-50 text-red-700'
                        : 'border-gray-200 hover:border-red-300'
                        }`}
                    >
                      {amount}
                    </button>
                  ))}
                </div>

                {(donationAmount === 'Custom' || donationAmount === 'விரும்பிய தொகை' || (!donationAmount && customAmount)) && (
                  <input
                    type="number"
                    placeholder={language === 'english' ? 'Enter custom amount' : 'விரும்பிய தொகையை உள்ளிடுங்கள்'}
                    value={customAmount}
                    onChange={(e) => setCustomAmount(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  />
                )}
              </div>

              {/* Payment Methods */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-gray-700 mb-4">
                  {language === 'english' ? 'Payment Method' : 'பணம் செலுத்தும் முறை'}
                </h3>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                  {content[language].paymentMethods.map((method, index) => (
                    <div key={index} className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg hover:border-red-300 cursor-pointer">
                      {index === 0 && <Smartphone className="h-5 w-5 text-blue-600" />}
                      {index === 1 && <CreditCard className="h-5 w-5 text-green-600" />}
                      {index === 2 && <Building className="h-5 w-5 text-orange-600" />}
                      {index === 3 && <Heart className="h-5 w-5 text-purple-600" />}
                      <span className="text-sm font-medium">{method}</span>
                    </div>
                  ))}
                </div>
              </div>

              <form onSubmit={handleDonation}>
                <button
                  type="submit"
                  disabled={!donationAmount && !customAmount}
                  className="w-full bg-gradient-to-r from-red-600 to-yellow-500 hover:from-red-500 hover:to-yellow-400 disabled:from-gray-400 disabled:to-gray-500 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 transform hover:scale-105 disabled:hover:scale-100 shadow-lg"
                >
                  {language === 'english' ? 'Donate Now' : 'இப்போதே நன்கொடை'}
                </button>
              </form>

              <div className="mt-6 text-center text-sm text-gray-500">
                <p>
                  {language === 'english'
                    ? '🔒 Your donation is secure and encrypted. You will receive a tax-deductible receipt.'
                    : '🔒 உங்கள் நன்கொடை பாதுகாப்பானது மற்றும் குறியாக்கம் செய்யப்பட்டது. வரி விலக்கு ரசீதை நீங்கள் பெறுவீர்கள்.'
                  }
                </p>
              </div>
            </div>
          </div>

          {/* Campaign Progress */}
          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-xl p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-6">
                {language === 'english' ? 'Active Campaigns' : 'செயலில் உள்ள பிரச்சாரங்கள்'}
              </h3>

              {campaigns[language].map((campaign) => {
                const percentage = (campaign.raised / campaign.target) * 100;
                return (
                  <div key={campaign.id} className="mb-6 p-4 border border-gray-100 rounded-xl">
                    <h4 className="font-bold text-gray-800 mb-2">{campaign.title}</h4>
                    <p className="text-sm text-gray-600 mb-4">{campaign.description}</p>

                    <div className="mb-3">
                      <div className="flex justify-between text-sm mb-1">
                        <span>{formatCurrency(campaign.raised)}</span>
                        <span className="text-gray-500">{formatCurrency(campaign.target)}</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-gradient-to-r from-red-500 to-yellow-400 h-2 rounded-full"
                          style={{ width: `${Math.min(percentage, 100)}%` }}
                        />
                      </div>
                    </div>

                    <div className="flex justify-between text-sm">
                      <span className="text-green-600 font-medium">{percentage.toFixed(1)}% {language === 'english' ? 'funded' : 'நிதி'}</span>
                      <span className="text-gray-600">{campaign.donors} {language === 'english' ? 'donors' : 'நன்கொடையாளர்கள்'}</span>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="bg-white rounded-2xl shadow-xl p-6" style={{maxHeight:"250px",overflow:"auto"}}>
              <h3 className="text-xl font-bold text-gray-800 mb-4">
                {language === 'english' ? 'Recent Donations' : 'சமீபத்திய நன்கொடைகள்'}
              </h3>
              <div className="space-y-3">
                {
                  smalldonotion
                    .map((donation, index) => (
                      <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                        <div>
                          <div className="font-medium text-gray-800">{donation.Name}</div>
                          {/* <div className="text-sm text-gray-500">{donation.time}</div> */}
                        </div>
                        <div className="text-green-600 font-bold">₹{donation.Amount}</div>
                      </div>
                    ))}
              </div>
            </div>

            <div className="bg-gradient-to-br from-red-100 to-yellow-100 rounded-2xl p-6 text-center">
              <Download className="h-8 w-8 text-red-600 mx-auto mb-3" />
              <h4 className="font-bold text-gray-800 mb-2">
                {language === 'english' ? 'Tax Benefits' : 'வரி சலுகைகள்'}
              </h4>
              <p className="text-sm text-gray-600">
                {language === 'english'
                  ? 'All donations are eligible for 80G tax deduction under Income Tax Act'
                  : 'அனைத்து நன்கொடைகளும் வருமான வரிச் சட்டத்தின் கீழ் 80G வரி விலக்குக்கு தகுதியானவை'
                }
              </p>
            </div>
          </div>
        </div>

        {/* Thank You Modal */}
        {showThankYou && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 text-center">
              <CheckCircle className="h-16 w-16 text-green-600 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-gray-800 mb-4">
                {language === 'english' ? 'Thank You!' : 'நன்றி!'}
              </h3>
              <p className="text-gray-600 mb-6">
                {language === 'english'
                  ? 'Your generous donation has been received. You will get a confirmation email shortly.'
                  : 'உங்கள் தாராள நன்கொடை பெறப்பட்டது. விரைவில் உறுதிப்படுத்தல் மின்னஞ்சலை நீங்கள் பெறுவீர்கள்.'
                }
              </p>
              <button
                onClick={() => setShowThankYou(false)}
                className="bg-gradient-to-r from-red-600 to-yellow-500 text-white px-6 py-3 rounded-lg hover:from-red-500 hover:to-yellow-400 transition-all"
              >
                {language === 'english' ? 'Close' : 'மூடு'}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Donations;