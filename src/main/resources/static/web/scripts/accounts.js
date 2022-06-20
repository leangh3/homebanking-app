Vue.createApp({
    data() {
        return {
            loadData: [],
            accounts: [],
            url: '',
            urlMov: './account.html?id=',
            dataDolar: [],
            loans: [],
            cards: [],
            debit: [],
            credit: [],
            worthAmount: "all",
            urlTransacciones: '/api/accounts/',
            account: [],
            cardType: '',
            cardColor: '',
            urlLoans: '/api/loans',
            loansDetails: [],
            accountType: '',
            ahorro: [],
            corriente: [],
            actualDate: new Date().getTime(),
            idCard: '',
            idAccount: '',
            thruDateCard:''


        }

    },


    created() {


        this.url = '/api/clients/current'

        axios.get(this.url)
            .then(info => {
                this.loadData = info.data

                this.accounts = this.loadData.accounts.sort((a, b) => a.id - b.id)
                console.log(this.accounts)
                this.ahorro = this.accounts.filter(account => account.type == 'AHORRO')

                this.corriente = this.accounts.filter(account => account.type == 'CORRIENTE')

                this.loans = this.loadData.loans.sort((a, b) => a.id - b.id)

                this.cards = this.loadData.cards.sort((a, b) => a.id - b.id)

                this.debit = this.cards.filter(card => card.type == "DEBIT")
                // console.log(this.debit);
                this.credit = this.cards.filter(card => card.type == "CREDIT")
                // console.log(this.credit);

            }).then(response => {

                axios.get("https://www.dolarsi.com/api/api.php?type=valoresprincipales")
                    .then(datos => {
                        this.dataDolar = datos.data.slice(0, 4);

                    })
            }).then(response => {

                axios.get(this.urlLoans)
                    .then(response => {
                        this.loansDetails = response.data

                    })
            }).then(response => {

                const loader = document.querySelector(".newtons-cradle")
                loader.classList.add("hidden")
            })




    },

    methods: {

        changeColor() {

            const checkbox = document.querySelector("input[type='checkbox']")
            if (checkbox.checked && window.location) {
                const mainColor = document.querySelector("main").classList.toggle("oscuro-theme")
                const botonCuentas = document.getElementsByClassName("boton-cuentas")
                for (i = 0; i < botonCuentas.length; i++) {
                    botonCuentas[i].classList.toggle("boton-them")
                }
            }

        },


        logIn() {
            axios.post('/api/logout').then(response => {
                if (response.status === 200) {
                    const Toast = Swal.mixin({
                        toast: true,
                        position: 'top-end',
                        showConfirmButton: false,
                        timer: 2000,
                        timerProgressBar: true,
                        didOpen: (toast) => {
                            toast.addEventListener('mouseenter', Swal.stopTimer)
                            toast.addEventListener('mouseleave', Swal.resumeTimer)
                        }
                    })
                    Toast.fire({
                        icon: 'success',
                        title: 'Deslogueado con éxito'
                    })
                    setTimeout(function () {
                        window.location.href = "./index.html";
                    }, 2000)
                }
            })
        },

        createCards() {

            Swal.fire({
                title: '¿Confirma crear tarjeta?',
                text: "Al confirmar, no podrá revertir los cambios",
                icon: 'question',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Crear Tarjeta'
            }).then((result) => {
                if (result.isConfirmed) {
                    axios.post('/api/clients/current/cards', `type=${this.cardType}&color=${this.cardColor}`, {
                        headers: {
                            'content-type': 'application/x-www-form-urlencoded'
                        }
                    }).then(response => {
                        Swal.fire(
                            'Tarjeta creada',
                            'Usted posee una nueva tarjeta',
                            'success'
                        )
                        setTimeout(function () {
                            window.location.href = './cards.html'
                        }, 2000)
                    }).catch(function (error) {
                        if (error.response.data == "Cannot obtain more than a card of each color and type" && error.response.status == 403) {
                            Swal.fire({
                                position: 'center',
                                icon: 'error',
                                title: "Ya posee una tarjeta igual. No es posible crear otra",
                                showConfirmButton: false,
                            })
                            setTimeout(function () {
                                window.location.href = './cards.html'
                            }, 2000)
                        }
                        if (error.response.data == "Cannot obtain more than 3 cards of each" && error.response.status == 403) {
                            Swal.fire({
                                position: 'center',
                                icon: 'error',
                                title: "Ya posee 3 tarjetas del mismo tipo. No es posible crear otra",
                                showConfirmButton: false,
                            })
                            setTimeout(function () {
                                window.location.href = './cards.html'
                            }, 2000)
                        }
                    })
                }
            })
        },

        createAccount() {

            Swal.fire({
                title: '¿Desea crear una cuenta?',
                text: "Al confirmar, no podrá revertir los cambios",
                icon: 'question',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Crear cuenta'
            }).then((result) => {
                if (result.isConfirmed) {
                    axios.post('/api/clients/current/accounts', `type=${this.accountType}`, {
                            headers: {
                                'content-type': 'application/x-www-form-urlencoded'
                            }
                        })
                        .then(response => {
                            Swal.fire(
                                'Cuenta creada',
                                'Usted ha creado una nueva cuenta',
                                'success',

                            )
                            setTimeout(function () {
                                window.location.href = window.location
                            }, 1000)
                        }).catch(function (error) {
                            if (error.response) {
                                Swal.fire({
                                    position: 'center',
                                    icon: 'error',
                                    title: "No puede crear mas de 3 cuentas",
                                    showConfirmButton: true,
                                })
                            }

                        })
                }
            })
        },


        toCards() {

            setTimeout(function () {
                window.location.href = "./cards.html";
            }, 100)
        },

        toCreateCards() {

            setTimeout(function () {
                window.location.href = "./create-cards.html";
            }, 100)
        },

        toHome() {

            setTimeout(function () {
                window.location.href = "./accounts.html";
            }, 100)
        },

        toLoans() {

            setTimeout(function () {
                window.location.href = "./loan-application.html";
            }, 100)
        },

        disabledCard(idCliente) {
            this.idCard = idCliente
            console.log(this.idCard)

            Swal.fire({
                title: '¿Desea desactivar la tarjeta?',
                text: "Al confirmar, no podrá revertir los cambios",
                icon: 'question',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Desactivar tarjeta'
            }).then((result) => {
                if (result.isConfirmed) {
                    axios.patch('/api/clients/current/cards', `id=${this.idCard}`)
                        .then(response => {
                            Swal.fire(
                                'Tarjeta desactivada',
                                'Usted ya no podrá operar con la tarjeta',
                                'success',

                            )
                            setTimeout(function () {
                                window.location.href = window.location
                            }, 2000)
                        }).catch(function (error) {
                            if (error.response.data == "The id doesn't exist" && error.response.status == 403) {
                                Swal.fire({
                                    position: 'center',
                                    icon: 'error',
                                    title: "Error: El id de la tarjeta no existe",
                                    showConfirmButton: false,
                                })
                                setTimeout(function () {
                                    window.location.href = './cards.html'
                                }, 2000)
                            }
                            if (error.response.data == "The card doesn't exist" && error.response.status == 403) {
                                Swal.fire({
                                    position: 'center',
                                    icon: 'error',
                                    title: "Error: La tarjeta no existe",
                                    showConfirmButton: false,
                                })
                                setTimeout(function () {
                                    window.location.href = './cards.html'
                                }, 2000)
                            }
                            if (error.response.data == "The card doesn't belong to an authenticated customer" && error.response.status == 403) {
                                Swal.fire({
                                    position: 'center',
                                    icon: 'error',
                                    title: "Error: La tarjeta no pertenece a un cliente registrado",
                                    showConfirmButton: false,
                                })
                                setTimeout(function () {
                                    window.location.href = './cards.html'
                                }, 2000)
                            }
                        })
                }
            })
        },

        disabledAccount(idCliente) {
            this.idAccount = idCliente
            console.log(this.idAccount);

            Swal.fire({
                title: '¿Desea desactivar la cuenta?',
                text: "Al confirmar, no podrá revertir los cambios",
                icon: 'question',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Desactivar cuenta'
            }).then((result) => {
                if (result.isConfirmed) {
                    axios.patch('/api/clients/current/accounts', `id=${this.idAccount}`)
                        .then(response => {
                            Swal.fire(
                                'Cuenta desactivada',
                                'La cuenta quedó inhabilitada para operar',
                                'success',

                            )
                            setTimeout(function () {
                                window.location.href = window.location
                            }, 1000)
                        }).catch(function (error) {
                            if (error.response.data == "The account id doesn't exist" && error.response.status == 403) {
                                Swal.fire({
                                    position: 'center',
                                    icon: 'error',
                                    title: "Error: La id de la tarjeta no existe",
                                    showConfirmButton: false,
                                })
                                setTimeout(function () {
                                    window.location.href = './accounts.html'
                                }, 2000)
                            }
                            if (error.response.data == "The account doesn't exist" && error.response.status == 403) {
                                Swal.fire({
                                    position: 'center',
                                    icon: 'error',
                                    title: "Error: La tarjeta no existe",
                                    showConfirmButton: false,
                                })
                                setTimeout(function () {
                                    window.location.href = './accounts.html'
                                }, 2000)
                            }
                            if (error.response.data == "The account doesn't belong to an authenticated customer" && error.response.status == 403) {
                                Swal.fire({
                                    position: 'center',
                                    icon: 'error',
                                    title: "Error: La cuenta no pertenece a un cliente registrado",
                                    showConfirmButton: false,
                                })
                                setTimeout(function () {
                                    window.location.href = './accounts.html'
                                }, 2000)
                            }
                            if (error.response.data == "Can't disabled an account with balance" && error.response.status == 403) {
                                Swal.fire({
                                    position: 'center',
                                    icon: 'error',
                                    title: "Error: No puede desactivar una cuenta con saldo",
                                    showConfirmButton: false,
                                })
                                setTimeout(function () {
                                    window.location.href = './accounts.html'
                                }, 2000)
                            }
                        })
                }
            })
        },


        isCardExpired(fecha){

            this.thruDateCard = new Date(fecha).getTime()
            // console.log(this.thruDateCard);
            this.actualDate = new Date().getTime()
            // console.log(this.actualDate);
            let estado = ''
            if(this.actualDate >= this.thruDateCard){
                estado = true
            } else{
                estado =  false
            }
            return estado
            
        }


    },

    computed: {


        filterByMajorMinor() {

            let filtro = []
            if (this.worthAmount == "menor") {
                filtro = this.loans.sort((a, b) => a.amount - b.amount)
            }
            if (this.worthAmount == "mayor") {
                filtro = this.loans.sort((a, b) => b.amount - a.amount)
            }
            if (this.worthAmount == "all") {
                filtro = this.loans.sort((a, b) => a.id - b.id)
            }


        },


        

    }




}).mount('#app')

AOS.init();