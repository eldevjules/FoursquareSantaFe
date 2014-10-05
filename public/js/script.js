$(function() {
    var fullWidth = $( window ).width() -300;
    var fullHeight = $( window ).height();

    $("#map").css("width", fullWidth);
    $("#map").css("height", fullHeight - 200);
    $(".leaderboards").css("height", fullHeight - 20);
    $(".singlePlace").css("width", (fullWidth / 5) -2);
    $(".placeContainer").css("width", fullWidth);
    $(".check-in-kamikaze").css("height", (fullHeight / 2) - 15);
    $(".check-ins-kamikazes").css("height", (fullHeight / 2) - 15);


    $( window ).resize(function() {
        var fullWidth = $( window ).width() -300;
        var fullHeight = $( window ).height();


        $("#map").css("width", fullWidth);
        $("#map").css("height", fullHeight - 200);
        $(".leaderboards").css("height", fullHeight - 20);
        $(".singlePlace").css("width", (fullWidth / 5) -2);
        $(".placeContainer").css("width", fullWidth);
        $(".check-in-kamikaze").css("height", (fullHeight / 2) - 15);
        $(".check-ins-kamikazes").css("height", (fullHeight / 2) - 15);
    });
});