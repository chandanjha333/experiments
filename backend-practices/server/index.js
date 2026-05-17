import express from 'express';
import fs from 'fs';
import mongoose from 'mongoose';

const app = express();

//Connection
mongoose.connect("mongodb://127.0.0.1:27017/backend-app")
.then(() => {
  console.log("MongoDB Connected");
})
.catch(err => console.log("MongoDB Error", err));

//Schema
const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  }, 
  lastName: {
    type: String,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  job_title: {
    type: String,
  },
  gender: {
    type: String
  },
}, { timestamps: true });

const User = mongoose.model("user", userSchema);

//Middleware - Plugin
app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res) => {
  return res.send('Hello from HomePage');
});

app.get('/about', (req, res) => {
  return res.send('Hello from AboutPage ' + 'hey' + req.query.name);
});

//REST API
app.get('/api/users', async (req, res) => {
  const allDbUsers = await User.find({});

  return res.json(allDbUsers);
});

app.get('/users', async (req, res) => {
  const allDbUsers = await User.find({});
  const html = `
    <ul>
      ${allDbUsers.map((user) => `<li>${user.firstName} - ${user.email}</li>`).join("")}
    </ul>
  `;

  res.send(html);
});

app
  .route('/api/users/:id')
  .get(async (req, res) => {
    const user = await User.findById(req.params.id);
    return res.json(user);
  })
  .patch(async (req, res) => {
    const user = await User.findById(req.params.id);
    Object.assign(user, req.body);
  })
  .delete(async (req, res) => {
    await User.findByIdAndDelete(req.params.id);
    return res.json({ status: "Success" });
  });


app.post('/api/users', async (req, res) => {
  const body = req.body;
  if(
    !body ||
    !body.first_name ||
    !body.last_name ||
    !body.email ||
    !body.gender ||
    !body.job_title
  ) {
    return res.status(400).json({ msg: "All fields are required..."});
  }
  
  const result = await User.create({
    firstName: body.first_name,
    lastName: body.last_name,
    email: body.email,
    gender: body.gender,
    jobTitle: body.job_title,
  });

  console.log("result", res.body);
  return res.status(201).json({ msg: "Success" });
});

app.listen(8000, () => {
 console.log("Server Started");
});

//const myServer = http.createServer(app);

//myServer.listen(8000, () => {
//  console.log("Server Started");
//})