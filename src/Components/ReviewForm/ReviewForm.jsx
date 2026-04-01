 import React, { useEffect, useState } from 'react';
import './ReviewForm.css';

const ReviewForm = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [activeDoctorId, setActiveDoctorId] = useState(null);
  const [reviewerName, setReviewerName] = useState('');
  const [reviewText, setReviewText] = useState('');
  const [rating, setRating] = useState(0);
  const [formStatus, setFormStatus] = useState('');

  const activeDoctor = reviews.find((item, index) => (item.id ?? index + 1) === activeDoctorId);
  const activeDoctorName = activeDoctor?.doctor || activeDoctor?.doctorName || activeDoctor?.name || 'Selected Doctor';

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

  useEffect(() => {
    if (!activeDoctorId) return;

    const handleKeyDown = (event) => {
      if (event.key === 'Escape' || event.key === 'Esc') {
        setActiveDoctorId(null);
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeDoctorId]);

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
                    <button
                      type="button"
                      className={`review-card__button ${item.review || item.comment ? 'disabled' : ''}`}
                      disabled={Boolean(item.review || item.comment)}
                      onClick={() => {
                        if (item.review || item.comment) return;
                        setActiveDoctorId(item.id ?? index + 1);
                        setReviewerName('');
                        setReviewText(item.review || item.comment || '');
                        setRating(item.rating ?? 0);
                        setFormStatus('');
                      }}
                    >
                      {item.feedback || 'Click Here'}
                    </button>
                  </td>
                  <td>
                    <span
                      className="review-card__review-text"
                      data-tooltip={
                        item.review || item.comment
                          ? `${item.rating ? `Rating: ${item.rating} - ` : ''}${item.review || item.comment}`
                          : ''
                      }
                      title={
                        item.review || item.comment
                          ? `${item.rating ? `Rating: ${item.rating} - ` : ''}${item.review || item.comment}`
                          : ''
                      }
                    >
                      {item.review || item.comment
                        ? `${item.rating ? `⭐ ${item.rating} - ` : ''}${item.review || item.comment}`
                        : '—'}
                    </span>
                  </td>
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

      {activeDoctorId && (
        <div className="review-card__modal-overlay" onClick={() => setActiveDoctorId(null)}>
          <div className="review-card__modal-content" onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              className="review-card__close"
              onClick={() => setActiveDoctorId(null)}
            >
              ×
            </button>
            <h3>Submit Review for {activeDoctorName}</h3>

            <form
              className="review-card__feedback-form"
              onSubmit={(e) => {
                e.preventDefault();
                if (!reviewerName.trim() || !reviewText.trim()) {
                  setFormStatus('Please enter both your name and a review message.');
                  return;
                }

                setReviews((prev) =>
                  prev.map((item, index) => {
                    const id = item.id ?? index + 1;
                    if (id !== activeDoctorId) return item;
                    return { ...item, review: reviewText, rating };
                  })
                );

                setFormStatus(`Review for ${activeDoctorName} submitted successfully!`);
                setReviewerName('');
                setReviewText('');
                setActiveDoctorId(null);
              }}
            >
              <label>
                Name
                <input
                  type="text"
                  value={reviewerName}
                  onChange={(e) => setReviewerName(e.target.value)}
                  placeholder="Enter your name"
                />
              </label>

              <label>
                Review
                <textarea
                  value={reviewText}
                  onChange={(e) => setReviewText(e.target.value)}
                  placeholder="Write your review"
                />
              </label>

              <label className="review-card__rating-label">
                Rating
                <div className="review-card__stars" aria-label="Rating">
                  {[1, 2, 3, 4, 5].map((value) => (
                    <button
                      key={value}
                      type="button"
                      className={`review-card__star ${rating >= value ? 'selected' : ''}`}
                      onClick={() => setRating(value)}
                      aria-label={`${value} star${value > 1 ? 's' : ''}`}
                    >
                      ★
                    </button>
                  ))}
                </div>
              </label>

              <button type="submit" className="review-card__submit-button">
                Submit Review
              </button>

              {formStatus && <p className="review-card__status">{formStatus}</p>}
            </form>
          </div>
        </div>
      )}
    </section>
  );
};

export default ReviewForm;
