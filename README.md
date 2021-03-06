# Jukebox-1

This project is a site where multiple users can propose songs, and have them played in a synchronized way through Spotify. It is a clone of Josè M. Pèreaz's project that has been restyled. [Josè's Project](https://github.com/JMPerez/c).

## Setting up

The server can be run locally and also deployed to Heroku. You will need to register your own Spotify app and set the credentials in a couple of config files. For that:

1. Create an application on [Spotify's Developer Site](https://developer.spotify.com/my-applications/).

2. Add as redirect uris both http://localhost:3000/auth/callback (for development) and <production_domain>/auth/callback (if you want to deploy your app somewhere).

3. Set your HOST in `config/app.js`.

4. Set your CLIENT_ID and CLIENT_SECRET in `config/auth.js`.

## Dependencies

Install the dependencies running `npm install`.

## Running

During development, run `npm run dev`.

When running on production, run `npm run build && npm run start`.
