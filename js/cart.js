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
