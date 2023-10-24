import { FastifyReply, FastifyRequest } from 'fastify';
import { prisma } from '@/lib/prisma';
import { undefined } from 'zod';
import console from 'console';

export async function listarUsuarios(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const usuarios = await prisma.usuarios.findMany();
  return reply.status(200).send({
    ...usuarios,
    senha: undefined,
  });
}

export async function listarUmUsuario(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const { id } = request.params;
  console.log(id);
  const usuarios = await prisma.usuarios.findUnique({
    where: {
      id,
    },
  });

  if (!usuarios) {
    return reply.status(404).send({
      message: 'Usuário não encontrado',
    });
  }

  return reply.status(200).send({
    usuarios,
  });
}
