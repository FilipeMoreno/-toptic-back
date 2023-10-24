import { FastifyInstance } from 'fastify';
import { listarUmUsuario, listarUsuarios } from './list';
import { registrarUsuario } from './registro';

export async function usersRoutes(app: FastifyInstance) {
  app.get('/usuarios', listarUsuarios);
  app.get('/usuarios/:id', listarUmUsuario);
  app.post('/usuarios', registrarUsuario);
}
