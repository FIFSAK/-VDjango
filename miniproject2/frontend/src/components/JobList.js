import React, {useState, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import {getJobList, logoutUser} from '../api';
import './JobList.css'; // Импорт CSS

const JobList = () => {
    const [jobs, setJobs] = useState([]);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchJobs = async () => {
            try {
                const data = await getJobList();
                setJobs(data.jobs);
            } catch (err) {
                setError('Failed to load jobs');
            }
        };
        fetchJobs();
    }, []);

    const handleManageJobs = () => navigate('/jobs/manage');
    const handleLogout = () => {
        logoutUser();
        navigate('/');
    };
    const handleMyResumes = () => navigate('/my-resume');
    const handlePasswordReset = () => navigate('/password-reset');

    return (
        <div className="joblist-container">
            <h2 className="joblist-heading">Job Listings</h2>
            <div className="joblist-buttons">
                <button onClick={handleManageJobs}>My Jobs</button>
                <button onClick={handleMyResumes}>My Resumes</button>
                <button onClick={handleLogout}>Logout</button>
                <button onClick={handlePasswordReset}>Password Reset</button>
            </div>
            {error && <p className="message error">{error}</p>}
            {jobs.length === 0 && !error && <p className="message">No jobs available</p>}
            {jobs.map((job) => (
                <div key={job.id} className="job-card">
                    <h3>{job.title}</h3>
                    <p><strong>Company:</strong> {job.company}</p>
                    <p><strong>Location:</strong> {job.location || 'Not specified'}</p>
                    <p><strong>Description:</strong> {job.description}</p>
                    <p><strong>Posted by:</strong> {job.posted_by}</p>
                    <p><strong>Created:</strong> {new Date(job.created_at).toLocaleDateString()}</p>
                </div>
            ))}
        </div>
    );
};

export default JobList;
