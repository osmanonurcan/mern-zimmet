const express = require("express");
const {
  getDevices,
  createDevice,
  getUniqueValues,
  deleteDevice,
  getDeviceById,
  updateDevice,
  getStats,
  addTicket,
  getTickets,
  deleteTicket,
  changeTicketStatus,
} = require("../controllers/deviceController");
const router = express.Router();

router.get("/", getDevices);
router.get("/unique-values", getUniqueValues);
router.get("/stats", getStats);
router.get("/tickets", getTickets);
router.get("/:id", getDeviceById);
router.post("/", createDevice);
router.delete("/:id", deleteDevice);
router.delete("/:deviceId/tickets/:ticketId", deleteTicket);
router.put("/:deviceId/tickets/:ticketId", changeTicketStatus);
router.put("/:id/ticket", addTicket);
router.put("/:id", updateDevice);

module.exports = router;
