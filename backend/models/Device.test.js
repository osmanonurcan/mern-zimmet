const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");
const Device = require("./Device");
import { faker } from "@faker-js/faker";

let mongoServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const mongoUri = mongoServer.getUri();

  await mongoose.connect(mongoUri);
});

afterAll(async () => {
  await mongoose.disconnect();
  if (mongoServer) await mongoServer.stop();
});

describe("Device Model Test", () => {
  // const mockDevice1 = new Device({
  //   make: "make1",
  //   model: "model1",
  //   category: "Computer",
  //   img: { data: Buffer.from("test image data 1"), contentType: "image/png" },
  //   owner: "owner1",
  // });

  // const mockDevice2 = new Device({
  //   make: "make2",
  //   model: "model2",
  //   category: "Accessory",
  //   img: { data: Buffer.from("test image data 2"), contentType: "image/png" },
  //   owner: "owner2",
  // });

  beforeEach(async () => {
    const mockData = [mockDevice1, mockDevice2];
    await Device.create(mockData);
  });

  afterEach(async () => {
    jest.resetAllMocks();
    await Device.deleteMany();
  });

  it("get all devices", async () => {
    const mockDevice1 = new Device({
      make: "make1",
      model: "model1",
      category: "Computer",
      img: { data: Buffer.from("test image data 1"), contentType: "image/png" },
      owner: "owner1",
    });

    const mockDevice2 = new Device({
      make: "make2",
      model: "model2",
      category: "Accessory",
      img: { data: Buffer.from("test image data 2"), contentType: "image/png" },
      owner: "owner2",
    });

    await mockDevice1.save();
    await mockDevice2.save();

    const devices = await Device.getAllDevices({});
    expect(devices.length).toBe(2);
  });
});

const generateMockData = (int) => {
  let mockDevices = [];
  for (let i = 0; i < 10; i++) {
    const mockDevice = new Device({
      make: faker.commerce.productName(),
      model: faker.commerce.productName(),
      category: faker.commerce.productName(),
      owner: faker.person.fullName(),
    });
    mockDevices.push(mockDevice);
  }
  return mockDevices;
};
