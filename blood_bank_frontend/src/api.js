// api.js

const BASE_URL = "http://localhost:5000/api";


// ==================================================
// HELPER
// ==================================================

async function handle(res, errMsg) {
  if (!res.ok) {
    const data = await res.json().catch(() => ({}));

    throw new Error(
      data.message || errMsg
    );
  }

  return res.json();
}


// ==================================================
// LOGIN
// ==================================================

export const login = (username, password) =>
  fetch(`${BASE_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      username: username,
      password: password
    })
  }).then((r) =>
    handle(r, "Invalid username or password")
  );


// ==================================================
// CREATE USER
// ==================================================

export const register = (username, password) =>
  fetch(`${BASE_URL}/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      username: username,
      password: password
    })
  }).then((r) =>
    handle(r, "Failed to create user")
  );


// ==================================================
// DONORS
// ==================================================

// Get all donors
export const getDonors = () =>
  fetch(`${BASE_URL}/donors`)
    .then((r) =>
      handle(r, "Failed to fetch donors")
    );


// Add donor
export const addDonor = (donor) =>
  fetch(`${BASE_URL}/donors`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(donor)
  }).then((r) =>
    handle(r, "Failed to add donor")
  );


// Delete donor
export const deleteDonor = (id) =>
  fetch(`${BASE_URL}/donors/${id}`, {
    method: "DELETE"
  }).then((r) =>
    handle(r, "Failed to delete donor")
  );


// ==================================================
// BLOOD STOCK
// ==================================================

// Get all blood stock
export const getBloodStock = () =>
  fetch(`${BASE_URL}/blood-stock`)
    .then((r) =>
      handle(r, "Failed to fetch blood stock")
    );


// Add blood stock
export const addBloodStock = (stock) =>
  fetch(`${BASE_URL}/blood-stock`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(stock)
  }).then((r) =>
    handle(r, "Failed to add blood stock")
  );


// Delete blood stock
export const deleteBloodStock = (id) =>
  fetch(`${BASE_URL}/blood-stock/${id}`, {
    method: "DELETE"
  }).then((r) =>
    handle(r, "Failed to delete blood stock")
  );


// ==================================================
// HOSPITALS
// ==================================================

// Get all hospitals
export const getHospitals = () =>
  fetch(`${BASE_URL}/hospitals`)
    .then((r) =>
      handle(r, "Failed to fetch hospitals")
    );


// Add hospital
export const addHospital = (hospital) =>
  fetch(`${BASE_URL}/hospitals`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(hospital)
  }).then((r) =>
    handle(r, "Failed to add hospital")
  );


// Delete hospital
export const deleteHospital = (id) =>
  fetch(`${BASE_URL}/hospitals/${id}`, {
    method: "DELETE"
  }).then((r) =>
    handle(r, "Failed to delete hospital")
  );


// ==================================================
// BLOOD REQUESTS
// ==================================================

// Get all blood requests
export const getBloodRequests = () =>
  fetch(`${BASE_URL}/hospitals/requests`)
    .then((r) =>
      handle(r, "Failed to fetch blood requests")
    );


// Add blood request
export const addBloodRequest = (request) =>
  fetch(`${BASE_URL}/hospitals/requests`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(request)
  }).then((r) =>
    handle(r, "Failed to add blood request")
  );


// Update blood request status
export const updateBloodRequestStatus = (id, status) =>
  fetch(`${BASE_URL}/hospitals/requests/${id}/status`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      status: status
    })
  }).then((r) =>
    handle(r, "Failed to update blood request")
  );


// ==================================================
// CAMPS
// ==================================================

// Get all camps
export const getCamps = () =>
  fetch(`${BASE_URL}/camps`)
    .then((r) =>
      handle(r, "Failed to fetch camps")
    );


// Add camp
export const addCamp = (camp) =>
  fetch(`${BASE_URL}/camps`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(camp)
  }).then((r) =>
    handle(r, "Failed to add camp")
  );


// Delete camp
export const deleteCamp = (id) =>
  fetch(`${BASE_URL}/camps/${id}`, {
    method: "DELETE"
  }).then((r) =>
    handle(r, "Failed to delete camp")
  );


// ==================================================
// CROSS-MATCH
// ==================================================

// Get all cross-match records
export const getCrossMatches = () =>
  fetch(`${BASE_URL}/cross-match`)
    .then((r) =>
      handle(r, "Failed to fetch cross-match records")
    );


// Add cross-match record
export const addCrossMatch = (crossMatch) =>
  fetch(`${BASE_URL}/cross-match`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(crossMatch)
  }).then((r) =>
    handle(r, "Failed to add cross-match record")
  );


// Delete cross-match record
export const deleteCrossMatch = (id) =>
  fetch(`${BASE_URL}/cross-match/${id}`, {
    method: "DELETE"
  }).then((r) =>
    handle(r, "Failed to delete cross-match record")
  );