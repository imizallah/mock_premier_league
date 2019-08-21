## Mock-premier-league
This is a web API written in nodejs to serve fixtures of matches

## Features
Authentication and authorization is base on User roles
# User Signup 
To register an adminUsers : localhost:3000/api/user/register/:admin
To register users :  localhost:3000/api/user/register

# Users and adminUsers Login 
POST - localhost:3000/api/auth/login : Returns jwt token for subsequent request operations.

## Team API
GET - localhost:3000/api/team/get : Returns a list of countries in the database.

# Only loggedIn adminUsers can access th following routes
POST - localhost:3000/api/team/create : This Creates a new team.              
PUT - localhost:3000/api/team/update/:id : Updates existing team with new data.                   
DELETE -localhost:3000/api/team/delete/:id : Deletes existing team from the database.                         

## Fixtures API
GET - localhost:3000/api/fixtures/all : Returns a list of countries in the database.

# Only loggedIn adminUsers can access th following routes
POST - localhost:3000/api/fixtures/all : This Creates a new fixture.                    
PUT -localhost:3000/api/fixtures/update/:id : Updates existing fixture with new data.                 
DELETE -localhost:3000/api/fixtures/deletes/:id  : Deletes existing fixture from the database.                   

## Installation
Simply use the following commands:

npm install

npm start

Visit localhost:3000/api throught you browser.
