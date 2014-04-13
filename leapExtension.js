window.jQuery || document.write('<script src="https://raw.githubusercontent.com/woojoo666/LeapExtension/master/jquery-2.1.0.min.js"><\/script>');

var simulateKeyPress = function(character) {
    //console.log('Leap gesture: ' + (['left', 'up', 'right', 'down'])[character - 37]);
    var eventObj = document.createEvent("Events");
    eventObj.initEvent("keydown", true, true);
    eventObj.which = character;
    (document.activeElement || document.body).dispatchEvent(eventObj);
    setTimeout(function() {
        var eventObj = document.createEvent("Events");
        eventObj.initEvent("keyup", true, true);
        eventObj.which = character;
        (document.activeElement || document.body).dispatchEvent(eventObj);
    }, 50);
};

$(document.body).keydown(function() {
    console.log('keydown');
})
    .keyup(function() {
        console.log('keyup');
    })
    .keypress(function() {
        console.log('keypress');
    });

$(document).ready(function() {
    simulateKeyPress(37);
    var ctl = new Leap.Controller({
        enableGestures: true
    });
    var swiper = ctl.gesture('swipe');

    var tolerance = 80;
    var cooloff = 50;

    var x = 2,
        y = 2;

    var slider = _.debounce(function(dir) {
        simulateKeyPress(dir + 37);
    }, cooloff);

    swiper.update(function(g) {
        if (Math.abs(g.translation()[0]) > tolerance || Math.abs(g.translation()[1]) > tolerance) {
            var xDir = Math.abs(g.translation()[0]) > tolerance ? (g.translation()[0] > 0 ? -1 : 1) : 0;
            var yDir = Math.abs(g.translation()[1]) > tolerance ? (g.translation()[1] < 0 ? -1 : 1) : 0;
            var dir = 0;
            if (xDir !== 0) {
                if (xDir > 0) dir = 2;
                else dir = 0;
            } else {
                if (yDir > 0) dir = 3;
                else dir = 1;
            }
            slider(dir);
        }
    });
    ctl.connect();
    console.log("loaded leap");
});
