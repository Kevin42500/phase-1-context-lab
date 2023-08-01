/* Your Code Here */

/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
//  */

// const allWagesFor = function () {
//     const eligibleDates = this.timeInEvents.map(function (e) {
//         return e.date
//     })

//     const payable = eligibleDates.reduce(function (memo, d) {
//         return memo + wagesEarnedOnDate.call(this, d)
//     }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

//     return payable
// }

function createEmployeeRecord(arr) {
    return {
      firstName: arr[0],
      familyName: arr[1],
      title: arr[2],
      payPerHour: arr[3],
      timeInEvents: [],
      timeOutEvents: []
    };
  }
  
  function createEmployeeRecords(arr) {
    return arr.map(createEmployeeRecord);
  }
  
  function createTimeInEvent(employee, timestamp) {
    const [date, hour] = timestamp.split(' ');
    employee.timeInEvents.push({ type: "TimeIn", hour: parseInt(hour, 10), date });
    return employee;
  }
  
  function createTimeOutEvent(employee, timestamp) {
    const [date, hour] = timestamp.split(' ');
    employee.timeOutEvents.push({ type: "TimeOut", hour: parseInt(hour, 10), date });
    return employee;
  }
  
  function hoursWorkedOnDate(employee, date) {
    const timeIn = employee.timeInEvents.find(event => event.date === date);
    const timeOut = employee.timeOutEvents.find(event => event.date === date);

    if (timeIn && timeOut){
        return (timeOut.hour - timeIn.hour) / 100;
    }

    return 0;

  }
  
  function wagesEarnedOnDate(employee, date) {
    const hoursWorked = hoursWorkedOnDate(employee, date);
    return hoursWorked * employee.payPerHour;
  }
  
  function allWagesFor(employee) {
    const datesWorked = employee.timeInEvents.map(event => event.date);
    return datesWorked.reduce((total, date) => total + wagesEarnedOnDate(employee, date), 0);
  }
  
  function findEmployeeByFirstName(srcArray, firstName) {
    return srcArray.find(employee => employee.firstName === firstName);
  }
  
  function calculatePayroll(employeeRecords) {
    return employeeRecords.reduce((totalPayroll, employee) => totalPayroll + allWagesFor(employee), 0);
  }
  
  const employeesData = [
    ["kevin", "Bett", "Software Engineer", 30],
    ["Carson", "Kimberly", "Project Manager", 40],
  ];
  
  const employeeRecords = createEmployeeRecords(employeesData);
  createTimeInEvent(employeeRecords[0], "2023-07-27 0800");
  createTimeOutEvent(employeeRecords[0], "2023-07-27 1700");
  
  const johnsPayroll = allWagesFor(employeeRecords[0]);
  console.log(johnsPayroll); 
  