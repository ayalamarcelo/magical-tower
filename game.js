const container = document.getElementById('bannerSpan');

const asciiArt = [
    "                 ░▀█▀░█░█░█▀▀░░░█░░░▀█▀░█▀▀░█░█░▀█▀░█░█░█▀█░█░█░█▀▀░█▀▀",
    "                 ░░█░░█▀█░█▀▀░░░█░░░░█░░█░█░█▀█░░█░░█▀█░█░█░█░█░▀▀█░█▀▀",
    "                 ░░▀░░▀░▀░▀▀▀░░░▀▀▀░▀▀▀░▀▀▀░▀░▀░░▀░░▀░▀░▀▀▀░▀▀▀░▀▀▀░▀▀▀",
    "                                        ",
    "                          db            ",
    "                  .-='- ._][_.      .--==-,",
    "                 (_  (  _IIII_   _(    )  `.",
    "                  (     |\" \" |-.(  ` ,_  `  )",
    "                    '-._HHHHHH  `)---' `'--'    ",
    "                        |.   |--`                    ",
    "                        |    |       ",
    "                        |    |",
    "              _H___,=====;___|               ",
    "           n_/____/____/``\\__\\",
    "          /__|:: :|. .|:::|::|",
    "       _%&|__&%_\"_|_\"_|_ H|__|__",
    "         `\";;;;\"\";;;;'\";;'\"\"\"';;;;``;;-.",
    "      .  ' `\";';  `;;;  `;'   `;  .`' `\\:::::::::",
    "                          . '  .  `' .  `';. :::::::::::::::",
    ". '  .  `' .  `';.    '   .   .  |^-`^~_^^~``-^^_~^^-`^~ ::::::::::::::::::::::::::::::",
    "     ____--`~    '--~~__ :::::::::::::::__ ----~    ~`---, ::::::::::::::::::::::::::::::___",
    "-~--~                   ~---__ ,--~'                  ~~----_____-~'   `~----~~",
    "",
    "",
    "                  [For a list of available commands, type 'help'.]",
    ""
];

const enemies = {
    seaSerpent: {
        name: "Sea Serpent",
        health: 100,
        damage: 20,
        specialAbility: "Tail Swipe",
        description: "A fearsome serpent of the deep sea."
    },
    ghostPirate: {
        name: "Ghost Pirate",
        health: 80,
        damage: 15,
        specialAbility: "Phantom Slash",
        description: "The vengeful spirit of a long-dead pirate."
    },
    kraken: {
        name: "Kraken",
        health: 150,
        damage: 25,
        specialAbility: "Tentacle Slam",
        description: "A colossal sea monster with immense strength."
    },
    drownedMariner: {
        name: "Drowned Mariner",
        health: 90,
        damage: 18,
        specialAbility: "Spectral Lunge",
        description: "The ghost of a sailor lost at sea, forever seeking vengeance."
    },
    cursedCaptain: {
        name: "Cursed Captain",
        health: 110,
        damage: 22,
        specialAbility: "Haunting Command",
        description: "A once-mighty captain now cursed to roam the seas as a malevolent spirit."
    },
    wraithOfTheDeep: {
        name: "Wraith of the Deep",
        health: 120,
        damage: 20,
        specialAbility: "Chilling Gaze",
        description: "An eerie wraith that can freeze its victims with a mere glance."
    },
    phantomMariner: {
        name: "Phantom Mariner",
        health: 85,
        damage: 17,
        specialAbility: "Ghostly Strike",
        description: "A spectral sailor who attacks with eerie precision."
    },
    seaWitch: {
        name: "Sea Witch",
        health: 95,
        damage: 19,
        specialAbility: "Tidal Curse",
        description: "A malevolent sea witch who uses dark magic to curse her foes."
    },
    revenantCorsair: {
        name: "Revenant Corsair",
        health: 105,
        damage: 21,
        specialAbility: "Blade of Shadows",
        description: "A cursed corsair who attacks with shadowy blades."
    }
};


document.getElementById("user-input").addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        event.preventDefault();
        let userInput = this.value.trim().toLowerCase();
        let outputContainer = document.getElementById("output");

        switch (userInput) {
            case "help":
                displayOutput("[ explore / out ] [ attack ] [ hide ] [ use potion ] [ stats ] [ clear ] [ buy ]");
                break;
            case "explore":
                explore();
                break;
            case "explore out":
                explore("out");
                break;
            case "attack":
                attack();
                break;
            case "hide":
                hide();
                break;
            case "use potion":
                usePotion();
                break;
            case "stats":
                displayStats();
                break;
            case "clear":
                clearOutput();
                break;
            case "buy":
                displayOutput("[ old gun ] (100 gold) [ health potion ] (50 gold) [ oil bottle ] (25 gold)");
                break;
            case "old gun":
            case "health potion":
            case "oil bottle":
                buy(userInput);
                break;
            default:
                displayOutput(`${userInput}: Command not recognized`);
        }

        this.value = "";
    }
});

function displayOutput(outputText) {
    let outputLine = document.createElement("div");
    outputLine.textContent = outputText;
    document.getElementById("output").appendChild(outputLine);
}

function clearOutput() {
    document.getElementById("output").innerHTML = "";
}

