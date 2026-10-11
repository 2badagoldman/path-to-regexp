import { describe, it, expect } from "vitest";
import { compile } from "./index.js";

describe("compile param validation", () => {
  it("should throw when a param is an empty string", () => {
    expect(() => compile("/:test")({ test: "" })).toThrow(
      new TypeError('Expected "test" to be a non-empty string'),
    );
  });

  it("should throw the same message when a param is not a string", () => {
    expect(() => compile("/:test")({ test: 123 as any })).toThrow(
      new TypeError('Expected "test" to be a non-empty string'),
    );
    expect(() => compile("/:test")({ test: [] as any })).toThrow(
      new TypeError('Expected "test" to be a non-empty string'),
    );
  });

  it("should compile a non-empty string param", () => {
    expect(compile("/:test")({ test: "a" })).toBe("/a");
  });

  it("should skip an optional group when the param is undefined", () => {
    expect(compile("/foo{/:bar}")({})).toBe("/foo");
    expect(() => compile("/foo{/:bar}")({ bar: "" })).toThrow(
      new TypeError('Expected "bar" to be a non-empty string'),
    );
  });
});
