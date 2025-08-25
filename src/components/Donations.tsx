import React, { useState, useEffect } from 'react';
import { Heart, CreditCard, Smartphone, Building, TrendingUp, Users, Target, Download, CheckCircle } from 'lucide-react';
import { db } from '../DB/firebase';
import { collection, addDoc, query, orderBy, limit, getDocs, serverTimestamp } from 'firebase/firestore';

import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
interface DonationsProps {
  language: string;
}
import MotionDiv from '../components/MotionDiv';

const Donations: React.FC<DonationsProps> = ({ language }) => {
  const [activeCategory, setActiveCategory] = useState('general');
  const [donationAmount, setDonationAmount] = useState('');
  const [totalamount, setTotalAmount] = useState(0);
  const [active, setactive] = useState(8);
  const [Transparency, setTransparency] = useState(95);
  const [totalDonor, setTotalDonors] = useState(0);
 
  const [customAmount, setCustomAmount] = useState('');

  const [showThankYou, setShowThankYou] = useState(false);
  const [recentDonations, setRecentDonations] = useState<any[]>([]);
  const [donorName, setDonorName] = useState('');
  const [campaigns, setCampaigns] = useState<any[]>([]); // <-- Added campaigns state
  const [selectedDonation, setSelectedDonation] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [showAllPopup, setShowAllPopup] = useState(false);

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isVerified, setIsVerified] = useState(false);

  const [fromDate, setFromDate] = useState(null);
  const [toDate, setToDate] = useState(null);
  const [searchTerm, setSearchTerm] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
 const [animatedTotal, setAnimatedTotal] = useState(0);
  const [animateddonor, setanimateddonor] = useState(0);
   const [animatedactive, setanimatedactive] = useState(0);
   const [animatedTransparency, setanimatedTransparency] = useState(0);

  useEffect(() => {
  const fetchDonations = async () => {
    const donationsRef = collection(db, "Mariamman");
    const q = query(donationsRef, orderBy("timestamp", "desc"));
    const snapshot = await getDocs(q);
    const data = snapshot.docs.map(doc => doc.data());

    // Filter only this year
    const currentYear = new Date().getFullYear();
    const thisYearData = data.filter(item => {
      if (!item.timestamp?.toDate) return false;
      return item.timestamp.toDate().getFullYear() === currentYear;
    });

    // Calculate total amount (handles string or number, ignores null)
    const totalAmount = thisYearData.reduce((sum, item) => {
      return sum + (parseInt(item.Amount, 10) || 0);
    }, 0);

    // Total donors (unique donor names if needed)
    const totalDonors = thisYearData.length;

    // Store results
    setRecentDonations(thisYearData);
    setTotalAmount(totalAmount);
    setTotalDonors(totalDonors);
  };

  fetchDonations();
}, [showThankYou]);

