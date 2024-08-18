import { db } from './firebase-setup.js';
import { collection, addDoc, getDocs, query, where } from 'firebase/firestore';

async function setAvailability() {
    const availableDate = document.getElementById('available-date').value;
    const startTime = document.getElementById('start-time').value;
    const endTime = document.getElementById('end-time').value;

    // Validate inputs
    if (!availableDate || !startTime || !endTime) {
        alert('Please fill out all fields.');
        return;
    }

    // Store in Firestore
    try {
        await addDoc(collection(db, 'availability'), {
            date: availableDate,
            startTime: startTime,
            endTime: endTime
        });
        alert('Availability set successfully!');
        loadAvailability();
    } catch (error) {
        console.error('Error setting availability:', error);
    }
}

async function loadAvailability() {
    const ul = document.getElementById('availability-ul');
    ul.innerHTML = ''; // Clear current list

    const q = query(collection(db, 'availability'));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
        const data = doc.data();
        const li = document.createElement('li');
        li.textContent = `${data.date}: ${data.startTime} - ${data.endTime}`;
        ul.appendChild(li);
    });
}

// Load availability on page load
document.addEventListener('DOMContentLoaded', loadAvailability);
