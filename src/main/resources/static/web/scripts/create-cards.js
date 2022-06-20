Vue.createApp({
    data() {
        return {
            transactions: [],
            accounts: [],
            url: '',
            array: [],
            netBalance: [],
            balance: [],
            cardColor: "",
            cardType: "",
            checkboxTyCCheck: "",
            debit: [],
            credit: []

        }
    },


    created() {



        const url = '/api/clients/current'

        axios.get(url)
            .then(info => {
                this.array = info.data
                // console.log(this.array)
                this.balance = this.array.accounts
                // console.log(this.balance)

                
                
                this.debit = this.array.cards.filter(card => card.type == "DEBIT")
                // console.log(this.debit)
                this.credit = this.array.cards.filter(card => card.type == "CREDIT")
                // console.log(this.credit)
            }).then(response => {
                
                const loader = document.querySelector(".newtons-cradle")
                loader.classList.add("hidden")
            })



    },

    methods: {

        changeColor() {

            const checkbox = document.querySelector("input[type='checkbox']")
            console.log(checkbox)
            if (checkbox.checked) {
                const mainColor = document.querySelector("main").classList.toggle("oscuro-theme")
                const tableColor = document.getElementsByClassName("table")
                for (i = 0; i < tableColor.length; i++) {
                    tableColor[i].classList.toggle("oscuro-theme")
                }
                const botonCuentas = document.getElementsByClassName("boton-cuentas")
                for (i = 0; i < botonCuentas.length; i++) {
                    botonCuentas[i].classList.toggle("boton-them")
                }
            }

        },

        logOut() {
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

        createCard() {

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
                                title: "Ya posee una tarjeta igual. No es posible crear otra igual",
                                showConfirmButton: false,
                            })
                            setTimeout(function () {
                                window.location.href = './create-cards.html'
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
                                window.location.href = './create-cards.html'
                            }, 2000)
                        }
                        
                    })
                }
            })


        },

        checkboxChecked() {

            const checkbox = document.querySelector("#form6Example8")
            this.checkboxTyCCheck = checkbox.checked
            if (this.checkboxTyCCheck) {
                const {
                    value: accept
                } = Swal.fire({
                    title: 'Términos y condiciones',
                    input: 'checkbox',
                    inputValue: 1,
                    inputPlaceholder: 'Estoy de acuerdo con los términos y condiciones',
                    confirmButtonText: 'Continue <i class="fa fa-arrow-right"></i>',
                    inputValidator: (result) => {
                        return !result && 'Debe aceptar los términos y condiciones'
                    }
                })

                if (accept) {
                    Swal.fire('Ha aceptados los TyC')
                }
            }

        },

        toCards() {

            setTimeout(function () {
                window.location.href = "./cards.html";
            }, 100)
        },

        toHome() {

            setTimeout(function () {
                window.location.href = "./accounts.html";
            }, 100)
        },



    },

    computed: {


    }




}).mount('#app')

AOS.init();