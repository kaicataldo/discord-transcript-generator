'use strict';

const fs = require('fs').promises;
const path = require('path');
const Discord = require('discord.js');

const {
  BOT_TOKEN,
  CHANNEL_ID,
  MEETING_DATE,
  MEETING_NAME,
  TRANSCRIPT_LOCATION
} = process.env;

function generateFileName(date) {
  return `${date.replace(/\//g, '-')}.md`;
}

function generateTranscript(messages, date, name) {
  return `# ${date} ${name} Transcript\n\n${messages.map(message => `**${message.author.username}:** ${message.content}`).join('\n')}\n`;
}

const client = new Discord.Client();

client.on('ready', async () => {
  try {
    const channel = await client.channels.fetch(CHANNEL_ID);
    const messageCollection = await channel.messages.fetch();
    const messages = messageCollection
      .array()
      .filter(message => new Date(message.createdTimestamp).toLocaleDateString() === MEETING_DATE)
      .sort((a, b) => a.createdTimestamp - b.createdTimestamp)
    const transcriptPath = path.resolve(process.cwd(), TRANSCRIPT_LOCATION, generateFileName(MEETING_DATE));

    await fs.writeFile(transcriptPath, generateTranscript(messages, MEETING_DATE, MEETING_NAME));
  } catch (e) {
    console.error(e);
  } finally {
    client.destroy();
  }
});

client.login(BOT_TOKEN);
