// Function to set availability by Alec
function setAvailability() {
    const date = document.getElementById("available-date").value;
    const time = document.getElementById("available-time").value;
    const service = document.getElementById("service-type").value;

    if (date && time) {
        // Store this information in Firebase or another database
        console.log(`Availability set for ${date} at ${time} for ${service}`);
        alert(`Availability set for ${date} at ${time} for ${service}`);
    } else {
        alert("Please select both a date and a time.");
    }
}

// Function to make a booking by customer
function makeBooking() {
    const date = document.getElementById("booking-date").value;
    const time = document.getElementById("booking-time").value;
    const service = document.getElementById("booking-service").value;

    if (date && time) {
        // Store the booking information in Firebase or another database
        console.log(`Booking made for ${date} at ${time} for ${service}`);
        alert(`Booking made for ${date} at ${time} for ${service}`);
    } else {
        alert("Please select both a date and a time.");
    }
}
import { checkAdmin } from './firebase-setup.js';

document.addEventListener('DOMContentLoaded', async () => {
    const isAdmin = await checkAdmin();
    if (isAdmin) {
        document.getElementById('booking-system').style.display = 'block'; // Show the booking system
    } else {
        document.getElementById('booking-system').style.display = 'none'; // Hide if not admin
    }
});
