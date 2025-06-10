import { Server } from 'http';
import logger from './logger';

export const handleShutdown = (server: Server): void => {
  // Manejo de cierre elegante
  process.on('unhandledRejection', (err: Error) => {
    logger.error(`Unhandled Rejection: ${err.name} - ${err.message}`);
    server.close(() => process.exit(1));
  });

  // Señales de terminación
  const shutdownSignals = ['SIGTERM', 'SIGINT'];
  shutdownSignals.forEach(signal => {
    process.on(signal, () => {
      logger.info(`${signal} received: shutting down gracefully`);
      server.close(() => {
        logger.info('Server closed');
        process.exit(0);
      });
    });
  });
};