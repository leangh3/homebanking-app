Vue.createApp({
    data() {
        return {
            transactions: [],
            accounts: [],
            url: '',
            urlClients: '',
            array: [],
            netBalance: [],
            balance: []

        }
    },


    created() {

        let valorPropiedad = window.location.search

        const valorAObtener = new URLSearchParams(valorPropiedad)

        const parametroRequerido = valorAObtener.get('id')

        this.url = `/api/accounts/${parametroRequerido}`

        axios.get(this.url)
            .then(info => {
                this.accounts = info.data
                
                this.transactions = this.accounts.transaction

                this.transactions = this.transactions.sort((a, b) => new Intl.Collator().compare(b.date, a.date))
            }).then(response => {
                this.urlClients = '/api/clients/current'
                axios.get(this.urlClients)
                    .then(info => {
                        this.array = info.data
                        // console.log(this.array)
                        this.balance = this.array.accounts
                        console.log(this.balance)
                    })
            }).then(response => {
                const loader = document.querySelector(".newtons-cradle")
                loader.classList.add("hidden")
            })
    },

    methods: {

        changeColor() {

            const checkbox = document.querySelector("input[type='checkbox']")
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

        toHome() {

            setTimeout(function () {
                window.location.href = "./accounts.html";
            }, 100)
        },

    },

    computed: {


        netIncome() {
            let balance = []
            this.transactions.forEach(dato => {
                if (dato.type === "CREDITO") {
                    balance.push(dato.amount)
                }
            })

            return balance.reduce((a, b) => a + b, 0)

        },

        netExpenses() {
            let balance = []
            this.transactions.forEach(dato => {
                if (dato.type === "DEBITO") {
                    balance.push(dato.amount)
                }
            })
            return balance.reduce((a, b) => a + b, 0)
        },

        localTaxes() {
            let taxes = []
            this.transactions.forEach(dato => {
                if (dato.description.includes("Impuesto provincial")) {
                    taxes.push(dato.amount)
                }
            })
            return taxes.reduce((a, b) => a + b, 0)
        },

        transferTaxes() {
            let taxes = []
            this.transactions.forEach(dato => {
                if (dato.description.includes("Impuesto transferencias")) {
                    taxes.push(dato.amount)
                }
            })
            return taxes.reduce((a, b) => a + b, 0)
        }
    }


}).mount('#app')

AOS.init();