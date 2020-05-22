'use strict';

const fs = require('fs').promises;
const path = require('path');
const Discord = require('discord.js');

function messageMatchesDate(message, date) {
  return new Date(message.createdTimestamp).toLocaleDateString() === date;
}

function generateFileName(date) {
  return `${date.replace(/\//g, '-')}.md`;
}

function generateTranscript(messages, date, name) {
  return `# ${date} ${name} Transcript\n\n${messages.map(message => `**${message.author.username}:** ${message.content}`).join('\n\n')}\n`;
}

function getTranscriptMessages(messages, date) {
  return messages
    .filter(message => messageMatchesDate(message, date))
    .sort((a, b) => a.createdTimestamp - b.createdTimestamp)
}

async function fetchMessages(channel, date) {
    let messages = [];

    while (true) {
      const batch = (await channel.messages.fetch(messages.length ? { before: messages[0].id } : undefined)).array();

      if (!batch.length) {
        break;
      }

      messages = [...getTranscriptMessages(batch, date), ...messages];

      if (!messageMatchesDate(batch[0], date)) {
        break;
      }
    }

    return messages.map(message => {
      message.content = message.content.replace(/<@\!?(\d+)>/g, ((match, p1) => `@${channel.client.users.cache.get(p1).username}`));
      return message;
    });
}

const {
  BOT_TOKEN,
  CHANNEL_ID,
  MEETING_DATE,
  MEETING_NAME,
  TRANSCRIPT_LOCATION
} = process.env;
const client = new Discord.Client();

client.on('ready', async () => {
  try {
    const channel = await client.channels.fetch(CHANNEL_ID);
    const messages = await fetchMessages(channel, MEETING_DATE);
    const transcriptPath = path.resolve(process.cwd(), TRANSCRIPT_LOCATION, generateFileName(MEETING_DATE));

    await fs.writeFile(transcriptPath, generateTranscript(messages, MEETING_DATE, MEETING_NAME));
  } catch (e) {
    console.error(e);
  } finally {
    client.destroy();
  }
});

client.login(BOT_TOKEN);
