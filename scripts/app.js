/*
======VIDEO GAME FRANCHISE ANNUALIZER======
A thing that Nick Cummings wrote - say hi at http://www.nickcummings.com/ or @nickcummings

=======INTRODUCTION========

So let's describe how we're gonna do all this:

This is a video game franchise annualizer. 
It generates the names and positive and negative traits of each game 
in the series, outputs a Metacritic score using some intentionally 
sketchy math, and after 2-10 iterations kills off the franchise for
one of several random, predetermined reasons.

Users will be able to share their franchise's name, key traits and
Metascore through Twitter.

=======PROCESS======
I. Initialization
a. Define all descriptors: Create arrays for names, positive traits, negative traits
b. Create array for review quotes, positive and negative
c. Create array to hold all game names
II. Process Iterations
III. Output Results
IV. Kill the franchise once it's overstayed its welcome
*/

// Hide results section

window.onload = function() {document.getElementById("gameNameSection").style.visibility="hidden"};

// Create arrays for game name components
var gameNamesPrefixes = [
	"Super",
	"Mega",
	"Ultra",
	"Hyper",
	"Raging",
	"Even More",
	"We Made Another",
	"Here's More",
	"The Next",
	"Oh Boy, Here's More",
	"Return to",
	"Revenge of",
	"Zero Escape:",
	"Return of",
	"Son of",
	"Bride of",
	"Ms.",
	"&Uuml;ber",
	"Ultimate",
	"Extreme",
	"Based",
	"Uncanny",
	"All-Star",
	"The Curse of",
];
// console.log("Prefixes are: " + gameNamesPrefixes);

var gameNamesAdjectives = [
	"Call of",
	"The Legend of",
	"Seven Years in",
	"Saved By the",
	"Kawaii Dating no",
	"Cabela's",
	"Mario",
	"Paper",
	"Cruis'n",
	"Doki Doki",
	"Nigel Mansell's",
	"Lee Carvallo's",
	"Hey! Let's Go!",
	"Metal Gear",
	"The Adentures of",
	"Shin Megami Tensei",
	"Final",
	"Mass",
	"Rockstar's",
	"Tom Morello's",
	"Gene Schalit's",
	"Tom Clancy's",
	"Jose Canseco's",
	"Harry Belafonte's",
	"Confessions of",
	"Interview with the",
	"Medal of",
	"Dead",
	"Clive Barker's",
	"Neal Stephenson's",
	"Gaius Baltar's",
	"Tobias F\xFCnke's",
	"Pat Sajak's",
	"Romance of the",
	"Ninja",
	"American McGee's",
	"American",
	"Jingoistic",
	"High School",
	"Dragon Ball",
	"Mountain Dew",
	"Red Dead",
	".hack",
	"Howard Zinn's",
	"World of",
	"My Little",
	"The Perks of Being",
	"Ayn Rand's",
	"Codename:",
	"Master of",
	"Imagine:",
	"Are You There, God? It's Me,",
	"Modern",
	"Dangerous High School Girls in",
	"Excitebike",
	"BlazBlue",
	"Sid Meier's",
	"Jane's",
	"Panzer Dragoon",
	"God of",
	"Day of the",
	"Cards Against",
	"The Hitchhiker's Guide to",
	"A Game of",
	"The Walking",
	"Corpse",
	"Shadows of",
	"Guy Fieri's",
	"You Don't Know",
	"The Longest",
	"Tony Hawk's",
	"Dave Mirra's",
	"Kelly Slater's",
	"Jonathan Blow's",
	"Record of",
	"Mortal",
	"Hatsune Miku",
	"The Clash at",
	"Crash 'n' the",

];
// console.log("Adjectives are: " + gameNamesAdjectives);

var gameNamesNouns = [
	"Warfare",
	"Combat",
	"Duty",
	"Blood",
	"Death",
	"Tanks",
	"Ponies",
	"Distortion",
	"Too Human",
	"Dead People",
	"Zombies",
	"Nazi Zombies",
	"Nazi Commie Zombies",
	"Zelda",
	"Bilbo",
	"Dudebro",
	"Paperboy",
	"Zork",
	"Racing",
	"Pro-Am Racing",
	"USA",
	"Panic",
	"Bonestorm",
	"Bloodstorm",
	"Putting Challenge",
	"Football",
	"Fooseball",
	"Table Tennis",
	"Prenatal Care",
	"Batman Batman Batman",
	"Solid",
	"Splinter Cell",
	"Dancing Challenge",
	"Casino Kid",
	"Rad Racing",
	"Teleroboxer",
	"Galactic Pinball",
	"Ski-Free",
	"Primal Rage",
	"Beast Wars",
	"Vectorman",
	"Fuzion Frenzy",
	"SSX",
	"Honor",
	"Rising",
	"Cthulhu",
	"Fantasy",
	"Effect",
	"Diaries",
	"Gaiden",
	"Blaster Master",
	"Babies",
	"Civil Political Discourse",
	"Mystery Dungeon",
	"Trouble",
	"Tactics",
	"Awakening",
	"Undying",
	"A Wallflower",
	"War",
	"Boat Dad",
	"Thrones",
	"Dead",
	"Party",
	"the Empire",
	"RPG",
	"Jack",
	"Journey",
	"Farmville",
	"Metroid",
	"Mad Dog McCree",
	"Willennium",
	"Alpha Centauri",
	"Civilization",
	"Pirates!",
	"TurboTax",
	"Street Fighter",
	"Kombat",
	"Budokai",
	"Comix Zone",
	"Project DIVA",
];
// console.log("Nouns are: " + gameNamesNouns);

