// ==========================================
// BLOOD BANK MANAGEMENT SYSTEM - SERVER
// ==========================================

const express = require("express");
const cors = require("cors");
const bcrypt = require("bcrypt");
const db = require("./db");

const app = express();


// ==========================================
// MIDDLEWARE
// ==========================================

app.use(cors());
app.use(express.json());


// ==========================================
// TEST ROUTE
// ==========================================

app.get("/", (req, res) => {
    res.send("Blood Bank Backend is Working!");
});


// ==========================================
// LOGIN API
// POST /api/auth/login
// ==========================================

app.post("/api/auth/login", (req, res) => {

    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({
            message: "Username and password are required"
        });
    }

    const sql = `
        SELECT *
        FROM users
        WHERE username = ?
    `;

    db.query(
        sql,
        [username],
        async (err, result) => {

            if (err) {
                console.log(err);

                return res.status(500).json({
                    message: "Login failed"
                });
            }

            if (result.length === 0) {
                return res.status(401).json({
                    message: "Invalid username or password"
                });
            }

            const user = result[0];

            try {

                const passwordMatch = await bcrypt.compare(
                    password,
                    user.password
                );

                if (!passwordMatch) {
                    return res.status(401).json({
                        message: "Invalid username or password"
                    });
                }

                res.json({
                    message: "Login successful",
                    user_id: user.user_id,
                    username: user.username
                });

            } catch (error) {

                console.log(error);

                return res.status(500).json({
                    message: "Login failed"
                });
            }
        }
    );
});


// ==========================================
// REGISTER API
// POST /api/auth/register
// ==========================================

app.post("/api/auth/register", async (req, res) => {

    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({
            message: "Username and password are required"
        });
    }

    try {

        const checkSql = `
            SELECT *
            FROM users
            WHERE username = ?
        `;

        db.query(
            checkSql,
            [username],
            async (err, result) => {

                if (err) {
                    console.log(err);

                    return res.status(500).json({
                        message: "Failed to check user"
                    });
                }

                if (result.length > 0) {
                    return res.status(400).json({
                        message: "Username already exists"
                    });
                }

                const hashedPassword = await bcrypt.hash(
                    password,
                    10
                );

                const insertSql = `
                    INSERT INTO users
                    (username, password)
                    VALUES (?, ?)
                `;

                db.query(
                    insertSql,
                    [username, hashedPassword],
                    (err, result) => {

                        if (err) {
                            console.log(err);

                            return res.status(500).json({
                                message: "Failed to create user"
                            });
                        }

                        res.json({
                            message: "User created successfully"
                        });
                    }
                );
            }
        );

    } catch (error) {

        console.log(error);

        return res.status(500).json({
            message: "Failed to create user"
        });
    }
});


// ==========================================
// DONOR APIs
// ==========================================


// ==========================================
// ADD DONOR
// POST /api/donors
// ==========================================

