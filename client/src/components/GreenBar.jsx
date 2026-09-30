import React, { useContext, useRef } from 'react';
import { motion } from 'framer-motion';
import { Search, MapPin } from 'lucide-react';
import { useDispatch,useSelector } from 'react-redux';
import { AppContext } from '../context/appContext';

function GreenBar() {

  const { setSearchFilter, setIsSearched } = useContext(AppContext)
const titleRef=useRef(null)
const locationRef=useRef(null)

const onSearch = () => {
  setSearchFilter({
    title: titleRef.current.value,
    location: locationRef.current.value
  })
  setIsSearched(true)

}
  


  return (
    <div className="bg-white py-10 px-6 text-center mt-8">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-4xl font-extrabold text-[#7ED321] drop-shadow mb-4"
      >
        Shaqooyin Dadweyne oo Furan!
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 1 }}
        className="text-lg text-black max-w-2xl mx-auto mb-6"
      >
        Barxadda shaqooyinka guud ee Soomaaliya – Hel fursado shaqo oo dawladeed, ciidanka, iyo kuwa guud oo loo furay dhammaan dadka Soomaaliyeed. U gudub mustaqbal ifaya maanta!
      </motion.p>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.6, duration: 0.8 }}
        className="flex flex-col md:flex-row justify-center items-center gap-4 max-w-3xl mx-auto mb-6"
      >
        <div className="flex items-center w-full md:w-1/2 bg-white border border-gray-300 rounded-xl shadow-sm px-4 py-3">
          <Search className="text-[#7ED321] mr-2" />
          <input
            type="text"
            placeholder="Raadi shaqooyin (tusaale: askari, macalin...)"
            className="w-full outline-none text-black placeholder-gray-500"
            ref={titleRef}
          />
        </div>

        <div className="flex items-center w-full md:w-1/3 bg-white border border-gray-300 rounded-xl shadow-sm px-4 py-3">
          <MapPin className="text-[#7ED321] mr-2" />
          <input
            type="text"
            placeholder="Goobta (tusaale: Muqdisho, Galkacyo...)"
            className="w-full outline-none text-black placeholder-gray-500"
            ref={locationRef}
          />
        </div>

        <button className="bg-[#7ED321] hover:bg-green-600 text-white px-6 py-3 rounded-xl shadow-md" onClick={onSearch}>
          Raadi
        </button>
      </motion.div>
    </div>
  );
}

export default GreenBar;