var gameNamesSuffixes = [
	"Online",
	"EX plus &alpha;",
	"Forever",
	"Infinite",
	"Underground",
	"Throne of Bhaal",
	"The Legend of Curly\'s Gold",
	"Battle for Arakkis",
	"2014",
	"Soccer",
	"The Authentic Mime Experience",
	"Electric Boogaloo",
	"Hardened Edition",
	"Prestige Edition",
	"Ghost Babel",
	"The Adventure of Link",
	"Nuthin' but a \'G\' Thang",
	"Die Harder",
	"Gaiden",
	"USA! USA!",
	"Presented by Doritos",
	"Presented by Budweiser - The King of Beers&reg;",
	"The Prometheus Synapse",
	"New Arsenic-Free Formula",
	"$$ Freemium Edition $$",
	"Starring Troy Baker as \'Troy Baker\'",
	"Okay, Fine, We Brought Back David Hayter. Happy?",
	"Now With Trans-Media Synergy",
	"First Class",
	"UFO Defense",
	"Terror from the Deep",
	"Optimized for Oculus Rift",
	"A Reckless Disregard for Gravity",
	"The Exact Same Game as Last Time Except We Threw In All of the DLC Too",
	"Ghost Protocol",
	"HD Remix",
	"Championship Edition",
	"Continuum Shift",
	"Beyond Thunderdome",
	"Origins",
	"Reloaded",
	"Tournament Edition",
	"Tablet Edition",
	"For Mobile Devices",
	"Back in the Habit",
	"A Spike Lee Joint",
	"Crystal",
	"Red Version",
	"Blue Version",
	"Legendary Edition",
	"Day One Edition",
	"Special Edition",
	"Battle.Net Edition",
	"Collector's Edition",
	"The Criterion Collection",
	"Ten Hammers",
	"The 40th Day",
	"The Line",
	"Adventures",
	"Lord of the Clans",
	"Enhanced Edition",
	"Enemy Within",
	"Ghosts",
	"Turbo",
	"TurboCharged with Mountain Dew&reg; GameFuel&trade;",
	"Presented by Ouya's Free the Games Fund",
	"Ultimate Ninja STORM Full Burst",
	"Tenkaichi",
	"Fabula Nova Crystalis",
	"The Collection",
	"Dancing All Night",
];

var franchiseCancelReasons = [
	"because a wealthy investor felt the games were an affront to their opulent lifestyle",
	"after in-game advertisers complained of poor conversion rates",
	"due to a mass recall of the game's proprietary sledgehammer motion controllers",
	"over a media expos&eacute; lambasting the game's requirement that the player take regular bong hits between rounds of multiplayer deathmatch",
	"because we finally managed to squeeze every iota of fun out of this formula",
	"because nobody cares anymore. About...about anything",
	"since our parent company acquired another company that makes basically the same game but they use a proprietary engine so it's a bit cheaper if we just shut you guys down",
	"because the future's in mobile and everybody knows it except you",
	"because Frank in Accounting accidentally dropped a decimal place a few months back",
	"in light of a bloodless coup in a distant country that was orchestrated through our matchmaking service",
	"because every single person on the planet no longer enjoys video games thanks to our business savvy",
	"since we're shifting all our dev resources over to Ouya",
	"because our VR integration made kids vomit, and that's not a super easy to market",
];
/* console.log("And suffixes are: " + gameNamesSuffixes); */

// Now create an array to hold all game names

var franchiseAdjective;
var franchiseNoun;

var userGameNames = new Array();
var franchiseNumber = 1;
var franchiseNumberDisplayed = false;

// Create arrays for +/- game traits

var gameTraitsPositive = new Array();
var gameTraitsNegative = new Array();

// First we'll fix the adjective and noun -- these will remain constant throughout the franchise

function makeFirstGame() {
	franchiseAdjective = gameNamesAdjectives[Math.floor(Math.random() * gameNamesAdjectives.length)];
	franchiseNoun = gameNamesNouns[Math.floor(Math.random() * gameNamesNouns.length)];
	userGameNames[0] = (franchiseAdjective + " " + franchiseNoun);
	console.log(userGameNames[0]); 
	document.getElementById("gameNameSection").style.visibility = "visible";
	document.getElementById("paraGameName").className = "textFadeIn";
	document.getElementById("btnStart").style.visibility = "hidden";
	document.getElementById("gameNameDisplay").innerHTML = "<p class=\"newGameStyle\">\"" + userGameNames[0] + "\"</p><p>Impressive. It's rare to see such an achievement of innovative design and cutting-edge graphics. Critics are sure to eat it up.</p><p>But why stop there when there's mad skrilla to be made?</p>";
};

