# Node.js WebSocket Broadcast
## Used for a React-Native Control image application

### About
This is the `node.js` server that creates a websocket from the `ws` npm packages. This WebSocket is used for a Flutter application. The app makes it possible to chat on a LAN. 

### Structure
2 main files in the `app` folder:
* `server.js` is used to run the websocket and to listen for incoming connections.


### How to Run
1. `git clone` this repo
2. `cd` into the `websocket` folder
3. Run `npm install` in command line
4. Open `app/config/config.js` and fill in your port where the WebSocket should be running
5. Run `npm start`, this will execute the command `nodemon ./app/server.js`. Now your WebSocket is running

**Notes:**
* It is possible to change the websocket port in the `server.js` file.
* You can find your IP by opening your terminal and type `ipconfig -all` and look for your IPv4 Address.
* If other devices can't reach your WebSocket it means that your firewall is blocking the connection. Follow the steps provided by the article and allow incoming connections to the port that you specified in `config.js` [https://www.blackbaud.com/files/support/infinityinstaller/content/installermaster/cofirewalls.htm](https://www.blackbaud.com/files/support/infinityinstaller/content/installermaster/cofirewalls.htm)
