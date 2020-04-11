const inquirer = require("inquirer");
const axios = require("axios");
const generate = require("./utils/generateMarkdown");
const fs = require("fs");

let email;
let profile;

const questions = [
    { message: "What is your GitHub username? ", name: "username" },
    { message: "What is your project's title? ", name: "title" },
    { message: "Give a description of your project: ", name: "description" },
    { message: "What are the installation steps? ", name: "install" },
    { message: "Descibe the use for your project: ", name: "use" },
    { message: "Provide tests for your application: ", name: "tests" },
    { message: "How would you like others to contibute to your project? ", name: "contribute" },
    { message: "What is the license for this project? ", name: "license" }
];

function writeToFile(fileName, data) {
    fs.writeFile(fileName, data, err => {
        if (err) throw err;
        console.log("README Generated!")
    })
}

function init() {
    inquirer.prompt(questions)
        .then(answers => {
            axios.get(`https://api.github.com/users/${answers.username}?access_token=496f0199e2f64036cdc23da39c457a58ca1e4676`)
                .then(response => {
                    email = response.data.email;
                    profile = response.data.avatar_url;
                    answers.email = email;
                    answers.profile = profile;
                    const data = generate(answers);
                    writeToFile("README.md", data);
                })
        });
}

init();
