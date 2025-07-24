// jest.setup.js
global.document = {
  addEventListener: jest.fn(),
  removeEventListener: jest.fn(),
  querySelector: jest.fn(() => null),
  // Add more mocks as needed
};

global.window = {
  addEventListener: jest.fn(),
  removeEventListener: jest.fn(),
  // Add more mocks as needed
};
