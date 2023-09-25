// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
$(document).ready(function () {
  // displays current day on the top using dayjs
  $("#currentDay").text(dayjs().format("dddd, MMMM D, YYYY"));

  // function to apply the classes past, present, or future to each time block based on the current time
  function realTimeBlocks() {
    // 24 hour format using dayjs
    var currentTime = dayjs().format("H");
    $(".time-block").each(function () {
      // block time is the 2nd element of the array
      var blockTime = parseInt($(this).attr("id").split("-")[1]);
      if (blockTime < currentTime) {
        $(this).addClass("past");
      } else if (blockTime == currentTime) {
        $(this).addClass("present");
      } else {
        $(this).addClass("future");
      }
    });
  }

  realTimeBlocks();

  // using event delegation to handle all the events for the save button
  $(document).on("click", ".saveBtn", function () {
    var timeBlockId = $(this).closest(".time-block").attr("id");
    var scheduleInput = $(this).siblings(".description").val();
    // stores the variables in the local storage
    localStorage.setItem(timeBlockId, scheduleInput);
  });

  // loads up the saved schedule in the local storage
  function savedSchedule() {
    $(".time-block").each(function () {
      var timeBlockId = $(this).attr("id");
      var scheduleInput = localStorage.getItem(timeBlockId);
      $(this).find(".description").val(scheduleInput);
    });
  }

  savedSchedule();

  // updates the week schedule every minute so the past, present, and future blocks change dynamically as time passes
  setInterval(function () {
    realTimeBlocks();
    savedSchedule();
  }, 60000);
});
