<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Manage Availability</title>
    <script type="module" src="https://www.gstatic.com/firebasejs/9.17.1/firebase-app.js"></script>
    <script type="module" src="https://www.gstatic.com/firebasejs/9.17.1/firebase-firestore.js"></script>
    <script type="module">
        import { db } from './firebase-setup.js';

        document.addEventListener('DOMContentLoaded', () => {
            const availabilityForm = document.getElementById('availability-form');
            const availabilityList = document.getElementById('availability-list');

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
                    db.collection('availability').doc(id).set({
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
                db.collection('availability').get().then((querySnapshot) => {
                    availabilityList.innerHTML = '';
                    querySnapshot.forEach((doc) => {
                        const data = doc.data();
                        availabilityList.innerHTML += `
                            <div>
                                <p>${data.date} - ${data.startTime} to ${data.endTime}</p>
                                <button onclick="removeAvailability('${doc.id}')">Remove</button>
                            </div>
                        `;
                    });
                }).catch((error) => {
                    console.error('Error loading availability: ', error);
                });
            }

            window.removeAvailability = function(id) {
                db.collection('availability').doc(id).delete().then(() => {
                    alert('Availability removed successfully!');
                    loadAvailability();
                }).catch((error) => {
                    console.error('Error removing availability: ', error);
                });
            }
        });
    </script>
</head>
<body>
    <h1>Manage Availability</h1>
    <form id="availability-form">
        <label for="available-date">Date:</label>
        <input type="date" id="available-date" required>
        
        <label for="available-start-time">Start Time:</label>
        <input type="time" id="available-start-time" required>
        
        <label for="available-end-time">End Time:</label>
        <input type="time" id="available-end-time" required>
        
        <button type="submit">Set Availability</button>
    </form>

    <h2>Current Availability</h2>
    <div id="availability-list"></div>
</body>
</html>
