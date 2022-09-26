import { prisma } from '../database/prisma'
import { Response, Request } from 'express'


// retorna o discord ( quando clica no botao de "Exibir discord" no card de anuncio)
const getDiscordTag = async (req : Request, res : Response) => {
    const adId = req.params.id

    const ad = await prisma.ad.findUnique({
        select: {
            discord: true
        },
        where: {
            id: adId
        }
    })
    if (!ad) return res.status(404).json({
        message: 'Ad id not found'
    })

    return res.json({
        discord: ad.discord
    })
}

export default {getDiscordTag}