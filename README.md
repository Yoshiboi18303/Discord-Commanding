**THIS PACKAGE IS NOT ON NPM YET!**

---

![discord-commanding Logo](https://cdn.discordapp.com/attachments/875773801772757063/876160934916292638/663f25ebc63c4a2d6bf1596083bd20b6.png)

# discord-commanding

A discord.js Command Handler designed to be easy to use!

---

## 📖 Table of Contents 📖

- [Links](#links)

- [Installation](#installation)

- [Setup](#setup)

- [Using MongoDB](#using-mongodb)

- [Using SQLite](#using-sqlite)

- [Events](#events)

---

# Links

- [MongoDB](https://www.mongodb.com/)
- [GitHub Repository](https://github.com/Yoshiboi18303/Discord-Commanding)
- [Discord.js](https://discord.js.org/#/)
- [Mongoose](https://mongoosejs.com/)

---

# Installation

Install [Node.js](https://nodejs.org/en/) then run this in your Terminal

`npm i discord-commanding --save`

---

# Setup and Settings

**You must run `.init()` after you configure the settings, or they will not be saved.**

```javascript
const { Client } = require("discord.js");
const commanding = require("discord-commanding");
const client = new Client({
  // These partials are strongly recommended.
  partials: ["MESSAGE", "REACTION"],
});

client.on("ready", () => {
  console.log("The client is ready.");

  var commander = new commanding.Commander(client, {
    // Where Commands will be located | Default: "commands"
    commandsIn: "./cmds",
    // Whether or not to ignore Bot Users | Default: false
    ignoreBots: true,
  })
    // What is your bot's prefix? | Default: "!"
    .setPrefix()
    // What categories to log (used in commands)
    .setCategories([
      {
        // The name of the category
        name: "cool_category",
        // What emoji to use when using the default help command (supports a Default Discord Emoji, (these next two depend on whether your bot is in the server the emojis are located) an Emoji ID, and a Emoji String)
        emoji: "🍀",
      },
      {
        name: "yes",
        emoji: "858768937553887273",
      },
      {
        name: "balls",
        emoji: "<:slotItem_Orange:858565984427311124>",
      },
    ])
    .init();
});

client.login("Insert Client Token Here");
```

---

# Making Commands

Use this code for making a command with discord-commanding

```javascript
const Commanding = require("discord-commanding");

module.exports = class coolCommand extends Commanding.Command {
  constructor(client) {
    super(client, {
      name: "coolCommandName",
      aliases: ["cc"],
      category: "cool_category",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    });
  }

  run(client, message, args, prefix) {
    // ...
  }
};
```

> Here's a note for the command file || client = A discord.js Client object || message = A Discord Message || args = Arguments || prefix = The current prefix for the bot.

---

# Using MongoDB

discord-commanding comes with built in MongoDB support! You just need to use this little bit of code if you want to use MongoDB!

> Note: If using MongoDB Atlas, you need to enable "Allow Access from Anywhere" (IP: `0.0.0.0/0`) or Mongoose will not be able to connect to your cluster.

```javascript
const commanding = require("discord-commanding");
const { Client } = require("discord.js");
const client = new Client();

client.on("ready", () => {
  console.log("The client is ready");

  const commands = new commanding({
    useMongo: true,
    // Insert basic start here
  })
    .setMongoString("Insert connection string here")
    .init();
});
```

---

# Using SQLite

discord-commanding also comes with built in SQL support. You just need to use this if you're planning to use SQL.

> Note: Using SQL for a database requires a file system to write to, so if you're using anything without that such as Heroku, it won't work.

To start using SQLite, set the "useSQL" option to true.

index.js

```javascript
const commanding = require("discord-commanding");
const { Client } = require("discord.js");
const client = new Client();

client.on("ready", () => {
  console.log("The client is ready");

  const commands = new commanding({
    useMongo: false,
    useSQL: true,
    // Insert basic start here
  }).init();
});
```

Now create that file in the correct Directory and let discord-commanding handle the rest for you!

---

# Events

Here are all the events that come with discord-commanding!

---

## databaseConnected

This gets executed whenever discord-commanding connects to your MongoDB or SQLite database

```javascript
const Commanding = require("discord-commanding");
const { Client } = require("discord.js");
const client = new Client({
  // Client options here
});

client.on("ready", () => {
  console.log("The client is ready.");

  const commander = new Commanding({
    // Insert basic start here.
  });

  commander.on("databaseConnected", (status, database) => {
    console.log(`The ${database} database connection status is "${status}"`);
  });
});
```

---

---

Any problems using anything mentioned in this package? Please join the [Support Server](https://discord.gg/UAVx2bPMp2) and the Developers will be happy to help you out!
