import axios from "axios";
import { errorHandler } from "./errors/errorHandler";

const customFetch = axios.create({
  baseURL: "http://localhost:5001",
});

// customFetch.interceptors.request.use((config) => {
//   const token = localStorage.getItem("token");

//   if (token) {
//     config.headers["access-token"] = token;
//   }

//   return config;
// });
// export const getDevicesBySearch = async (text) => {
//   try {
//     return await customFetch.get("/devices", {
//       params: { search: text, isOwnerExists: true },
//     });
//   } catch (error) {
//     errorHandler(error);
//   }
// };

export const getFilterValues = async (isOwnerExists, currentFilters) => {
  try {
    return await customFetch.get("/devices/unique-values", {
      params: { isOwnerExists, currentFilters },
    });
  } catch (error) {
    errorHandler(error);
  }
};

export const getDevices = async (
  text = "",
  isOwnerExists,
  make = "",
  model = "",
  category = "",
  owner = ""
) => {
  try {
    return await customFetch.get("/devices", {
      params: { search: text, isOwnerExists, make, model, category, owner },
    });
  } catch (error) {
    errorHandler(error);
  }
};

export const createDevice = async (payload) => {
  try {
    return await customFetch.post("/devices", payload, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  } catch (error) {
    errorHandler(error);
  }
};

export const updateDevice = async (id, payload) => {
  try {
    return await customFetch.put(`/devices/${id}`, payload, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  } catch (error) {
    errorHandler(error);
  }
};

export const deleteDevice = async (_id) => {
  try {
    return await customFetch.delete(`/devices/${_id}`);
  } catch (error) {
    errorHandler(error);
  }
};

export const deleteTicket = async (deviceId, ticketId) => {
  try {
    return await customFetch.delete(`/devices/${deviceId}/tickets/${ticketId}`);
  } catch (error) {
    errorHandler(error);
  }
};

export const getDeviceById = async (id) => {
  try {
    const device = await customFetch.get(`/devices/${id}`);

    return device;
  } catch (error) {
    errorHandler(error);
    throw error;
  }
};

export const getStats = async () => {
  try {
    const stats = await customFetch.get("devices/stats");

    return stats;
  } catch (error) {
    errorHandler(error);
  }
};

export const getTickets = async () => {
  try {
    const tickets = await customFetch.get("devices/tickets");

    return tickets;
  } catch (error) {
    errorHandler(error);
  }
};

export const changeTicketStatus = async (deviceId, ticket, status) => {
  try {
    const tickets = await customFetch.put(
      `/devices/${deviceId}/tickets/${ticket._id}`,
      { status, ticket }
    );

    return tickets;
  } catch (error) {
    errorHandler(error);
  }
};

export const addTicket = async (id, payload) => {
  try {
    return await customFetch.put(`/devices/${id}/ticket`, payload);
  } catch (error) {
    errorHandler(error);
  }
};

export default customFetch;
