import React, { useState } from 'react';

export default function ProductFilter({ products }) {
    const [category, setCategory] = useState('');
    const [status, setStatus] = useState('');
    const [maxPrice, setMaxPrice] = useState('');

    // Filter products based on category, status, and max price
    const filteredProducts = products.filter(product => {
        return (
            (category === '' || product.category === category) &&
            (status === '' || product.status === status) &&
            (maxPrice === '' || product.price <= maxPrice)
        );
    });

    // Get unique categories for dropdown
    const categories = [...new Set(products.map(p => p.category))];

    // Define status options manually to always show both
    const statuses = ['active', 'deleted'];

    return (
        <div>
            <h1 className="text-2xl font-bold mb-4">Product Filter</h1>

            <div className="flex gap-4 mb-4">
                <select value={category} onChange={e => setCategory(e.target.value)}>
                    <option value="">All Categories</option>
                    {categories.map(cat => (
                        <option key={cat} value={cat}>{cat}</option>
                    ))}
                </select>

                <select value={status} onChange={e => setStatus(e.target.value)}>
                    <option value="">All Status</option>
                    {statuses.map(st => (
                        <option key={st} value={st}>{st}</option>
                    ))}
                </select>

                <input
                    type="number"
                    placeholder="Max Price"
                    value={maxPrice}
                    onChange={e => setMaxPrice(e.target.value)}
                />
            </div>

            <table className="border-collapse border border-gray-300 w-full">
                <thead>
                    <tr>
                        <th className="border border-gray-300 px-2">Name</th>
                        <th className="border border-gray-300 px-2">Category</th>
                        <th className="border border-gray-300 px-2">Price</th>
                        <th className="border border-gray-300 px-2">Status</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredProducts.map(product => (
                        <tr key={product.id}>
                            <td className="border border-gray-300 px-2">{product.name}</td>
                            <td className="border border-gray-300 px-2">{product.category}</td>
                            <td className="border border-gray-300 px-2">{product.price}</td>
                            <td className="border border-gray-300 px-2">{product.status}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
