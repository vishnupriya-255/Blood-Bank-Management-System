import { useEffect, useState } from "react";

import {
    getHospitals,
    addHospital,
    deleteHospital,
    getBloodRequests,
    addBloodRequest,
    updateBloodRequestStatus
} from "../api";


export default function Hospitals() {

    // ==========================================
    // HOSPITAL DATA
    // ==========================================

    const [hospitals, setHospitals] = useState([]);

    const [hospitalForm, setHospitalForm] = useState({
        hospital_name: "",
        phone: "",
        email: "",
        address: ""
    });


    // ==========================================
    // BLOOD REQUEST DATA
    // ==========================================

    const [requests, setRequests] = useState([]);

    const [reqForm, setReqForm] = useState({
        hospital_id: "",
        blood_group: "",
        units_required: "",
        request_date: ""
    });


    // ==========================================
    // LOAD HOSPITALS
    // ==========================================

    async function loadHospitals() {

        try {

            const data = await getHospitals();

            setHospitals(data);

        } catch (error) {

            console.log(error);

            alert(error.message);

        }
    }


    // ==========================================
    // LOAD BLOOD REQUESTS
    // ==========================================

    async function loadRequests() {

        try {

            const data = await getBloodRequests();

            setRequests(data);

        } catch (error) {

            console.log(error);

            // Don't show an alert when the request API
            // has not been added yet.
            console.log("Blood requests could not be loaded.");

        }
    }


    // ==========================================
    // LOAD DATA WHEN PAGE OPENS
    // ==========================================

    useEffect(() => {

        loadHospitals();
        loadRequests();

    }, []);


    // ==========================================
    // HOSPITAL FORM HANDLER
    // ==========================================

    function handleHospitalChange(e) {

        const { name, value } = e.target;

        setHospitalForm({
            ...hospitalForm,
            [name]: value
        });
    }


    // ==========================================
    // ADD HOSPITAL
    // ==========================================

    async function handleAddHospital(e) {

        e.preventDefault();


        if (!hospitalForm.hospital_name) {

            alert("Hospital name is required");

            return;
        }


        try {

            const result = await addHospital(hospitalForm);

            alert(result.message);


            // Clear form
            setHospitalForm({
                hospital_name: "",
                phone: "",
                email: "",
                address: ""
            });


            // Reload hospitals from MySQL
            loadHospitals();

        } catch (error) {

            console.log(error);

            alert(error.message);

        }
    }


    // ==========================================
    // DELETE HOSPITAL
    // ==========================================

    async function handleDeleteHospital(id) {

        const confirmDelete = window.confirm(
            "Are you sure you want to delete this hospital?"
        );


        if (!confirmDelete) {
            return;
        }


        try {

            const result = await deleteHospital(id);

            alert(result.message);

            loadHospitals();

        } catch (error) {

            console.log(error);

            alert(error.message);

        }
    }


    // ==========================================
    // BLOOD REQUEST FORM HANDLER
    // ==========================================

    function handleRequestChange(e) {

        const { name, value } = e.target;

        setReqForm({
            ...reqForm,
            [name]: value
        });
    }


    // ==========================================
    // SUBMIT BLOOD REQUEST
    // ==========================================

    async function handleAddRequest(e) {

        e.preventDefault();


        if (
            !reqForm.hospital_id ||
            !reqForm.blood_group ||
            !reqForm.units_required ||
            !reqForm.request_date
        ) {

            alert("Please fill all blood request fields");

            return;
        }


        try {

            const result = await addBloodRequest(reqForm);

            alert(result.message);


            setReqForm({
                hospital_id: "",
                blood_group: "",
                units_required: "",
                request_date: ""
            });


            loadRequests();

        } catch (error) {

            console.log(error);

            alert(error.message);

        }
    }


    // ==========================================
    // UPDATE REQUEST STATUS
    // ==========================================

    async function handleStatusUpdate(id, status) {

        try {

            const result = await updateBloodRequestStatus(
                id,
                status
            );

            alert(result.message);

            loadRequests();

        } catch (error) {

            console.log(error);

            alert(error.message);

        }
    }


    return (

        <>
            <style>
                {`

                .hospital-page {
                    padding: 25px;
                    background: #fff7f7;
                    min-height: 100vh;
                }

                .hospital-card {
                    background: white;
                    border: 1px solid #f2cccc;
                    border-radius: 15px;
                    padding: 30px;
                    margin-bottom: 25px;
                    box-shadow: 0 3px 10px rgba(180, 0, 0, 0.05);
                }

                .hospital-card h3 {
                    color: #8f1018;
                    font-size: 22px;
                    margin-bottom: 25px;
                    font-weight: 700;
                }

                .hospital-form-grid {
                    display: grid;
                    grid-template-columns: repeat(2, minmax(0, 1fr));
                    gap: 22px;
                }

                .hospital-field {
                    display: flex;
                    flex-direction: column;
                    gap: 8px;
                }

                .hospital-field.full-width {
                    grid-column: span 2;
                }

                .hospital-field label {
                    color: #650b10;
                    font-size: 14px;
                    font-weight: 600;
                }

                .hospital-field input,
                .hospital-field select {
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

                .hospital-field input:focus,
                .hospital-field select:focus {
                    border-color: #b5121b;
                    box-shadow: 0 0 0 2px rgba(181, 18, 27, 0.1);
                }

                .hospital-button {
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

                .hospital-button:hover {
                    background: #8f1018;
                }

                .hospital-table-wrapper {
                    overflow-x: auto;
                }

                .hospital-table {
                    width: 100%;
                    border-collapse: collapse;
                    margin-top: 10px;
                }

                .hospital-table th,
                .hospital-table td {
                    padding: 12px;
                    border-bottom: 1px solid #f0dada;
                    text-align: left;
                }

                .hospital-table th {
                    background: #fff0f0;
                    color: #650b10;
                    font-weight: 700;
                }

                .delete-button {
                    padding: 8px 14px;
                    background: #dc3545;
                    color: white;
                    border: none;
                    border-radius: 6px;
                    cursor: pointer;
                }

                .delete-button:hover {
                    background: #b02a37;
                }

                .status-button {
                    padding: 7px 12px;
                    margin-right: 6px;
                    border: none;
                    border-radius: 6px;
                    cursor: pointer;
                    color: white;
                }

                .fulfill-button {
                    background: #198754;
                }

                .reject-button {
                    background: #dc3545;
                }

                .empty-message {
                    color: #777;
                    margin-top: 15px;
                }

                @media (max-width: 700px) {

                    .hospital-page {
                        padding: 15px;
                    }

                    .hospital-card {
                        padding: 20px;
                    }

                    .hospital-form-grid {
                        grid-template-columns: 1fr;
                    }

                    .hospital-field.full-width {
                        grid-column: span 1;
                    }
                }

                `}
            </style>


            <div className="hospital-page">


                {/* ==========================================
                    REGISTER HOSPITAL
                =========================================== */}

                <div className="hospital-card">

                    <h3>Register Hospital</h3>


                    <form onSubmit={handleAddHospital}>

                        <div className="hospital-form-grid">


                            {/* HOSPITAL NAME */}

                            <div className="hospital-field">

                                <label>
                                    Hospital Name
                                </label>

                                <input
                                    type="text"
                                    name="hospital_name"
                                    placeholder="Enter Hospital Name"
                                    value={hospitalForm.hospital_name}
                                    onChange={handleHospitalChange}
                                    required
                                />

                            </div>


                            {/* PHONE */}

                            <div className="hospital-field">

                                <label>
                                    Phone
                                </label>

                                <input
                                    type="text"
                                    name="phone"
                                    placeholder="Enter Phone Number"
                                    value={hospitalForm.phone}
                                    onChange={handleHospitalChange}
                                    required
                                />

                            </div>


                            {/* EMAIL */}

                            <div className="hospital-field">

                                <label>
                                    Email
                                </label>

                                <input
                                    type="email"
                                    name="email"
                                    placeholder="Enter Email Address"
                                    value={hospitalForm.email}
                                    onChange={handleHospitalChange}
                                    required
                                />

                            </div>


                            {/* ADDRESS */}

                            <div className="hospital-field">

                                <label>
                                    Address
                                </label>

                                <input
                                    type="text"
                                    name="address"
                                    placeholder="Enter Hospital Address"
                                    value={hospitalForm.address}
                                    onChange={handleHospitalChange}
                                    required
                                />

                            </div>

                        </div>


                        <button
                            className="hospital-button"
                            type="submit"
                        >
                            Add Hospital
                        </button>

                    </form>

                </div>


                {/* ==========================================
                    HOSPITAL RECORDS
                =========================================== */}

                <div className="hospital-card">

                    <h3>Hospital Records</h3>


                    {hospitals.length === 0 ? (

                        <p className="empty-message">
                            No hospitals found.
                        </p>

                    ) : (

                        <div className="hospital-table-wrapper">

                            <table className="hospital-table">

                                <thead>

                                    <tr>

                                        <th>
                                            Hospital ID
                                        </th>

                                        <th>
                                            Hospital Name
                                        </th>

                                        <th>
                                            Phone
                                        </th>

                                        <th>
                                            Email
                                        </th>

                                        <th>
                                            Address
                                        </th>

                                        <th>
                                            Action
                                        </th>

                                    </tr>

                                </thead>


                                <tbody>

                                    {hospitals.map((hospital) => (

                                        <tr
                                            key={hospital.hospital_id}
                                        >

                                            <td>
                                                {hospital.hospital_id}
                                            </td>

                                            <td>
                                                {hospital.hospital_name}
                                            </td>

                                            <td>
                                                {hospital.phone}
                                            </td>

                                            <td>
                                                {hospital.email}
                                            </td>

                                            <td>
                                                {hospital.address}
                                            </td>

                                            <td>

                                                <button
                                                    className="delete-button"
                                                    onClick={() =>
                                                        handleDeleteHospital(
                                                            hospital.hospital_id
                                                        )
                                                    }
                                                >
                                                    Delete
                                                </button>

                                            </td>

                                        </tr>

                                    ))}

                                </tbody>

                            </table>

                        </div>

                    )}

                </div>


                {/* ==========================================
                    BLOOD REQUEST
                =========================================== */}

                <div className="hospital-card">

                    <h3>Blood Request</h3>


                    <form onSubmit={handleAddRequest}>

                        <div className="hospital-form-grid">


                            {/* HOSPITAL */}

                            <div className="hospital-field">

                                <label>
                                    Hospital
                                </label>

                                <select
                                    name="hospital_id"
                                    value={reqForm.hospital_id}
                                    onChange={handleRequestChange}
                                    required
                                >

                                    <option value="">
                                        Select Hospital
                                    </option>


                                    {hospitals.map((hospital) => (

                                        <option
                                            key={hospital.hospital_id}
                                            value={hospital.hospital_id}
                                        >
                                            {hospital.hospital_name}
                                        </option>

                                    ))}

                                </select>

                            </div>


                            {/* BLOOD GROUP */}

                            <div className="hospital-field">

                                <label>
                                    Blood Group
                                </label>

                                <select
                                    name="blood_group"
                                    value={reqForm.blood_group}
                                    onChange={handleRequestChange}
                                    required
                                >

                                    <option value="">
                                        Select Blood Group
                                    </option>

                                    <option value="A+">
                                        A+
                                    </option>

                                    <option value="A-">
                                        A-
                                    </option>

                                    <option value="B+">
                                        B+
                                    </option>

                                    <option value="B-">
                                        B-
                                    </option>

                                    <option value="AB+">
                                        AB+
                                    </option>

                                    <option value="AB-">
                                        AB-
                                    </option>

                                    <option value="O+">
                                        O+
                                    </option>

                                    <option value="O-">
                                        O-
                                    </option>

                                </select>

                            </div>


                            {/* UNITS */}

                            <div className="hospital-field">

                                <label>
                                    Units Required
                                </label>

                                <input
                                    type="number"
                                    name="units_required"
                                    min="1"
                                    placeholder="Enter Units Required"
                                    value={reqForm.units_required}
                                    onChange={handleRequestChange}
                                    required
                                />

                            </div>


                            {/* DATE */}

                            <div className="hospital-field">

                                <label>
                                    Request Date
                                </label>

                                <input
                                    type="date"
                                    name="request_date"
                                    value={reqForm.request_date}
                                    onChange={handleRequestChange}
                                    required
                                />

                            </div>

                        </div>


                        <button
                            className="hospital-button"
                            type="submit"
                        >
                            Submit Blood Request
                        </button>

                    </form>

                </div>


                {/* ==========================================
                    BLOOD REQUEST RECORDS
                =========================================== */}

                <div className="hospital-card">

                    <h3>Blood Request Records</h3>


                    {requests.length === 0 ? (

                        <p className="empty-message">
                            No blood requests found.
                        </p>

                    ) : (

                        <div className="hospital-table-wrapper">

                            <table className="hospital-table">

                                <thead>

                                    <tr>

                                        <th>
                                            Request ID
                                        </th>

                                        <th>
                                            Hospital
                                        </th>

                                        <th>
                                            Blood Group
                                        </th>

                                        <th>
                                            Units
                                        </th>

                                        <th>
                                            Date
                                        </th>

                                        <th>
                                            Status
                                        </th>

                                        <th>
                                            Action
                                        </th>

                                    </tr>

                                </thead>


                                <tbody>

                                    {requests.map((request) => (

                                        <tr
                                            key={request.request_id}
                                        >

                                            <td>
                                                {request.request_id}
                                            </td>

                                            <td>
                                                {request.hospital_name}
                                            </td>

                                            <td>
                                                {request.blood_group}
                                            </td>

                                            <td>
                                                {request.units_required}
                                            </td>

                                            <td>
                                                {request.request_date}
                                            </td>

                                            <td>
                                                {request.status}
                                            </td>

                                            <td>

                                                {request.status === "Pending" ? (

                                                    <>
                                                        <button
                                                            className="status-button fulfill-button"
                                                            onClick={() =>
                                                                handleStatusUpdate(
                                                                    request.request_id,
                                                                    "Fulfilled"
                                                                )
                                                            }
                                                        >
                                                            Fulfill
                                                        </button>

                                                        <button
                                                            className="status-button reject-button"
                                                            onClick={() =>
                                                                handleStatusUpdate(
                                                                    request.request_id,
                                                                    "Rejected"
                                                                )
                                                            }
                                                        >
                                                            Reject
                                                        </button>
                                                    </>

                                                ) : (

                                                    <span>
                                                        Completed
                                                    </span>

                                                )}

                                            </td>

                                        </tr>

                                    ))}

                                </tbody>

                            </table>

                        </div>

                    )}

                </div>

            </div>
        </>
    );
}