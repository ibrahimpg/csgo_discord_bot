const Discord = require('discord.js');
const client = new Discord.Client();

client.on('ready', () => {

  // Console logging pertinent info for devs + setting bot user activity

  console.log('Connected as ' + client.user.tag);
  client.user.setActivity('CS:GO');
  client.guilds.cache.forEach((guild) => console.log(guild.name));
  guild.channels.cache.forEach((channel) => {
    console.log(` - ${channel.name} ${channel.type} ${channel.id}`);
  });

  /*
  Sends introductory info, how to interact with the bot, to a specified server
  You can comment this out after first deploy or else it will keep firing off this message every time server resets
  Can also be re-factored to check the channel if this exact message exists and not send in that case
  */

  client.channels.cache.get(process.env.INTRO_CHANNEL).send(`
  :skull: :skull: :skull: :skull: :skull: :skull: :skull: :skull: :skull: :skull: :skull: :skull: :skull: :skull: :skull:

  **Specify a map**
  Head to ${process.env.CALL_CHANNEL}
  Type one of the following commands...
  **!assault !dust !dust2 !office**
  ...followed by a time. You also have the option to specify AM/PM.

  **Examples** 
  !assault 3:34
  !dust 5:55
  !dust2 now
  !assault right now
  !office 2:24 AM
  !dust2 8:15 PM

  **Cancel A Call**
  !cancelassault
  !canceldust
  !canceldust2
  !canceloffice
  `);

});

client.on('message', (receivedMessage) => {

  // create separate vars for map + time
  let fullCommand = receivedMessage.content.substr(1);
  let splitCommand = fullCommand.split(" ");
  let primaryCommand = splitCommand[0];
  let arguments = splitCommand.slice(1);

  // prevent bot from infinite loop
  if(receivedMessage.author == client.user) {
    return;
  }

  // cs_assault
  if(receivedMessage.content.startsWith("!assault")) {
    if (arguments.length == 0) {
    receivedMessage.channel.send("Please give a command with the following format: !assault 3:30 PM");
    } else {
    const assaultEmbed = new Discord.MessageEmbed()
      .setColor('#32CD32')
      .setTitle("Assault Call at " + (arguments[0].substr(0,15)) + " " + (arguments[1] || '').substr(0,12))
      .setAuthor('Scheduled by @' + receivedMessage.author.username)
    client.channels.cache.get(process.env.RECEIVE_CHANNEL).send(assaultEmbed);
    }
  }

  // cs_assault cancel
  if(receivedMessage.content.startsWith("!cancelassault")) {
    const assaultcancelEmbed = new Discord.MessageEmbed()
      .setColor('#800000')
      .setTitle(`:x: Assault Call Scheduled by @${receivedMessage.author.username} CANCELED :x:`)
    client.channels.cache.get(process.env.RECEIVE_CHANNEL).send(assaultcancelEmbed);
  }

  // dust
  if(receivedMessage.content.startsWith("!dust")) {
    if (arguments.length == 0) {
    receivedMessage.channel.send("Please give a command with the following format: !dust 3:30 PM");
    } else {
    const dustEmbed = new Discord.MessageEmbed()
      .setColor('#32CD32')
      .setTitle("Dust call at " + (arguments[0].substr(0,16)) + " " + (arguments[1] || '').substr(0,12))
      .setAuthor('Scheduled by @' + receivedMessage.author.username)
    client.channels.cache.get(process.env.RECEIVE_CHANNEL).send(dustEmbed);
    }
  }

  // dust cancel
  if(receivedMessage.content.startsWith("!canceldust")) {
    const dustcancelEmbed = new Discord.MessageEmbed()
      .setColor('#800000')
      .setTitle(`:x: Dust Call Scheduled by @${receivedMessage.author.username} CANCELED :x:`)
    client.channels.cache.get(process.env.RECEIVE_CHANNEL).send(dustcancelEmbed);
  }

  // dust2
  if(receivedMessage.content.startsWith("!dust2")) {
    if (arguments.length == 0) {
    receivedMessage.channel.send("Please give a command with the following format: !dust2 3:30 PM");
    } else {
    const dust2Embed = new Discord.MessageEmbed()
      .setColor('#32CD32')
      .setTitle("Dust2 call at " + (arguments[0].substr(0,15)) + " " + (arguments[1] || '').substr(0,12))
      .setAuthor('Scheduled by @' + receivedMessage.author.username)
    client.channels.cache.get(process.env.RECEIVE_CHANNEL).send(dust2Embed);
    }
  }

  // dust2 cancel
  if(receivedMessage.content.startsWith("!canceldust2")) {
    const dust2cancelEmbed = new Discord.MessageEmbed()
      .setColor('#800000')
      .setTitle(`:x: Dust2 Call Scheduled by @${receivedMessage.author.username} CANCELED :x:`)
    client.channels.cache.get(process.env.RECEIVE_CHANNEL).send(dust2cancelEmbed);
  }

  // office
  if(receivedMessage.content.startsWith("!office")) {
    if (arguments.length == 0) {
    receivedMessage.channel.send("Please give a command with the following format: !office 3:30 PM");
    } else {
    const officeEmbed = new Discord.MessageEmbed()
      .setColor('#32CD32')
      .setTitle("Office Call at " + (arguments[0].substr(0,15)) + " " + (arguments[1] || '').substr(0,12))
      .setAuthor('Scheduled by @' + receivedMessage.author.username)
    client.channels.cache.get(process.env.RECEIVE_CHANNEL).send(officeEmbed);
    }
  }

  // Office Cancel
  if(receivedMessage.content.startsWith("!canceloffice")) {
    const officecancelEmbed = new Discord.MessageEmbed()
      .setColor('#800000')
      .setTitle(`:x: Office Call Scheduled by @${receivedMessage.author.username} CANCELED :x:`)
    client.channels.cache.get(process.env.RECEIVE_CHANNEL).send(officecancelEmbed);
  }

})

client.login(process.env.secret_key);