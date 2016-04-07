# Developing Plugins
Developing plugins is very simple - all you need is to export a method, like a normal module, to make a plugin!

Below, you will find a guide about how to make your own plugin. The plugin that you will make will simply let the user run an express server in the current directory.

### Let's get started!
###### Before you begin
Before you begin, install buildup, globally:
```bash
npm install -g buildup
```
Also, you'll need a directory for development:
```bash
mkdir myplugin
cd myplugin
```
###### Scaffolding
First we need some basic scaffolding for our plugin.
In a terminal, run the following:
```bash
$ npm init
```
This will generate a `package.json`, a key part of nodejs modules.

Now we need the `buildup` library.

**You:** Wait, why do I need to install `buildup`?

Well, if you add `buildup` to you plugins dependencies, you can take advantage of the all the `builup` features, such as:

 - `src` detection (get all the files in a directory that end in a certain suffix)
 - The `buildup` logger, so your logging fits in with any other logging
 - Our own error handler

So, let's install `buildup`:
```bash
$ npm install buildup --save
```
So that we can also test our plugin, we will need to create a `buildupfile.js`:
```bash
$ buil
```
