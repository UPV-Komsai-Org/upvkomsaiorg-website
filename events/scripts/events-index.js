const EVENTS_DATA_URL = "./data/events.json";
const DEFAULT_EVENT_IMAGE = "images/test-image.png";

const latestEventContainer = document.getElementById("latestEvent");
const recentEventsContainer = document.getElementById("recentEvents");

const getEventDate = (event) => new Date(event.start);

const getEventUrl = (event) => event.url || `./details.html?id=${event.id}`;

const getEventImage = (event) => event.image || DEFAULT_EVENT_IMAGE;

const getDescriptionPreview = (event) => {
  const [firstParagraph = ""] = event.description_paragraphs || [];
  return firstParagraph.length > 180
    ? `${firstParagraph.slice(0, 177).trim()}...`
    : firstParagraph;
};

const formatRelativeTime = (event) => {
  const start = getEventDate(event);

  if (Number.isNaN(start.getTime())) {
    return "Date unavailable";
  }

  const now = new Date();
  const diffInMs = start - now;
  const absMs = Math.abs(diffInMs);
  const dayMs = 24 * 60 * 60 * 1000;
  const days = Math.round(absMs / dayMs);

  if (days < 1) {
    return diffInMs < 0 ? "Today" : "Today";
  }

  return diffInMs < 0
    ? `${days} day${days === 1 ? "" : "s"} ago`
    : `In ${days} day${days === 1 ? "" : "s"}`;
};

const appendEventMeta = (element, event, className) => {
  element.className = className;
  element.append(formatRelativeTime(event), " ");

  const separator = document.createElement("span");
  separator.className = "small-circle";
  element.append(separator, " ", event.date_formatted || event.start || "Date unavailable");
};

const createEventLink = (event) => {
  const link = document.createElement("a");
  link.className = "btn-primary";
  link.href = getEventUrl(event);
  link.textContent = "Check Event";
  return link;
};

const renderLatestEvent = (event) => {
  latestEventContainer.replaceChildren();

  const card = document.createElement("div");
  card.className = "flex-col latest-event-card";

  const title = document.createElement("h1");
  title.className = "latest-event-title";
  title.textContent = event.title;

  const date = document.createElement("p");
  appendEventMeta(date, event, "latest-event-datetime");

  const description = document.createElement("p");
  description.className = "latest-event-description";
  description.textContent = getDescriptionPreview(event);

  card.append(title, date, description, createEventLink(event));

  const image = document.createElement("img");
  image.className = "latest-event-img";
  image.src = getEventImage(event);
  image.alt = `${event.title} event image`;

  latestEventContainer.append(card, image);
};

const renderRecentEvent = (event) => {
  const card = document.createElement("div");
  card.className = "flex-col prev-event-card";

  const image = document.createElement("img");
  image.className = "prev-event-img";
  image.src = getEventImage(event);
  image.alt = `${event.title} event image`;

  const title = document.createElement("h2");
  title.className = "prev-event-title";
  title.textContent = event.title;

  const date = document.createElement("p");
  appendEventMeta(date, event, "prev-event-datetime");

  const description = document.createElement("p");
  description.className = "prev-event-description";
  description.textContent = getDescriptionPreview(event);

  card.append(image, title, date, description, createEventLink(event));
  return card;
};

const renderEvents = (events) => {
  const sortedEvents = events
    .filter((event) => event.id && event.title && event.start)
    .sort((a, b) => getEventDate(b) - getEventDate(a));

  const [latestEvent, ...recentEvents] = sortedEvents;

  if (latestEvent) {
    renderLatestEvent(latestEvent);
  }

  recentEventsContainer.replaceChildren(...recentEvents.map(renderRecentEvent));
};

const loadEvents = async () => {
  try {
    const response = await fetch(EVENTS_DATA_URL);

    if (!response.ok) {
      throw new Error(`Unable to load events: ${response.status}`);
    }

    renderEvents(await response.json());
  } catch (error) {
    console.error(error);
  }
};

if (latestEventContainer && recentEventsContainer) {
  loadEvents();
}
