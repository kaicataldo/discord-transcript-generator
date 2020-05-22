# discord-transcript-generator

`discord-transcript-generator` is a command-line utility that generates a Markdown transcript for a given day from a Discord Channel. This was developed as a way to easily generate transcripts for [ESLint](https://eslint.org/) Technical Steering Committee meetings from Discord chat logs.

## Usage

The utility will create the transcript by finding all the messages sent on a given date.

### Prerequisites

A registered Discord bot is required to use this utility. If you haven't already done, please follow the instructions [here](https://discordjs.guide/preparations/setting-up-a-bot-application.html) to set it up.

### Arguments

`date`: The date to generate the transcript from. The date should be formatted to match the output of `Date.prototype.toLocaleDateString()` in your locale.

`output`: An output file path. This is resolved relative to the current working directory.

`id`: The ID of the Discord Channel to generate the transcript from.

`token`: The token for the registered Discord bot. The user must first register a Discord Bot and add it to their server to use this utility.

`name` (optional): The name of the meeting. Used to add a title to the generated transcript. If not given, only the given date will appear in the title.

### Example Usage

```sh
./bin/generate-transcript.j --date=5/21/2020 --name="ESLint TSC Meeting" --output="./path/to/transcripts/2020-05-21.md" --id=735298510354839572 token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9
```
