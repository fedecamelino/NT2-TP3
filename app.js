new Vue({
    el: '#app',
    data: {
        saludJugador: 100,
        saludMonstruo: 100,
        hayUnaPartidaEnJuego: false,
        turnos: [], //es para registrar los eventos de la partida
        esJugador: false,
        rangoAtaque: [3, 10],
        rangoAtaqueEspecial: [10, 20],
        rangoAtaqueDelMonstruo: [5, 12],
    },

    methods: {
        getSalud(salud) {
            return `${salud}%`
        },
        empezarPartida: function () {
            this.hayUnaPartidaEnJuego = true
            this.saludJugador = 100
            this.saludMonstruo = 100
            this.turnos = []
        },
        atacar: function () {
            let herida = this.calcularHeridas(this.rangoAtaque)
            this.saludMonstruo -= herida

            this.turnos.unshift({
                esJugador: true,
                text: `El jugador golpea al mostruo por ${herida}%` 
            })

            if(this.verificarGanador()) return

            this.ataqueDelMonstruo()
        },
        ataqueEspecial: function () {
            let herida = this.calcularHeridas(this.rangoAtaqueEspecial)
            this.saludMonstruo -= herida

            this.turnos.unshift({
                esJugador: true,
                text: `El jugador golpea al mostruo por ${herida}%` 
            })

            if(this.verificarGanador()) return

            this.ataqueDelMonstruo()
        },
        curar: function () {
            if(this.saludJugador<=90) {
                cura = 10
                this.saludJugador += cura
            }
            else {
                cura = 100 - this.saludJugador
                this.saludJugador = 100
            } 

            this.turnos.unshift({
                esJugador: true,
                text: `El jugador se curó en un ${cura}%` 
            })

            this.ataqueDelMonstruo()
        },
        terminarPartida: function () {
            this.hayUnaPartidaEnJuego = false
        },
        registrarEvento(evento) {
        },
        ataqueDelMonstruo: function () {
            let herida = this.calcularHeridas(this.rangoAtaqueDelMonstruo)
            this.saludJugador -= herida

            this.turnos.unshift({
                esJugador: false,
                text: `El monstruo lastima al jugador en ${herida}%` 
            })

            this.verificarGanador()
        },
        calcularHeridas: function (rango) {
            const min = rango[0]
            const max = rango[1]
            
            return Math.max(Math.floor(Math.random()*max)+1, min)
        },
        verificarGanador: function () {
            if(this.saludMonstruo<=0) {
                if(confirm("Ganaste! Deseas jugar de nuevo?")) this.empezarPartida()
                else this.hayUnaPartidaEnJuego = false
                return true
            }

            else if(this.saludJugador<=0) {
                if(confirm("Perdiste! Deseas jugar de nuevo?")) this.empezarPartida()
                else this.hayUnaPartidaEnJuego = false
                return true
            }

            else return false
        },
        cssEvento(turno) {
            //Este return de un objeto es prque vue asi lo requiere, pero ponerlo acá queda mucho mas entendible en el codigo HTML.
            return {
                'player-turno': turno.esJugador,
                'monster-turno': !turno.esJugador
            }
        }
    }
});