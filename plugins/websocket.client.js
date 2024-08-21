// plugins/websocket.client.js
export default defineNuxtPlugin((nuxtApp) => {
  const socket = new WebSocket("wss://wsg.ok-ex.io/ws"); // بدون پارامترهای کوئری

  // Event listeners
  socket.onopen = function (event) {
    console.log("WebSocket is open now.");
  };

  socket.onmessage = function (event) {
    console.log("Message from server ", event.data);
  };

  socket.onclose = function (event) {
    console.log("WebSocket is closed now.");
  };

  socket.onerror = function (error) {
    console.log("WebSocket Error: " + error);
  };

  nuxtApp.provide("socket", socket);
});
