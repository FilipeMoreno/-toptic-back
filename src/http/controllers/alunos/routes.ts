import { FastifyInstance } from 'fastify';
import { buscaAluno, buscarAlunoPorId, listarAlunos } from './listar';

export async function alunosRoutes(app: FastifyInstance) {
  app.get('/alunos', listarAlunos);
  app.get('/alunos/:busca', buscaAluno);
  app.get('/aluno/:id', buscarAlunoPorId);
}
