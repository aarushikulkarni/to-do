const express = require('express')
const cors = require('cors')
const { sequelize } = require('./models/user.js')
const authRoutes = require('./routes/auth.js')
const todoRoutes = require('./routes/todo.js')

require('dotenv').config()

const app = express();

app.use(cors({
  origin: "http://localhost:3000",
  methods: ["GET","POST","PUT","DELETE","OPTIONS"],
  allowedHeaders: ["Content-Type","Authorization"],
  credentials: true,
  optionsSuccessStatus: 200
}));

/*
app.use((req, res, next) => {
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Origin", "http://localhost:3000");
    res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
    res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
    return res.sendStatus(200);
  }
  next();
});
*/

app.use(express.json());

app.use('/auth', authRoutes);
app.use('/todo', todoRoutes);

const PORT = process.env.PORT || 5050;

sequelize.sync().then(() => {
    app.listen(PORT, () => {console.log(`Server running on port ${PORT}`);

    })
})