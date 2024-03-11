# Command Triggered File Processor (Extended)

This is the extended version of a project from an Udemy course named [Understanding Node.js: Core Concepts](https://www.udemy.com/share/109PLK/) by [Joseph Heidari](https://www.udemy.com/user/joseph-heidari-3/)

This is a project to do crud operations based on a given command.

## Features

This project works for two scenarios

1. It watches a file and does the work on a given command when the file gets saved. ![command executor file demo](./gif/command%20executor%20file%20watcher.gif)

2. It works for the terminal. when the command is given in the terminal it should do the the task on given command (It should work just like the nano editor of the terminal). ![run command on terminal and do stuff](./gif/Crud%20operation%20-%20create%20file%20demo.gif)

## Capabilities

This project supports different file operations and terminal commands.

1. `ls` command (check files and folders inside root folder) ![ls command](./img/ls%20command.png)

2. `create` command (creates file/folder)

3. `edit` command (edit file content)

4. `read` command (read file content)

5. `rename` command (rename file/folder name)

6. `move` command (move file/folder to the desired destination)

7. `unlink` command (delete file)

8. `rmempdir` command (delete empty folder)

9. `rmfulldir` command (delete a folder which contains files and folders inside)

> [Note: There are more operations and commands in the queue to implement.]
