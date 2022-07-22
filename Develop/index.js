const inquirer = require("inquirer")
const FS = require("fs")
const Employee = require("./lib/Employee")
const Engineer = require("./lib/Engineer")
const Manager = require("./lib/Manager")
const Intern = require("./lib/Intern")
const generateHTML = require("./util/generateHtml")

let newTeam = []

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
    newTeam = []
    makeManager()
}

function makeTeampage()
{    
    inquirer.prompt([
        {
            type: "input",
            message: "What is the Name of the team?",
            name:"teamName"
        }
    ]).then(answer =>{
       
        const finalPage = generateHTML(newTeam)
        FS.writeFile(`./${answer.teamName}.html`, finalPage ,(err, data)=>{
            if(err){
                throw err

            
            }
            console.log('working!')
        })
        askQuestion()
    })
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
        newTeam.push(manager)
        nextMember()
    })

}

function makeEngineer(){
    inquirer.prompt([{
        name: "engineerName",
        type: "input",
        message: "Alright lets get started. First things first What is the engineer's name?"
    },
    {
        name: "engineerID",
        type: "input",
        message: "Ok then; can you input the engineer's ID number?"
    },
    {
        name: "engineerEmail",
        type: "input",
        message: "Next; what is the engineer's email address?"
    },
    {
        name: "engineerGithub",
        type: "input",
        message: "Finally what is the engineer's Github user name?"
    }
    ]).then(answers=>{
        const engineer = new Engineer(answers.engineerName, answers.engineerID, answers.engineerEmail, answers.engineerGithub)
        newTeam.push(engineer)
        nextMember()
    })

}

function makeIntern()
{
    inquirer.prompt([{
        name: "internName",
        type: "input",
        message: "Alright lets get started. First things first What is the intern's name?"
    },
    {
        name: "internID",
        type: "input",
        message: "Ok then; can you input the intern's ID number?"
    },
    {
        name: "internEmail",
        type: "input",
        message: "Next; what is the interns's email address?"
    },
    {
        name: "internSchool",
        type: "input",
        message: "What school is the intern going to?"
    }
    ]).then (answers=>{

        const intern = new Intern(answers.internName, answers.internID, answers.internEmail, answers.internSchool)
        newTeam.push(intern)
        nextMember()
    })


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
                        break;
                    case "Intern":
                        makeIntern()
                        break;
                    case "Nevermind":
                        makeTeampage()
                        break;
                    default:

                        break;
                }
            })
        }
        else{
            makeTeampage()
        }
    })
}

askQuestion()