var mongoose = require('mongoose');
const { exec } = require('child_process');

mongoose.connect("mongodb+srv://admin:Project123@projectkk-qrdxb.azure.mongodb.net/temperatuur?retryWrites=true", function(err) {
    if (err) throw err;
    console.log("Successfully connected to mongodb");

});

var tempSchema = new mongoose.Schema({temp: Number});
var Temp = mongoose.model('temp', tempSchema);
exec('./getData.sh', (err, stdout, stderr) => {
  if (err) {
    console.error(`exec error: ${err}`);
    return;
  }
  var tempNew = new Temp({temp: stdout});
  tempNew.save(function(err){
    if(err)throw err;
  console.log("saved!");
  }) 
});