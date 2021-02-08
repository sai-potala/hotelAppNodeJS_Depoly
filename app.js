var express = require("express");

var app = express();
var port = 8900;

var menu = [
  { link: "/", page: "Home" },
  { link: "/hotel", page: "Hotel" },
  { link: "/city", page: "City" },
];

var hotelRouter = require("./src/route/HotelRouter")(menu);
var cityRouter = require("./src/route/CityRouter")(menu);

console.log(typeof hotelRouter);
app.use("/hotel", hotelRouter);
app.use("/city", cityRouter);

//for static files
app.use(express.static(__dirname + "/public"));
//for html files
app.set("views", "./src/views");
//for view engine
app.set("view engine", "ejs");

app.get("/", function (req, res) {
  res.render("index", { title: "home page", menu: menu });
});
app.listen(port, function (err) {
  if (err) throw err;
  console.log(`server running on ${port}`);
});
