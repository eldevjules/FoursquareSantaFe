$(function() {
    var fullWidth = $( window ).width() -280;
    var fullHeight = $( window ).height();

    $("#map").css("width", fullWidth);
    $("#map").css("height", fullHeight - 200);
    $(".leaderboards").css("height", fullHeight - 20);
    $(".singlePlace").css("width", (fullWidth / 5) -2);


    $( window ).resize(function() {
        var fullWidth = $( window ).width();
        var fullHeight = $( window ).height();


        $("#map").css("width", fullWidth - 280);
        $("#map").css("height", fullHeight - 200);
        $(".leaderboards").css("height", fullHeight - 20);
    });
});