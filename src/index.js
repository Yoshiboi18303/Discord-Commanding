require("colors");
const { Client, Guild, GuildEmoji } = require("discord.js");
const mongoose = require("mongoose");
const Commander = require("./classes/Commander");
const Command = require("./classes/Command");
const Features = require("./classes/Features");
const josh = require("@joshdb/core");
const sqlite = require("@joshdb/sqlite");

const logger = require("./classes/Logger");

/**
 * @typedef
 */
class CommandHandler {
  /**
   * @param {Client} client A Discord.js Client.
   * @param {Object} options Options to initialize the CommandHandler (Command Handler) class with.
   */
  constructor(
    client,
    options = {
      useMongo: false,
      useSQL: false,
      commandsIn: "./commands/",
      showWarns: true,
    }
  ) {
    if (!client || typeof client == "undefined")
      throw new logger.error(
        "DISCORD-COMMANDING >> No discord.js client detected as the first argument."
      );
    if (typeof client != Client)
      throw new logger.error(
        "DISCORD-COMMANDING >> Invalid client type (needs to be a discord.js Client)"
      );
    if (!commandsIn || typeof commandsIn == "undefined") {
      if (options.showWarns) {
        logger.warn('No commands directory was defined, using "commands"!');
      }
    }

    Object.defineProperty(this, "client", { value: "client" });

    /**
     * Should the Handler use MongoDB?
     * @type {Boolean}
     */
    this.useMongo = options.useMongo;

    /**
     * The handler Logger
     * @type {Function}
     */
    this.logger = new logger(this);

    /**
     * Should the Handler use SQLite?
     @type {Boolean}
     */
    this.useSQL = options.useSQL;

    /**
     * The base Command interface
     * @type {Command}
     */
    this.Command = Command;

    /**
     * MongoDB Connection String
     * @type {String}
     */
    this.mongoString = "";

    /**
     * Prefix of the bot
     * @type {String}
     */
    this.prefix = "!";

    /**
     * Whether or not to show warnings in the console
     * @type {Boolean}
     */
    this.showWarns = options.showWarns;

    if (typeof this.showWarns == "undefined") this.showWarns = true;

    if (typeof this.showWarns !== "boolean")
      logger.error(
        "DISCORD-COMMANDING >> showWarns needs to be a Boolean (either a true or false statement)!"
      );

    /**
     * What servers to use for the testOnly part of the constructor in a command
     * @type {String | Array<String>}
     */
    this.testServers = options.testServers;

    if (typeof this.testServers === String) {
      this.testServers = [];
    }

    /**
     * What Default Commands to disable from use
     * @type {Array<String>}
     */
    this.disabledDefaultCommands = options.disabledDefaultCommands;

    /**
     * All the options for the Database
     * @type Object | {}
     */
    this.dbOptions = options.dbOptions;

    if (!this.dbOptions || typeof this.dbOptions == "undefined") {
      this.dbOptions ==
        {
          keepAlive: true,
          useUnifiedTopography: true,
          useNewUrlParser: true,
          useFindAndModify: false,
        };
    } else {
      this.dbOptions ==
        {
          keepAlive: true,
          useUnifiedTopography: true,
          useNewUrlParser: true,
          useFindAndModify: false,
          ...this.dbOptions,
        };
    }

    /**
     * Where to make message translations
     * @type {String}
     */
    this.messagesPath = options.messagesPath;

    const { partials } = client.options;

    if (
      !partials ||
      !partials.includes("MESSAGE") ||
      !partials.includes("REACTION")
    ) {
      logger.warn(
        "DISCORD-COMMANDING >> It is recommended that you use the MESSAGE and REACTION partials in your client for the Default Help Command to work (otherwise just disable it)! | Please see: https://github.com/Yoshiboi18303/Discord-Commanding/blob/main/README.md#Using-The-Package"
      );
    }
  }

  init() {
    if (this.useMongo) {
      if (typeof this.mongoString == "undefined")
        logger.error(
          `DISCORD-COMMANDING >> Settings say to use MongoDB, but no connection URL was provided.`
        );

      mongoose
        .connect(this.mongoString, {
          useUnifiedTopography: true,
          useNewUrlParser: true,
        })
        .then(logger.log("DISCORD-COMMANDING >> Connected to MongoDB!"));
    }
  }

  /**
   * Sets your project's MongoDB Connection String
   * @param {String} url The connection string
   */
  setMongoString(url) {
    if (!url)
      console.warn(
        "DISCORD-COMMANDING >> No connection string was provided, some features may not work!\nPlease see: https://github.com/Yoshiboi18303/Discord-Commanding#using-mongodb"
      );

    if (
      (url && !url.startsWith("mongodb://")) ||
      !url.startsWith("mongodb+srv://")
    )
      throw new Error(
        "DISCORD-COMMANDING >> Invalid MongoDB connection string."
      );

    this.mongoString = url;

    return this;
  }

  setPrefix(prefix) {
    this.prefix = prefix;

    return this;
  }
}

class packageOptions {
  constructor(options) {
    this.showWarns = Boolean;
    this.delMessages = Number;
  }
}

module.exports = CommandHandler;
