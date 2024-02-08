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
    "Welcome to Magical Tower [Version 1.0.22621.3007]",
    "For a list of available commands, type 'help'.",
];

document.getElementById("user-input").addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        event.preventDefault();
        let userInput = this.value.trim().toLowerCase();
        let outputContainer = document.getElementById("output");

        switch (userInput) {
            case "help":
                displayOutput("What do you want to do: [ explore ] [ attack ] [ stats ] [ clear ]");
                break;
            case "explore":
                explore();
                break;
            case "attack":
                attack();
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

function explore() {
    displayOutput("You are exploring the area...");
    // Simulated random events during exploration
    let event = Math.random();
    if (event < 0.5) {
        displayOutput("You found a treasure chest!");
    } else {
        displayOutput("You encountered a monster!");
        // Simulate combat with a monster
        let monsterHealth = Math.floor(Math.random() * 100) + 1;
        let playerDamage = Math.floor(Math.random() * 50) + 1;
        let monsterDamage = Math.floor(Math.random() * 20) + 1;
        let playerHealth = 100;

        while (playerHealth > 0 && monsterHealth > 0) {
            displayOutput(`You attack the monster for ${playerDamage} damage!`);
            monsterHealth -= playerDamage;
            if (monsterHealth <= 0) {
                displayOutput("You defeated the monster!");
                // Award experience points and possibly level up the player
                break;
            }
            displayOutput(`The monster attacks you for ${monsterDamage} damage!`);
            playerHealth -= monsterDamage;
            if (playerHealth <= 0) {
                displayOutput("You have been defeated!");
                break;
            }
        }
    }
}

function attack() {
    displayOutput("You are attacking...");
    // Placeholder for combat mechanics
}

function displayStats() {
    displayOutput("Player Stats:");
    // Placeholder for displaying player stats
}

const preElement = document.createElement('pre');
const asciiText = asciiArt.join('\n');
preElement.textContent = asciiText;
container.appendChild(preElement);