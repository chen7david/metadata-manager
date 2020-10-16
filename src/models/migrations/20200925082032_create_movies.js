exports.up = function(knex) {
	return knex.schema.createTable('movies', (table) => {
        table.increments().primary()
        table.string('imdb_id').unique()
        table.string('keyphrase').notNullable()
        table.string('title').notNullable()
        table.string('original_title')
        table.string('poster_path')
        table.string('backdrop_path')
        table.string('original_language')
        table.text('overview')
        table.string('vote_average')
        table.string('popularity')
        table.string('vote_count') 
        table.string('release_date') 
        table.string('status')
        table.string('tagline')
        table.string('video')
        table.boolean('adult').defaultTo(false)
		table.timestamps(true, true)
	})
}

exports.down = function(knex) {
	return knex.schema.dropTable('movies')
}