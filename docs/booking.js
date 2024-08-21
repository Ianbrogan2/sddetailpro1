import { db } from './firebase-config.js'; // Ensure correct path to your Firebase config
import { collection, query, where, getDocs, Timestamp, addDoc } from 'https://www.gstatic.com/firebasejs/9.17.1/firebase-firestore.js';
import { sendEmail, sendSMS } from './notifications.js'; // Implement these functions for email and SMS notifications

const serviceSelect = document.getElementById('service');
const dateInput = document.getElementById('date');
const timeInput = document.getElementById('time');
const bookingForm = document.getElementById('booking-form');

// Handle form submission
bookingForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const service = serviceSelect.value;
    const date = dateInput.value;
    const time = timeInput.value;
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;

    // Validate inputs
    if (!service || !date || !time || !name || !email || !phone) {
        alert('Please fill in all fields.');
        return;
    }

    // Add booking to Firestore
    try {
        await addDoc(collection(db, 'bookings'), {
            service,
            date,
            time,
            name,
            email,
            phone,
            createdAt: Timestamp.fromDate(new Date())
        });

        // Notify Alec
        sendEmail(email, 'New Booking Received', `You have a new booking for ${service} on ${date} at ${time}.`);
        sendSMS(phone, `New booking for ${service} on ${date} at ${time}.`);

        alert('Booking confirmed!');
        bookingForm.reset();
    } catch (error) {
        console.error('Error adding booking: ', error);
        alert('An error occurred. Please try again.');
    }
});

// Fetch available dates and times based on selected service
serviceSelect.addEventListener('change', async () => {
    const selectedService = serviceSelect.value;
    if (!selectedService) return;

    // Fetch available dates
    const datesQuery = query(collection(db, 'availability'), where('service', '==', selectedService));
    const datesSnapshot = await getDocs(datesQuery);
    const availableDates = datesSnapshot.docs.map(doc => doc.data().date.toDate().toISOString().split('T')[0]);

    // Populate date input with available dates
    dateInput.innerHTML = '<option value="">Select a date</option>';
    availableDates.forEach(date => {
        const option = document.createElement('option');
        option.value = date;
        option.textContent = date;
        dateInput.appendChild(option);
    });
});

// Fetch available times based on selected date
dateInput.addEventListener('change', async () => {
    const selectedDate = dateInput.value;
    const selectedService = serviceSelect.value;
    if (!selectedDate || !selectedService) return;

    // Fetch available times
    const timesQuery = query(
        collection(db, 'availability'),
        where('date', '==', Timestamp.fromDate(new Date(selectedDate))),
        where('service', '==', selectedService)
    );
    const timesSnapshot = await getDocs(timesQuery);
    const availableTimes = timesSnapshot.docs.map(doc => doc.data().time.toDate().toISOString().split('T')[1].slice(0, 5));

    // Populate time input with available times
    timeInput.innerHTML = '<option value="">Select a time</option>';
    availableTimes.forEach(time => {
        const option = document.createElement('option');
        option.value = time;
        option.textContent = time;
        timeInput.appendChild(option);
    });
});
