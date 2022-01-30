//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.

document.addEventListener("DOMContentLoaded", function (e) {

});
const ORDER_ASC_BY_NAME = "AZ";
const ORDER_DESC_BY_NAME = "ZA";
const ORDER_ASC_BY_PROD_COUNT = "Costo";
const ORDER_DESC_BY_PROD_COUNT = "Cost.";
const ORDER_ASC_BY_SOLD = "Vendidos";
const ORDER_DESC_BY_SOLD = "Sold";
var currentCategoriesArray = [];
var currentSortCriteria = undefined;
var minCount = undefined;
var maxCount = undefined;
var query = undefined;

function sortCategories(criteria, array){
    let result = [];
    if (criteria === ORDER_ASC_BY_NAME)
    {
        result = array.sort(function(a, b) {
            if ( a.name < b.name ){ return -1; }
            if ( a.name > b.name ){ return 1; }
            return 0;
        });
    }else if (criteria === ORDER_DESC_BY_NAME){
        result = array.sort(function(a, b) {
            if ( a.name > b.name ){ return -1; }
            if ( a.name < b.name ){ return 1; }
            return 0;
        });
    }else if (criteria === ORDER_ASC_BY_PROD_COUNT){
        result = array.sort(function(a, b) {
            let aCount = parseInt(a.cost);
            let bCount = parseInt(b.cost);

            if ( aCount > bCount ){ return -1; }
            if ( aCount < bCount ){ return 1; }
            return 0;
        });
    }else if (criteria === ORDER_DESC_BY_PROD_COUNT){
        result = array.sort(function(a, b) {
            let aCount = parseInt(a.cost);
            let bCount = parseInt(b.cost);

            if ( aCount < bCount ){ return -1; }
            if ( aCount > bCount ){ return 1; }
            return 0;
        });
    }else if (criteria === ORDER_ASC_BY_SOLD){
        result = array.sort(function(a, b) {
            let aCount = parseInt(a.cost);
            let bCount = parseInt(b.cost);

            if ( a.soldCount > b.soldCount ){ return -1; }
            if ( a.soldCount < b.soldCount ){ return 1; }
            return 0;
        });
    }else if (criteria === ORDER_DESC_BY_SOLD){
        result = array.sort(function(a, b) {
            let aCount = parseInt(a.cost);
            let bCount = parseInt(b.cost);

            if ( a.soldCount < b.soldCount ){ return -1; }
            if ( a.soldCount > b.soldCount ){ return 1; }
            return 0;
        });
    }

    return result;
}

function showCategoriesList(){

    let htmlContentToAppend = "";
    for(let i = 0; i < currentCategoriesArray.length; i++){
        let category = currentCategoriesArray[i];

        if (((minCount == undefined) || (minCount != undefined && parseInt(category.cost) >= minCount)) &&
            ((maxCount == undefined) || (maxCount != undefined && parseInt(category.cost) <= maxCount))){

        if (query == undefined || 
            category.name.toLowerCase().indexOf(query) != -1 || 
            category.description.toLowerCase().indexOf(query) != -1) {

            htmlContentToAppend += `
            <div class="col-md-4 col-lg-3">
            <a href="product-info.html" class="card mb-4 shadow-sm custom-card">
            
                <img src="${category.imgSrc}" class="card-img-top" alt="${category.description}">
                <div class="card-body">
                    <h3 class="mb-3">${category.name}</h3>
                        <h6 class="card-subtitle mb-2 text-muted">${category.currency} ${category.cost}</h6>
                            <p class="card-text">
                                ${category.description}
                             </p>
                </div>
            </a>
            </div>
            `
        }

        document.getElementById("cat-list-container").innerHTML = htmlContentToAppend;

        }
    }
}

function sortAndShowCategories(sortCriteria, categoriesArray){
    currentSortCriteria = sortCriteria;

    if(categoriesArray != undefined){
        currentCategoriesArray = categoriesArray;
    }

    currentCategoriesArray = sortCategories(currentSortCriteria, currentCategoriesArray);

    //Muestro las categorías ordenadas
    showCategoriesList();
}
  
//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(PRODUCTS_URL).then(function(resultObj){
        if (resultObj.status === "ok"){
            sortAndShowCategories(ORDER_ASC_BY_NAME, resultObj.data);
        }
    });

    /*
    window.addEventListener('load', function(e){
        document.getElementById("searcherPro").addEventListener("input", () => { 
            if(document.getElementById("searcherPro").value.toLowerCase() >= 1) {
                fetch(`PRODUCTS_URL=${query.getElementById("searcherPro").value}`, {method: 'get'})
                .then(resultObj => resultObj.data())
                .then(query => {document.getElementById("searcherPro"),innerHTML = query})
            }
            showCategoriesList(); 
        });
    }
    */

    // Buscador en tiempo real
    /*
    document.getElementById("searcherPro").addEventListener("input", function(e){ 
        query = document.getElementById("searcherPro").value.toLowerCase(); 
        showCategoriesList(); 
    });
    */
    
    document.getElementById("sortAsc").addEventListener("click", function(){
        sortAndShowCategories(ORDER_ASC_BY_NAME);
    });

    document.getElementById("sortDesc").addEventListener("click", function(){
        sortAndShowCategories(ORDER_DESC_BY_NAME);
    });

    document.getElementById("sortByCount").addEventListener("click", function(){
        sortAndShowCategories(ORDER_ASC_BY_PROD_COUNT);
    });


    document.getElementById("sortByCounts").addEventListener("click", function(){
        sortAndShowCategories(ORDER_DESC_BY_PROD_COUNT);
    });

    document.getElementById("sortBySold").addEventListener("click", function(){
        sortAndShowCategories(ORDER_ASC_BY_SOLD);
    });

    document.getElementById("sortBySolds").addEventListener("click", function(){
        sortAndShowCategories(ORDER_DESC_BY_SOLD);
    });


    document.getElementById("clearRangeFilter").addEventListener("click", function(){
        document.getElementById("rangeFilterCountMin").value = "";
        document.getElementById("rangeFilterCountMax").value = "";

        minCount = undefined;
        maxCount = undefined;

        showCategoriesList();
    });

    document.getElementById("rangeFilterCount").addEventListener("click", function(){
        //Obtengo el mínimo y máximo de los intervalos para filtrar por cantidad
        //de productos por categoría.
        minCount = document.getElementById("rangeFilterCountMin").value;
        maxCount = document.getElementById("rangeFilterCountMax").value;

        if ((minCount != undefined) && (minCount != "") && (parseInt(minCount)) >= 0){
            minCount = parseInt(minCount);
        }
        else{
            minCount = undefined;
        }

        if ((maxCount != undefined) && (maxCount != "") && (parseInt(maxCount)) >= 0){
            maxCount = parseInt(maxCount);
        }
        else{
            maxCount = undefined;
        }

        showCategoriesList();
    });
});