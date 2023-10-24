/*
  Warnings:

  - You are about to drop the column `extermo` on the `banca_solicitacoes` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "banca_solicitacoes" DROP COLUMN "extermo",
ADD COLUMN     "externo" BOOLEAN NOT NULL DEFAULT false;

-- CreateTable
CREATE TABLE "coordenadores" (
    "id" TEXT NOT NULL,
    "usuario_id" TEXT NOT NULL,
    "inicio_mandato" TIMESTAMP(3) NOT NULL,
    "fim_mandato" TIMESTAMP(3) NOT NULL,
    "status" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "coordenadores_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "coordenadores_usuario_id_key" ON "coordenadores"("usuario_id");

-- AddForeignKey
ALTER TABLE "coordenadores" ADD CONSTRAINT "coordenadores_usuario_id_fkey" FOREIGN KEY ("usuario_id") REFERENCES "usuarios"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
