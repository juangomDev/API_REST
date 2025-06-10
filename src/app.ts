import express, { Application } from 'express';
import { configureExpress } from './utils/config/express'; 
import router from './router/index.routes';
import { globalErrorHandler } from './middlewares/globalError';

const createApp = (): Application => {
  const app = express();
  
  // Configuración de Express
  configureExpress(app);
  
  // Rutas
  app.use('/api/v1', router);
  
  // Manejo de errores
  app.use(globalErrorHandler);
  
  return app;
};

export default createApp;