# Developing Plugins
Developing plugins is very simple - all you need is to export a method, like a normal module, to make a plugin!

Below, you will find a guide about how to make your own plugin. The plugin that you will make will simply let the user run an express server in the current directory.

### Let's get started!
##### Before you begin
Before you begin, install buildup, globally:
```bash
npm install -g buildup
```
Also, you'll need a directory for development:
```bash
mkdir myplugin
cd myplugin
```
##### Scaffolding
First we need some basic scaffolding for our plugin.
Use this `package.json` (feel free to change the name)
```json
{
  "name": "buildup-server",
  "description": "A sample buildup plugin",
  "main": "plugin.js",
  "scripts": {
    "start": "buildup server"
  }
}
```
**An impotant notice about plugin names:** Always start a plugin's name with `buildup-`

Now we need the `buildup` library.

Why do I need to install `buildup`?

Well, if you add `buildup` to your plugin's dependencies, you can take advantage of the all the `buildup` features, such as:

 - `src` detection (get all the files in a directory that end in a certain suffix)
 - The `buildup` logger, so your logging fits in with any other logging
 - Our own error handler

So, let's install `buildup`:
```bash
npm install buildup --save
```
So that we can also test our plugin, we will need to create a `buildupfile.js`.  Put this in a `buildupfile.js`:
```javascript
const plugin = require('./plugin.js');
module.exports = (buildup) => {
  buildup.task('server', (done) => {
    plugin();
    done();
  })
}
```
This should create a `buildupfile.js` in the current directory.

We also need a server to test with. For our test server, we are going to use `express`:
```bash
npm install express --save
```
Now, put the following into an`app.js` file:
```javascript
'use strict'
const express = require('express');
let app = express();
// Routes
app.get('/', (req, res) => {
  res.send("You've made a buildup plugin!");
})
module.exports = (port) => {
  port = port || process.env.PORT || 8181
  app.listen(port, () => {
    console.log(`Listening on port ${port}.`);
  })
}
```

Finally, we need a file for our plugin logic. Put this in a `plugin.js` file:
```javascript
// Put this in a file, such as 'plugin.js'
// Require the buildup libraries
const buildup = require('buildup');
// Our plugin method
module.exports = (options) => {
  // Here is our plugin logic
  console.log('Plugin is working!');
}
```

If you now run `buildup server` , you should see the following, in your terminal:
```
$ buildup server
Plugin is working!
```

Well done! You are all set up to start making your plugin!

##### Making the plugin
Let's start by making our server run. In the `plugin.js` file's module dependencies, add the following line:
```javascript
// This line requires our server file
const server = require('./app.js');
```
To add to this, we need to start the server. Add the following to the plugin method:
```javascript
server();
```
Now, if we run `builup server`, on screen we should see:
```
$ buildup server
Plugin is working!
Listening on port 8181.
```
Go ahead and fire up your favorite browser and go to http://localhost:8181. On screen you should see:
