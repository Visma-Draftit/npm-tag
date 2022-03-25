#!/bin/node
/// <reference types="node" />
const git = require("simple-git").default;
const { spawnSync } = require("child_process");
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
  if (!process.env.GITHUB_TOKEN) {
    throw new Error("Requires GITHUB_TOKEN");
  }

  const log = await git().log();
  const { message } = log.latest;

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
