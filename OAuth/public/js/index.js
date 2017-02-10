google.charts.load("current", {
    packages: ["corechart"]
});
google.charts.setOnLoadCallback(drawDisp);
google.charts.setOnLoadCallback(drawTweets);

let disp;
let tweets;

$(document).ready(() => {
    $.get("/dispositivos", {}, (data) => {
      disp = data;
    });

    $.get("/tweets", {}, (data) => {
      tweets = data;
    });

    $("#mapa").click(() => {
      if($("#calor").hasClass("esconder")) {
        $("#mapa").empty();
        $("#mapa").append("Mapa de geolocalización");
        $("#mapa").removeClass("btn-danger");
        $("#mapa").addClass("btn-primary");
        $("#calor").removeClass("esconder");
        $("#puntos").addClass("esconder");
      }
      else {
        $("#mapa").empty();
        $("#mapa").append("Mapa de calor");
        $("#mapa").removeClass("btn-primary");
        $("#mapa").addClass("btn-danger");
        $("#puntos").removeClass("esconder");
        $("#calor").addClass("esconder");
      }

    })

});


function drawDisp() {
    var data = google.visualization.arrayToDataTable([
        ['Dispositivos', 'Numero de usuarios'],
        [disp[0][0], disp[1][0]],
        [disp[0][1], disp[1][1]],
        [disp[0][2], disp[1][2]],
        [disp[0][3], disp[1][2]],
        [disp[0][4], disp[1][4]],
        [disp[0][5], disp[1][5]],
        [disp[0][6], disp[1][6]]
    ]);

    var options = {
        title: 'Dispositivos más usados',
        pieHole: 0.4,
    };

    var chart = new google.visualization.PieChart(document.getElementById('dispchart'));
    chart.draw(data, options);
}

function drawTweets() {
  console.log(tweets);
    var data = google.visualization.arrayToDataTable([
        ['Tweets', 'Numero'],
        [tweets[0][0], tweets[1][0]],
        [tweets[0][1], tweets[1][1]],
        [tweets[0][2], tweets[1][2]]
    ]);

    var options = {
        title: 'Gráfica de Tweets, Retweets y Favs ',
        pieHole: 0.4,
    };

    var chart = new google.visualization.PieChart(document.getElementById('tweetschart'));
    chart.draw(data, options);
}
