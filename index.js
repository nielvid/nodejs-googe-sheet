const { google } = require('googleapis')
const dotenv = require('dotenv')
dotenv.config()

async function authenticate() {
  const auth = new google.auth.GoogleAuth({
    keyFile: `${process.env.HOME}/${process.env.GOOGLE_APPLICATION_CREDENTIALS}`,
    // keyFile: process.env.GOOGLE_APPLICATION_CREDENTIALS,  // add this to system variables,
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  })
  const authClient = await auth.getClient()
  const sheet =  google.sheets({
    version: 'v4',
    auth: authClient,
  })
return {user: authClient, sheet}
}


const spreadsheetId = ''
const sheetName = 'Sheet1'



   

async function getSpreadSheetInfo(spreadsheetId) {
  const { sheet } = await authenticate()
  const info = sheet.spreadsheets.get({
    spreadsheetId,
  })
  return info
}


async function readFromSheet({ spreadsheetId, sheetName}) {
  const { sheet } = await authenticate()

  const data = sheet.spreadsheets.values.get(
    {
      spreadsheetId,
      range: sheetName,
    }).then((res) => {
     return res.data.values
    }).catch((err) => {
      console.log(err, 'error reading from sheet')
    })
     
    return data
}

async function postToSheet({ spreadsheetId, sheetName, data }) {
  const { sheet } = await authenticate()
  const response = sheet.spreadsheets.values.append(
    {
      spreadsheetId,
      range: sheetName,
      valueInputOption: 'USER_ENTERED',
      //   insertDataOption: 'INSERT_ROWS',
      resource: {
        values: data,
      },
    }).then((res) => {
     return res
    }).catch((err) => {
      console.log(err, 'error posting to sheet')
    })
    return response
}
  const data = [
    ['johnson', 'johnson@gmail.com'], // Row 1
    [' paulsco', 'paulsco@yahoo.com'], // Row 2
  ]


//  readFromSheet({ spreadsheetId, sheetName })
//    .then((res) => {
//      console.log(res, 'data from sheet')
//    })
//    .catch((err) => {
//      console.log(err)
//    })

postToSheet({ spreadsheetId, sheetName, data })
  .then((res) => {
    console.log(res.status, 'sucessfully created record')
  })
  .catch((err) => {
    console.log(err)
  })

// getSpreadSheetInfo(spreadsheetId)
//   .then((res) => {
//     console.log(res, 'sheet info')
//   })
//   .catch((err) => {
//     console.log(err)
//   })


