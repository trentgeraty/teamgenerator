const inquirer = require("inquirer");
const jest = require("jest");
const Engineer = require("./lib/engineer.js");
const Intern = require("./lib/intern.js");
const Manager = require("./lib/manager.js");
var uniqueId = 0;
var teamArray = [];

function promptUser(answers) {
    return inquirer.prompt([
        {
            type: "list",
            name: "role",
            message: "what is your role?",
            choices: ["Engineer", "Intern", "Manager"]
        },
    ]).then(function (res) {
        
        console.log(res)
        if (res.role === "Engineer") {
            inquirer.prompt([
                {
                    name: "name",
                    message: "What is your name?",
                    type: "input"
                },
                {
                    name: "github",
                    type: "input",
                    message: "What is your github Username?"
                },
                {
                    name: "email",
                    type: "input",
                    message: "What is your email?"
                }
            ]).then(function (engineerRes) {
                var newEngineer = new Engineer(engineerRes.name, engineerRes.email, uniqueId, engineerRes.github);
                uniqueId = uniqueId + 1; 
                console.log(newEngineer);
                teamArray.push(newEngineer);
                addUser();
                
            });

        } else if (res.role === "Intern") {
            inquirer.prompt([
                {
                    name: "name",
                    message: "What is your name?",
                    type: "input"
                },
                {
                    name: "email",
                    type: "input",
                    message: "What is your email?"
                },
                {
                    name: "school",
                    type: "input",
                    message: "Where did you graduate from college?"
                }
            ]).then(function (internRes) {
                var newIntern = new Intern(internRes.name, internRes.email, uniqueId, internRes.school);
                uniqueId = uniqueId + 1; 
                console.log(newIntern)
                teamArray.push(newIntern);
                addUser();
            });
        } else if (res.role === "Manager") {
            inquirer.prompt([
                {
                    name: "name",
                    message: "What is your name?",
                    type: "input"
                },
                {
                    name: "email",
                    type: "input",
                    message: "What is your email?"
                },
                {
                    name: "office",
                    type: "input",
                    message: "What is your office number?"
                }
            ]).then(function (managerRes) {
                var newManager = new Manager(managerRes.name, managerRes.email, uniqueId, managerRes.office);
                uniqueId = uniqueId + 1; 
                console.log(newManager)
                teamArray.push(newManager);
                addUser();
            });
        };
        

    })
        .catch(function (err) {
            console.log(err);
        });

};


function generateHTML() {
    var teamHTML ="";
    console.log(teamArray);
        for(i=0;i<teamArray.length;i++){
            if (teamArray[i].getRole()=="Manager"){
                let codeblock = `<div class="card">
                <div class="container">
                    <h4>
                        <p>${teamArray[i].name}</p>
                        <p>Manager</p>
                    </h4>
                    <p><strong>Email: </strong></p>
                    <p><strong>Phone: </strong></p>
                </div>
            </div>`
            teamHTML = `${teamHTML}${codeblock}`
            }
            else if (teamArray[i].getRole()=="Engineer"){
                let codeblock = `<div class="card">
                <div class="container">
                    <h4>
                        <p>${teamArray[i].name}</p>
                        <p>Manager</p>
                    </h4>
                    <p><strong>Email: </strong></p>
                    <p><strong>GitHub: </strong></p>
                </div>
            </div>`
            teamHTML = `${teamHTML}${codeblock}`
            }
            else if (teamArray[i].getRole()=="Intern"){
                let codeblock = `<div class="card">
                <div class="container">
                    <h4>
                        <p>${teamArray[i].name}</p>
                        <p>Manager</p>
                    </h4>
                    <p><strong>Email: </strong></p>
                    <p><strong>College: </strong></p>
                </div>
            </div>`
                teamHTML = `${teamHTML}${codeblock}`
            }
        }
        return teamHTML;
        // for(i=0;i<teamArray.length;i++){
          
        // }
    };

function addUser(){
    inquirer.prompt([
        {   
            name: "continue",
            message: "Do you want to add another team member?",
            type: "confirm"
        }
    ]).then(function(confirmRes){
        if (confirmRes.continue) {promptUser()}
        else {
           var companyHTML = generateHTML();
           console.log(companyHTML);
        }
    })
};

// fs.writeFile('index.html', generatePage(name, github), err => {
//     if (err) throw err;
  
//     console.log('Portfolio complete! Check out index.html to see the output!');
//   });

promptUser();


