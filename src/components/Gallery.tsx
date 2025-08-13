import React, { useState } from 'react';
import { X, ChevronLeft, ChevronRight, Calendar, Camera, Film, Download } from 'lucide-react';
import MotionDiv from '../components/MotionDiv'; // Adjust the import path as necessary
import kaliimagesiva from "../gallery/kaliimagesiva.jpg";
import kaliimagesiva1 from "../gallery/kaliimagesiva1.jpg";
import vino from "../gallery/Vino.jpeg";
import Rajebdranvideo from '../gallery/Rajendran.mp4';
import VinoVickySiva2025 from '../gallery/2025-kali.mp4';



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
        { id: 'all', name: 'All', icon: Camera },
        { id: 'video', name: 'Videos', icon: Film },
      ]
    },
    tamil: {
      title: 'கோவில் படக்காட்சி',
      subtitle: 'எங்கள் கோவிலின் தெய்வீக அழகையும் புனித தருணங்களையும் காணுங்கள்',
      categories: [
        { id: 'all', name: 'அனைத்து புகைப்படங்கள்', icon: Camera },
        { id: 'daily', name: 'தினசரி பூஜை', icon: Film },
      ]
    }
  };

  // Updated galleryImages with type for image/video
  const galleryImages = [
    {
      id: 1,
      src: vino,
      type: 'image',
      title: language === 'english' ? 'Thillai Kali - 2025' : 'காலை பூஜை சடங்கு',
      category: 'festivals',
      date: '2024-02-15',
      description: language === 'english' ? 'Sacred night prayers at the temple' : 'கோவிலில் புனித காலை பிரார்த்தனைகள்'
    },
    {
      id: 2,
      src: kaliimagesiva1,
      type: 'image',
      title: language === 'english' ? 'Amman' : 'மாரியம்மன் திருவிழா கொண்டாட்டம்',
      category: 'festivals',
      date: '2024-01-20',
      description: language === 'english' ? 'Grand celebration with devotees' : 'பக்தர்களுடன் பெரிய கொண்டாட்டம்'
    },
    {
      id: 3,
      src: Rajebdranvideo, // sample mp4 video URL
      type: 'video',
      title: language === 'english' ? 'Thillai Kali-2008' : 'கோவில் கட்டிடக்கலை வீடியோ',
      category: 'video',
      date: '2024-02-10',
      description: language === 'english' ? 'Beautiful traditional architecture' : 'அழகிய பாரம்பரிய கட்டிடக்கலை'
    },
    {
      id: 4,
      src: VinoVickySiva2025, // another mp4 video
      type: 'video',
      title: language === 'english' ? 'Kali -2025' : 'பக்தர் பிரார்த்தனைகள் வீடியோ',
      category: 'video',
      date: '2024-02-12',
      description: language === 'english' ? 'Devotees in prayer and meditation' : 'பிரார்த்தனை மற்றும் தியானத்தில் பக்தர்கள்'
    },
    {
      id: 5,
      src: kaliimagesiva,
      type: 'image',
      title: language === 'english' ? 'Amman' : 'பூ அலங்காரங்கள்',
      category: 'decorations',
      date: '2024-02-08',
      description: language === 'english' ? 'Intricate flower arrangements for the deity' : 'தெய்வத்திற்கான நுணுக்கமான பூ ஏற்பாடுகள்'
    },
   
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
    <MotionDiv className="min-h-screen bg-gradient-to-br from-amber-50 to-red-50 py-20">
      <MotionDiv className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <MotionDiv className="text-center mb-16">
          <h1 className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-red-800 to-yellow-600 bg-clip-text text-transparent mb-4">
            {content[language].title}
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {content[language].subtitle}
          </p>
        </MotionDiv>

        {/* Category Filter */}
        <MotionDiv className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <MotionDiv className="flex flex-wrap justify-center gap-4">
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
          </MotionDiv>
        </MotionDiv>

        {/* Gallery Grid */}
        <MotionDiv className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredImages.map((image, index) => (
            <MotionDiv
              key={image.id}
              className="group bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:scale-105 cursor-pointer"
              onClick={() => openLightbox(image, index)}
            >
              <MotionDiv className="relative overflow-hidden">
                {image.type === 'image' ? (
                  <img
                    src={image.src}
                    alt={image.title}
                    className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                ) : (
                  <video
                    src={image.src}
                    className="w-full h-64 object-cover"
                    muted
                    loop
                    playsInline
                    preload="metadata"
                  />
                )}
                <MotionDiv className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <MotionDiv className="absolute bottom-4 left-4 right-4">
                    <h3 className="text-white font-bold text-lg mb-2">{image.title}</h3>
                    <p className="text-white/80 text-sm">{formatDate(image.date)}</p>
                  </MotionDiv>
                </MotionDiv>
                
                {/* Category Badge */}
                <MotionDiv className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium text-gray-700">
                  {content[language].categories.find(cat => cat.id === image.category)?.name}
                </MotionDiv>
              </MotionDiv>
              
              <MotionDiv className="p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-red-600 transition-colors">
                  {image.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {image.description}
                </p>
                <MotionDiv className="flex justify-between items-center mt-4">
                  <span className="text-sm text-gray-500 flex items-center">
                    <Calendar className="h-4 w-4 mr-1" />
                    {formatDate(image.date)}
                  </span>
                  <button className="text-red-600 hover:text-red-700 transition-colors">
                    <Download className="h-4 w-4" />
                  </button>
                </MotionDiv>
              </MotionDiv>
            </MotionDiv>
          ))}
        </MotionDiv>

        {/* Stats */}
        <MotionDiv className="bg-white rounded-2xl shadow-lg p-8 mt-12">
          <MotionDiv className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <MotionDiv>
              <MotionDiv className="text-3xl font-bold text-red-600 mb-2">{galleryImages.length}</MotionDiv>
              <MotionDiv className="text-gray-600">{language === 'english' ? 'Total Photos' : 'மொத்த புகைப்படங்கள்'}</MotionDiv>
            </MotionDiv>
            <MotionDiv>
              <MotionDiv className="text-3xl font-bold text-yellow-600 mb-2">
                {galleryImages.filter(img => img.category === 'festivals').length}
              </MotionDiv>
              <MotionDiv className="text-gray-600">{language === 'english' ? 'Festival Photos' : 'திருவிழா புகைப்படங்கள்'}</MotionDiv>
            </MotionDiv>
            <MotionDiv>
              <MotionDiv className="text-3xl font-bold text-green-600 mb-2">
                {galleryImages.filter(img => img.category === 'daily').length}
              </MotionDiv>
              <MotionDiv className="text-gray-600">{language === 'english' ? 'Daily Rituals' : 'தினசரி சடங்குகள்'}</MotionDiv>
            </MotionDiv>
            <MotionDiv>
              <MotionDiv className="text-3xl font-bold text-blue-600 mb-2">
                {galleryImages.filter(img => img.category === 'decorations').length}
              </MotionDiv>
              <MotionDiv className="text-gray-600">{language === 'english' ? 'Decorations' : 'அலங்காரங்கள்'}</MotionDiv>
            </MotionDiv>
          </MotionDiv>
        </MotionDiv>

        {/* Lightbox */}
        {lightboxImage && (
          <MotionDiv className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
            <MotionDiv className="relative max-w-5xl w-full">
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

              {/* Image or Video */}
              <MotionDiv className="bg-white rounded-2xl overflow-hidden shadow-2xl">
                {lightboxImage.type === 'image' ? (
                  <img
                    src={lightboxImage.src}
                    style={{backgroundColor: "darkslategray"}}
                    alt={lightboxImage.title}
                    className="w-full h-auto max-h-[70vh] object-contain"
                  />
                ) : (
                  <video
                    style={{backgroundColor: "darkslategray"}}
                    src={lightboxImage.src}
                    className="w-full h-auto max-h-[70vh]"
                    controls
                    autoPlay
                  />
                )}

                {/* Info */}
                <MotionDiv className="p-6">
                  <MotionDiv className="flex justify-between items-start mb-4">
                    <MotionDiv>
                      <h3 className="text-2xl font-bold text-gray-800 mb-2">
                        {lightboxImage.title}
                      </h3>
                      <p className="text-gray-600">{lightboxImage.description}</p>
                    </MotionDiv>
                    <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">
                      {content[language].categories.find(cat => cat.id === lightboxImage.category)?.name}
                    </span>
                  </MotionDiv>
                  
                  <MotionDiv className="flex justify-between items-center text-sm text-gray-500">
                    <span className="flex items-center">
                      <Calendar className="h-4 w-4 mr-2" />
                      {formatDate(lightboxImage.date)}
                    </span>
                    <span>
                      {currentImageIndex + 1} of {filteredImages.length}
                    </span>
                  </MotionDiv>
                </MotionDiv>
              </MotionDiv>
            </MotionDiv>
          </MotionDiv>
        )}
      </MotionDiv>
    </MotionDiv>
  );
};

export default Gallery;
