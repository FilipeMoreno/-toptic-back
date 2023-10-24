import fastify, { fastify } from 'fastify';
import { ZodError } from 'zod';
import { env } from '@/env';
import cors from '@fastify/cors';

import { usersRoutes } from './http/controllers/users/routes';
import {
  solicitacoesRoutes,
  solicitacoesRoutes,
} from './http/controllers/solicitacoes/routes';
import { alunosRoutes } from './http/controllers/alunos/routes';

export const app = fastify();

app.register(cors, {
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
});

app.register(usersRoutes);
app.register(solicitacoesRoutes);
app.register(alunosRoutes);

app.setErrorHandler((error, _, reply) => {
  if (error instanceof ZodError) {
    return reply
      .status(400)
      .send({ message: 'Validation error.', issues: error.format() });
  }

  if (env.NODE_ENV !== 'production') {
    console.error(error);
  } else {
    console.error(error.message);
  }

  return reply.status(500).send({ message: 'Internal server error.' });
});
