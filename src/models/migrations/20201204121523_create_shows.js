exports.up = function(knex) {
	return knex.schema.createTable('shows', (table) => {
        table.increments().primary()
        table.string('name').notNullable()
        table.string('original_name')
        table.string('keyphrase').notNullable()
        table.string('tagline')
        table.string('original_language')
        table.string('backdrop_path')
        table.string('poster_path')
        table.string('backdrop')
        table.string('poster')
        table.string('homepage')
        table.text('overview')
        table.string('popularity')
        table.string('first_air_date')
        table.string('last_air_date')
        table.string('status')
        table.boolean('in_production')
        table.integer('number_of_episodes')
        table.integer('number_of_seasons')
        table.string('type')
        table.string('vote_average')
        table.string('vote_count') 
        table.boolean('has_art').defaultTo(false)
		table.timestamps(true, true)
	})
}

exports.down = function(knex) {
	return knex.schema.dropTable('shows')
}