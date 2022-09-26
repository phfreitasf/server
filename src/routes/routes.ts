import { express } from '../serverConfig/appExpress'
import games_controller from '../controller/GamesController';
import ads_controller from '../controller/AdsController';
import { postAdsValidation } from '../validation/validations';



const router = express.Router();

router.get('/games', games_controller.getAllGames)

router.get('/games/:id/ads', games_controller.getAdsByGame)

router.get('/ads/:id/discord', ads_controller.getDiscordTag)

router.post('/games/:id/ads',
            postAdsValidation,
            games_controller.postNewAd)

export { router }