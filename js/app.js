var utcOffsetToCity = {
    "-12.0" : ["Baker Island", "Howland Island"],
    "-11.0" : ["Jarvis Island", "Niue"],
    "-10.0" : ["Honolulu", "Papeete", "Avarua"],
    "-9.5" : ["Marquesas Islands"],
    "-9.0" : ["Anchorage", "Fairbanks", "Gambier Islands"],
    "-8.0" : ["Tijuana", "Los Angeles", "Vancouver", "Seattle"],
    "-7.0" : ["Phoenix", "Calgary", "Ciudad Juárez", "Cheyenne, Wyoming"],
    "-6.0" : ["Chicago", "Guatemala City", "Mexico City", "San José", "San Salvador", "Winnipeg", "Managua"],
    "-5.0" : ["Ann Arbor", "New York City", "Havana", "Toronto"],
    "-4.5" : ["Caracas", "Maracay", "Valencia,_Carabobo"],
    "-4.0" : ["Santiago", "La Paz", "San Juan de Puerto Rico", "Manaus", "Halifax"],
    "-3.5" : ["St. John\"s", "Corner Brook"],
    "-3.0" : ["Buenes Aires", "Montevideo", "Sao Paulo", "Catamarca"],
    "-2.0" : ["South Sandwhich Islands", "Fernando de Noronha"],
    "-1.0" : ["Cape Verde", "Ittoqqortoormiit"],
    "0.0" : ["Lisbon", "London", "Abidjan", "Dublin", "Liverpool"],
    "1.0" : ["Amsterdam", "Berlin", "Stockholm", "Zurich", "Warsaw"],
    "2.0" : ["Athens", "Kiev", "Beirut", "Helsinki"],
    "3.0" : ["Nairobi", "Minsk", "Baghdad", "Doha"],
    "3.5" : ["Tehran", "Karaj", "Mashhad"],
    "4.0" : ["Moscow", "Kazan", "Dubai", "Yerevan"],
    "4.5" : ["Kabul", "Kandahar"],
    "5.0" : ["Karachi", "Tashkent", "Malé"],
    "5.5" : ["New Delhi", "Colombo"],
    "5.75" : ["Kathmandu"],
    "6.0" : ["Dhaka", "Almaty"],
    "6.5" : ["Yangon", "Naypyidaw"],
    "7.0" : ["Bangkok", "Nobosibirsk", "Jakarta", "Hanoi"],
    "8.0" : ["Perth", "Beijing", "Singapore"],
    "8.75" : ["Eucla"],
    "9.0" : ["Seoul", "Tokyo", "Irkutsk"],
    "9.5" : ["Adelaide"],
    "10.0" : ["Yakutsk", "Canberra"],
    "10.5" : ["Lord Howe Island"],
    "11.0" : ["Vladivostok", "Noumea"],
    "11.5" : ["Norfolk Island"],
    "12.0" : ["Auckland"],
    "12.75" : ["Chatham Islands"],
    "13.0" : ["Samoa"],
    "14.0" : ["Line Islands"]
};

function getUtcOffset(neededTimeAdjustment){
    var utcOffsetToReturn;
    $.each(utcOffsetToCity, function(utcOffset, city) {
        if (neededTimeAdjustment <= utcOffset) {
            utcOffsetToReturn = utcOffset;
            return false;
        }
    });
    
    return utcOffsetToReturn;
}

function getOffsetTime(utcOffset, currentHour, currentMinutes){
    var timeAtOffset = currentHour + parseInt(utcOffset);
    if (timeAtOffset > 12) timeAtOffset -= 12;
    if (currentMinutes < 10) currentMinutes = "0" + currentMinutes;
    return timeAtOffset + ":" + currentMinutes;
}

function getWikiLinkForCity(cityName){
    var wikiUrlBase = "http://en.wikipedia.org/wiki/";
    var cityNameNoSpaces = cityName.split(" ").join("_");
    return "<a href=" + wikiUrlBase + cityNameNoSpaces + ">" + cityName + "</a>";
}

function get5pmLocationAndTime()
{
    var currentTime = new Date();
    var hour = currentTime.getUTCHours();
    var minutes = currentTime.getMinutes();
    if ((17 - hour) > 12) hour += 24;
    var neededTimeAdjustment = 17 - hour;
    var utcOffset = getUtcOffset(neededTimeAdjustment);
    var offsetTime = getOffsetTime(utcOffset, hour, minutes);
    var randomNumber = Math.floor(Math.random() * utcOffsetToCity[utcOffset].length)
    var offsetCity = utcOffsetToCity[utcOffset][randomNumber];
    var wikiLink = getWikiLinkForCity(offsetCity);
    var prepositionWord = "in";
    if (offsetCity.indexOf("Island") !== -1) prepositionWord = "on";
    return "It is " + offsetTime + "pm " + prepositionWord + " " + wikiLink + ".";
}

jQuery(document).ready(function() {
  jQuery(".about_content").hide();
  jQuery(".about_heading").click(function()
  {
    jQuery(this).next(".about_content").slideToggle(200);
  });
});

var mainParagraph = document.getElementById("main_paragraph");
mainParagraph.innerHTML = get5pmLocationAndTime();
/*setInterval(function(){
    mainParagraph.innerHTML = get5pmLocationAndTime();
}, 7000);*/

$.getJSON("http://5oclock.info/cities.jsoncallback=?", function(data) {
    var temp = data;
});

