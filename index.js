// event-timer v0.1
// github.com/bradoyler/event-timer

window.EVENT_TIMER = (function () {

    var initTimer = function (name, callback) {
        if(!callback) { return false; }

        if(!EVENT_TIMER.timings) { // only create timings once
            EVENT_TIMER.timings = { timerName: timerName, startTS: new Date().getTime(), event:'', duration:''};
            callback(EVENT_TIMER.timings);
        }
    };

    var getDurationBucket = function (durationSeconds) {
        var durationBucket = '';
        if (durationSeconds < 5) {
            durationBucket = '0-4s';
        }
        else if (durationSeconds >= 5 && durationSeconds < 10) {
            durationBucket = '05-9s';
        }
        else if (durationSeconds >= 10 && durationSeconds < 15) {
            durationBucket = '10-14s';
        }
        else if (durationSeconds >= 15 && durationSeconds < 20) {
            durationBucket = '15-19s';
        }
        else if (durationSeconds >= 20 && durationSeconds < 30) {
            durationBucket = '20-29s';
        }
        else if (durationSeconds >= 30 && durationSeconds < 40) {
            durationBucket = '30-39s';
        }
        else if (durationSeconds > 39) {
            durationBucket = '40s+';
        }
        else {
            durationBucket = '?' + durationSeconds + 's';
        }
        return durationBucket;
    }

    var mark = function (eventName) {

        if(EVENT_TIMER.timings) {
            if(!EVENT_TIMER.timings.triggered) {

                EVENT_TIMER.timings.triggered = true;
                EVENT_TIMER.timings.event = eventName;
                EVENT_TIMER.timings.durationMs = new Date().getTime() - EVENT_TIMER.timings.startTS;
                EVENT_TIMER.timings.durationSeconds = Math.round(EVENT_TIMER.timings.durationMs/1000);
                EVENT_TIMER.timings.duration = getDurationBucket(EVENT_TIMER.timings.durationSeconds);
            }
            else {
                EVENT_TIMER.timings = {triggered:true, event:null, duration:null, durationMs:0, durationSeconds:''}; //clear values for subsequent events
            }
        }
    };

    return {
        // public methods
        init: initTimer,
        mark: mark
    };
})();

//---------
// USAGE:
//---------
// setup timer
//  EVENT_TIMER.init('timer_a', function (timings) {
//      console.log('## timer started', timings);

//     // using DTM
//      _satellite.track('direct_call_rule');
//     // using GA
//      ga('send', 'event', timings.timerName, timings.event, timings.duration);
//  });

// put this inside a custom event handler
//  EVENT_TIMER.mark('video_start');
