import { useState } from 'react';
import { addBloodStock } from '../api';

export default function BloodStock({ onStockAdded }) {
  const [form, setForm] = useState({
    stock_id: '',
    blood_group: '',
    units_available: '',
    collection_date: '',
    expiry_date: '',
    status: '',
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await addBloodStock(form);

      alert('Blood stock added successfully!');

      setForm({
        stock_id: '',
        blood_group: '',
        units_available: '',
        collection_date: '',
        expiry_date: '',
        status: '',
      });

      if (onStockAdded) {
        onStockAdded();
      }
    } catch (error) {
      console.error(error);
      alert('Failed to add blood stock');
    }
  };

  return (
    <div className="blood-stock-page">
      <style>{`
        .blood-stock-page {
          min-height: 100%;
          padding: 30px;
          background: #f8fafc;
          font-family: Arial, sans-serif;
        }

        .blood-stock-heading {
          margin-bottom: 25px;
        }

        .blood-stock-heading h2 {
          margin: 0;
          color: #172033;
          font-size: 30px;
        }

        .blood-stock-heading p {
          margin-top: 8px;
          color: #718096;
          font-size: 14px;
        }

        .blood-stock-form-card {
          max-width: 1000px;
          background: white;
          padding: 30px;
          border-radius: 18px;
          box-shadow: 0 5px 20px rgba(0, 0, 0, 0.06);
        }

        .form-section-title {
          margin-top: 0;
          margin-bottom: 20px;
          padding-bottom: 12px;
          border-bottom: 2px solid #fee2e2;
          color: #991b1b;
          font-size: 20px;
        }

        .blood-stock-form {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 20px;
        }

        .form-group {
          display: flex;
          flex-direction: column;
        }

        .form-group label {
          margin-bottom: 8px;
          color: #374151;
          font-size: 14px;
          font-weight: 600;
        }

        .form-group input,
        .form-group select {
          padding: 13px;
          border: 1px solid #d1d5db;
          border-radius: 9px;
          outline: none;
          font-size: 14px;
          background: white;
        }

        .form-group input:focus,
        .form-group select:focus {
          border-color: #dc2626;
          box-shadow: 0 0 0 3px rgba(220, 38, 38, 0.1);
        }

        .full-width {
          grid-column: span 2;
        }

        .submit-stock-button {
          margin-top: 25px;
          padding: 14px 25px;
          border: none;
          border-radius: 10px;
          background: #dc2626;
          color: white;
          font-size: 15px;
          font-weight: 700;
          cursor: pointer;
        }

        .submit-stock-button:hover {
          background: #b91c1c;
        }

        @media (max-width: 700px) {
          .blood-stock-page {
            padding: 20px;
          }

          .blood-stock-form-card {
            padding: 20px;
          }

          .blood-stock-form {
            grid-template-columns: 1fr;
          }

          .full-width {
            grid-column: span 1;
          }
        }
      `}</style>

      <div className="blood-stock-heading">
        <h2>Blood Stock Management</h2>
        <p>Add and manage available blood stock details.</p>
      </div>

      <div className="blood-stock-form-card">
        <h3 className="form-section-title">
          Blood Stock Information
        </h3>

        <form className="blood-stock-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Stock ID</label>
            <input
              type="number"
              name="stock_id"
              value={form.stock_id}
              onChange={handleChange}
              placeholder="Enter stock ID"
              required
            />
          </div>

          <div className="form-group">
            <label>Blood Group</label>
            <select
              name="blood_group"
              value={form.blood_group}
              onChange={handleChange}
              required
            >
              <option value="">Select blood group</option>
              <option value="A+">A+</option>
              <option value="A-">A-</option>
              <option value="B+">B+</option>
              <option value="B-">B-</option>
              <option value="AB+">AB+</option>
              <option value="AB-">AB-</option>
              <option value="O+">O+</option>
              <option value="O-">O-</option>
            </select>
          </div>

          <div className="form-group">
            <label>Units Available</label>
            <input
              type="number"
              name="units_available"
              value={form.units_available}
              onChange={handleChange}
              placeholder="Enter number of units"
              min="0"
              required
            />
          </div>

          <div className="form-group">
            <label>Status</label>
            <select
              name="status"
              value={form.status}
              onChange={handleChange}
              required
            >
              <option value="">Select status</option>
              <option value="Available">Available</option>
              <option value="Low Stock">Low Stock</option>
              <option value="Expired">Expired</option>
              <option value="Reserved">Reserved</option>
            </select>
          </div>

          <div className="form-group">
            <label>Collection Date</label>
            <input
              type="date"
              name="collection_date"
              value={form.collection_date}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Expiry Date</label>
            <input
              type="date"
              name="expiry_date"
              value={form.expiry_date}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group full-width">
            <button
              type="submit"
              className="submit-stock-button"
            >
              Add Blood Stock
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}