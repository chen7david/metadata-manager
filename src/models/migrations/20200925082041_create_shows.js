exports.up = function(knex) {
	return knex.schema.createTable('shows', (table) => {
        table.increments().primary()
        table.integer('imdb_id')
        table.integer('tmdb_id')
        table.string('keyphrase').notNullable()
        table.string('name').notNullable()
        table.string('poster_path')
        table.string('backdrop_path')
        table.string('original_name')
        table.string('original_language')
        table.text('overview')
        table.string('vote_average')
        table.string('popularity')
        table.string('vote_count') 
        table.string('first_air_date') 
        table.integer('number_of_episodes')
        table.integer('number_of_seasons')
        table.string('status')
        table.string('type')
        table.boolean('in_production')
		table.timestamps(true, true)
	})
}

exports.down = function(knex) {
	return knex.schema.dropTable('shows')
}