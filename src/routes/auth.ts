import passport from 'passport';
import { express } from '../serverConfig/appExpress'
const auth = express.Router();

auth.get('/', (req, res) => {
    res.redirect(String(process.env.REDIRECT))
})

auth.get('/api/auth/discord', passport.authenticate('discord'), (req, res) => {
    res.sendStatus(200)
})

auth.get('/api/auth/discord/logout', (req: express.Request, res: express.Response) => {
    if (req.user) {
        req.logOut(err => { if (err) console.log(err) })
        res.send('Logout OK')
    }
    else {
        res.redirect('/')
    }
})

auth.get('/api/auth/discord/redirect', passport.authenticate('discord', { successRedirect: process.env.REDIRECT }), (req: express.Request, res: express.Response) => {
    res.send(200)
})

auth.get('/api/auth/discord/status', (req, res) => {
    return req.user ?
        res.send(req.user) :
        res.json({ 'message': 'acesso negado', 'status': 401 })
})


export { auth }