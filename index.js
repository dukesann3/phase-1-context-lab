/* Your Code Here */

//this becomes reference object
function createEmployeeRecord(arr) {
    let newObject = {};
    //determines if array is nested...
    arr.forEach((item, index) => {
        switch (index) {
            case 0:
                newObject.firstName = item;
                break;
            case 1:
                newObject.familyName = item;
                break;
            case 2:
                newObject.title = item;
                break;
            case 3:
                newObject.payPerHour = item;
                break;
        }
    })
    newObject.timeInEvents = [];
    newObject.timeOutEvents = [];
    return newObject;
}

//this becomes array list (probably) not going to be used with this and apply...
function createEmployeeRecords(arr) {
    const employeeList = [];
    //assume array is two dimensional
    for (let employee of arr) {
        employeeList.push(createEmployeeRecord(employee));
    }
    return employeeList;
}

//using call
function createTimeInEvent(timeInDate) {
    //timeIndate comes in date and hour
    //split timeInDate into two strings
    const timeInDateArray = timeInDate.split(" ");
    const date = timeInDateArray[0];
    const hour = parseInt(timeInDateArray[1], 10);
    const timeInObj = {
        type: 'TimeIn',
        date: date,
        hour: hour,
    }
    //assuming it has timeInEvent key
    this.timeInEvents.push(timeInObj);
    console.log(this);
    return this;
}
/*
let twoRows = ["moe", "sizlak", "barkeep", 2];
const empRec = createEmployeeRecord(twoRows);
createTimeInEvent.call(empRec, "2014-02-28 1400");
*/
function createTimeOutEvent(timeOutDate) {
    //timeIndate comes in date and hour
    if (typeof this !== 'object' || Array.isArray(this)) {
        return;
    }

    //split timeInDate into two strings
    const timeOutDateArray = timeOutDate.split(" ");
    const date = timeOutDateArray[0];
    const hour = parseInt(timeOutDateArray[1], 10);
    const timeOutObj = {
        type: 'TimeOut',
        date: date,
        hour: hour,
    }
    //assuming it has timeInEvent key
    this.timeOutEvents.push(timeOutObj);
    return this;
}

function hoursWorkedOnDate(date) {
    let timeInHour;
    let timeOutHour;
    let difference;
    if (!this.timeInEvents && !this.timeOutEvents) {
        return;
    }
    //if date matches with whatever is in employee object, then...
    for (let i = 0; i < this.timeInEvents.length; i++) {
        if (date === this.timeInEvents[i].date) {
            timeInHour = this.timeInEvents[i].hour;
            timeOutHour = this.timeOutEvents[i].hour;
            difference = Math.abs(timeInHour - timeOutHour) / 100;
        }
    }
    console.log(difference);
    return difference;
}

function wagesEarnedOnDate(date) {
    const hoursWorked = hoursWorkedOnDate.call(this, date);
    if (!hoursWorked) {
        return;
    }
    const earnedWage = hoursWorked * this.payPerHour;
    return earnedWage;
}

function allWagesFor() {
    let summer = 0;
    for (let timeObj of this.timeInEvents) {
        summer = summer + wagesEarnedOnDate.call(this, timeObj.date);
    }
    return summer;
}

function calculatePayroll(multipleEmployees) {
    let aggregateWage = 0;
    //multiple employees having [{},{}] format
    for (let employeeObj of multipleEmployees) {
        aggregateWage = aggregateWage + allWagesFor.call(employeeObj);
    }
    return aggregateWage;
}

function findEmployeeByFirstName(employees, firstNameString) {

    let emptyString = {};

    for(let employee of employees){
        if(employee.firstName === firstNameString){
            emptyString = employee;
            return emptyString;
        }
    }

    return emptyString;
}

let src = [
    ["Loki", "Laufeysson-Odinsson", "HR Representative", 35],
    ["Natalia", "Romanov", "CEO", 150]
]
let emps = createEmployeeRecords(src)
let loki = findEmployeeByFirstName(emps, "Loki");
console.log(loki);




/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */

/*

const allWagesFor = function () {
   const eligibleDates = this.timeInEvents.map(function (e) {
       return e.date
   })

   const payable = eligibleDates.reduce(function (memo, d) {
       return memo + wagesEarnedOnDate.call(this, d)
   }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

   return payable
}

*/

