const PORT = process.env.PORT || 8080;

const app = require("./app")({ updateComment, updateBlog });
const server = require("http").Server(app);

const WebSocket = require("ws");
const wss = new WebSocket.Server({ server });

wss.on("connection", socket => {
  socket.onmessage = event => {
    console.log(`Message Received: ${event.data}`);

    if (event.data === "ping") {
      socket.send(JSON.stringify("pong"));
    }
  };
});

function updateComment(add, comment) {
  wss.clients.forEach(function eachClient(client) {
    if (client.readyState === WebSocket.OPEN) {
      client.send(
        JSON.stringify({
          add,
          comment
        })
      );
    }
  });
}

function updateBlog(add, blog) {
  wss.clients.forEach(function eachClient(client) {
    if (client.readyState === WebSocket.OPEN) {
      client.send(
        JSON.stringify({
          add,
          blog
        })
      );
    }
  });
}

server.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});