exports.up = function(knex) {
	return knex.schema.createTable('movies', (table) => {
        table.increments().primary()
        table.string('imdb_id').unique()
        table.string('title').notNullable()
        table.string('original_title')
        table.string('keyphrase').notNullable()
        table.string('tagline')
        table.boolean('adult').defaultTo(false)
        table.string('original_language')
        table.string('backdrop_path')
        table.string('poster_path')
        table.string('homepage')
        table.text('overview')
        table.string('popularity')
        table.string('release_date')
        table.string('status')
        table.integer('runtime')
        table.string('budget')
        table.string('revenue')
        table.string('vote_average')
        table.string('vote_count')
		table.timestamps(true, true)
	})
}

exports.down = function(knex) {
	return knex.schema.dropTable('movies')
}