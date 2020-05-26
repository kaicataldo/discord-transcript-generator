# discord-transcript-generator

[![npm](https://img.shields.io/npm/v/discord-transcript-generator.svg?style=flat-square)](https://www.npmjs.com/package/discord-transcript-generator/)
[![node](https://img.shields.io/node/v/discord-transcript-generator.svg?style=flat-square)](https://nodejs.org/en/)

`discord-transcript-generator` is a command-line utility that generates a Markdown transcript for a given day from a Discord Channel's chat logs. This was developed as a way to easily generate transcripts for [ESLint](https://eslint.org/) Technical Steering Committee meetings.

## Installation

```sh
npm install discord-transcript-generator
```

or

```sh
yarn add discord-transcript-generator
```

The utility can be installed and used locally or globally.

## Usage

### Prerequisites

A registered Discord bot is required to use this utility. If you haven't already done so, please follow the instructions [here](https://discordjs.guide/preparations/setting-up-a-bot-application.html) to set one up.

### CLI usage

When used on the command-line, please use the following arguments.

#### Arguments

`date`: The date to generate the transcript from. This should be a valid date for JavaScript's `Date` constructor. It is treated as UTC.

`output`: An output file path. This is resolved relative to the current working directory.

`id`: The ID of the Discord Channel to generate the transcript from.

`token`: The token for the registered Discord bot. The user must first register a Discord Bot and add it to their server to use this utility.

`name` (optional): The name of the meeting. Used to add a title to the generated transcript. If not given, only the given date will appear in the title.

#### Example

```sh
generate-discord-transcript \
  --date=5/21/2020 \
  --output=./path/to/transcripts/2020-05-21.md \
  --id=735298510354839572 \
  --token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9 \
  --name="ESLint TSC Meeting"
```
