#!/bin/node
/// <reference types="node" />
const { execSync, spawnSync } = require("child_process");
const { getPackageVersion } = require("./helpers");

const exec = (str) => {
  const [cmd, ...args] = str.split(" ");
  const ret = spawnSync(cmd, args, { cwd: "./", stdio: "inherit" });
  if (ret.status) {
    console.error(ret);
    console.error(`Error: ${str} returned non-zero exit code`);
    process.exit(ret.status);
  }
  return ret;
};

const run = async () => {
  let message;
  const {
    GITHUB_ACTOR,
    GITHUB_TOKEN,
    GITHUB_REPOSITORY,
    GITHUB_NAME,
    GITHUB_EMAIL,
  } = process.env;
  if (!GITHUB_TOKEN) {
    throw new Error("Requires GITHUB_TOKEN");
  }
  if (!GITHUB_NAME) {
    throw new Error("Requires GITHUB_NAME");
  }
  if (!GITHUB_EMAIL) {
    throw new Error("Requires GITHUB_EMAIL");
  }
  if (!GITHUB_ACTOR) {
    throw new Error("Requires GITHUB_ACTOR");
  }
  if (!GITHUB_REPOSITORY) {
    throw new Error("Requires GITHUB_REPOSITORY");
  }
  const REPO_NAME = `https://${GITHUB_ACTOR}:${GITHUB_TOKEN}@github.com/${GITHUB_REPOSITORY}.git`;
  console.log(
    `https://${GITHUB_ACTOR}:GITHUB_TOKEN@github.com/${GITHUB_REPOSITORY}.git`
  );
  // Setup git env
  exec(`git config http.sslVerify false`);
  exec(`git config user.email "${process.env.GITHUB_EMAIL}"`);
  exec(`git config user.name "${process.env.GITHUB_NAME}"`);
  exec(`git remote add npm-tag "${REPO_NAME}"`);
  exec(`git remote --verbose`);
  exec(`git show-ref`);
  exec(`git branch --verbose`);

  try {
    message = execSync("git log -n 1 --pretty=format:'%s'").toString();
  } catch (e) {
    console.error("Error when fetching latest commit message");
    throw e;
  }

  if (message.length > 0) {
    const version = getPackageVersion(message);
    if (version != null) {
      console.log(`Tagging next release as: ${version}`);
      exec(`npm version ${version}`);
      exec(`git push "${REPO_NAME}"`);
      exec(`git push "${REPO_NAME}" --tags`);
      console.log("Tagging done");
    }
  } else {
    throw "No commit message found";
  }
};
run();
