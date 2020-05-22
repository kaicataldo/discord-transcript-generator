# discord-transcript-generator

`discord-transcript-generator` is a command-line utility that generates a transcript for a given day from a Discord Channel. This was developed as a way to easily generate transcripts for [ESLint](https://eslint.org/) Technical Steering Committee meetings from Discord chat logs.

## Usage

The utility will create the transcript by finding all the messages sent on a given date.

### Prerequisites

A registered Discord bot is required to use this utility. If you haven't already done, please follow the instructions [here](https://discordjs.guide/preparations/setting-up-a-bot-application.html) to set it up.

### Arguments

`MEETING_DATE`: The date to generate the transcript from. The date should be formatted to match the output of `Date.prototype.toLocaleDateString()` in your locale.

`MEETING_NAME`: The name of the meeting. Used to add a title to the generated transcript.

`TRANSCRIPT_LOCATION`: A relative path to the directory the transcript should be created in. This is resolved relative to the current working directory.

`CHANNEL_ID`: The ID of the Discord Channel to generate the transcript from.

`BOT_TOKEN`: The token for the registered Discord bot. The user must first register a Discord Bot and add it to their server to use this utility.

### Example Usage

```sh
MEETING_DATE=5/21/2020 MEETING_NAME="ESLint TSC Meeting" TRANSCRIPT_LOCATION="./path/to/transcripts" CHANNEL_ID=735298510354839572 BOT_TOKEN=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9 ./bin/generate-transcript.js
```
