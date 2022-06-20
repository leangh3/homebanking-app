Vue.createApp({
    data() {
        return {
            msg: "Hello vue",
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            passwordlogin: '',
            emaillogin: '',
            checkboxChecked: ''
        }
    },


    created() {


    },

    methods: {

        logIn() {

            axios.post('/api/login', `email=${this.emaillogin}&password=${this.passwordlogin}`, {
                    headers: {
                        'content-type': 'application/x-www-form-urlencoded'
                    }
                })
                .then(response => {
                    if (response.status === 200) {
                        const Toast = Swal.mixin({
                            toast: true,
                            position: 'top-end',
                            showConfirmButton: false,
                            timer: 3000,
                            timerProgressBar: true,
                            didOpen: (toast) => {
                                toast.addEventListener('mouseenter', Swal.stopTimer)
                                toast.addEventListener('mouseleave', Swal.resumeTimer)
                            }
                        })
                        Toast.fire({
                            icon: 'success',
                            title: 'Logueado con éxito'
                        })
                        setTimeout(function () {
                            window.location.href = "./accounts.html";
                        }, 2000)
                    }

                })
                .catch(function (error) {
                    if (error.response.status == 401) {
                        Swal.fire({
                            position: 'center',
                            icon: 'error',
                            title: "Problema al autenticarse: email o password incorrectos",
                            showConfirmButton: true,
                        })
                    }
                })
        },

        registerlogin() {

            axios.post('/api/clients', `firstName=${this.firstName}&lastName=${this.lastName}&email=${this.email}&password=${this.password}`, {
                headers: {
                    'content-type': 'application/x-www-form-urlencoded'
                }
            }).then(response => {
                if (response.status === 201) {
                    Swal.fire({
                        position: 'center',
                        icon: 'success',
                        title: 'Registrado con éxito. Ingresando',
                        showConfirmButton: false,
                        timer: 1500
                    })
                }
                axios.post('/api/login', `email=${this.email}&password=${this.password}`, {
                    headers: {
                        'content-type': 'application/x-www-form-urlencoded'
                    }
                }).then(response => {
                    setTimeout(function () {
                        window.location.href = "./accounts.html";
                    }, 2000)
                })
            }).catch(function (error) {
                if (error.response.data == "Missing data" && error.response.status == 403) {
                    Swal.fire({
                        position: 'center',
                        icon: 'warning',
                        title: 'Error al registrarse: Faltan datos',
                        showConfirmButton: true,
                    })
                }
                if (error.response.data == "The email is not valid" && error.response.status == 403) {
                    Swal.fire({
                        position: 'center',
                        icon: 'warning',
                        title: 'Error al registrarse: El mail no es válido',
                        showConfirmButton: true,
                    })
                }
                if (error.response.data == "Email already in use" && error.response.status == 403) {
                    Swal.fire({
                        position: 'center',
                        icon: 'warning',
                        title: 'Error al registrarse: El mail ya está en uso',
                        showConfirmButton: true,
                    })
                }
                if (error.response.data == "Password to short: At least 6 characters" && error.response.status == 411) {
                    Swal.fire({
                        position: 'center',
                        icon: 'warning',
                        title: 'Error al registrarse: La contraseña debe tener al menor 6 caracteres',
                        showConfirmButton: true,
                    })
                }
                if (error.response.data == "Password to long: cannot be longer than 15 characters" && error.response.status == 411) {
                    Swal.fire({
                        position: 'center',
                        icon: 'warning',
                        title: 'Error al registrarse: La contraseña no puede tener mas de 15 caracteres',
                        showConfirmButton: true,
                    })
                }
            })

        },

        acceptTyc() {

            const checkbox = document.querySelector("#registerCheck")
            this.checkboxChecked = checkbox.checked
        },

        changeLogInToRegister() {
            let claseActiva = document.querySelector("#tab-login")
            let claseNoActiva = document.querySelector("#tab-register")
            let pillsLogin = document.querySelector("#pills-login")
            let pillsRegister = document.querySelector("#pills-register")

            if (claseActiva.ariaSelected && claseActiva.classList.contains("active") && pillsLogin.classList.contains("show", "active")) {
                claseActiva.setAttribute('aria-selected', false)
                claseNoActiva.setAttribute('aria-selected', true)
                claseActiva.classList.remove("active")
                claseNoActiva.classList.add("active")
                pillsLogin.classList.remove("show", "active")
                pillsRegister.classList.add("show", "active")
            }
        },

    },

    computed: {


        

    }




}).mount('#app')


const loader = document.querySelector(".newtons-cradle")
loader.classList.add("hidden")