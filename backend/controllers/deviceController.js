const Device = require("../models/Device");
const { StatusCodes } = require("http-status-codes");
const fs = require("fs");
const path = require("path");

const getDevices = async (req, res, next) => {
  try {
    let devices = [];

    const devicesData = await Device.getAllDevices(req.query);

    devices = await Promise.all(
      devicesData.map((item) => {
        if (Object.keys(item["_doc"].img).length !== 0) {
          let newItem = { ...item["_doc"] };
          newItem.img = item.img.data.toString("base64");
          return newItem;
        }
        return item;
      })
    );

    res.status(StatusCodes.OK).json({ devices });
  } catch (error) {
    next(error);
  }
};

const getUniqueValues = async (req, res, next) => {
  try {
    const { isOwnerExists, currentFilters } = req.query;

    const filters = await Device.getUniqueValues(isOwnerExists, currentFilters);

    res.status(StatusCodes.OK).json({ filters });
  } catch (error) {
    next(error);
  }
};

const createDevice = async (req, res, next) => {
  try {
    const payload = req.body;

    if (req.file?.filename) {
      payload.img = {
        data: fs.readFileSync(
          path.resolve(__dirname, "..", "uploads", req.file.filename)
        ),
        contentType: "image/jpeg",
      };
    }
    const device = await Device.createDevice(payload);
    res.status(StatusCodes.OK).json({ device });
  } catch (error) {
    next(error);
  }
};

const deleteDevice = async (req, res, next) => {
  try {
    const { id } = req.params;

    const device = await Device.deleteDevice(id);

    res.status(StatusCodes.OK).json({ device });
  } catch (error) {
    next(error);
  }
};
const changeTicketStatus = async (req, res, next) => {
  try {
    const { deviceId, ticketId } = req.params;
    const { status, ticket } = req.body;

    const result = await Device.changeTicketStatus(
      deviceId,
      ticketId,
      status,
      ticket
    );

    res.status(StatusCodes.OK).json({ result });
  } catch (error) {
    next(error);
  }
};
const deleteTicket = async (req, res, next) => {
  try {
    const { deviceId, ticketId } = req.params;

    const ticket = await Device.deleteTicket(deviceId, ticketId);

    res.status(StatusCodes.OK).json({ ticket });
  } catch (error) {
    next(error);
  }
};

const updateDevice = async (req, res, next) => {
  try {
    const { id } = req.params;
    const payload = req.body;

    if (req.file?.filename) {
      payload.img = {
        data: fs.readFileSync(
          path.resolve(__dirname, "..", "uploads", req.file.filename)
        ),
        contentType: "image/jpeg",
      };
    }
    const device = await Device.updateDevice(id, payload);
    res.status(StatusCodes.OK).json({ device });
  } catch (error) {
    next(error);
  }
};

const getDeviceById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const device = await Device.getDeviceById(id);

    res.status(StatusCodes.OK).json({ device });
  } catch (error) {
    next(error);
  }
};

const getStats = async (req, res, next) => {
  try {
    const stats = await Device.getStats();

    res.status(StatusCodes.OK).json({ stats });
  } catch (error) {
    next(error);
  }
};

const addTicket = async (req, res, next) => {
  try {
    const { id } = req.params;
    const ticket = req.body;

    const result = await Device.addTicket(id, ticket);
    res.status(StatusCodes.OK).json({ result });
  } catch (error) {
    next(error);
  }
};
const getTickets = async (req, res, next) => {
  try {
    const tickets = await Device.getTickets();

    res.status(StatusCodes.OK).json({ tickets });
  } catch (error) {
    next(error);
  }
};

module.exports = {
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
};
