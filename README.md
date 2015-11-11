# BattleHack 2015 Finals Demo

This project is the BattleHack 2015 World Finals Demo. It's a simple Node.js Express server that
displays a Braintree v.zero JavaScript integration and triggers a Particle Core via a remote URL.

## Running the project

1. Clone the repository
2. Run `npm install` in the project's root folder
3. Run `npm start` to run the server
4. Navigate to `localhost:3000` to open the page
5. Enter a valid Braintree test credit card like `4111 1111 1111 1111` and a valid card expiry date
6. Execute the payment & enjoy

## Connecting the hardware

The project uses a Particle Core in order to trigger a relay to turn on power on a connected device. Check out [sketch.ino](sketch.ino) to see the (very minimal) code.

In order to make this project work with your own Particle device you'll want to change the `deviceID` and `token` variables in [index.js](routes/index.js).

## Controlling Spotify on OSX

In order to control Spotify on Mac OS the node module [spotify-node-applescript](http://github.com/andrehaveman/spotify-node-applescript) is being used. 

To change the song that's playing after a successful payment got executed you'll want to modify the track's ID in [index.js](routes/index.js):

```
spotify.playTrack('spotify:track:TRACK-ID-HERE', function () {
	// Do something here
}
```