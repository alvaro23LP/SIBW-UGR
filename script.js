// script.js
// ELEMENTOS HTML SEGUN ID
const btnComentarios = document.getElementById("btnComentarios");
const comentarios = document.querySelector(".comentarios");
const header = document.querySelector("header");
const sidebar = document.querySelector(".sidebar"); 
const contenidoPrincipal = document.querySelector("main");
const footer = document.querySelector("footer");
const formComentario = document.getElementById("formComentario");
const btnAniadir = document.getElementById("btnAniadir");
const btnCancelarForm = document.getElementById("btnCancelarForm")
const btnEnviarForm = document.getElementById("btnEnviarForm")
const titulo = document.getElementById("ftitulo");
const nombre = document.getElementById("fnombre");
const email = document.getElementById("femail");
const comentario = document.getElementById("fcomentario");
///////////////////////////////////////////////////

// PARA MOSTRAR - ESCONDER EL PANEL DE COMENTARIOS
var comentariosVisible = false;
btnComentarios.addEventListener('click', () => {
  if (!comentariosVisible) {
    comentarios.style.right = '0'; // Muestra los comentarios
    btnComentarios.style.right = '355px'; // Mueve el botón junto con los comentarios
    comentariosVisible = true;
  } else {
    comentarios.style.right = '-350px'; // Oculta los comentarios
    btnComentarios.style.right = '5px'; // Mueve el botón de vuelta a su posición inicial
    comentariosVisible = false;
  }
  header.classList.toggle('blur');
  sidebar.classList.toggle('blur'); 
  contenidoPrincipal.classList.toggle('blur'); 
  footer.classList.toggle('blur'); 
});
///////////////////////////////////////////////////

//Mostrar formulario de comentario
btnAniadir.addEventListener("click", function() {
  formComentario.style.display = "block";
  btnAniadir.style.display = "none";
});

//Ocultar formulario de comentario
btnCancelarForm.addEventListener("click", function() {
  titulo.value = "";
  email.value = "";
  nombre.value = "";
  comentario.value = "";
  btnAniadir.style.display = "inline-block";
  formComentario.style.display = "none";
});

// Comprobar y censurar palabras prohibidas
const palabrasProhibidas = ['elefante', 'tormenta', 'platano', 'nebulosa', 'esmeralda', 'eclipse'];

comentario.addEventListener('input', function(event) {
    const texto = event.target.value.toLowerCase();
    const palabraProhibida = palabrasProhibidas.find(palabra => texto.includes(palabra.toLowerCase()));
    if (palabraProhibida) 
        event.target.value = texto.replace(new RegExp(palabraProhibida, 'gi'), '*'.repeat(palabraProhibida.length));
});

// Comprobar y censurar palabras prohibidas
titulo.addEventListener('input', function(event) {
  const texto = event.target.value.toLowerCase();
  const palabraProhibida = palabrasProhibidas.find(palabra => texto.includes(palabra.toLowerCase()));
  if (palabraProhibida)
      event.target.value = texto.replace(new RegExp(palabraProhibida, 'gi'), '*'.repeat(palabraProhibida.length));
});

//Enviar formulario de comentario + comprobaciones
btnEnviarForm.addEventListener("click", function(event) {
  event.preventDefault(); // Evitar el envío por defecto del formulario
  // Obtener los valores del formulario
  const valorTitulo = titulo.value;
  const valorNombre = nombre.value;
  const valorEmail = email.value;
  const valorComentario = comentario.value;
  
  var formValido = true;

  // Validar email 
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(valorEmail)) {
    if (!document.querySelector(".errorEmail")) {
      // Crear un elemento div para mostrar el mensaje de error
      const errorDiv2 = document.createElement("div");
      errorDiv2.textContent = "Por favor, introduce un email valido.";
      errorDiv2.classList.add("errorEmail"); // Agregar clase única al mensaje de error
      errorDiv2.style.color = "red";
      // Insertar el mensaje de error antes del input
      email.parentNode.insertBefore(errorDiv2, form);
      formValido = false;
    }
  } else {
    const errorDiv2 = document.querySelector(".errorEmail");
    if (errorDiv2) errorDiv2.remove();
    formValido = true;
  }

  // Validar campos completados
  if (valorTitulo.trim() === "" || valorNombre.trim() === "" || valorEmail.trim() === "" || valorComentario.trim() === "") {
    if (!document.querySelector(".errorMensaje")) {
      // Crear un elemento div para mostrar el mensaje de error
      const errorDiv = document.createElement("div");
      errorDiv.textContent = "Por favor, completa todos los campos.";
      errorDiv.classList.add("errorMensaje"); // Agregar clase única al mensaje de error
      errorDiv.style.color = "red";
      // Insertar el mensaje de error antes del formulario
      formComentario.parentNode.insertBefore(errorDiv, form);
      formValido = false;
    }
  } else {
    const errorDiv = document.querySelector(".errorMensaje");
    if (errorDiv) errorDiv.remove();
    formValido = true;
  }

  if(formValido){
    const nuevoComentario = document.createElement("article");

    const tituloComentario = document.createElement("h3");
    tituloComentario.textContent = valorTitulo;
    nuevoComentario.appendChild(tituloComentario);

    const cuerpoComentario = document.createElement("p");
    cuerpoComentario.textContent = valorComentario;
    nuevoComentario.appendChild(cuerpoComentario);

    const fechaHoraActual = getFechaHoraActual();
    const fechaHoraComentario = document.createElement("h4");
    fechaHoraComentario.textContent = fechaHoraActual;
    nuevoComentario.appendChild(fechaHoraComentario);

    const autorComentario = document.createElement("h4");
    autorComentario.innerHTML = `<strong>Autor:</strong> ${valorNombre}`;
    nuevoComentario.appendChild(autorComentario);

    const textoComentarios = document.getElementById("texto");
    textoComentarios.appendChild(nuevoComentario);
    
    titulo.value = "";
    email.value = "";
    nombre.value = "";
    comentario.value = "";
    btnAniadir.style.display = "inline-block";
    formComentario.style.display = "none";
  }

});

// Función para obtener la fecha y hora actual 
function getFechaHoraActual() {
  const fechaHora = new Date();
  const fecha = fechaHora.toLocaleDateString();
  const hora = fechaHora.toLocaleTimeString();
  return `${fecha} ${hora}`;
}





