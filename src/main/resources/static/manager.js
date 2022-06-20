Vue.createApp({
            data() {
                return {
                    loadData: [],
                    firstName: "",
                    lastName: "",
                    email: "",
                    firstNameEdit: "",
                    lastNameEdit: "",
                    emailEdit: "",
                    agregarCliente: [],
                    url: '',
                    clienteEditado: [],
                    urlCliente: "",
                    IdUrlCliente: '',
                    loans: [],
                    type: '',
                    maxAmount: '',
                    payments: [],
                    loansRest:[],
                    idLoan:''

                }
            },


            created() {


                this.url = '/rest/clients'


                axios.get(this.url)
                    .then(info => {
                        this.loadData = info.data._embedded.clients
                        console.log(this.loadData)
                        console.log(this.url)
                    }).then(response => {
                        axios.get('/api/loans')
                            .then(response => {
                                this.loans = response.data
                                console.log(this.loans);
                            })
                    }).then(response =>{
                            axios.get('/rest/loans')
                            .then(response =>{
                                this.loansRest = response.data._embedded
                                console.log(this.loansRest)

                            })
                    })
            },

            methods: {

                agregarUnCliente() {

                    if (this.firstName != "" && this.lastName != "" && this.email != "" && this.email.includes("@") && this.email.includes(".")) {

                        this.clienteQueSeAgrega = {

                            firstName: this.firstName,
                            lastName: this.lastName,
                            email: this.email
                        }

                        Swal.fire({
                            title: '¿Desea agregar el cliente?',
                            text: "Al confirmar, no podrá revertir los cambios",
                            icon: 'question',
                            showCancelButton: true,
                            confirmButtonColor: '#3085d6',
                            cancelButtonColor: '#d33',
                            confirmButtonText: 'Agregar cliente'
                        }).then((result) => {
                            if (result.isConfirmed) {
                                axios.post(this.url, this.clienteQueSeAgrega)
                                    .then(response => {
                                        Swal.fire(
                                            'Cliente agregado',
                                            'Se ha agregado con exito',
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
                                                title: "No pudo realizar esta acción",
                                                showConfirmButton: true,
                                            })
                                        }
                                    })
                            }
                        })
                    }

                },

                borrarUnCliente(idcliente) {

                    this.urlCliente = idcliente

                    Swal.fire({
                        title: '¿Desea borrar el cliente?',
                        text: "Al confirmar, no podrá revertir los cambios",
                        icon: 'question',
                        showCancelButton: true,
                        confirmButtonColor: '#3085d6',
                        cancelButtonColor: '#d33',
                        confirmButtonText: 'Eliminar cliente'
                    }).then((result) => {
                        if (result.isConfirmed) {
                            axios.delete(this.urlCliente)
                                .then(response => {
                                    Swal.fire(
                                        'Cliente eliminado',
                                        'Se ha eliminado con exito',
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
                                            title: "No pudo realizar esta acción",
                                            showConfirmButton: true,
                                        })
                                    }
                                })
                        }
                    })
                },

                mostrarCliente(cliente) {

                    this.urlCliente = this.url
                    this.firstNameEdit = cliente.firstName
                    this.lastNameEdit = cliente.lastName
                    this.emailEdit = cliente.email
                    this.IdUrlCliente = cliente._links.self.href

                },

                editarCliente() {

                    this.clienteEditado = {
                        firstName: this.firstNameEdit,
                        lastName: this.lastNameEdit,
                        email: this.emailEdit
                    }

                    Swal.fire({
                        title: '¿Desea editar cliente?',
                        text: "Al confirmar, no podrá revertir los cambios",
                        icon: 'question',
                        showCancelButton: true,
                        confirmButtonColor: '#3085d6',
                        cancelButtonColor: '#d33',
                        confirmButtonText: 'Editar cliente'
                    }).then((result) => {
                        if (result.isConfirmed) {
                            axios.patch(this.IdUrlCliente, this.clienteEditado)
                                .then(response => {
                                    Swal.fire(
                                        'Cliente editado',
                                        'Se ha modificado con exito',
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
                                            title: "No pudo realizar el cambio",
                                            showConfirmButton: true,
                                        })
                                    }
                                })
                        }
                    })
                },

                addLoans() {

                        Swal.fire({
                            title: '¿Desea agregar el préstamo?',
                            text: "Al confirmar, no podrá revertir los cambios",
                            icon: 'question',
                            showCancelButton: true,
                            confirmButtonColor: '#3085d6',
                            cancelButtonColor: '#d33',
                            confirmButtonText: 'Agregar'
                        }).then((result) => {
                            if (result.isConfirmed) {
                                axios.post('/api/loans/create', {
                                    "name": `${this.type}`,
                                    "maxAmount": `${this.maxAmount}`,
                                    "payments": [`${this.payments}`]
                                })
                                    .then(response => {
                                        Swal.fire(
                                            'Préstamo creado',
                                            'Se ha creado con exito',
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
                                                title: "No pudo realizar esta acción",
                                                showConfirmButton: true,
                                            })
                                        }
                                    })
                            }
                        })
                        console.log([this.payments])
                },

            },


                computed: {




                }




            }).mount('#app')