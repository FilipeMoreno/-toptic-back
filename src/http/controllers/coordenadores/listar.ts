/* eslint-disable prettier/prettier */
import { FastifyReply, FastifyRequest } from 'fastify';
import { prisma } from '@/lib/prisma';

export async function listarCoordenadores(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const coordenadores = await prisma.coordenadores.findMany({
    include: {
      Usuario: true,
    },
  });

  return reply.status(200).send(coordenadores);
}
