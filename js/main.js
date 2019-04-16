const main = document.getElementById('main');
const container = document.getElementById('container');
const strange = document.getElementById('strange');


class Timer {
	constructor(setMinutes, setSeconds, launch, delay) {
		this.setMinutes = setMinutes;
		this.setSeconds = setSeconds;
		this.launch = launch;
		this.delay = delay;
		this.render();
	}

	createCounter() {
	 	this.counter = document.createElement('div');
	 	this.counter.textContent = `${this.setMinutes}:${this.setSeconds}`;
	 	this.counter.classList.add('timer');
	 	return this.counter;
	};

	createStart() {
		this.start = document.createElement('button');
		this.start.textContent = 'Start';
	    return this.start;
	}

	createStop() {
	    this.stop = document.createElement('button');
	    this.stop.textContent = 'Stop';
	    this.stop.style.display = 'none';
	    return this.stop;
	}

	createLine() {
	    this.line = document.createElement('div');
	    this.line.classList.add('line');
	    return this.line;
	}

	createElements(){
	    container.append(this.createCounter());
	    container.append(this.createStart());
	    container.append(this.createStop());
	    container.append(this.createLine());
	}

	change_Button(){
	    this.start.addEventListener(`click`, () => {
	        this.start.style.display = 'none';
	        this.stop.style.display = 'block';
	        strange.classList.add('active_doctor');
		});   

		this.stop.addEventListener(`click`, () => {
	        this.stop.style.display = 'none';
	        this.start.style.display = 'block';
	        strange.classList.remove('active_doctor');
	    }); 
	}

	lifeInterval(){
	    this.widthInterval = 100;
	    this.intervalFirst = setInterval(() => {
	        const currentWidth = this.line.offsetWidth;
	        const percent = (this.width / this.widthInterval);
	        if (currentWidth < percent ) {
	            this.line.style.width = `0`;
	        }
	        this.line.style.width = `${currentWidth - percent}px`;
	    }, 1000);
	}

	stopTimer() {
	    clearInterval(this.intervalFirst);
	    clearInterval(this.timeIntervalFirst);    
	}

	continueTimer() {
	    this.countdown();
	}

	countdown() {
	    this.secondsInterval = 1;
	    this.timeIntervalFirst = setInterval(() =>  {
	        if (this.setMinutes === 0 && this.seconds === 0) {
	            this.stopTimer();
	            this.stop.style.display = 'none';
	            this.start.style.display = 'block';
	            this.start.addEventListener('click', this.timerReset())
	        } else {
	            if (this.seconds <= 0) {
	                this.seconds = 60;
	                this.setMinutes--;
	            } else {
	                this.seconds = this.seconds - this.secondsInterval ;
	            }
	        	this.counter.innerHTML = `${this.setMinutes}:` + (this.seconds < 10 ? "0" : "") + String(this.seconds);
	        }
	    }, this.delay); 
	}

	timerReset() {
		this.line.style.width = "100%";
	    this.seconds = this.setSeconds;
	    this.width = this.line.offsetWidth;
	}

	render() {
	    this.createElements(); 
	    this.change_Button();
	    this.seconds = this.setSeconds;
	    this.width = this.line.offsetWidth;
	    this.stop.addEventListener('click', this.stopTimer.bind(this));
	    this.start.addEventListener('click', this.lifeInterval.bind(this));
	    this.start.addEventListener('click', this.countdown.bind(this));
	    this.stop.addEventListener('click', this.stopTimer.bind(this));        
	}
}

class SecondTimer extends Timer {
    constructor(setMinutes, setSeconds, launch, delay) {
        super(setMinutes, setSeconds, launch, delay); 
    }

    render(){
        super.render();
        if (this.launch === true) {
            this.start.style.display = 'none';
            this.stop.style.display = 'block';
            window.addEventListener('load', this.countdown());
            window.addEventListener('load', this.lifeInterval());
        }
    }

    lifeInterval(){
        super.lifeInterval();
        this.widthInterval = 300; 
    }

    countdown(){
        super.countdown();
        this.secondsInterval = 3;
    }
}

const timer = new Timer(0, 60, false, 1000);
const secondTimer = new SecondTimer(3, 33, true, 3000);
