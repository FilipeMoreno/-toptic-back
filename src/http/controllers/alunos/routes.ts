import { FastifyInstance } from 'fastify';
import { buscaAluno, listarAlunos } from './listar';

export async function alunosRoutes(app: FastifyInstance) {
  app.get('/alunos', listarAlunos);
  app.get('/alunos/:busca', buscaAluno);
}
