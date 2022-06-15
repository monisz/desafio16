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

    /*
    //Agregué este método para complementar el put por id
    async replaceById(id, data) {
        try {
            const content = await fs.promises.readFile(this.fileName, 'utf-8');
            const contentParse = JSON.parse(content);
            data["id"] = id;
            contentParse[id-1] = data;
            try {
                await fs.promises.writeFile('productos.txt', JSON.stringify(contentParse, null, 2));
                console.log("escritura exitosa");
            }
            catch (error) {
                console.log("el error al escribir fue: ", error);
            }
            return contentParse[id-1];
        }
        catch (error) {
            console.log("error al leer (en Save): ", error);
        }
    }

    async getById(id) {
        try {
            const content = await fs.promises.readFile(this.fileName, 'utf-8');
            const contentParse = JSON.parse(content);
            const objectFinded = contentParse.find((obj) => obj.id === id);
            if (objectFinded) {
                return objectFinded;
            } else {
                return null;
            }
        }
        catch (error) {
            console.log("error al buscar por id: ", error);
        }
    }
*/

    async getAll() {
        try {       
            const products = await this.knex.from(this.table).select('*');
            console.log("productos en getAll", products)
            return products;
        }
        catch (error) {
            console.log("error al leer (en getAll): ", error)
            return [];
        }
    }

    /*
    async deleteById(id) {
        try {
            const content = await fs.promises.readFile(this.fileName, 'utf-8');
            const contentParse = JSON.parse(content);
            contentParse.splice((id-1),1);
            try {
                await fs.promises.writeFile('productos.txt', JSON.stringify(contentParse, null, 2));
                console.log("escritura exitosa en deleteById");
            }
            catch (error) {
                console.log("el error al escribir (en deleteById) fue: ", error);
            }
            return contentParse;
        }
        catch (error) {
            console.log("error al leer (en deleteById): ", error);
        }
    }
*/
    async deleteAll() {
        try {
            await this.knex.from('table').del();
            console.log("borrado exitoso");
        }
        catch (error) {
            console.log("el error al borrar la tabla fue: ", error);
        }
    }
};


module.exports = Container;

