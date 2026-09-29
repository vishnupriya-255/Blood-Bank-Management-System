import { useState } from "react";
import { addCamp } from "../api";

export default function Camps() {
  const [form, setForm] = useState({
    camp_id: "",
    camp_name: "",
    location: "",
    camp_date: "",
    organizer: "",
    units_collected: "",
  });

  function handleChange(e) {
    const { name, value } = e.target;

    setForm({
      ...form,
      [name]: value,
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      await addCamp(form);

      alert("Donation camp created successfully!");

      setForm({
        camp_id: "",
        camp_name: "",
        location: "",
        camp_date: "",
        organizer: "",
        units_collected: "",
      });
    } catch (error) {
      console.error("Error creating camp:", error);
      alert("Failed to create donation camp.");
    }
  }

  return (
    <>
      <style>
        {`
          .camp-page {
            padding: 25px;
            background: #fff7f7;
            min-height: 100vh;
          }

          .camp-card {
            background: white;
            border: 1px solid #f2cccc;
            border-radius: 15px;
            padding: 30px;
            margin-bottom: 25px;
            box-shadow: 0 3px 10px rgba(180, 0, 0, 0.05);
          }

          .camp-card h3 {
            color: #8f1018;
            font-size: 22px;
            margin-bottom: 25px;
            font-weight: 700;
          }

          .camp-form-grid {
            display: grid;
            grid-template-columns: repeat(2, minmax(0, 1fr));
            gap: 22px;
          }

          .camp-field {
            display: flex;
            flex-direction: column;
            gap: 8px;
          }

          .camp-field label {
            color: #650b10;
            font-size: 14px;
            font-weight: 600;
          }

          .camp-field input {
            width: 100%;
            height: 45px;
            padding: 10px 13px;
            border: 1px solid #e7bcbc;
            border-radius: 8px;
            outline: none;
            font-size: 15px;
            background: white;
            box-sizing: border-box;
          }

          .camp-field input:focus {
            border-color: #b5121b;
            box-shadow: 0 0 0 2px rgba(181, 18, 27, 0.1);
          }

          .camp-button {
            margin-top: 28px;
            padding: 12px 25px;
            background: #b5121b;
            color: white;
            border: none;
            border-radius: 8px;
            font-size: 15px;
            font-weight: 600;
            cursor: pointer;
          }

          .camp-button:hover {
            background: #8f1018;
          }

          @media (max-width: 700px) {
            .camp-page {
              padding: 15px;
            }

            .camp-card {
              padding: 20px;
            }

            .camp-form-grid {
              grid-template-columns: 1fr;
            }
          }
        `}
      </style>

      <div className="camp-page">
        <div className="camp-card">
          <h3>Create Donation Camp</h3>

          <form onSubmit={handleSubmit}>
            <div className="camp-form-grid">
              {/* CAMP ID */}

              <div className="camp-field">
                <label>Camp ID</label>

                <input
                  type="number"
                  name="camp_id"
                  placeholder="Enter Camp ID"
                  value={form.camp_id}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* CAMP NAME */}

              <div className="camp-field">
                <label>Camp Name</label>

                <input
                  type="text"
                  name="camp_name"
                  placeholder="Enter Camp Name"
                  value={form.camp_name}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* LOCATION */}

              <div className="camp-field">
                <label>Location</label>

                <input
                  type="text"
                  name="location"
                  placeholder="Enter Camp Location"
                  value={form.location}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* CAMP DATE */}

              <div className="camp-field">
                <label>Camp Date</label>

                <input
                  type="date"
                  name="camp_date"
                  value={form.camp_date}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* ORGANIZER */}

              <div className="camp-field">
                <label>Organizer</label>

                <input
                  type="text"
                  name="organizer"
                  placeholder="Enter Organizer Name"
                  value={form.organizer}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* UNITS COLLECTED */}

              <div className="camp-field">
                <label>Units Collected</label>

                <input
                  type="number"
                  name="units_collected"
                  placeholder="Enter Collected Units"
                  min="0"
                  value={form.units_collected}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <button className="camp-button" type="submit">
              Create Camp
            </button>
          </form>
        </div>
      </div>
    </>
  );
}