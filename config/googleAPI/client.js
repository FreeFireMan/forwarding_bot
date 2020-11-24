const fs = require('fs');
const path = require('path');
const readline = require('readline');
const {google} = require('googleapis');
const {GOOGLE} = require('../config');


let client_secret_part = 'credentials.json';
let gSheet = 'gSheet1.json';

const SCOPES = [
    'https://www.googleapis.com/auth/drive',
    'https://www.googleapis.com/auth/drive.file',
    'https://www.googleapis.com/auth/spreadsheets',
];
let TOKEN_DIR = `config${path.sep}filesforSheet${path.sep}`;
let TOKEN_PATH = TOKEN_DIR + `${gSheet}`;


module.exports = {
    apiStart: () => {
        googleApi(listMajors)
    },
    googleSheetUpdate: () => {
        googleApi(updateSheet)
    },
    googleSheetAddUser: (userObj) => {
        googleApi(addingUser,userObj)
    },

};

function authorize(credentials, callback, option) {
    const {client_secret, client_id, redirect_uris} = credentials.installed;
    const oAuth2Client = new google.auth.OAuth2(
        client_id, client_secret, redirect_uris[0]);

    // Check if we have previously stored a token.
    fs.readFile(TOKEN_PATH, (err, token) => {
        if (err) return getNewToken(oAuth2Client, callback);
        oAuth2Client.setCredentials(JSON.parse(token));
        callback(oAuth2Client, option);
    });
}

function getNewToken(oAuth2Client, callback) {
    const authUrl = oAuth2Client.generateAuthUrl({
        access_type: 'offline',
        scope: SCOPES,
    });
    console.log('Authorize this app by visiting this url:', authUrl);
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    });
    rl.question('Enter the code from that page here: ', (code) => {
        rl.close();
        oAuth2Client.getToken(code, (err, token) => {
            if (err) return console.error('Error while trying to retrieve access token', err);
            oAuth2Client.setCredentials(token);
            // Store the token to disk for later program executions
            fs.writeFile(TOKEN_PATH, JSON.stringify(token), (err) => {
                if (err) return console.error(err);
                console.log('Token stored to', TOKEN_PATH);
            });
            callback(oAuth2Client);
        });
    });
}

function googleApi(cb, option) {
    fs.readFile(`config${path.sep}filesforSheet${path.sep}${client_secret_part}`, function processClientSecrets(err, content) {
        if (err) {
            console.log('Error loading client secret file: ' + err);
            return;
        }
        authorize(JSON.parse(content), cb, option);
    });
}

///-----------------------methods
function listMajors(auth) {
    const sheets = google.sheets({version: 'v4', auth});
    sheets.spreadsheets.values.get({
        spreadsheetId: GOOGLE.SPREADSHEETID,
        range: GOOGLE.RANGE,
    }, (err, res) => {
        if (err) return console.log('The API returned an error: ' + err);
        // console.log(res);
        const rows = res.data.values;
        if (rows.length) {
            // console.log('Name, Major:');
            // Print columns A and E, which correspond to indices 0 and 4.
            rows.forEach((row) => {
                if (row[0] === 'id') {
                    return
                }
                console.log(row);

            });
        } else {
            console.log('No data found.');
        }
    });
}

function updateSheet(auth) {
    const sheets = google.sheets({version: 'v4', auth});
    sheets.spreadsheets.values.get({
        spreadsheetId: GOOGLE.SPREADSHEETID,
        range: GOOGLE.RANGE,

    }, (err, res) => {
        if (err) return console.log('The API returned an error: ' + err);
        // console.log(res);
        const rows = res.data.values;
        if (rows.length) {
            // console.log('Name, Major:');
            // Print columns A and E, which correspond to indices 0 and 4.
            rows.forEach((row) => {
                if (row[0] === 'id') {
                    return
                }
                console.log(row);

            });
        } else {
            console.log('No data found.');
        }
    });
}

async function addingUser(auth, userObj) {
    console.log(userObj);
    const sheets = google.sheets({version: 'v4', auth});

    sheets.spreadsheets.values.append({
        spreadsheetId: GOOGLE.SPREADSHEETID,
        range: GOOGLE.RANGE,
        valueInputOption: 'USER_ENTERED',
        insertDataOption: 'INSERT_ROWS',
        resource:{
            values: [
                [
                    userObj.id,
                    userObj.first_name,
                    userObj.last_name,
                    userObj.username,
                    userObj.file_name,
                    new Date().toDateString(),
                    new Date().toTimeString().split(' ')[0]]
            ],

        }
    }, (err, res) => {
        if (err) return console.log('The API returned an error: ' + err);

        if (res) {
            console.log(res.status);
        } else {
            console.log('No data found.');
        }
    });
}
