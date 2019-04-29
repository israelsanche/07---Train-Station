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

// 2. Button for adding 
$("#add-train-btn").on("click", function(event) {
  event.preventDefault();

  // Grabs user input
  var train = $("#train-name-input").val().trim();
  var dest = $("#destination-input").val().trim();
  var first = moment($("#firsttrain-input").val().trim(), "HH:mm").format("X");
  var freq = $("#frequency-input").val().trim();

  // Creates local "temporary" object for holding employee data
  var newTrain = {
    train: train,
    dest: dest,
    first: first,
    freq: freq,
  };

  // Uploads  data to the database
  database.ref().push(newTrain);

  // Logs everything to console
  console.log(train.train);
  console.log(dest.dest);
  console.log(first.first);
  console.log(freq.freq);

  alert("Train successfully added");

  // Clears all of the text-boxes
  $("#train-name-input").val("");
  $("#destination-input").val("");
  $("#firsttrain-input").val("");
  $("#frequency-input").val("");
});

// 3. Create Firebase event for adding  to the database and a row in the html when a user adds an entry
database.ref().on("child_added", function(childSnapshot) {
  console.log(childSnapshot.val());

  // Store everything into a variable.
  var trainName = childSnapshot.val().train;
  var dest = childSnapshot.val().dest;
  var firstTime = childSnapshot.val().first;
  var freq = childSnapshot.val().freq;

  //  Info
  console.log(trainName);
  console.log(dest);
  console.log(firstTime);
  console.log(freq);

  // Insert code for train here
   // Assume the following situations.

    // (TEST 1)
    // First Train of the Day is 3:00 AM
    // Assume Train comes every 3 minutes.
    // Assume the current time is 3:16 AM....
    // What time would the next train be...? (Use your brain first)
    // It would be 3:18 -- 2 minutes away

    // (TEST 2)
    // First Train of the Day is 3:00 AM
    // Assume Train comes every 7 minutes.
    // Assume the current time is 3:16 AM....
    // What time would the next train be...? (Use your brain first)
    // It would be 3:21 -- 5 minutes away


    // ==========================================================

    // Solved Mathematically
    // Test case 1:
    // 16 - 00 = 16
    // 16 % 3 = 1 (Modulus is the remainder)
    // 3 - 1 = 2 minutes away
    // 2 + 3:16 = 3:18

    // Solved Mathematically
    // Test case 2:
    // 16 - 00 = 16
    // 16 % 7 = 2 (Modulus is the remainder)
    // 7 - 2 = 5 minutes away
    // 5 + 3:16 = 3:21

    // Assumptions
    var tFrequency = childSnapshot.val().freq;

    // Time is 3:30 AM
    var firstTime =   childSnapshot.val().first;

    // First Time (pushed back 1 year to make sure it comes before current time)
    var firstTimeConverted = moment(firstTime, "HH:mm").subtract(1, "years");
    console.log(firstTimeConverted);

    // Current Time
    var currentTime = moment();
    console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

    // Difference between the times
    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    console.log("DIFFERENCE IN TIME: " + diffTime);

    // Time apart (remainder)
    var tRemainder = diffTime % tFrequency;
    console.log(tRemainder);

    // Minute Until Train
    var tMinutesTillTrain = tFrequency - tRemainder;
    console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

    // Next Train
    var nextTrain = moment().add(tMinutesTillTrain, "minutes");
    console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));

var nextArrival = moment(nextTrain).format("hh:mm");
var minutesAway = tMinutesTillTrain;

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

