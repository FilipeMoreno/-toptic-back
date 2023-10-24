/* eslint-disable prettier/prettier */
import { faker } from '@faker-js/faker/locale/pt_BR';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
async function main() {
  const professores = [];
  const alunos = [];

  for (let i = 1; i <= 10; i++) {
    const criaProfessor = await prisma.usuarios.create({
      data: {
        nome: faker.person.fullName(),
        nome_social:
          Math.floor(Math.random() * 2) === 0 ? null : faker.person.fullName(),
        email_institucional: `professor${i}@uem.br`,
        email: faker.internet.email(),
        departamento: 'Informática',
        numero_matricula: `ra${Math.floor(Math.random() * 1000000).toString()}`,
        tipo: 'PROFESSOR',
        senha: faker.internet.password(),
        Professores: {
          create: {
            Banca: {
              create: {
                tipo_membro: 'INTERNO',
                suplente: Math.floor(Math.random() * 2) === 0,
              },
            },
          },
        },
      },
    });
    professores.push(criaProfessor);
  }

  await prisma.usuarios.create({
    data: {
      nome: faker.person.fullName(),
      nome_social:
        Math.floor(Math.random() * 2) === 0 ? null : faker.person.fullName(),
      email_institucional: 'coordenador1@uem.br',
      email: faker.internet.email(),
      departamento: 'Informática',
      numero_matricula: `ra${Math.floor(Math.random() * 1000000).toString()}`,
      tipo: 'COORDENADOR',
      senha: faker.internet.password(),
      Coordenadores: {
        create: {
          inicio_mandato: new Date(),
          fim_mandato: new Date(
            new Date().setFullYear(new Date().getFullYear() + 3)
          ),
          status: true,
        },
      },
    },
  });

  for (let i = 1; i <= 10; i++) {
    const orientadores = [];
    while (orientadores.length < 3) {
      const r = Math.floor(Math.random() * professores.length);
      if (orientadores.indexOf(r) === -1) orientadores.push(r);
    }

    const criaAlunos = await prisma.usuarios.create({
      data: {
        nome: faker.person.fullName(),
        nome_social:
          Math.floor(Math.random() * 2) === 0 ? null : faker.person.fullName(),
        email: faker.internet.email(),
        email_institucional: `aluno${i}@uem.br`,
        departamento: 'Informática',
        numero_matricula: `ra${Math.floor(Math.random() * 1000000).toString()}`,
        tipo: 'ALUNO',
        senha: faker.internet.password(),
        Alunos: {
          create: {
            orientador_id: professores[orientadores[0]].id,
            coorientador1_id: professores[orientadores[1]].id,
            coorientador2_id: professores[orientadores[2]].id,
            data_ingresso: faker.date.past(),
            status: 'ATIVO',
            Solicitacoes: {
              create: {
                data: new Date(
                  new Date().setFullYear(
                    new Date().getFullYear() + Math.floor(Math.random() * 5)
                  )
                ),
                horario: `${Math.floor(Math.random() * 24)}:${Math.floor(
                  Math.random() * 60
                )}`,
                tipo_banca:
                  Math.floor(Math.random() * 3) === 0
                    ? 'PRESENCIAL'
                    : Math.floor(Math.random() * 3) === 1
                    ? 'HIBRIDO'
                    : 'REMOTO',
                local_bloco: 'C56',
                local_sala:
                  Math.floor(Math.random() * 3) === 0
                    ? `https://meet.google.com/${Math.floor(
                        Math.random() * 1000000
                      )}`
                    : `Sala ${Math.floor(Math.random() * 100)}`,
                tipo_solicitacao:
                  Math.floor(Math.random() * 2) === 0
                    ? 'QUALIFICACAO'
                    : 'DEFESA',
                tipo_curso:
                  Math.floor(Math.random() * 2) === 0
                    ? 'MESTRADO'
                    : 'DOUTORADO',
                titulo_proposta: faker.lorem.sentence(),
                estado: 'PENDENTE',
              },
            },
          },
        },
      },
    });
    alunos.push(criaAlunos);
  }
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
