const inquirer = require("inquirer")
const FS = require("fs")
const Employee = require("./lib/Employee")
const Engineer = require("./lib/Engineer")
const Manager = require("./lib/Manager")
const Intern = require("./lib/Intern")
const Template = require("./util/generateHtml")
let team = []

function askQuestion() {
    inquirer.prompt([
        {
            name: "startProg",
            type: "list",
            message: "Are you looking to start a team page?",
            choices: ["Yes", "No"]
        }
    ]).then(answers => {
        switch(answers.startProg){
            case "Yes":
                console.log("Alright let's get down to business")
                runTeam()
                break;
            case "No":
                console.log("Goodbye!")
                break;
        }
    })
}

function runTeam(){
    makeManager()
    makeEngineer()
    nextMember()
    makeTeampage()
}

function makeManager()
{
    inquirer.prompt([{
        name: "managerName",
        type: "input",
        message: "Alright lets get started. First things first What is the manager's name?"
    },
    {
        name: "managerID",
        type: "input",
        message: "Ok then; can you input the manager's ID number?"
    },
    {
        name: "managerEmail",
        type: "input",
        message: "Next; what is the manager's email address?"
    },
    {
        name: "officeNum",
        type: "input",
        message: "Finally; what is the office number?"
    }
    ]).then(answers=>{

        const manager = new Manager(answers.managerName, answers.managerID, answers.managerEmail, answers.officeNum)
        team.push(manager)
    })
}

function makeEngineer(){
    inquirer.prompt([{
        name: "engineerName",
        type: "input",
        message: "Alright lets get started. First things first What is the manager's name?"
    },
    {
        name: "engineerID",
        type: "input",
        message: "Ok then; can you input the manager's ID number?"
    },
    {
        name: "engineerEmail",
        type: "input",
        message: "Next; what is the manager's email address?"
    },
    {
        name: "engineerGithub"
    }
    ]).then(answers=>{

        const engineer = new Engineer(answers.engineerName, answers.engineerID, answers.engineerEmail, answers.engineerGithub)
        team.push(engineer)
    })
}

function makeIntern()
{
    inquirer.prompt([{
        name: "internName",
        type: "input",
        message: "Alright lets get started. First things first What is the manager's name?"
    },
    {
        name: "internID",
        type: "input",
        message: "Ok then; can you input the manager's ID number?"
    },
    {
        name: "internEmail",
        type: "input",
        message: "Next; what is the manager's email address?"
    },
    {
        name: "internSchool"
    }
    ]).then(answers=>{

        const intern = new Intern(answers.internName, answers.internID, answers.internEmail, answers.internSchool)
        team.push(intern)
    })
}

function makeTeampage()
{
    for (let i = 0; i < team.length; i++) {
        
    }
    inquirer.prompt([
        {
            name:"name",
            type:"input",
            message: "What would you like the team name to be?",
        }
    ]).then(answer =>{
        FS.writeFile(`${answer.name}`, stringHTML,(err, data)=>{
            if(err){
                throw err
            }
        })
    } )

}

function nextMember()
{
    inquirer.prompt([
        {
            name: "decision",
            type: "list",
            message: "Would you like to add another team member?",
            choices: ["Yes", "No"]
        }
    ]).then(answer =>{
        if(answer.decision === "Yes")
        {
            inquirer.prompt([
                {
                    name: "which",
                    type: "list",
                    message: "Engineer or Intern?",
                    choices: ["Engineer", "Intern", 'Nevermind']
                }
            ]).then(answer =>{
                switch(answer.which)
                {
                    case "Engineer":
                        makeEngineer()
                        nextMember()
                        break;
                    case "Intern":
                        makeIntern()
                        nextMember()
                        break;
                    default:
                        console.log("Alright lets make the team page!")
                        break;
                }
            })
        }
    })
}

askQuestion()