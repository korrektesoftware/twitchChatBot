const tmi = require('tmi.js');
const Request = require("request");
var _ = require('lodash');

const options = {
    options: {
        debug: true,
    },
    conntection: {
        cluster: 'aws',
        reconnect: true
    },
    identity: {
        username: 'h3info',
        password: 'oauth:3xr9nsoqq5woupkebqfzw6b7b96eks'
    },
    channels: ['Lexiav', 'Haze_Tech', 'Thexenofex']
};

var heroes = [
    {
      "Name": "Corkes",
      "Class": "Captain",
      "Speciality": "Offense",
      "Skill1": "Basic Offense",
      "Skill2": "Basic Pathfinding",
      "Spell": "-"
    },
    {
      "Name": "Jeremy",
      "Class": "Captain",
      "Speciality": "Cannon",
      "Skill1": "Basic Offense",
      "Skill2": "Basic Artillery",
      "Spell": "-"
    },
    {
      "Name": "Illor",
      "Class": "Captain",
      "Speciality": "Stormbirds",
      "Skill1": "Basic Armorer",
      "Skill2": "Basic Tactics",
      "Spell": "-"
    },
    {
      "Name": "Derek",
      "Class": "Captain",
      "Speciality": "Crew Mates",
      "Skill1": "Basic Offense",
      "Skill2": "Basic Leadership",
      "Spell": "-"
    },
    {
      "Name": "Elmore",
      "Class": "Captain",
      "Speciality": "Navigation",
      "Skill1": "Advanced Navigation",
      "Skill2": "-",
      "Spell": "-"
    },
    {
      "Name": "Leena",
      "Class": "Captain",
      "Speciality": "Gold",
      "Skill1": "Basic Pathfinding",
      "Skill2": "Basic Estates",
      "Spell": "-"
    },
    {
      "Name": "Anabel",
      "Class": "Captain",
      "Speciality": "Pirates",
      "Skill1": "Basic Offense",
      "Skill2": "Basic Archery",
      "Spell": "-"
    },
    {
      "Name": "Cassiopeia",
      "Class": "Captain",
      "Speciality": "Nymphs",
      "Skill1": "Basic Offense",
      "Skill2": "Basic Tactics",
      "Spell": "-"
    },
    {
      "Name": "Miriam",
      "Class": "Captain",
      "Speciality": "Scouting",
      "Skill1": "Basic Logistics",
      "Skill2": "Basic Scouting",
      "Spell": "-"
    },
    {
      "Name": "Bidley",
      "Class": "Captain",
      "Speciality": "Sea Dogs",
      "Skill1": "Advanced Offense",
      "Skill2": "-",
      "Spell": "-"
    },
    {
      "Name": "Tark",
      "Class": "Captain",
      "Speciality": "Nix",
      "Skill1": "Basic Offense",
      "Skill2": "Basic Armorer",
      "Spell": "-"
    },
    {
      "Name": "Casmetra",
      "Class": "Navigator",
      "Speciality": "Sea Witches",
      "Skill1": "Basic Wisdom",
      "Skill2": "Basic Water Magic",
      "Spell": "Dispel"
    },
    {
      "Name": "Eovacius",
      "Class": "Navigator",
      "Speciality": "Clone",
      "Skill1": "Basic Wisdom",
      "Skill2": "Basic Intelligence",
      "Spell": "Clone"
    },
    {
      "Name": "Spint",
      "Class": "Navigator",
      "Speciality": "Sorcery",
      "Skill1": "Basic Wisdom",
      "Skill2": "Basic Sorcery",
      "Spell": "Bless"
    },
    {
      "Name": "Andal",
      "Class": "Navigator",
      "Speciality": "Crystal",
      "Skill1": "Basic Wisdom",
      "Skill2": "Basic Pathfinding",
      "Spell": "Slow"
    },
    {
      "Name": "Manfred",
      "Class": "Navigator",
      "Speciality": "Fireball",
      "Skill1": "Basic Wisdom",
      "Skill2": "Basic Fire Magic",
      "Spell": "Fireball"
    },
    {
      "Name": "Zilare",
      "Class": "Navigator",
      "Speciality": "Forgetfulness",
      "Skill1": "Basic Wisdom",
      "Skill2": "Basic Resistance",
      "Spell": "Forgetfulness"
    },
    {
      "Name": "Astra",
      "Class": "Navigator",
      "Speciality": "Cure",
      "Skill1": "Basic Wisdom",
      "Skill2": "Basic Luck",
      "Spell": "Cure"
    },
    {
      "Name": "Dargem",
      "Class": "Navigator",
      "Speciality": "Air Shield",
      "Skill1": "Basic Wisdom",
      "Skill2": "Basic Tactics",
      "Spell": "Air Shield"
    },
    {
      "Name": "Christian",
      "Class": "Knight",
      "Speciality": "Ballista",
      "Skill1": "Basic Leadership",
      "Skill2": "Basic Artillery",
      "Spell": "-"
    },
    {
      "Name": "Edric",
      "Class": "Knight",
      "Speciality": "Griffins",
      "Skill1": "Basic Leadership",
      "Skill2": "Basic Armorer",
      "Spell": "-"
    },
    {
      "Name": "Orrin",
      "Class": "Knight",
      "Speciality": "Archery",
      "Skill1": "Basic Leadership",
      "Skill2": "Basic Archery",
      "Spell": "-"
    },
    {
      "Name": "Sylvia",
      "Class": "Knight",
      "Speciality": "Navigation",
      "Skill1": "Basic Leadership",
      "Skill2": "Basic Navigation",
      "Spell": "-"
    },
    {
      "Name": "Valeska",
      "Class": "Knight",
      "Speciality": "Archers",
      "Skill1": "Basic Leadership",
      "Skill2": "Basic Archery",
      "Spell": "-"
    },
    {
      "Name": "Sorsha",
      "Class": "Knight",
      "Speciality": "Swordsmen",
      "Skill1": "Basic Leadership",
      "Skill2": "Basic Offense",
      "Spell": "-"
    },
    {
      "Name": "Tyris",
      "Class": "Knight",
      "Speciality": "Cavaliers",
      "Skill1": "Basic Leadership",
      "Skill2": "Basic Tactics",
      "Spell": "-"
    },
    {
      "Name": "Lort Haart",
      "Class": "Knight",
      "Speciality": "Estates",
      "Skill1": "Basic Leadership",
      "Skill2": "Basic Estates",
      "Spell": "-"
    },
    {
      "Name": "Catherine",
      "Class": "Knight",
      "Speciality": "Swordsmen",
      "Skill1": "Basic Leadership",
      "Skill2": "Basic Offense",
      "Spell": "-"
    },
    {
      "Name": "Roland",
      "Class": "Knight",
      "Speciality": "Swordsmen",
      "Skill1": "Basic Leadership",
      "Skill2": "Basic Armorer",
      "Spell": "-"
    },
    {
      "Name": "Sir Mullich",
      "Class": "Knight",
      "Speciality": "Speed",
      "Skill1": "Advanced Leadership",
      "Skill2": "-",
      "Spell": "-"
    },
    {
      "Name": "Beatrice",
      "Class": "Knight",
      "Speciality": "Scouting",
      "Skill1": "Basic Leadership",
      "Skill2": "Basic Scouting",
      "Spell": "-"
    },
    {
      "Name": "Adela",
      "Class": "Cleric",
      "Speciality": "Bless",
      "Skill1": "Basic Wisdom",
      "Skill2": "Basic Diplomacy",
      "Spell": "Bless"
    },
    {
      "Name": "Adelaide",
      "Class": "Cleric",
      "Speciality": "Frost Ring",
      "Skill1": "Advanced Wisdom",
      "Skill2": "-",
      "Spell": "Frost Ring"
    },
    {
      "Name": "Caitlin",
      "Class": "Cleric",
      "Speciality": "Gold",
      "Skill1": "Basic Wisdom",
      "Skill2": "Basic Intelligence",
      "Spell": "Cure"
    },
    {
      "Name": "Cuthbert",
      "Class": "Cleric",
      "Speciality": "Weakness",
      "Skill1": "Basic Wisdom",
      "Skill2": "Basic Estates",
      "Spell": "Weakness"
    },
    {
      "Name": "Ingham",
      "Class": "Cleric",
      "Speciality": "Monks",
      "Skill1": "Basic Wisdom",
      "Skill2": "Basic Mysticism",
      "Spell": "Curse"
    },
    {
      "Name": "Loynis",
      "Class": "Cleric",
      "Speciality": "Prayer",
      "Skill1": "Basic Wisdom",
      "Skill2": "Basic Learning",
      "Spell": "Prayer"
    },
    {
      "Name": "Rion",
      "Class": "Cleric",
      "Speciality": "First Aid",
      "Skill1": "Basic Wisdom",
      "Skill2": "Basic First Aid",
      "Spell": "Stone Skin"
    },
    {
      "Name": "Sanya",
      "Class": "Cleric",
      "Speciality": "Eagle Eye",
      "Skill1": "Basic Wisdom",
      "Skill2": "Basic Eagle Eye",
      "Spell": "Dispel"
    },
    {
      "Name": "Jenova",
      "Class": "Ranger",
      "Speciality": "Gold",
      "Skill1": "Advanced Archery",
      "Skill2": "-",
      "Spell": "-"
    },
    {
      "Name": "Kyrre",
      "Class": "Ranger",
      "Speciality": "Logistics",
      "Skill1": "Basic Archery",
      "Skill2": "Basic Logistics",
      "Spell": "-"
    },
    {
      "Name": "Ivor",
      "Class": "Ranger",
      "Speciality": "Elves",
      "Skill1": "Basic Archery",
      "Skill2": "Basic Offense",
      "Spell": "-"
    },
    {
      "Name": "Ufretin",
      "Class": "Ranger",
      "Speciality": "Dwarves",
      "Skill1": "Basic Resistance",
      "Skill2": "Basic Luck",
      "Spell": "-"
    },
    {
      "Name": "Clancy",
      "Class": "Ranger",
      "Speciality": "Unicorns",
      "Skill1": "Basic Resistance",
      "Skill2": "Basic Pathfinding",
      "Spell": "-"
    },
    {
      "Name": "Thorgrim",
      "Class": "Ranger",
      "Speciality": "Resistance",
      "Skill1": "Advanced Resistance",
      "Skill2": "-",
      "Spell": "-"
    },
    {
      "Name": "Ryland",
      "Class": "Ranger",
      "Speciality": "Dendroids",
      "Skill1": "Basic Leadership",
      "Skill2": "Basic Diplomacy",
      "Spell": "-"
    },
    {
      "Name": "Mephala",
      "Class": "Ranger",
      "Speciality": "Armorer",
      "Skill1": "Basic Leadership",
      "Skill2": "Basic Armorer",
      "Spell": "-"
    },
    {
      "Name": "Gelu",
      "Class": "Ranger",
      "Speciality": "Sharpshooters",
      "Skill1": "Basic Archery",
      "Skill2": "Basic Leadership",
      "Spell": "-"
    },
    {
      "Name": "Aeris",
      "Class": "Druid",
      "Speciality": "Pegasi",
      "Skill1": "Basic Wisdom",
      "Skill2": "Basic Scouting",
      "Spell": "Protection from Air"
    },
    {
      "Name": "Alagar",
      "Class": "Druid",
      "Speciality": "Ice Bolt",
      "Skill1": "Basic Wisdom",
      "Skill2": "Basic Sorcery",
      "Spell": "Ice Bolt"
    },
    {
      "Name": "Coronius",
      "Class": "Druid",
      "Speciality": "Slayer",
      "Skill1": "Basic Wisdom",
      "Skill2": "Basic Scholar",
      "Spell": "Slayer"
    },
    {
      "Name": "Elleshar",
      "Class": "Druid",
      "Speciality": "Intelligence",
      "Skill1": "Basic Wisdom",
      "Skill2": "Basic Intelligence",
      "Spell": "Curse"
    },
    {
      "Name": "Malcom",
      "Class": "Druid",
      "Speciality": "Eagle Eye",
      "Skill1": "Basic Wisdom",
      "Skill2": "Basic Eagle Eye",
      "Spell": "Magic Arrow"
    },
    {
      "Name": "Melodia",
      "Class": "Druid",
      "Speciality": "Fortune",
      "Skill1": "Basic Wisdom",
      "Skill2": "Basic Luck",
      "Spell": "Fortune"
    },
    {
      "Name": "Gem",
      "Class": "Druid",
      "Speciality": "First Aid",
      "Skill1": "Basic Wisdom",
      "Skill2": "Basic First Aid",
      "Spell": "Summon Boat"
    },
    {
      "Name": "Uland",
      "Class": "Druid",
      "Speciality": "Cure",
      "Skill1": "Basic Wisdom",
      "Skill2": "Basic Ballisicts",
      "Spell": "Cure"
    },
    {
      "Name": "Fafner",
      "Class": "Alchemist",
      "Speciality": "Nagas, Basic Scholar",
      "Skill1": "Basic Resistance",
      "Skill2": "Haste",
      "Spell": ""
    },
    {
      "Name": "Iona",
      "Class": "Alchemist",
      "Speciality": "Genies",
      "Skill1": "Basic Scholar, Basic Intelligence",
      "Skill2": "Magic Arrow",
      "Spell": ""
    },
    {
      "Name": "Josephine",
      "Class": "Alchemist",
      "Speciality": "Golems",
      "Skill1": "Basic Mysticism",
      "Skill2": "Basic Sorcery",
      "Spell": "Haste"
    },
    {
      "Name": "Neela",
      "Class": "Alchemist",
      "Speciality": "Armorer",
      "Skill1": "Basic Armorer",
      "Skill2": "Basic Scholar",
      "Spell": "Shield"
    },
    {
      "Name": "Piquedram",
      "Class": "Alchemist",
      "Speciality": "Gargoyles",
      "Skill1": "Basic Mysticism",
      "Skill2": "Basic Scouting",
      "Spell": "Shield"
    },
    {
      "Name": "Rissa",
      "Class": "Alchemist",
      "Speciality": "Mercury",
      "Skill1": "Basic Mysticism",
      "Skill2": "Basic Offense",
      "Spell": "Magic Arrow"
    },
    {
      "Name": "Thane",
      "Class": "Alchemist",
      "Speciality": "Genies",
      "Skill1": "Advanced Scholar",
      "Skill2": "-",
      "Spell": "Magic Arrow"
    },
    {
      "Name": "Torosar",
      "Class": "Alchemist",
      "Speciality": "Ballista",
      "Skill1": "",
      "Skill2": "Basic Mysticism",
      "Spell": "Basic Tactics"
    },
    {
      "Name": "Aine",
      "Class": "Wizard",
      "Speciality": "Gold",
      "Skill1": "Basic Wisdom",
      "Skill2": "Basic Scholar",
      "Spell": "Curse"
    },
    {
      "Name": "Astral",
      "Class": "Wizard",
      "Speciality": "Hypnotize",
      "Skill1": "Advanced Wisdom",
      "Skill2": "-",
      "Spell": "Hypnotize"
    },
    {
      "Name": "Cyra",
      "Class": "Wizard",
      "Speciality": "Haste",
      "Skill1": "Basic Wisdom",
      "Skill2": "Basic Diplomacy",
      "Spell": "Haste"
    },
    {
      "Name": "Daremyth",
      "Class": "Wizard",
      "Speciality": "Fortune",
      "Skill1": "Basic Wisdom",
      "Skill2": "Basic Intelligence",
      "Spell": "Fortune"
    },
    {
      "Name": "Halon",
      "Class": "Wizard",
      "Speciality": "Mysticism",
      "Skill1": "Basic Wisdom",
      "Skill2": "Basic Mysticism",
      "Spell": "Stone Skin"
    },
    {
      "Name": "Serena",
      "Class": "Wizard",
      "Speciality": "Eagle Eye",
      "Skill1": "Basic Wisdom",
      "Skill2": "Basic Eagle Eye",
      "Spell": "Dispel"
    },
    {
      "Name": "Solmyr",
      "Class": "Wizard",
      "Speciality": "Chain Lightning",
      "Skill1": "Basic Wisdom",
      "Skill2": "Basic Sorcery",
      "Spell": "Chain Lightning"
    },
    {
      "Name": "Theodorus",
      "Class": "Wizard",
      "Speciality": "Magi",
      "Skill1": "Basic Wisdom",
      "Skill2": "Basic Ballisicts",
      "Spell": "Shield"
    },
    {
      "Name": "Dracon",
      "Class": "Wizard",
      "Speciality": "Enchanters",
      "Skill1": "Advanced Wisdom",
      "Skill2": "-",
      "Spell": "Haste"
    },
    {
      "Name": "Calh",
      "Class": "Demoniac",
      "Speciality": "Gogs",
      "Skill1": "Basic Archery",
      "Skill2": "Basic Scouting",
      "Spell": "-"
    },
    {
      "Name": "Fiona",
      "Class": "Demoniac",
      "Speciality": "Hell Hounds",
      "Skill1": "Advanced Scouting",
      "Skill2": "-",
      "Spell": "-"
    },
    {
      "Name": "Ignatius",
      "Class": "Demoniac",
      "Speciality": "Imps",
      "Skill1": "Basic Tactics",
      "Skill2": "Basic Resistance",
      "Spell": "-"
    },
    {
      "Name": "Marius",
      "Class": "Demoniac",
      "Speciality": "Demons",
      "Skill1": "Advanced Armorer",
      "Skill2": "-",
      "Spell": "-"
    },
    {
      "Name": "Nymus",
      "Class": "Demoniac",
      "Speciality": "Pit Fiends",
      "Skill1": "Advanced Offense",
      "Skill2": "-",
      "Spell": "-"
    },
    {
      "Name": "Octavia",
      "Class": "Demoniac",
      "Speciality": "Gold",
      "Skill1": "Basic Scholar",
      "Skill2": "Basic Offense",
      "Spell": "-"
    },
    {
      "Name": "Pyre",
      "Class": "Demoniac",
      "Speciality": "Ballista",
      "Skill1": "Basic Logistics",
      "Skill2": "Basic Artillery",
      "Spell": "-"
    },
    {
      "Name": "Rashka",
      "Class": "Demoniac",
      "Speciality": "Efreeti",
      "Skill1": "Basic Wisdom",
      "Skill2": "Basic Scholar",
      "Spell": "-"
    },
    {
      "Name": "Xeron",
      "Class": "Demoniac",
      "Speciality": "Devils",
      "Skill1": "Basic Leadership",
      "Skill2": "Basic Tactics",
      "Spell": "-"
    },
    {
      "Name": "Ash",
      "Class": "Heretic",
      "Speciality": "Bloodlust",
      "Skill1": "Basic Wisdom",
      "Skill2": "Basic Eagle Eye",
      "Spell": "Bloodlust"
    },
    {
      "Name": "Axsis",
      "Class": "Heretic",
      "Speciality": "Mysticism",
      "Skill1": "Basic Wisdom",
      "Skill2": "Basic Mysticism",
      "Spell": "Protection from Air"
    },
    {
      "Name": "Ayden",
      "Class": "Heretic",
      "Speciality": "Intelligence",
      "Skill1": "Basic Wisdom",
      "Skill2": "Basic Intelligence",
      "Spell": "View Air"
    },
    {
      "Name": "Calid",
      "Class": "Heretic",
      "Speciality": "Sulfur",
      "Skill1": "Basic Wisdom",
      "Skill2": "Basic Learning",
      "Spell": "Haste"
    },
    {
      "Name": "Olema",
      "Class": "Heretic",
      "Speciality": "Weakness",
      "Skill1": "Basic Wisdom",
      "Skill2": "Basic Ballisicts",
      "Spell": "Weakness"
    },
    {
      "Name": "Xyron",
      "Class": "Heretic",
      "Speciality": "Inferno (spell)",
      "Skill1": "Basic Wisdom",
      "Skill2": "Basic Scholar",
      "Spell": "Inferno"
    },
    {
      "Name": "Xarfax",
      "Class": "Heretic",
      "Speciality": "Fireball",
      "Skill1": "Basic Wisdom",
      "Skill2": "Basic Leadership",
      "Spell": "Fireball"
    },
    {
      "Name": "Zydar",
      "Class": "Heretic",
      "Speciality": "Sorcery",
      "Skill1": "Basic Wisdom",
      "Skill2": "Basic Sorcery",
      "Spell": "Stone Skin"
    },
    {
      "Name": "Charna",
      "Class": "Death Knight",
      "Speciality": "Wights",
      "Skill1": "Basic Necromancy",
      "Skill2": "Basic Tactics, Magic Arrow",
      "Spell": ""
    },
    {
      "Name": "Clavius",
      "Class": "Death Knight",
      "Speciality": "Gold",
      "Skill1": "Basic Necromancy",
      "Skill2": "Basic Offense, Magic Arrow",
      "Spell": ""
    },
    {
      "Name": "Galthran",
      "Class": "Death Knight",
      "Speciality": "Skeletons",
      "Skill1": "Basic Necromancy",
      "Skill2": "Basic Armorer",
      "Spell": "Shield"
    },
    {
      "Name": "Isra",
      "Class": "Death Knight",
      "Speciality": "Necromancy",
      "Skill1": "Advanced Necromancy",
      "Skill2": "-",
      "Spell": "Magic Arrow"
    },
    {
      "Name": "Moandor",
      "Class": "Death Knight",
      "Speciality": "Liches",
      "Skill1": "Basic Necromancy",
      "Skill2": "Basic Learning",
      "Spell": "Slow"
    },
    {
      "Name": "Straker",
      "Class": "Death Knight",
      "Speciality": "Walking Dead",
      "Skill1": "Basic Necromancy",
      "Skill2": "Basic Resistance",
      "Spell": "Haste"
    },
    {
      "Name": "Tamika",
      "Class": "Death Knight",
      "Speciality": "Black Knights",
      "Skill1": "Basic Necromancy",
      "Skill2": "Basic Offense",
      "Spell": "Magic Arrow"
    },
    {
      "Name": "Vokial",
      "Class": "Death Knight",
      "Speciality": "Vampires",
      "Skill1": "Basic Necromancy",
      "Skill2": "Basic Artillery",
      "Spell": "Stone Skin"
    },
    {
      "Name": "Haart Lich",
      "Class": "Death Knight",
      "Speciality": "Black Knights",
      "Skill1": "Advanced Necromancy",
      "Skill2": "-",
      "Spell": "Slow"
    },
    {
      "Name": "Ranloo",
      "Class": "Death Knight",
      "Speciality": "Ballista",
      "Skill1": "Basic Necromancy",
      "Skill2": "Basic Artillery",
      "Spell": "Haste"
    },
    {
      "Name": "Aislinn",
      "Class": "Necromancer",
      "Speciality": "Meteor Shower",
      "Skill1": "Basic Necromancy",
      "Skill2": "Basic Wisdom",
      "Spell": "Meteor Shower"
    },
    {
      "Name": "Nagash",
      "Class": "Necromancer",
      "Speciality": "Gold",
      "Skill1": "Basic Necromancy",
      "Skill2": "Basic Intelligence",
      "Spell": "Protection from Air"
    },
    {
      "Name": "Nimbus",
      "Class": "Necromancer",
      "Speciality": "Eagle Eye",
      "Skill1": "Basic Necromancy",
      "Skill2": "Basic Eagle Eye",
      "Spell": "Shield"
    },
    {
      "Name": "Sandro",
      "Class": "Necromancer",
      "Speciality": "Sorcery",
      "Skill1": "Basic Necromancy",
      "Skill2": "Basic Sorcery",
      "Spell": "Slow"
    },
    {
      "Name": "Septienna",
      "Class": "Necromancer",
      "Speciality": "Death Ripple",
      "Skill1": "Basic Necromancy",
      "Skill2": "Basic Scholar",
      "Spell": "Death Ripple"
    },
    {
      "Name": "Thant",
      "Class": "Necromancer",
      "Speciality": "Animate Dead",
      "Skill1": "Basic Necromancy",
      "Skill2": "Basic Mysticism",
      "Spell": "Animate Dead"
    },
    {
      "Name": "Vidomina",
      "Class": "Necromancer",
      "Speciality": "Necromancy",
      "Skill1": "Advanced Necromancy",
      "Skill2": "-",
      "Spell": "Curse"
    },
    {
      "Name": "Xsi",
      "Class": "Necromancer",
      "Speciality": "Stone Skin",
      "Skill1": "Basic Necromancy",
      "Skill2": "Basic Learning",
      "Spell": "Stone Skin"
    },
    {
      "Name": "Ajit",
      "Class": "Overlord",
      "Speciality": "Beholders",
      "Skill1": "Basic Leadership",
      "Skill2": "Basic Resistance",
      "Spell": "-"
    },
    {
      "Name": "Arlach",
      "Class": "Overlord",
      "Speciality": "Ballista",
      "Skill1": "Basic Offense",
      "Skill2": "Basic Artillery",
      "Spell": "-"
    },
    {
      "Name": "Dace",
      "Class": "Overlord",
      "Speciality": "Minotaurs",
      "Skill1": "Basic Offense",
      "Skill2": "Basic Tactics",
      "Spell": "-"
    },
    {
      "Name": "Damacon",
      "Class": "Overlord",
      "Speciality": "Gold",
      "Skill1": "Advanced Offense",
      "Skill2": "-",
      "Spell": "-"
    },
    {
      "Name": "Gunnar",
      "Class": "Overlord",
      "Speciality": "Logistics",
      "Skill1": "Basic Tactics",
      "Skill2": "Basic Logistics",
      "Spell": "-"
    },
    {
      "Name": "Lorelei",
      "Class": "Overlord",
      "Speciality": "Harpies",
      "Skill1": "Basic Leadership",
      "Skill2": "Basic Scouting",
      "Spell": "-"
    },
    {
      "Name": "Shakti",
      "Class": "Overlord",
      "Speciality": "Troglodytes",
      "Skill1": "Basic Offense",
      "Skill2": "Basic Tactics",
      "Spell": "-"
    },
    {
      "Name": "Sycna",
      "Class": "Overlord",
      "Speciality": "Manticores",
      "Skill1": "Basic Leadership",
      "Skill2": "Basic Scholar",
      "Spell": "-"
    },
    {
      "Name": "Mutare",
      "Class": "Overlord",
      "Speciality": "Dragons",
      "Skill1": "Basic Estates",
      "Skill2": "Basic Tactics",
      "Spell": "-"
    },
    {
      "Name": "Mutare Drake",
      "Class": "Overlord",
      "Speciality": "Dragons",
      "Skill1": "Basic Estates",
      "Skill2": "Basic Tactics",
      "Spell": "-"
    },
    {
      "Name": "Alamar",
      "Class": "Warlock",
      "Speciality": "Ressurection",
      "Skill1": "Basic Wisdom",
      "Skill2": "Basic Scholar",
      "Spell": "Ressurection"
    },
    {
      "Name": "Darkstorn",
      "Class": "Warlock",
      "Speciality": "Stone Skin",
      "Skill1": "Basic Wisdom",
      "Skill2": "Basic Learning",
      "Spell": "Stone Skin"
    },
    {
      "Name": "Deemer",
      "Class": "Warlock",
      "Speciality": "Meteor Shower",
      "Skill1": "Basic Wisdom",
      "Skill2": "",
      "Spell": "Basic Scouting"
    },
    {
      "Name": "Geon",
      "Class": "Warlock",
      "Speciality": "Eagle Eye",
      "Skill1": "Basic Wisdom",
      "Skill2": "Basic Eagle Eye",
      "Spell": "Slow"
    },
    {
      "Name": "Jaegar",
      "Class": "Warlock",
      "Speciality": "Mysticism",
      "Skill1": "Basic Wisdom",
      "Skill2": "Basic Mysticism",
      "Spell": "Shield"
    },
    {
      "Name": "Jeddite",
      "Class": "Warlock",
      "Speciality": "Ressurection",
      "Skill1": "Advanced Wisdom",
      "Skill2": "-",
      "Spell": "Ressurection"
    },
    {
      "Name": "Malekith",
      "Class": "Warlock",
      "Speciality": "Sorcery",
      "Skill1": "Basic Wisdom",
      "Skill2": "Basic Sorc",
      "Spell": "Bloodlust"
    },
    {
      "Name": "Sephinroth",
      "Class": "Warlock",
      "Speciality": "Crystal",
      "Skill1": "Basic Wisdom",
      "Skill2": "Basic Intelligence",
      "Spell": "Protection from Air"
    },
    {
      "Name": "Crag Hack",
      "Class": "Barbarian",
      "Speciality": "Offense",
      "Skill1": "Advanced Offense",
      "Skill2": "-",
      "Spell": "-"
    },
    {
      "Name": "Gretchin",
      "Class": "Barbarian",
      "Speciality": "Goblins",
      "Skill1": "Basic Offense",
      "Skill2": "Basic Pathfinding",
      "Spell": "-"
    },
    {
      "Name": "Gurnisson",
      "Class": "Barbarian",
      "Speciality": "Ballista",
      "Skill1": "Basic Offense",
      "Skill2": "Basic Artillery",
      "Spell": "-"
    },
    {
      "Name": "Jabarkas",
      "Class": "Barbarian",
      "Speciality": "Orcs",
      "Skill1": "Basic Offense",
      "Skill2": "Basic Archery",
      "Spell": "-"
    },
    {
      "Name": "Krellion",
      "Class": "Barbarian",
      "Speciality": "Ogres",
      "Skill1": "Basic Offense",
      "Skill2": "Basic Resistance",
      "Spell": "-"
    },
    {
      "Name": "Shiva",
      "Class": "Barbarian",
      "Speciality": "Rocs",
      "Skill1": "Basic Offense",
      "Skill2": "Basic Scouting",
      "Spell": "-"
    },
    {
      "Name": "Tyraxor",
      "Class": "Barbarian",
      "Speciality": "Wolf Riders",
      "Skill1": "Basic Offense",
      "Skill2": "Basic Tactics",
      "Spell": "-"
    },
    {
      "Name": "Yog",
      "Class": "Barbarian",
      "Speciality": "Cyclops",
      "Skill1": "Basic Offense",
      "Skill2": "Basic Ballistics",
      "Spell": "-"
    },
    {
      "Name": "Boragus",
      "Class": "Barbarian",
      "Speciality": "Ogres",
      "Skill1": "Basic Offense",
      "Skill2": "Basic Tactics",
      "Spell": "-"
    },
    {
      "Name": "Kilgor",
      "Class": "Barbarian",
      "Speciality": "Behemoths",
      "Skill1": "Advanced Offense",
      "Skill2": "-",
      "Spell": "-"
    },
    {
      "Name": "Dessa",
      "Class": "Battle Mage",
      "Speciality": "Logistics",
      "Skill1": "Basic Wisdom",
      "Skill2": "Basics Logistics",
      "Spell": "Stone Skin"
    },
    {
      "Name": "Gird",
      "Class": "Battle Mage",
      "Speciality": "Sorcery",
      "Skill1": "Basic Wisdom",
      "Skill2": "Basics Sorcery",
      "Spell": "Bloodlust"
    },
    {
      "Name": "Gundula",
      "Class": "Battle Mage",
      "Speciality": "Offense",
      "Skill1": "Basic Wisdom",
      "Skill2": "Basics Offense",
      "Spell": "Slow"
    },
    {
      "Name": "Oris",
      "Class": "Battle Mage",
      "Speciality": "Eagle Eye",
      "Skill1": "Basic Wisdom",
      "Skill2": "Basics Eagle Eye",
      "Spell": "Protection from Air"
    },
    {
      "Name": "Saurug",
      "Class": "Battle Mage",
      "Speciality": "Gems",
      "Skill1": "Basic Wisdom",
      "Skill2": "Basics Resistance",
      "Spell": "Bloodlust"
    },
    {
      "Name": "Terek",
      "Class": "Battle Mage",
      "Speciality": "Haste",
      "Skill1": "Basic Wisdom",
      "Skill2": "Basics Tactics",
      "Spell": "Haste"
    },
    {
      "Name": "Vey",
      "Class": "Battle Mage",
      "Speciality": "Ogre",
      "Skill1": "Basic Wisdom",
      "Skill2": "Basics Leadership",
      "Spell": "Magic Arrow"
    },
    {
      "Name": "Zubin",
      "Class": "Battle Mage",
      "Speciality": "Precision",
      "Skill1": "Basic Wisdom",
      "Skill2": "Basics Artillery",
      "Spell": "Precision"
    },
    {
      "Name": "Alkin",
      "Class": "Beastmaster",
      "Speciality": "Gorgons",
      "Skill1": "Basic Armorer",
      "Skill2": "Basic Offense",
      "Spell": "-"
    },
    {
      "Name": "Broghild",
      "Class": "Beastmaster",
      "Speciality": "Wyverns",
      "Skill1": "Basic Armorer",
      "Skill2": "Basic Scouting",
      "Spell": "-"
    },
    {
      "Name": "Bron",
      "Class": "Beastmaster",
      "Speciality": "Basilisks",
      "Skill1": "Basic Armorer",
      "Skill2": "Basic Leadership",
      "Spell": "-"
    },
    {
      "Name": "Drakon",
      "Class": "Beastmaster",
      "Speciality": "Gnolls",
      "Skill1": "Basic Armorer",
      "Skill2": "Basic Leadership",
      "Spell": "-"
    },
    {
      "Name": "Gerwulf",
      "Class": "Beastmaster",
      "Speciality": "Ballista",
      "Skill1": "Basic Armorer",
      "Skill2": "Basic Artillery",
      "Spell": "-"
    },
    {
      "Name": "Korbac",
      "Class": "Beastmaster",
      "Speciality": "Serpent Flies",
      "Skill1": "Basic Armorer",
      "Skill2": "Basic Pathfinding",
      "Spell": "-"
    },
    {
      "Name": "Tazar",
      "Class": "Beastmaster",
      "Speciality": "Armorer",
      "Skill1": "Advanced Armorer",
      "Skill2": "-",
      "Spell": "-"
    },
    {
      "Name": "Wystan",
      "Class": "Beastmaster",
      "Speciality": "Lizardmen",
      "Skill1": "Basic Armorer",
      "Skill2": "Basic Archery",
      "Spell": "-"
    },
    {
      "Name": "Andra",
      "Class": "Witch",
      "Speciality": "Intelligence",
      "Skill1": "Basic Wisdom",
      "Skill2": "Basic Intelligence",
      "Spell": "Dispel"
    },
    {
      "Name": "Merist",
      "Class": "Witch",
      "Speciality": "Stone Skin",
      "Skill1": "Basic Wisdom",
      "Skill2": "Basic Learning",
      "Spell": "Stone Skin"
    },
    {
      "Name": "Mirlanda",
      "Class": "Witch",
      "Speciality": "Weakness",
      "Skill1": "Advanced Wisdom",
      "Skill2": "-",
      "Spell": "Weakness"
    },
    {
      "Name": "Rosic",
      "Class": "Witch",
      "Speciality": "Mysticism",
      "Skill1": "Basic Wisdom",
      "Skill2": "Basic Mysticism",
      "Spell": "Magic Arrow"
    },
    {
      "Name": "Styg",
      "Class": "Witch",
      "Speciality": "Sorcery",
      "Skill1": "Basic Wisdom",
      "Skill2": "Basic Sorcery",
      "Spell": "Shield"
    },
    {
      "Name": "Tiva",
      "Class": "Witch",
      "Speciality": "Eagle Eye",
      "Skill1": "Basic Wisdom",
      "Skill2": "Basic Eagle Eye",
      "Spell": "Stone Skin"
    },
    {
      "Name": "Verdish",
      "Class": "Witch",
      "Speciality": "First Aid",
      "Skill1": "Basic Wisdom",
      "Skill2": "Basic First Aid",
      "Spell": "Protection from Fire"
    },
    {
      "Name": "Voy",
      "Class": "Witch",
      "Speciality": "Navigation",
      "Skill1": "Basic Wisdom",
      "Skill2": "Basic Navigation",
      "Spell": "Slow"
    },
    {
      "Name": "Adrienne",
      "Class": "Witch",
      "Speciality": "Fire Magic",
      "Skill1": "Basic Wisdom",
      "Skill2": "Expert Fire Magic",
      "Spell": "Inferno"
    },
    {
      "Name": "Kinkeria",
      "Class": "Witch",
      "Speciality": "Learning",
      "Skill1": "Basic Wisdom",
      "Skill2": "Basic Learning",
      "Spell": "Slow"
    },
    {
      "Name": "Erdamon",
      "Class": "Planeswalker",
      "Speciality": "Earth Elementals",
      "Skill1": "Basic Tactics",
      "Skill2": "Basic Estates",
      "Spell": "-"
    },
    {
      "Name": "Fiur",
      "Class": "Planeswalker",
      "Speciality": "Fire Elementals",
      "Skill1": "Advanced Offense",
      "Skill2": "-",
      "Spell": "-"
    },
    {
      "Name": "Ignissa",
      "Class": "Planeswalker",
      "Speciality": "Fire Elementals",
      "Skill1": "Basic Offense",
      "Skill2": "Basic Artillery -",
      "Spell": ""
    },
    {
      "Name": "Kalt",
      "Class": "Planeswalker",
      "Speciality": "Water Elemetals",
      "Skill1": "Basic Tactics",
      "Skill2": "Basic Learning",
      "Spell": "-"
    },
    {
      "Name": "Lacus",
      "Class": "Planeswalker",
      "Speciality": "Water Elemetals",
      "Skill1": "Advanced Tactics",
      "Skill2": "-",
      "Spell": "-"
    },
    {
      "Name": "Monere",
      "Class": "Planeswalker",
      "Speciality": "Psychic Elementals",
      "Skill1": "Basic Offense",
      "Skill2": "Basic Logistics",
      "Spell": "-"
    },
    {
      "Name": "Pasis",
      "Class": "Planeswalker",
      "Speciality": "Psychic Elementals",
      "Skill1": "Basic Offense",
      "Skill2": "Basic Artillery",
      "Spell": "-"
    },
    {
      "Name": "Thunar",
      "Class": "Planeswalker",
      "Speciality": "Earth Elementals",
      "Skill1": "Basic Tactics",
      "Skill2": "Basic Estates",
      "Spell": "-"
    },
    {
      "Name": "Aenain",
      "Class": "Elementalist",
      "Speciality": "Disrupting Ray",
      "Skill1": "Basic Wisdom",
      "Skill2": "Basic Air Magic",
      "Spell": "Disrupting Ray"
    },
    {
      "Name": "Brissa",
      "Class": "Elementalist",
      "Speciality": "Haste",
      "Skill1": "Basic Wisdom",
      "Skill2": "Basic Air Magic",
      "Spell": "Haste"
    },
    {
      "Name": "Ciele",
      "Class": "Elementalist",
      "Speciality": "Magic Arrow",
      "Skill1": "Basic Wisdom",
      "Skill2": "Basic Water Magic",
      "Spell": "Magic Arrow"
    },
    {
      "Name": "Gelare",
      "Class": "Elementalist",
      "Speciality": "Gold",
      "Skill1": "Basic Wisdom",
      "Skill2": "Basic Water Magic",
      "Spell": "Dispel"
    },
    {
      "Name": "Grindan",
      "Class": "Elementalist",
      "Speciality": "Gold",
      "Skill1": "Basic Wisdom",
      "Skill2": "Basic Earth Magic",
      "Spell": "Slow"
    },
    {
      "Name": "Inteus",
      "Class": "Elementalist",
      "Speciality": "Bloodlust",
      "Skill1": "Basic Wisdom",
      "Skill2": "Basic Fire Magic",
      "Spell": "Bloodlust"
    },
    {
      "Name": "Labetha",
      "Class": "Elementalist",
      "Speciality": "Stone Sking",
      "Skill1": "Basic Wisdom",
      "Skill2": "Basic Earth Magic",
      "Spell": "Stone Skin"
    },
    {
      "Name": "Luna",
      "Class": "Elementalist",
      "Speciality": "Fire Wall",
      "Skill1": "Basic Wisdom",
      "Skill2": "Basic Fire Magic",
      "Spell": "Fire Wall"
    }
  ]

const client = new tmi.client(options);
client.connect();
client.on('connected', (address, port) => {
   // client.action('h3info', "h3info-Bot aktiv!")
});

client.on('chat', (channel, user, message, self) => {
    
    var msg = message.substr(1)
    console.log(_.find(heroes, {'Name': msg}) == undefined);
    if (_.find(heroes, {'Name': msg}) != undefined)
    {
        var x = _.find(heroes, {'Name' : msg})
        client.action(channel, 
        JSON.stringify(x.Name + ": " + x.Class + " | " + x.Speciality + " | " + x.Skill1  + " | " + x.Skill2  + " | " + x.Spell ))

    
    }
    else if (message=='!Valeska23421421341241241234') {
        //https://cranky-bose-97b953.netlify.com/.netlify/functions/api/Valeska
        //http://localhost:9000/.netlify/functions/api/Valeska
        Request('https://cranky-bose-97b953.netlify.com/.netlify/functions/api/Valeska', { json: true }, (err, res, body) => {
        if (err) { return console.log("Uwe: " + err); }
        client.action('h3info', JSON.stringify(body.spec));
        });
    }
})