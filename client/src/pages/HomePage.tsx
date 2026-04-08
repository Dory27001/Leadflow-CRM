import { Link } from 'react-router-dom';
import './HomePage.css';

function HomePage() {
  return (
    <div className="home-container">
      <div className="hero">
        <h1>LeadFlow CRM</h1>
        <p>
          
        </p>

        <div className="home-buttons">
          <Link to="/leads" className="home-button primary">
            View Leads
          </Link>

          <a href="#features" className="home-button secondary">
            Learn More
          </a>
        </div>
      </div>

      <div id="features" className="features">
        <div className="feature-card">
          <h3>Manage Leads</h3>
          <p>Add, edit, and delete leads in one place.</p>
        </div>

        <div className="feature-card">
          <h3>Track Status</h3>
          <p>Organize leads by status like New, Contacted, and Qualified.</p>
        </div>

        <div className="feature-card">
          <h3>Real-Time Updates</h3>
          <p>Keep the UI in sync with the backend using TanStack Query.</p>
        </div>
      </div>
    </div>
  );
}

export default HomePage;