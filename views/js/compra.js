var socket;

document.onreadystatechange = function(newState){
    socket = io ? io() : {on:function(event, callback){}};
    function getAllBuys(){
        // $.get('/api/')
    };
    
    socket.on('new buy item', function(data){
        console.log(data);
        return data;
        // var name = $('<span class="product-name">').text(data.product),
        //     price = $('<span class=:"product-price">').text(data.price.toString()),
        //     separator = $("<span class='separator'>"),
        //     li = $('<li>');

        // li.append(name);
        // li.append(separator);
        // li.append(price);
        // $('#messages').append(li);
    });
}