import "@testing-library/jest-dom/extend-expect";
import { useRouter } from "next/router";
import { TextEncoder, TextDecoder } from "util";

// Polyfills for Jest. In some tests, we use an ObjectId from 'mongodb' to mock '_id'.
// Without these polyfills, Jest throws an error: "The ReferenceError: TextEncoder is
// not defined". It happens when Jest doesn’t have TextEncoder available, which is
// typically included in a browser environment but missing in Node.js.
global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;

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

jest.mock("next-auth", () => ({
	getSession: jest.fn(() => Promise.resolve(null)),
	signIn: jest.fn(() => Promise.resolve()),
	signOut: jest.fn(() => Promise.resolve()),
}));

jest.mock("plaiceholder", () => ({
	getPlaiceholder: jest.fn(() => ({ base64: "mocked-base64" })),
}));

jest.mock("@/auth", () => ({
	auth: jest.fn(),
}));
