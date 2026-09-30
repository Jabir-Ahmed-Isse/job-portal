import React from 'react'
import Navbar from '../components/navbar'
import GreenBar from '../components/GreenBar'
import Companies from '../components/Companies'
import JobListing from '../components/jobListing'
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