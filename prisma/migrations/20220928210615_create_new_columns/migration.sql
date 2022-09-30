/*
  Warnings:

  - Added the required column `access_token` to the `DiscordUserSchema` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `DiscordUserSchema` table without a default value. This is not possible if the table is not empty.
  - Added the required column `refresh_token` to the `DiscordUserSchema` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_DiscordUserSchema" (
    "discordId" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "access_token" TEXT NOT NULL,
    "refresh_token" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_DiscordUserSchema" ("createdAt", "discordId") SELECT "createdAt", "discordId" FROM "DiscordUserSchema";
DROP TABLE "DiscordUserSchema";
ALTER TABLE "new_DiscordUserSchema" RENAME TO "DiscordUserSchema";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
