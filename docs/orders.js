import { getAuth } from 'https://www.gstatic.com/firebasejs/9.17.1/firebase-auth.js';
import { getFirestore, collection, getDocs, query, where } from 'https://www.gstatic.com/firebasejs/9.17.1/firebase-firestore.js';

const auth = getAuth();
const db = getFirestore();

window.onload = async () => {
  const user = auth.currentUser;

  if (user) {
    // Fetch past orders
    const pastOrdersRef = collection(db, 'orders');
    const pastOrdersQuery = query(pastOrdersRef, where('userId', '==', user.uid), where('status', '==', 'completed'));
    const pastOrdersSnapshot = await getDocs(pastOrdersQuery);

    const pastOrdersList = document.getElementById('past-orders-list');
    pastOrdersSnapshot.forEach((doc) => {
      const order = doc.data();
      const orderDiv = document.createElement('div');
      orderDiv.innerText = `Order ID: ${doc.id}, Date: ${order.date}, Total: ${order.total}`;
      pastOrdersList.appendChild(orderDiv);
    });

    // Fetch scheduled orders
    const scheduledOrdersRef = collection(db, 'orders');
    const scheduledOrdersQuery = query(scheduledOrdersRef, where('userId', '==', user.uid), where('status', '==', 'scheduled'));
    const scheduledOrdersSnapshot = await getDocs(scheduledOrdersQuery);

    const scheduledOrdersList = document.getElementById('scheduled-orders-list');
    scheduledOrdersSnapshot.forEach((doc) => {
      const order = doc.data();
      const orderDiv = document.createElement('div');
      orderDiv.innerText = `Order ID: ${doc.id}, Date: ${order.date}, Total: ${order.total}`;
      scheduledOrdersList.appendChild(orderDiv);
    });
  } else {
    window.location.href = 'login.html'; // Redirect to login if not authenticated
  }
};
