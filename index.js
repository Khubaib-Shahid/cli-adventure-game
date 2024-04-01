#! /usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";
let userHealth = 100;
let compHealth = 100;
let opponentDes;
let player = await inquirer.prompt([
    { message: "Enter your name", name: "name", type: "input" },
    { message: "Select your Opponent", name: "opponent", type: "list", choices: [chalk.red(" Warrior "), chalk.red(" Knight "), chalk.red(" Archery "), chalk.red(" Assassin ")] }
]);
console.log(chalk.green(">").repeat(20) + " " + player.name + " " + "vs" + chalk.red(player.opponent) + chalk.green("<").repeat(20));
async function gameStart() {
    if (userHealth === 0) {
        console.log(chalk.red("You lose"));
    }
    else if (compHealth === 0) {
        console.log(chalk.green("You win"));
    }
    else if (userHealth === 0 && compHealth === 0) {
        console.log(chalk.red("Draw"));
    }
    else {
        let compDes = Math.floor(Math.random() * 2);
        let num = Math.floor(Math.random() * 3);
        if (compDes === 0) {
            opponentDes = "attack";
        }
        else if (compDes === 1) {
            opponentDes = "nothing";
        }
        else if (compDes === 1 && num === 2) {
            opponentDes = "heal";
        }
        let decision = await inquirer.prompt([
            { message: "Choose your action", type: "list", name: "action", choices: [chalk.red(" Attack "), chalk.red(" Heal "), chalk.red(" Run ")] }
        ]);
        if (decision.action === chalk.red(" Attack ") && opponentDes === "attack") {
            compHealth -= 25;
            userHealth -= 25;
            console.log(chalk.green("You attacked the opponent"), chalk.red("\nOpponent attacked you"));
            console.log(player.name, "health : ", userHealth, "Opponent health : ", compHealth);
            gameStart();
        }
        else if (decision.action === chalk.red(" Attack ") && opponentDes === "heal") {
            compHealth -= 25;
            compHealth < 100 ? compHealth += 25 : compHealth;
            console.log(chalk.green("You attacked the opponent"), chalk.red("\nOpponent heal his health"));
            console.log(player.name, "health : ", userHealth, "Opponent health : ", compHealth);
            gameStart();
        }
        else if (decision.action === chalk.red(" Heal ") && opponentDes === "attack") {
            userHealth -= 25;
            userHealth < 100 ? userHealth += 25 : userHealth;
            console.log(chalk.green("You heal your health"), chalk.red("\nOpponent attacked you"));
            console.log(player.name, "health : ", userHealth, "Opponent health : ", compHealth);
            gameStart();
        }
        else if (decision.action === chalk.red(" Heal ") && opponentDes === "heal") {
            userHealth < 100 ? userHealth += 25 : userHealth;
            compHealth < 100 ? compHealth += 25 : compHealth;
            console.log(chalk.green("You heal your health"), chalk.red("\nOpponent heal his health"));
            console.log(player.name, "health : ", userHealth, "Opponent health : ", compHealth);
            gameStart();
        }
        else if (decision.action === chalk.red(" Run ")) {
            console.log(chalk.red("You ran away from the fight"));
            console.log();
        }
        else if (decision.action === chalk.red(" Attack ") && opponentDes === "nothing") {
            compHealth -= 25;
            console.log(chalk.green("You attacked the opponent"), chalk.red("\nOpponent did nothing"));
            console.log(player.name, "health : ", userHealth, "Opponent health : ", compHealth);
            gameStart();
        }
        else if (decision.action === chalk.red(" Heal ") && opponentDes === "nothing") {
            userHealth < 100 ? userHealth += 25 : userHealth;
            console.log(chalk.green("You heal your health"), chalk.red("\nOpponent did nothing"));
            console.log(player.name, "health : ", userHealth, "Opponent health : ", compHealth);
            gameStart();
        }
    }
}
gameStart();
