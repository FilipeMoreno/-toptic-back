/* eslint-disable prettier/prettier */
import { FastifyReply, FastifyRequest } from 'fastify';
import { prisma } from '@/lib/prisma';

export async function listarAlunos(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const alunos = await prisma.alunos.findMany({
    include: {
      Usuario: true,
    },
  });

  return reply.status(200).send(alunos);
}

export async function buscaAluno(request: FastifyRequest, reply: FastifyReply) {
  const { busca } = request.params;

  const buscaUsuario = await prisma.usuarios.findMany({
    where: {
      OR: [
        {
          nome_social: {
            not: null,
            contains: busca,
            mode: 'insensitive',
          },
        },
        {
          nome_social: null,
          nome: {
            contains: busca,
            mode: 'insensitive',
          },
        },
        {
          numero_matricula: {
            contains: busca,
            mode: 'insensitive',
          },
        },
      ],
    },
  });

  const alunos = await prisma.alunos.findMany({
    where: {
      usuario_id: {
        in: buscaUsuario.map((usuario) => usuario.id),
      },
    },
    include: {
      Usuario: true,
    },
  });

  return reply.status(200).send(alunos);
}

export async function buscarAlunoPorId(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const { id } = request.params;

  const aluno = await prisma.alunos.findUnique({
    where: {
      id,
    },
    include: {
      Usuario: true,
    },
  });

  return reply.status(200).send(aluno);
}
