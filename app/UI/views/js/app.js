var socket;

document.onreadystatechange = function(newState){
    socket = io ? io() : {on:function(event, callback){}};
    
    $('form').submit(function(){
        var data = {
          product: $('#product').val(),
          price: $('#price').val()
        }
        socket.emit('new product', data);
        $('#product').val('');
        $('#price').val('');
        return false;
    });

    socket.on('new product', function(data){
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