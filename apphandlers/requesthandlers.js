
var MongoClient = require('mongodb').MongoClient;
var ObjectID = require('mongodb').ObjectID;
var GridStore = require('mongodb').GridStore;

var ConnectionURI = "mongodb://um7uixx9wsr1zql:pGXgGdhaDc7iWkkjv9nE@bieojfedueylq7c-mongodb.services.clever-cloud.com:27017/bieojfedueylq7c";

function DB() {
    this.db = null;
}

DB.prototype.connect = function(uri) {
  var _this = this;

  return new Promise(function(resolve, reject) {
    var __this = _this;
    if (__this.db) {
      resolve();
    } else {

      MongoClient.connect(uri)
      .then(
        function(database) {

          __this.db = database;

          resolve();
        },
        function(err) {

          console.log("Error connecting: " + err.message);

          reject(err.message);
        }
      )
    }
  })
}

DB.prototype.countDocuments = function(database, coll) {

  var col = database.collection(coll, {strict:true}, function(error, collection){
      if (error) {
        console.log("Could not access collection: " + error.message);
        reject(error.message);
      } else {
        collection.count()
        .then(
          function(count) {
            // Resolve the promise with the count
            resolve(count);
          },
          function(err) {
            console.log("countDocuments failed: " + err.message);
            // Reject the promise with the error passed back by the count
            // function
            reject(err.message);
          }
        )
      }
    })


  // return new Promise(function (resolve, reject){

  //   this.db.collection(coll, {strict:true}, function(error, collection){
  //     if (error) {
  //       console.log("Could not access collection: " + error.message);
  //       reject(error.message);
  //     } else {
  //       collection.count()
  //       .then(
  //         function(count) {
  //           resolve(count);
  //         },
  //         function(err) {
  //           console.log("countDocuments failed: " + err.message);
  //           reject(err.message);
  //         }
  //       )
  //     }
  //   });
  // })
}

DB.prototype.close = function() {
  if (this.db) {
    this.db.close()
    .then(
      function() {},
      function(error) {
        console.log("Failed to close the database: " + error.message)
      }
    ) 
  }
}

class FileRepository {

}

FileRepository.prototype.getFile = function(callback, id) {
  var db = MongoClient.connect(ConnectionURI).then(function(database){
   var gs = new GridStore(database, new ObjectID(id), 'r');
   gs.open(function(err,gs){
    if (err) throw err;
      gs.read(callback);
   });
 });
}

class MainHandler {
  static get(request, result) {
    var context = {a: '', b: ''};
    return result.render('homeview.liquid', context);
  }

  static post(request, result) {
    return result.redirect('/admin');
  }
}

class AdminPageHandler {
  static get(request, result) {
    var context = {
      user: {
        username: 'Raddy',
        logged: true
      }
    }
    return result.render('adminview.liquid', context)
  }

  static post(request, result) {
    return result.redirect(request.body.page ? request.body.page : '/');
  }
}

class TestHandler {
  static get(request, result) {
    var myDataBase = new DB;
    var data;
    var user_list = MongoClient.connect(ConnectionURI).then(function(database){
      return database.collection('nueva').find({}).toArray(function(err, items){
      if(err){return;};
      data = items;
      });
    });
    var fileRepository = new FileRepository;
    var img = {_id:"5ad508d3feb489379cf8eefa"}
    setTimeout(function() {
    return result.render('testview.liquid', {testword: request.params.keycode, user_list: data, img: img})}, 4000);
    // myDataBase.countDocuments('nueva');    
    // myDataBase.close();
    
  }
}

class ImgHandler {
  static get(req, res) {
    var fileRepository = new FileRepository;
    var img = fileRepository.getFile( function(error,data) {
       //res.setHeader('Content-Type', 'image/png');
       //res.writeHead('200', {'Content-Type': 'image/png'});
       if (res.getHeader('Content-Type') == 'image/png') {return;}
       res.write(data,'binary');
       res.end('ok');
    }, res.req.params.imgtag );
    setTimeout(function() {return res.render('img_viewer.liquid', {img: img})}, 2000);
    
  };
}

module.exports = {MainHandler, AdminPageHandler, TestHandler, ImgHandler};
