-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_DiscordUserSchema" (
    "discordId" TEXT NOT NULL PRIMARY KEY,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_DiscordUserSchema" ("discordId") SELECT "discordId" FROM "DiscordUserSchema";
DROP TABLE "DiscordUserSchema";
ALTER TABLE "new_DiscordUserSchema" RENAME TO "DiscordUserSchema";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
