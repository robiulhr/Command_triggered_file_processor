const fs = require("fs");
const rl = require("./readline_executor");
const constants = require("./constants.js");
const helpers = require("./helpers");
const crud = {};

/**
 *  File methods
 */

// creat file getting options to fill data
crud.optCreateFile = function () {
  rl.question("file path:\n", (path) => {
    rl.question("file content:\n", (content) => {
      crud.creatFile(path, content);
    });
  });
};
// creat file handler
crud.creatFile = function (path, content = "") {
  fs.writeFile(constants.ROOT_PATH + path, content, "utf8", (err) => {
    if (err) {
      console.log(err);
      console.log("something went wrong.");
      return;
    } else console.log(`${path} created successfully.`);
    rl.question("Wanna start again? y/n\n", (answer) => {});
  });
};
// read file getting options to fill data
crud.optReadFile = function () {
  rl.question("File path:\n", (path) => {
    crud.readFile(path);
  });
};
// read file handler
crud.readFile = function (path) {
  fs.readFile(constants.ROOT_PATH + path, (err, data) => {
    if (err) console.log("something went wrong.");
    console.log("\nFile content below:\n" + constants.FULL_SEPARATOR);
    console.log("\x1b[32m%s\x1b[0m", "\n" + data.toString() + "\n");
  });
};

// edit file getting options to fill data
crud.optEditFile = function () {
  rl.question("File path:\n", (path) => {
    fs.readFile(constants.ROOT_PATH + path, (err, data) => {
      if (err) console.log("something went wrong.");
      else {
        helpers.fileEditingState(true, path);
        const arr = data.toString().split("\n");
        console.log(constants.FULL_SEPARATOR);
        const editorTitle = "**** file editor *****";
        console.log(editorTitle.padStart((constants.WINDOW_WIDTH + editorTitle.length) / 2));
        console.log(constants.FULL_SEPARATOR);
        console.log("\nFile Text:\n");
        arr.forEach((ele, i) => {
          rl.write(ele);
        });
      }
    });
  });
};

// edit file handler
crud.editFile = function (path, content) {
  fs.writeFile(constants.ROOT_PATH + path, content, "utf-8", (err) => {
    if (err) console.log("something went wrong.");
    else console.log("\nfile edited successfully.\n");
  });
};

// add content to the start
crud.addContentStart = function (path, contentToAdd) {
  fs.readFile(constants.ROOT_PATH + path, (err, existingData) => {
    if (err) console.log("something went wrong.");
    fs.writeFile(constants.ROOT_PATH + path, contentToAdd + existingData, "utf-8", (err) => {
      if (err) console.log("something went wrong.");
      else console.log("\nfile edited successfully.\n");
    });
  });
};

// add content to the end
crud.addContentEnd = function (path, contentToAdd) {
  fs.readFile(constants.ROOT_PATH + path, (err, existingData) => {
    if (err) console.log("something went wrong.");
    fs.writeFile(constants.ROOT_PATH + path, contentToAdd + existingData, "utf-8", (err) => {
      if (err) console.log("something went wrong.");
      else console.log("\nfile edited successfully.\n");
    });
  });
};

// delete file getting options to fill data
crud.optDeleteFile = function () {
  rl.question("file path:\n", (path) => {
    crud.deleteFile(path);
  });
};

// delete file handler
crud.deleteFile = function (path) {
  fs.unlink(constants.ROOT_PATH + path, (err) => {
    if (err) {
      console.log("something went wrong.");
      return;
    }
    console.log(`${path} was deleted`);
  });
};

/**
 *  Folder methods
 */

// create folder getting options to fill data
crud.optCreateFolder = function () {
  rl.question("folder path:\n", (path) => {
    crud.createFolder(path);
  });
};

// create folder handler
crud.createFolder = function () {
  fs.mkdir(constants.ROOT_PATH + path, (err) => {
    if (err) {
      console.log("something went wrong.");
      return;
    }
    console.log(`${path} created successfully`);
  });
};

// delete all type folder getting options to fill data
crud.optDeleteFolder = function () {
  rl.question("folder path:\n", (path) => {
    rl.question("choose an option:\n1. Empty Folder\n2. Have content in it.\n", (answer) => {
      switch (answer) {
        case "1":
          crud.deleteEmptyFolder(path);
          break;
        case "2":
          crud.deleteContentFullFolder(path);
          break;
      }
    });
  });
};

// delete empty folder
crud.deleteEmptyFolder = function (folderPath) {
  fs.rmdir(constants.ROOT_PATH + folderPath, { recursive: false }, (err) => {
    if (err) {
      console.log("something went wrong.");
      return;
    }
    console.log(`${folderPath} was deleted`);
  });
};
// delete folder with content inside it
crud.deleteContentFullFolder = function (folderPath) {
  fs.rmdir(constants.ROOT_PATH + folderPath, { recursive: true }, (err) => {
    if (err) {
      console.log("something went wrong.");
      return;
    }
    console.log(`${folderPath} was deleted`);
  });
};

/**
 *  Both file and Folder methods
 */
// cread file and folder getting options to fill data
crud.optCreateFileFolder = function () {
  rl.question("Choose an option:\n1. Create File\n2. Create Folder\n", (answer) => {
    switch (answer) {
      case "1":
        // create file
        crud.optCreateFile();
        break;
      case "2":
        // create folder
        crud.optCreateFolder();
        break;
    }
  });
};
// rename file and folder getting options to fill data
crud.optRenameFileFolder = function () {
  rl.question("Old path of the file or folder:\n", (oldName) => {
    rl.question("New path of the file or folder:\n", (newName) => {
      crud.renameFileFolder(oldName, newName);
    });
  });
};
// rename file and folder handler
crud.renameFileFolder = function (oldName, newName) {
  fs.rename(constants.ROOT_PATH + oldName, constants.ROOT_PATH + newName, (err) => {
    if (err) {
      console.log("something went wrong.");
      return;
    }
    console.log(`${oldName} renamed successfully to ${newName}`);
  });
};
// move file or folder getting options to fill data
crud.optMoveFileFolder = function () {
  rl.question("Old path of the file or folder:\n", (oldPath) => {
    rl.question("New path of the file or folder:\n", (newPath) => {
      crud.moveFileFolder(oldPath, newPath);
    });
  });
};
// move file or folder handler
crud.moveFileFolder = function (oldPath, newPath) {
  fs.rename(constants.ROOT_PATH + oldPath, constants.ROOT_PATH + newPath, (err) => {
    if (err) throw err;
    else console.log(`${oldPath} moved to ${newPath} successfully!`);
  });
};
// delete file and folder getting options to fill data
crud.optDeleteFileFolder = function () {
  rl.question("Choose an option:\n1. Delete File\n2. Delete Folder\n", (answer) => {
    switch (answer) {
      case "1":
        // delete file
        crud.optDeleteFile();
        break;
      case "2":
        // delete folder
        crud.optDeleteFolder();
        break;
    }
  });
};

module.exports = crud;
