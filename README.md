# event-timer
Simple library to track timings of events (for Real User Monitoring) in Google Analytics (works with DTM & GA events)

## USAGE:

### Setup timer
```js
EVENT_TIMER.init('timer_a', function (timings) {
      console.log('## timer started', timings);
      // using GA events
      // ga('send', 'event', timings.timerName, 'init', 'na');
      
      // OR using DTM w/ appropriate data elements
      // _satellite.track('TimerInit');
  });
```
*output:*
```
[object Object] {
  duration: "",
  event: "",
  startTS: 1442416197124,
  timerName: "timer_a"
}
```

### Mark the timing
*(of desired event)*
```js
setTimeout(function(){
  // or put this inside a custom event handler
  EVENT_TIMER.mark('video_start', function(timings){
    console.log('### timings', timings);
    // ga('send', 'event', timings.timerName, timings.event, timings.duration);
  });
}, 2200);
```

*output*
```
[object Object] {
  duration: "0-4s",
  durationMs: 2202,
  durationSeconds: 2,
  event: "video_start",
  startTS: 1442416094430,
  timerName: "timer_a",
  triggered: true
}
```

## Run locally (mac)
```sh
python -m SimpleHTTPServer
```

Goto: `http://localhost:8000`
