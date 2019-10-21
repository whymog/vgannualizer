/*
======VIDEO GAME FRANCHISE ANNUALIZER======
A thing that Nick Cummings wrote - say hi at @whymog on GitHub or @nickcummings on Twitter

Pull requests welcome: https://github.com/whymog/vgannualizer

=======INTRODUCTION========

This is a video game franchise annualizer. 
It generates the names and positive and negative traits of each game 
in the series, and after 2-10 iterations it kills off the franchise for
one of several random, predetermined reasons.

Users will be able to share their franchise's name and number of sequels through Twitter.

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

window.onload = function() {
  document.getElementById("gameNameSection").style.visibility = "hidden";
  document.addEventListener("keydown", function(event) {
    if (event.keyCode === 83 && !gameOver) {
      // letter 's' - display next sequel
      gameStarted ? sequelizeGame() : makeFirstGame();
    } else if (event.keyCode === 82 && gameOver) {
      // letter 'r' - reload the page
      this.location.reload();
    }
  });
};

var gameStarted = false,
  gameOver = false;

// Create arrays for game name components
var gameNamesPrefixes = [
  "&Uuml;ber",
  "All-Star",
  "Based",
  "Bride of",
  "Even More",
  "Extreme",
  "Here's More",
  "Hyper",
  "Mega",
  "Ms.",
  "Oh Boy, Here's More",
  "Raging",
  "Return of",
  "Return to",
  "Revenge of",
  "Son of",
  "Super",
  "The Curse of",
  "The Next",
  "Ultimate",
  "Ultra",
  "Uncanny",
  "Versus",
  "We Made Another",
  "Zero Escape:"
];

var gameNamesAdjectives = [
  ".hack",
  "A Game of",
  "American",
  "American McGee's",
  "Are You There, God? It's Me,",
  "Ayn Rand's",
  "BlazBlue",
  "Cabela's",
  "Call of",
  "Cards Against",
  "Clive Barker's",
  "Codename:",
  "Confessions of",
  "Corpse",
  "Crash 'n' the",
  "Cruis'n",
  "Dangerous High School Girls in",
  "Dave Mirra's",
  "Day of the",
  "Dead",
  "Doki Doki",
  "Dragon Ball",
  "Excitebike",
  "Final",
  "Gaius Baltar's",
  "Gene Shalit's",
  "God of",
  "Guy Fieri's",
  "Harry Belafonte's",
  "Hatsune Miku",
  "Hey! Let's Go!",
  "High Magic",
  "High School",
  "Howard Zinn's",
  "Imagine:",
  "Interview with the",
  "Jane's",
  "Jingoistic",
  "Jonathan Blow's",
  "Jose Canseco's",
  "Kawaii Dating no",
  "Kelly Slater's",
  "Lee Carvallo's",
  "Mario",
  "Mass",
  "Master of",
  "Matthew Barney's",
  "Medal of",
  "Metal Gear",
  "Modern",
  "Mortal",
  "Mountain Dew",
  "My Little",
  "Neal Stephenson's",
  "Nigel Mansell's",
  "Ninja",
  "Panzer Dragoon",
  "Paper",
  "Pat Sajak's",
  "Persona 4",
  "Record of",
  "Red Dead",
  "Rockstar's",
  "Romance of the",
  "Saints",
  "Saved By the",
  "Seven Years in",
  "Shadows of",
  "Shin Megami Tensei",
  "Sid Meier's",
  "Steins;",
  "The Adentures of",
  "The Clash at",
  "The Hitchhiker's Guide to",
  "The Legend of",
  "The Longest",
  "The Perks of Being",
  "The Walking",
  "Tobias F\xFCnke's",
  "Tom Clancy's",
  "Tom Morello's",
  "Tony Hawk's",
  "World of",
  "You Don't Know"
];

var gameNamesNouns = [
  "Alpha Centauri",
  "Awakening",
  "A Wallflower",
  "Babies",
  "Batman Batman Batman",
  "Beast Wars",
  "Bilbo",
  "Blaster Master",
  "Blood",
  "Bloodstorm",
  "Boat Dad",
  "Bonestorm",
  "Budokai",
  "Casino Kid",
  "Civilization",
  "Civil Political Discourse",
  "Combat",
  "Comix Zone",
  "Cthulhu",
  "Dancing Challenge",
  "Dead",
  "Dead People",
  "Death",
  "Diaries",
  "Distortion",
  "Dudebro",
  "Duty",
  "Effect",
  "Fantasy",
  "Farmville",
  "Fooseball",
  "Football",
  "Fuzion Frenzy",
  "Gaiden",
  "Galactic Pinball",
  "Honor",
  "Jack",
  "Journey",
  "Kombat",
  "Lowlives",
  "Mad Dog McCree",
  "Metroid",
  "Mystery Dungeon",
  "Nazi Commie Zombies",
  "Nazi Zombies",
  "Panic",
  "Paperboy",
  "Party",
  "Pirates!",
  "Ponies",
  "Prenatal Care",
  "Primal Rage",
  "Pro-Am Racing",
  "Project DIVA",
  "Putting Challenge",
  "Racing",
  "Rad Racing",
  "Rising",
  "RPG",
  "Ski-Free",
  "Solid",
  "Splinter Cell",
  "SSX",
  "Street Fighter",
  "Table Tennis",
  "Tactics",
  "Tanks",
  "Teleroboxer",
  "the Empire",
  "Thrones",
  "Too Human",
  "Trouble",
  "TurboTax",
  "Undying",
  "USA",
  "Vectorman",
  "War",
  "Warfare",
  "Willennium",
  "Zelda",
  "Zombies",
  "Zork"
];

var gameNamesSubtitlees = [
  "$$ Freemium Edition $$",
  "2014",
  "Adventures",
  "A Reckless Disregard for Gravity",
  "A Spike Lee Joint",
  "Back in the Habit",
  "Battle.Net Edition",
  "Battle for Arakkis",
  "Beyond Thunderdome",
  "Blue Version",
  "Championship Edition",
  "Collector's Edition",
  "Continuum Shift",
  "Crystal",
  "Dancing All Night",
  "Day One Edition",
  "Die Harder",
  "Electric Boogaloo",
  "Enemy Within",
  "Enhanced Edition",
  "EX plus &alpha;",
  "Fabula Nova Crystalis",
  "First Class",
  "Forever",
  "For Mobile Devices",
  "for Nintendo 3DS",
  "Gaiden",
  "Ghost Babel",
  "Ghost Protocol",
  "Ghosts",
  "Golden",
  "Hardened Edition",
  "HD Remaster",
  "HD Remix",
  "Infinite",
  "Legendary Edition",
  "Lord of the Clans",
  "New Arsenic-Free Formula",
  "Now With Trans-Media Synergy",
  "Nuthin' but a 'G' Thang",
  "Okay, Fine, We Brought Back David Hayter. Happy?",
  "Online",
  "Optimized for Oculus Rift",
  "Origins",
  "Presented by Budweiser - The King of Beers&reg;",
  "Presented by Doritos",
  "Presented by Ouya's Free the Games Fund",
  "Prestige Edition",
  "Red Version",
  "Reloaded",
  "Resurrection",
  "Soccer",
  "Special Edition",
  "Starring Troy Baker as 'Troy Baker'",
  "Tablet Edition",
  "Ten Hammers",
  "Tenkaichi",
  "Terror from the Deep",
  "The 40th Day",
  "The Adventure of Link",
  "The Authentic Mime Experience",
  "The Collection",
  "The Collection",
  "The Criterion Collection",
  "The Exact Same Game as Last Time Except We Threw In All of the DLC Too",
  "The Legend of Curly's Gold",
  "The Line",
  "The Mindgate Conspiracy",
  "The Prometheus Synapse",
  "Throne of Bhaal",
  "Tournament Edition",
  "Turbo",
  "TurboCharged with Mountain Dew&reg; GameFuel&trade;",
  "UFO Defense",
  "Ultimate Ninja STORM Full Burst",
  "Underground",
  "USA! USA!"
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
  "because our last game pivoted to a Live Service model and failed to attract enough Daily Active Users to please the shareholders"
];

// Now create an array to hold all game names
var franchiseAdjective;
var franchiseNoun;

// lol wow I had no idea how JavaScript worked in 2016
var userGameNames = new Array();
var franchiseNumber = 1;
var franchiseNumberDisplayed = false;

// Create arrays for +/- game traits

var gameTraitsPositive = new Array();
var gameTraitsNegative = new Array();

// First we'll fix the adjective and noun -- these will remain constant throughout the franchise

function makeFirstGame() {
  gameStarted = true;
  franchiseAdjective =
    gameNamesAdjectives[Math.floor(Math.random() * gameNamesAdjectives.length)];
  franchiseNoun =
    gameNamesNouns[Math.floor(Math.random() * gameNamesNouns.length)];
  userGameNames[0] = franchiseAdjective + " " + franchiseNoun;
  document.getElementById("gameNameSection").style.visibility = "visible";
  document.getElementById("paraGameName").className = "textFadeIn";
  document.getElementById("btnStart").style.display = "none";
  document.getElementById("gameNameDisplay").innerHTML =
    '<p class="newGameStyle">' +
    userGameNames[0] +
    "</p><p>Impressive. It's rare to see such an achievement of innovative design and cutting-edge graphics. Critics are sure to eat it up.</p><p>But why stop there when there's an obscene amount of money to be made?</p>";
}

/*  Okay, everything's good so far. Now we need to add some naming logic for subsequent sequels.
   	This logic should be as follows:
		1. Sequels must add one of the following: an incremental number to the end of the title OR a prefix
			a. If a prefix exists and a new one is added, remove the incremental number from the display name
		2. Sequels MAY add a subtitle on each iteration as well
		3. Names display like this: [prefix]_[adjective]_[noun]_[incrementalNumber*]:_[subtitle]
		4. Each sequel has an increasing chance of killing off the franchise entirely. When this happens,
		hide the sequelize button and display a reset button.
*/