let playerHealth = 100;
let playerGold = 0;
let potionCount = 0;
let oilBottleCount = 0;
let enemyPresent = false;
let dagonHealth = 60;
let items = {
    "old gun": { price: 100, damage: 30 },
    "health potion": { price: 50, heal: 30 },
    "oil bottle": { price: 25, damage: 0 }
};

let selectedEnemy = null;

function explore(command = "in") {
    if (enemyPresent) {
        displayOutput("You are already in combat!");
    } else {
        if (command === "out") {
            displayOutput("It's raining!...");

            const enemyKeys = Object.keys(enemies);
            const randomKey = enemyKeys[Math.floor(Math.random() * enemyKeys.length)];
            selectedEnemy = enemies[randomKey];

            displayOutput(`You encountered ${selectedEnemy.name}!`);
            enemyPresent = true;
            displayOutput(`You are now in combat with ${selectedEnemy.name}! What do you want to do: [ attack ] [ hide ]`);
        } else {
            displayOutput("You are exploring the area...");

            let event = Math.random();
            if (event < 0.3) {
                let treasureEvent = Math.random();
                if (treasureEvent < 0.4) {
                    displayOutput("You found a treasure chest!");
                    let treasureType = Math.random();
                    if (treasureType < 0.3) {
                        let goldAmount = Math.floor(Math.random() * 50) + 10;
                        playerGold += goldAmount;
                        displayOutput(`You found ${goldAmount} gold coins!`);
                        displayStats();
                    } else if (treasureType < 0.6) {
                        potionCount++;
                        displayOutput("You found a health potion!");
                    } else {
                        let healthAmount = Math.floor(Math.random() * 20) + 10;
                        playerHealth += healthAmount;
                        if (playerHealth > 100) playerHealth = 100;
                        displayOutput(`You found a health pack and gained ${healthAmount} health!`);
                    }
                } else {
                    displayOutput("You didn't find anything of interest.");
                }
            } else {
                displayOutput("You didn't find anything of interest.");
            }
        }
    }
}

function displayStats() {
    displayOutput(`Player Stats:
    Health: ${playerHealth}
    Gold: ${playerGold}
    Health Potions: ${potionCount}
    Oil Bottles: ${oilBottleCount}`);
}

function attack() {
    if (enemyPresent && selectedEnemy) {
        let playerDamage = Math.floor(Math.random() * 20) + 10;
        selectedEnemy.health -= playerDamage;
        displayOutput(`You attacked ${selectedEnemy.name} for ${playerDamage} damage!`);
        if (selectedEnemy.health <= 0) {
            displayOutput(`You defeated ${selectedEnemy.name}!`);
            enemyPresent = false;
            selectedEnemy = null;

            let dropEvent = Math.random();
            if (dropEvent < 0.4) {
                let goldAmount = Math.floor(Math.random() * 100) + 50;
                playerGold += goldAmount;
                displayOutput(`${selectedEnemy.name} dropped ${goldAmount} gold coins!`);
                displayStats();
            } else if (dropEvent < 0.7) {
                potionCount++;
                displayOutput(`${selectedEnemy.name} dropped a health potion!`);
            } else {
                let healthAmount = Math.floor(Math.random() * 50) + 20;
                playerHealth += healthAmount;
                if (playerHealth > 100) playerHealth = 100;
                displayOutput(`${selectedEnemy.name} dropped a health pack and you gained ${healthAmount} health!`);
            }
        } else {
            dagonAttack();
        }
    } else {
        displayOutput("There's nothing to attack!");
    }
}

function dagonAttack() {
    if (enemyPresent && selectedEnemy) {
        let enemyDamage = Math.floor(Math.random() * 15) + 5;
        playerHealth -= enemyDamage;
        displayOutput(`${selectedEnemy.name} attacked you for ${enemyDamage} damage!`);
        if (playerHealth <= 0) {
            displayOutput("You have been defeated!");
            playerHealth = 100;
            playerGold = 0;
            potionCount = 0;
            displayOutput("You respawned at the starting point with full health, but lost all your gold and potions!");
        }
    }
}

function hide() {
    if (enemyPresent) {
        let hideSuccess = Math.random() < 0.5;
        if (hideSuccess) {
            displayOutput("You successfully hid from Dagon!");
            enemyPresent = false;
            dagonHealth = 60;
        } else {
            displayOutput("You failed to hide. Dagon found you!");
            dagonAttack();
        }
    } else {
        displayOutput("There's nothing to hide from!");
    }
}

function usePotion() {
    if (potionCount > 0) {
        playerHealth += 30;
        if (playerHealth > 100) {
            playerHealth = 100;
        }
        potionCount--;
        displayOutput("You used a health potion!");
        displayOutput(`Your health is now ${playerHealth}`);
    } else {
        displayOutput("You don't have any health potions!");
    }
}

function buy(item) {
    if (items[item]) {
        if (playerGold >= items[item].price) {
            playerGold -= items[item].price;
            if (item === "health potion") {
                potionCount++;
                displayOutput("You bought a health potion!");
            } else if (item === "old gun") {
                displayOutput("You bought an old gun! It will increase your attack damage.");
                
            } else if (item === "oil bottle") {
                oilBottleCount++;
                displayOutput("You bought an oil bottle!");
            }
        } else {
            displayOutput("You don't have enough gold!");
        }
    } else {
        displayOutput("Item not recognized!");
    }
}


const preElement = document.createElement('pre');
const asciiText = asciiArt.join('\n');
preElement.textContent = asciiText;
container.appendChild(preElement);