import { FastifyInstance } from 'fastify';
import { listarCoordenadores } from './listar';

export async function coordenadoresRoutes(app: FastifyInstance) {
  app.get('/coordenadores', listarCoordenadores);
}
