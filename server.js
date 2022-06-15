const express = require('express');
const { engine } = require('express-handlebars');
const { Server: HttpServer } = require('http');
const { Server: SocketServer } = require('socket.io');
const Knex = require('knex').default;

const app = express();
const httpServer = new HttpServer(app);
const ioServer = new SocketServer(httpServer);

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
    
const optionsSqlite = {
    client: 'sqlite3',
    connection: { filename: './DB/ecommerce.sqlite' },
    useNullAsDefault: true
};
    
const knexSqlite = Knex(
    optionsSqlite
);

const Container = require('./container');
const tableProducts = new Container (optionsMysql, 'productos');
const tableMessages = new Container (optionsSqlite, 'messages');
        
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.engine(
    'hbs',
    engine({
      extname: '.hbs',
      defaultLayout: 'index.hbs',
    })
);

app.set('views', './public/views');
app.set('view engine', 'hbs');

//Vista de todos los productos
app.get('/', (req, res) => {
    const getProducts = (async () => {
        const products = await tableProducts.getAll();
        res.render('main', {products});
    }) ();
});

//Para agregar un producto
app.post('/productos', (req, res) => {
    const newProduct = req.body;
    const saveProduct = (async () => {
        const allProducts = await tableProducts.save(newProduct);
    }) ();
    res.redirect('/');
});


httpServer.listen(8080, () => {
    console.log("escuchando desafio 12");
});


ioServer.on('connection', (socket) => {
    console.log('Nuevo cliente conectado');
    const getTables = (async () => {
        socket.emit('messages', await tableMessages.getAll());  
        socket.emit('products', await tableProducts.getAll());  
    }) ();

    socket.on("newMessage", (message) => {
        const saveMessage = (async (message) => {
            const allMessages = await tableMessages.save(message);
            ioServer.sockets.emit("messages", allMessages);
        }) (message);
    });
    socket.on('newProduct', (product) => {
        const getProducts = (async (product) => {
            const allProducts = await tableProducts.save(product);
            ioServer.sockets.emit("products", allProducts);
        }) (product);
    });
});
