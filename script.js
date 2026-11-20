const desafios = [
    {
        id: 1,
        titulo: 'Par o impar',
        categoria: 'Algoritmos',
        dificultad: 'Fácil',
        puntos: 50,
        descripcion: 'Solicita un número al usuario y muestra en pantalla si es par o impar.',
        etiquetas: ['Python', 'Condicionales', 'Input'], 
        imagen: 'algoritmos.png',
        resuelto: false, 
        favorito: false
    },
    {
        id: 2,
        titulo: 'Búsqueda binaria',
        categoria: 'Algoritmos',
        dificultad: 'Difícil',
        puntos: 250,
        descripcion: 'Desarrolla una búsqueda binaria en un arreglo ordenado y devuelve la posición del número buscado.',
        etiquetas: ['Java', 'Arreglos', 'Búsqueda'],
        imagen: 'algoritmos.png',
        resuelto: false,
        favorito: false
    },
    {
        id: 3,
        titulo: 'Seleccionar clientes',
        categoria: 'Bases de Datos',
        dificultad: 'Fácil',
        puntos: 60,
        descripcion: 'Escribe una consulta que muestre el nombre y el correo de todos los clientes registrados.',
        etiquetas: ['SQL', 'SELECT', 'Tablas'],
        imagen: 'bd.png',
        resuelto: false,
        favorito: false
    },
    {
        id: 4,
        titulo: 'Contar pedidos',
        categoria: 'Bases de Datos',
        dificultad: 'Medio',
        puntos: 120,
        descripcion: 'Usa GROUP BY y COUNT para saber cuántos pedidos hizo cada cliente en la tienda.',
        etiquetas: ['SQL', 'GROUP BY', 'COUNT'],
        imagen: 'bd.png',
        resuelto: false,
        favorito: false
    },
    {
        id: 5,
        titulo: 'Tarjeta de perfil',
        categoria: 'Desarrollo Web',
        dificultad: 'Fácil',
        puntos: 60,
        descripcion: 'Diseña una tarjeta de perfil con foto, nombre y descripción usando HTML y CSS.',
        etiquetas: ['HTML', 'CSS', 'Diseño'],
        imagen: 'web.png',
        resuelto: false, 
        favorito: false
    },
    {
        id: 6,
        titulo: 'Lista de tareas',
        categoria: 'Desarrollo Web',
        dificultad: 'Medio',
        puntos: 140,
        descripcion: 'Crea una lista de tareas con JavaScript que permita agregar y eliminar elementos.',
        etiquetas: ['JavaScript', 'DOM', 'Eventos'], 
        imagen: 'web.png', 
        resuelto: false, 
        favorito: false
    },
    {
        id: 7,
        titulo: 'Contraseña válida',
        categoria: 'Ciberseguridad',
        dificultad: 'Fácil',
        puntos: 70,
        descripcion: 'Programa e implementa una función que compruebe que una contraseña tenga mínimo 8 caracteres, una mayúscula y un número.',
        etiquetas: ['Python', 'Validación', 'Strings'], 
        imagen: 'ciberseg.png', 
        resuelto: false, 
        favorito: false
    },
    {
        id: 8,
        titulo: 'Cifrado de texto',
        categoria: 'Ciberseguridad',
        dificultad: 'Medio',
        puntos: 130,
        descripcion: 'Implementa una función que cifre y descifre un texto desplazando cada letra N posiciones.',
        etiquetas: ['Java', 'Criptografía', 'Strings'], 
        imagen: 'ciberseg.png', 
        resuelto: false, 
        favorito: false
    },
]

let categoriaActual = 'Todos'
let dificultadActual = 'Todas'

const pantallaCarga = document.getElementById('pantallaCarga')
const contenedor = document.getElementById('contenedorDesafios')
const numResueltos = document.getElementById('numResueltos')
const numPuntos = document.getElementById('numPuntos')
const botonesDificultad = document.querySelectorAll('#navDificultad button')

