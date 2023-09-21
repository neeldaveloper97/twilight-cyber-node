const express = require("express");
const { employeeDataHandler, getAllEntries, getEntriesById } = require("../controller/employee.controller");
const { headerHandler } = require("../middleware/auth.middleware");
const router = express.Router();

router.post("/create-bulk", headerHandler, employeeDataHandler);
router.get("/get-all", headerHandler, getAllEntries);
router.get("/get-entries-by-id/:id", getEntriesById);

module.exports = router;
