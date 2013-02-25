function getUtcOffset(utcOffsetToCity, neededTimeAdjustment){
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

function get5pmLocationAndTime(utcOffsetToCity)
{
    var currentTime = new Date();
    var hour = currentTime.getUTCHours();
    var minutes = currentTime.getMinutes();
    if ((17 - hour) > 12) hour += 24;
    var neededTimeAdjustment = 17 - hour;
    var utcOffset = getUtcOffset(utcOffsetToCity, neededTimeAdjustment);
    var offsetTime = getOffsetTime(utcOffset, hour, minutes);
    var randomNumber = Math.floor(Math.random() * utcOffsetToCity[utcOffset].length)
    var offsetCity = utcOffsetToCity[utcOffset][randomNumber];
    var wikiLink = getWikiLinkForCity(offsetCity);
    var prepositionWord = "in";
    if (offsetCity.indexOf("Island") !== -1) prepositionWord = "on";
    return "It is " + offsetTime + "pm " + prepositionWord + " " + wikiLink + ".";
}

function setAboutHeadingToggle(){
    jQuery(document).ready(function() {
      jQuery(".about_content").hide();
      jQuery(".about_heading").click(function()
      {
        jQuery(this).next(".about_content").slideToggle(200);
      });
    });    
}

setAboutHeadingToggle();
$.getJSON("http://5oclock.info/cities.json", function(utcOffsetToCity) {
    var mainParagraph = document.getElementById("main_paragraph");
    mainParagraph.innerHTML = get5pmLocationAndTime(utcOffsetToCity);
    setInterval(
        function()
        {
            mainParagraph.innerHTML = get5pmLocationAndTime(utcOffsetToCity);
        },
        7000);
});

