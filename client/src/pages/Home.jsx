// Home page: search bar, trusted-by logos, job board, app promo and footer.
import React from 'react'
import Navbar from '../components/navbar'
import GreenBar from '../components/GreenBar'
import Companies from '../components/Companies'
import JobListing from '../components/JobListing'
import AppDownloadSection from '../components/AppDownloadSection'
import Footer from '../components/Footer'

function Home() {
  return (
    <div>
  <Navbar/>
  <GreenBar/>
  <Companies/>
  <JobListing/>
  <AppDownloadSection/>
  <Footer/>
    </div>
    
  )
}

export default Home