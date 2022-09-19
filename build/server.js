"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const client_1 = require("@prisma/client");
const app = (0, express_1.default)();
app.use(express_1.default.json);
const prisma = new client_1.PrismaClient();
app.get('/games', (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const games = yield prisma.game.findMany({
        include: {
            _count: {
                select: {
                    ads: true,
                }
            }
        }
    });
    return response.json(games);
}));
app.get('/games/:id/ads', (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const gameId = request.params.id;
    const ads = yield prisma.ad.findMany({
        select: {
            id: true,
            name: true,
            weekDays: true,
            useVoiceChannel: true,
            yearsPlaying: true,
            hourStart: true,
            hourEnd: true
        },
        where: {
            gameId
        },
        orderBy: {
            createdAt: 'desc'
        }
    });
    return response.json(ads.map(ad => {
        return Object.assign(Object.assign({}, ad), { weekDays: ad.weekDays.split(',') });
    }));
}));
app.get('/ads/:id/discord', (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const adId = request.params.id;
    const ad = yield prisma.ad.findUnique({
        select: {
            discord: true
        },
        where: {
            id: adId
        }
    });
    if (!ad)
        return response.status(404).json({
            message: 'Ad id not found'
        });
    return response.json({
        discord: ad.discord
    });
}));
app.post('/games/:id/ads', (request, response) => {
    return response.json(request.body);
});
app.listen(3333);
