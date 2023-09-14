# Built during AI Takeover in [LostFR8 discord](discord.lostfr8.com) Sept 13, 2023

## setup
Create an account at ascendtms.com
Get an API key from openai

Make a copy of base.env and rename it to .env, fill in values

Install requirements with `npm i`

**NOTE**: Bun has issues with the ask-user loop, and will exit after first question is answered. Recommended to use `node index.js`.

## usage

Run main file with `node index.js`

The bot can lookup information about a load on the board, give it a load id and ask about the shipment info.

i.e.
> What is the commodity and weight of load 7?

Updating weight is present in the agent tools but currently not working ☹️


## Demo

https://github.com/The-Please-Advisory-Group/built-at-ai-takeover-9-13/assets/9594539/00ad543a-c800-4dae-abbb-2f56abf7331c

