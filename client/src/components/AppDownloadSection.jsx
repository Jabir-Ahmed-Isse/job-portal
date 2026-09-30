import React from 'react';
import sgirl from '../assets/sgirl.png';

const AppDownloadSection = () => {
  return (
    <div className="bg-green-100 py-4 px-4 md:px-6 rounded-xl mt-6 border border-green-200 shadow-sm">
      <div className="flex flex-col md:flex-row items-center justify-between gap-2 md:gap-4">
        {/* Text Content */}
        <div className="text-center md:text-left max-w-sm md:max-w-md space-y-2">
          <span className="inline-block bg-green-200 text-green-800 text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wide">
            Shaqo Raadiye
          </span>

          <h2 className="text-lg md:text-xl font-bold text-green-800">
            Soo Degso App-ka!
          </h2>

          <p className="text-green-900 text-sm leading-snug">
            Ka raadi shaqooyin cusub adigoo isticmaalaya app-keena. Ku hel fursado shaqo si sahlan & degdeg ah—meel kasta aad joogto.
          </p>

          {/* Store Buttons */}
          <div className="flex justify-center md:justify-start gap-2 pt-1">
            <a
              href="https://play.google.com/store"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:scale-105 transition-transform"
            >
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg"
                alt="Download on Google Play"
                className="h-9"
              />
            </a>
            <a
              href="https://www.apple.com/app-store/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:scale-105 transition-transform"
            >
              <img
                src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg"
                alt="Download on the App Store"
                className="h-9"
              />
            </a>
          </div>
        </div>

        {/* Somali Girl Image (closer, smaller, cleaner) */}
        <div className="relative w-36 md:w-44 mt-2 md:mt-0">
          <div className="absolute inset-0 bg-green-200 rounded-full blur-xl opacity-30 -z-10"></div>
          <img
            src={sgirl}
            alt="Somali Girl Using App"
            className="w-full object-contain"
          />
        </div>
      </div>
    </div>
  );
};

export default AppDownloadSection;
