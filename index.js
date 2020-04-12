const inquirer = require("inquirer");
const axios = require("axios");
const generate = require("./utils/generateMarkdown");
const fs = require("fs");
const dotenv = require("dotenv");
dotenv.config();

let email;
let profile;

const questions = [
    { message: "What is your GitHub username? ", name: "username" },
    { message: "What is the name of your repository? ", name: "repo" },
    { message: "What is your project's title? ", name: "title" },
    { message: "Give a description of your project: ", name: "description" },
    { message: "What are the installation steps? ", name: "install" },
    { message: "Descibe the use for your application: ", name: "use" },
    { message: "Provide any tests for your application: ", name: "tests" },
    { message: "How would you like others to contibute to your project? ", name: "contribute" },
    { message: "Provide a license for this application: ", name: "license" }
];

function writeToFile(fileName, data) {
    fs.writeFile(fileName, data, err => {
        if (err) throw err;
        console.log("README Generated!");
    });
}

function init() {
    inquirer.prompt(questions)
        .then(answers => {
            const accessToken = process.env.accessToken;
            axios.get(`https://api.github.com/users/${answers.username}?access_token=${accessToken}`)
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
