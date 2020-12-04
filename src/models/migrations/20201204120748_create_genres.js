
exports.up = function(knex) {
  return knex.schema.createTable('genres', (table) => {
    table.increments().primary()
    table.string('name').notNullable()
    table.timestamps(true, true)
  })
}

exports.down = function(knex) {
    return knex.schema.dropTable('genres')
}