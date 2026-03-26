const JobCard = ({ job, onApply, isFavorite, toggleFavorite }) => {
  return (
    <div className="job-card">
      <div className="job-header">
        <div className="company-info">
          <img 
            src={job.logo} 
            alt={job.company} 
            className="company-logo"
            onError={(e) => {
              e.target.src = "https://via.placeholder.com/50x50/64748b/ffffff?text=💼"
            }}
          />
          <div>
            <h3>{job.title}</h3>
            <p className="company-name">{job.company}</p>
          </div>
        </div>
        <button 
          className={`favorite-btn ${isFavorite(job.id) ? 'active' : ''}`}
          onClick={() => toggleFavorite(job.id)}
          title="Add to favorites"
        >
          {isFavorite(job.id) ? '❤️' : '🤍'}
        </button>
      </div>
      <div className="job-details">
        <p><strong>📍 {job.location}</strong></p>
        <p><strong>⚡ {job.type}</strong></p>
        <p><strong>💰 {job.salary}</strong></p>
      </div>
      <p className="job-description">{job.description}</p>
      <div className="job-actions">
        <button className="apply-btn" onClick={() => onApply(job)}>
          Apply Now
        </button>
      </div>
    </div>
  )
}

export default JobCard