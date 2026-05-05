import React, { useState, useEffect } from 'react';
import toast, { Toaster } from 'react-hot-toast';

export default function ProductFilter({ products: initialProducts }) {
  const [products, setProducts] = useState(initialProducts);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [status, setStatus] = useState('');
  const [priceRange, setPriceRange] = useState({ min: 0, max: 10000 });
  const [searchQuery, setSearchQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [sort, setSort] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    if (searchQuery.length > 0) {
      setIsSearching(true);
      const delayDebounceFn = setTimeout(() => {
        fetch(`/products/live-search?query=${searchQuery}`)
          .then(res => res.json())
          .then(data => {
            setSuggestions(data);
            setIsSearching(false);
          });
      }, 300);

      return () => clearTimeout(delayDebounceFn);
    } else {
      setSuggestions([]);
      setIsSearching(false);
    }
  }, [searchQuery]);

  const filtered = products.filter(p =>
    (selectedCategories.length === 0 || selectedCategories.includes(p.category)) &&
    (status === '' || p.status === status) &&
    (p.price >= priceRange.min && p.price <= priceRange.max) &&
    (searchQuery === '' || p.name.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const sorted = [...filtered].sort((a, b) => {
    if (sort === 'low') return a.price - b.price;
    if (sort === 'high') return b.price - a.price;
    return 0;
  });

  const totalValue = sorted.reduce((sum, p) => sum + p.price, 0);
  const avgPrice = sorted.length > 0 ? (totalValue / sorted.length).toFixed(2) : 0;

  const indexOfLast = currentPage * itemsPerPage;
  const currentProducts = sorted.slice(indexOfLast - itemsPerPage, indexOfLast);
  const totalPages = Math.ceil(sorted.length / itemsPerPage);

  const categories = [...new Set(initialProducts.map(p => p.category))];

  const handleAction = async (id, action) => {
    const res = await fetch(`/products/${id}/${action}`, {
      method: 'POST',
      headers: { 'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').content }
    });
    if (res.ok) {
        toast.success(`Action ${action} successful`);
        window.location.reload();
    }
  };

  return (
    <div className="p-4 bg-light min-vh-100">
      <Toaster />
      <h2 className="text-center fw-bold mb-4">Advance Product Dashboard</h2>

      <div className="row mb-4 g-3">
        <div className="col-md-4">
          <div className="card shadow-sm border-0 bg-primary text-white p-3">
            <small>Total Filtered Value</small>
            <h4 className="mb-0">₹{totalValue}</h4>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card shadow-sm border-0 bg-success text-white p-3">
            <small>Total Items</small>
            <h4 className="mb-0">{sorted.length}</h4>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card shadow-sm border-0 bg-info text-white p-3">
            <small>Average Price</small>
            <h4 className="mb-0">₹{avgPrice}</h4>
          </div>
        </div>
      </div>

      <div className="card shadow-sm p-4 mb-4 border-0">
        <div className="row g-3">
          <div className="col-md-3 position-relative">
            <label className="form-label fw-bold small">Live Search</label>
            <input 
              className="form-control" 
              placeholder="Type to search..." 
              value={searchQuery} 
              onChange={e => setSearchQuery(e.target.value)} 
            />
            {isSearching && <div className="spinner-border spinner-border-sm position-absolute" style={{right: '20px', top: '38px'}}></div>}
            {suggestions.length > 0 && (
              <ul className="list-group position-absolute w-100 shadow-lg" style={{ zIndex: 100, top: '70px' }}>
                {suggestions.map(s => (
                  <li key={s.id} className="list-group-item list-group-item-action py-2" style={{cursor: 'pointer'}} onClick={() => {setSearchQuery(s.name); setSuggestions([]);}}>
                    <div className="d-flex justify-content-between">
                        <span>{s.name}</span>
                        <small className="text-muted">₹{s.price}</small>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="col-md-3">
            <label className="form-label fw-bold small">Price Range (Max: ₹{priceRange.max})</label>
            <input 
              type="range" className="form-range" min="0" max="10000" step="100"
              value={priceRange.max} onChange={e => setPriceRange({...priceRange, max: parseInt(e.target.value)})} 
            />
          </div>

          <div className="col-md-4">
            <label className="form-label fw-bold small d-block">Filter Categories</label>
            {categories.map(c => (
              <div key={c} className="form-check form-check-inline">
                <input 
                  className="form-check-input" type="checkbox" id={c}
                  checked={selectedCategories.includes(c)}
                  onChange={() => setSelectedCategories(prev => prev.includes(c) ? prev.filter(item => item !== c) : [...prev, c])} 
                />
                <label className="form-check-label small" htmlFor={c}>{c}</label>
              </div>
            ))}
          </div>

          <div className="col-md-2 d-flex align-items-end">
             <button className="btn btn-outline-dark w-100 btn-sm" onClick={() => {
                setSelectedCategories([]); setStatus(''); setPriceRange({min:0, max:10000}); setSearchQuery(''); setSort('');
             }}>Reset Filters</button>
          </div>
        </div>
      </div>

      <div className="table-responsive bg-white shadow-sm rounded">
        <table className="table table-hover align-middle mb-0">
          <thead className="table-dark">
            <tr>
              <th>Name</th>
              <th>Category</th>
              <th>Price</th>
              <th>Status</th>
              <th className="text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentProducts.map(p => (
              <tr key={p.id}>
                <td className="fw-bold">{p.name}</td>
                <td><span className="badge bg-light text-dark border">{p.category}</span></td>
                <td>₹{p.price}</td>
                <td>
                  <span className={`badge bg-${p.status === 'active' ? 'success' : 'danger'}`}>
                    {p.status.toUpperCase()}
                  </span>
                </td>
                <td className="text-center">
                  {p.status === 'deleted' ? (
                    <button className="btn btn-sm btn-success me-2" onClick={() => handleAction(p.id, 'restore')}>Restore</button>
                  ) : (
                    <button className="btn btn-sm btn-danger me-2" onClick={() => handleAction(p.id, 'delete')}>Delete</button>
                  )}
                  <button className="btn btn-sm btn-outline-dark" onClick={() => handleAction(p.id, 'force-delete')}>Permanent</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && (
        <nav className="mt-4">
          <ul className="pagination justify-content-center">
            <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
              <button className="page-link" onClick={() => setCurrentPage(prev => prev - 1)}>Prev</button>
            </li>
            {[...Array(totalPages)].map((_, i) => (
              <li key={i} className={`page-item ${currentPage === i + 1 ? 'active' : ''}`}>
                <button className="page-link" onClick={() => setCurrentPage(i + 1)}>{i + 1}</button>
              </li>
            ))}
            <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
              <button className="page-link" onClick={() => setCurrentPage(prev => prev + 1)}>Next</button>
            </li>
          </ul>
        </nav>
      )}
    </div>
  );
}