# Open RPG
## What?

An application to create and manage your Fate characters.

Down the line, We'd like this app to allow its users to play Fate games.

## Fate?

Yes, Fate.

Some resources to help understand it:

- https://en.wikipedia.org/wiki/Fate_(role-playing_game_system)
- https://fate-srd.com/

## How to contribute?

Pull requests, issues, ya know...

### Install?

Pre-requisite:

- Java 8+ (I use Java 13 as of April 2020)
- Maven 3.6.0
- Node 13.10.1/yarn 1.19.2 (Just use the latest of these)
- Some type of mongodb (container or not)

Install:

    mvn clean install

Run the jar:

    java -jar PROJECT_DIRECTORY/target/open-rpg-VERSION.jar
    
Make sure port 8080 is available, or customize it in a new spring 
properties file.

Once running, open your web browser to http://localhost:8080.

You can also run the frontend using:

    yarn start
