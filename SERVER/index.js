const express = require('express')
const app = express()
const bodyParser = require("body-parser");

const userRoutes = require('./routes/User')
const courseRoutes = require('./routes/Course')
const paymentRoutes = require('./routes/Payments')
const profileRoutes = require('./routes/Profile')

const database = require('./config/database')
const cookieParser = require('cookie-parser')

const cors = require('cors') // hamara FrontEnd chal rha hai PORT NO. 3000 pe aur Backend chal raha hai PORT NO. 4000 pe , aur mei chahta hu ki Backend jo hai vo frontEnd ki request ko entertain kre
const {cloudinaryConnect}  = require("./config/cloudinary")
const fileUpload = require('express-fileupload')
// app.use(fileUpload({ useTempFiles: true }))
const dotenv = require('dotenv')

dotenv.config()
const PORT = process.env.PORT || 4000

// database connection
database.connect()

// middlewares
app.use(express.json())
app.use(cookieParser())

// Line 28 to 33 are very important --> (HW : explore this more)
app.use(
  cors({
    origin: 'https://study-notion-edtech-sigma.vercel.app/',
    methods : ["GET" , "POST" , "HEAD" , "PUT" , "PATCH" , "DELETE"],
    credentials: true
  })
)

app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: '/tmp/'
  })
)

// CLoudinary connection
cloudinaryConnect()

// route
app.use('/api/v1/auth', userRoutes)
app.use('/api/v1/profile', profileRoutes)
app.use('/api/v1/course', courseRoutes)
app.use('/api/v1/payment', paymentRoutes)
app.use(bodyParser.urlencoded({extended : true}));

// default route
app.get('/', (req, res) => {
  return res.json({
    success: true,
    message: 'Your server is up and running...'
  })
})

app.listen(PORT, () => {
  console.log(`App is  running at ${PORT}`)
})
