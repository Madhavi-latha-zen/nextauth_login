'use client';

import { useState, useEffect } from 'react';
// import AllProductsPage from './getAll/page';

export default function Home() {
  const images = ['/canva.jpg', '/ok1.jpeg', '/ok2.jpeg', '/all.jpeg']; // Array of image paths
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000); // Change image every 3 seconds

    return () => clearInterval(interval); // Clean up on component unmount
  }, [images.length]);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  return (
    <div>
      {/* <AllProductsPage /> */}
    </div>
  );
}
