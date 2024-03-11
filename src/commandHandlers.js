const fs = require("fs");
const crud = require("./crud.js");
const rl = require("./readline_executor");
const constants = require("./constants.js");
const helpers = require("./helpers.js");
const commandHandlers = {};

// ls current path handler
commandHandlers.lsCurrentPath = function () {
  // Get a list of all files and directories in the current directory
  fs.readdir(constants.ROOT_PATH, (err, files) => {
    if (err) throw err;
    files.forEach((ele, ind) => {
      console.log(`${ind == 0 ? "\n" : ""}${ind + 1}. ${ele}${ind == files.length - 1 ? "\n" : ""}`);
    });
  });
};
// ls specific path handler
commandHandlers.lsSpecificPath = function (path) {
  // Get a list of all files and directories in a specific directory
  fs.readdir(constants.ROOT_PATH + path, (err, files) => {
    if (err) console.log("something went wrong.");
    files.forEach((ele, ind) => {
      console.log(`${ind == 0 ? "\n" : ""}${ind + 1}. ${ele}${ind == files.length - 1 ? "\n" : ""}`);
    });
  });
};

// crud operation from TRL(terminal) handler
commandHandlers.startCrudTRLHandler = function () {
  rl.question("Select an option:\n1. Create File or Folder \n2. Edit File \n3. Delete File or Folder \n4. Rename File or Folder \n5. Read File\n6. Move File or Folder\n", (option) => {
    switch (option) {
      case "1":
        crud.optCreateFileFolder();
        break;
      case "2":
        crud.optEditFile();
        break;
      case "3":
        crud.optDeleteFileFolder();
        break;
      case "4":
        // rename file or folder
        crud.optRenameFileFolder();
        break;
      case "5":
        // read file
        crud.optReadFile();
        break;
      case "6":
        // move file
        crud.optMoveFileFolder();
        break;
      default:
        console.log("Invalid option selected");
    }
  });
};

// crud operation from CEF(command executor file) handler
commandHandlers.startCrudCEFHandler = function (comandSplitedArr) {};

// watcher starter handler
commandHandlers.startWatcher = function () {
  try {
    fs.watch(constants.CEF_PATH, (eventType, filename) => {
      if (eventType === "change" && filename === "command.txt") {
        fs.readFile(constants.CEF_PATH, (err, data) => {
          if (err) console.log("something went wrong.");
          else {
            const commandSplitedArr = data.toString().split(" ");
            const [command, path, ...rest] = commandSplitedArr;
            const content = rest.join(" ") || "";
            switch (command) {
              case constants.commands.CREATE:
                // creat file
                crud.creatFile(path, content);
                break;
              case constants.commands.READ:
                // read file
                crud.readFile(path);
                break;
              case constants.commands.ADD_START:
                crud.addContentStart(path, content);
                break;
              case constants.commands.ADD_END:
                crud.addContentEnd(path, content);
                break;
              case constants.commands.EDIT_FILE:
                crud.editFile(path, content);
                break;
              case constants.commands.RENAME:
                const newPath = commandSplitedArr[3];
                crud.crud.renameFileFolder(path, newPath);
                break;
            }
          }
        });
      }
    });
  } catch (err) {
    console.log("something went wrong.");
  }
};

module.exports = commandHandlers;
