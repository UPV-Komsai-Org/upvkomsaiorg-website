const eventNotFound = {
  "id": "not-found",
  "title": "Event Not Found",
  "date_formatted": "N/A",
  "author": "System",
  "description_paragraphs": [
    "We're sorry, but the event you are looking for doesn't exist or has been removed.",
    "Please head back to the main calendar to browse upcoming scheduled events."
  ]
};

const container = document.querySelector('.displayed-event-card');

async function fetchEventDetails() {
    try {
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        const eventId = urlParams.get('id');

        var eventDetails = await fetch('./data/events.json')
                                .then(response => response.json()
                                .then(data => {
                                    return data.find(event => event.id === eventId);
                                }));
        
        if (!eventDetails) return eventNotFound;
        return eventDetails;
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
        return null
    }
}

async function displayEventDetails() {
    const eventDetails = await fetchEventDetails()

    if (eventDetails == null) {
        return;
    }

    
    // Set the simple fields
    container.querySelector('.displayed-event-title').textContent = eventDetails.title;
    container.querySelector('.displayed-event-author').textContent = `Written by ${eventDetails.author}`;
    const datetime = container.querySelector('.displayed-event-datetime');
    const separator = document.createElement('span');
    separator.className = 'small-circle';
    datetime.replaceChildren(
        getRelativeTime(eventDetails.start, eventDetails.end),
        ' ',
        separator,
        ' ',
        eventDetails.date_formatted
    );

    // Handle the paragraphs
    const paragraphs = eventDetails.description_paragraphs.map(text => {
        const p = document.createElement('p');
        p.className = 'displayed-event-description';
        p.textContent = text;
        return p;
    });

    // Append the new paragraphs
    paragraphs.forEach(p => container.appendChild(p));
}

function getRelativeTime(startStr, endStr) {
    if (!startStr && !endStr) return "Context unavailable"

    const now = new Date();
    const start = new Date(startStr);
    const end = endStr ? new Date(endStr) : start;

    if (Number.isNaN(start.getTime()) || Number.isNaN(end.getTime())) {
        return "Date unavailable";
    }

    // Check if happening now
    if (now >= start && now <= end) {
        return "Happening now";
    }

    // Determine which date to compare against
    // future - we care about the start.
    // past - we care about when it ended.
    const isPast = now > end;
    const targetDate = isPast ? end : start;
    
    const diffInMs = targetDate - now;
    const absMs = Math.abs(diffInMs);
    
    const seconds = Math.floor(absMs / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const months = (targetDate.getFullYear() - now.getFullYear()) * 12 + (targetDate.getMonth() - now.getMonth());
    const years = targetDate.getFullYear() - now.getFullYear();

    const absMonths = Math.abs(months);
    const absYears = Math.abs(years);

    // Helper to format the string
    const format = (value, unit) => {
        const plural = Math.abs(value) === 1 ? "" : "s";
        return isPast ? `${Math.abs(value)} ${unit}${plural} ago` : `In ${Math.abs(value)} ${unit}${plural}`;
    };

    // Determine largest unit for wording
    if (absYears >= 1) return format(years, "year");
    if (absMonths >= 1) return format(months, "month");
    if (days >= 1) return format(days, "day");
    if (hours >= 1) return format(hours, "hour");
    
    return isPast ? "Just ended" : "Starting soon";
}

displayEventDetails()

