var data = {
  "tasks": [
    {
      "taskId": "1",
      "timeStamps": [
        {
          "startTime": "1664115672700",
          "endTime": "1664126472700",
          "sessionId": "1"
        },
        {
          "startTime": "1664130072700",
          "endTime": "1664137272007",
          "sessionId": "1"
        }
      ]
    },
    {
      "taskId": "2",
      "timeStamps": [
        {
          "startTime": "1664144472007",
          "endTime": "1664155272700",
          "sessionId": "1"
        }
      ]
    },
    {
      "taskId": "3",
      "timeStamps": [
        {
          "startTime": "1664202600000",
          "endTime": "1664213400000",
          "sessionId": "2"
        },
        {
          "startTime": "1664217000000",
          "endTime": "1664224200000",
          "sessionId": "2"
        },
      ]
    }
  ],
  "session": [
    {
      "sessionId": "1",
      "taskIds": ["1", "2"],
      "startTime": "1664115672700",
      "endTime": "1664155272700",
      "breakTime": [
        {
          "startTime": "1664126472700",
          "endTime": "1664130072700"
        }
      ]
    },
    {
      "sessionId": "2",
      "taskIds": ["3"],
      "startTime": "1664202600000",
      "endTime": "1664224200000",
      "breakTime": [
        {
          "startTime": "1664213400000",
          "endTime": "1664217000000"
        }
      ]
    }
  ]
};
var timeTrackingStats = new Object(); // Array of Days-Day Dictionary - key: Day and value is array of sessions
var taskTrackingStats = new Object(); // Array of Days-Day Dictionary - key: Day and value is array of tasks
var averageHourlyStats = new Object(); // Array of Hours-Hour Dictionary - key: Hour and value is average number of hours over the days
var daysSoFar = 0;

getTimeTrackingStats(data);
getTaskTrackingStats(data);


function removeBreakTime(breakTime, totalTimeForDay, startDate, endDate){
    if (breakTime.length != 0){
        for (let breakIdx in breakTime){
            var breakStart = new Date(parseInt(breakTime[breakIdx].startTime));
            if (breakStart.getUTCDate() == startDate.getUTCDate() && breakStart.getTime() < endDate.getTime()){
                var breakEnd = new Date(parseInt(breakTime[breakIdx].endTime));
                if (breakEnd.getUTCDate() == startDate.getUTCDate() && breakEnd.getTime() < endDate.getTime()){
                    totalTimeForDay -= breakEnd.getTime() - breakStart.getTime();
                }
                else{
                    totalTimeForDay -= endDate.getTime()-breakStart.getTime();
                }
            }
        }
    }
    return totalTimeForDay;
}

function addSessionToTimeTrackingStats(dateString, sessionDetails){
    if (timeTrackingStats.hasOwnProperty(dateString)){
        timeTrackingStats[dateString].push(sessionDetails); // Session Id, Total Time of the session (in ms)
    }
    else{
        timeTrackingStats[dateString] = [sessionDetails];
    }
}

function addTaskToTaskTrackingStats(dateString, taskDetails){
    if (taskTrackingStats.hasOwnProperty(dateString)){
        taskTrackingStats[dateString].push(taskDetails); // Task Id, Total Time of the task (in ms)
    }
    else{
        taskTrackingStats[dateString] = [taskDetails];
    }
}

function spiltBtwTwoDays(startDate, endDate){
    var endOfDayOne = new Date(startDate);
    endOfDayOne.setUTCHours(23, 59, 59, 59);
    var startOfDayTwo = new Date(endDate);
    startOfDayTwo.setUTCHours(00, 00, 00, 00);
    var totalTimeForDayOne = endOfDayOne.getTime() - startDate.getTime();
    var totalTimeForDayTwo = endDate.getTime() - startOfDayTwo.getTime();
    return [totalTimeForDayOne, totalTimeForDayTwo]
}

function getDateString(date){
    return date.getUTCDate().toString()+"-"+(date.getUTCMonth()+1).toString()+"-"+date.getUTCFullYear().toString();
}

function getTimeTrackingStats(data){
    for (let index in data.session){
        var session = data.session[index];
        var startDate = new Date(parseInt(session.startTime));
        var endDate = new Date(parseInt(session.endTime));
        var breakTime = session.breakTime;
        var dateStartString = getDateString(startDate);
        if (startDate.getUTCDate() != endDate.getUTCDate()){
            var dateEndString = getDateString(endDate);
            var totalTimeForDay = []
            var totalTimeForDayOne = 0
            var totalTimeForDayTwo = 0
            var endOfDayOne = new Date(startDate);
            endOfDayOne.setUTCHours(23, 59, 59, 59);
            var startOfDayTwo = new Date(endDate);
            startOfDayTwo.setUTCHours(00, 00, 00, 00);
            totalTimeForDay = spiltBtwTwoDays(startDate, endDate);
            totalTimeForDayOne = removeBreakTime(breakTime, totalTimeForDay[0], startDate, endOfDayOne);
            totalTimeForDayTwo = removeBreakTime(breakTime, totalTimeForDay[1], startOfDayTwo, endDate);
            addSessionToTimeTrackingStats(dateStartString, [session.sessionId, totalTimeForDayOne]);
            addSessionToTimeTrackingStats(dateEndString, [session.sessionId, totalTimeForDayTwo]);
        }
        else{
            var totalTimeForDay = endDate.getTime()-startDate.getTime();
            totalTimeForDay = removeBreakTime(breakTime, totalTimeForDay, startDate, endDate);
            addSessionToTimeTrackingStats(dateStartString, [session.sessionId, totalTimeForDay]);
        }
    }
    console.log('timeTrackingStats - ', timeTrackingStats);
}

function getTaskTrackingStats(data){
    for (let index in data.tasks){
        var task = data.tasks[index];
        var dateStartString = "";
        var totalTimeForDay = 0;
        for (let timeIdx in task.timeStamps){
            var timeStamp = task.timeStamps[timeIdx];
            var startDate = new Date(parseInt(timeStamp.startTime));
            var endDate = new Date(parseInt(timeStamp.endTime));
            dateStartString = getDateString(startDate);
            if (startDate.getUTCDate() != endDate.getUTCDate()){
                var totalTimeForDays = spiltBtwTwoDays(startDate, endDate);
                totalTimeForDay += totalTimeForDays[0];
                addTaskToTaskTrackingStats(dateStartString, [task.taskId, totalTimeForDay]);
                totalTimeForDay = totalTimeForDays[1];
                dateStartString = getDateString(endDate);
            }
            else{
                totalTimeForDay += endDate.getTime()-startDate.getTime();
            }
        }
        addTaskToTaskTrackingStats(dateStartString, [task.taskId, totalTimeForDay]);
    }
    console.log('taskTrackingStats - ', taskTrackingStats);
}

//TODO: Finish this function
function getAverageHourlyStats(data){
    return averageHourlyStats;
}
