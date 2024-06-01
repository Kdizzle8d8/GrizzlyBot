import { CommandInteraction, SlashCommandBuilder } from "discord.js";
import { getDayType, getTodayType } from "./calendar";

export const data = new SlashCommandBuilder()
	.setName("date")
	.setDescription("get if a day is orange or blue")
	.addStringOption((option) => option.setName("date").setDescription("The date you want to check").setRequired(true));

export async function execute(interaction: CommandInteraction) {
	console.log("Today command executed");
	// const date = "12/3";
	const date = interaction.options.getString("date");
	const [month, day] = date.split("/");
	const dayType = getDayType(parseInt(month), parseInt(day));
	if (dayType?.type === "None") {
		return interaction.reply("No School! :partying_face: ");
	} else if (dayType?.type === "Orange") {
		return interaction.reply(`🟠 On ${date} it is an orange day! 🟠`);
	} else if (dayType?.type === "Blue") {
		return interaction.reply(`🔵 On ${date} it is a blue day! 🔵`);
	} else {
		return interaction.reply(`🛑 Error finding day type for ${date}! 🛑`);
	}
}
