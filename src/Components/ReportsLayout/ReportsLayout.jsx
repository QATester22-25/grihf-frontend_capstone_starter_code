import React, { useEffect, useState } from 'react';
import './ReportsLayout.css';

const ReportsLayout = () => {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedReportId, setSelectedReportId] = useState(null);

  const getPersistedReviews = () => {
    try {
      return JSON.parse(localStorage.getItem('reviewFormDataMap') || '{}');
    } catch (e) {
      console.error('Error parsing persisted report data', e);
      return {};
    }
  };

  const deleteReport = (item) => {
    const id = item.id;
    const persisted = getPersistedReviews();
    if (persisted[id]) {
      delete persisted[id];
      localStorage.setItem('reviewFormDataMap', JSON.stringify(persisted));
    }
    setReports((prev) => prev.filter((entry) => entry.id !== id));
    if (selectedReportId === id) {
      setSelectedReportId(null);
    }

    window.dispatchEvent(new CustomEvent('reviewDataCleared', { detail: { id } }));
  };

  const downloadReport = (item) => {
    const doctorName = item.doctor || item.doctorName || item.name || 'Doctor';
    const content = `Report for ${doctorName}\nSpeciality: ${item.specialty || item.speciality || 'Unknown'}\nReview: ${item.review || item.comment || 'No review'}\nRating: ${item.rating || 'N/A'}`;
    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${doctorName.replace(/\s/g, '_')}_report.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('https://api.npoint.io/9a5543d36f1460da2f63');
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        const normalized = Array.isArray(data)
          ? data
          : data.reports || [];

        const persisted = getPersistedReviews();
        const merged = normalized.map((item, index) => {
          const id = item.id ?? index + 1;
          const base = { ...item, id };
          return persisted[id] ? { ...base, ...persisted[id] } : base;
        });

        setReports(merged);
      } catch (err) {
        setError('Unable to load reports');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="reports-layout-center">
      <div className="reports-layout">
        <h3>Reports</h3>

      {loading && <p>Loading reports...</p>}
      {error && <p className="reports-layout__error">{error}</p>}

      {!loading && !error && (
        <div className="reports-layout__table-wrap">
          <table className="reports-layout__table">
            <thead>
              <tr>
                <th>Serial Number</th>
                <th>Doctor</th>
                <th>Doctor Speciality</th>
                <th>View Report</th>
                <th>Download Report</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {reports.filter((item) => item.review || item.comment).length > 0 ? (
                reports
                  .filter((item) => item.review || item.comment)
                  .map((item) => {
                    const doctorName = item.doctor || item.doctorName || item.name || 'Unknown';
                    const speciality = item.specialty || item.speciality || 'Unknown';

                    return (
                      <tr key={item.id}>
                        <td>{item.id}</td>
                        <td>{doctorName}</td>
                        <td>{speciality}</td>
                        <td>
                          <button type="button" className="report-btn" onClick={() => setSelectedReportId(item.id)}>
                            View Report
                          </button>
                        </td>
                        <td>
                          <button type="button" className="report-btn report-btn-download" onClick={() => downloadReport(item)}>
                            Download Report
                          </button>
                        </td>
                        <td>
                          <button type="button" className="report-btn report-btn-delete" onClick={() => deleteReport(item)}>
                            Delete
                          </button>
                        </td>
                      </tr>
                    );
                  })
              ) : (
                <tr>
                  <td colSpan="5" className="reports-layout__no-data">
                    No reports available
                  </td>
                </tr>
              )}
            </tbody>
          </table>

          {selectedReportId && (
            <div className="reports-layout__details">
              <button className="reports-layout__close-btn" type="button" onClick={() => setSelectedReportId(null)}>
                ×
              </button>
              {(() => {
                const selected = reports.find((item) => item.id === selectedReportId);
                if (!selected) return <p className="reports-layout__no-data">Selected report was not found.</p>;

                return (
                  <div>
                    <h4>Report Details</h4>
                    <p><strong>Doctor:</strong> {selected.doctor || selected.doctorName || selected.name || 'Unknown'}</p>
                    <p><strong>Speciality:</strong> {selected.specialty || selected.speciality || 'Unknown'}</p>
                    <p><strong>Review:</strong> {selected.review || selected.comment || 'No review provided.'}</p>
                    <p><strong>Rating:</strong> {selected.rating != null ? selected.rating : 'N/A'}</p>
                  </div>
                );
              })()}
            </div>
          )}
        </div>
      )}
      </div>
    </div>
  );
};

export default ReportsLayout;
