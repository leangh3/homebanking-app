Vue.createApp({
    data() {
        return {
            transactions: [],
            accounts: [],
            url: '',
            array: [],
            transferType:'',
            sourceAccount: '',
            targetAccount: '',
            checkboxChecked: '',
            transferAmount: '',
            description: '',
            mainColor:'',
            tableColor:'',
            buttonAccounts:'',



        }
    },


    created() {



        const url = '/api/clients/current'

        axios.get(url)
            .then(info => {
                this.array = info.data
                // console.log(this.array)
                this.accounts = this.array.accounts.sort((a, b) => a.id - b.id)
                console.log(this.accounts) 
            }).then(response => {
                const loader = document.querySelector(".newtons-cradle")
                loader.classList.add("hidden")
                
            })



    },

    methods: {

        changeColor() {

            const checkbox = document.querySelector("input[type='checkbox']")
            // console.log(checkbox)
            if (checkbox.checked) {

                this.mainColor = document.querySelector("main").classList.toggle("oscuro-theme")
                this.tableColor = document.getElementsByClassName("table")
                for (i = 0; i < this.tableColor.length; i++) {
                    this.tableColor[i].classList.toggle("oscuro-theme")
                }
                this.buttonAccounts = document.getElementsByClassName("boton-cuentas")
                for (i = 0; i < this.buttonAccounts.length; i++) {
                    this.buttonAccounts[i].classList.toggle("boton-them")
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

        makeTransfer() {

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
                    axios.post('/api/transactions', `amount=${this.transferAmount}&description=${this.description}&fromAccount=${this.sourceAccount}&toAccount=${this.targetAccount}`, {
                        headers: {
                            'content-type': 'application/x-www-form-urlencoded'
                        }
                    }).then(response => {
                        Swal.fire(
                            'Transferencia realizada',
                            'Usted ha realizado una transferencia',
                            'success'
                        )
                        setTimeout(function () {
                            window.location.href = './accounts.html'
                        }, 2000)
                    }).catch(function (error) {
                        if (error.response.data == "Missing data" && error.response.status == 403) {
                            Swal.fire({
                                position: 'center',
                                icon: 'error',
                                title: "Erorr al transferir: Faltan datos",
                                showConfirmButton: false,
                            })
                            setTimeout(function () {
                                window.location.href = './transfers.html'
                            }, 2000)
                        }
                        if ((error.response.data == "Accounts are the same" && error.response.status == 403)) {
                            Swal.fire({
                                position: 'center',
                                icon: 'error',
                                title: "Erorr al transferir: Cuenta de origen y destino son iguales",
                                showConfirmButton: false,
                            })
                            setTimeout(function () {
                                window.location.href = './transfers.html'
                            }, 2000)
                        }
                        if ((error.response.data == "Target account doesn't exist" && error.response.status == 403)) {
                            Swal.fire({
                                position: 'center',
                                icon: 'error',
                                title: "Erorr al transferir: Cuenta de destino no existe",
                                showConfirmButton: false,
                            })
                            setTimeout(function () {
                                window.location.href = './transfers.html'
                            }, 2000)
                        }
                        if ((error.response.data == "This account doesn't belong to an authenticated user" && error.response.status == 403)) {
                            Swal.fire({
                                position: 'center',
                                icon: 'error',
                                title: "Erorr al transferir: Cuenta origen no pertenece a un cliente registrado",
                                showConfirmButton: false,
                            })
                            setTimeout(function () {
                                window.location.href = './transfers.html'
                            }, 2000)
                        }
                        if ((error.response.data == "Account doesn't have enough balance" && error.response.status == 403)) {
                            Swal.fire({
                                position: 'center',
                                icon: 'error',
                                title: "Erorr al transferir: No posee suficiente saldo para transferir",
                                showConfirmButton: false,
                            })
                            setTimeout(function () {
                                window.location.href = './transfers.html'
                            }, 2000)
                        }
                        if ((error.response.data == "You can't transfer negative amounts" && error.response.status == 403)) {
                            Swal.fire({
                                position: 'center',
                                icon: 'error',
                                title: "Erorr al transferir: No puede transferir saldos negativos",
                                showConfirmButton: false,
                            })
                            setTimeout(function () {
                                window.location.href = './transfers.html'
                            }, 2000)
                        }

                    })
                }
            })
        },

        reset1() {
            let form = document.querySelector("form").reset()
            this.targetAccount = ""
            this.sourceAccount = ""
            this.transferAmount = ""
            this.descripciodescription = ""
        },

        reset2() {
            let form = document.querySelector("form").reset()
            this.targetAccount = ""
            this.transferAmount = ""
            this.description = ""
        },


        reset3() {
            let form = document.querySelector("form").reset()
            this.transferAmount = ""
            this.descripciodescription = ""
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