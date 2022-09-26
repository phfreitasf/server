import { check,body } from 'express-validator';

const postAdsValidation = [check(['id']).isUUID().notEmpty(),
body(['name','hourStart','hourEnd','yearsPlaying']).notEmpty()]

export {postAdsValidation}