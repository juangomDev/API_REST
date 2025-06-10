import { Router } from 'express';
import phrasesRouter from './router';
import { Request, Response } from 'express';

const router = Router();

router.get('/health', (req: Request, res: Response) => {
  res.status(200).json({ 
    status: 'ok',
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});

router.get('/', (req: Request, res: Response) => {
  res.status(200).json({ 
    message: 'API is running successfully!',
    documentation: '/api-docs',
    version: process.env.npm_package_version
  });
});

// Rutas de la aplicación
router.use('/phrases', phrasesRouter);

export default router;