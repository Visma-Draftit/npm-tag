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
  if (!process.env.GITHUB_TOKEN) {
    throw new Error("Requires GITHUB_TOKEN");
  }

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
      exec(`git push`);
      exec(`git push --tags`);
      console.log("Tagging done");
    }
  } else {
    throw "No commit message found";
  }
};
run();
