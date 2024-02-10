const container = document.getElementById('bannerSpan');

const asciiArt = [
    "                                                |>>>",
    "                                                |",
    "                                            _  _|_  _",
    "                                           |;|_|;|_|;|",
    "                                           \\\\.    .  /",
    "                                            \\\\:  .  /",
    "                                             ||:   |",
    "                                             ||:.  |",
    "                                             ||:  .|",
    "                                             ||:   |       \\,/",
    "                                             ||: , |            /`\\",
    "                                             ||:   |",
    "                                             ||: . |",
    "              __                            _||_   |",
    "     ____--`~    '--~~__            __ ----~    ~`---,              ___",
    "-~--~                   ~---__ ,--~'                  ~~----_____-~'   `~----~~",
    "Welcome to Magical Code Tower [Version Alfa]",
    "For a list of available commands, type 'help'.",
];

document.getElementById("user-input").addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        event.preventDefault();
        let userInput = this.value.trim().toLowerCase();
        let outputContainer = document.getElementById("output");

        switch (userInput) {
            case "help":
                displayOutput("What do you want to do: [ explore ] [ attack ] [ use potion ] [ stats ] [ clear ]");
                break;
            case "explore":
                explore();
                break;
            case "attack":
                attack();
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

function explore() {
    if (enemyPresent) {
        displayOutput("You are already in combat!");
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
                    displayOutput(`You found a health pack and gained ${healthAmount} health!`);
                }
            } else {
                displayOutput("You encountered a Goblin!");
                enemyPresent = true;
                displayOutput("You are now in combat with the Goblin!");
                goblinAttack();
            }
        } else {
            displayOutput("You didn't find anything of interest.");
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
        goblinHealth -= playerDamage;
        displayOutput(`You attacked the Goblin for ${playerDamage} damage!`);
        if (goblinHealth <= 0) {
            displayOutput("You defeated the Goblin!");
            enemyPresent = false;
            goblinHealth = 50;
        } else {
            goblinAttack();
        }
    } else {
        displayOutput("There's nothing to attack!");
    }
}

function goblinAttack() {
    let goblinDamage = Math.floor(Math.random() * 10) + 5;
    playerHealth -= goblinDamage;
    displayOutput(`The Goblin attacked you for ${goblinDamage} damage!`);
    if (playerHealth <= 0) {
        displayOutput("You have been defeated!");
        playerHealth = 100;
        playerGold = 0;
        potionCount = 0;
        displayOutput("You respawned at the starting point with full health, but lost all your gold and potions!");
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

const preElement = document.createElement('pre');
const asciiText = asciiArt.join('\n');
preElement.textContent = asciiText;
container.appendChild(preElement);
