import http from 'http';

import express from 'express';

const app = express();

app.get('/', (req, res) => {
  return res.send('Hello from HomePage');
});

app.get('/about', (req, res) => {
  return res.send('Hello from AboutPage ' + 'hey' + req.query.name);
});

app.listen(8000, () => {
 console.log("Server Started");
});

//const myServer = http.createServer(app);

//myServer.listen(8000, () => {
//  console.log("Server Started");
//})