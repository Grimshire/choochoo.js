# choochoo.js
choochoo.js is a timing library that allows for certain functions to be executed within a defined timeframe, and all other queued functions to be ignored. This logic allows for lag-ridden or cpu intensive applications to work as intended by enabling a GUI to keep functioning in JS. Additionally, this logic is effectively a loop and could be used to drive games, especially games that require networking. I'm open to comments, gripes, and wicked cool ideas. The library is available for your use. I only ask that no one take credit for this original work.


This example will show you how choochoo.js works.
**Please note, you don't actually need choochoo.js if your environment doesn't suffer from latency. This example would run fine without it.
choochoo.js solves latency issues related to events, and/or provides a timing loop for drawing in multiplayer games or similar routines.



    $(document).ready(function() {
            //only ever call this once
            choochoo.allAboard();
            $("#counter").text("All aboard!");
            window.onscroll = function() {                 
                scrollBanner();    
                $("#counter").text("tickets to process: " + choochoo._schedule.length);                 
            };
            function scrollBanner() {
                if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) {
                    choochoo.chug(function() {                        
                        $("#toptest").fadeOut(1000);                        
                     }, "fadeOut");                             
                } else {            
                   choochoo.chug(function() {                        
                        $("#toptest").fadeIn(1000); 
                   }, "fadeIn");                    
                }                  
            }
        });

## Installation

choochoo.js requires jquery, though since it's so small it could easily be rewritten to be vanilla javascript.
Note that you should call choochoo.allAboard() in the same event that you wish to receive and monitor input from.
After that, choochoo.chug() takes a function as its parameter, the second parameter isn't required at the moment as it may only be useful for debugging.

choochoo.js works by creating a time interval, executes functions within that time interval, and ignores all that failed to arrive in time (hence the train/ticket/passenger metaphor). For example, say within the the last second two events were fired 17 times each (a player advances his character sprite for example by holding down the forward and left keys). However, we only want to initiate what happened within say a 100th, a 10th, or half of a second and discard the rest, that way instead of 17 events, we can whittle them down to a few. 

In a traditional queue algorithm, if latency occurred somewhere in our networking or in the processing of our program, our input from the user could be delayed while other events struggle to finish synchronizing. The resulting backup in our queue could either result in a lengthy execution of no longer desired inputs, or a sudden rush of executions, or both. choochoo.js gets rid of this problem for us by timestamping each input as they arrive.

One last note, calling choochoo.setPoll(X) where X is your number of milliseconds, will result in changing the timestamped events polling. Without setting this, choochoo.js defaults to half a second (500 milliseconds). For a game you should probably try a 100 milliseconds, for a website 200-500 may be ideal. It's a good idea to experiment!
