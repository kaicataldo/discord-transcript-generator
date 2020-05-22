'use strict';

const fs = require('fs').promises;
const path = require('path');
const Discord = require('discord.js');

function messageMatchesDate(message, date) {
  // Ensure that comparisons are done using UTC.
  const targetDate = new Date(date);
  const targetUTCDate = Date.UTC(targetDate.getYear(), targetDate.getMonth(), targetDate.getDate());
  const messageDate = new Date(message.createdTimestamp);
  const messageUTCDate = Date.UTC(messageDate.getYear(), messageDate.getMonth(), messageDate.getDate());
  return targetUTCDate === messageUTCDate;
}

function generateContent(messages, date, name) {
  return `# ${date} ${name ? name + ' ' : ''}Transcript\n\n${messages.map(message => `**${message.author.username}:** ${message.content}`).join('\n\n')}\n`;
}

function getTranscriptMessages(messages, date) {
  return messages
    .filter(message => messageMatchesDate(message, date))
    .sort((a, b) => a.createdTimestamp - b.createdTimestamp)
}

async function fetchMessages(channel, date) {
    let messages = [];

    // Discord's API limits fetching messages to 50 at a time. Continue requesting batches
    // until we either have no messages or find a message from a previous date.
    while (true) {
      const batch = (await channel.messages.fetch(messages.length ? { before: messages[0].id } : undefined)).array();

      if (!batch.length) {
        break;
      }

      messages = [...getTranscriptMessages(batch, date), ...messages];

      if (!messageMatchesDate(batch[batch.length - 1], date)) {
        break;
      }
    }

    return messages.map(message => {
      message.content = message.content.replace(/<@\!?(\d+)>/g, ((match, p1) => `@${channel.client.users.cache.get(p1).username}`));
      return message;
    });
}

module.exports = async function generateTranscript({
  token,
  id,
  date,
  output,
  name = null
}) {
  const client = new Discord.Client();
  const transcriptPath = path.resolve(process.cwd(), output);

  try {
    // Returns a promise, but we don't want to await this because we want
    // to go ahead and register the "ready" event handler.
    client.login(token);

    // Ensure that callback errors are handled.
    await (new Promise((resolve, reject) => {
      client.on('ready', async () => {
        try {
          const channel = await client.channels.fetch(id);
          const messages = await fetchMessages(channel, date);

          await fs.writeFile(transcriptPath, generateContent(messages, date, name));
          resolve();
        } catch (e) {
          reject(e);
        }
      });
    }))
    console.log(`\nTranscript for channel ${id} on ${date} successfully written to ${transcriptPath}.`);
  } catch (e) {
    console.error(e);
    throw e;
  } finally {
    client.destroy();
  }
}
