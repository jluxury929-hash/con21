import { apiServer } from './api/server';
import { config } from './config';
import logger from './utils/logger';

// Graceful shutdown
process.on('SIGINT', () => {
  logger.info('Received SIGINT, shutting down gracefully...');
  apiServer.stop();
  process.exit(0);
});

process.on('SIGTERM', () => {
  logger.info('Received SIGTERM, shutting down gracefully...');
  apiServer.stop();
  process.exit(0);
});

// Start the application
async function startApp() {
  try {
    logger.info('Starting Massive Trading Engine API...');
    
    // Start API server
    apiServer.start();
    
    logger.info('Massive Trading Engine API started successfully!');
    logger.info(`API Server: http://localhost:${config.server.port}`);
    logger.info(`Environment: ${config.server.environment}`);
    
  } catch (error) {
    logger.error('Failed to start application:', error);
    process.exit(1);
  }
}

startApp();
