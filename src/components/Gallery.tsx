import React, { useState } from 'react';
import { X, ChevronLeft, ChevronRight, Calendar, Camera, Film, Download } from 'lucide-react';
import kaliimagesiva from "../gallery/kaliimagesiva.jpg";
import kaliimagesiva1 from "../gallery/kaliimagesiva1.jpg";

interface GalleryProps {
  language: string;
}

const Gallery: React.FC<GalleryProps> = ({ language }) => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [lightboxImage, setLightboxImage] = useState<any>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const content = {
    english: {
      title: 'Temple Gallery',
      subtitle: 'Witness the divine beauty and sacred moments of our temple',
      categories: [
        { id: 'all', name: 'All Photos', icon: Camera },
        { id: 'festivals', name: 'Festivals', icon: Calendar },
        { id: 'daily', name: 'Daily Pooja', icon: Film },
        { id: 'decorations', name: 'Decorations', icon: Download }
      ]
    },
    tamil: {
      title: 'கோவில் படக்காட்சி',
      subtitle: 'எங்கள் கோவிலின் தெய்வீக அழகையும் புனித தருணங்களையும் காணுங்கள்',
      categories: [
        { id: 'all', name: 'அனைத்து புகைப்படங்கள்', icon: Camera },
        { id: 'festivals', name: 'திருவிழாக்கள்', icon: Calendar },
        { id: 'daily', name: 'தினசரி பூஜை', icon: Film },
        { id: 'decorations', name: 'அலங்காரங்கள்', icon: Download }
      ]
    }
  };

  // Using Pexels images for demonstration
  const galleryImages = [
    {
      id: 1,
      src: kaliimagesiva,
      title: language === 'english' ? 'Morning Pooja Ceremony' : 'காலை பூஜை சடங்கு',
      category: 'daily',
      date: '2024-02-15',
      description: language === 'english' ? 'Sacred morning prayers at the temple' : 'கோவிலில் புனித காலை பிரார்த்தனைகள்'
    },
    {
      id: 2,
      src: kaliimagesiva1,
      title: language === 'english' ? 'Mariamman Festival Celebration' : 'மாரியம்மன் திருவிழா கொண்டாட்டம்',
      category: 'festivals',
      date: '2024-01-20',
      description: language === 'english' ? 'Grand celebration with devotees' : 'பக்தர்களுடன் பெரிய கொண்டாட்டம்'
    },
    {
      id: 3,
      src: 'https://images.pexels.com/photos/7689730/pexels-photo-7689730.jpeg?auto=compress&cs=tinysrgb&w=800&h=600',
      title: language === 'english' ? 'Temple Architecture' : 'கோவில் கட்டிடக்கலை',
      category: 'decorations',
      date: '2024-02-10',
      description: language === 'english' ? 'Beautiful traditional architecture' : 'அழகிய பாரம்பரிய கட்டிடக்கலை'
    },
    {
      id: 4,
      src: 'https://images.pexels.com/photos/6086484/pexels-photo-6086484.jpeg?auto=compress&cs=tinysrgb&w=800&h=600',
      title: language === 'english' ? 'Devotee Prayers' : 'பக்தர் பிரார்த்தனைகள்',
      category: 'daily',
      date: '2024-02-12',
      description: language === 'english' ? 'Devotees in prayer and meditation' : 'பிரார்த்தனை மற்றும் தியானத்தில் பக்தர்கள்'
    },
    {
      id: 5,
      src: 'https://images.pexels.com/photos/6020233/pexels-photo-6020233.jpeg?auto=compress&cs=tinysrgb&w=800&h=600',
      title: language === 'english' ? 'Flower Decorations' : 'பூ அலங்காரங்கள்',
      category: 'decorations',
      date: '2024-02-08',
      description: language === 'english' ? 'Intricate flower arrangements for the deity' : 'தெய்வத்திற்கான நுணுக்கமான பூ ஏற்பாடுகள்'
    },
    {
      id: 6,
      src: 'https://images.pexels.com/photos/4321799/pexels-photo-4321799.jpeg?auto=compress&cs=tinysrgb&w=800&h=600',
      title: language === 'english' ? 'Aadi Pooram Festival' : 'ஆடி பூரம் திருவிழா',
      category: 'festivals',
      date: '2024-01-15',
      description: language === 'english' ? 'Special festival celebration' : 'சிறப்பு திருவிழா கொண்டாட்டம்'
    },
    {
      id: 7,
      src: 'https://images.pexels.com/photos/6086488/pexels-photo-6086488.jpeg?auto=compress&cs=tinysrgb&w=800&h=600',
      title: language === 'english' ? 'Evening Aarti' : 'மாலை ஆரத்தி',
      category: 'daily',
      date: '2024-02-05',
      description: language === 'english' ? 'Beautiful evening prayer ceremony' : 'அழகிய மாலை பிரார்த்தனை சடங்கு'
    },
    {
      id: 8,
      src: 'https://images.pexels.com/photos/7045815/pexels-photo-7045815.jpeg?auto=compress&cs=tinysrgb&w=800&h=600',
      title: language === 'english' ? 'Temple Gopuram' : 'கோவில் கோபுரம்',
      category: 'decorations',
      date: '2024-02-01',
      description: language === 'english' ? 'Magnificent temple tower' : 'அற்புதமான கோவில் கோபுரம்'
    },
    {
      id: 9,
      src: 'https://images.pexels.com/photos/13976349/pexels-photo-13976349.jpeg?auto=compress&cs=tinysrgb&w=800&h=600',
      title: language === 'english' ? 'Cultural Performance' : 'கலாச்சார நிகழ்ச்சி',
      category: 'festivals',
      date: '2024-01-25',
      description: language === 'english' ? 'Traditional dance during festival' : 'திருவிழாவின் போது பாரம்பரிய நடனம்'
    }
  ];

  const filteredImages = galleryImages.filter(image =>
    selectedCategory === 'all' || image.category === selectedCategory
  );

  const openLightbox = (image: any, index: number) => {
    setLightboxImage(image);
    setCurrentImageIndex(index);
  };

  const closeLightbox = () => {
    setLightboxImage(null);
  };

  const nextImage = () => {
    const nextIndex = (currentImageIndex + 1) % filteredImages.length;
    setCurrentImageIndex(nextIndex);
    setLightboxImage(filteredImages[nextIndex]);
  };

  const prevImage = () => {
    const prevIndex = (currentImageIndex - 1 + filteredImages.length) % filteredImages.length;
    setCurrentImageIndex(prevIndex);
    setLightboxImage(filteredImages[prevIndex]);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(language === 'english' ? 'en-US' : 'ta-IN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
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

        {/* Category Filter */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <div className="flex flex-wrap justify-center gap-4">
            {content[language].categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`flex items-center space-x-2 px-6 py-3 rounded-xl font-medium transition-all transform hover:scale-105 ${
                  selectedCategory === category.id
                    ? 'bg-gradient-to-r from-red-600 to-yellow-500 text-white shadow-lg'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <category.icon className="h-5 w-5" />
                <span>{category.name}</span>
                <span className={`px-2 py-1 text-xs rounded-full ${
                  selectedCategory === category.id 
                    ? 'bg-white/20 text-white' 
                    : 'bg-gray-200 text-gray-600'
                }`}>
                  {category.id === 'all' 
                    ? galleryImages.length 
                    : galleryImages.filter(img => img.category === category.id).length
                  }
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredImages.map((image, index) => (
            <div
              key={image.id}
              className="group bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:scale-105 cursor-pointer"
              onClick={() => openLightbox(image, index)}
            >
              <div className="relative overflow-hidden">
                <img
                  src={image.src}
                  alt={image.title}
                  className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="text-white font-bold text-lg mb-2">{image.title}</h3>
                    <p className="text-white/80 text-sm">{formatDate(image.date)}</p>
                  </div>
                </div>
                
                {/* Category Badge */}
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium text-gray-700">
                  {content[language].categories.find(cat => cat.id === image.category)?.name}
                </div>
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-red-600 transition-colors">
                  {image.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {image.description}
                </p>
                <div className="flex justify-between items-center mt-4">
                  <span className="text-sm text-gray-500 flex items-center">
                    <Calendar className="h-4 w-4 mr-1" />
                    {formatDate(image.date)}
                  </span>
                  <button className="text-red-600 hover:text-red-700 transition-colors">
                    <Download className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Stats */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mt-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-red-600 mb-2">{galleryImages.length}</div>
              <div className="text-gray-600">{language === 'english' ? 'Total Photos' : 'மொத்த புகைப்படங்கள்'}</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-yellow-600 mb-2">
                {galleryImages.filter(img => img.category === 'festivals').length}
              </div>
              <div className="text-gray-600">{language === 'english' ? 'Festival Photos' : 'திருவிழா புகைப்படங்கள்'}</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-green-600 mb-2">
                {galleryImages.filter(img => img.category === 'daily').length}
              </div>
              <div className="text-gray-600">{language === 'english' ? 'Daily Rituals' : 'தினசரி சடங்குகள்'}</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-blue-600 mb-2">
                {galleryImages.filter(img => img.category === 'decorations').length}
              </div>
              <div className="text-gray-600">{language === 'english' ? 'Decorations' : 'அலங்காரங்கள்'}</div>
            </div>
          </div>
        </div>

        {/* Lightbox */}
        {lightboxImage && (
          <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
            <div className="relative max-w-5xl w-full">
              {/* Close Button */}
              <button
                onClick={closeLightbox}
                className="absolute top-4 right-4 z-10 bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white p-2 rounded-full transition-colors"
              >
                <X className="h-6 w-6" />
              </button>

              {/* Navigation Buttons */}
              <button
                onClick={prevImage}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white p-3 rounded-full transition-colors"
              >
                <ChevronLeft className="h-6 w-6" />
              </button>

              <button
                onClick={nextImage}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white p-3 rounded-full transition-colors"
              >
                <ChevronRight className="h-6 w-6" />
              </button>

              {/* Image */}
              <div className="bg-white rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src={lightboxImage.src}
                  alt={lightboxImage.title}
                  className="w-full h-auto max-h-[70vh] object-contain"
                />
                
                {/* Image Info */}
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-2xl font-bold text-gray-800 mb-2">
                        {lightboxImage.title}
                      </h3>
                      <p className="text-gray-600">{lightboxImage.description}</p>
                    </div>
                    <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">
                      {content[language].categories.find(cat => cat.id === lightboxImage.category)?.name}
                    </span>
                  </div>
                  
                  <div className="flex justify-between items-center text-sm text-gray-500">
                    <span className="flex items-center">
                      <Calendar className="h-4 w-4 mr-2" />
                      {formatDate(lightboxImage.date)}
                    </span>
                    <span>
                      {currentImageIndex + 1} of {filteredImages.length}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Gallery;