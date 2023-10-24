-- CreateEnum
CREATE TYPE "TipoSolicitacao" AS ENUM ('DEFESA', 'QUALIFICACAO');

-- CreateEnum
CREATE TYPE "CursoSolicitacao" AS ENUM ('MESTRADO', 'DOUTORADO');

-- CreateEnum
CREATE TYPE "TipoBanca" AS ENUM ('PRESENCIAL', 'REMOTO', 'HIBRIDO');

-- CreateEnum
CREATE TYPE "Tipo_Membro_Banca" AS ENUM ('INTERNO', 'EXTERNO');

-- CreateTable
CREATE TABLE "usuarios" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "senha" TEXT NOT NULL,
    "tipo" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "usuarios_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "professores" (
    "id" TEXT NOT NULL,
    "usuario_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "professores_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "solicitacoes" (
    "id" TEXT NOT NULL,
    "titulo_proposta" TEXT NOT NULL,
    "tipo_solicitacao" "TipoSolicitacao" NOT NULL,
    "tipo_curso" "CursoSolicitacao" NOT NULL,
    "tipo_banca" "TipoBanca" NOT NULL,
    "local_bloco" TEXT NOT NULL,
    "local_sala" TEXT NOT NULL,
    "data" TIMESTAMP(3) NOT NULL,
    "horario" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "solicitacoes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "banca" (
    "id" TEXT NOT NULL,
    "professor_id" TEXT NOT NULL,
    "tipo_membro" "Tipo_Membro_Banca" NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "banca_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "banca_solicitacoes" (
    "id" TEXT NOT NULL,
    "banca_id" TEXT NOT NULL,
    "solicitacao_id" TEXT NOT NULL,

    CONSTRAINT "banca_solicitacoes_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "usuarios_email_key" ON "usuarios"("email");

-- CreateIndex
CREATE UNIQUE INDEX "professores_usuario_id_key" ON "professores"("usuario_id");

-- CreateIndex
CREATE UNIQUE INDEX "banca_solicitacoes_banca_id_solicitacao_id_key" ON "banca_solicitacoes"("banca_id", "solicitacao_id");

-- AddForeignKey
ALTER TABLE "professores" ADD CONSTRAINT "professores_usuario_id_fkey" FOREIGN KEY ("usuario_id") REFERENCES "usuarios"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "banca" ADD CONSTRAINT "banca_professor_id_fkey" FOREIGN KEY ("professor_id") REFERENCES "professores"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "banca_solicitacoes" ADD CONSTRAINT "banca_solicitacoes_solicitacao_id_fkey" FOREIGN KEY ("solicitacao_id") REFERENCES "solicitacoes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "banca_solicitacoes" ADD CONSTRAINT "banca_solicitacoes_banca_id_fkey" FOREIGN KEY ("banca_id") REFERENCES "banca"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
