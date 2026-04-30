document.addEventListener('DOMContentLoaded', function() {
    const calendarEl = document.getElementById('calendar');
    const calendar = new FullCalendar.Calendar(calendarEl, {
      initialView: 'dayGridMonth',
      fixedWeekCount: false, 
      contentHeight: 'auto',
      buttonText: {
        today: 'Today' 
      },
      events: "./data/events.json"
    });
    calendar.render();
});