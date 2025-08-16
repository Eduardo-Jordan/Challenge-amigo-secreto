let amigos = [];
let amigosRestantes = [];

// Funciones de botones INICIO
function agregarAmigo() {
    let nombreAmigo = document.getElementById("txtAmigo").value;
    if(validarNombreAmigo(nombreAmigo)) {
        nombreAmigo = darFormatoAmigo(nombreAmigo);
        limpiarResultado();
        if(validarNombreUnico(nombreAmigo)) {
            amigos.push(nombreAmigo);
            document.getElementById("txtAmigo").value = "";
            mostrarEnLista();
            // Actualizamos la lista de amigos restantes
            amigosRestantes = [...amigos];
        } else alert("El nombre ya se encuentra registrado. Inserte un nuevo nombre.");
    } else alert("Por favor, inserte un nombre.");
    document.getElementById("txtAmigo").focus();
}

function sortearAmigo() {
    if(amigosRestantes.length === 0) {
        // Mostrar mensaje de fin de sorteo
        mostrarSorteado("Todos los amigos ya fueron sorteados. El juego se reiniciará.");
        // Reiniciar el juego después de 2 segundos
        setTimeout(() => {
            reiniciarJuego();
        }, 2000);
        return;
    }

    let elegido = generarNumeroRandomRestantes();
    let amigoElegido = amigosRestantes[elegido];
    mostrarSorteado(`El amigo secreto es ${amigoElegido}.`);

    // Eliminamos al amigo sorteado de la lista de restantes
    amigosRestantes.splice(elegido, 1);
}
// Funciones de botones FIN

// Funciones de validación INICIO
function darFormatoAmigo(amigo) {
    amigo = amigo.trim();
    return amigo[0].toUpperCase() + amigo.substring(1);
}

function validarNombreAmigo(amigo) {
    return amigo.trim() !== "";
}

function validarNombreUnico(amigo) {
    return !amigos.includes(amigo);
}
// Funciones de validación FIN

// Funciones secundarias INICIO
function generarNumeroRandomRestantes() {
    return Math.floor(Math.random() * amigosRestantes.length);
}

function mostrarEnLista() {
    let lista = document.getElementById("listaAmigos");
    lista.innerHTML = "";
    amigos.forEach(elem => lista.innerHTML += `<li>${elem}</li>`);
}

function mostrarSorteado(texto) {
    let lista = document.getElementById("resultado");
    lista.innerHTML = `<li>${texto}</li>`;
}

function limpiarResultado() {
    document.getElementById("resultado").innerHTML = "";
}

function reiniciarJuego() {
    amigos = [];
    amigosRestantes = [];
    document.getElementById("listaAmigos").innerHTML = "";
    limpiarResultado();
    document.getElementById("txtAmigo").value = "";
    document.getElementById("txtAmigo").focus();
}
// Funciones secundarias FIN
