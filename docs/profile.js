import { getAuth, onAuthStateChanged, updateEmail, updatePassword, signOut } from 'https://www.gstatic.com/firebasejs/9.17.1/firebase-auth.js';

// Initialize Firebase Auth
const auth = getAuth();

window.onload = () => {
    onAuthStateChanged(auth, (user) => {
        if (user) {
            // Display current user email
            document.getElementById('user-email').textContent = user.email;
        } else {
            // Redirect to login if not authenticated
            window.location.href = 'login.html';
        }
    });
};

function updateProfile() {
    const user = auth.currentUser;
    const newEmail = document.getElementById('new-email').value;
    const newPassword = document.getElementById('new-password').value;

    if (user) {
        const updates = [];

        if (newEmail) {
            updates.push(updateEmail(user, newEmail));
        }

        if (newPassword) {
            updates.push(updatePassword(user, newPassword));
        }

        Promise.all(updates)
            .then(() => {
                alert('Profile updated successfully!');
            })
            .catch((error) => {
                console.error('Error updating profile:', error.message);
                alert('Error updating profile: ' + error.message);
            });
    }
}

function signOut() {
    signOut(auth)
        .then(() => {
            console.log('User signed out');
            alert('Sign-out successful!');
            window.location.href = 'login.html'; // Redirect to login after sign-out
        })
        .catch((error) => {
            console.error('Error signing out:', error.message);
            alert('Error signing out: ' + error.message);
        });
}

// Expose functions globally
window.updateProfile = updateProfile;
window.signOut = signOut;
