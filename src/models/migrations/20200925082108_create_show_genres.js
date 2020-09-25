exports.up = function(knex) {
  return knex.schema.createTable('show_genres', (table) => {
    table.increments().primary()
    table.integer('show_id').references('id').inTable('shows').onDelete('CASCADE').index()
    table.integer('genre_id').references('id').inTable('genres').onDelete('CASCADE').index()
    table.timestamps(true, true)
  })
}

exports.down = function(knex) {
    return knex.schema.dropTable('show_genres')
}