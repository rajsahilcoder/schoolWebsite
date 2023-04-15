require('dotenv').config()
const express = require("express");
const connectDB = require("./db");
const app = express();
const cookieParser = require("cookie-parser");
const { adminAuth, userAuth } = require("./middleware/auth.js");
const path = require('path')
const Razorpay = require('razorpay')
const cors = require('cors')
const PORT = 5000;

app.set("view engine", "ejs");

connectDB();

app.use(express.json());
app.use(cookieParser());
app.use(cors())
// Routes
app.use("/api/auth", require("./Auth/route"));
app.use(express.static(__dirname + '/public'));
// ===========================================
var instance = new Razorpay({
  key_id: "rzp_live_LfcSrKxIsWjIIW",
  key_secret: "Mx7gKbBECWerE3aLkmSEjBcx"
});
app.get("/donate", (req, res) => res.render("donate"));
app.get("/donate2", (req, res) => res.render("donate2"));
app.post('/payment', (req, res) => {
  const amount = req.body.amount;

  var options = {
    amount: amount * 100,  // amount in the smallest currency unit
    currency: "INR",
    receipt: "order_rcptid_11"
  };
  let order = instance.orders.create(options, function (err, order) {
    console.log(order);
  });

  res.status(201).json({
    success: true,
    order,
    amount

  })
})

app.get('/thank', (req, res) => {
  res.render('thank');
})

// ===========================================
app.get("/", (req, res) => res.render("home"));
app.get("/about-us", (req, res) => res.render("about-us"));
app.get("/blog-post", (req, res) => res.render("blog-post"));
app.get("/contact-us", (req, res) => res.render("contact-us"));
app.get("/faq", (req, res) => res.render("faq"));
app.get("/features", (req, res) => res.render("features"));
app.get("/gallery", (req, res) => res.render("gallery"));
app.get("/testimonials", (req, res) => res.render("testimonials"));
app.get("/testimonials", (req, res) => res.render("testimonials"));
app.get("/slider", (req, res) => res.render("slider"));
app.get("/slider", (req, res) => res.render("slider"));
app.get("/service-page", (req, res) => res.render("service-page"));
app.get("/register", (req, res) => res.render("register"));
app.get("/login", (req, res) => res.render("login"));
app.get("/logout", (req, res) => {
  res.cookie("jwt", "", { maxAge: "1" });
  res.redirect("/");
});
app.get("/admin", adminAuth, (req, res) => res.render("admin"));
app.get("/basic", userAuth, (req, res) => res.render("user"));



const server = app.listen(PORT, () =>
  console.log(`Server Connected to port ${PORT}`)
);

process.on("unhandledRejection", (err) => {
  console.log(`An error occurred: ${err.message}`);
  server.close(() => process.exit(1));
});