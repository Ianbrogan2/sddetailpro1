import { getAuth, signOut, updateEmail, updatePassword } from 'https://www.gstatic.com/firebasejs/9.17.1/firebase-auth.js';

const auth = getAuth();

window.onload = () => {
  const user = auth.currentUser;

  if (user) {
    document.getElementById('user-email').innerText = user.email;
  } else {
    window.location.href = 'login.html'; // Redirect to login if not authenticated
  }
};

function updateProfile() {
  const newEmail = document.getElementById('new-email').value;
  const newPassword = document.getElementById('new-password').value;
  const user = auth.currentUser;

  if (user) {
    if (newEmail) {
      updateEmail(user, newEmail).then(() => {
        alert('Email updated successfully!');
      }).catch((error) => {
        alert('Error updating email: ' + error.message);
      });
    }
    if (newPassword) {
      updatePassword(user, newPassword).then(() => {
        alert('Password updated successfully!');
      }).catch((error) => {
        alert('Error updating password: ' + error.message);
      });
    }
  } else {
    alert('No user is signed in.');
  }
}

function signOut() {
  signOut(auth).then(() => {
    alert('Signed out successfully!');
    window.location.href = 'login.html';
  }).catch((error) => {
    alert('Error signing out: ' + error.message);
  });
}
