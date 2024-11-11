let events = JSON.parse(localStorage.getItem('events')) || [];

// Function to display events on the homepage
function displayEvents() {
    const eventList = document.getElementById('events');
    eventList.innerHTML = '';
    events.forEach((event, index) => {
        const li = document.createElement('li');
        li.innerHTML = `
            <strong>${event.name}</strong> - ${event.date} <br>
            <a href="viewEvent.html" onclick="viewEvent(${index})">View</a> | 
            <a href="registerEvent.html" onclick="registerEvent(${index})">Register</a>
        `;
        eventList.appendChild(li);
    });
}

// Function to handle event creation
document.getElementById('create-event-form')?.addEventListener('submit', function (e) {
    e.preventDefault();
    const name = document.getElementById('eventName').value;
    const date = document.getElementById('eventDate').value;
    const description = document.getElementById('eventDescription').value;
    events.push({ name, date, description });
    localStorage.setItem('events', JSON.stringify(events));
    alert('Event Created!');
    window.location.href = 'index.html';
});

// Function to handle viewing an event
function viewEvent(index) {
    const event = events[index];
    localStorage.setItem('selectedEvent', JSON.stringify(event));
}

// Display event details
if (window.location.pathname.includes('viewEvent.html')) {
    const event = JSON.parse(localStorage.getItem('selectedEvent'));
    document.getElementById('event-title').innerText = event.name;
    document.getElementById('event-date').innerText = event.date;
    document.getElementById('event-description').innerText = event.description;
}

// Function to handle event registration
document.getElementById('register-form')?.addEventListener('submit', function (e) {
    e.preventDefault();
    alert('You have successfully registered for the event!');
    window.location.href = 'index.html';
});

// Admin Dashboard - List and delete events
if (window.location.pathname.includes('adminDashboard.html')) {
    const adminEventList = document.getElementById('admin-event-list');
    adminEventList.innerHTML = '';
    events.forEach((event, index) => {
        const li = document.createElement('li');
        li.innerHTML = `
            <strong>${event.name}</strong> - ${event.date} 
            <button onclick="deleteEvent(${index})">Delete</button>
        `;
        adminEventList.appendChild(li);
    });
}

// Function to delete event
function deleteEvent(index) {
    events.splice(index, 1);
    localStorage.setItem('events', JSON.stringify(events));
    window.location.reload();
}

// Load events on the homepage
window.onload = displayEvents;
