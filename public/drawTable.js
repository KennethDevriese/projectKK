$(window).on("load", function(){
    function timedRefresh(timeoutPeriod) {
        setTimeout("location.reload(true);",timeoutPeriod);
    }
    window.onload = timedRefresh(60000);
    var oTable = document.getElementById("tempTabel");
    var temp = oTable.innerText.split(',');
    var arr = [];
    for(var i = 0;i<temp.length;i++){
      var arr2 = [i+1,parseInt(temp[i])];
      arr.push(arr2);
    }
    
    google.charts.load('current', {'packages':['line']});
    google.charts.setOnLoadCallback(drawChart);
    function drawChart() {
      var data = new google.visualization.DataTable();
      data.addColumn('number', 'Tijd');
    data.addColumn('number', 'temperatuur');
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
