/* eslint-disable camelcase */

import { FastifyReply, FastifyRequest } from 'fastify';
import { prisma } from '@/lib/prisma';
import { z } from 'zod';

interface UsuarioInterface {
  nome: string;
  nome_social: string;
  email: string;
  email_institucional: string;
  numero_matricula: string;
  departamento: string;
  tipo: string;
}

export async function registrarUsuario(
  request: FastifyRequest,
  // eslint-disable-next-line prettier/prettier
  reply: FastifyReply
) {
  const postagemSchema = z.object({
    nome: z.string(),
    nome_social: z.string().optional(),
    email: z.string().email(),
    email_institucional: z.string().email().optional(),
    numero_matricula: z.string(),
    departamento: z.string(),
    tipo: z.string(),
  });

  const {
    nome,
    nome_social,
    email,
    email_institucional,
    numero_matricula,
    departamento,
    tipo,
  } = postagemSchema.parse(request.body);

  try {
    const gerarSenha = Math.random().toString(36).slice(-8);
    const usuario = await prisma.usuarios.create({
      data: {
        nome,
        nome_social,
        email,
        email_institucional,
        numero_matricula,
        departamento,
        senha: gerarSenha,
        tipo,
      },
    });
    return reply.status(201).send(usuario);
  } catch (error) {
    return reply.status(500).send({ message: 'Internal server error.' });
  }
}
