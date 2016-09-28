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
    self.Vendedor = ko.observable(options.Vendedor || {});
    self.ProductosId = ko.observableArray(options.ProductosId || [])
};
function ProductoModel(options){
    var self = this;
    options = options || {};
    self.Nombre = options.Nombre || '';
    self.CodigoProducto = options.CodigoProducto || '';
    self.Precio = parseInt(options.Precio || 1);
    self.Cantidad = parseInt(options.Cantidad || 1);
    self.AmountIn = "Unidades";
    self.AmountInEnum = ["Unidades", "Libras"];

};
function VendedorModel(options){
    var self = this;
    options = options || {};
    self.Nombre = options.Nombre || '';
    self.Apellido = options.Apellido || '';
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
    self.vendedorEnBlanco = new VendedorModel();
    self.productoEnBlanco = new ProductoModel();
    self.compraEnBlanco = new CompraModel({Vendedor:self.vendedorEnBlanco, ProductosId: []});

    self.producto = ko.observable(Object(self.productoEnBlanco));
    self.compra = ko.observable(Object(self.compraEnBlanco));

    self.guardarCompra = function(){
        
        compraAPI.crear(ko.toJS(self.compra), function(err, data){
            console.log(data);
            debugger;
        });
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

        self.compra().ProductosId.push(self.producto());
        self.agregarProductoAlUI(self.producto());
        self.limpiarDetallesProducto();
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
    console.log(compraViewModel);
    ko.applyBindings(compraViewModel);//, "#form-products");
}

