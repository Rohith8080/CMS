import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import '../styles/dashboard.css';

const Dashboard = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('list');
  const [searchTerm, setSearchTerm] = useState('');
  
  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1>Customer Dashboard</h1>
        <div className="dashboard-actions">
          <div className="search-bar">
            <input
              type="text"
              placeholder="Search customers..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button 
            className="add-button"
            onClick={() => setActiveTab('add')}
          >
            Add New Customer
          </button>
        </div>
      </div>
      
      <div className="dashboard-content">
        <div className="content-header">
          <div className="tabs">
            <button
              className={`tab ${activeTab === 'list' ? 'active' : ''}`}
              onClick={() => setActiveTab('list')}
            >
              Customer List
            </button>
            <button
              className={`tab ${activeTab === 'add' ? 'active' : ''}`}
              onClick={() => setActiveTab('add')}
            >
              Add Customer
            </button>
            {user?.role === 'ADMIN' && (
              <button
                className={`tab ${activeTab === 'analytics' ? 'active' : ''}`}
                onClick={() => setActiveTab('analytics')}
              >
                Analytics
              </button>
            )}
          </div>
        </div>

        <div className="tab-content">
          {activeTab === 'list' && <CustomerList searchTerm={searchTerm} />}
          {activeTab === 'add' && <AddCustomerForm onSuccess={() => setActiveTab('list')} />}
          {activeTab === 'analytics' && user?.role === 'ADMIN' && <Analytics />}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
