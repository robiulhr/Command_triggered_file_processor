const fs = require('fs')
const constants = require('./constants')
const helpers = {}

// set file editing state
helpers.fileEditingState = function (state, path) {
  constants.IS_FILE_EDITING = state
  constants.EDITING_FILE_PATH = path
}



module.exports = helpers