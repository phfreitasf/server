-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_DiscordUserSchema" (
    "discordId" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "access_token" TEXT NOT NULL,
    "refresh_token" TEXT NOT NULL,
    "createdAt" DATETIME DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_DiscordUserSchema" ("access_token", "createdAt", "discordId", "name", "refresh_token") SELECT "access_token", "createdAt", "discordId", "name", "refresh_token" FROM "DiscordUserSchema";
DROP TABLE "DiscordUserSchema";
ALTER TABLE "new_DiscordUserSchema" RENAME TO "DiscordUserSchema";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
