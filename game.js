const container = document.getElementById('bannerSpan');

const asciiArt = [
    "             ░▀█▀░█░█░█▀▀░░░█░░░▀█▀░█▀▀░█░█░▀█▀░█░█░█▀█░█░█░█▀▀░█▀▀",
    "             ░░█░░█▀█░█▀▀░░░█░░░░█░░█░█░█▀█░░█░░█▀█░█░█░█░█░▀▀█░█▀▀",
    "             ░░▀░░▀░▀░▀▀▀░░░▀▀▀░▀▀▀░▀▀▀░▀░▀░░▀░░▀░▀░▀▀▀░▀▀▀░▀▀▀░▀▀▀",
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

document.getElementById("user-input").addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        event.preventDefault();
        let userInput = this.value.trim().toLowerCase();
        let outputContainer = document.getElementById("output");

        switch (userInput) {
            case "help":
                displayOutput("What do you want to do: [ explore ] [ explore out ] [ attack ] [ hide ] [ use potion ] [ stats ] [ clear ] [ buy ]");
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
                displayOutput("What do you want to buy: [ sword ] (100 gold) [ health potion ] (50 gold)");
                break;
            case "sword":
            case "health potion":
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
let enemyPresent = false;
let goblinHealth = 50;
let dagonHealth = 70;
let items = {
    sword: { price: 100, damage: 30 },
    healthPotion: { price: 50, heal: 30 }
};

function explore(command = "in") {
    if (enemyPresent) {
        displayOutput("You are already in combat!");
    } else {
        if (command === "out") {
            displayOutput("Its raining!...");
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
                    displayOutput("You encountered Dagon!");
                    enemyPresent = true;
                    displayOutput("You are now in combat with Dagon! What do you want to do: [ attack ] [ hide ]");
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
    Health Potions: ${potionCount}`);
}

function attack() {
    if (enemyPresent) {
        let playerDamage = Math.floor(Math.random() * 20) + 10;
        dagonHealth -= playerDamage;
        displayOutput(`You attacked Dagon for ${playerDamage} damage!`);
        if (dagonHealth <= 0) {
            displayOutput("You defeated Dagon!");
            enemyPresent = false;
            dagonHealth = 70;

            // Dagon drops treasures or gold
            let dropEvent = Math.random();
            if (dropEvent < 0.4) {
                let goldAmount = Math.floor(Math.random() * 100) + 50;
                playerGold += goldAmount;
                displayOutput(`Dagon dropped ${goldAmount} gold coins!`);
            } else if (dropEvent < 0.7) {
                potionCount++;
                displayOutput("Dagon dropped a health potion!");
            } else {
                let healthAmount = Math.floor(Math.random() * 50) + 20;
                playerHealth += healthAmount;
                if (playerHealth > 100) playerHealth = 100;
                displayOutput(`Dagon dropped a health pack and you gained ${healthAmount} health!`);
            }
        } else {
            dagonAttack();
        }
    } else {
        displayOutput("There's nothing to attack!");
    }
}

function dagonAttack() {
    let dagonDamage = Math.floor(Math.random() * 15) + 5;
    playerHealth -= dagonDamage;
    displayOutput(`Dagon attacked you for ${dagonDamage} damage!`);
    if (playerHealth <= 0) {
        displayOutput("You have been defeated!");
        playerHealth = 100;
        playerGold = 0;
        potionCount = 0;
        displayOutput("You respawned at the starting point with full health, but lost all your gold and potions!");
    }
}


function hide() {
    if (enemyPresent) {
        let hideSuccess = Math.random() < 0.5;
        if (hideSuccess) {
            displayOutput("You successfully hide from Dagon!");
            enemyPresent = false;
            dagonHealth = 70;
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
            } else if (item === "sword") {
                displayOutput("You bought a sword! It will increase your attack damage.");
                // Aquí puedes agregar funcionalidad para aumentar el daño del jugador
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