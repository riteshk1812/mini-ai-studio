// src/__mocks__/axios.ts
const mockAxios: any = {
  create: jest.fn(function () {
    return mockAxios;
  }),
  interceptors: {
    request: { use: jest.fn(), eject: jest.fn() },
    response: { use: jest.fn(), eject: jest.fn() },
  },
  get: jest.fn(),
  post: jest.fn(),
  put: jest.fn(),
  delete: jest.fn(),
};

export default mockAxios;
