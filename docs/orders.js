import { getAuth } from 'https://www.gstatic.com/firebasejs/9.17.1/firebase-auth.js';
import { getFirestore, collection, getDocs, query, where, addDoc, Timestamp } from 'https://www.gstatic.com/firebasejs/9.17.1/firebase-firestore.js';

const auth = getAuth();
const db = getFirestore();

// Function to generate a unique order ID
function generateOrderId() {
  return 'order_' + Math.random().toString(36).substr(2, 9); // Simple order ID generator
}

// Function to add an order to Firestore
async function addOrder(userId, serviceType, totalAmount, details) {
  try {
    const docRef = await addDoc(collection(db, "orders"), {
      orderId: generateOrderId(),
      userId: userId,
      serviceType: serviceType,
      orderDate: Timestamp.now(),
      status: "pending",
      totalAmount: totalAmount,
      details: details
    });
    console.log("Order written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding order: ", e);
  }
}

// On page load, fetch and display orders
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
      orderDiv.innerText = `Order ID: ${order.orderId}, Date: ${order.orderDate.toDate().toLocaleString()}, Total: ${order.totalAmount}`;
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
      orderDiv.innerText = `Order ID: ${order.orderId}, Date: ${order.orderDate.toDate().toLocaleString()}, Total: ${order.totalAmount}`;
      scheduledOrdersList.appendChild(orderDiv);
    });
  } else {
    window.location.href = 'login.html'; // Redirect to login if not authenticated
  }
};

// Expose the addOrder function globally
window.addOrder = addOrder;
