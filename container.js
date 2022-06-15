const Knex = require('knex');
class Container {
    constructor (options, table) {
        this.knex = Knex(options);
        this.table = table;
    }    

    async save(item) {
        try {
           await this.knex(this.table).insert(item)
           const allItems = await this.knex.from(this.table).select('*');
           return allItems;
        }
        catch (error) {
            console.log("error al insertar (en Save): ", error);
            return [];
        }
    }

    async getAll() {
        try {       
            const products = await this.knex.from(this.table).select('*');
            return products;
        }
        catch (error) {
            console.log("error al leer (en getAll): ", error)
            return [];
        }
    }
};

module.exports = Container;

