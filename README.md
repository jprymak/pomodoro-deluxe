# Welcome to pomodoro-deluxe

Pomodoro-deluxe is an app that helps you manage time when doing daily activities that require focus, like learning.

## How it works

1. You can create a new task in Task Creator. You will see a form, where you can set task name, session length, break length and how many sessions of this task you want to do. Preview below the form is updated dynamically and give you an idea of how much time you would spend on breaks and sessions
2. You can view and choose one of tasks you created in Task Manager (or delete them). By clicking "Pick" button chosen session is set to current
4. When you navigate to Current Session a timer with three buttons will appear
5. When part of your session or break ends an alarm is set off (there are different alarms for session and break endings)

## App is not 100% ready yet !

There are still many tasty features to come:
1. More stylish table in History component
2. Imidiate switch to current session on task creation
3. and more!

## Errors to be fixed
1. GitHub pages routing 404 problem on page refresh (sacrifice for working routing animations for now - HashRouter does not support location.key property, which is necessary for animations to work)

## Tools
- create-react-app
- react-modal
- react-router
- react-transition-group
- react-csv

- Redux, react-redux, redux-thunk

- CSS + SASS
- BEM
- CSS Grid
- Flexbox

## How to run this app

- By launching demo (not recommended due to page refresh issues)

- Running you app locally - and here is how to do it

1. Simply clone or download this repository
2. Open cmd and cd to project's location
4. Type npm install to install all dependencies listed in package.json
5. Type npm start to run server
6. Open a browser and head for http://localhost:3000
7. Have fun!