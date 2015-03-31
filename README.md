# FFXIV Lodestone Data Utility
A scraping utility for FFXIV ARR's Lodestone, built in node. 

**If you're just looking for the LS data**, I've included the latest result of this script in [`output` folder](). Just download this repo as a `.zip` and save yourself the time. <!-- Want to thank me? Buy the ad-free version of my app, FFXIV's [Disciple of Gil]()! -->

While FFXIV does not provide an API for their data, they do have everything available via a website, called the Lodestone. This script uses [CasperJS]() to traverse the main sections of that site, reads the data, then saves the requested sections into a series of CSV files.

##Features
1. Timeouts built in to the script to prevent accidental DDoS-like behavior.
2. Config json file to change URL endpoint (for other languages)

## Installation
- Make sure you have [CasperJS]() installed and usable in your terminal.
- Clone this repo
- Run the script with `npm run scrape` from the root of this folder to run with default options.

## Options

`--category2`  
Which category to scrape. Expects a name -- see `config.json` for available options. 
Defaults to `--category2=materials`.

Why `category2`? Because that's what ffxiv calls it. :/

`--category3`  
The Sub category to scrape. Expects a name -- see `config.json` for available options. Has no default.

## Contributing

To have your contributions considered, include passing tests, and follow the existing code patterns.

