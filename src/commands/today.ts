import { CommandInteraction, SlashCommandBuilder } from "discord.js";
import { getTodayType } from "./calendar";

export const data = new SlashCommandBuilder().setName("today").setDescription("Get today's schedule");
export async function execute(interaction: CommandInteraction) {
	console.log("Today command executed");
	const todayType = getTodayType();
	if (todayType?.type === "None") {
		return interaction.reply("No School! :partying_face: ");
	} else if (todayType?.type === "Orange") {
		return interaction.reply(`🟠 Today is an orange day! 🟠`);
	} else if (todayType?.type === "Blue") {
		return interaction.reply(`🔵  Today is a blue day! 🔵`);
	} else {
		return interaction.reply(`🛑 Error finding day type for today 🛑`);
	}
}
