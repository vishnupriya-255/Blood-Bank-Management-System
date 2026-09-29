import { useEffect, useState } from 'react';
import DonorForm from './DonorForm';
import { getDonors, deleteDonor } from '../api';

export default function DonorList() {

  const [donors, setDonors] = useState([]);

  // Load donors from database
  async function loadDonors() {
    try {
      const data = await getDonors();
      setDonors(data);
    } catch (error) {
      console.error(error);
      alert('Failed to load donors');
    }
  }

  // Load donors when page opens
  useEffect(() => {
    loadDonors();
  }, []);

  // Delete donor
  async function handleDelete(id) {
    const confirmDelete = window.confirm(
      'Are you sure you want to delete this donor?'
    );

    if (!confirmDelete) {
      return;
    }

    try {
      await deleteDonor(id);

      alert('Donor deleted successfully');

      loadDonors();

    } catch (error) {
      console.error(error);
      alert('Failed to delete donor');
    }
  }

  return (
    <>
      <style>
        {`
          .donor-list-page {
            width: 100%;
            min-height: 100vh;
            padding: 30px;
            background: #f6f7fb;
            box-sizing: border-box;
          }

          .donor-list-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            gap: 20px;
            margin-bottom: 25px;
          }

          .donor-list-header h2 {
            margin: 0;
            color: #222222;
            font-size: 30px;
            font-weight: 700;
          }

          .donor-list-header p {
            margin: 8px 0 0;
            color: #777777;
            font-size: 14px;
          }

          .donor-list-badge {
            padding: 10px 16px;
            border-radius: 8px;
            background: #fff0f0;
            border: 1px solid #ffd0d0;
            color: #c62828;
            font-size: 13px;
            font-weight: 600;
          }

          .donor-list-content {
            width: 100%;
            max-width: 1150px;
            margin: 0 auto;
          }

          .donor-table-card {
            margin-top: 30px;
            background: white;
            padding: 25px;
            border-radius: 16px;
            box-shadow: 0 5px 25px rgba(0, 0, 0, 0.08);
            overflow-x: auto;
          }

          .donor-table-card h3 {
            margin-top: 0;
            margin-bottom: 20px;
            color: #333333;
          }

          .donor-table {
            width: 100%;
            border-collapse: collapse;
            min-width: 900px;
          }

          .donor-table th {
            background: #fff0f0;
            color: #333333;
            padding: 13px;
            text-align: left;
            font-size: 14px;
          }

          .donor-table td {
            padding: 13px;
            border-bottom: 1px solid #eeeeee;
            color: #555555;
            font-size: 14px;
          }

          .donor-delete {
            padding: 8px 14px;
            border: none;
            border-radius: 6px;
            background: #d62828;
            color: white;
            cursor: pointer;
            font-size: 13px;
          }

          .donor-delete:hover {
            background: #b71c1c;
          }

          .no-donors {
            text-align: center;
            padding: 25px;
            color: #777777;
          }

          @media (max-width: 700px) {
            .donor-list-page {
              padding: 18px;
            }

            .donor-list-header {
              align-items: flex-start;
              flex-direction: column;
            }

            .donor-list-header h2 {
              font-size: 24px;
            }
          }
        `}
      </style>

      <div className="donor-list-page">

        <div className="donor-list-header">
          <div>
            <h2>Donor Management</h2>
            <p>Register and manage blood donor information</p>
          </div>

          <div className="donor-list-badge">
            Blood Bank System
          </div>
        </div>

        <div className="donor-list-content">

          {/* DONOR FORM */}
          <DonorForm onDonorAdded={loadDonors} />

          {/* DONOR LIST */}
          <div className="donor-table-card">

            <h3>Registered Donors</h3>

            {donors.length === 0 ? (

              <div className="no-donors">
                No donors registered yet.
              </div>

            ) : (

              <table className="donor-table">

                <thead>
                  <tr>
                    <th>Donor ID</th>
                    <th>Name</th>
                    <th>Age</th>
                    <th>Gender</th>
                    <th>Blood Group</th>
                    <th>Phone</th>
                    <th>Email</th>
                    <th>Last Donation</th>
                    <th>Action</th>
                  </tr>
                </thead>

                <tbody>

                  {donors.map((donor) => (

                    <tr key={donor.donor_id}>

                      <td>{donor.donor_id}</td>

                      <td>{donor.name}</td>

                      <td>{donor.age}</td>

                      <td>{donor.gender}</td>

                      <td>{donor.blood_group}</td>

                      <td>{donor.phone}</td>

                      <td>{donor.email}</td>

                      <td>{donor.last_donation_date}</td>

                      <td>
                        <button
                          className="donor-delete"
                          onClick={() =>
                            handleDelete(donor.donor_id)
                          }
                        >
                          Delete
                        </button>
                      </td>

                    </tr>

                  ))}

                </tbody>

              </table>

            )}

          </div>

        </div>

      </div>
    </>
  );
}