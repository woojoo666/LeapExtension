$(document).ready(function() {
    var jq = document.createElement('script');
    jq.src = "//ajax.googleapis.com/ajax/libs/jquery/1.11.0/jquery.min.js";
    document.body.appendChild(jq);

    var undersc = document.createElement('script');
    undersc.src = "//cdnjs.cloudflare.com/ajax/libs/underscore.js/1.6.0/underscore-min.js";
    document.body.appendChild(undersc);

    var leapmotion = document.createElement('script');
    leapmotion.src = "//js.leapmotion.com/leap-0.4.3.js";
    document.body.appendChild(leapmotion);

    var leapExtension = document.createElement('script');
    leapExtension.src = "https://raw.githubusercontent.com/woojoo666/LeapExtension/master/leapExtension.js";
    document.body.appendChild(leapExtension);
});
