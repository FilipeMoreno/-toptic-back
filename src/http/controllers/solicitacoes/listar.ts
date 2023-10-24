/* eslint-disable prettier/prettier */
import { FastifyReply, FastifyRequest } from 'fastify';
import { prisma } from '@/lib/prisma';

export async function listarSolicitacoes(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const solicitacoes = await prisma.solicitacoes.findMany({
    include: {
      BancaSolicitacoes: true,
      Anexos: true,
      Alunos: { include: { Usuario: true } },
    },
  });

  return reply.status(200).send(solicitacoes);
}

export async function buscarSolicitacoes(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const { busca } = request.params;

  const solicitacoes = await prisma.solicitacoes.findMany({
    where: {
      OR: [
        {
          titulo_proposta: {
            contains: busca,
            mode: 'insensitive',
          },
        },
        {
          Alunos: {
            Usuario: {
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
          },
        },
      ],
    },
    include: {
      Alunos: {
        include: {
          Usuario: true,
        },
      },
    },
  });

  return reply.status(200).send(solicitacoes);
}
