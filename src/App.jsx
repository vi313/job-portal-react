import React, { useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Features from './components/Features'
import JobList from './components/JobList'
import ApplyModal from './components/ApplyModal'
import Footer from './components/Footer'

function App() {
  const [jobs, setJobs] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [showApplyModal, setShowApplyModal] = useState(false)
  const [selectedJob, setSelectedJob] = useState(null)
  const [favorites, setFavorites] = useState([])

  
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        setLoading(true)
        
        const response = await fetch('https://dummyjson.com/products?limit=12')
        const data = await response.json()
        
        
        const jobData = data.products.map((product, index) => ({
          id: index + 1,
          title: `${product.title} Specialist`,
          company: product.brand || 'Top Company',
          logo: product.images[0] || `https://via.placeholder.com/50x50/2563eb/ffffff?text=${product.brand?.charAt(0)}`,
          location: ['Bangalore', 'Remote', 'Hyderabad', 'Mumbai'][index % 4],
          type: ['Full-time', 'Remote', 'Contract'][index % 3],
          salary: ['₹8-12 LPA', '₹12-18 LPA', '₹15-25 LPA'][index % 3],
          description: `Join ${product.brand} as ${product.title} Specialist. ${product.description.substring(0, 120)}...`,
          thumbnail: product.thumbnail
        }))
        
        setJobs(jobData)
      } catch (err) {
        setError('Failed to fetch jobs. Showing demo data.')
        console.error(err)
        
        setJobs([
          {
            id: 1, title: "Full Stack Developer", company: "TechCorp", 
            logo: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=50&h=50", 
            location: "Bangalore", type: "Full-time", salary: "₹12-18 LPA",
            description: "Build scalable MERN applications."
          }
        ])
      } finally {
        setLoading(false)
      }
    }

    fetchJobs()
  }, [])

  const handleApply = (job) => {
    setSelectedJob(job)
    setShowApplyModal(true)
  }

  const toggleFavorite = (jobId) => {
    setFavorites(prev => 
      prev.includes(jobId) 
        ? prev.filter(id => id !== jobId)
        : [...prev, jobId]
    )
  }

  const isFavorite = (jobId) => favorites.includes(jobId)

  if (loading) {
    return (
      <div style={{ 
        minHeight: '100vh', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        fontSize: '1.2rem',
        color: '#64748b'
      }}>
        🔄 Loading jobs from API...
      </div>
    )
  }

  return (
    <>
      <Navbar />
      <Hero />
      <Features />
      
      <section id="jobs" className="jobs-section">
        <div className="container">
          <h2 style={{textAlign: 'center', marginBottom: '3rem', fontSize: '2.5rem'}}>
            {error ? 'Demo Jobs' : 'Latest Job Openings'} 
          </h2>
          <JobList 
            jobs={jobs}
            onApply={handleApply}
            favorites={favorites}
            toggleFavorite={toggleFavorite}
            isFavorite={isFavorite}
          />
        </div>
      </section>
      
      <Footer />
      
      {showApplyModal && (
        <ApplyModal 
          job={selectedJob}
          onClose={() => setShowApplyModal(false)}
        />
      )}
    </>
  )
}

export default App