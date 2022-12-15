# SENG-513-Project
- Semester: Fall 2022
- Project name: Go Groceries

## Group Members:
- Hafsa Zia (30076662)
- Isabella Guimet Pedraz (30040654)
- Soumya Praveen Kumaria (10124004)
- Sydney Kwok (30073206)
- Vi Tsang (30063550)
- YuJeong Chae (30091378)



## Getting started with this repo

- First, verify that you have node (run `node -v` in your terminal) and npm (`npm -v`) installed on your system. If not already installed, please download and run the installer from the [official NodeJS site](https://nodejs.org/en/).
- Clone the repo and open in the IDE of your choice.
- Change directory into `SENG-513-Project/server` and run `npm install` to download all of the project dependencies listed in the `package.json`. This will create a `node_modules` directory.

## Running the server
Note: these commands are to be run from within the `server` directory.
- In our development environment, you can run the command `npm run dev` to locally start the server.
- After starting the server, you should see a message in your terminal that says `Server listening on port 3000...`.
- You can now open a browser and go to [http://localhost:3000/](http://localhost:3000/). At this point, you should see a login page and can begin using our app as outline in the `User Manual` secion of our report.
- Back in your terminal, you should also now see a new message that says `New web socket connection`. You will get another one of these messages each time you manually refresh that browser tab, or open [http://localhost:3000/](http://localhost:3000/) in another tab. To stop the server, you can CTRL+C in your terminal.

## Notes about file structure

- All client-side files are stored in the `client` folder.
- All server-side code is in the `server` directory.
