import { useState } from 'react';
import { addDonor } from '../api';

export default function DonorForm({ onDonorAdded }) {
  const [form, setForm] = useState({
    donor_id: '',
    name: '',
    age: '',
    gender: '',
    blood_group: '',
    phone: '',
    email: '',
    address: '',
    last_donation_date: ''
  });

  function handleChange(e) {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      await addDonor(form);

      alert('Donor added successfully');

      setForm({
        donor_id: '',
        name: '',
        age: '',
        gender: '',
        blood_group: '',
        phone: '',
        email: '',
        address: '',
        last_donation_date: ''
      });

      if (onDonorAdded) {
        onDonorAdded();
      }
    } catch (err) {
      alert(err.message);
    }
  }

  return (
    <>
      <style>
        {`
          .donor-form-card {
            width: 100%;
            background: #ffffff;
            padding: 30px;
            border-radius: 16px;
            box-shadow: 0 5px 25px rgba(0, 0, 0, 0.08);
            box-sizing: border-box;
          }

          .donor-form-heading {
            display: flex;
            justify-content: space-between;
            align-items: center;
            border-bottom: 1px solid #eeeeee;
            padding-bottom: 20px;
            margin-bottom: 25px;
          }

          .donor-form-heading h3 {
            margin: 0;
            color: #222222;
            font-size: 24px;
          }

          .donor-form-heading p {
            margin: 7px 0 0;
            color: #777777;
            font-size: 14px;
          }

          .donor-blood-symbol {
            width: 50px;
            height: 50px;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 12px;
            background: #fff0f0;
            font-size: 26px;
          }

          .donor-form-section {
            margin-bottom: 28px;
          }

          .donor-form-section h4 {
            margin: 0 0 18px;
            padding-left: 12px;
            border-left: 4px solid #d62828;
            color: #333333;
            font-size: 17px;
          }

          .donor-fields {
            display: grid;
            grid-template-columns: repeat(2, minmax(0, 1fr));
            gap: 20px;
          }

          .donor-field {
            display: flex;
            flex-direction: column;
          }

          .donor-field label {
            margin-bottom: 8px;
            color: #444444;
            font-size: 14px;
            font-weight: 600;
          }

          .donor-field input,
          .donor-field select,
          .donor-field textarea {
            width: 100%;
            padding: 13px;
            border: 1px solid #d7d7d7;
            border-radius: 8px;
            outline: none;
            font-size: 14px;
            font-family: inherit;
            box-sizing: border-box;
          }

          .donor-field input:focus,
          .donor-field select:focus,
          .donor-field textarea:focus {
            border-color: #d62828;
            box-shadow: 0 0 0 3px rgba(214, 40, 40, 0.1);
          }

          .donor-full-field {
            grid-column: 1 / -1;
          }

          .donor-form-bottom {
            display: flex;
            justify-content: flex-end;
            border-top: 1px solid #eeeeee;
            padding-top: 20px;
          }

          .donor-submit {
            padding: 13px 30px;
            border: none;
            border-radius: 8px;
            background: #d62828;
            color: white;
            font-size: 14px;
            font-weight: 700;
            cursor: pointer;
          }

          .donor-submit:hover {
            background: #b71c1c;
          }

          @media (max-width: 700px) {
            .donor-form-card {
              padding: 20px;
            }

            .donor-fields {
              grid-template-columns: 1fr;
            }

            .donor-full-field {
              grid-column: auto;
            }

            .donor-form-bottom {
              display: block;
            }

            .donor-submit {
              width: 100%;
            }
          }
        `}
      </style>

      <div className="donor-form-card">
        <div className="donor-form-heading">
          <div>
            <h3>Register New Donor</h3>
            <p>Enter the donor details below</p>
          </div>

          <div className="donor-blood-symbol">🩸</div>
        </div>

        <form onSubmit={handleSubmit}>

          <div className="donor-form-section">
            <h4>Personal Information</h4>

            <div className="donor-fields">
              <div className="donor-field">
                <label htmlFor="donor_id">Donor ID</label>
                <input
                  id="donor_id"
                  name="donor_id"
                  type="number"
                  placeholder="Enter donor ID"
                  value={form.donor_id}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="donor-field">
                <label htmlFor="name">Full Name</label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Enter full name"
                  value={form.name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="donor-field">
                <label htmlFor="age">Age</label>
                <input
                  id="age"
                  name="age"
                  type="number"
                  placeholder="Enter age"
                  value={form.age}
                  onChange={handleChange}
                />
              </div>

              <div className="donor-field">
                <label htmlFor="gender">Gender</label>
                <select
                  id="gender"
                  name="gender"
                  value={form.gender}
                  onChange={handleChange}
                >
                  <option value="">Select gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>
          </div>

          <div className="donor-form-section">
            <h4>Blood Information</h4>

            <div className="donor-fields">
              <div className="donor-field">
                <label htmlFor="blood_group">Blood Group</label>
                <select
                  id="blood_group"
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

              <div className="donor-field">
                <label htmlFor="last_donation_date">
                  Last Donation Date
                </label>
                <input
                  id="last_donation_date"
                  name="last_donation_date"
                  type="date"
                  value={form.last_donation_date}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>

          <div className="donor-form-section">
            <h4>Contact Information</h4>

            <div className="donor-fields">
              <div className="donor-field">
                <label htmlFor="phone">Phone Number</label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  placeholder="Enter phone number"
                  value={form.phone}
                  onChange={handleChange}
                />
              </div>

              <div className="donor-field">
                <label htmlFor="email">Email Address</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Enter email address"
                  value={form.email}
                  onChange={handleChange}
                />
              </div>

              <div className="donor-field donor-full-field">
                <label htmlFor="address">Address</label>
                <textarea
                  id="address"
                  name="address"
                  rows="3"
                  placeholder="Enter complete address"
                  value={form.address}
                  onChange={handleChange}
                ></textarea>
              </div>
            </div>
          </div>

          <div className="donor-form-bottom">
            <button type="submit" className="donor-submit">
              Add Donor
            </button>
          </div>

        </form>
      </div>
    </>
  );
}