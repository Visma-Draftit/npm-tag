const MAP_TO = {
  //Patch
  chore: "patch",
  fix: "patch",
  //Minor
  feat: "minor",
  refactor: "minor",
};

const MESSAGE_TO_YEILD_NEW_VERSION = ["chore", "feat", "fix", "refactor"];

module.exports = {
  /**
   *
   * @param {String} message
   * @returns {('major'|'minor'|'patch')}
   */
  getPackageVersion: (message) => {
    let version;
    const hasMajorVersionMark = message[0] === "!";

    MESSAGE_TO_YEILD_NEW_VERSION.forEach((_) => {
      if (message.startsWith(_) || message.substring(1).startsWith(_)) {
        version = MAP_TO[_];
        if (
          message.toUpperCase().includes("[BREAKING CHANGE]") ||
          hasMajorVersionMark
        ) {
          version = "major";
        }
      }
    });

    return version;
  },
};
