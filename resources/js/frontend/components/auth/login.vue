<template>

<main class="main-bg-absulate" style="background-image: url(img/login.png);">

<form @submit.prevent='login' class="bg-white mx-4 shadow-lg ">
    <div class="py-3 text-center">
        <!-- <img :src="$asseturl+'img/logo.86599c07.png'" alt="" class="img-fluid w-50"> -->
        <h2 style="font-size: 60px;
    font-weight: bolder;
    font-family: math;
    color: var(--defaltColor);">SUN ENERGY</h2>
        <p class="fw-bold mb-0 py-2">Welcome to login</p>
    </div>

    <div>
        <div class="flex-nowrap input-group px-3 mb-3">
            <span class="input-group-text rounded-0 borderleft" id="addon-wrapping"><img :src="$asseturl+'img/phone.png'"
                    class="icon"></span>
            <input type="tel" class="form-control rounded-0 borderright" placeholder="+880" v-model="form.mobile" aria-label="Username"
                aria-describedby="addon-wrapping">
        </div>
        <div class="flex-nowrap input-group px-3">
            <span class="input-group-text rounded-0 borderleft" id="addon-wrapping"><img :src="$asseturl+'img/pass.png'"
                    class="icon"></span>
            <input type="password" class="form-control rounded-0 borderright" placeholder="password"  v-model="form.password" aria-label="Username"
                aria-describedby="addon-wrapping">
        </div>
    </div>
    <div class="px-4 py-1 text-end w-100">
        <a class="text-dark" href="">Forget Password?</a>
    </div>

    <div class="mt-4 text-center w-100">
        <button class="btn fw-bold mb-4 mt-2 rounded-0 text-white" type="submit" style="background-color: var(--defaltColor);  width: 93%;">
            <span  v-if="loadLogin">Please Wait..</span>
            <span  v-else>Login</span>
        </button>
        <router-link :to="{name:'register'}" class="btn fw-bold mb-5 mt-2 rounded-0"
            style="background: #f1f1f1; color: #333; border: 2px solid var(--defaltColor);  width: 93%;">Register</router-link>
    </div>
</form>

<Preload :Isactive="isActive"/>
    <Message :Isactive="Messageactive" :Message="Message"/>

</main>

    <!-- <section id="bigbg">
            <main class="container" style="">
                        <div data-v-c1501c16="">
                            <div data-v-c1501c16="" class="form-container" style="padding-bottom: 15rem;">
                                <form data-v-c1501c16="" style="padding-top: 6rem;" @submit.prevent='login'>

                                    <span data-v-c1501c16="" class="login100-form-title pt-3 pb-3" style="font-size: 25px;"> Welcome To Site </span>
                                    <div data-v-c1501c16="">
                                        <div data-v-c1501c16="" data-validate="Enter username" class="wrap-input100 validate-input d-flex align-items-center">
                                            <i class="fas fa-mobile-alt loginIcon"></i>
                                            <input data-v-c1501c16="" type="text" name="mobile" v-model="form.mobile" placeholder="Mobile Number" class="input100" /></div>
                                        <div data-v-c1501c16="" data-validate="Enter password" class="wrap-input100 validate-input d-flex align-items-center">
                                            <i class="fas fa-lock loginIcon"></i>
                                            <input data-v-c1501c16="" type="password" name="pass" v-model="form.password"  placeholder="Password" class="input100" />
                                        </div>
                                    </div>
                                    <div data-v-c1501c16="" class="container-login100-form-btn pt-5">
                                        <button data-v-c1501c16="" type="submit" class="login100-form-btn">
                                            <span  v-if="loadLogin">{{ $t('Loader.value') }}</span>
                                            <span  v-else>{{ $t('Login.value') }}</span>
                                        </button>
                                    </div>
                                    <div data-v-c1501c16="" class="text-center p-t-90">

                                        <router-link :to="{name:'register'}" data-v-c1501c16=""  class="text95">
                                            Register
                                        </router-link>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </main>
    </section>
 -->



</template>

<script>
export default {

    created() {

        this.addcountry();
        this.countryList();
    },

    data() {
        return {
            isActive:false,
            PackPurchase:false,
            Messageactive:false,
            Message:'',


            emailLogin: "",
            passwordLogin: "",
            emailReg: "",
            passwordReg: "",
            confirmReg: "",
            emptyFields: false,
            form: {
                mobile: '',
                password: ''
            },
            country: '+880',
            mobileCode: '',
            errors: {},
            codes: {},
            loadLogin: false
        }
    },
    methods: {


        async countryList() {
            var res = await this.callApi('get', `${this.$asseturl}CountryCodes.json`, []);
            // console.log(res)
            this.codes = res.data
        },
        async addcountry() {
            this.mobileCode = this.country
        },

        login() {
            this.isActive =true;

            if (this.form.mobile == "" || this.form.password == "") {
                this.emptyFields = true;
            } else {

                axios.post('/login', this.form)
                    .then(res => {


                        if (res.data == 0) {
                            this.isActive = false
                            this.notifiyGlobal('Please Enter Valid Phone Number and Password');
                        } else if (res.data == 422) {
                            this.isActive = false
                            this.notifiyGlobal('Your Account Has Been Banded!');
                        } else if (res.data == 444) {
                            this.isActive = false
                            this.notifiyGlobal('You Cant Login Multiple account same device!');
                            localStorage.setItem('dmdevice', 1)
                        } else {




                            localStorage.setItem('dmdevice', 1)
                            User.responseAfterLogin(res)
                            if (res.data.role == 'admin') {
                                window.location.href = '/dashboard/adddmin'
                            } else {
                                window.location.href = '/dashboard/user'
                            }
                            this.isActive = false
                            this.notifiyGlobal('Signed in successfully Complete');

                            // this.$router.push({name: 'home'})
                            // window.location.href = '/dashboard'

                        }
                    })
                    .catch(error => this.errors = error.response.data.errors)



            }





        },


        blur(id) {
            const child = document.getElementById(id);
            if (this.form[id] == '') {
                child.parentNode.classList.remove("blursuccess");
                child.parentNode.classList.add("blurerror");
            } else {
                child.parentNode.classList.remove("blurerror");
                child.parentNode.classList.add("blursuccess");
            }

        },




    }
}
</script>

<style lang="css" scoped>





.languagechange {
    width: 100px;
    float: right;
}

section.vh-100 {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 100%;
}

.blurerror input {
    border: 1px solid red !important;
}

.blurerror label {
    color: red !important;
}

.blursuccess input {
    border: 1px solid green !important;
}

.blursuccess label {
    color: green !important;
}

.divider:after,
.divider:before {
    content: "";
    flex: 1;
    height: 1px;
    background: #eee;
}

*,
*:focus {
    outline: none
}

/* .form{
  width: 500px;
  margin: 0 auto;
  margin-top: 150px;
  font-family: sans-serif;
  background: #fff
} */
.form-item {
    position: relative;
    margin-bottom: 15px
}

.form-item input {
    display: block;
    width: 100%;
    height: 40px;
    background: transparent;
    border: solid 1px #ccc;
    transition: all .3s ease;
    padding: 0 15px
}

.form-item input:focus {
    border-color: blue
}

.form-item label {
    position: absolute;
    cursor: text;
    z-index: 2;
    top: 13px;
    left: 10px;
    font-size: 12px;
    font-weight: bold;
    background: #fff;
    padding: 0 10px;
    color: #999;
    transition: all .3s ease
}

.form-item input:focus+label,
.form-item input:valid+label {
    font-size: 11px;
    top: -5px
}

.form-item input:focus+label {
    color: blue
}
</style>

