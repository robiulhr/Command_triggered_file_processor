const rl = require('./readline_executor')
const helpers = require('./helpers')
const constants = require('./constants')
const commands = constants.commands
const commandHandlers = require('./commandHandlers')
console.log(
  "\ncommands:\n'start crud' - To get crud options.\n'start watcher' - To start the command executor file command.txt\n'stop watcher' - To stop the command executor file command.txt \n'ls' - To get the list of all files and directories on current path\n"
)

rl.on('line', command => {
  // started Commands
  if (command.slice(0, 2) === 'ls') {
    if (command === 'ls') {
      commandHandlers.lsCurrentPath()
    } else {
      const arr = command.split(' ')
      commandHandlers.lsSpecificPath(arr[1])
    }
  } else if (command === 'start watcher') {
    console.log('start watcher.')
    commandHandlers.startWatcher()
  } else if (command === 'stop watcher') {
    console.log('stop watcher.')
  } else if (command === 'start crud') {
    commandHandlers.startCrudTRLHandler()
  } else if (command.slice(0, commands.CREATE.length) === commands.CREATE) {
  } else if (command === 'help') {
  } else if (command === 'commands') {
  } else {
    if (constants.IS_FILE_EDITING && constants.EDITING_FILE_PATH) {
      // take command as content
      const content = command
      fs.writeFile(constants.ROOT_PATH + constants.EDITING_FILE_PATH, content, 'utf-8', err => {
        if (err) console.log('something went wrong.')
        else console.log('\nfile edited successfully.\n')
      })
      helpers.fileEditingState(false, '')
    } else {
      console.log("\ninvalid command. please run 'help' to get instruction or 'commands' to get the list of commands")
    }
  }
})

// FILE editing save and leave
rl.input.on('keypress', (key, data) => {
  if (constants.IS_FILE_EDITING && constants.EDITING_FILE_PATH) {
    if (data.ctrl && data.name === 'l') {
      rl.clearLine(process.stdout, 0)
      console.log('\n')
      helpers.fileEditingState(false, '')
    }
  }
})
