// Steps to complete:

// 1. Initialize Firebase
// 2. Create button for adding new employees - then update the html + update the database
// 3. Create a way to retrieve employees from the employee database.
// 4. Create a way to calculate the months worked. Using difference between start and current time.
//    Then use moment.js formatting to set difference in months.
// 5. Calculate Total billed

// 1. Initialize Firebase
var config = {
  apiKey: "AIzaSyB50j188of2BZymaC4GGZd0TRkE-oMbnlM",
  authDomain: "train-station-e668b.firebaseapp.com",
  databaseURL: "https://train-station-e668b.firebaseio.com",
  projectId: "train-station-e668b",
  storageBucket: "train-station-e668b.appspot.com",
  messagingSenderId: "889018936006"
};

firebase.initializeApp(config);

var database = firebase.database();

// 2. Button for adding Employees
$("#add-train-btn").on("click", function(event) {
  event.preventDefault();

  // Grabs user input
  var trainName = $("#train-name-input").val().trim();
  var dest = $("#destination-input").val().trim();
  var firsttime = moment($("#firsttrain-input").val().trim(), "HH:mm").format("X");
  var freq = $("#frequency-input").val().trim();

  // Creates local "temporary" object for holding employee data
  var newTrain = {
    train: trainName,
    destination: dest,
    firsttraintime: firsttime,
    frequency: freq,
  };

  // Uploads employee data to the database
  database.ref().push(newTrain);

  // Logs everything to console
  console.log(newTrain.trainName);
  console.log(newTrain.dest);
  console.log(newTrain.firsttime);
  console.log(newTrain.freq);

  alert("Train successfully added");

  // Clears all of the text-boxes
  $("#train-name-input").val("");
  $("#destination-input").val("");
  $("#firsttrain-input").val("");
  $("#frequency-input").val("");
});

// 3. Create Firebase event for adding employee to the database and a row in the html when a user adds an entry
database.ref().on("child_added", function(childSnapshot) {
  console.log(childSnapshot.val());

  // Store everything into a variable.
  var trainName = childSnapshot.val().name;
  var dest = childSnapshot.val().role;
  var firsttime = childSnapshot.val().start;
  var freq = childSnapshot.val().rate;

  // Employee Info
  console.log(trainName);
  console.log(dest);
  console.log(firsttime);
  console.log(freq);

  // Prettify the employee start
  var trainStartPretty = moment.unix(empStart).format("MM/DD/YYYY");

  // Calculate the months worked using hardcore math
  // To calculate the months worked
  var empMonths = moment().diff(moment(empStart, "X"), "months");
  console.log(empMonths);

  // Calculate the total billed rate
  var empBilled = empMonths * empRate;
  console.log(empBilled);

  // Create the new row
  var newRow = $("<tr>").append(
    $("<td>").text(trainName),
    $("<td>").text(dest),
    $("<td>").text(freq),
    $("<td>").text(nextArrival),
    $("<td>").text(minutesAway),
 
  );

  // Append the new row to the table
  $("#train-table > tbody").append(newRow);
});

// Example Time Math
// -----------------------------------------------------------------------------
// Assume Employee start date of January 1, 2015
// Assume current date is March 1, 2016

// We know that this is 15 months.
// Now we will create code in moment.js to confirm that any attempt we use meets this test case
