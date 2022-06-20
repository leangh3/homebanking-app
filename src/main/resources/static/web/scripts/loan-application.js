Vue.createApp({
    data() {
        return {
            transactions: [],
            accounts: [],
            url: '',
            array: [],
            loanTypes: '',
            targetAccounts: '',
            checkboxChecked: '',
            loanAmount: '',
            loans: [],
            clientLoans: [],
            totalAmount:'',
            payments: '',
            aux:[]


        }
    },


    created() {



        const url = '/api/clients/current'

        axios.get(url)
            .then(info => {
                this.array = info.data
                this.accounts = this.array.accounts.sort((a, b) => a.id - b.id)
                this.clientLoans = this.array.loans.sort((a, b) => a.id - b.id)
                
            }).then(response => {
                axios.get('/api/loans')
                .then(response => {
                    this.loans = response.data.filter(loanType => !this.clientLoans.map(loans => loans.name).includes(loanType.name))
                    this.aux = this.loans.map(loan => loan.payments)
                    
                })
            }).then(response =>{
                
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

        acceptTyC() {

            const checkbox = document.querySelector("#form6Example8")
            this.checkboxChecked = checkbox.checked
            if (this.checkboxChecked) {
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

        loanRequest() {

            Swal.fire({
                title: '¿Confirma la transferencia?',
                text: "Al confirmar, no podrá revertir los cambios",
                icon: 'question',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Transferir'
            }).then((result) => {
                if (result.isConfirmed) {
                    axios.post('/api/loans', {
                            "id": `${this.loanTypes}`,
                            "amount": `${this.loanAmount}`,
                            "payments": `${this.payments}`,
                            "targetAccount": `${this.targetAccounts}`
                        }).then(response => {

                            Swal.fire(
                                'Solicitud realizada con éxito',
                                'Un nuevo préstamo se le ha otorgado',
                                'success'
                            )
                            setTimeout(function () {
                                window.location.href = './accounts.html'
                            }, 2000)
                        })
                        .catch(function (error) {
                            if (error.response.data == "Loan amount cannot be 0 or lower" && error.response.status == 403) {
                                Swal.fire({
                                    position: 'center',
                                    icon: 'error',
                                    title: "Erorr en la solicitud: El monto debe ser mayor a $0",
                                    showConfirmButton: false,
                                })
                                setTimeout(function () {
                                    window.location.href = './loan-application.html'
                                }, 2000)
                            }
                            if ((error.response.data == "Loan payments cannot be 0 or lower" && error.response.status == 403)) {
                                Swal.fire({
                                    position: 'center',
                                    icon: 'error',
                                    title: "Erorr en la solicitud: Las cuotas no pueden ser 0 o menor",
                                    showConfirmButton: false,
                                })
                                setTimeout(function () {
                                    window.location.href = './loan-application.html'
                                }, 2000)
                            }
                            if ((error.response.data == "Loan doesn't exist" && error.response.status == 403)) {
                                Swal.fire({
                                    position: 'center',
                                    icon: 'error',
                                    title: "Erorr en la solicitud: El tipo de préstamo no existe",
                                    showConfirmButton: false,
                                })
                                setTimeout(function () {
                                    window.location.href = './loan-application.html'
                                }, 2000)
                            }
                            if ((error.response.data == "Loan amount is greater than allow" && error.response.status == 403)) {
                                Swal.fire({
                                    position: 'center',
                                    icon: 'error',
                                    title: "Erorr en la solicitud: El monto solicitado supera el máximo permitido",
                                    showConfirmButton: false,
                                })
                                setTimeout(function () {
                                    window.location.href = './loan-application.html'
                                }, 2000)
                            }
                            if ((error.response.data == "These payments are not allowed" && error.response.status == 403)) {
                                Swal.fire({
                                    position: 'center',
                                    icon: 'error',
                                    title: "Erorr en la solicitud: Monto de cuotas no permitido",
                                    showConfirmButton: false,
                                })
                                setTimeout(function () {
                                    window.location.href = './loan-application.html'
                                }, 2000)
                            }
                            if ((error.response.data == "This account doesn't belong to an authenticated user" && error.response.status == 403)) {
                                Swal.fire({
                                    position: 'center',
                                    icon: 'error',
                                    title: "Erorr en la solicitud: La cuenta no pertenece al usuario autenticado",
                                    showConfirmButton: false,
                                })
                                setTimeout(function () {
                                    window.location.href = './loan-application.html'
                                }, 2000)
                            }
                            if ((error.response.data == "You already have this type of loan" && error.response.status == 403)) {
                                Swal.fire({
                                    position: 'center',
                                    icon: 'error',
                                    title: "Erorr en la solicitud: Ya posee un préstamo de este tipo",
                                    showConfirmButton: false,
                                })
                                setTimeout(function () {
                                    window.location.href = './loan-application.html'
                                }, 2000)
                            }

                        })
                }
            })
        },

        reset1() {
            let form = document.querySelector("form").reset()
            this.targetAccounts = ""
            this.payments = ""
            this.loanAmount = ""

        },

        reset2() {
            let form = document.querySelector("form").reset()
            this.loanAmount = ""
            this.targetAccounts = ""
        },

        reset3() {
            let form = document.querySelector("form").reset()
            this.loanAmount = ""
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