function crearCard(d){
    let etiquetasHTML = ''
    d.etiquetas.forEach(e => {
        etiquetasHTML += `<span>${e}</span>`
    })

    let claseDificultad = ''
    if (d.dificultad === 'Fácil'){
        claseDificultad = 'facil'
    } else if (d.dificultad === 'Medio'){
        claseDificultad = 'medio'
    } else {
        claseDificultad = 'dificil'
    }

    let claseCard = 'cardDesafio'
    let textoBoton = 'Completar'
    let atributoBoton = ''
    if (d.resuelto){
        claseCard += ' resuelto'
        textoBoton = '✓ Completado'
        atributoBoton = 'disabled'
    }

    let claseFavorito = 'btnFavorito'
    if (d.favorito){
        claseFavorito += ' activo'
    }

    return `
        <div class="${claseCard}" data-id="${d.id}">
            <div class="cardImagen">
                <img src="img/${d.imagen}" alt="${d.categoria}">
                <span class="categoria">${d.categoria}</span>
            </div>

            <div class="cardCuerpo">
                <div class="cardTitulo">
                    <h2>${d.titulo}</h2>
                    <p class="puntos">${d.puntos} pts</p>
                </div>

                <span class="dificultad ${claseDificultad}">${d.dificultad}</span>

                <p class="descripcion">${d.descripcion}</p>

                <div class="tags">${etiquetasHTML}</div>

                <div class="cardBotones">
                    <button class="btnResolver" onclick="resolverDesafio(${d.id})" ${atributoBoton}>${textoBoton}</button>
                    <button class="${claseFavorito}" onclick="alternarFavorito(${d.id})">★</button>
                </div>
            </div>
        </div>
    `
}

function mostrarDesafios(){
    let html = ''

    desafios.forEach(d => {
        if ((categoriaActual === 'Todos' || d.categoria === categoriaActual) && (dificultadActual === 'Todas' || d.dificultad === dificultadActual)){
            html += crearCard(d)
        }
    })

    if (html === ''){
        html = '<p class="vacio">No hay desafíos con esos filtros.</p>'
    }

    contenedor.innerHTML = html
}

function actualizarHeader(){
    let resueltos = 0
    let puntos = 0

    desafios.forEach(d => {
        if (d.resuelto){
            resueltos += 1
            puntos += d.puntos
        }
    })

    numResueltos.textContent = `${resueltos} / 8`
    numPuntos.textContent = puntos
}

function resolverDesafio(id){
    const desafio = desafios.find(d => d.id === id)
    desafio.resuelto = true

    const card = document.querySelector(`.cardDesafio[data-id="${id}"]`)
    const boton = card.querySelector('.btnResolver')

    card.classList.add('resuelto')
    boton.textContent = '✓ Completado'
    boton.disabled = true
    boton.classList.add('completado')

    actualizarHeader()
}

function alternarFavorito(id){
    const desafio = desafios.find(d => d.id === id)
    desafio.favorito = !desafio.favorito

    const card = document.querySelector(`.cardDesafio[data-id="${id}"]`)
    card.querySelector('.btnFavorito').classList.toggle('activo')
}

function filtrarCategoria(nombre, boton){
    categoriaActual = nombre

    const todos = document.querySelectorAll('#navCategoria button, #navMovil button')
    todos.forEach(b => {
        b.classList.remove('activo')
    })
    boton.classList.add('activo')

    mostrarDesafios()
}

function filtrarDificultad(boton){
    dificultadActual = boton.textContent

    botonesDificultad.forEach(b => {
        b.classList.remove('activo')
    })
    boton.classList.add('activo')

    mostrarDesafios()
}

botonesDificultad.forEach(boton => {
    boton.addEventListener('click', () => {
        filtrarDificultad(boton)
    })
})

actualizarHeader()

setTimeout(() => {
    pantallaCarga.classList.add('oculta')
    mostrarDesafios()
}, 1500)