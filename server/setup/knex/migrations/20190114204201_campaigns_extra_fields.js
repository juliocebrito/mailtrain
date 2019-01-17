exports.up = function(knex, Promise) {
    return knex.schema.table('campaigns', function(t) {
        t.json('extra_fields');
    });
};

exports.down = function(knex, Promise) {
    return knex.schema.table('campaigns', function(t) {
        t.dropColumn('extra_fields');
    })
};
