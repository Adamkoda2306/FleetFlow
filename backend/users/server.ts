import dotenv from "dotenv";
dotenv.config();
import "./grpc/grpc.server";
import { Server } from "socket.io";
import http from "http";
import enableLogging, { log, attachDashboard } from "logsave-hub";
import app from './app';


const server = http.createServer(app);
const io = new Server(server);

// logsave-hub Configuration
attachDashboard(io);

enableLogging({
  override: false,
  outDir: "./logs",
  retention: false
});

async function startServer() {
  try {
    server.listen(process.env.PORT, () => {
      log.save(`[SERVER] Running on http://localhost:${process.env.PORT}`);
      log.save(`[SERVER] Environment: ${process.env.NODE_ENV}`);
    });
  } catch (err: any) {
    log.error("[SERVER] Failed to start server");
    process.exit(1);
  }
}

startServer();