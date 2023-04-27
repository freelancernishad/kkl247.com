<template>


<main class="main-bg-absulate" style="background-image: url(img/login.png);">

<form @submit.prevent="register" class="bg-white mx-4 shadow-lg ">
    <div class="py-3 text-center">
        <!-- <img :src="$asseturl+'img/logo.86599c07.png'" alt="" class="img-fluid w-50"> -->
        <h2 style="font-size: 60px;
    font-weight: bolder;
    font-family: math;
    color: var(--defaltColor);">SUN ENERGY</h2>
        <p class="fw-bold mb-0 py-2">Welcome to Register</p>
    </div>

    <div>
        <div class="flex-nowrap input-group px-3 mb-3">
            <span class="input-group-text rounded-0 borderleft" id="addon-wrapping">
                <img :src="$asseturl+'img/phone.png'" class="icon"></span>
                <input type="tel" class="form-control rounded-0 borderright" placeholder="+880" aria-label="Username" minlength="10" maxlength="10" @keyup="checkstart" v-model="form.mobile"  aria-describedby="addon-wrapping">
        </div>
        <div class="flex-nowrap input-group px-3">
            <span class="input-group-text rounded-0 borderleft" id="addon-wrapping">
                <img :src="$asseturl+'img/pass.png'" class="icon"></span>
                <input type="password" class="form-control rounded-0 borderright" placeholder="password" v-model="form.password" aria-label="Username" aria-describedby="addon-wrapping">
        </div>
        <div class="flex-nowrap input-group px-3 py-3">
            <span class="input-group-text rounded-0 borderleft" id="addon-wrapping"><img :src="$asseturl+'img/download.png'"
                    class="icon"></span>
            <input type="text" class="form-control rounded-0 borderright" placeholder="Invite Code" v-model="form.ref_by" aria-label="Username"
                aria-describedby="addon-wrapping">
        </div>

<!--         
        <div class="d-flex gap-5">
            <div class="flex-nowrap input-group px-3">
                <span class="input-group-text rounded-0 borderleft" id="addon-wrapping"><img :src="$asseturl+'img/download.png'"
                        class="icon"></span>
                <input type="text" class="form-control rounded-0 borderright" placeholder="SMS Code" v-model="otp"
                    aria-label="Username" aria-describedby="addon-wrapping" required>
            </div>
            <div class="w-100">
                <button type="button" class="btn fw-bold  rounded-0" @click="sentOtp"
                    style="background: #f1f1f1; color: #333; border: 2px solid var(--defaltColor);  width: 93%;">{{ otpsent }}</button>
            </div>
        </div> -->


        <div class="d-flex gap-5 pt-3">
            <div class="flex-nowrap input-group px-3">
                <span class="input-group-text rounded-0 borderleft" id="addon-wrapping"><img :src="$asseturl+'img/download.png'"
                        class="icon"></span>
                <input type="text" class="form-control rounded-0 borderright" placeholder=" Code" v-model="captcha" aria-describedby="addon-wrapping">
            </div>
            <div class="w-100">
                <button  type="button" class="btn fw-bold  rounded-0"
                    style="background: #f1f1f1; color: #333; border: 2px solid var(--defaltColor);  width: 93%;">{{ genaratedCaptcha }}</button>
            </div>
        </div>


    </div>


    <div class="mt-4 text-center w-100">
        <button class="btn fw-bold mb-4 mt-2 rounded-0 text-white"
            style="background-color: var(--defaltColor);  width: 93%;">Register</button>
        <router-link :to="{ name: '/login' }" class="btn fw-bold mb-5 mt-2 rounded-0" style="background: #f1f1f1; color: #333; border: 2px solid var(--defaltColor);  width: 93%;">Login</router-link>
    </div>

</form>
<Preload :Isactive="isActive"/>
    <Message :Isactive="Messageactive" :Message="Message"/>
</main>


