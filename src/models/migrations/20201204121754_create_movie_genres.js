exports.up = function(knex) {
  return knex.schema.createTable('movie_genres', (table) => {
    table.increments().primary()
    table.integer('movie_id').references('id').inTable('movies').onDelete('CASCADE').index()
    table.integer('genre_id').references('id').inTable('genres').onDelete('CASCADE').index()
    table.timestamps(true, true)
  })
}

exports.down = function(knex) {
    return knex.schema.dropTable('movie_genres')
}