useEffect(() => {
  if (totalamount === 0) return;

  //const end = totalamount;
  const duration = 1500; // 1.5 sec
  const startTime = Date.now();

  const timer = setInterval(() => {
    const elapsed = Date.now() - startTime;
    const progress = Math.min(elapsed / duration, 1); // 0 → 1
    //const value = Math.floor(progress * end);
   
    setAnimatedTotal(Math.floor(progress * totalamount));
    setanimateddonor(Math.floor(progress * totalDonor));
    setanimatedactive(Math.floor(progress * active));
    setanimatedTransparency(Math.floor(progress * Transparency));

    if (progress === 1) {
      clearInterval(timer);
    }
  }, 16); // ~60fps

  return () => clearInterval(timer);
}, [totalamount]);


  const handleShowDetails = (donation) => {
    setSelectedDonation(donation);
    setShowPopup(true);
    setIsVerified(false);
    setUsername('');
    setPassword('');
  };

  const handleAllDetails = () => {
    setShowAllPopup(true);
    setIsVerified(false);
    setUsername('');
    setPassword('');
    setFilteredData([]);
    setFromDate(null);
    setToDate(null);
  };

  const handleVerify = () => {
    // Replace with real authentication check
    if (username === 'admin' && password === '1234') {
      setIsVerified(true);
    } else {
      alert('Invalid credentials');
    }
  };

  const handleGenerate = () => {
    if (!fromDate || !toDate) {
      alert('Please select both dates');
      return;
    }

    const filtered = recentDonations.filter((donation) => {
      if (!donation.timestamp) return false;

      // Convert Firestore timestamp to JS Date
      const donationDate = donation.timestamp.toDate();

      // Compare only the date part (ignore time)
      const donationDay = new Date(
        donationDate.getFullYear(),
        donationDate.getMonth(),
        donationDate.getDate()
      );

      const fromDay = new Date(
        fromDate.getFullYear(),
        fromDate.getMonth(),
        fromDate.getDate()
      );

      const toDay = new Date(
        toDate.getFullYear(),
        toDate.getMonth(),
        toDate.getDate()
      );

      return donationDay >= fromDay && donationDay <= toDay;
    });

    setFilteredData(filtered);
  };




  // Static campaign info (no raised/target/donors here)
  const staticCampaigns = {
    english: [
      { id: 'general', title: 'General Donation', description: 'Support temple activities, maintenance, and community welfare' },
      { id: 'annadhanam', title: 'Daily Annadhanam Program', description: 'Providing free meals to devotees and the needy' },
      { id: 'maintenance', title: 'Gopuram Renovation', description: 'Restoring the ancient temple tower' },
      { id: 'festivals', title: 'Annual Festival Celebration', description: 'Supporting grand festival arrangements' }
    ],
    tamil: [
      { id: 'general', title: 'பொது நன்கொடை', description: 'கோவில் நடவடிக்கைகள், பராமரிப்பு மற்றும் சமூக நலத்திற்குப் பங்களிக்கவும்' },
      { id: 'annadhanam', title: 'தினசரி அன்னதான திட்டம்', description: 'பக்தர்கள் மற்றும் ஏழைகளுக்கு இலவச உணவு வழங்குதல்' },
      { id: 'maintenance', title: 'கோபுர புனரமைப்பு', description: 'பழமையான கோவில் கோபுரத்தை மீட்டமைத்தல்' },
      { id: 'festivals', title: 'வருடாந்திர திருவிழா கொண்டாட்டம்', description: 'பெரிய திருவிழா ஏற்பாடுகளுக்கு ஆதரவு' }
    ]
  };

  // Fetch campaign raised/donors dynamically
  useEffect(() => {
    const fetchCampaignData = async () => {
      const campaignsWithData: any[] = [];
      const currentYear = new Date().getFullYear();

      for (const campaign of staticCampaigns[language]) {
        const donationsRef = collection(db, "Mariamman");
        const q = query(donationsRef, orderBy("timestamp", "desc"));
        const snapshot = await getDocs(q);

        let totalAmount = 0;
        let donorSet = new Set();

        snapshot.forEach(doc => {
          const data = doc.data();
          const ts = data.timestamp?.toDate ? data.timestamp.toDate() : null;

          if (
            ts &&
            ts.getFullYear() === currentYear &&
            (data.Category || "").toLowerCase() === campaign.id.toLowerCase()
          ) {
            totalAmount += Number(data.Amount || 0);
            donorSet.add(data.Name || "Anonymous");
          }
        });

        campaignsWithData.push({
          ...campaign,
          raised: totalAmount,
          donors: donorSet.size
        });
      }

      setCampaigns(campaignsWithData);
    };

    fetchCampaignData();
  }, [showThankYou]);

  const handleDonation = async (e: React.FormEvent) => {
    e.preventDefault();
    const amount = customAmount || donationAmount.replace('₹', '').replace(',', '');
    if (!donorName) {
      alert(language === 'english' ? "Please enter your name" : "தயவு செய்து உங்கள் பெயரை உள்ளிடவும்");
      return;
    }
    if (amount) {
      try {
        await addDoc(collection(db, "Mariamman"), {
          Category: activeCategory,
          Amount: String(amount),
          Name: donorName,
          timestamp: serverTimestamp()
        });

        setShowThankYou(true);
        setTimeout(() => setShowThankYou(false), 5000);

        const donationsRef = collection(db, "Mariamman");
        const q = query(donationsRef, orderBy("timestamp", "desc"), limit(5));
        const snapshot = await getDocs(q);
        setRecentDonations(snapshot.docs.map(doc => doc.data()));

        setDonationAmount('');
        setCustomAmount('');
        setDonorName('');
      } catch (error) {
        console.error("Error saving donation: ", error);
      }
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

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  return (
    <MotionDiv className="min-h-screen bg-gradient-to-br from-amber-50 to-red-50 py-20">
      <MotionDiv className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <MotionDiv>
          <h1 className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-red-800 to-yellow-600 bg-clip-text text-transparent mb-4">
            {content[language].title}
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {content[language].subtitle}
          </p>
        </MotionDiv>

        {/* Donation Stats */}
        <MotionDiv className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <MotionDiv className="bg-white rounded-2xl shadow-lg p-6 text-center"
          >
            <MotionDiv className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <TrendingUp className="h-6 w-6 text-green-600" />
            </MotionDiv>
            <MotionDiv className="text-2xl font-bold text-green-600 mb-1">₹{animatedTotal}</MotionDiv>
            <MotionDiv className="text-sm text-gray-600">{language === 'english' ? 'Total Raised' : 'மொத்த நன்கொடை'}</MotionDiv>
          </MotionDiv >

          <MotionDiv className="bg-white rounded-2xl shadow-lg p-6 text-center">
            <MotionDiv className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="h-6 w-6 text-blue-600" />
            </MotionDiv>
            <MotionDiv className="text-2xl font-bold text-blue-600 mb-1">{animateddonor}</MotionDiv>
            <MotionDiv className="text-sm text-gray-600">{language === 'english' ? 'Donors' : 'நன்கொடையாளர்கள்'}</MotionDiv>
          </MotionDiv >


          <MotionDiv className="bg-white rounded-2xl shadow-lg p-6 text-center"
          >
            <MotionDiv className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Target className="h-6 w-6 text-orange-600" />
            </MotionDiv>
            <MotionDiv className="text-2xl font-bold text-orange-600 mb-1">{animatedactive}</MotionDiv>
            <MotionDiv className="text-sm text-gray-600">{language === 'english' ? 'Active Campaigns' : 'செயலில் உள்ள பிரச்சாரங்கள்'}</MotionDiv>
          </MotionDiv >


          <MotionDiv className="bg-white rounded-2xl shadow-lg p-6 text-center"
          >
            <MotionDiv className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Heart className="h-6 w-6 text-purple-600" />
            </MotionDiv>
            <MotionDiv className="text-2xl font-bold text-purple-600 mb-1">{animatedTransparency}%</MotionDiv>
            <MotionDiv className="text-sm text-gray-600">{language === 'english' ? 'Transparency' : 'வெளிப்படைத்தன்மை'}</MotionDiv>
          </MotionDiv >

        </MotionDiv>
        {/* ... unchanged ... */}

        <MotionDiv className="grid lg:grid-cols-3 gap-8">
          {/* Donation Form */}
          {/* ... unchanged form code ... */}
          <MotionDiv className="lg:col-span-2">
            <MotionDiv className="bg-white rounded-2xl shadow-xl p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-8">
                {language === 'english' ? 'Make a Donation' : 'நன்கொடை வழங்கவும்'}
              </h2>
              <MotionDiv className="mb-8">
                <h3 className="text-lg font-semibold text-gray-700 mb-4">
                  {language === 'english' ? 'Your Name' : 'உங்கள் பெயர்'}
                </h3>
                <input
                  type="text"
                  placeholder={language === 'english' ? 'Enter your name' : 'உங்கள் பெயரை உள்ளிடவும்'}
                  value={donorName}
                  onChange={(e) => setDonorName(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                />
              </MotionDiv>
              {/* Category Selection */}
              <MotionDiv className="mb-8">
                <h3 className="text-lg font-semibold text-gray-700 mb-4">
                  {language === 'english' ? 'Select Category' : 'வகையைத் தேர்ந்தெடுக்கவும்'}
                </h3>
                <MotionDiv className="grid grid-cols-2 lg:grid-cols-4 gap-4">
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
                </MotionDiv>
              </MotionDiv>

              {/* Amount Selection */}
              <MotionDiv className="mb-8">
                <h3 className="text-lg font-semibold text-gray-700 mb-4">
                  {language === 'english' ? 'Choose Amount' : 'தொகையைத் தேர்ந்தெடுக்கவும்'}
                </h3>
                <MotionDiv className="grid grid-cols-3 lg:grid-cols-6 gap-3 mb-4">
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
                </MotionDiv>

                {(donationAmount === 'Custom' || donationAmount === 'விரும்பிய தொகை' || (!donationAmount && customAmount)) && (
                  <input
                    type="number"
                    placeholder={language === 'english' ? 'Enter custom amount' : 'விரும்பிய தொகையை உள்ளிடுங்கள்'}
                    value={customAmount}
                    onChange={(e) => setCustomAmount(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  />
                )}
              </MotionDiv>

              {/* Payment Methods */}
              <MotionDiv className="mb-8">
                <h3 className="text-lg font-semibold text-gray-700 mb-4">
                  {language === 'english' ? 'Payment Method' : 'பணம் செலுத்தும் முறை'}
                </h3>
                <MotionDiv className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                  {content[language].paymentMethods.map((method, index) => (
                    <MotionDiv key={index} className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg hover:border-red-300 cursor-pointer">
                      {index === 0 && <Smartphone className="h-5 w-5 text-blue-600" />}
                      {index === 1 && <CreditCard className="h-5 w-5 text-green-600" />}
                      {index === 2 && <Building className="h-5 w-5 text-orange-600" />}
                      {index === 3 && <Heart className="h-5 w-5 text-purple-600" />}
                      <span className="text-sm font-medium">{method}</span>
                    </MotionDiv>
                  ))}
                </MotionDiv>
              </MotionDiv>

              <form onSubmit={handleDonation}>
                <button
                  type="submit"
                  disabled={!donationAmount && !customAmount}
                  className="w-full bg-gradient-to-r from-red-600 to-yellow-500 hover:from-red-500 hover:to-yellow-400 disabled:from-gray-400 disabled:to-gray-500 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 transform hover:scale-105 disabled:hover:scale-100 shadow-lg"
                >
                  {language === 'english' ? 'Donate Now' : 'இப்போதே நன்கொடை'}
                </button>
              </form>

              <MotionDiv className="mt-6 text-center text-sm text-gray-500">
                <p>
                  {language === 'english'
                    ? '🔒 Your donation is secure and encrypted. You will receive a tax-deductible receipt.'
                    : '🔒 உங்கள் நன்கொடை பாதுகாப்பானது மற்றும் குறியாக்கம் செய்யப்பட்டது. வரி விலக்கு ரசீதை நீங்கள் பெறுவீர்கள்.'
                  }
                </p>
              </MotionDiv>
            </MotionDiv>
          </MotionDiv>
          {/* Campaign Progress */}
          <MotionDiv className="space-y-6">
            <MotionDiv className="bg-white rounded-2xl shadow-xl p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-6">
                {language === 'english' ? 'Active Campaigns' : 'செயலில் உள்ள பிரச்சாரங்கள்'}
              </h3>

              {campaigns.map((campaign) => {
                const percentage = campaign.raised > 0 ? 100 : 0; // no target now
                return (
                  <MotionDiv key={campaign.id} className="mb-6 p-4 border border-gray-100 rounded-xl">
                    <h4 className="font-bold text-gray-800 mb-2">{campaign.title}</h4>
                    <p className="text-sm text-gray-600 mb-4">{campaign.description}</p>

                    <MotionDiv className="mb-3">
                      <MotionDiv className="flex justify-between text-sm mb-1">
                        <span>{formatCurrency(campaign.raised)}</span>
                        <span className="text-gray-500">{campaign.donors} {language === 'english' ? 'donors' : 'நன்கொடையாளர்கள்'}</span>
                      </MotionDiv>
                      <MotionDiv className="w-full bg-gray-200 rounded-full h-2">
                        <MotionDiv
                          className="bg-gradient-to-r from-red-500 to-yellow-400 h-2 rounded-full"
                          style={{ width: `${percentage}%` }}
                        />
                      </MotionDiv>
                    </MotionDiv>
                  </MotionDiv>
                );
              })}
            </MotionDiv>

            {/* Recent Donations & Tax Benefits */}
            <MotionDiv className="bg-white rounded-2xl shadow-xl p-6 mt-6" >
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold text-gray-800">
                  {language === 'english' ? 'Recent Donations' : 'சமீபத்திய நன்கொடைகள்'}
                </h3>
                <button
                  className="px-1 sm:px-2 py-1 rounded-lg font-medium transition-all duration-200 bg-gradient-to-r from-red-600 to-yellow-500 text-white shadow-lg"
                  onClick={handleAllDetails}
                >
                  {language === 'english' ? 'All Details' : 'அனைத்து விவரங்கள்'}
                </button>
              </div>

              <MotionDiv className="space-y-3" style={{ height: '183px', overflowY: 'scroll' }}>
                {recentDonations.length > 0 ? (
                  recentDonations.map((donation, index) => (
                    <MotionDiv
                      key={index}
                      className="flex justify-between border-b pb-2 text-sm"
                    >
                      <span className="font-medium">{donation.Name || donation.name || 'Anonymous'}</span>
                      <span className="italic text-gray-500">{donation.Category || donation.category}</span>
                      <button
                        className="text-blue-500 underline text-xs"
                        onClick={() => handleShowDetails(donation)}
                      >
                        {language === 'english' ? 'Show Details' : 'விவரங்களை காண'}
                      </button>
                    </MotionDiv>
                  ))
                ) : (
                  <p className="text-gray-500 text-sm">
                    {language === 'english' ? 'No donations yet.' : 'இன்னும் நன்கொடைகள் இல்லை.'}
                  </p>
                )}
              </MotionDiv>

              {/* All Details Popup */}
              {showAllPopup && (
                <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-40 z-50">
                  <div className="bg-white p-6 rounded-lg shadow-lg w-[500px]">
                    {!isVerified ? (
                      <>
                        <h2 className="text-lg font-semibold mb-4">
                          {language === 'english'
                            ? 'Verify to See All Donation Details'
                            : 'அனைத்து நன்கொடை விவரங்களை காண சரிபார்க்கவும்'}
                        </h2>
                        <input
                          type="text"
                          placeholder="Username"
                          className="border p-2 w-full mb-3 rounded"
                          value={username}
                          onChange={(e) => setUsername(e.target.value)}
                        />
                        <input
                          type="password"
                          placeholder="Password"
                          className="border p-2 w-full mb-3 rounded"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                        />
                        <div className="flex justify-end gap-2">
                          <button
                            className="bg-gray-300 px-3 py-1 rounded"
                            onClick={() => setShowAllPopup(false)}
                          >
                            {language === 'english' ? 'Cancel' : 'ரத்து செய்'}
                          </button>
                          <button
                            className="bg-blue-500 text-white px-3 py-1 rounded"
                            onClick={handleVerify}
                          >
                            {language === 'english' ? 'Verify' : 'சரிபார்'}
                          </button>
                        </div>
                      </>
                    ) : (
                      <>
                        <h2 className="text-lg font-semibold mb-4">
                          {language === 'english'
                            ? 'Select Date Range'
                            : 'தேதி வரம்பை தேர்வு செய்யவும்'}
                        </h2>
                        <div className="flex gap-2 mb-4">
                          <DatePicker
                            selected={fromDate}
                            onChange={(date) => setFromDate(date)}
                            dateFormat="dd/MM/yyyy"
                            placeholderText={language === 'english' ? 'From Date' : 'தொடக்க தேதி'}
                            className="border p-2 rounded w-full"
                          />
                          <DatePicker
                            selected={toDate}
                            onChange={(date) => setToDate(date)}
                            dateFormat="dd/MM/yyyy"
                            placeholderText={language === 'english' ? 'To Date' : 'முடிவு தேதி'}
                            className="border p-2 rounded w-full"
                          />
                        </div>
                        <div className="flex justify-end mb-4">
                          <button
                            className="bg-green-500 text-white px-3 py-1 rounded"
                            onClick={handleGenerate}
                          >
                            {language === 'english' ? 'Generate' : 'உருவாக்கவும்'}
                          </button>
                        </div>

                        {/* Search box */}
                        {filteredData.length > 0 && (
                          <input
                            type="text"
                            placeholder={language === 'english' ? 'Search...' : 'தேடுக...'}
                            className="border p-2 rounded w-full mb-2"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                          />
                        )}

                        {/* Table with scroll */}
                        {filteredData.length > 0 && (
                          <div className="max-h-64 overflow-y-auto border rounded">
                            <table className="w-full text-sm border-collapse">
                              <thead className="bg-gray-100 sticky top-0">
                                <tr>
                                  <th className="border p-2">{language === 'english' ? 'Name' : 'பெயர்'}</th>
                                  <th className="border p-2">{language === 'english' ? 'Amount' : 'தொகை'}</th>
                                  <th className="border p-2">{language === 'english' ? 'Category' : 'வகை'}</th>
                                </tr>
                              </thead>
                              <tbody>
                                {filteredData
                                  .filter((don) => {
                                    const name = String(don.Name || don.name || 'Anonymous').toLowerCase();
                                    const amount = String(don.Amount || don.amount || '');
                                    const category = String(don.Category || don.category || '').toLowerCase();
                                    const search = String(searchTerm || '').toLowerCase();

                                    return (
                                      name.includes(search) ||
                                      amount.includes(search) ||
                                      category.includes(search)
                                    );
                                  })
                                  .map((don, idx) => (
                                    <tr key={idx}>
                                      <td className="border p-2">{don.Name || don.name || 'Anonymous'}</td>
                                      <td className="border p-2">
                                        {formatCurrency(Number(don.Amount || don.amount || 0))}
                                      </td>
                                      <td className="border p-2">{don.Category || don.category || ''}</td>
                                    </tr>
                                  ))}
                              </tbody>

                            </table>
                          </div>
                        )}

                        {filteredData.length === 0 && fromDate && toDate && (
                          <p className="text-gray-500 text-sm">
                            {language === 'english' ? 'No records found.' : 'பதிவுகள் இல்லை.'}
                          </p>
                        )}

                        <div className="flex justify-end mt-4">
                          <button
                            className="bg-blue-500 text-white px-3 py-1 rounded"
                            onClick={() => setShowAllPopup(false)}
                          >
                            {language === 'english' ? 'Close' : 'மூடு'}
                          </button>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              )}

            </MotionDiv>

            {/* ... unchanged ... */}
          </MotionDiv>
        </MotionDiv>
        {showPopup && (
          <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-40 z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-80">
              <h2 className="text-lg font-semibold mb-4">
                {language === 'english' ? 'Verify to See Amount' : 'தொகையை காண சரிபார்க்கவும்'}
              </h2>

              {!isVerified ? (
                <>
                  <input
                    type="text"
                    placeholder="Username"
                    className="border p-2 w-full mb-3 rounded"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                  <input
                    type="password"
                    placeholder="Password"
                    className="border p-2 w-full mb-3 rounded"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <div className="flex justify-end gap-2">
                    <button
                      className="bg-gray-300 px-3 py-1 rounded"
                      onClick={() => setShowPopup(false)}
                    >
                      {language === 'english' ? 'Cancel' : 'ரத்து செய்'}
                    </button>
                    <button
                      className="bg-blue-500 text-white px-3 py-1 rounded"
                      onClick={handleVerify}
                    >
                      {language === 'english' ? 'Verify' : 'சரிபார்'}
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <p className="mb-4">
                    {language === 'english'
                      ? `Donation Amount: ${formatCurrency(Number(selectedDonation.Amount || selectedDonation.amount || 0))}`
                      : `நன்கொடை தொகை: ${formatCurrency(Number(selectedDonation.Amount || selectedDonation.amount || 0))}`}
                  </p>
                  <div className="flex justify-end">
                    <button
                      className="bg-blue-500 text-white px-3 py-1 rounded"
                      onClick={() => setShowPopup(false)}
                    >
                      {language === 'english' ? 'Close' : 'மூடு'}
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        )}
        {/* Thank You Modal */}
        {showThankYou && (
          <MotionDiv className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <MotionDiv className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 text-center">
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
            </MotionDiv>
          </MotionDiv>
        )}
      </MotionDiv>
    </MotionDiv>
  );
};

export default Donations;
