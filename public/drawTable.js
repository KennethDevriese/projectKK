$(window).on("load", function(){
    function timedRefresh(timeoutPeriod) {
        setTimeout("location.reload(true);",timeoutPeriod);
    }
    window.onload = timedRefresh(60000);
    var mongoose = require('mongoose');
    var Row,Cells;
    var oTable = document.getElementById("tabel");
    var temp;
    var arr = [];
    var tempSchema = new mongoose.Schema({temp: Number});
    var Temp = mongoose.model('temp', tempSchema);
    var temp;
      Temp.find(null, function(err,docs){
        if(err)throw err;
        temp = docs;
        console.log(temp);
      });
      for(var i = 0;i<temp.length;i++){
        var row = oTable.insertRow();
        row.id = "row";
        var cell = row.insertCell(0);
        cell.innerHTML = temp[i];
        var arr2 = [i+1,parseInt(temp[i])];
        arr.push(arr2);
      }
    //- Row = document.getElementById("row");
    //- Cells = Row.getElementsByTagName("td");
    
    google.charts.load('current', {'packages':['line']});
    google.charts.setOnLoadCallback(drawChart);
    function drawChart() {
      var data = new google.visualization.DataTable();
      data.addColumn('number', 'Time');
    data.addColumn('number', 'temperature');
    data.addRows(arr);
    var options = {
      chart: {
        title: 'temperatuur in de kamer',
        subtitle: 'in graden celsius'
      },
      width: 900,
      height: 500
    };
  var chart = new google.charts.Line(document.getElementById('linechart_material'));
  chart.draw(data, google.charts.Line.convertOptions(options));
  }
});
