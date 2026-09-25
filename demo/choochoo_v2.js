class ChooChoo {
    constructor(pollInterval = 500) {
        this.pollInterval = pollInterval;
        this.schedule = []; // The passenger cars
        this.timer = null;  // The engine
    }

    // Board a passenger (an object representing data to send)
    chug(data, name) {
        this.schedule.push({ name, data, time: Date.now() });
        console.log(`🎟️ ${name} boarded the train.`);
        
        // If the engine isn't running, start it
        if (!this.timer) {
            this.allAboard();
        }
    }

    // Depart the station
    async allAboard() {
        this.timer = setTimeout(async () => {
            // Uncouple the cars from the station so new ones can queue
            const departingPassengers = [...this.schedule];
            this.schedule = []; 
            this.timer = null; // Turn off the engine until next time

            if (departingPassengers.length === 0) return;

            console.log(`🚂 Choo choo! Sending ${departingPassengers.length} passengers...`);

            try {
                // Combine all passengers into a single network request
                const response = await fetch('https://api.example.com/batch', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ batch: departingPassengers })
                });

                if (response.ok) {
                    console.log(`✅ Train arrived safely at destination!`);
                }
            } catch (error) {
                console.error(`💥 Train derailed:`, error);
                // Modern queues often have retry logic here
            }
            
        }, this.pollInterval);
    }
}

// Usage:
const train = new ChooChoo(1000); // 1 second interval

// Even though these are called at different times, 
// they will be batched into a single fetch() request.
train.chug({ userId: 1, action: 'click' }, 'UserClickEvent');
train.chug({ userId: 1, action: 'scroll' }, 'UserScrollEvent');
