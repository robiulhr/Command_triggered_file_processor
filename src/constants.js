const constants = {
  ROOT_PATH: __dirname.slice(0, -3),
  IS_FILE_EDITING: false,
  EDITING_FILE_PATH: "",
};
// separator handler
const setSeparators = function () {
  (constants.WINDOW_WIDTH = process.stdout.columns), (constants.FULL_SEPARATOR = "-".repeat(constants.WINDOW_WIDTH)), (constants.HALF_SEPARATOR = "-".repeat(constants.WINDOW_WIDTH / 2));
};
// create separators for first time
setSeparators();

process.stdout.on("resize", () => {
  // re create separators
  setSeparators();
});

// set CEF_PATH (command executor file path)

constants.CEF_PATH = constants.ROOT_PATH + "command.txt";

// all commands
constants.commands = {
  LIST: "ls",
  CREATE: "create",
  READ: "read",
  ADD_START: "add-start",
  ADD_END: "add-end",
  EDIT_FILE: "edit",
  RENAME: "rename",
  MOVE: "move",
  DELETE_FILE: "unlink",
  DELETE_EMPTY_FOLDER: "rmempdir",
  DELETE_FULL_FOLDER: "rmfulldir",
  // CEF(COMMAND EXICUTOR FILE)
  CEF_COMMANDS: "cef-commands",
  START_CEF: "start-cef",
  STOP_CEF: "stop-cef",
  // TRL(TERMINAL)
  TRL_COMMANDS: "trl-commands",
  COMMANDS: "commands",
  HELP: "help",
};

module.exports = constants;
