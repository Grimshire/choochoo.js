var choochoo = new function() {
    let self = this;
    self._stop = false;    
    self._schedule = [];
    self._poll = 500;
    let ticket = {        
        fname: null,
        f: null,
        time: null
    };        
    self.setPoll = function(timeInterval){
        self._poll = timeInterval;
    };
    self.chug = function(f, fname) {
        if(!f) {
            throw new Error("function is undefined or was not provided for the first parameter.");
        }
        if(!fname) {
            throw new Error("function name is undefined or was not provided for the second parameter.");
        }        
        let newTicket = Object.create(ticket);
        ticket.f = f;
        ticket.fname = fname;
        ticket.time = new Date();
        self._schedule.push(ticket);                            
    };
       
    let outBound = false;
    self.allAboard = function(){   
        setInterval(function() {            
            $.ajaxSetup({ async: false }); //forces synchronicity                                                          
            if(outBound) return;
            outBound = true;
            let boardingTime = new Date();
            //generally, this is actually the fastest method of iteration in js            
            for(let i=0; i < self._schedule.length; i++) {
                let currTicket = self._schedule[0];  
                //was the passenger on time?  
                if(currTicket.time > boardingTime - self._poll){
                    //then let's go!
                    self._schedule[0].f();
                }                                                      
            }                
            //reset the train schedule
            self._schedule = [];              
            outBound = false;                        
            $.ajaxSetup({ async: true }); //always turn back on                    
        }, self._poll);
    }    
    function init(){                          
        self._schedule = [];
    }
    init();
}