var franchisePrefix = "";
var franchiseSubtitle = "";

function sequelizeGame() {
  franchiseNumber++;
  // Roll to see whether a number or a prefix should be added - 1 in 4 chance to show prefix
  if (Math.random() > 0.6) {
    franchiseNumberDisplayed = true;
  } else {
    franchiseNumberDisplayed = false;
    franchisePrefix =
      gameNamesPrefixes[Math.floor(Math.random() * gameNamesPrefixes.length)];
    franchiseNumber = 1;
  }

  // Roll to see if a subtitle should be added too - 3 in 10 chance
  if (Math.random() > 0.3) {
    franchiseSubtitle =
      gameNamesSubtitlees[
        Math.floor(Math.random() * gameNamesSubtitlees.length)
      ];
  }

  // Roll to see if we should kill the franchise
  if (Math.floor(Math.random() * 30) + 1 > userGameNames.length + 1) {
    var newGameName = String;

    if (franchiseNumberDisplayed === true) {
      if (franchisePrefix === "") {
        // If prefix NOT displayed
        if (franchiseSubtitle === "") {
          // No prefix, no subtitle, yes number displayed
          newGameName =
            franchiseAdjective + " " + franchiseNoun + " " + franchiseNumber;
        } else {
          //No prefix, yes subtitle, yes number displayed
          newGameName =
            franchiseAdjective +
            " " +
            franchiseNoun +
            " " +
            franchiseNumber +
            ": " +
            franchiseSubtitle;
        }
      } else {
        // if prefix IS displayed from previous iteration
        if (franchiseSubtitle === "") {
          // yes prefix, no subtitle, yes display number
          newGameName =
            franchisePrefix +
            " " +
            franchiseAdjective +
            " " +
            franchiseNoun +
            " " +
            franchiseNumber;
        } else {
          // yes prefix, yes subtitle, yes display number
          newGameName =
            franchisePrefix +
            " " +
            franchiseAdjective +
            " " +
            franchiseNoun +
            " " +
            franchiseNumber +
            ": " +
            franchiseSubtitle;
        }
      }
    } else {
      // NO franchise number displayed
      if (franchisePrefix === "") {
        if (franchiseSubtitle === "") {
          //no prefix, no subtitle, no franchise number - shouldn't happen
          newGameName = '"' + franchiseAdjective + " " + franchiseNoun + '"';
        } else {
          //no prefix, YES subtitle, no franchise number - also shouldn't happen
          newGameName =
            franchiseAdjective + " " + franchiseNoun + ": " + franchiseSubtitle;
        }
      } else {
        if (franchiseSubtitle === "") {
          //YES prefix, no subtitle, no franchise number
          newGameName =
            franchisePrefix + " " + franchiseAdjective + " " + franchiseNoun;
        } else {
          // YES prefix, YES subtitle, no franchise number
          newGameName =
            franchisePrefix +
            " " +
            franchiseAdjective +
            " " +
            franchiseNoun +
            ": " +
            franchiseSubtitle;
        }
      }
    }

    userGameNames.push(newGameName);
    document.getElementById("gameNameDisplay").innerHTML +=
      '<p class="newGameStyle">' + newGameName + "</p>";
  } else {
    // Remove sequel button
    var sequelButton = document.getElementById("btnSequel");
    sequelButton.style = "display: none;";

    // Update Twitter button text
    twttr.widgets.load();
    var franchiseName = userGameNames[0];
    var twitterButtonText = `I ran the "${franchiseName}" video game series into the ground after ${userGameNames.length -
      1} sequels, and it's all thanks to the Video Game Franchise Annualizer:`;

    var twitterButton = document.createElement("a");
    twitterButton.className = "twitter-share-button";
    twitterButton.dataset.size = "large";
    twitterButton.rel = "canonical";
    twitterButton.href = encodeURI(
      "https://twitter.com/intent/tweet?text=" +
        twitterButtonText +
        "&url=https://videogameannualizer.com" +
        "&hashtags=vgannualizer"
    );

    var wrapper = document.getElementById("twitterWrapper");
    wrapper.appendChild(twitterButton);
    wrapper.classList.add("visible");

    // Show final output
    document.getElementById("gameNameDisplay").innerHTML +=
      "<br /><p>Unfortunately, after " +
      userGameNames.length +
      " games, this franchise has been put to pasture " +
      franchiseCancelReasons[
        Math.floor(Math.random() * franchiseCancelReasons.length)
      ] +
      '. <a href="#" onClick="location.reload();"></p><p>Refresh the page</a> (or press the <u>R</u> key) to try again!</p>';
    document.getElementById("btnSequel").style.visibility = "hidden";
    document.getElementById("bottomLinks").style.visibility = "visible";
    franchiseNumber = 1;
    gameOver = true;
  }
  franchiseSubtitle = ""; // Clear the subtitle if there is one

  // Scroll to bottom of page
  window.scrollTo(0, document.body.scrollHeight);
}
