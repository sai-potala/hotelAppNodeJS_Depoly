var express = require("express");
var hotelRouter = express.Router();
var mongodb = require("mongodb").MongoClient;
// var url = "mongodb://localhost:27017";
var url =
  "mongodb+srv://test_user:1234@cluster0.3vhbk.mongodb.net/hotel?retryWrites=true&w=majority";

function router(menu) {
  hotelRouter.route("/").get(function (req, res) {
    mongodb.connect(url, (err, connection) => {
      if (err) {
        res.status(505).send("error while connecting");
      } else {
        console.log("came here")
        var dbo = connection.db("hotel");
        dbo
          .collection("hoteldata")
          .find({})
          .toArray((err, data) => {
            console.log("inside mogodb");
            if (err) {
              res.send("error while fetching data");
            } else {
              res.render("hotelPage", {
                title: "hotel details",
                hotelData: data,
                menu,
              });
            }
          });
      }
    });
  });

  hotelRouter.route("/details/:id").get(function (req, res) {
    var id = req.params.id
    console.log("Came here")
    mongodb.connect(url,(err,connection)=>{
        if(err){
          res.status(505).send("error")
        }
        else{
          var dbo = connection.db("hotel")
          dbo.collection('hoteldata').findOne({_id:id},(err,data)=>{
            if(err){
              res.status(505).send("error")
            }
            else{
              res.render("hotelDetails", {title: "hotel details",hotelData: data,menu,});
            }
          })
        }
    })
    
  });
  return hotelRouter;
}

module.exports = router;
