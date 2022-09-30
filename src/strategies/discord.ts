import { prisma } from '../database/prisma'
import passport from 'passport'
const { Strategy } = require('passport-discord')

interface DiscordUserSchema {
    discordId: string
    name: string
    access_token: string
    refresh_token: string
    createdAt?: any
}

passport.serializeUser((user, done) => {
    console.log('Serializando usuario...')
    console.log(user)
    done(null, user)
})

passport.deserializeUser(async (disc: DiscordUserSchema, done) => {
    console.log('Desserializando usuario...')
    console.log(disc)
    try {
        const user = await prisma.discordUserSchema.findUnique({
            where: {
                discordId: disc.discordId
            }
        })
        return user ? done(null, user) : done(null, null)
    }
    catch (err) {
        console.log(err)
        done(err, null)
    }
})



passport.use(new Strategy({
    clientID: process.env.DISCORD_CLIENTID,
    clientSecret: process.env.DISCORD_SECRET,
    callBackUrl: process.env.CALLBACKURL,
    scope: ['identify'],
}, async (accessToken: string, refreshToken: string, profile: any, done: any) => {
    try {
        console.log(accessToken)
        const discordUser = await prisma.discordUserSchema.findUnique({
            where: {
                discordId: profile.id
            },
            select: {
                discordId: true,
                name: true,
                access_token: true,
                refresh_token: true,
                createdAt: true
            }
        })
        console.log('------------LOG PROFILE-------------')
        console.log(profile)
       
        if (discordUser) {
            console.log(`Usuário encontrado: ${discordUser.discordId}`)
            const updateUser = await prisma.discordUserSchema.update({
                where: {
                    discordId: profile.id
                },
                data: {
                    name: profile.username,
                    access_token: accessToken,
                    refresh_token: refreshToken
                },
                select: {
                    discordId: true,
                    name: true,
                    access_token: true,
                    refresh_token: true,
                    createdAt: true
                }
            })
            return done(null, discordUser)
        }
        else {
            const newUser = await prisma.discordUserSchema.create({
                data: {
                    discordId: profile.id,
                    name: profile.username,
                    access_token: accessToken,
                    refresh_token: refreshToken
                }
            })
            console.log(`Usuário criado: ${newUser}`)
            return done(null, newUser)
        }
    }
    catch (err) {
        console.log(err)
        return done(err, null)
    }
}
))
