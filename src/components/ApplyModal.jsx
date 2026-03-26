import React, { useState } from 'react'

const ApplyModal = ({ job, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    resume: '',
    coverLetter: ''
  })

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    alert(`Application submitted for ${job.title} at ${job.company}! 🎉\nName: ${formData.name}`)
    onClose()
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={e => e.stopPropagation()}>
        <h2>Apply for {job.title}</h2>
        <p><strong>{job.company}</strong> - {job.location}</p>
        
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            type="tel"
            name="phone"
            placeholder="Phone"
            value={formData.phone}
            onChange={handleChange}
          />
          <input
            type="url"
            name="resume"
            placeholder="Resume URL (LinkedIn/Google Drive)"
            value={formData.resume}
            onChange={handleChange}
          />
          <textarea
            name="coverLetter"
            rows="4"
            placeholder="Cover Letter (optional)"
            value={formData.coverLetter}
            onChange={handleChange}
          />
          <div style={{display: 'flex', gap: '1rem'}}>
            <button type="submit" className="apply-btn">
              Submit Application
            </button>
            <button 
              type="button" 
              onClick={onClose}
              style={{
                flex: 1,
                background: '#ef4444',
                color: 'white'
              }}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default ApplyModal