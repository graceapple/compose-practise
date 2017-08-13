//define compose
const compose = (...fns) => (args) =>
	fns.reduce(
		(composed, f) =>f(composed),
		args
		)
//function that give values and manage console
const oneSecond = ()=> 1000;
const getCurrentTime = ()=> new Date();
const clear = ()=> console.log('\r\n');
const log = (message)=> console.log(message);

//transfer date data
const serializeClockTime = date => 
	({
		hours: date.getHours(),
		minutes: date.getMinutes(),
		seconds: date.getSeconds()
	})

const civilianHours = clockTime =>
	({
		...clockTime,
		hours: (clockTime.hours>12) ? clockTime.hours - 12 : clockTime.hours
	})

const appendAMPM = clockTime =>
	({
		...clockTime,
		ampm: (clockTime.hours >= 12) ? 'PM' : 'AM'
	})

//hoc
const display = target => time => target(time);

const fomartClock = format => time =>
	format.replace('hh', time.hours)
		.replace('mm', time.minutes)
		.replace('ss', time.seconds)
		.replace('tt', time.ampm)

const prependZero = key => clockTime =>
	({
		...clockTime,
		[key]: (clockTime[key] >= 10) ? clockTime[key] : '0' + clockTime[key]
	})

//use compose
//if there is only one statement in arrow function, this statement will be returned by default
//if teher are multipul statements and wrappered by curely bracket {} in arrow function
// must use "return" if you want to return something
const convertToCivilianTime = clockTime => {
	return compose(
		appendAMPM,
		civilianHours
		)(clockTime);
}

const doubleDigits = civilianTime =>
	compose(
		prependZero('hours'),
		prependZero('minutes'),
		prependZero('seconds')
		)(civilianTime);

const startTicking = () => 
	setInterval(
		compose(
			clear,
			getCurrentTime,
			serializeClockTime,
			convertToCivilianTime,
			doubleDigits,
			fomartClock('hh:mm:ss:tt'),
			display(log)
			)
		, oneSecond())

startTicking();