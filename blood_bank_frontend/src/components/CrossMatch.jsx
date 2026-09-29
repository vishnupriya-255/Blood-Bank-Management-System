import { useState } from "react";
import { addCrossMatch } from "../api";

export default function CrossMatch() {
  const [form, setForm] = useState({
    cross_match_id: "",
    request_id: "",
    donor_blood_group: "",
    patient_blood_group: "",
    result: "",
    test_date: "",
  });

  // ================= CHECK BLOOD COMPATIBILITY =================

  function checkCompatibility(donor, patient) {
    const compatibility = {
      "O-": ["O-", "O+", "A-", "A+", "B-", "B+", "AB-", "AB+"],
      "O+": ["O+", "A+", "B+", "AB+"],
      "A-": ["A-", "A+", "AB-", "AB+"],
      "A+": ["A+", "AB+"],
      "B-": ["B-", "B+", "AB-", "AB+"],
      "B+": ["B+", "AB+"],
      "AB-": ["AB-", "AB+"],
      "AB+": ["AB+"],
    };

    if (
      donor &&
      patient &&
      compatibility[donor] &&
      compatibility[donor].includes(patient)
    ) {
      return "Compatible";
    }

    if (donor && patient) {
      return "Mismatch";
    }

    return "";
  }

  // ================= HANDLE INPUT CHANGES =================

  function handleChange(e) {
    const { name, value } = e.target;

    setForm((previousForm) => {
      const updatedForm = {
        ...previousForm,
        [name]: value,
      };

      if (
        name === "donor_blood_group" ||
        name === "patient_blood_group"
      ) {
        const donor =
          name === "donor_blood_group"
            ? value
            : previousForm.donor_blood_group;

        const patient =
          name === "patient_blood_group"
            ? value
            : previousForm.patient_blood_group;

        updatedForm.result = checkCompatibility(donor, patient);
      }

      return updatedForm;
    });
  }

  // ================= SUBMIT CROSS-MATCH RECORD =================

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      await addCrossMatch(form);

      alert("Cross-match record saved successfully!");

      setForm({
        cross_match_id: "",
        request_id: "",
        donor_blood_group: "",
        patient_blood_group: "",
        result: "",
        test_date: "",
      });
    } catch (error) {
      console.error("Error saving cross-match record:", error);
      alert("Failed to save cross-match record.");
    }
  }

  return (
    <>
      <style>
        {`
          .cross-match-page {
            padding: 25px;
            background: #fff7f7;
            min-height: 100vh;
          }

          .cross-match-card {
            background: white;
            border: 1px solid #f2cccc;
            border-radius: 15px;
            padding: 30px;
            margin-bottom: 25px;
            box-shadow: 0 3px 10px rgba(180, 0, 0, 0.05);
          }

          .cross-match-card h3 {
            color: #8f1018;
            font-size: 22px;
            margin-bottom: 25px;
            font-weight: 700;
          }

          .cross-match-form-grid {
            display: grid;
            grid-template-columns: repeat(2, minmax(0, 1fr));
            gap: 22px;
          }

          .cross-match-field {
            display: flex;
            flex-direction: column;
            gap: 8px;
          }

          .cross-match-field label {
            color: #650b10;
            font-size: 14px;
            font-weight: 600;
          }

          .cross-match-field input,
          .cross-match-field select {
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

          .cross-match-field input:focus,
          .cross-match-field select:focus {
            border-color: #b5121b;
            box-shadow: 0 0 0 2px rgba(181, 18, 27, 0.1);
          }

          .cross-match-field input[readonly] {
            background: #fff1f1;
            color: #8f1018;
            font-weight: 700;
          }

          .cross-match-button {
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

          .cross-match-button:hover {
            background: #8f1018;
          }

          @media (max-width: 700px) {
            .cross-match-page {
              padding: 15px;
            }

            .cross-match-card {
              padding: 20px;
            }

            .cross-match-form-grid {
              grid-template-columns: 1fr;
            }
          }
        `}
      </style>

      <div className="cross-match-page">
        <div className="cross-match-card">
          <h3>Record Cross-Match Test</h3>

          <form onSubmit={handleSubmit}>
            <div className="cross-match-form-grid">
              {/* CROSS-MATCH ID */}

              <div className="cross-match-field">
                <label>Cross-Match ID</label>

                <input
                  type="number"
                  name="cross_match_id"
                  placeholder="Enter Cross-Match ID"
                  value={form.cross_match_id}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* REQUEST ID */}

              <div className="cross-match-field">
                <label>Request ID</label>

                <input
                  type="number"
                  name="request_id"
                  placeholder="Enter Request ID"
                  value={form.request_id}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* DONOR BLOOD GROUP */}

              <div className="cross-match-field">
                <label>Donor Blood Group</label>

                <select
                  name="donor_blood_group"
                  value={form.donor_blood_group}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Donor Blood Group</option>
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

              {/* PATIENT BLOOD GROUP */}

              <div className="cross-match-field">
                <label>Patient Blood Group</label>

                <select
                  name="patient_blood_group"
                  value={form.patient_blood_group}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Patient Blood Group</option>
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

              {/* RESULT */}

              <div className="cross-match-field">
                <label>Result</label>

                <input
                  type="text"
                  name="result"
                  placeholder="Result will appear automatically"
                  value={form.result}
                  readOnly
                />
              </div>

              {/* TEST DATE */}

              <div className="cross-match-field">
                <label>Test Date</label>

                <input
                  type="date"
                  name="test_date"
                  value={form.test_date}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <button className="cross-match-button" type="submit">
              Save Record
            </button>
          </form>
        </div>
      </div>
    </>
  );
}