app.post("/api/donors", (req, res) => {

    const {
        donor_id,
        name,
        age,
        gender,
        blood_group,
        phone,
        email,
        address,
        last_donation_date
    } = req.body;

    if (!donor_id || !name || !blood_group) {

        return res.status(400).json({
            message: "Donor ID, name and blood group are required"
        });
    }

    const sql = `
        INSERT INTO donors
        (
            donor_id,
            name,
            age,
            gender,
            blood_group,
            phone,
            email,
            address,
            last_donation_date
        )
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    db.query(
        sql,
        [
            donor_id,
            name,
            age || null,
            gender || null,
            blood_group,
            phone || null,
            email || null,
            address || null,
            last_donation_date || null
        ],
        (err, result) => {

            if (err) {

                console.log("DONOR DATABASE ERROR:");
                console.log(err);

                return res.status(500).json({
                    message: err.message
                });
            }

            res.json({
                message: "Donor added successfully",
                donor_id: donor_id
            });
        }
    );
});


// ==========================================
// GET ALL DONORS
// GET /api/donors
// ==========================================

app.get("/api/donors", (req, res) => {

    const sql = `
        SELECT *
        FROM donors
        ORDER BY donor_id
    `;

    db.query(
        sql,
        (err, result) => {

            if (err) {

                console.log("DONOR FETCH ERROR:");
                console.log(err);

                return res.status(500).json({
                    message: err.message
                });
            }

            res.json(result);
        }
    );
});


// ==========================================
// DELETE DONOR
// DELETE /api/donors/:id
// ==========================================

app.delete("/api/donors/:id", (req, res) => {

    const donorId = req.params.id;

    const sql = `
        DELETE FROM donors
        WHERE donor_id = ?
    `;

    db.query(
        sql,
        [donorId],
        (err, result) => {

            if (err) {

                console.log("DONOR DELETE ERROR:");
                console.log(err);

                return res.status(500).json({
                    message: err.message
                });
            }

            if (result.affectedRows === 0) {

                return res.status(404).json({
                    message: "Donor not found"
                });
            }

            res.json({
                message: "Donor deleted successfully"
            });
        }
    );
});


// ==========================================
// BLOOD STOCK APIs
// ==========================================


// ==========================================
// ADD BLOOD STOCK
// POST /api/blood-stock
// ==========================================

app.post("/api/blood-stock", (req, res) => {

    const {
        stock_id,
        blood_group,
        units_available,
        collection_date,
        expiry_date,
        status
    } = req.body;

    console.log("Blood stock data received:");
    console.log(req.body);

    if (
        !stock_id ||
        !blood_group ||
        units_available === "" ||
        units_available === undefined ||
        !collection_date ||
        !expiry_date ||
        !status
    ) {

        return res.status(400).json({
            message: "All blood stock fields are required"
        });
    }

    const sql = `
        INSERT INTO blood_stock
        (
            stock_id,
            blood_group,
            units,
            collection_date,
            expiry_date,
            status
        )
        VALUES (?, ?, ?, ?, ?, ?)
    `;

    db.query(
        sql,
        [
            stock_id,
            blood_group,
            units_available,
            collection_date,
            expiry_date,
            status
        ],
        (err, result) => {

            if (err) {

                console.log("BLOOD STOCK DATABASE ERROR:");
                console.log(err);

                return res.status(500).json({
                    message: err.message
                });
            }

            res.json({
                message: "Blood stock added successfully",
                stock_id: stock_id
            });
        }
    );
});


// ==========================================
// GET ALL BLOOD STOCK
// GET /api/blood-stock
// ==========================================

app.get("/api/blood-stock", (req, res) => {

    const sql = `
        SELECT *
        FROM blood_stock
        ORDER BY stock_id
    `;

    db.query(
        sql,
        (err, result) => {

            if (err) {

                console.log("BLOOD STOCK FETCH ERROR:");
                console.log(err);

                return res.status(500).json({
                    message: err.message
                });
            }

            res.json(result);
        }
    );
});


// ==========================================
// DELETE BLOOD STOCK
// DELETE /api/blood-stock/:id
// ==========================================

app.delete("/api/blood-stock/:id", (req, res) => {

    const stockId = req.params.id;

    const sql = `
        DELETE FROM blood_stock
        WHERE stock_id = ?
    `;

    db.query(
        sql,
        [stockId],
        (err, result) => {

            if (err) {

                console.log("BLOOD STOCK DELETE ERROR:");
                console.log(err);

                return res.status(500).json({
                    message: err.message
                });
            }

            if (result.affectedRows === 0) {

                return res.status(404).json({
                    message: "Blood stock not found"
                });
            }

            res.json({
                message: "Blood stock deleted successfully"
            });
        }
    );
});


// ==========================================
// HOSPITAL APIs
// ==========================================


// ==========================================
// ADD HOSPITAL
// POST /api/hospitals
// ==========================================

app.post("/api/hospitals", (req, res) => {

    const {
        hospital_name,
        phone,
        email,
        address
    } = req.body;

    console.log("Hospital data received:");
    console.log(req.body);

    if (!hospital_name) {

        return res.status(400).json({
            message: "Hospital name is required"
        });
    }

    // Generate next hospital ID
    const idSql = `
        SELECT COALESCE(MAX(hospital_id), 0) + 1 AS next_id
        FROM hospitals
    `;

    db.query(
        idSql,
        (err, result) => {

            if (err) {

                console.log("HOSPITAL ID ERROR:");
                console.log(err);

                return res.status(500).json({
                    message: err.message
                });
            }

            const hospitalId = result[0].next_id;

            const insertSql = `
                INSERT INTO hospitals
                (
                    hospital_id,
                    hospital_name,
                    phone,
                    email,
                    address
                )
                VALUES (?, ?, ?, ?, ?)
            `;

            db.query(
                insertSql,
                [
                    hospitalId,
                    hospital_name,
                    phone || null,
                    email || null,
                    address || null
                ],
                (err, result) => {

                    if (err) {

                        console.log("HOSPITAL DATABASE ERROR:");
                        console.log(err);

                        return res.status(500).json({
                            message: err.message
                        });
                    }

                    res.json({
                        message: "Hospital added successfully",
                        hospital_id: hospitalId
                    });
                }
            );
        }
    );
});


// ==========================================
// GET ALL HOSPITALS
// GET /api/hospitals
// ==========================================

app.get("/api/hospitals", (req, res) => {

    const sql = `
        SELECT *
        FROM hospitals
        ORDER BY hospital_id
    `;

    db.query(
        sql,
        (err, result) => {

            if (err) {

                console.log("HOSPITAL FETCH ERROR:");
                console.log(err);

                return res.status(500).json({
                    message: err.message
                });
            }

            res.json(result);
        }
    );
});


// ==========================================
// DELETE HOSPITAL
// DELETE /api/hospitals/:id
// ==========================================

app.delete("/api/hospitals/:id", (req, res) => {

    const hospitalId = req.params.id;

    const sql = `
        DELETE FROM hospitals
        WHERE hospital_id = ?
    `;

    db.query(
        sql,
        [hospitalId],
        (err, result) => {

            if (err) {

                console.log("HOSPITAL DELETE ERROR:");
                console.log(err);

                return res.status(500).json({
                    message: err.message
                });
            }

            if (result.affectedRows === 0) {

                return res.status(404).json({
                    message: "Hospital not found"
                });
            }

            res.json({
                message: "Hospital deleted successfully"
            });
        }
    );
});


// ==========================================
// BLOOD REQUEST APIs
// ==========================================


// ==========================================
// ADD BLOOD REQUEST
// POST /api/hospitals/requests
// ==========================================

app.post("/api/hospitals/requests", (req, res) => {

    const {
        hospital_id,
        blood_group,
        units_required,
        request_date
    } = req.body;

    console.log("Blood request data received:");
    console.log(req.body);

    if (
        !hospital_id ||
        !blood_group ||
        units_required === "" ||
        units_required === undefined ||
        !request_date
    ) {

        return res.status(400).json({
            message: "All blood request fields are required"
        });
    }

    // Generate next request ID
    const idSql = `
        SELECT COALESCE(MAX(request_id), 0) + 1 AS next_id
        FROM blood_requests
    `;

    db.query(
        idSql,
        (err, result) => {

            if (err) {

                console.log("REQUEST ID ERROR:");
                console.log(err);

                return res.status(500).json({
                    message: err.message
                });
            }

            const requestId = result[0].next_id;

            const insertSql = `
                INSERT INTO blood_requests
                (
                    request_id,
                    hospital_id,
                    blood_group,
                    units_required,
                    request_date,
                    status
                )
                VALUES (?, ?, ?, ?, ?, ?)
            `;

            db.query(
                insertSql,
                [
                    requestId,
                    hospital_id,
                    blood_group,
                    units_required,
                    request_date,
                    "Pending"
                ],
                (err, result) => {

                    if (err) {

                        console.log("BLOOD REQUEST DATABASE ERROR:");
                        console.log(err);

                        return res.status(500).json({
                            message: err.message
                        });
                    }

                    res.json({
                        message: "Blood request added successfully",
                        request_id: requestId
                    });
                }
            );
        }
    );
});


// ==========================================
// GET ALL BLOOD REQUESTS
// GET /api/hospitals/requests
// ==========================================

app.get("/api/hospitals/requests", (req, res) => {

    const sql = `
        SELECT
            br.request_id,
            br.hospital_id,
            h.hospital_name,
            br.blood_group,
            br.units_required,
            br.request_date,
            br.status
        FROM blood_requests br
        JOIN hospitals h
            ON br.hospital_id = h.hospital_id
        ORDER BY br.request_id
    `;

    db.query(
        sql,
        (err, result) => {

            if (err) {

                console.log("BLOOD REQUEST FETCH ERROR:");
                console.log(err);

                return res.status(500).json({
                    message: err.message
                });
            }

            res.json(result);
        }
    );
});


// ==========================================
// UPDATE BLOOD REQUEST STATUS
// PUT /api/hospitals/requests/:id/status
// ==========================================

app.put("/api/hospitals/requests/:id/status", (req, res) => {

    const requestId = req.params.id;
    const { status } = req.body;

    console.log("Updating request:", requestId);
    console.log("New status:", status);

    if (!status) {

        return res.status(400).json({
            message: "Status is required"
        });
    }

    const sql = `
        UPDATE blood_requests
        SET status = ?
        WHERE request_id = ?
    `;

    db.query(
        sql,
        [status, requestId],
        (err, result) => {

            if (err) {

                console.log("BLOOD REQUEST STATUS ERROR:");
                console.log(err);

                return res.status(500).json({
                    message: err.message
                });
            }

            if (result.affectedRows === 0) {

                return res.status(404).json({
                    message: "Blood request not found"
                });
            }

            res.json({
                message: "Blood request status updated successfully"
            });
        }
    );
});


// ==========================================
// CAMP APIs
// ==========================================


// ==========================================
// ADD CAMP
// POST /api/camps
// ==========================================

app.post("/api/camps", (req, res) => {

    const {
        camp_id,
        camp_name,
        location,
        camp_date,
        organizer,
        units_collected
    } = req.body;

    console.log("Camp data received:");
    console.log(req.body);

    if (
        !camp_id ||
        !camp_name ||
        !camp_date
    ) {

        return res.status(400).json({
            message: "Camp ID, camp name and camp date are required"
        });
    }

    const sql = `
        INSERT INTO camps
        (
            camp_id,
            camp_name,
            location,
            camp_date,
            organizer,
            collected_units
        )
        VALUES (?, ?, ?, ?, ?, ?)
    `;

    db.query(
        sql,
        [
            camp_id,
            camp_name,
            location || null,
            camp_date,
            organizer || null,
            units_collected || 0
        ],
        (err, result) => {

            if (err) {

                console.log("CAMP DATABASE ERROR:");
                console.log(err);

                return res.status(500).json({
                    message: err.message
                });
            }

            res.json({
                message: "Camp added successfully",
                camp_id: camp_id
            });
        }
    );
});


// ==========================================
// GET ALL CAMPS
// GET /api/camps
// ==========================================

app.get("/api/camps", (req, res) => {

    const sql = `
        SELECT *
        FROM camps
        ORDER BY camp_id
    `;

    db.query(
        sql,
        (err, result) => {

            if (err) {

                console.log("CAMP FETCH ERROR:");
                console.log(err);

                return res.status(500).json({
                    message: err.message
                });
            }

            res.json(result);
        }
    );
});


// ==========================================
// DELETE CAMP
// DELETE /api/camps/:id
// ==========================================

app.delete("/api/camps/:id", (req, res) => {

    const campId = req.params.id;

    const sql = `
        DELETE FROM camps
        WHERE camp_id = ?
    `;

    db.query(
        sql,
        [campId],
        (err, result) => {

            if (err) {

                console.log("CAMP DELETE ERROR:");
                console.log(err);

                return res.status(500).json({
                    message: err.message
                });
            }

            if (result.affectedRows === 0) {

                return res.status(404).json({
                    message: "Camp not found"
                });
            }

            res.json({
                message: "Camp deleted successfully"
            });
        }
    );
});


// ==========================================
// CROSS-MATCH APIs
// ==========================================


// ==========================================
// ADD CROSS-MATCH RECORD
// POST /api/cross-match
// ==========================================

app.post("/api/cross-match", (req, res) => {

    const {
        cross_match_id,
        request_id,
        donor_blood_group,
        patient_blood_group,
        result,
        test_date
    } = req.body;

    console.log("Cross-match data received:");
    console.log(req.body);

    if (
        !cross_match_id ||
        !request_id ||
        !donor_blood_group ||
        !patient_blood_group ||
        !result ||
        !test_date
    ) {

        return res.status(400).json({
            message: "All cross-match fields are required"
        });
    }

    const sql = `
        INSERT INTO cross_match
        (
            cross_match_id,
            request_id,
            donor_blood_group,
            patient_blood_group,
            result,
            test_date
        )
        VALUES (?, ?, ?, ?, ?, ?)
    `;

    db.query(
        sql,
        [
            cross_match_id,
            request_id,
            donor_blood_group,
            patient_blood_group,
            result,
            test_date
        ],
        (err, result) => {

            if (err) {

                console.log("CROSS-MATCH DATABASE ERROR:");
                console.log(err);

                return res.status(500).json({
                    message: err.message
                });
            }

            res.json({
                message: "Cross-match record added successfully",
                cross_match_id: cross_match_id
            });
        }
    );
});


// ==========================================
// GET ALL CROSS-MATCH RECORDS
// GET /api/cross-match
// ==========================================

app.get("/api/cross-match", (req, res) => {

    const sql = `
        SELECT
            cm.cross_match_id,
            cm.request_id,
            cm.donor_blood_group,
            cm.patient_blood_group,
            cm.result,
            cm.test_date
        FROM cross_match cm
        ORDER BY cm.cross_match_id
    `;

    db.query(
        sql,
        (err, result) => {

            if (err) {

                console.log("CROSS-MATCH FETCH ERROR:");
                console.log(err);

                return res.status(500).json({
                    message: err.message
                });
            }

            res.json(result);
        }
    );
});


// ==========================================
// DELETE CROSS-MATCH RECORD
// DELETE /api/cross-match/:id
// ==========================================

app.delete("/api/cross-match/:id", (req, res) => {

    const crossMatchId = req.params.id;

    const sql = `
        DELETE FROM cross_match
        WHERE cross_match_id = ?
    `;

    db.query(
        sql,
        [crossMatchId],
        (err, result) => {

            if (err) {

                console.log("CROSS-MATCH DELETE ERROR:");
                console.log(err);

                return res.status(500).json({
                    message: err.message
                });
            }

            if (result.affectedRows === 0) {

                return res.status(404).json({
                    message: "Cross-match record not found"
                });
            }

            res.json({
                message: "Cross-match record deleted successfully"
            });
        }
    );
});


// ==========================================
// START SERVER
// ==========================================

const PORT = 5000;

app.listen(PORT, () => {

    console.log(`Server running on port ${PORT}`);

});