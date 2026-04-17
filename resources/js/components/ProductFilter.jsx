import React, { useState } from 'react';

export default function ProductFilter({ products }) {
  const [category, setCategory] = useState('');
  const [status, setStatus] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Filter
  const filtered = products.filter(p =>
    (category === '' || p.category === category) &&
    (status === '' || p.status === status) &&
    (maxPrice === '' || p.price <= maxPrice) &&
    (search === '' || p.name.toLowerCase().includes(search.toLowerCase()))
  );

  // Sort
  const sorted = [...filtered].sort((a, b) => {
    if (sort === 'low') return a.price - b.price;
    if (sort === 'high') return b.price - a.price;
    return 0;
  });

  // Pagination
  const totalPages = Math.ceil(sorted.length / itemsPerPage);
  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const currentProducts = sorted.slice(indexOfFirst, indexOfLast);

  const categories = [...new Set(products.map(p => p.category))];
  const statuses = ['active', 'deleted'];

  // Badge generator
  const getBadge = (text, type) => {
    let color = 'secondary';
    if (type === 'category') {
      if (text === 'Electronics') color = 'primary';
      else if (text === 'Clothing') color = 'warning';
      else if (text === 'Footwear') color = 'info';
      else if (text === 'Accessories') color = 'danger';
    } else if (type === 'status') {
      color = text === 'active' ? 'success' : 'danger';
    } else if (type === 'price') {
      if (text < 2000) color = 'success';
      else if (text < 5000) color = 'warning';
      else color = 'danger';
    }
    return <span className={`badge bg-${color} me-1`}>{text}</span>;
  };

  return (
    <div className="p-4">
      <h1 className="text-center mb-4">Product Filter</h1>

      {/* Filters */}
      <div className="row g-2 mb-3">
        <div className="col-md-2">
          <select className="form-select" value={category} onChange={e => setCategory(e.target.value)}>
            <option value="">All Categories</option>
            {categories.map(c => <option key={c}>{c}</option>)}
          </select>
        </div>
        <div className="col-md-2">
          <select className="form-select" value={status} onChange={e => setStatus(e.target.value)}>
            <option value="">All Status</option>
            {statuses.map(s => <option key={s}>{s}</option>)}
          </select>
        </div>
        <div className="col-md-2">
          <input className="form-control" type="number" placeholder="Max Price" value={maxPrice} onChange={e => setMaxPrice(e.target.value)} />
        </div>
        <div className="col-md-3">
          <input className="form-control" type="text" placeholder="Search Product..." value={search} onChange={e => setSearch(e.target.value)} />
        </div>
        <div className="col-md-2">
          <select className="form-select" value={sort} onChange={e => setSort(e.target.value)}>
            <option value="">Sort By</option>
            <option value="low">Price: Low → High</option>
            <option value="high">Price: High → Low</option>
          </select>
        </div>
        <div className="col-md-1 d-grid">
          <button className="btn btn-outline-secondary" onClick={() => {
            setCategory(''); setStatus(''); setMaxPrice(''); setSearch(''); setSort(''); setCurrentPage(1);
          }}>Reset</button>
        </div>
      </div>

      <p className="mb-2"><strong>Total Results:</strong> {sorted.length}</p>

      {/* Table */}
      <div className="table-responsive shadow-sm rounded">
        <table className="table table-striped table-hover align-middle">
          <thead className="table-dark">
            <tr>
              <th>Name</th>
              <th>Category</th>
              <th>Price</th>
              <th>Status</th>
              <th>Tags</th>
            </tr>
          </thead>
          <tbody>
            {currentProducts.map(p => (
              <tr key={p.id}>
                <td>{p.name}</td>
                <td>{p.category}</td>
                <td>₹{p.price}</td>
                <td>{getBadge(p.status, 'status')}</td>
                <td>
                  {getBadge(p.category, 'category')}
                  {getBadge(p.price, 'price')}
                  {getBadge(p.status, 'status')}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Bootstrap Pagination */}
      {totalPages > 1 && (
        <nav className="mt-3">
          <ul className="pagination justify-content-center">
            <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
              <button className="page-link" onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}>Previous</button>
            </li>
            {[...Array(totalPages)].map((_, i) => (
              <li key={i} className={`page-item ${currentPage === i + 1 ? 'active' : ''}`}>
                <button className="page-link" onClick={() => setCurrentPage(i + 1)}>{i + 1}</button>
              </li>
            ))}
            <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
              <button className="page-link" onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}>Next</button>
            </li>
          </ul>
        </nav>
      )}
    </div>
  );
}