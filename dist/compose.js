'use strict';

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _extends3 = require('babel-runtime/helpers/extends');

var _extends4 = _interopRequireDefault(_extends3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//define compose
var compose = function compose() {
	for (var _len = arguments.length, fns = Array(_len), _key = 0; _key < _len; _key++) {
		fns[_key] = arguments[_key];
	}

	return function (args) {
		return fns.reduce(function (composed, f) {
			return f(composed);
		}, args);
	};
};
//function that give values and manage console
var oneSecond = function oneSecond() {
	return 1000;
};
var getCurrentTime = function getCurrentTime() {
	return new Date();
};
var clear = function clear() {
	return console.clear();
};
var log = function log(message) {
	return console.log(message);
};

//transfer date data
var serializeClockTime = function serializeClockTime(date) {
	return {
		hours: date.getHours(),
		minutes: date.getMinutes(),
		seconds: date.getSeconds()
	};
};

var civilianHours = function civilianHours(clockTime) {
	return (0, _extends4.default)({}, clockTime, {
		hours: clockTime.hours > 12 ? clockTime.hours - 12 : clockTime.hours
	});
};

var appendAMPM = function appendAMPM(clockTime) {
	return (0, _extends4.default)({}, clockTime, {
		ampm: clockTime.hours >= 12 ? 'PM' : 'AM'
	});
};

//hoc
var display = function display(target) {
	return function (time) {
		return target(time);
	};
};

var fomartClock = function fomartClock(format) {
	return function (time) {
		return format.replace('hh', time.hours).replace('mm', time.minutes).replace('ss', time.seconds).replace('tt', time.ampm);
	};
};

var prependZero = function prependZero(key) {
	return function (clockTime) {
		return (0, _extends4.default)({}, clockTime, (0, _defineProperty3.default)({}, key, clockTime[key] >= 10 ? clockTime[key] : '0' + clockTime[key]));
	};
};

//use compose
var convertToCivilianTime = function convertToCivilianTime(clockTime) {
	compose(appendAMPM, civilianHours)(clockTime);
};

var doubleDigits = function doubleDigits(civilianTime) {
	return compose(prependZero('hours'), prependZero('minutes'), prependZero('seconds'))(civilianTime);
};

var startTicking = function startTicking() {
	return setInterval(compose(clear, getCurrentTime, serializeClockTime, convertToCivilianTime, doubleDigits, fomartClock('hh:mm:ss:tt'), display(log)), oneSecond());
};

startTicking();