const inquirer = require("inquirer");
const fs = require("fs");
const util = require("util");

const writeFileAsync = util.promisify(fs.writeFile);

function promptUser() {
  return inquirer.prompt([
    {
      type: "input",
      name: "name",
      message: "What is the employee name?"
    },
    {
      type: "input",
      name: "role",
      message: "What is their role?"
    },
    {
      type: "input",
      name: "id",
      message: "What is their ID number"
    },
    {
      type: "input",
      name: "email",
      message: "What is their email address?"
    },
    {
      type: "input",
      name: "office",
      message: "What is their office number"
    }
  ]);
}

function generateHTML(answers) {
  return `
  <!DOCTYPE html>
  <html lang="en">
  
  <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta http-equiv="X-UA-Compatible" content="ie=edge" />
      <title>My Team</title>
      <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
          integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
      <link rel="stylesheet" href="style.css">
      <script src="https://kit.fontawesome.com/c502137733.js"></script>
  </head>
  
  <body>
      <div class="container-fluid">
          <div class="row">
              <div class="col-12 jumbotron mb-3 team-heading">
                  <h1 class="text-center">My Team</h1>
              </div>
          </div>
      </div>
      <div class="container">
          <div class="row">
              <div class="team-area col-12 d-flex justify-content-center">
              <ul class="list-group">
                <li class="list-group-item">Name: ${answers.name}</li>
                <li class="list-group-item">Role: ${answers.role}</li>
                <li class="list-group-item">ID: ${answers.id}</li>
                <li class="list-group-item">Email: ${answers.email}</li>
                <li class="list-group-item">Office number: ${answers.office}</li>
              </ul>
              </div>
          </div>
      </div>
  </body>
  
  </html>`;
}

promptUser()
  .then(function(answers) {
    const html = generateHTML(answers);

    return writeFileAsync("index.html", html);
  })
  .then(function() {
    console.log("Successfully wrote to index.html");
  })
  .catch(function(err) {
    console.log(err);
  });
