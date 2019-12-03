// create button array
var buttonArray;  
// saving the latest data to the button array
if(localStorage.getItem("buttons") !== null){
buttonArray = JSON.parse(localStorage.getItem("buttons"))
}else{
buttonArray =[]
}
// create function to display today's weather
function todayWeather(search) {
    var dt = new Date()
    $.ajax({
        url: "https://api.openweathermap.org/data/2.5/weather?q=" + search + "&apikey=028bd6c65fc449153d91ad43fd573ddb",
        method: "GET"
    }).then(function (responce) {
        console.log(responce)
        // creating the html coponents
        var h2 = $("<h2>")
        var date = $("<h2>")
        var temp = $("<p>")
        var humidity = $("<p>")
        var windSpeed = $("<p>")
        // adding the text companents
        windSpeed.text("Wind Speed: " + responce.wind.speed + " MPH")
        humidity.text("Humidity: " + responce.main.humidity + "%")
        temp.text("Temperature: " + (Math.floor(Math.round(responce.main.temp * 9 / 5) - 459.67)) + " F")
        date.text(" (" + dt.toDateString() + ")")
        date.attr("style", "display:inline")
        h2.text(responce.name)
        h2.attr("style", "display:inline")
        // appending the html tags to the today weather div
        $("#today-weather").append(h2)
        $("#today-weather").append(date)
        $("#today-weather").append(temp)
        $("#today-weather").append(humidity)
        $("#today-weather").append(windSpeed)
        // starting my ajax call
        $.ajax({
            url: "https://api.openweathermap.org/data/2.5/uvi?appid={appid}&lat=" + responce.coord.lat + "&lon=" + responce.coord.lon + "&apikey=028bd6c65fc449153d91ad43fd573ddb",
            method: "GET"
        }).then(function (responce) {
            console.log(responce)
            var uvIndex = $("<p>")
            uvIndex.text("UV Index: " + responce.value)
            $("#today-weather").append(uvIndex)

        })
    })
}
// creating a function to display the five day weather forcast

function fiveDayForcast(search) {
//creating a header tag
    var h2 = $("<h2>")
    h2.text("5-Day Forcast:")
    $(".five-day-forcast").append(h2)
    // starting the ajax call
    $.ajax({
        url: "https://api.openweathermap.org/data/2.5/forecast/?q="+ search +",us&apikey=028bd6c65fc449153d91ad43fd573ddb",
        method: "GET"
    }).then(function (responce) {
        console.log(responce)
        // craeting a loop of the 40 objects so it only grabs 5 opjects in a increment of 8
        for (var i = 0; i <40; i++) {
        // craeting my variables
            var div = $("<div>")
            div.attr("style", "display:inline-block")
            var floor = Math.floor(i =i +6.75)
            //creating the current date
            var date = responce.list[floor].dt_txt
            var setDate = new Date(date)
            var splitDate = setDate.toDateString().split(" ")
            splitDate.shift()
            var joinedDate = splitDate.join(" ")
            var p = $("<p>")
            var temp = $("<p>")
            var img = $("<img>")
            //setting up my weather icons
            img.attr("src", "https://openweathermap.org/img/w/" + responce.list[floor].weather[0].icon + ".png")
            img.attr("alt", "Weather")
            var humidity = $("<p>")
            humidity.text("Humidity: " + responce.list[floor].main.humidity)
            temp.text(("Temperature:" + Math.floor(Math.round(responce.list[floor].main.temp * 9 / 5) - 459.67)) + " F")
            p.text(joinedDate)
            div.append(p)
            div.append(img)
            div.append(temp)
            div.append(humidity)
            $(".five-day-forcast").append(div)
        }
    })
}
//creating function to display the buttons
function displayButtons(){
    var search = $("#search").val()
    for (var i = 0; i < buttonArray.length; i++) {
        var button = $("<button>")
        button.attr("style","display:block")
        button.text(buttonArray[i])    
       $("#btn-storage").append(button)
    }
}
displayButtons()
//added my function calls to a object, so it can be easier to reach
var weather = {
today:todayWeather,
fiveDayForcast: fiveDayForcast
}
//started my button search event handler
$("#btn-search").on("click", function () {
    var search = $("#search").val()
    $(".five-day-forcast").empty()
    $("#today-weather").empty()
    weather.today(search)
    weather.fiveDayForcast(search)
     buttonArray.push(search)
     localStorage.setItem("buttons",JSON.stringify(buttonArray))
     console.log(buttonArray)
     $("#search").val("")
     $("#btn-storage").empty()
    displayButtons()
})
// started my button event listener
$("#btn-storage").delegate("button","click",function(){
$("#today-weather").empty()
$(".five-day-forcast").empty()
weather.today($(this).text())
weather.fiveDayForcast($(this).text())
})

