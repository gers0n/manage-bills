var socket;
var compraAPI = {
    crear: function(data, callback){
        data = data || {};
        $.post('/api/compras/', data, callback);
    },
    encontrar: function(data, callback){
        data = data || {};
        $.get('/api/compra/'+data.Id, callback);
    },
    todas: function(data, callback){
        data = data || {};
        $.get('/api/compras/', callback);
    }

}

function CompraModel(options){
    var self = this;
    options = options || {};
    self.IdSuplidor = ko.observable(options.Suplidor || {});
    self.IdProductos = ko.observableArray(options.IdProductos || [])
};

function ProductoModel(options){
    var self = this;
    options = options || {};
    self.Nombre = options.Nombre || '';
    self.CodigoProducto = options.CodigoProducto || '';
    self.Precio = parseInt(options.Precio || 1);
    self.Cantidad = parseInt(options.Cantidad || 1);
    self.Medida = "Unidades";
    self.AmountInEnum = ["Unidades", "Libras"];
    self.Suplidor = options.Suplidor || {};

};

function SuplidorModel(options){
    var self = this;
    options = options || {};
    self.Id = undefined;
    self.Nombre = options.Nombre || '';
    self.NumeroTelefonico = options.NumeroTelefonico || "";
    self.Identificacion = options.Identificacion || "";
};
function CompraViewModel(){
    var self = this;

    self.limpiarDetallesCompra = function(){
        self.compra = ko.observable(Object(self.compraEnBlanco));
        self.producto = ko.observable(Object(self.productoEnBlanco));
    };
    self.limpiarDetallesProducto = function(){
        self.productoEnBlanco.constructor();
        $("#form-products > div > .form-group.form-inline:nth-child(2) input").val("");
    };
    self.suplidorEnBlanco = new SuplidorModel();
    self.productoEnBlanco = new ProductoModel();
    self.compraEnBlanco = new CompraModel({Suplidor: self.suplidorEnBlanco, IdProductos: []});

    self.producto = ko.observable(Object(self.productoEnBlanco));
    self.suplidor = ko.observable(Object(self.suplidorEnBlanco));
    self.compra = ko.observable(Object(self.compraEnBlanco));
    self.producto().Suplidor = self.suplidor();

    self.guardarCompra = function(){
        socket.emit("agregar suplidor", ko.toJS(compraViewModel.compra().IdSuplidor));
        self.limpiarDetallesCompra();
    };

    self.agregarProductoAlUI = function(data){
        var tr = $("<tr>"),
            nombre = $("<td>"),
            precio = $("<td>"),
            cantidad = $("<td>"),
            amountIn = $("<td>"),
            codigoProducto = $("<tdh scope='row'>");
        
        $(codigoProducto).text(data.CodigoProducto);
        $(nombre).text(data.Nombre);
        $(precio).text(data.Precio);
        $(cantidad).text(data.Cantidad+' '+data.AmountIn);

        tr.append(codigoProducto);
        tr.append(nombre);
        tr.append(precio);
        tr.append(cantidad);

        $("#lista-producto tbody").append(tr);
    };

    self.agregarProducto = function(){
        self.producto().Precio = parseInt(self.producto().Precio);
        self.producto().Cantidad = parseInt(self.producto().Cantidad);
        socket.emit('agregar producto', ko.toJS(self.producto));
        // self.compra().IdProductos.push(self.producto());
        // self.agregarProductoAlUI(self.producto());
        self.limpiarDetallesProducto();
        debugger;
    };

    // $("#agregar").on('click', self.agregarProducto);
    // $("#limpiar").on('click', self.limpiarDetallesCompra);
}; 

compraViewModel = new CompraViewModel();

document.onreadystatechange = function(newState){
    socket = io ? io() : {on:function(event, callback){}};
    
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
    socket.on('agregar producto', function(data){
        console.log(data);
        compraViewModel.compra().IdProductos.push(data);
        compraViewModel.agregarProductoAlUI(data);
        compraViewModel.limpiarDetallesProducto();
    });
    socket.on('guardar compra', function(suplidor){
        console.log('agregar suplidor', suplidor);
        compraViewModel.compra().IdSuplidor = suplidor || {};

        compraAPI.crear(ko.toJS(compraViewModel.compra), function(err, data){
            console.log('compra creada', data);
            debugger;
        });
    });

    console.log(compraViewModel);
    ko.applyBindings(compraViewModel);//, "#form-products");
}

