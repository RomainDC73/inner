import { useState, useEffect } from 'react';

const Slideshow = ({ images, interval = 3000 }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const slideInterval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
        }, interval);

        return () => clearInterval(slideInterval); // Nettoie l'intervalle
    }, [images.length, interval]);

    return (
        <div className="relative h-full w-full overflow-hidden rounded-lg">
            {/* Conteneur des images */}
            <div
                className="flex transition-transform duration-700 ease-in-out "
                style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
                {images.map((image, index) => (
                    <img
                        key={index}
                        src={image}
                        alt={`Slide ${index + 1}`}
                        className="w-full h-full object-cover flex-shrink-0"
                    />
                ))}
            </div>
        </div>
    );
};

export default Slideshow;
