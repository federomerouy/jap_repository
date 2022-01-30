var product = {};
var productAutos = {};

function showImagesGallery(array){

    let htmlContentToAppend = "";

    for(let i = 0; i < array.length; i++){
        let imageSrc = array[i];

        if(i == 0){
        htmlContentToAppend += `
        <div class="carousel-item active">
            <img src="${imageSrc}" class="d-block w-100" alt="...">
            <div class="carousel-caption d-none d-md-block">
            </div>
        </div>
        `
        continue;
    }
        htmlContentToAppend += `
        <div class="carousel-item">
            <img src="${imageSrc}" class="d-block w-100" alt="...">
            <div class="carousel-caption d-none d-md-block">
            </div>
        </div>
        `

        document.getElementById("productImagesGallery").innerHTML = htmlContentToAppend;
    }
}

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){
getJSONData(PRODUCT_INFO_URL).then(function(resultObj){
        if (resultObj.status === "ok")
        {
            product = resultObj.data;

            let productNameHTML  = document.getElementById("productName");
            let productDescriptionHTML = document.getElementById("productDescription");
            let productCostHTML = document.getElementById("productCost");
            let productCategoryHTML = document.getElementById("productCategory");
        
            productNameHTML.innerHTML = product.name;
            productDescriptionHTML.innerHTML = product.description;
            productCostHTML.innerHTML = product.currency + " " + product.cost;
            productCategoryHTML.innerHTML = product.category;
            
            //Muestro las imagenes en forma de galería
            showImagesGallery(product.images);


        }
        getJSONData(PRODUCTS_URL).then(function(resultObj){
        if (resultObj.status === "ok")
        {
            productAutos = resultObj.data;
            
            //Llama a la función relatedProducts
            relatedProducts(product.relatedProducts);

        }
    });
    });
});

function relatedProducts(x){
    
    //Guarda datos sobre autos recopilados de JSON.
    let saveAutos = "";

    //Guarda datos de data-target y slide.
    let saveSlide = "";

    //Contador i que recorre las posiciones de cada producto en lista.
    for(let i = 0; i < x.length ; i++){
        let autos = productAutos[x[i]];
        //Si i está en la posición 0:
        if(i == 0){
            //Mostrar imágenes y datos de autos.
            saveAutos+=`<div class="carousel-item active">
      <img src="${autos.imgSrc}" class="d-block w-100" alt="...">
      <div class="carousel-caption d-none d-md-block">
        <h3></br>${autos.name}</h3>
        <p>${autos.description}</p>
        <h5>${autos.currency} ${autos.cost}</h5>
      </div>
    </div>`

    //Muestra carrusel de productos.
    saveSlide+=`<li data-target="#carouselExampleCaptions" data-slide-to="${i}" class="active"></li>`
        continue;
        }
        saveAutos+=`<div class="carousel-item">
      <img src="${autos.imgSrc}" class="d-block w-100" alt="...">
      <div class="carousel-caption d-none d-md-block">
        <h3></br>${autos.name}</h3>
        <p>${autos.description}</p>
        <h5>${autos.currency} ${autos.cost}</h5>
      </div>
    </div>`
    
    //Se ubican los elementos del carrusel en la ubicación del contador i.
    saveSlide+=`<li data-target="#carouselExampleCaptions" data-slide-to="${i}"></li>`

    document.getElementById("relatedImg").innerHTML = saveAutos;
    document.getElementById("relatedData").innerHTML = saveSlide;

    }
}


var comment = [];

document.addEventListener("DOMContentLoaded", function(e){
getJSONData(PRODUCT_INFO_COMMENTS_URL).then(function(resultObj){
        if (resultObj.status === "ok")
        {
        	let htmlContentToAppend = "";

            currentCommentArray = resultObj.data;
            for(let index = 0; index < currentCommentArray.length; index++){
            	comment = currentCommentArray[index];

            	htmlContentToAppend += `
            	<a href="product-info.html" class="list-group-item list-group-item-action">
                <div class="row">
                    <div class="col-m3">
                    	<div class="imgcontainer">
                            <img src="img/user.png" alt="Avatar" class="avatar"> <span class="mb-1">`+ comment.user +`</span>
                        </div>
                    	<div>
                    		<h6 class="mb-1">`+ comment.dateTime +`</h6>
                    	</div>
                    	<div>
                    		<h5 class="mb-1 text-warning"> ${estrellas(comment.score)} </h5>
                    	</div>
                    	<div>
                    		<p class="mb-1">`+ comment.description +`</p>
                    	</div>
                    </div>
                </div>
            </a>
            `
            document.getElementById("comentarios").innerHTML = htmlContentToAppend;
                        
            }
        }
    });
});

function estrellas(score) {
    let iconos = ""

    for (let i=1; i<=5; i++){
        if(i<=score){
            iconos += '<i class="fas fa-star"></i>';
        } else {
            iconos += '<i class="far fa-star"></i>';
        }
    }
    return iconos;
}


            /*
            let commentScoreHTML  = document.getElementById("commentScore");
            let commentDescriptionHTML = document.getElementById("commentDescription");
            let commentUserHTML = document.getElementById("commentUser");
            let commentDateTimeHTML = document.getElementById("commentDateTime");
        
            commentScoreHTML.innerHTML = comment.score;
            commentDescriptionHTML.innerHTML = comment.description;
            commentUserHTML.innerHTML = comment.user;
            commentDateTimeHTML.innerHTML = comment.dateTime;
            */

/*
function showCommentList(array){

    let htmlContentToAppend = "";

    comment = resultObj.data;
            for(let index = 0; index < comment.length; index++){
            	const client = array[index];

            let commentScoreHTML  = document.getElementById("commentScore");
            let commentDescriptionHTML = document.getElementById("commentDescription");
            let commentUserHTML = document.getElementById("commentUser");
            let commentDateTimeHTML = document.getElementById("commentDateTime");
        
            commentScoreHTML.innerHTML = comment[0].score;
            commentDescriptionHTML.innerHTML = comment[0].description;
            commentUserHTML.innerHTML = comment[0].user;
            commentDateTimeHTML.innerHTML = comment[0].dateTime;

        document.getElementById("comment").innerHTML = htmlContentToAppend;
    }
}
*/