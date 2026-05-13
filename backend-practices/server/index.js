import express from 'express';
import fs from 'fs';
import users from '../MOCK_DATA.json' with { type: "json" };

const app = express();

//Middleware - Plugin
app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res) => {
  return res.send('Hello from HomePage');
});

app.get('/about', (req, res) => {
  return res.send('Hello from AboutPage ' + 'hey' + req.query.name);
});

//REST API
app.get('/api/users', (req, res) => {
  return res.json(users);
});

app.get('/users', (req, res) => {
  const html = `
    <ul>
      ${users.map((user) => `<li>${user.first_name}</li>`).join("")}
    </ul>
  `;

  res.send(html);
});

app
  .route('/api/users/:id')
  .get((req, res) => {
    const id = Number(req.params.id);
    const user = users.find(user => user.id === id);
    return res.json(user);
  })
  .patch((req, res) => {
    const id = Number(req.params.id);
    const user = users.find(user => user.id === id);
    Object.assign(user, req.body);
    fs.writeFile("../MOCK_DATA.json", JSON.stringify(users), (err) => {
      if(err) console.log(err);
      return res.json({ status: "success" });
    }); 
  })
  .delete((req, res) => {
    const id = Number(req.params.id);
    const updatedUsers = users.filter(user => user.id !== id);
    //TODO: Delete the user with id
    fs.writeFile("../MOCK_DATA.json", JSON.stringify(updatedUsers), (err) => {
      if(err) console.log(err);
      return res.json({ status: "success" });
    });
  });


app.post('/api/users', (req, res) => {
  const body = req.body;
  users.push({ ...body, id: users.length + 1 });
  fs.writeFile("../MOCK_DATA.json", JSON.stringify(users), (err) => {
    if(err) console.log(err);
    return res.json({ status: "success", id: users.length });
  }); 
});

app.listen(8000, () => {
 console.log("Server Started");
});

//const myServer = http.createServer(app);

//myServer.listen(8000, () => {
//  console.log("Server Started");
//})