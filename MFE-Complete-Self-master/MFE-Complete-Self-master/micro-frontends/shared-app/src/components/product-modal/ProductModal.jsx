import './productModal.css';
import { getRandomReviews } from '../../utils/reviews';
import React from 'react';

function ProductModal({ product, onClose }) {
  if (!product) return null;

  const reviews = getRandomReviews();

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>×</button>

        <div className="modal-header">
          <img src={product.imageUrl} className="modal-image" alt='product' />
          <div className="modal-info">
            <h2>{product.productName}</h2>
            <p className="modal-desc">{product.description}</p>
            <div className="modal-meta">
            <div className="modal-meta">
  <span className="price">Rs. {product.price}</span>
  <div className="rating">⭐ {(Math.random() * 2 + 3).toFixed(1)} / 5</div>
</div>
            </div>
          </div>
        </div>

        <div className="modal-reviews">
          <h3>User Reviews</h3>
          <ul>
            {reviews.map((review, idx) => (
              <li key={idx}>
                <span className="review-bullet">💬</span>
                <span className="review-text">{review}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default ProductModal;
