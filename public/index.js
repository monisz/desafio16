const socket = io();

//Mensajes
const sendMessage = () => {
    const email = document.getElementById("email").value;
    const date = String(new Date().toDateString() + new Date().toLocaleTimeString());
    const text = document.getElementById("text").value;
    const message = { email, date, text };
    socket.emit("newMessage", message);
    return false;
};


const showMessage = (message) => {
    const { email, date, text } = message;
    return `
        <div style="display:flex">
            <strong style="color:blue">${email}</strong> 
            <p style="color:brown">${date}</p>
            <i style="color:green"> : ${text}</i>
        </div>
    `;
};

const addMessage = (messages) => {
    const allMessages = messages.map(message => showMessage(message)).join(" ");
    document.getElementById("messages").innerHTML = allMessages;
};

socket.on('messages', (messages) => {
    addMessage(messages);
});


//Productos
const sendProduct = () => {
    const title = document.getElementById("title").value;
    const price = document.getElementById("price").value;
    const thumbnail = document.getElementById("thumbnail").value;
    const product = { title, price, thumbnail };
    socket.emit("newProduct", product);
    return false;
};


const showProduct = (product) => {
    const { title, price, thumbnail } = product;
    return `
        <tr>
            <td>${title}}</td>
            <td>${price}}</td>
            <td><img src="${thumbnail}" height="50rem"></td>
        </tr>
    `;
};

const addProduct = (products) => {
    const allProducts = products.map(product => showProduct(product)).join(" ");
    document.getElementById("vistaProductos").innerHTML = allProducts;
};

socket.on('products', (allProducts) => {
    addProduct(allProducts);
});