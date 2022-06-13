import * as Discord from "discord.js";

declare module "discord-commanding" {
  class CommandHandler {
    constructor(client: Discord.Client, options: HandlerOptions);

    commandsIn(path: string): this;
    messagesIn(path: string): this;
    setMongoString(url: string): this;
    setSQLFile(path: string): this;
    disabledDefaultCommands: string | Array<string>;
    setDefaultPrefix(prefix: string): this;
    setDisplayName(displayName: string): this;
    setColor(color: string): this;
  }

  class Command {
    name: string;
    aliases: Array<string>;
    description: string;
    testOnly: boolean;
    ownerOnly: boolean;
    userCooldown: number;
    guildCooldown: number;
  }

  class Event {
    name: string;
    execute(parameters: any): this;
  }

  class Features {}

  interface HandlerOptions {
    showWarns: boolean;
    verbose: boolean;
    useMongo: boolean;
    useSQL: boolean;
    useCustomReadyEvent: boolean;
    typescript: boolean;
    botOwners: string | Array<string>;
  }
}
