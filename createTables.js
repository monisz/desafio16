const Knex = require('knex').default;

//Definición tabla productos en MariaDB
const optionsMysql = {
    client: 'mysql',
    connection: {
        host: '127.0.0.1',
        user: 'root',
        password: 'root190422',
        database: 'ecommerce'
    }
};

const knexMysql = Knex(
    optionsMysql
);

const newProducts = [
  {
    title: "Lápiz",
    price: "80",
    thumbnail: "https://cdn3.iconfinder.com/data/icons/education-209/64/pencil-pen-stationery-school-128.png"
  },
  {
    title: "Escuadra",
    price: "120",
    thumbnail: "https://cdn3.iconfinder.com/data/icons/education-209/64/ruler-triangle-stationary-school-128.png"
  },
  {
    title: "Calculadora",
    price: "500",
    thumbnail: "https://cdn3.iconfinder.com/data/icons/education-209/64/calculator-math-tool-school-128.png"
  },
]

const defTableProducts = (async () => {
    await knexMysql.schema.dropTableIfExists('productos');
    await knexMysql.schema.createTable('productos', table => {
        table.increments('id').primary().notNullable(),
        table.string('title',20).notNullable(),
        table.float('price'),
        table.string('thumbnail')
    });
    await knexMysql('productos').insert(newProducts);
    await knexMysql.from('productos').select('*')
        .then((rows) => console.log("contenido de la tabla productos: ", rows));
    console.log('paso x def productos')
    await knexMysql.destroy();
}) ();


//Definición tabla mensajes en SQLite3
const optionsSqlite = {
    client: 'sqlite3',
    connection: { filename: './DB/ecommerce.sqlite' },
    useNullAsDefault: true
};

const knexSqlite = Knex(
    optionsSqlite
);

const defTableMessages = (async () => {
    await knexSqlite.schema.dropTableIfExists('messages');
    await knexSqlite.schema.createTable('messages', table => {
        table.string('email',50).notNullable(),
        table.date('date'),
        table.string('text',100)
    });
    console.log('paso x def messages')
    await knexSqlite.destroy();
}) ();
