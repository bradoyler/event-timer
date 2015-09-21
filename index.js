// event-timer v0.1
// github.com/bradoyler/event-timer

window.EVENT_TIMER = (function () {

    var timings = null;

    var initTimer = function (timerName, callback) {
        if(!callback) { return false; }
        if(!timings) { // prevents timer from running multiple times
            timings = { timerName: timerName, startTS: new Date().getTime(), event:'', duration:''};
            return callback(timings);
        }
        callback({timerName: timerName, event:'subsequent timer'});
    };

    var timingBuckets = [
        {name: '0-4s', from:0, to:5},
        {name: '05-9s',from:5, to:10},
        {name: '10-14s', from:10, to:15},
        {name: '15-19s', from:15, to:20},
        {name: '20-29s', from:20, to:30},
        {name: '30-39s', from:30, to:40},
        {name: '40s+', from:40, to:999999}
    ];

    var getDurationBucket = function (durationSeconds) {

        var durationBucket = '?' + durationSeconds + 's';

        for (i = 0; i < timingBuckets.length; i++) {
            if(durationSeconds >= timingBuckets[i].from && durationSeconds < timingBuckets[i].to) {
                durationBucket = timingBuckets[i].name;
                break;
            }
        }

        return durationBucket;
    };

    var mark = function (eventName, callback) {

        if(timings) {
            if(!timings.triggered) {

                timings.triggered = true;
                timings.event = eventName;
                timings.durationMs = new Date().getTime() - timings.startTS;
                timings.durationSeconds = Math.round(timings.durationMs/1000);
                timings.duration = getDurationBucket(timings.durationSeconds);
            }
            else {
                timings = {triggered:true, event:null, duration:null, durationMs:0, durationSeconds:''}; //clear values for subsequent events
            }
        }

        if(typeof callback === 'function') {
            callback(timings);
        }
    };

    return {
        // public methods/props
        init: initTimer,
        mark: mark,
        buckets: timingBuckets,
        timings:timings
    };
})();

//---------
// Example Usage:
//---------
// setup timer
//  EVENT_TIMER.init('timer_a', function (timings) {
//      console.log('## timer started', timings);

//     // using DTM
//      _satellite.track('direct_call_rule');
//     // using GA
//      ga('send', 'event', timings.timerName, 'init', 'na');
//  });

// put this inside a custom event handler
//  EVENT_TIMER.mark('video_start');
