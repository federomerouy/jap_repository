//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){
  getJSONData(CART_INFO_URL).then(function(resultObj){
    if (resultObj.status === "ok") {

      array = resultObj.data;
      mostrarCarrito(array.articles);
    }
    precioTotal();
  })
});

var array = [];
var articles = [];

function mostrarCarrito(array) {

  let htmlContentToAppend = "";

    for (let i=0;i<array.length;i++) {
      let articles = array[i];

      if(articles.currency == "USD") {
        subTotal = (articles.unitCost * articles.count * 40)
       
      htmlContentToAppend += `
        <tr>
          <td><img src="${articles.src}" alt="" class="rounded-full"></td>
          <td>${articles.name}</td>
          <td>UYU$<span class="precio">${subTotal}</span></td>
          <td><input type="number" class="quantity" min="1" value="${articles.count}" onchange="precioTotal()" onchange="items()" onchange="porcentaje()"></td>
          <td>$<span id="product${i}">${subTotal}</span></td>
        </tr>
      ` 
    } else {
      subTotal = (articles.unitCost * articles.count)

        htmlContentToAppend += `
        <tr>
          <td><img src="${articles.src}" alt="" class="rounded-full"></td>
          <td>${articles.name}</td>
          <td>${articles.currency}<span class="precio"> ${articles.unitCost}</span></td>
          <td><input type="number" class="quantity" min="1" value="${articles.count}" onchange="precioTotal()" onchange="items() onchange="porcentaje()"></td>
          <td>$<span id="product${i}">${subTotal}</span></td>
        </tr>
      ` 
    }
  document.getElementById("carrito").innerHTML = htmlContentToAppend;
  }
}



function precioTotal() {
  let precio = document.getElementsByClassName("precio");
  let cantidad = document.getElementsByTagName("input");
  let subtotal = 0;

  for (let i=0;i<precio.length;i++) {
    subtotal += parseFloat(precio[i].innerHTML) * parseFloat(cantidad[i].value);
    
    document.getElementById("product"+i).innerHTML = parseFloat(precio[i].innerHTML) * parseFloat(cantidad[i].value);
  }
  document.getElementById("subtotal").innerHTML = subtotal;
  document.getElementById("total").innerHTML = subtotal + porcentaje();
}

function items() {
  let cantidad = document.getElementsByTagName("input");

  document.getElementById("Cantidad").innerHTML = cantidad;
}

function porcentaje() {
   let resultado = 0;
  
   let value = parseInt(document.getElementById('porcentajeEnvio').value);
  
   resultado = (subTotal * value) / 100;	
     document.getElementById("costoEnvio").innerHTML = resultado;
  
   return resultado;
}

var mymap = L.map('mapid').setView([-34.896153586856826, -56.169921951022246], 13);
    
    L.tileLayer('https://api.maptiler.com/maps/streets/{z}/{x}/{y}.png?key=4PxZstjsc8r0QupGuz5o', {
            attribution: '<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>'
        }).addTo(mymap);

        L.marker([-34.896153586856826, -56.169921951022246]).addTo(mymap);

function cardModal() {
  let creditCard = document.getElementById('cardNumber').value;
  let cvvCard = document.getElementById('CVV').value;
  let bankCard = document.getElementById('accountNumber').value;
  let htmlContentToAppend = "";
  if((creditCard && cvvCard) || bankCard) {
    htmlContentToAppend += `<div class="modal-dialog" role="document">  
        <div class="modal-content">
          <div>
          <div class="modal-header">
            <h4 class="modal-title" id="sucessfulBuyLabel">Su compra ha sido un éxito!</h4>
          </div>
          <div>
            <label><b>Su pedido ya está en camino.</b></label>
          </div>
        </div>
          <div class="modal-footer">
            <btn type="button" class="btn btn-secondary" data-dismiss="modal"><b>CERRAR</b></btn>
          </div>
        </div>
      </div>`
  } else {
    htmlContentToAppend += `<div class="modal-dialog" id="modal-error" role="document">  
        <div class="modal-content">
          <div>
          <div class="modal-header">
          <div>
            <h4 class="modal-title" id="sucessfulBuyLabel">ERROR: FALTAN DATOS</h4>
          <div>
          </br>
            <label><b>Debe llenar los campos para completar su pedido.</b></label>
          </div>
          </div>
          </div>
        </div>
          <div class="modal-footer">
            <label>Haga clic en cualquier lado para regresar.</label>
            <!--<button type="button" class="btn btn-secondary" onclick="$('#modal-error').modal('hide');"><b>VOLVER</b></button>-->
          </div>
        </div>
      </div>`
  }
  document.getElementById("modal-innerHTML").innerHTML = htmlContentToAppend;
}        
let btnComprar = document.getElementById("buy-button");

btnComprar.addEventListener("click", function(e){
  cardModal()
});