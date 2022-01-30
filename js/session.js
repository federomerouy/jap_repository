function session(){
if (localStorage.getItem("profile") === null){
	window.location = "index.html";
 	}
}

session();

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {
	document.getElementById('saludo').innerHTML = "Hola, " + localStorage.getItem('profile') + "!";
	
});