import { type JestConfigWithTsJest, createDefaultPreset } from "ts-jest";

const defaultPreset = createDefaultPreset();

const jestConfig: JestConfigWithTsJest = {
  preset: "ts-jest/presets/default-esm",
  ...defaultPreset,
};

export default jestConfig;
