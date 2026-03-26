import JobCard from './JobCard'

const JobList = ({ jobs, onApply, favorites, toggleFavorite, isFavorite }) => {
  if (jobs.length === 0) {
    return <div className="loading">Loading jobs...</div>
  }

  return (
    <div className="jobs-grid">
      {jobs.map(job => (
        <JobCard
          key={job.id}
          job={job}
          onApply={onApply}
          isFavorite={isFavorite}
          toggleFavorite={toggleFavorite}
        />
      ))}
    </div>
  )
}

export default JobList