//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.

function callme(){
	var name = document.getElementById('uname').value;
	localStorage.setItem('profile', name);
}

function onSignin(googleUser){
	var profile = googleUser.getBasicProfile();
	console.log('ID: ' + profile.getId());
	console.log('Name: ' + profile.getName());
	console.log('Image URL: ' + profile.getImageUrl());
	console.log('Email: ' + profile.getEmail());
	var id_token = googleUser.getAuthResponse().id_token;
	console.log(id_token);
}

function signOut(){
		localStorage.clear();
location.href = "index.html";
}

document.addEventListener("DOMContentLoaded", function(e){

});