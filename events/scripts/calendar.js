document.addEventListener('DOMContentLoaded', function() {
    const calendarEl = document.getElementById('calendar');
    const calendar = new FullCalendar.Calendar(calendarEl, {
      initialView: 'dayGridMonth',
      fixedWeekCount: false, 
      contentHeight: 'auto',
      buttonText: {
        today: 'Today' 
      },
      events: [
        {
          title: 'Event 1',
          start: '2026-02-10',
          end: '2026-02-12'
        },
        {
          title: 'Event 2',
          start: '2026-02-15',
          end: '2026-02-16'
        },
        {
          title: 'Event 3',
          start: '2026-02-20',
          end: '2026-02-22'
        }

      ]
    });
    calendar.render();
});