import { FastifyInstance } from 'fastify';
import { listarOrientadores } from './listar';

export async function orientadoresRoutes(app: FastifyInstance) {
  app.get('/orientadores', listarOrientadores);
}
