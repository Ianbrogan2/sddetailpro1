import { db } from './firebase-setup.js';

document.addEventListener('DOMContentLoaded', () => {
    const availabilityForm = document.getElementById('availability-form');
    const availabilityList = document.getElementById('availability-list');

    // Define the document ID for the available slots
    const availableSlotsDocId = 'uizpONxpx2bBkJ5nYG0E'; // Ensure this is the correct ID for your document

    // Load existing availability
    loadAvailability();

    availabilityForm.addEventListener('submit', (event) => {
        event.preventDefault();
        setAvailability();
    });

    function setAvailability() {
        const date = document.getElementById('available-date').value;
        const startTime = document.getElementById('available-start-time').value;
        const endTime = document.getElementById('available-end-time').value;
        const id = Date.now().toString(); // Unique ID for each slot

        if (date && startTime && endTime) {
            // Add availability to the Firestore document
            db.collection('availableSlots').doc(availableSlotsDocId).collection('availability').doc(id).set({
                date,
                startTime,
                endTime
            })
            .then(() => {
                alert('Availability set successfully!');
                loadAvailability();
            })
            .catch((error) => {
                console.error('Error setting availability: ', error);
            });
        } else {
            alert('Please fill out all fields.');
        }
    }

    function loadAvailability() {
        // Load availability from the Firestore document
        db.collection('availableSlots').doc(availableSlotsDocId).collection('availability').get()
        .then((querySnapshot) => {
            availabilityList.innerHTML = '';
            if (querySnapshot.empty) {
                availabilityList.innerHTML = '<p>No availability found.</p>';
            } else {
                querySnapshot.forEach((doc) => {
                    const data = doc.data();
                    availabilityList.innerHTML += `
                        <div>
                            <p>${data.date} - ${data.startTime} to ${data.endTime}</p>
                            <button onclick="removeAvailability('${doc.id}')">Remove</button>
                        </div>
                    `;
                });
            }
        })
        .catch((error) => {
            console.error('Error loading availability: ', error);
        });
    }

    window.removeAvailability = function(id) {
        // Remove availability from the Firestore document
        db.collection('availableSlots').doc(availableSlotsDocId).collection('availability').doc(id).delete()
        .then(() => {
            alert('Availability removed successfully!');
            loadAvailability();
        })
        .catch((error) => {
            console.error('Error removing availability: ', error);
        });
    }
});
