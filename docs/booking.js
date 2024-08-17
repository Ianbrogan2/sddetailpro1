import { checkAdmin, db } from './firebase-setup.js';
import { collection, addDoc, Timestamp } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-firestore.js";

// Function to set availability by Alec
async function setAvailability() {
    const date = document.getElementById("available-date").value;
    const time = document.getElementById("available-time").value;
    const service = document.getElementById("service-type").value;

    if (date && time && service) {
        try {
            const availabilityRef = collection(db, "availability");
            await addDoc(availabilityRef, {
                date: date,
                time: time,
                service: service,
                timestamp: Timestamp.fromDate(new Date())
            });
            console.log(`Availability set for ${date} at ${time} for ${service}`);
            alert(`Availability set for ${date} at ${time} for ${service}`);
        } catch (error) {
            console.error("Error adding availability: ", error);
            alert("Error setting availability. Please try again.");
        }
    } else {
        alert("Please fill in all fields.");
    }
}

// Function to make a booking by customer
async function makeBooking() {
    const date = document.getElementById("booking-date").value;
    const time = document.getElementById("booking-time").value;
    const service = document.getElementById("booking-service").value;

    if (date && time && service) {
        try {
            const bookingsRef = collection(db, "bookings");
            await addDoc(bookingsRef, {
                date: date,
                time: time,
                service: service,
                timestamp: Timestamp.fromDate(new Date())
            });
            console.log(`Booking made for ${date} at ${time} for ${service}`);
            alert(`Booking made for ${date} at ${time} for ${service}`);
        } catch (error) {
            console.error("Error making booking: ", error);
            alert("Error making booking. Please try again.");
        }
    } else {
        alert("Please fill in all fields.");
    }
}

// Initialize the visibility of the booking system based on admin status
document.addEventListener('DOMContentLoaded', async () => {
    const isAdmin = await checkAdmin();
    if (isAdmin) {
        document.getElementById('booking-system').style.display = 'block'; // Show the booking system
    } else {
        document.getElementById('booking-system').style.display = 'none'; // Hide if not admin
    }
});

// Attach event listeners to buttons
document.getElementById("set-availability-btn").addEventListener("click", setAvailability);
document.getElementById("make-booking-btn").addEventListener("click", makeBooking);
