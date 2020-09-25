const Joi = require('@hapi/joi')

module.exports = {

    createMovie: Joi.object().options({abortEarly:false, stripUnknown:true}).keys({
        'id': Joi.number().required(),
        'imdb_id': Joi.string().allow(null,''),
        'tmdb_id': Joi.string().allow(null,''),
        'keyphrase': Joi.string().allow(null,''),
        'title': Joi.string().allow(null,''),
        'original_title': Joi.string().allow(null,''),
        'poster_path': Joi.string().allow(null,''),
        'backdrop_path': Joi.string().allow(null,''),
        'original_language': Joi.string().allow(null,''),
        'overview': Joi.string().allow(null,''),
        'vote_average': Joi.number().allow(null,''),
        'popularity': Joi.number().allow(null,''),
        'vote_count': Joi.number().allow(null,''),
        'release_date': Joi.string().allow(null,''),
        'status': Joi.string().allow(null,''),
        'tagline': Joi.string().allow(null,''),
        'adult': Joi.boolean().allow(null,''),
        'genres': Joi.array().allow(null,''),
    }),

    createShow: Joi.object().options({abortEarly:false, stripUnknown:true}).keys({
        'id': Joi.number().required(),
        'name': Joi.string(),
        'original_name': Joi.string(),
        'first_air_date': Joi.string().allow(null,''),
        'poster_path': Joi.string().allow(null,''),
        'backdrop_path': Joi.string().allow(null,''),
        'original_language': Joi.string().allow(null,''),
        'overview': Joi.string().allow(null,''),
        'vote_average': Joi.number().allow(null,''),
        'popularity': Joi.number().allow(null,''),
        'vote_count': Joi.number().allow(null,''),
        'genres': Joi.array(),
    }),

    createSeason: Joi.object().options({abortEarly:false, stripUnknown:true}).keys({
        'air_date': Joi.string().allow(null,''),
        'name': Joi.string().required(),
        'overview': Joi.string().allow(null,''),
        'poster_path': Joi.string().allow(null,''),
        'season_number': Joi.number().required(),
        'genres': Joi.array(),
    }),

    createEpisode: Joi.object().options({abortEarly:false, stripUnknown:true}).keys({
        'id': Joi.number().required(),
        'name': Joi.string().required(),
        'air_date': Joi.string().allow(null,''),
        'overview': Joi.string().allow(null,''),
        'poster_path': Joi.string().allow(null,''),
        'episode_number': Joi.number().required(),
        'season_number': Joi.number().required(),
        'show_id': Joi.number().required(),
        'genres': Joi.array(),
    }),
}