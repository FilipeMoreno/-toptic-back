import { FastifyInstance } from 'fastify';
import { buscarSolicitacoes, listarSolicitacoes } from './listar';

export async function solicitacoesRoutes(app: FastifyInstance) {
  app.get('/solicitacoes', listarSolicitacoes);
  app.get('/solicitacoes/:busca', buscarSolicitacoes);
}
