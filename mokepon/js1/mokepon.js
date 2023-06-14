const sectionSelectAtaque = document.getElementById('seleccionar-ataque')
const sectionReiniciar = document.getElementById('reiniciar')
const botonSelectMokepon = document.getElementById('boton-select')
const botonReiniciar = document.getElementById('boton-reiniciar')

const sectionSelectMokepon = document.getElementById('seleccionar-mokepon')
const spanMokeponJugador = document.getElementById('mokepon-jugador')
const spanMokeponEnemigo = document.getElementById('mokepon-enemigo')

const spanVidasJugador = document.getElementById('vidas-jugador')
const spanVidasEnemigo = document.getElementById('vidas-enemigo')

const sectionMensajes = document.getElementById('resultado')
const ataquesJugador = document.getElementById('ataques-del-jugador')
const ataquesEnemigo = document.getElementById('ataques-del-enemigo')
const contenedorTarjetas = document.getElementById('contenedor-tarjetas')
const contenedorAtaques = document.getElementById('contenedor-ataques')

const sectionVerMapa = document.getElementById('ver-mapa')
const mapa = document.getElementById('mapa')

let mokepones = []
let ataqueJugador = []
let ataqueEnemigo = []
let opcionDeMokepones
let inputHipodoge
let inputCapipepo
let inputRatigueya
let mokeponJugador
let mokeponJugadorObjeto
let ataquesMokepon
let ataquesMokeponEnemigo
let botonFuego
let botonAgua
let botonTierra
let botones = []
let indexAtaqueJugador
let indexAtaqueEnemigo
let victoriasJugador = 0
let victoriasEnemigo = 0
let vidasJugador = 3
let vidasEnemigo = 3
let lienzo = mapa.getContext("2d")
let intervalo 
let mapaBackground = new Image()
mapaBackground.src = './assets/chinpokoCamp.jpg'
let alturaQueBuscamos
let anchoDelMapa = window.innerWidth -20
const anchoMaximoDelMapa = 500

if(anchoDelMapa > anchoMaximoDelMapa) {
    anchoDelMapa = anchoMaximoDelMapa -20
}

alturaQueBuscamos = anchoDelMapa * 600/800
mapa.width = anchoDelMapa
mapa.height = alturaQueBuscamos

class Mokepon {
    constructor(nombre, foto, vida, fotoMapa, id = null) {
        this.id = id
        this.nombre = nombre
        this.foto = foto
        this.vida = vida
        this.ataques = []
        this.ancho = 40
        this.alto = 40
        this.x = aleatorio(0, mapa.width - this.ancho)
        this.y = aleatorio(0, mapa.height - this.alto)
        this.mapaFoto = new Image()
        this.mapaFoto.src = fotoMapa
        this.velocidadX = 0
        this.velocidadY = 0
    }
    pintarMokepon() {
        lienzo.drawImage(
            this.mapaFoto,
            this.x,
            this.y,
            this.ancho,
            this.alto,
        )        
    }
}

let hipodoge = new Mokepon('Hipodoge', './assets/chinpokomon1.png', 5, './assets/hipodoge.png')
let capipepo = new Mokepon('Capipepo', './assets/chinpokomon2.png', 5, './assets/capipepo.png')
let ratigueya = new Mokepon('Ratigueya', './assets/chinpokomon3.png', 5, './assets/ratigueya.png')
let hipodogeEnemigo = new Mokepon('Hipodoge', './assets/chinpokomon1.png', 5, './assets/hipodoge.png')
let capipepoEnemigo = new Mokepon('Capipepo', './assets/chinpokomon2.png', 5, './assets/capipepo.png')
let ratigueyaEnemigo = new Mokepon('Ratigueya', './assets/chinpokomon3.png', 5, './assets/ratigueya.png')

hipodoge.ataques.push(
    { nombre: 'AGUA💧', id: 'boton-agua' },
    { nombre: 'AGUA💧', id: 'boton-agua' },
    { nombre: 'AGUA💧', id: 'boton-agua' },
    { nombre: 'FUEGO🔥', id: 'boton-fuego' },
    { nombre: 'TIERRA🌱', id: 'boton-tierra' },
)

