import { prisma } from '../database/prisma'
import { Response, Request } from 'express'
import { convertHourStringToMinutes } from '../utils/convert-hour-string-to-minutes';
import { convertMinutesToHourString } from '../utils/convert-minutes-to-hour-string';
import { validationResult } from 'express-validator';


// retorna todos os jogos (usado na tela inicial)
const getAllGames = async (req: Request, res: Response) => {

    try {
        const games = await prisma.game.findMany({
            include: {
                _count: {
                    select: {
                        ads: true,
                    }
                }
            }
        })
        return res.json(games)
    }
    catch (error) {
        return res.send('Houve um erro ' + error)
    }
}

// retorna todos os as (quando clica em um jogo)
const getAdsByGame = async (req: Request, res: Response) => {
    const gameId: string = req.params.id;
    try {

        const ads = await prisma.ad.findMany({
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
        })
        return res.json(ads.map(ad => {
            return {
                ...ad,
                weekDays: ad.weekDays.split(','),
                hourStart: convertMinutesToHourString(ad.hourStart), //converte os minutos em horas
                hourEnd: convertMinutesToHourString(ad.hourEnd)    //converte os minutos em horas
            }
        }))
    }
    catch (error: any) {
        return res.send('Houve um erro ' + error)

    }
}


//post novo anuncio
const postNewAd = async (req: Request, res: Response) => {
    const gameId = req.params.id
    const body: any = req.body
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
    const ad = await prisma.ad.create({
        data: {
            gameId,
            name: body.name,
            yearsPlaying: body.yearsPlaying,
            discord: body.discord,
            weekDays: body.weekDays.join(','),
            hourStart: convertHourStringToMinutes(body.hourStart),
            hourEnd: convertHourStringToMinutes(body.hourEnd),
            useVoiceChannel: body.useVoiceChannel,
            createdAt: body.createdAt
        }
    })
    return res.json(ad)
}


export default { getAllGames, getAdsByGame, postNewAd }