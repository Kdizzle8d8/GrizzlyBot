import { Client, Events, GatewayIntentBits, Collection } from "discord.js";
import dotenv from "dotenv";
import { deployCommands } from "./deploy-commands";
import { commands } from "./commands";
dotenv.config();

// Ensure you have all the necessary intents
const client = new Client({
	intents: [
		GatewayIntentBits.Guilds,
		GatewayIntentBits.GuildMessages, // This intent is necessary to receive messages
		GatewayIntentBits.MessageContent, // This is required to read message content
	],
});

// When the client is ready, this code runs (only once).
client.once(Events.ClientReady, (readyClient) => {
	console.log(`Ready! Logged in as ${readyClient.user.tag}`);
});

client.on("guildCreate", async (guild) => {
	await deployCommands({ guildId: guild.id });
});
client.on("interactionCreate", async (interaction) => {
	console.log("Interaction Created");
	if (!interaction.isCommand()) {
		console.log("not a command");
		return;
	}
	const { commandName } = interaction;
	if (commands[commandName as keyof typeof commands]) {
		console.log("Command found");
		commands[commandName as keyof typeof commands].execute(interaction);
	}
});

// Event listener for new messages
client.on(Events.MessageCreate, (message) => {
	console.log("Message Created");
	if (message.content.startsWith("!date")) {
		const args = message.content.split(" ");
		if (args.length === 3) {
			const day = args[2];
			const month = args[1];
			const dayType = getDayType(parseInt(day), parseInt(month));
			if (dayType.type === "None") {
				message.reply("No School!");
			} else {
				message.reply(`On ${month}/${day}, it is a ${dayType.type} day!`);
			}
		} else {
			message.reply("Invalid command. Usage: !date <day> <month>");
		}
	}
});

// Log in to Discord with your client's token
client.login(process.env.DISCORD_TOKEN);
