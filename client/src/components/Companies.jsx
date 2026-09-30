import React from 'react';
import hormuud from '../assets/hormuud.png';
import somtel from '../assets/Somtel_logo.JPG';
import primierbank from '../assets/premier.JPG';
import microsoft from '../assets/microsoft_logo.svg';
import amazon from '../assets/amazon_logo.png';
import university from '../assets/muniver.png'

const Companies = () => {
  const companies = [
    { name: 'Hormuud', logo: hormuud },
    { name: 'Somtel', logo: somtel },
    { name: 'Premier Bank', logo: primierbank },
    { name: 'Microsoft', logo: microsoft },
    { name: 'Amazon', logo: amazon },
    { name: 'Hormuud University', logo: university },
  ];

  return (
    <div className="bg-white shadow-sm rounded-xl py-6 px-4 mt-10 mb-10">
      <div className="max-w-6xl mx-auto">
        <p className="text-gray-500 text-sm font-semibold mb-4 text-center md:text-left">
          Trusted by
        </p>
        <div className="flex flex-wrap justify-center md:justify-between items-center gap-6">
          {companies.map((company, index) => (
            <img
              key={index}
              src={company.logo}
              alt={`${company.name} Logo`}
              className="h-6 md:h-8 object-contain transition duration-300 hover:grayscale"
              loading="lazy"
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Companies;
