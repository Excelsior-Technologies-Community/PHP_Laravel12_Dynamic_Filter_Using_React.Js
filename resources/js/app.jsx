import React from 'react';
import { createRoot } from 'react-dom/client';
import ProductFilter from './Components/ProductFilter';

const container = document.getElementById('product-filter');
const products = JSON.parse(container.dataset.products);

createRoot(container).render(<ProductFilter products={products} />);
