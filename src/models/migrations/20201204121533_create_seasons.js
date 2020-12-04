exports.up = function(knex) {
  return knex.schema.createTable('seasons', (table) => {
    table.increments().primary()
    table.string('name').notNullable()
    table.string('poster_path')
    table.text('overview')
    table.string('air_date') 
    table.integer('season_number')
    table.integer('show_id').references('id').inTable('shows').onDelete('CASCADE').index()
    table.timestamps(true, true)
  })
}

exports.down = function(knex) {
    return knex.schema.dropTable('seasons')
}