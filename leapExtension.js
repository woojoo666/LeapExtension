var simulateKeyPress = function (character) {
    var eventObj = document.createEvent("Events");
    eventObj.initEvent("keydown", true, true);
    eventObj.which = character;
    //ISSUE: dispatching event from 'document' -> 
    // keyboard_input_manager gives error because document has no event.target.tagName (keyboard_input_manager.js:152)
    // dispatching event from 'document.body' ->
    // chrome extension's 'document.body' is detached from actual 'document.body', no event fired
    document.body.dispatchEvent(eventObj);
};

$(document).ready(function() {
    simulateKeyPress(37);
    var ctl = new Leap.Controller({
        enableGestures: true
    });
    console.log("asdf");
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
            console.log(xDir + " " + yDir);
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
});