hipodogeEnemigo.ataques.push(
    { nombre: 'AGUA💧', id: 'boton-agua' },
    { nombre: 'AGUA💧', id: 'boton-agua' },
    { nombre: 'AGUA💧', id: 'boton-agua' },
    { nombre: 'FUEGO🔥', id: 'boton-fuego' },
    { nombre: 'TIERRA🌱', id: 'boton-tierra' },
)

capipepo.ataques.push(
    { nombre: 'TIERRA🌱', id: 'boton-fuego' },
    { nombre: 'TIERRA🌱', id: 'boton-fuego' },
    { nombre: 'TIERRA🌱', id: 'boton-fuego' },
    { nombre: 'AGUA💧', id: 'boton-agua' },
    { nombre: 'FUEGO🔥', id: 'boton-tierra' },
)

capipepoEnemigo.ataques.push(
    { nombre: 'TIERRA🌱', id: 'boton-fuego' },
    { nombre: 'TIERRA🌱', id: 'boton-fuego' },
    { nombre: 'TIERRA🌱', id: 'boton-fuego' },
    { nombre: 'AGUA💧', id: 'boton-agua' },
    { nombre: 'FUEGO🔥', id: 'boton-tierra' },
)

ratigueya.ataques.push(
    { nombre: 'FUEGO🔥', id: 'boton-tierra' },
    { nombre: 'FUEGO🔥', id: 'boton-tierra' },
    { nombre: 'FUEGO🔥', id: 'boton-tierra' },
    { nombre: 'TIERRA🌱', id: 'boton-fuego' },
    { nombre: 'AGUA💧', id: 'boton-agua' },
)

ratigueyaEnemigo.ataques.push(
    { nombre: 'FUEGO🔥', id: 'boton-tierra' },
    { nombre: 'FUEGO🔥', id: 'boton-tierra' },
    { nombre: 'FUEGO🔥', id: 'boton-tierra' },
    { nombre: 'TIERRA🌱', id: 'boton-fuego' },
    { nombre: 'AGUA💧', id: 'boton-agua' },
)

mokepones.push(hipodoge, capipepo, ratigueya)

function iniciarJuego() {
    sectionSelectAtaque.style.display = 'none'
    sectionReiniciar.style.display = 'none'
    sectionVerMapa.style.display = 'none'

    mokepones.forEach((mokepon) => {
        opcionDeMokepones = `
        <input type="radio" name="mokepon" id=${mokepon.nombre} />
        <label class="tarjeta-de-mokepon" for=${mokepon.nombre}>
            <p>${mokepon.nombre}</p>
            <img src=${mokepon.foto} alt="chinpoko" />
        </label>
        `
    contenedorTarjetas.innerHTML += opcionDeMokepones

    inputHipodoge = document.getElementById('Hipodoge')
    inputCapipepo = document.getElementById('Capipepo')
    inputRatigueya = document.getElementById('Ratigueya')

    })
    
    botonSelectMokepon.addEventListener('click', selectMokeponJugador)
    botonReiniciar.addEventListener('click', reiniciarJuego)
}

//seleccion de mokepones
function selectMokeponJugador() {
    sectionSelectMokepon.style.display = 'none'
    // sectionSelectAtaque.style.display = 'flex'
    sectionVerMapa.style.display = 'flex'

    if (inputHipodoge.checked){
        spanMokeponJugador.innerHTML = inputHipodoge.id
        mokeponJugador = inputHipodoge.id
    } else if (inputCapipepo.checked){
        spanMokeponJugador.innerHTML = inputCapipepo.id
        mokeponJugador = inputCapipepo.id
    } else if (inputRatigueya.checked){
        spanMokeponJugador.innerHTML = inputRatigueya.id
        mokeponJugador = inputRatigueya.id
    } else {
        alert('Selecciona un Mokepon')
    }

    // selecccionarMokepon(mokeponJugador)
    extraerAtaques(mokeponJugador)
    sectionVerMapa.style.display = 'flex'
    iniciarMapa()
}

//ataques
function extraerAtaques(mokeponJugador) {
    let ataques
    for (let i = 0; i < mokepones.length; i++) {
        if(mokeponJugador === mokepones[i].nombre) {
            ataques = mokepones[i].ataques
        }      
    }
    mostrarAtaques(ataques)
}

