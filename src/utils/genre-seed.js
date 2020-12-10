const { Genre, Movie } = require('./../models')

const movieIds = [
    412117,
    447404,
    354912,
    277834,
    127380,
    87827,
    10991,
    9487,
    1927,
    12,
    638134,
    299534,
    328111,
    131631,
    101299,
    286217,
    19995,
    350,
    863,
    10228,
    570252,
    531454,
    454626,
    316029,
    153518,
    105864,
    99861,
    140823,
    24428,
    12242,
    10674,
    862,
    475430,
    512200,
    546554,
    353486,
    399055,
    136799,
    496,
    11430,
    8587,
    508439,
    324857,
    315635,
    335988,
    284052,
    91314,
    8373,
    1858,
    38356,
    557,
    9732,
    560044,
    420818,
    449563,
    299537,
    293660,
    209112,
    102382,
    82690,
    12155,
    558,
    497698,
    76600,
    383498,
    398818,
    324852,
    68735,
    211672,
    205596,
    93456,
    337401,
    20352,
    1724,
    299536,
    131634,
    454640,
    446893,
    429617,
    301528,
    330457,
    494407,
    363088,
    102899,
    10193,
    25565,
    12599,
    449562,
    454458,
    404368,
    109445,
    70160,
    1930,
    559
]

const genres = [
    {
        "id": 10759,
        "name": "Action & Adventure"
    },
    {
        "id": 16,
        "name": "Animation"
    },
    {
        "id": 35,
        "name": "Comedy"
    },
    {
        "id": 80,
        "name": "Crime"
    },
    {
        "id": 99,
        "name": "Documentary"
    },
    {
        "id": 18,
        "name": "Drama"
    },
    {
        "id": 10751,
        "name": "Family"
    },
    {
        "id": 10762,
        "name": "Kids"
    },
    {
        "id": 9648,
        "name": "Mystery"
    },
    {
        "id": 10763,
        "name": "News"
    },
    {
        "id": 10764,
        "name": "Reality"
    },
    {
        "id": 10765,
        "name": "Sci-Fi & Fantasy"
    },
    {
        "id": 10766,
        "name": "Soap"
    },
    {
        "id": 10767,
        "name": "Talk"
    },
    {
        "id": 10768,
        "name": "War & Politics"
    },
    {
        "id": 37,
        "name": "Western"
    },
    {
        "id": 28,
        "name": "Action"
    },
    {
        "id": 12,
        "name": "Adventure"
    },
    {
        "id": 14,
        "name": "Fantasy"
    },
    {
        "id": 36,
        "name": "History"
    },
    {
        "id": 27,
        "name": "Horror"
    },
    {
        "id": 10402,
        "name": "Music"
    },
    {
        "id": 10749,
        "name": "Romance"
    },
    {
        "id": 878,
        "name": "Science Fiction"
    },
    {
        "id": 10770,
        "name": "TV Movie"
    },
    {
        "id": 53,
        "name": "Thriller"
    },
    {
        "id": 10752,
        "name": "War"
    }
]

/* SEED SCRIPT */
const main = async () => {
    for(let genre of genres){
        try {
            await Genre.query().insert(genre)
        } catch (err) {
            // console.log(err)
        }
    }
    for(let id of movieIds){
        try {
            await Movie.query().insert({id, title: `${id}`})
        } catch (err) {
            console.log(err)
        }
    }
    console.log('project was initialized: db created and seeded')
    process.exit()
}
main()