# README #

Back-end Mafia-game

### Setup ###

Install locally using `npm i -g nodemon tsc ts-node`.

Next step is configure local Mongo Database.

Best way is create docker container with basic configuration,
then create `mafia` collection and `mafia` user with ReadWrite access permission.

Last step is create .env file in global directory,
then put all requirements environment variables (exists in src/environment/environment.ts file as interface)

If you gone through the steps above, run commands below. 

#### Basic commands ####
`npm run dev` to enable develop server

`npm build` to generate js file
