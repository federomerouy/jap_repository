// Muestra los datos de perfil.
function renderNewProfile(){
  	// Parsea los datos.
  	let parseObj = JSON.parse(localStorage.getItem("infoProfile"));
  	//console.log("");
  	//let {name, apellido, edad, email, telefono, fotoPerfil} = parseObj;

  	//console.log(parseObj)
  	var name = document.getElementById('nombre_html');
  	var apellido = document.getElementById('apellido_html');
  	var edad = document.getElementById('edad_html');
  	var email = document.getElementById('correo_html');
  	var telefono = document.getElementById('telefono_html');
  	var fotoPerfil = document.getElementById('foto_html');

	name.textContent = parseObj.name;
	apellido.textContent = parseObj.apellido;
	edad.textContent = parseObj.edad;
	email.textContent = parseObj.email;
	telefono.textContent = parseObj.telefono;
	fotoPerfil.src = parseObj.fotoPerfil;
}

//renderNewProfile();

//console.log("hola");

/*
function saludar(){
	console.log("hola");
}
*/
renderNewProfile();

document.addEventListener("DOMContentLoader", function(e){
	
});
/*
  //Pega en HTML
  let htmlContentToAppend = "";
  //Parsea los datos de infoProfile
  let query = JSON.parse(localStorage.getItem("infoProfile"));
  alert(query.name);
    
    if (query != undefined){
      alert("Encontré dato!");

        htmlContentToAppend += `
        <label>${query.fotoPerfil}</label> <br>
        <label>Nombre:</label> <div>${query.name}</div> <div>${query.apellido}</div> </br>
        <div>Edad:</div> <div>${query.edad}</div> </br>
        <div>Correo electrónico:</div> <div>${query.email}</div> </br>
        <div>Teléfono de contacto:</div> <div>${query.telefono}</div> </br>
        `
    } else {
      alert("No encontré nada.");

      htmlContentToAppend += `
        <label><src="img/avatar.png"></label> <br>
        <label>Nombre:</label> <label>NONE</label></br>
        <label>Edad:</label> <label>NONE</label> </br>
        <label>Correo electrónico:</label> <label>NONE</label> </br>
        <label>Teléfono de contacto:</label> <label>NONE</label> </br>
        `
    }
    document.getElementById("infoUsuario").innerHTML = htmlContentToAppend;
});
*/


