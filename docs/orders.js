import { getAuth, onAuthStateChanged } from 'https://www.gstatic.com/firebasejs/9.17.1/firebase-auth.js';
import { getFirestore, collection, getDocs, query, where } from 'https://www.gstatic.com/firebasejs/9.17.1/firebase-firestore.js';

const auth = getAuth();
const db = getFirestore();

window.onload = async () => {
    onAuthStateChanged(auth, async (user) => {
        if (user) {
            try {
                // Fetch past orders
                const pastOrdersRef = collection(db, 'orders');
                const pastOrdersQuery = query(pastOrdersRef, where('userId', '==', user.uid), where('status', '==', 'completed'));
                const pastOrdersSnapshot = await getDocs(pastOrdersQuery);

                const pastOrdersList = document.getElementById('past-orders-list');
                pastOrdersList.innerHTML = ''; // Clear previous content
                pastOrdersSnapshot.forEach((doc) => {
                    const order = doc.data();
                    const orderDiv = document.createElement('div');
                    orderDiv.innerText = `Order ID: ${doc.id}, Service: ${order.serviceType}, Date: ${order.orderDate.toDate().toLocaleDateString()}, Total: $${order.totalAmount}`;
                    pastOrdersList.appendChild(orderDiv);
                });

                // Fetch scheduled orders
                const scheduledOrdersRef = collection(db, 'orders');
                const scheduledOrdersQuery = query(scheduledOrdersRef, where('userId', '==', user.uid), where('status', '==', 'scheduled'));
                const scheduledOrdersSnapshot = await getDocs(scheduledOrdersQuery);

                const scheduledOrdersList = document.getElementById('scheduled-orders-list');
                scheduledOrdersList.innerHTML = ''; // Clear previous content
                scheduledOrdersSnapshot.forEach((doc) => {
                    const order = doc.data();
                    const orderDiv = document.createElement('div');
                    orderDiv.innerText = `Order ID: ${doc.id}, Service: ${order.serviceType}, Date: ${order.orderDate.toDate().toLocaleDateString()}, Total: $${order.totalAmount}`;
                    scheduledOrdersList.appendChild(orderDiv);
                });
            } catch (error) {
                console.error('Error loading orders: ', error);
                alert('Error loading orders: ' + error.message);
            }
        } else {
            window.location.href = 'login.html'; // Redirect to login if not authenticated
        }
    });
};
