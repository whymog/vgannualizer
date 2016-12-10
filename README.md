#Video Game Franchise Annualizer  

This is a silly satirical thing I built while I still [blogged about games](http://www.siliconsasquatch.com/). It's something like five years old now, so I'm not sure how useful it is (or how topical the references are), but [the domain's gonna expire soon](http://videogameannualizer.com/) and I'd hate to forget about it.  

##How it works  

The formula is pretty simple and laid out in the app.js comments. Certain term types are always used; others are less common. Some franchises will crash and burn early (we call these "Bloodraynes"), but a few will make it into the double digits before expiring (the "Final Fantasy"s of the world).

##Getting started  

Pretty much everything you need to edit lives in `scripts/app.js`. The app's process is laid out there in greater detail, but at a high level, you can add/edit prefixes, adjectives, nouns, and suffixes. These combine in different ways using randomization to create a series of games that share a common theme.  

If you're gonna add new terms, make sure you HTML escape any characters that need it. For example, `"Über"` should be written out as `"&Uuml;ber"`.  

Please feel free to submit any and all terms you want via pull requests! I'll try to review them in a timely manner and I'll incorporate anything that seems like a good fit. And if you disagree with my judgment, you're always welcome to fork this project and create your own version. :)

##Ideas for future development  

I'm thinking about optionally generating fake Metacritic scores and review blurbs, but I'm not sure if the joke will be funny long enough for me to do all that.
