// TODO: Write code to define and export the Employee class

const inquirer = require("inquirer");
const Engineer = require(`./Engineer`);
const Intern = require(`./Intern`);
const Manager = require(`./Manager`);

const { createPromptModule } = require("inquirer");

class Employee{
    constructor(name, id, email){
        this.name = name;
        this.id = id;
        this.email = email;
    }
    createPromptModule(){

    }
    getName(){
        inquirer.prompt([
            {
                type: "input",
                message: "What is the employee's name?",
                name: "employName"
            }
        ])

    }
    getEmail(){
        inquirer.prompt([
            {
                type: "input",
                message: "What is the employee's email?",
                name: "employMail"
            }
        ])

    }
    getRole(){
        inquirer.prompt([
            {
                type: "list",
                message: "What is the empoyee's role?",
                name: "emplyRole",
                choices: ["Manager","Engineer", "Intern"]
            }
        ])
        .then((ans)=> {

            if(ans.emplyRole === 'Manager')
            {
                return new Manager(this.name, this.id, this.email, officeNum)
            }
            else if(ans.emplyRole === 'Engineer')
            {
                return new Engineer(this.name, this.id, this.email, gitHubMail)
            }
            else
            {
                return new Intern(this.name, this.id, this.email, school)
            }
        });

    }
}

module.exports = Employee;