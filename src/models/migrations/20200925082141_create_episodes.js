exports.up = function(knex) {
   return knex.schema.createTable('episodes', (table) => {
      table.increments().primary()
      table.integer('imdb_id')
      table.integer('tmdb_id')
      table.string('name').notNullable()
      table.text('overview')
      table.string('air_date') 
      table.string('still_path') 
      table.string('production_code') 
      table.integer('episode_number')
      table.integer('season_number')
      table.string('vote_average')
      table.string('vote_count')
      table.integer('show_id').references('id').inTable('shows').onDelete('CASCADE').index()
      table.integer('season_id').references('id').inTable('seasons').onDelete('CASCADE').index()
      table.timestamps(true, true)
   })
}

exports.down = function(knex) {
	return knex.schema.dropTable('episodes')
}