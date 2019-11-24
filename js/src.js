
function todayWeather(){
    var dt = new Date() 
    var search = $("#search").val()
    $.ajax({
        url: "http://api.openweathermap.org/data/2.5/weather?q=" + search + "&apikey=028bd6c65fc449153d91ad43fd573ddb",
        method: "GET"
    }).then(function (responce) {
        console.log(responce)
        var h2 = $("<h2>")
        var date =$("<h2>")
        var temp =$("<p>")
        var humidity = $("<p>")
        var windSpeed = $("<p>")
        windSpeed.text("Wind Speed: " +responce.wind.speed +" MPH")
        humidity.text("Humidity: "+ responce.main.humidity + "%" )
        temp.text("Temperature: " + ( Math.floor(Math.round(responce.main.temp *9/5) -459.67)) + " F")
        date.text(" (" + dt.toDateString() +")")
        date.attr("style","display:inline")
        h2.text(responce.name)
        h2.attr("style","display:inline")
        $("#today-weather").append(h2) 
        $("#today-weather").append(date) 
        $("#today-weather").append(temp) 
        $("#today-weather").append(humidity) 
        $("#today-weather").append(windSpeed) 
        $.ajax({
            url:"http://api.openweathermap.org/data/2.5/uvi?appid={appid}&lat="+ responce.coord.lat +"&lon="+ responce.coord.lon + "&apikey=028bd6c65fc449153d91ad43fd573ddb",
            method:"GET"
            }).then(function(responce){
            console.log(responce)
            var uvIndex = $("<p>")
            uvIndex.text("UV Index: " + responce.value)
            $("#today-weather").append(uvIndex) 
            
            })
    })
}
$("#btn-search").on("click", function () {

todayWeather()
var search = $("#search").val()
   var h2 = $("<h2>")
   h2.text("5-Day Forcast:")
   $(".five-day-forcast").append(h2)
   $.ajax({
   url:"http://api.openweathermap.org/data/2.5/forecast?q="+ search +",usl&appid=028bd6c65fc449153d91ad43fd573ddb",
   method:"GET"
   }).then(function(responce){
   console.log(responce)
   }) 

})
