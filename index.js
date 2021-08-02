//Pinging; You only need this part if you want to host the bot.
const express = require("express");
const app = express();
const port = 3000;

app.get("/", (req, res) => res.send("I am alive!"));

app.listen((port) => console.log("Listening to webserver"));

//Dependencies
const { Client, Collection, Intents } = require("discord.js");
const mongoose = require("mongoose");
const fs = require("fs");
const glob = require("glob");
const { promisify } = require("util");

//Initiating the client
const client = new Client({
  intents: Intents.ALL,
});
const globPromise = promisify(glob);
global.client = client;

//Client variables
client.commands = new Collection();
client.events = new Collection();
client.aliases = new Collection();
client.cooldowns = new Collection();
client.owners = ["742972160158728283"];
client.categories = new Set();
client.prefix = "s!";
client.schemas = {
  winners: require("./schemas/winners"),
};

(async () => {
  const commandFiles = await globPromise(`${__dirname}/commands/**/*.js`);
  const eventFiles = await globPromise(`${__dirname}/events/**/*.js`);

  eventFiles.map((value) => {
    const file = require(value);
    client.events.set(file.name, file);
    client.on(file.name, file.run.bind(null, client));
  });

  commandFiles.map((value) => {
    const file = require(value);
    client.commands.set(file.name, file);
    client.categories.add(file.category);

    if (file.aliases) {
      file.aliases.map((value) => client.aliases.set(value, file.name));
    }
  });
})();

client.login(process.env.token);
