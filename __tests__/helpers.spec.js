/// <reference types="vitest/globals" />
import { test, expect } from "vitest";
import { getPackageVersion } from "../helpers";

// Should not set version if not versionable commit message
test("'style: lala [BREAKING CHANGE]' should result in a patch", () => {
  const version = getPackageVersion("style lala [BREAKING CHANGE]");
  expect(version).toBeUndefined();
});
test("'style(a): lala' should result in a patch", () => {
  const version = getPackageVersion("style(a): lala");
  expect(version).toBeUndefined();
});
// Should be breaking change if text [BREAKING CHANGE] existing in message
test("'chore(nojira) lala [BREAKING CHANGE]' should result in a patch", () => {
  const version = getPackageVersion("chore(nojira): lala [BREAKING CHANGE]");
  expect(version).toBe("major");
});
// CHORE
test("'chore(nojira)' should result in a patch", () => {
  const version = getPackageVersion("chore(nojira): some message");
  expect(version).toBe("patch");
});

test("'!chore(nojira)' should result in a major", () => {
  const version = getPackageVersion("!chore(nojira): some message");
  expect(version).toBe("major");
});

// FIX
test("'fix(nojira)' should result in a patch", () => {
  const version = getPackageVersion("fix(nojira): some message");
  expect(version).toBe("patch");
});

test("'!fix(nojira)' should result in a major", () => {
  const version = getPackageVersion("!fix(nojira): some message");
  expect(version).toBe("major");
});

// FEAT
test("'feat(nojira)' should result in a patch", () => {
  const version = getPackageVersion("feat(nojira): some message");
  expect(version).toBe("minor");
});

test("'!feat(nojira)' should result in a major", () => {
  const version = getPackageVersion("!feat(nojira): some message");
  expect(version).toBe("major");
});

// REFACTOR
test("'refactor(nojira)' should result in a patch", () => {
  const version = getPackageVersion("refactor(nojira): some message");
  expect(version).toBe("minor");
});

test("'!refactor(nojira)' should result in a major", () => {
  const version = getPackageVersion("!refactor(nojira): some message");
  expect(version).toBe("major");
});
