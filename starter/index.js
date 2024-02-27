const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./src/page-template.js");


// TODO: Write Code to gather information about the development team members, and render the HTML file.

// Function to prompt user for manager's information
function promptManager() {
    return inquirer.prompt([
      {
        type: "input",
        name: "name",
        message: "Enter the manager's name:",
      },
      {
        type: "input",
        name: "id",
        message: "Enter the manager's ID:",
      },
      {
        type: "input",
        name: "email",
        message: "Enter the manager's email:",
      },
      {
        type: "input",
        name: "officeNumber",
        message: "Enter the manager's office number:",
      },
    ]);
  }
  
  // Function to prompt user for engineer's information
  function promptEngineer() {
    return inquirer.prompt([
      {
        type: "input",
        name: "name",
        message: "Enter the engineer's name:",
      },
      {
        type: "input",
        name: "id",
        message: "Enter the engineer's ID:",
      },
      {
        type: "input",
        name: "email",
        message: "Enter the engineer's email:",
      },
      {
        type: "input",
        name: "github",
        message: "Enter the engineer's GitHub username:",
      },
    ]);
  }

  // Function to prompt user for intern's information
function promptIntern() {
    return inquirer.prompt([
      {
        type: "input",
        name: "name",
        message: "Enter the intern's name:",
      },
      {
        type: "input",
        name: "id",
        message: "Enter the intern's ID:",
      },
      {
        type: "input",
        name: "email",
        message: "Enter the intern's email:",
      },
      {
        type: "input",
        name: "school",
        message: "Enter the intern's school:",
      },
    ]);
  }
  
  // Function to prompt user for next action
  function promptNextAction() {
    return inquirer.prompt([
      {
        type: "list",
        name: "action",
        message: "What would you like to do next?",
        choices: ["Add an engineer", "Add an intern", "Finish building the team"],
      },
    ]);
}

// Function to write HTML to file
function writeToFile(html) {
    fs.writeFile(outputPath, html, (err) => {
      if (err) throw err;
      console.log('Team HTML file generated successfully!');
    });
  }

  // Main function to run the application
async function main() {
    const employees = [];
  
    // Prompt for manager's information
    const managerData = await promptManager();
    const manager = new Manager(managerData.name, managerData.id, managerData.email, managerData.officeNumber);
    employees.push(manager);
  
    let nextAction = '';
// Continue prompting for team members until user finishes building the team
do {
    nextAction = await promptNextAction();

    if (nextAction.action === 'Add an engineer') {
      // Prompt for engineer's information
      const engineerData = await promptEngineer();
      const engineer = new Engineer(engineerData.name, engineerData.id, engineerData.email, engineerData.github);
      employees.push(engineer);
    } else if (nextAction.action === 'Add an intern') {
      // Prompt for intern's information
      const internData = await promptIntern();
      const intern = new Intern(internData.name, internData.id, internData.email, internData.school);
      employees.push(intern);
    }
  } while (nextAction.action !== 'Finish building the team');

  // Generate HTML using render function
const html = render(employees);

// Write HTML to file
writeToFile(html);
}

// Call main function to start the application
main();