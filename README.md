# SENG-513-Project
- Semester: Fall 2022
- Project name: Go Groceries

## Getting started with this repo

- First, verify that you have node (run `node -v` in your terminal) and npm (`npm -v`) installed on your system. If not already installed, please download and run the installer from the [official NodeJS site](https://nodejs.org/en/).
- Clone the repo and open in the IDE of your choice.
- Change directory into the project folder and run `npm install` to download all of the project dependencies listed in the `package.json`. This will create a `node_modules` directory in the project.

## Running the server

- In our development environment, you can run the command `npm run dev` to locally start the development server. This will run the server with nodemon so that any time you make changes to our server code, it will automatically restart the server for us.
- Otherwise, when we're publishing our website, we can start the production server with `npm run start`.
- After starting the server, you should see a message in your terminal that says `Server listening on port 3000...`.
- You can now open a browser and go to [http://localhost:3000/](http://localhost:3000/). You should see the HTML from `public/index.html` rendered on the page, styled with the styles defined in `public/style.css`. The JS code in `public/app.js` should have also been run on the client. If you're on Chrome, you can open the developer console (CTRL+SHIFT+i) and should see a `hello from client` message there.
- Back in your terminal, you should also now see a new message that says `New web socket connection`. You will get another one of these messages each time you manually refresh that browser tab, or open [http://localhost:3000/](http://localhost:3000/) in another tab.

## Notes about file structure

- Currently, all client-side files are stored in the `public` folder.
- The only server-side code at this point is in `server.js`.
