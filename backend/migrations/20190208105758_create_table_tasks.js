
exports.up = function(knex, Promise) {
    return knex.schema.createTable('tasks', table =>{
        table.increments('id').primary()
        table.string('description').notNull()
        table.datetime('estimateAt')
        table.datetime('DoneAt')
        table.integer('userId').references('id')
            .inTable('users').notNull()
    })
};

exports.down = function(knex, Promise) {
    knex.schema.dropTable('tasks')
};
