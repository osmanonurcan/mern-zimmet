const mongoose = require("mongoose");

const { Schema } = mongoose;

const ticketSchema = new Schema(
  {
    description: String,
    status: {
      type: String,
      enum: ["pending", "processing", "done"],
    },
    oldSpecs: [
      {
        title: {
          type: String,
          enum: ["CPU", "GPU", "SSD", "HDD", "RAM"],
        },
        info: String,
      },
    ],
    newSpecs: [
      {
        title: {
          type: String,
          enum: ["CPU", "GPU", "SSD", "HDD", "RAM"],
        },
        info: String,
      },
    ],
  },
  { timestamps: true }
);

const Model = mongoose.model("Ticket", ticketSchema, "Ticket");

const getAllTickets = async ({ search, make, model, owner, category }) => {
  const queryObject = {};

  if (make) {
    queryObject.make = make;
  }
  if (model) {
    queryObject.model = model;
  }
  if (isOwnerExists === "true") {
    if (owner) {
      queryObject.owner = owner;
    } else {
      queryObject.owner = { $exists: true, $nin: "" };
    }
  }
  if (isOwnerExists === "false") {
    queryObject.owner = { $in: "" };
  }

  if (category) {
    queryObject.category = category;
  }
  if (search) {
    queryObject["$or"] = [
      { make: { $regex: new RegExp(search), $options: "i" } },
      { model: { $regex: new RegExp(search), $options: "i" } },
      { category: { $regex: new RegExp(search), $options: "i" } },
      { owner: { $regex: new RegExp(search), $options: "i" } },
      // { owner: { $exists: false } },
      // { owner: { $in: "" } },
    ];
    // queryObject["$text"] = { $search: search };

    // console.log(queryObject);

    const devices = await Model.find(queryObject);

    return devices;
  } else {
    const devices = await Model.find(queryObject);
    return devices;
  }
};

const getUniqueValues = async (isOwnerExists, params) => {
  const currentFilters = params || {};
  let o = Object.fromEntries(
    Object.entries(currentFilters).filter(([_, v]) => v != "")
  );

  if (isOwnerExists === "true") {
    if (o.owner == null) {
      o["owner"] = { $exists: true, $nin: "" };
    }
  } else {
    o["owner"] = { $in: "" };
  }

  const makes = await Model.distinct("make", o);
  const models = await Model.distinct("model", o);
  const owners = await Model.distinct("owner", o);
  const categories = await Model.distinct("category", o);

  const values = { makes, models, categories, owners };

  return values;
};

const createDevice = async (payload) => {
  const device = new Model(payload);
  return await device.save();
};

const deleteDevice = async (id) => {
  return await Model.findByIdAndRemove(id);
};

const deleteTicket = async (deviceId, ticketId) => {
  console.log(deviceId, ticketId);
  const res = await Model.updateOne(
    { _id: deviceId },
    { $pull: { tickets: { _id: ticketId } } }
  );

  return res;
};

const updateDevice = async (id, updatedDevice) => {
  const device = await Model.findByIdAndUpdate(id, updatedDevice, {
    new: true,
    runValidators: true,
  });
  return device;
};

const addTicket = async (id, ticket) => {
  const res = await Model.updateOne(
    { _id: id },
    { $push: { tickets: ticket } }
  );

  return res;
};
const changeTicketStatus = async (deviceId, ticketId, status, ticket) => {
  let res = await Model.updateOne(
    { _id: deviceId, "tickets._id": ticketId },
    {
      $set: {
        "tickets.$.status": status,
      },
    }
  );

  if (status === "done") {
    res = await Model.updateOne(
      { _id: deviceId },
      {
        $set: {
          specs: ticket.newSpecs,
        },
      }
    );
  }

  return res;
};

const getStats = async () => {
  const ticketsDocs = await Model.aggregate([
    {
      $unwind: "$tickets",
    },
    {
      $group: {
        _id: "$tickets.status",
        count: { $count: {} },
      },
    },
  ]);

  let tickets = {
    pending: 0,
    processing: 0,
    done: 0,
  };
  ticketsDocs.forEach((status) => {
    tickets[status._id] = status.count;
  });

  const devices = await Model.estimatedDocumentCount();

  const owners = (await Model.distinct("owner")).length;

  const stats = { devices, owners, tickets };

  return stats;
};

const getTickets = async () => {
  const tickets = await Model.aggregate([
    {
      $unwind: "$tickets",
    },
    {
      $project: {
        _id: 0,
        deviceId: "$_id",
        make: 1,
        model: 1,
        ticket: "$tickets",
      },
    },
  ]);

  return tickets;
};

Model.getAllDevices = getAllDevices;
Model.getDeviceById = getDeviceById;
Model.createDevice = createDevice;
Model.deleteDevice = deleteDevice;
Model.updateDevice = updateDevice;
Model.getUniqueValues = getUniqueValues;
Model.getStats = getStats;
Model.addTicket = addTicket;
Model.getTickets = getTickets;
Model.deleteTicket = deleteTicket;
Model.changeTicketStatus = changeTicketStatus;

module.exports = Model;