function mostrarAtaques(ataques){
    ataques.forEach((ataque) => {
        ataquesMokepon = `
        <button id=${ataque.id} class="boton-de-ataque BAtaque">${ataque.nombre}</button>
        `
        contenedorAtaques.innerHTML += ataquesMokepon
    })
    botonFuego = document.getElementById('boton-fuego')
    botonAgua = document.getElementById('boton-agua')
    botonTierra = document.getElementById('boton-tierra')
    botones = document.querySelectorAll('.BAtaque')
}

function secuenciaAtaque() {
    botones.forEach((boton) => {
        boton.addEventListener('click', (e) => {
            if(e.target.textContent === 'FUEGO🔥') {
                ataqueJugador.push('FUEGO')
                console.log(ataqueJugador)
                boton.style.background = '#112f58'
                boton.disabled = true
            } else if(e.target.textContent === 'AGUA💧') {
                ataqueJugador.push('AGUA')
                console.log(ataqueJugador)
                boton.style.background = '#112f58'
                boton.disabled = true
            } else {
                ataqueJugador.push('TIERRA')
                console.log(ataqueJugador)
                boton.style.background = '#112f58'
                boton.disabled = true
            }
            ataqueAleatorioEnemigo()
        })
    })
}

//enemigo elige mokepon y ataque
function selectMokeponEnemigo(enemigo) {
    spanMokeponEnemigo.innerHTML = enemigo.nombre
    ataquesMokeponEnemigo = enemigo.ataques
    secuenciaAtaque()
}

function ataqueAleatorioEnemigo() {
    console.log('Ataques enemigo', ataquesMokeponEnemigo)
    let ataqueAleatorio = aleatorio(0, ataquesMokeponEnemigo.length - 1)

    if (ataqueAleatorio == 0 || ataqueAleatorio == 1){
        ataqueEnemigo.push('FUEGO')
    } else if (ataqueAleatorio == 3 || ataqueAleatorio == 4){
        ataqueEnemigo.push('AGUA')
    } else {
        ataqueEnemigo.push('TIERRA')
    }
    console.log(ataqueEnemigo)
    iniciarPelea()
}

function iniciarPelea() {
    if(ataqueJugador.length === 5) {
        combate()
    }
}

function indexAmbosOponentes(jugador, enemigo) {
    indexAtaqueJugador = ataqueJugador[jugador]
    indexAtaqueEnemigo = ataqueEnemigo[enemigo]
}

// combate
function combate() {
    clearInterval(intervalo)

    for (let index = 0; index < ataqueJugador.length; index++) {
        if(ataqueJugador[index] === ataqueEnemigo[index]) {
            indexAmbosOponentes(index, index)
            crearMensaje("EMPATE")
        } else if (ataqueJugador[index] == 'FUEGO' && ataqueEnemigo[index] == 'TIERRA'){
            indexAmbosOponentes(index, index)
            crearMensaje("GANASTE")
            victoriasJugador++
            spanVidasJugador.innerHTML = victoriasJugador
        } else if (ataqueJugador[index] === 'AGUA' && ataqueEnemigo[index] === 'FUEGO'){
            indexAmbosOponentes(index, index)
            crearMensaje("GANASTE")
            victoriasJugador++
            spanVidasJugador.innerHTML = victoriasJugador
        } else if (ataqueJugador[index] === 'TIERRA' && ataqueEnemigo[index] === 'AGUA'){
            indexAmbosOponentes(index, index)
            crearMensaje("GANASTE")
            victoriasJugador++
            spanVidasJugador.innerHTML = victoriasJugador
        } else {
            indexAmbosOponentes(index, index)
            crearMensaje("PERDISTE")
            victoriasEnemigo++
            spanVidasEnemigo.innerHTML = victoriasEnemigo
        }
    }
    revisarVidas()
}

//conteo de victorias
function revisarVidas() {
    if (victoriasJugador === victoriasEnemigo) {
        crearMensajeFinal("EMPATE!!")
    } else if (victoriasJugador > victoriasEnemigo){
        crearMensajeFinal("FELICIDADES! GANASTE!")
    } else {
        crearMensajeFinal("PERDISTE!!")
    }
}

