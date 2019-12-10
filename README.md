# control-image-lan

> A react-native demo about controlling image on different smartphones in lan

We can Cross-screen control image in lan now.

This project has server which provides Websocket service.

## Install

Before running this project, you must have [Node.js](https://nodejs.org/en/) in your computer and [Expo](https://expo.io/) App in your smartphones.

1. install the expo-cli

        npm install -g expo-cli
2. clone this project where you like

        git clone <url>
3. download the dependencies

        npm install
4. download the dependencies for websocket server

        cd websocket && npm install
5. setting port for server in `./config/config.js` or do nothing

6. run server

        npm start
7. run this project

        cd .. && npm start

## Usage

Scanning QR code which would be generated after running this project Using Expo App.

Then you would see the UI.

You can change the websocket link to connect your Websocket Server. You must change the IP to that of your computer which running the websocket Server. (*You can find your IP by opening your terminal and type `ipconfig -all` and look for your IPv4 Address*)

There are two IconButton in the App. One could connect to the Server, the other could set this phone status sendable or receivable.

> Note: At any moment, ONLY one phone is sendable status and others must be receivable status.

At last, you could enjoy controlling many phones' image by using one sendable phone if these phone all connect to the Websocket Server.