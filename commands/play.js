const StationFile = require("../stations/stations");

module.exports = {
	name: 'play',
	description: 'Stream from a chosen radio.',
	execute(message, args) {
		const stations = StationFile.stations;

    if (!message.member.voiceChannel) {
      message.channel.send("You are currently not in a voice channel. Join a voice channel and try again.")
      return;
    }

		if (stations.every(station => station.id != args[0])) {
			message.channel.send(`\`${args[0]}\` is not a valid station.`);
			return;
		}

		StationFile.stations.forEach(function(station) {
			if (station.id === args[0]) {
				message.member.voiceChannel.join().then(connection => {
		      console.log(`Connected to ${connection.channel.name} voice channel. Playing ${station.name}`);

		      connection.playArbitraryInput(station.url, {volume: .05});
		    })
		    .catch(console.log);
			}
    });
	},
};