//mensaje en HTML
function crearMensaje(resultado) {
    let nuevoAtaqueJugador = document.createElement('p')
    let nuevoAtaqueEnemigo = document.createElement('p')

    sectionMensajes.innerHTML = resultado
    nuevoAtaqueJugador.innerHTML = indexAtaqueJugador
    nuevoAtaqueEnemigo.innerHTML = indexAtaqueEnemigo

    ataquesJugador.appendChild(nuevoAtaqueJugador)
    ataquesEnemigo.appendChild(nuevoAtaqueEnemigo)
}

function crearMensajeFinal(resultadoFinal) {
    sectionMensajes.innerHTML = resultadoFinal
    sectionReiniciar.style.display = 'block'
}

//reiniciar juego
function reiniciarJuego() {
    location.reload()
}

//aleatoriedad de seleccion de mokepon y ataque enemigo
function aleatorio (min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}

//Canvas
function pintarCanvas() {
    mokeponJugadorObjeto.x = mokeponJugadorObjeto.x + mokeponJugadorObjeto.velocidadX
    mokeponJugadorObjeto.y = mokeponJugadorObjeto.y + mokeponJugadorObjeto.velocidadY
    lienzo.clearRect(0, 0, mapa.width, mapa.height)
    lienzo.drawImage(mapaBackground, 0, 0, mapa.width, mapa.height)
    mokeponJugadorObjeto.pintarMokepon()
    hipodogeEnemigo.pintarMokepon()
    capipepoEnemigo.pintarMokepon()
    ratigueyaEnemigo.pintarMokepon()

    if (mokeponJugadorObjeto.velocidadX !== 0 || mokeponJugadorObjeto.velocidadY !== 0) {
        revisarColision(hipodogeEnemigo)
        revisarColision(capipepoEnemigo)
        revisarColision(ratigueyaEnemigo)
    }
}

function moverDerecha() {
    mokeponJugadorObjeto.velocidadX = 5
}

function moverIzquierda() {
    mokeponJugadorObjeto.velocidadX = -5
}

function moverAbajo() {
    mokeponJugadorObjeto.velocidadY = 5
}

function moverArriba() {
    mokeponJugadorObjeto.velocidadY = -5
}

function detenerMovimiento() {
    mokeponJugadorObjeto.velocidadX = 0
    mokeponJugadorObjeto.velocidadY = 0
}

function sePresionoUnaTecla(event) {
    switch (event.key) {
        case 'ArrowUp':
            moverArriba()
            break
        case 'ArrowDown':
            moverAbajo()
            break
        case 'ArrowLeft':
            moverIzquierda()
            break
        case 'ArrowRight':
            moverDerecha()
            break
        default:
            break
    }
}

function iniciarMapa(){
    mokeponJugadorObjeto = obtenerObjetoMokepon(mokeponJugador)
    console.log(mokeponJugadorObjeto, mokeponJugador)
    intervalo = setInterval(pintarCanvas, 50)
    window.addEventListener('keydown', sePresionoUnaTecla)
    window.addEventListener('keyup', detenerMovimiento)
}

function obtenerObjetoMokepon() {
    for (let i = 0; i < mokepones.length; i++) {
        if(mokeponJugador === mokepones[i].nombre) {
            return mokepones[i]
        }      
    }
}

function revisarColision(enemigo) {
    const arribaEnemigo = enemigo.y
    const abajoEnemigo = enemigo.y + enemigo.alto
    const derechaEnemigo = enemigo.x + enemigo.ancho
    const izquierdaEnemigo = enemigo.x

    const arribaMokepon = mokeponJugadorObjeto.y
    const abajoMokepon = mokeponJugadorObjeto.y + mokeponJugadorObjeto.alto
    const derechaMokepon = mokeponJugadorObjeto.x + mokeponJugadorObjeto.ancho
    const izquierdaMokepon = mokeponJugadorObjeto.x

    if(
        abajoMokepon < arribaEnemigo ||
        arribaMokepon > abajoEnemigo ||
        derechaMokepon < izquierdaEnemigo ||
        izquierdaMokepon > derechaEnemigo
    ) {
        return
    }
    detenerMovimiento()
    clearInterval(intervalo)
    sectionSelectAtaque.style.display = 'flex'
    sectionVerMapa.style.display = 'none'
    selectMokeponEnemigo(enemigo)
}

window.addEventListener('load', iniciarJuego)