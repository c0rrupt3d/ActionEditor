# ActionEditor 

This project was created as an assignment

An online [demo](https://c0rrupt3d.github.io/ActionEditor/) of the project is available to view.


## About

***New***: Added Google Translate API (thanks Mr.Anand) to translate upto 4 languages (only English source supported) (v0.3)

***New***: Added text formatting through Rich Utlities (v0.2)

The project was created using ReactJS among many other libraries.

DraftJS was used to create the TextArea and to manage the EditorStates (undo/redo).


Persistance storage is enabled. The data can be stored locally to prevent data loss on page close.

The TextArea data can also be uploaded/downloaded from a Firebase server.

A Translate button was added to the UI but the functionality in unavailable due the lack of Google Translate API key.
(I will attempt to add this in the future once the Translate API servers let me create an API key) 


## Steps to view project

After downloading  and unzipping the project, in the project directory, run:

### `npm install`

This command will install the necessary dependencies without which the project will not run.

After downloads complete. Run:

### `npm start`

Runs the app in the development mode after downloading necessary libraries (viewable in project.json).
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.
You will also see any lint errors in the console.

**API Keys for Google Translate API and Firebase API need to be created to use those features locally.**

**I have provided a .env.example file to guide you how to create the .env file with the API keys.**  

**To properly use Firebase API, you need to provide the necessary Firebase config as declared in `src/utils/firedb.js`.**


## Made by

**Vastav Kalia** (business.vkalia@outlook.com)

(Careful, this project is not 100% bug free :D)






To learn React, check out the [React documentation](https://reactjs.org/).

