import { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/customers.css';

const CustomerList = ({ searchTerm }) => {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    try {
      const response = await axios.get('/customers');
      setCustomers(response.data);
      setError('');
    } catch (err) {
      setError('Failed to fetch customers');
    } finally {
      setLoading(false);
    }
  };

  const filteredCustomers = customers.filter(customer =>
    customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.dept.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return <div className="loading">Loading customers...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="customer-list">
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Department</th>
            <th>Created</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredCustomers.map(customer => (
            <tr key={customer.id}>
              <td>{customer.name}</td>
              <td>{customer.email}</td>
              <td>{customer.dept}</td>
              <td>{new Date(customer.createdAt).toLocaleDateString()}</td>
              <td>
                <div className="action-buttons">
                  <button className="edit-btn">Edit</button>
                  <button className="delete-btn">Delete</button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {filteredCustomers.length === 0 && (
        <div className="no-results">No customers found</div>
      )}
    </div>
  );
};

export default CustomerList;
