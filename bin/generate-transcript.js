#!/usr/bin/env node

'use strict';

const { token, id, date, output, name } = require('yargs').argv;
const generateTranscript = require('../lib');

(async function() {
  try {
    await generateTranscript({ token, id, date, output, name });
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
})();
