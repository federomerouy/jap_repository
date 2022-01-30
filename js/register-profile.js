/*
function name_profile(){
  var name = document.getElementById('u_nombre').value;
  localStorage.setItem('nameProfile', name);
}

function apellido_profile(){
  var apellido = document.getElementById('u_apellido').value;
  localStorage.setItem('apellidoProfile', apellido);
}

function edad_profile(){
  var edad = document.getElementById('u_edad').value;
  localStorage.setItem('edadProfile', edad);
}

function email_profile(){
  var email = document.getElementById('u_correo').value;
  localStorage.setItem('emailProfile', email);
}

function telefono_profile(){
  var telefono = document.getElementById('u_telefono').value;
  localStorage.setItem('telefonoProfile', telefono);
}

function foto_profile(){
  var fotoPerfil = document.getElementById('foto_perfil').value;
  localStorage.setItem('fotoProfile', fotoPerfil);
}
*/

//var query = undefined;

//Guarda los datos que extrae del formulario de registro
function dataProfile(){
  var name = document.getElementById('input_nombre').value;
  var apellido = document.getElementById('input_apellido').value;
  var edad = document.getElementById('input_edad').value;
  var email = document.getElementById('input_correo').value;
  var telefono = document.getElementById('input_telefono').value;
  var fotoPerfil = document.getElementById('input_imagen').src;

  let data = {'name': name, 'apellido': apellido, 'edad':  edad, 'email': email, 'telefono': telefono, 'fotoPerfil':  fotoPerfil}
  localStorage.setItem('infoProfile', JSON.stringify(data));

  //console.log(data)
}

function renderData(){
  // Parsea los datos.
  let parseObj = JSON.parse(localStorage.getItem("infoProfile"));
  //console.log("");
  
  var name = document.getElementById('input_nombre');
  var apellido = document.getElementById('input_apellido');
  var edad = document.getElementById('input_edad');
  var email = document.getElementById('input_correo');
  var telefono = document.getElementById('input_telefono');
  var fotoPerfil = document.getElementById('input_imagen');

  if(parseObj != {}){
  name.value = parseObj.name;
  apellido.value = parseObj.apellido;
  edad.value = parseObj.edad;
  email.value = parseObj.email;
  telefono.value = parseObj.telefono;
  fotoPerfil.src = parseObj.fotoPerfil;
  } 

  console.log("renderData");
  
}
renderData();

function validateEmail(email) {
  const corelec = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;
    //Se muestra un texto a modo de ejemplo
    if (CORELEC.test(campo.value)) {
      valido.innerText = "El eMail ingresado es VÁLIDO";
    } else {
      valido.innerText = "El eMail ingresado NO ES VÁLIDO";
    }
}

function previewFile() {
  let preview = document.getElementById("input_imagen");
  let file = document.querySelector("input[type=file]").files[0];
  let reader = new FileReader();

  reader.onloadend = function () {
    preview.src = reader.result;
    //document.getElementById("foto_perfil").innerHTML = reader.result;
  };

  if (file) {
    reader.readAsDataURL(file);
  } else {
    preview.src = "";
  }
  //console.log(preview.src)
}




