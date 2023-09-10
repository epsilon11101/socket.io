//html references
const lblOnline = document.getElementById("lblOnline");
const lblOffline = document.getElementById("lblOffline");
const txtMessage = document.querySelector("#txtMessage");
const sendBtn = document.querySelector("#sendBtn");
const chatContainer = document.getElementById("chatContainer");

const socket = io();

// fires when detect a connection
socket.on("connect", () => {
  lblOffline.style.display = "none";
  lblOnline.style.display = "";
});

//fires when client is disconnected
socket.on("disconnect", () => {
  lblOnline.style.display = "none";
  lblOffline.style.display = "";
});

//fires when server emmits send message event
socket.on("send-message", (payload) => {
  console.log(payload);
  const nuevoParrafo = document.createElement("p");
  nuevoParrafo.textContent = `Client ${payload.id} :  ${payload.message}`;
  chatContainer.appendChild(nuevoParrafo);
});

sendBtn.addEventListener("click", () => {
  const message = txtMessage.value;
  const payload = {
    message,
    id: "123ABC",
    date: new Date().getTime(),
  };
  //se puede emitir lo que nosotros querramos
  socket.emit("send-message", payload, (obj) => {
    console.log("respuesta callback Desde el server:", obj);
  });
});
