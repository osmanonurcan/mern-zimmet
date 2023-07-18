const Device = require("../models/Device");
const request = require("supertest");
const { StatusCodes } = require("http-status-codes");
const app = require("../app");

// Mock implementation for Device.getAllDevices
jest.mock("../models/Device", () => ({
  getAllDevices: jest.fn(),
}));

describe("GET /devices", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should return all devices and a 200 status", async () => {
    const mockData = [
      {
        _doc: {
          img: {
            data: Buffer.from("test image data"),
          },
          otherData: "other data",
        },
        img: {
          data: Buffer.from("test image data"),
        },
      },
    ];

    Device.getAllDevices.mockImplementation(() => Promise.resolve(mockData));

    const res = await request(app).get("/devices");

    expect(res.statusCode).toEqual(StatusCodes.OK);
    expect(res.body).toHaveProperty("devices");
    expect(Device.getAllDevices).toBeCalled();
  });

  it("should return an error if there is a problem getting devices", async () => {
    Device.getAllDevices.mockImplementation(() =>
      Promise.reject(new Error("Test error"))
    );

    const res = await request(app).get("/devices");

    expect(res.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
    expect(Device.getAllDevices).toBeCalled();
  });
});
