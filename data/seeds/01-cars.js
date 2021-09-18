// STRETCH
exports.seed = function(knex) {
    return knex('cars').truncate()
        .then(function () {
            return knex('cars').insert([
                {vin: '4Y1SL65848Z411439', make: 'Audi', model: 'A7', mileage: 12345, title: 'clean', transmission: 'automatic'},
                {vin: '1GKDT13S872103245', make: 'Toyota', model: 'Rav4', mileage: 1351, title: 'clean', transmission: 'auto-manual'},
                {vin: '3GTU2VEC3FG109939', make: 'Tesla', model: 'Model S', mileage: 24389, title: 'clean', transmission: 'none'}
            ])
        })
}