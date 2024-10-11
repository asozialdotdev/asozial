import "@testing-library/jest-dom/extend-expect";
import { useRouter } from "next/router";

jest.mock("next/router", () => ({
  useRouter: jest.fn(),
}));

// Mock implementation for useRouter
useRouter.mockImplementation(() => ({
  route: "/",
  pathname: "/",
  query: {},
  asPath: "/",
}));
