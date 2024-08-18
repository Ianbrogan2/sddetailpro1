import { db } from './firebase-setup.js'; // Firebase setup

const availabilityForm = document.getElementById('availability-form');
const existingAvailabilityList = document.getElementById('existing-availability');

// Add a notification element to the HTML
const notification = document.createElement('div');
notification.id = 'notification';
notification.style.display = 'none'; // Hide it initially
notification.style.position = 'fixed';
notification.style.top = '20px';
notification.style.right = '20px';
notification.style.backgroundColor = '#4caf50'; // Green background
notification.style.color = 'white';
notification.style.padding = '10px';
notification.style.borderRadius = '5px';
document.body.appendChild(notification);

function showNotification(message) {
    notification.textContent = message;
    notification.style.display = 'block';

    // Hide the notification after 3 seconds
    setTimeout(() => {
        notification.style.display = 'none';
    }, 3000);
}

function setAvailability() {
    const date = document.getElementById('available-date').value;
    const time = document.getElementById('available-time').value;
    const service = document.getElementById('service-type').value;
    const repeatWeekly = document.getElementById('repeat-weekly').checked;

    const availability = { date, time, service };

    // Add to Firebase
    db.collection('availability').add(availability).then(() => {
        if (repeatWeekly) {
            // Repeat weekly: add availability for the next 4 weeks
            for (let i = 1; i <= 4; i++) {
                const nextWeek = new Date(date);
                nextWeek.setDate(nextWeek.getDate() + 7 * i);
                db.collection('availability').add({
                    date: nextWeek.toISOString().split('T')[0],
                    time,
                    service
                });
            }
        }
        showNotification('Availability successfully set!'); // Show success message
        loadExistingAvailability(); // Refresh the list
    }).catch((error) => {
        showNotification(`Error setting availability: ${error.message}`);
    });
}

function loadExistingAvailability() {
    existingAvailabilityList.innerHTML = ''; // Clear list

    db.collection('availability').get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            const availability = doc.data();
            const listItem = document.createElement('li');
            listItem.textContent = `${availability.date} at ${availability.time} - ${availability.service}`;
            existingAvailabilityList.appendChild(listItem);
        });
    });
}

// Load existing availability on page load
loadExistingAvailability();
