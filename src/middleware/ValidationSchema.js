const Joi = require('@hapi/joi')

module.exports = {

    createMovie: Joi.object().options({abortEarly:false, stripUnknown:true}).keys({
        'id': Joi.number().required(),
        'imdb_id': Joi.string(),
        'tmdb_id': Joi.string(),
        'keyphrase': Joi.string(),
        'title': Joi.string(),
        'original_title': Joi.string(),
        'poster_path': Joi.string().allow(null),
        'backdrop_path': Joi.string().allow(null),
        'original_language': Joi.string(),
        'overview': Joi.string(),
        'vote_average': Joi.number(),
        'popularity': Joi.number(),
        'vote_count': Joi.number(),
        'release_date': Joi.string(),
        'status': Joi.string(),
        'tagline': Joi.string(),
        'adult': Joi.boolean(),
        'genres': Joi.array(),
    }),

    createShow: Joi.object().options({abortEarly:false, stripUnknown:true}).keys({
        'id': Joi.number().required(),
        'name': Joi.string(),
        'original_name': Joi.string(),
        'first_air_date': Joi.string().allow(null).allow(''),
        'poster_path': Joi.string().allow(null).allow(''),
        'backdrop_path': Joi.string().allow(null).allow(''),
        'original_language': Joi.string().allow(null).allow(''),
        'overview': Joi.string().allow(null).allow(''),
        'vote_average': Joi.number().allow(null).allow(''),
        'popularity': Joi.number().allow(null).allow(''),
        'vote_count': Joi.number().allow(null).allow(''),
        'genres': Joi.array(),
    }),

    createSeason: Joi.object().options({abortEarly:false, stripUnknown:true}).keys({
        'air_date': Joi.string().allow(null).allow(''),
        'name': Joi.string().required(),
        'overview': Joi.string().allow(null).allow(''),
        'poster_path': Joi.string().allow(null).allow(''),
        'season_number': Joi.number().required(),
        'genres': Joi.array(),
    }),

    createEpisode: Joi.object().options({abortEarly:false, stripUnknown:true}).keys({
        'id': Joi.number().required(),
        'name': Joi.string().required(),
        'air_date': Joi.string().allow(null).allow(''),
        'overview': Joi.string().allow(null).allow(''),
        'poster_path': Joi.string().allow(null).allow(''),
        'episode_number': Joi.number().required(),
        'season_number': Joi.number().required(),
        'show_id': Joi.number().required(),
        'genres': Joi.array(),
    }),
}