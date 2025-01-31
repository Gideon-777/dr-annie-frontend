const HttpStatus = require("http-status-codes");
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const passport = require('passport');
const axios = require('axios');
const path = require('path');
const csv = require('csvtojson');
const cron = require("node-cron");
const cors = require('cors');
const fs = require('fs');

require('./model/user');
require('./model/token');
require('./model/covidCountry');
require('./model/questionAnswer');
require('./model/contactForm');

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

const db = require('./config/keys').mongoURI;

mongoose.connect(db)
  .then(() => console.log('successfully connected to database...'))
  .catch((e) => console.log(e, 'error occurred while connecting to database'));

app.use(passport.initialize());
require('./service/passportJwtService')(passport);
require('./service/passportGoogleService')(passport);

const auth = require('./api/authController');
const genericResponse = require("./api/genericResponse");
app.use('/api/auth', auth);

const users = require('./api/usersController');
app.use('/api/users', users);

const dashboardData = require('./api/dashboardDataController');
app.use('/api', dashboardData);

const tokens = require('./api/tokensController');
const {updateDataInDb} = require("./service/covidDataService");
app.use('/api/tokens', tokens);

const covidData = require('./api/covidDataController');
app.use('/api/covid-data', covidData);

const questionAnswers = require('./api/questionAnswersController');
app.use('/api/question-answers', questionAnswers);

const contact = require('./api/contactController');
app.use('/api/contact-us', contact);

const PORT = process.env.PORT || 5001;


// const getDate = (days) => {
//   let today = new Date();
//   let dd = today.getDate() - days;
//   let mm = today.getMonth() + 1;
//   let yyyy = today.getFullYear();
//   if (dd < 10) {
//     dd = '0' + dd;
//   }
//   if (mm < 10) {
//     mm = '0' + mm;
//   }
//   return `${mm + '-' + dd + '-' + yyyy}`
// };

// cron.schedule("0 */8 * * *", async () => {
//   let data;
//   let date;
//   try {
//     date = getDate(0);
//     data = await axios.get(`https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_daily_reports/${date}.csv`);
//   } catch (e) {
//     date = getDate(1);
//     data = await axios.get(`https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_daily_reports/${date}.csv`);
//   }
//   const fileName = date;
//   console.log(fileName, "--------------------------");
//   const covidData = data;
//   let fileNameJson = `${fileName}.json`;
//   fs.writeFileSync(fileName, covidData.data);
//   return csv().fromFile(fileName).then(jsonData => {
//     fs.writeFileSync(fileNameJson, JSON.stringify(jsonData));
//     updateDataInDb(jsonData);
//   });
// });

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

app.get('/hello', (req, res) => {
  res.json({msg: "Hello!"});
});

app.listen(PORT, () => console.log(`Server running on port: ${PORT}`));
