import app from './app';
import config from './config';
import mongoose from 'mongoose';
import { Server } from 'http';

let server: Server;

async function main() {
  try {
    await mongoose.connect(config.database_url as string);

    server = app.listen(config.port, () => {
      console.log(`Example app listening on port ${config.port}`);
    });
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
}

main();

// Handle unhandled promise rejections
process.on('unhandledRejection', (reason) => {
  console.error('😈 Unhandled Rejection detected:', reason);
  if (server) {
    server.close(() => {
      console.log('🔌 Server is shutting down due to unhandled rejection...');
      process.exit(1);
    });
  } else {
    process.exit(1);
  }
});


process.on('uncaughtException', () => {
  console.error('uncaughtException is detected, shutting down ...');
  process.exit(1)
})


