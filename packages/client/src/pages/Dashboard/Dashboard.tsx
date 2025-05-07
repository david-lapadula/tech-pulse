import React, { useState, useMemo } from 'react';
// import { useAuth } from "../../auth/AuthContext";
import './Dashboard.css';

type Item = {
  name: string;
  category: string;
};

const Dashboard: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('JohnDoe');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCategory, setFilterCategory] = useState('All');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  const [items] = useState<Item[]>([
    { name: 'Item 1', category: 'Work' },
    { name: 'Item 2', category: 'Personal' },
    { name: 'Item 3', category: 'Work' },
    { name: 'Item 4', category: 'Other' },
  ]);

  const handleAuthClick = () => {
    setIsLoggedIn(!isLoggedIn);
  };

  const handleSortToggle = () => {
    setSortOrder(prev => (prev === 'asc' ? 'desc' : 'asc'));
  };

  const filteredAndSortedItems = useMemo(() => {
    let filtered = items.filter(item =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    if (filterCategory !== 'All') {
      filtered = filtered.filter(item => item.category === filterCategory);
    }

    filtered.sort((a, b) =>
      sortOrder === 'asc'
        ? a.name.localeCompare(b.name)
        : b.name.localeCompare(a.name)
    );

    return filtered;
  }, [items, searchQuery, filterCategory, sortOrder]);

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <div className="title">Dashboard</div>
        <div className="auth-section">
          {isLoggedIn ? (
            <span className="username">{username}</span>
          ) : (
            <button className="auth-button" onClick={handleAuthClick}>
              Login
            </button>
          )}
        </div>
      </header>

      <main className="dashboard-main">
        <h2>Your Items</h2>
        <>
          <div className="controls">
            <input
              type="text"
              placeholder="Search items..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
            />
            <select
              value={filterCategory}
              onChange={e => setFilterCategory(e.target.value)}
            >
              <option value="All">All</option>
              <option value="Work">Work</option>
              <option value="Personal">Personal</option>
              <option value="Other">Other</option>
            </select>
            <button onClick={handleSortToggle}>
              Sort: {sortOrder === 'asc' ? 'A-Z' : 'Z-A'}
            </button>
          </div>

          <ul className="item-list">
            {filteredAndSortedItems.length > 0 ? (
              filteredAndSortedItems.map((item, index) => (
                <li key={index} className="item">
                  <strong>{item.name}</strong> – {item.category}
                </li>
              ))
            ) : (
              <p>No items match your criteria.</p>
            )}
          </ul>
        </>
      </main>
    </div>
  );
};

export default Dashboard;