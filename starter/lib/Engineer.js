// TODO: Write code to define and export the Engineer class.  HINT: This class should inherit from Employee.

const Employee = require("./Employee");

class Engineer extends Employee {
    constructor(name, id, email, github) {
        // Call the constructor of the parent class (Employee)
        super(name, id, email);
        this.github = github;
    }

    getGithub() {
        return this.github;
    }

    // Override the getRole() method
    getRole() {
        return 'Engineer';
    }
}

module.exports = Engineer;
