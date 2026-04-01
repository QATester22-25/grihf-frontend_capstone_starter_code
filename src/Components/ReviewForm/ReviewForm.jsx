 import React, { useEffect, useState } from 'react';
import './ReviewForm.css';

const ReviewForm = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const res = await fetch('https://api.npoint.io/9a5543d36f1460da2f63');
        if (!res.ok) {
          throw new Error(`HTTP error ${res.status}`);
        }
        const data = await res.json();
        // support array or object data
        const loaded = Array.isArray(data) ? data : data.reviews || [];
        setReviews(loaded);
      } catch (err) {
        setError('Unable to fetch review data');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, []);

  if (loading) {
    return (
      <section className="review-card">
        <h2>Reviews</h2>
        <p>Loading reviews...</p>
      </section>
    );
  }

  if (error) {
    return (
      <section className="review-card">
        <h2>Reviews</h2>
        <p className="review-card__error">{error}</p>
      </section>
    );
  }

  return (
    <section className="review-card">
      <h2>Reviews</h2>
      <div className="review-card__table-wrapper">
        <table className="review-card__table">
          <thead>
            <tr>
              <th>Serial Number</th>
              <th>Doctor Name</th>
              <th>Doctor Speciality</th>
              <th>Provide feedback</th>
              <th>Review Given</th>
            </tr>
          </thead>
          <tbody>
            {reviews.length > 0 ? (
              reviews.map((item, index) => (
                <tr key={item.id || index}>
                  <td>{item.id ?? index + 1}</td>
                  <td>{item.doctor || item.doctorName || item.name || '—'}</td>
                  <td>{item.specialty || item.speciality || '—'}</td>
                  <td>
                    <button type="button" className="review-card__button">
                      {item.feedback || 'Click Here'}
                    </button>
                  </td>
                  <td>{item.review || item.comment || '—'}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" style={{ textAlign: 'center' }}>
                  No reviews available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default ReviewForm;