</template>
<script>
export default {
    created() {
        this.genaratedCaptcha = Math.floor(Math.random() * (9999 - 1111) + 1111);
        // if (User.loggedIn()) {
        //     this.$router.push({ name: 'home' })
        // }
        // localStorage.setItem('dmdevice',1)
        // console.log(this.$route.query.ref);
        if (this.$route.query.ref) {
            this.form.ref_by = this.$route.query.ref;
            this.refer = 1;
        } else {
            this.form.ref_by = "16346";
            this.refercheck();
        }
        this.form.country = "+880";
        this.countryList();
        this.addcountry();
    },
    data() {
        return {

            isActive:false,
            PackPurchase:false,
            Messageactive:false,
            Message:'',
            otp:'',


            btndis: true,
            captcha: "",
            otpsent: "Send",
            genaratedCaptcha: "",
            mobileCode: null,
            form: {
                country: null,
                name: "New Customer",
                username: null,
                mobile: null,
                password: null,
                password_confirmation: null,
                withdrawpass: "123456",
                ref_by: null,
            },
            usernameMatch: 1,
            refer: 0,
            errors: {},
            codes: {},
            showPassword: true,
            CshowPassword: true,
            WshowPassword: true,
        };
    },
    methods: {
        // setLang(){
        //     localStorage.setItem('language',this.$i18n.locale)
        // },


        checkstart(){
            if(this.form.mobile!=''){
                if(this.form.mobile.charAt(0)==1){
                }else{
                    this.form.mobile = '';
                    this.notifiyGlobal(`Mobile number must be start '1'`);
                }
            }
        },

        async sentOtp(){

            this.isActive = true
            if(this.form.mobile.length>10){
                this.isActive = false
                this.notifiyGlobal(`Mobile Number must be contain 10 digit`);
            }else{


                if(this.form.mobile.charAt(0)==1){
                    var res = await this.callApi('post',`/api/sent/otp?mobile=${this.form.mobile}`,[]);
                    this.isActive = false
                    this.otpsent ='Sent Again';

                    if(res.data=='cross limit'){
                        this.notifiyGlobal(`You can't sent any otp today!`);
                    }else if(res.data=='time not finished'){
                        this.notifiyGlobal(`Please Wait for sent again Otp`);
                    }else{

                        this.notifiyGlobal(`Otp Successfully sent you mobile number`);
                    }

                }else{
                    this.isActive = false
                    this.notifiyGlobal(`Mobile number must be start '1'`);
                }

        }


        },






        async usernamecheck() {
            if (this.form.username == "") {
                this.usernameMatch = 0;
            } else {
                var res = await this.callApi(
                    "get",
                    `/api/count/username/check?username=${this.form.username}`,
                    []
                );
                if (res.data == 0) {
                    this.usernameMatch = 2;
                } else {
                    this.usernameMatch = 1;
                }
            }
        },
        async countryList() {
            var res = await this.callApi(
                "get",
                `${this.$asseturl}CountryCodes.json`,
                []
            );
            // console.log(res)
            this.codes = res.data;
        },
        async addcountry() {
            // this.form.mobile = this.form.country
            this.mobileCode = this.form.country;
        },
        async refercheck() {
            if (this.form.ref_by == "") {
                this.refer = 0;
            } else {
                var res = await this.callApi(
                    "get",
                    `/api/count/username/check?username=${this.form.ref_by}`,
                    []
                );
                if (res.data == 0) {
                    this.refer = 2;
                } else {
                    this.refer = 1;
                }
            }
        },
      async  register() {
            this.isActive = true

            // var otpcheck = await this.callApi('post',`/api/check/otp?mobile=${this.form.mobile}&otp=${this.otp}`,[]);

            // if(otpcheck.data==0){
            //     this.isActive = false
            //     this.notifiyGlobal("Otp does not match!");
            // }else{





            // if(localStorage.getItem('dmdevice')){
            //     this.notifiyGlobal(`This device has already have an account!`);
            // }else{
            if (this.genaratedCaptcha === Number(this.captcha)) {
                // if(this.usernameMatch!=2){
                // this.notifiyGlobal('please Enter deferent username');
                // }else{
                if (this.refer != 1) {
                    this.notifiyGlobal("Opps,Refer code is Invalid");
                } else {
                    // if (this.form.password === this.form.password_confirmation) {
                        axios
                            .post("api/auth/register", this.form)
                            .then((res) => {
                                this.isActive = false
                                if (res.data == 422) {
                                    this.notifiyGlobal("This Phone Number Already Exist");
                                } else if (res.data == 444) {

                                    this.notifiyGlobal(
                                        `This device has already have an account!`
                                    );
                                    localStorage.setItem("dmdevice", 1);
                                } else {
                                    // console.log(res)
                                    if (res.status == 201) {
                                        this.notifiyGlobal("Registration Success");
                                        localStorage.setItem("dmdevice", 1);
                                        this.$router.push({ name: "/login" });
                                    } else {
                                        this.notifiyGlobal(
                                            "Something want wrong. Please Try again or contact with admin"
                                        );
                                    }
                                    // User.responseAfterLogin(res)
                                }
                                // console.log(res.data)
                                // User.responseAfterLogin(res)
                            })
                            .catch((error) => (this.errors = error.response.data.errors));
                    // } else {
                    //     this.notifiyGlobal(
                    //         "Password and Confirm password does not match"
                    //     );
                    // }
                }
                // }
            } else {
                this.isActive = false
                this.notifiyGlobal("Captcha does not match!");
            }
            // }
        // }
        },
    },
};
</script>
<style lang="css" scoped>
.languagechange {
    width: 100px;
    float: right;
}

button.button {
    padding: 7px 5px;
}
</style>
