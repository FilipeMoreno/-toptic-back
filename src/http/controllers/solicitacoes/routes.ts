import { FastifyInstance } from 'fastify';
import {
  buscarSolicitacoes,
  buscarSolicitacoesPorAluno,
  buscarSolicitacoesPorOrientador,
  listarSolicitacoes,
} from './listar';

export async function solicitacoesRoutes(app: FastifyInstance) {
  app.get('/solicitacoes', listarSolicitacoes);
  app.get('/solicitacoes/:busca', buscarSolicitacoes);
  app.get('/solicitacoes/aluno/:id', buscarSolicitacoesPorAluno);
  app.get('/solicitacoes/orientador/:id', buscarSolicitacoesPorOrientador);
}
