// Lista principal donde se guardan todos los amigos agregados
let amigos = [];
// Lista auxiliar que se usará para saber qué amigos aún no han sido sorteados
let amigosRestantes = [];

// ===============================
// Funciones principales (Botones)
// ===============================
function agregarAmigo() {
    // Tomamos el valor ingresado en el input con id="txtAmigo"
    let nombreAmigo = document.getElementById("txtAmigo").value;

    // Validamos que el nombre no esté vacío
    if (validarNombreAmigo(nombreAmigo)) {
        // Damos formato: primera letra en mayúscula y sin espacios extra
        nombreAmigo = darFormatoAmigo(nombreAmigo);

        // Limpiamos el área de resultados (por si ya había algo mostrado)
        limpiarResultado();

        // Validamos que el nombre no esté repetido en la lista principal
        if (validarNombreUnico(nombreAmigo)) {
            // Agregamos el nombre al arreglo de amigos
            amigos.push(nombreAmigo);

            // Limpiamos el input para escribir un nuevo nombre
            document.getElementById("txtAmigo").value = "";

            // Mostramos en pantalla la lista actualizada
            mostrarEnLista();

            // Copiamos los amigos a la lista de "restantes"
            // (los que pueden salir sorteados todavía)
            amigosRestantes = [...amigos];
        } else {
            // Mensaje si el nombre ya existía en la lista
            alert("El nombre ya se encuentra registrado. Inserte un nuevo nombre.");
        }
    } else {
        // Mensaje si el campo estaba vacío
        alert("Por favor, inserte un nombre.");
    }

    // Volvemos a enfocar el cursor en el input para comodidad del usuario
    document.getElementById("txtAmigo").focus();
}

function sortearAmigo() {
    // Verificamos si ya no quedan amigos por sortear
    if (amigosRestantes.length === 0) {
        // Mostramos mensaje de que el sorteo terminó
        mostrarSorteado("Todos los amigos ya fueron sorteados. El juego se reiniciará.");

        // Reiniciamos el juego después de 2 segundos automáticamente
        setTimeout(() => {
            reiniciarJuego();
        }, 2000);
        return; // Cortamos la ejecución aquí
    }

    // Generamos un número aleatorio según el tamaño de "amigosRestantes"
    let elegido = generarNumeroRandomRestantes();

    // Tomamos al amigo que corresponde a ese número en la lista
    let amigoElegido = amigosRestantes[elegido];

    // Mostramos en pantalla quién fue sorteado
    mostrarSorteado(`El amigo secreto es ${amigoElegido}.`);

    // Eliminamos al amigo sorteado de la lista de restantes para que no vuelva a salir
    amigosRestantes.splice(elegido, 1);
}
// ===============================
// Fin funciones principales
// ===============================


// ===============================
// Funciones de validación
// ===============================

// Da formato a un nombre: elimina espacios y pone la primera letra en mayúscula
function darFormatoAmigo(amigo) {
    amigo = amigo.trim(); // eliminamos espacios extra al inicio y al final
    return amigo[0].toUpperCase() + amigo.substring(1); // primera letra mayúscula + resto igual
}

// Verifica que el nombre no esté vacío (solo espacios también cuenta como vacío)
function validarNombreAmigo(amigo) {
    return amigo.trim() !== "";
}

// Verifica que el nombre no esté ya registrado en la lista principal
function validarNombreUnico(amigo) {
    return !amigos.includes(amigo);
}
// ===============================
// Fin funciones de validación
// ===============================


// ===============================
// Funciones secundarias de apoyo
// ===============================

// Genera un número aleatorio entre 0 y la cantidad de amigos restantes
function generarNumeroRandomRestantes() {
    return Math.floor(Math.random() * amigosRestantes.length);
}

// Muestra todos los amigos agregados en la lista HTML con id="listaAmigos"
function mostrarEnLista() {
    let lista = document.getElementById("listaAmigos");
    lista.innerHTML = ""; // limpiamos el contenido previo
    // Recorremos el array de amigos y los agregamos como elementos <li>
    amigos.forEach(elem => lista.innerHTML += `<li>${elem}</li>`);
}

// Muestra el resultado del sorteo en la lista HTML con id="resultado"
function mostrarSorteado(texto) {
    let lista = document.getElementById("resultado");
    lista.innerHTML = `<li>${texto}</li>`; // remplazamos cualquier contenido anterior
}

// Limpia el área de resultado (id="resultado")
function limpiarResultado() {
    document.getElementById("resultado").innerHTML = "";
}

// Reinicia todo el juego:
// - Vacía las listas
// - Limpia la pantalla
// - Resetea el input
function reiniciarJuego() {
    amigos = [];
    amigosRestantes = [];
    document.getElementById("listaAmigos").innerHTML = "";
    limpiarResultado();
    document.getElementById("txtAmigo").value = "";
    document.getElementById("txtAmigo").focus();
}
// ===============================
// Fin funciones secundarias
// ===============================
