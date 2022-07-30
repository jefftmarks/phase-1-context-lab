function createEmployeeRecord([name, surname, title, rate]) {
    return {
        firstName: name,
        familyName: surname,
        title: title,
        payPerHour: rate,
        timeInEvents: [],
        timeOutEvents: []
    }
}

function createEmployeeRecords(array) {
    return array.map((element) => {
        return createEmployeeRecord(element);
    })
}

function createTimeInEvent(date) {
    this.timeInEvents.push({
        type: 'TimeIn',
        hour: parseInt(date.split(' ')[1]),
        date: date.split(' ')[0]
    })
    return this;
}

function createTimeOutEvent(date) {
    this.timeOutEvents.push({
        type: 'TimeOut',
        hour: parseInt(date.split(' ')[1]),
        date: date.split(' ')[0]
    })
    return this;
}

function hoursWorkedOnDate(soughtDate) {
    let inEvent = this.timeInEvents.find((element) => {
        return element.date === soughtDate;
    })
    let outEvent = this.timeOutEvents.find((element) => {
        return element.date === soughtDate;
    })

    return (outEvent.hour - inEvent.hour) / 100
}

function wagesEarnedOnDate(soughtDate) {
    let rawWage = hoursWorkedOnDate.call(this, soughtDate) * this.payPerHour
    return parseFloat(rawWage.toString());
}

/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */

const allWagesFor = function () {
    const eligibleDates = this.timeInEvents.map(function (e) {
        return e.date
    })
    const payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

    return payable
}

function findEmployeeByFirstName(srcArray, nameSought) {
    let employee = srcArray.find((element) => {
        return element.firstName === nameSought;
    });
    return employee;
}

function calculatePayroll(records) {
    return records.reduce((accum, currentValue) => {
        return accum + allWagesFor.call(currentValue);
    }, 0);
}