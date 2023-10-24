/* eslint-disable prettier/prettier */
import { FastifyReply, FastifyRequest } from 'fastify';
import { prisma } from '@/lib/prisma';

export async function listarOrientadores(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const orientadores = await prisma.banca.findMany({
    include: {
      Professores: {
        include: {
          Usuario: true,
        },
      },
    },
  });

  return reply.status(200).send(orientadores);
}