/*  Okay, everything's good so far. Now we need to add some naming logic for subsequent sequels.
   	This logic should be as follows:
		1. Sequels must add one of the following: an incremental number to the end of the title OR a prefix
			a. If a prefix exists and a new one is added, remove the incremental number from the display name
		2. Sequels MAY add a suffix on each iteration as well
		3. Names display like this: [prefix]_[adjective]_[noun]_[incrementalNumber*]:_[suffix]
		4. Each sequel has an increasing chance of killing off the franchise entirely. When this happens,
		hide the sequelize button and display a reset button.
*/

var franchisePrefix = "";
var franchiseSuffix = "";

function sequelizeGame() {
	franchiseNumber++;
	// Roll to see whether a number or a prefix should be added - 1 in 4 chance to show prefix
	if(Math.random() > 0.6) {
		franchiseNumberDisplayed = true;
	}
	else {
		franchiseNumberDisplayed = false;
		franchisePrefix = gameNamesPrefixes[Math.floor(Math.random() * gameNamesPrefixes.length)];
		franchiseNumber = 1;
	}
	
	// Roll to see if a suffix should be added too - 3 in 10 chance
	if(Math.random() > .3) {
		franchiseSuffix = gameNamesSuffixes[Math.floor(Math.random() * gameNamesSuffixes.length)];
	}
	
	// Roll to see if we should kill the franchise
	if((Math.floor(Math.random() * 30) + 1) > (userGameNames.length + 1)) {
		console.log("Still going...");
		
		var newGameName = String;
		
		if (franchiseNumberDisplayed === true) {
			if(franchisePrefix === "") { // If prefix NOT displayed
				if(franchiseSuffix === "") { // No prefix, no suffix, yes number displayed
					newGameName = "\"" + franchiseAdjective + " " + franchiseNoun + " " + franchiseNumber + "\"";
					// console.log("Display franchise number, no prefix, no suffix: " + newGameName);
				}
				else { //No prefix, yes suffix, yes number displayed
					newGameName = "\"" + franchiseAdjective + " " + franchiseNoun + " " + franchiseNumber + ": " + franchiseSuffix + "\"";
					// console.log("Display franchise number, no prefix, yes suffix: " + newGameName);
				}
			}
			else { // if prefix IS displayed from previous iteration
				if(franchiseSuffix === "") { // yes prefix, no suffix, yes display number
					newGameName = "\"" + franchisePrefix + " " + franchiseAdjective + " " + franchiseNoun + " " + franchiseNumber + "\"";
					// console.log("Display franchise number, yes prefix, no suffix: " + newGameName);
				}
				else { // yes prefix, yes suffix, yes display number
					newGameName = "\"" + franchisePrefix + " " + franchiseAdjective + " " + franchiseNoun + " " + franchiseNumber + ": " + franchiseSuffix + "\"";
					// console.log("Display franchise number, prefix and suffix: " + newGameName);
				}
			}
		}
		else { // NO franchise number displayed
			if(franchisePrefix === "") {
				if(franchiseSuffix === "") { //no prefix, no suffix, no franchise number - shouldn't happen
					newGameName = "\"" + franchiseAdjective + " " + franchiseNoun + "\"";
					// console.log("!!BAD!! No prefix, No suffix, No number: " + newGameName);
				}
				else { //no prefix, YES suffix, no franchise number - also shouldn't happen
					newGameName = "\"" + franchiseAdjective + " " + franchiseNoun + ": " + franchiseSuffix + "\"";
					// console.log("!!BAD!! Display suffix, NO prefix or franchise number: " + newGameName);
				}
			}
			else {
				if(franchiseSuffix === "") { //YES prefix, no suffix, no franchise number
					newGameName	= "\"" + franchisePrefix + " " + franchiseAdjective + " " + franchiseNoun + "\"";
					// console.log("Display franchise prefix, NO suffix or franchise number: " + newGameName);
				}
				else { // YES prefix, YES suffix, no franchise number
					newGameName = "\"" + franchisePrefix + " " + franchiseAdjective + " " + franchiseNoun + ": " + franchiseSuffix + "\"";
					// console.log("Display prefix and suffix, NO franchise number: " + newGameName);
				}
			}			
		}
		 
		userGameNames.push(newGameName);
		document.getElementById("gameNameDisplay").innerHTML += "<p class=\"newGameStyle\">" + newGameName + "</p>";
	}
	else {
		// console.log("Done after " + userGameNames.length + " turns.");
		document.getElementById("gameNameDisplay").innerHTML += "<br /><p>Unfortunately, after " + (userGameNames.length) + " games, this franchise has been put to pasture " + franchiseCancelReasons[Math.floor(Math.random() * franchiseCancelReasons.length)] + ". <a href=\"#\" onClick=\"location.reload();\"></p><p>Refresh the page</a> to try again!</p>";
		document.getElementById("btnSequel").style.visibility = "hidden";
		document.getElementById("bottomLinks").style.visibility = "visible";
		franchiseNumber = 1;
		
	}
	franchiseSuffix = ""; // Clear the suffix if there is one
}