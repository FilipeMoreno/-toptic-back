/*
  Warnings:

  - A unique constraint covering the columns `[banca_id,solicitacao_id]` on the table `banca_solicitacoes` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[email_institucional]` on the table `usuarios` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[numero_matricula]` on the table `usuarios` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `aluno_id` to the `solicitacoes` table without a default value. This is not possible if the table is not empty.
  - Added the required column `departamento` to the `usuarios` table without a default value. This is not possible if the table is not empty.
  - Added the required column `email_institucional` to the `usuarios` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nome_social` to the `usuarios` table without a default value. This is not possible if the table is not empty.
  - Added the required column `numero_matricula` to the `usuarios` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `tipo` on the `usuarios` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "TipoUsuario" AS ENUM ('ALUNO', 'PROFESSOR', 'COORDENADOR', 'SECRETARIA', 'ADMINISTRADOR');

-- CreateEnum
CREATE TYPE "TipoAnexos" AS ENUM ('TEXTO_TRABALHO', 'CURRICULO_LATTES_EXTERNO', 'COMPROVANTE_PUBLICACAO', 'CURRICULO_ESTRANGEIRO', 'OUTROS');

-- DropForeignKey
ALTER TABLE "banca_solicitacoes" DROP CONSTRAINT "banca_solicitacoes_banca_id_fkey";

-- AlterTable
ALTER TABLE "banca" ADD COLUMN     "suplente" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "banca_solicitacoes" ADD COLUMN     "banca_externo_id" TEXT,
ADD COLUMN     "extermo" BOOLEAN NOT NULL DEFAULT false,
ALTER COLUMN "banca_id" DROP NOT NULL;

-- AlterTable
ALTER TABLE "solicitacoes" ADD COLUMN     "aluno_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "usuarios" ADD COLUMN     "departamento" TEXT NOT NULL,
ADD COLUMN     "email_institucional" TEXT NOT NULL,
ADD COLUMN     "nome_social" TEXT NOT NULL,
ADD COLUMN     "numero_matricula" TEXT NOT NULL,
DROP COLUMN "tipo",
ADD COLUMN     "tipo" "TipoUsuario" NOT NULL;

-- CreateTable
CREATE TABLE "alunos" (
    "id" TEXT NOT NULL,
    "usuario_id" TEXT NOT NULL,
    "orientador_id" TEXT NOT NULL,
    "coorientador1_id" TEXT NOT NULL,
    "coorientador2_id" TEXT NOT NULL,
    "data_ingresso" TIMESTAMP(3) NOT NULL,
    "status" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "alunos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "anexos" (
    "id" TEXT NOT NULL,
    "solicitacao_id" TEXT NOT NULL,
    "tipo_anexo" "TipoAnexos" NOT NULL,
    "nome" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "anexos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "banca_externo" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "instituicao" TEXT NOT NULL,
    "cpf" TEXT NOT NULL,
    "titulo" TEXT NOT NULL,
    "estado" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "banca_externo_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "alunos_usuario_id_key" ON "alunos"("usuario_id");

-- CreateIndex
CREATE UNIQUE INDEX "banca_solicitacoes_banca_id_solicitacao_id_key" ON "banca_solicitacoes"("banca_id", "solicitacao_id");

-- CreateIndex
CREATE UNIQUE INDEX "usuarios_email_institucional_key" ON "usuarios"("email_institucional");

-- CreateIndex
CREATE UNIQUE INDEX "usuarios_numero_matricula_key" ON "usuarios"("numero_matricula");

-- AddForeignKey
ALTER TABLE "alunos" ADD CONSTRAINT "alunos_usuario_id_fkey" FOREIGN KEY ("usuario_id") REFERENCES "usuarios"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "anexos" ADD CONSTRAINT "anexos_solicitacao_id_fkey" FOREIGN KEY ("solicitacao_id") REFERENCES "solicitacoes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "solicitacoes" ADD CONSTRAINT "solicitacoes_aluno_id_fkey" FOREIGN KEY ("aluno_id") REFERENCES "alunos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "banca_solicitacoes" ADD CONSTRAINT "banca_solicitacoes_banca_id_fkey" FOREIGN KEY ("banca_id") REFERENCES "banca"("id") ON DELETE SET NULL ON UPDATE CASCADE;
