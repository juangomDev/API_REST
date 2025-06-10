import createApp from './app';
import { PORT } from './utils/config/env';
import logger from './utils/logger';
import { handleShutdown } from './utils/serverUtils'; 

const app = createApp();

const server = app.listen(PORT, () => {
  logger.info(`Server is running on port ${PORT}`);
  logger.info(`Environment: ${process.env.NODE_ENV || 'development'}`);
});

// Manejo de cierre
handleShutdown(server);