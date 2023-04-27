<template>
    <div class="mainContainer">

        <slot></slot>


        <footer class="fixed-footer mt-4 pt-5">
        <div class="text-center fixed-footer-bg border-top d-flex footer-row justify-content-around mt-3 pt-3 px-3"
            style="position: fixed; bottom: 0; width: 100%;background: white; margin-left: 0;">
            <router-link :to="{name:'Authuser'}" class="defaltColor navLink">
                <i class="fa-duotone fa-house"></i>
                <!-- <img class="footer-img" :src="$asseturl+'img/home.png'" alt="image1"> -->
                <p>Home</p>
            </router-link>

            <router-link :to="{name:'team'}" class="defaltColor navLink">
                <!-- <img class="footer-img" :src="$asseturl+'img/5t.png'" alt="image1"> -->
                <i class="fa-solid fa-users-medical"></i>
                <p>team</p>
            </router-link>
            <router-link :to="{name:'Earning'}" class="defaltColor navLink">
                <!-- <img class="footer-img" :src="$asseturl+'img/2ee.png'" alt="image1"> -->
                <i class="fa-duotone fa-list-check"></i>
                <p>Earnings</p>
            </router-link>
            <router-link :to="{name:'package'}" class="defaltColor navLink">
                <!-- <img class="footer-img" :src="$asseturl+'img/1ss.png'" alt="image1"> -->
                <i class="fa-duotone fa-cube"></i>
                <p>Plan</p>
            </router-link>
            <router-link :to="{name:'account'}" class="defaltColor navLink">
                <!-- <img class="footer-img" :src="$asseturl+'img/4mm.png'" alt="image1"> -->
                <i class="fa-duotone fa-user"></i>
                <p>account</p>
            </router-link>


        </div>
    </footer>




                <!-- <div data-v-57e81fe8="" data-v-37556d49="" class="u-tabbar" style="margin-top: 100px;">
                        <div data-v-57e81fe8="" class="tabbar">

                            <div data-v-57e81fe8="" class="tabbar_item text-center">
                                <router-link :to="{name:'Authuser'}" >
                                    <i class="fa-solid fa-gauge"></i> <br/>
                                    <font style="vertical-align: inherit;">Home</font>
                                </router-link>
                            </div>

                            <div data-v-57e81fe8="" class="tabbar_item text-center">
                                <router-link :to="{name:'Packages'}" >
                                    <i class="fa-solid fa-truck-fast"></i> <br/>
                                    <font style="vertical-align: inherit;">Packages</font>
                                </router-link>
                            </div>

                            <div data-v-57e81fe8="" class="tabbar_item text-center" style="padding: 5px 7px;position:relative;    width: 52px;">
                                <router-link :to="{name:'earning'}" class="taskButton">
                                    <i class="fa-solid fa-earth-americas"></i> <br/>
                                    <font style="vertical-align: inherit;">Earning</font>
                                </router-link>
                            </div>

                            <div data-v-57e81fe8="" class="tabbar_item text-center">
                                <a :href="$asseturl+''" >
                                    <i class="fa-solid fa-mobile-screen-button"></i> <br/>
                                    <font style="vertical-align: inherit;">App</font>
                                </a>
                            </div>

                            <div data-v-57e81fe8="" class="tabbar_item text-center">
                                <router-link :to="{name:'Useraccount'}" >
                                    <i class="fa-solid fa-user-secret"></i> <br/>
                                    <font style="vertical-align: inherit;">Me</font>
                                </router-link>
                            </div>





                        </div>
                    </div> -->
                    <Preload :Isactive="isActive"/>
                </div>




</template>
<script>
  export default {

    created() {
                this.createlink('frontend/css/bootstrap.min.css');
        this.createlink('css/style.css?ver=1.0.3');
        this.createlink('frontend/css/font-awesome.min.css');

        this.createscript('frontend/js/bootstrap.bundle.min.js');
        this.createscript('frontend/js/bootstrap.min.js');
        this.checkbalance();




    },
    data(){
        return {
            isActive:false

        }},
    watch: {
        '$route': {
            handler(newValue, oldValue) {
                window.scrollTo(0,0);
                this.getData();
                this.balanceshow = false
            },
            deep: true
        }
    },
    mounted() {
        this.getData();

    },
    methods: {

        async getData() {
            this.isActive = true

        var resN = await this.callApi('get',`/api/admin/setting`,[])
        var id = localStorage.getItem('userid');
        var res = await this.callApi('get', `/api/admin/user/${id}`, []);


        this.$store.commit('setUpdateSetting', resN.data)
        this.$store.commit('setFrontUpdateUser', res.data)
        this.isActive = false

        },





        createlink(url=''){
            let recaptchaScript = document.createElement('link')
            recaptchaScript.setAttribute('href', this.$asseturl+url)
            recaptchaScript.setAttribute('rel', 'stylesheet')
            document.head.appendChild(recaptchaScript)
        },
        createscript(url=''){
            let recaptchaScript = document.createElement('script')
            recaptchaScript.setAttribute('src', this.$asseturl+url)
            document.body.appendChild(recaptchaScript)
        }
    }
  }
</script>
<style>

.surePopup {
    position: fixed;
    width: 100%;
    height: 100vh;
    background: #00000080;
    z-index: 999;
    left: 0;
    top: 0;
}

.uni-modal {
    position: fixed;
    z-index: 999;
    width: 80%;
    max-width: 300px;
    top: 50%;
    left: 50%;
    -webkit-transform: translate(-50%,-50%);
    transform: translate(-50%,-50%);
    background-color: #fff;
    text-align: center;
    border-radius: 3px;
    overflow: hidden
}
.uni-modal__bd {
    padding: 1.3em 1.6em 1.3em;
    min-height: 40px;
    font-size: 15px;
    line-height: 1.4;
    color: #999;
    max-height: 400px;
    overflow-x: hidden;
    overflow-y: auto;
}
.uni-modal__bd, .uni-modal__title {
    word-wrap: break-word;
    word-break: break-all;
    white-space: pre-wrap;
}
.uni-modal__ft {
    position: relative;
    line-height: 48px;
    font-size: 18px;
    display: -webkit-box;
    display: -webkit-flex;
    display: flex;
}
.uni-modal__btn {
    display: block;
    -webkit-box-flex: 1;
    -webkit-flex: 1;
    flex: 1;
    color: #3cc51f;
    text-decoration: none;
    -webkit-tap-highlight-color: rgba(0,0,0,0);
    position: relative;
    cursor: pointer;
}

/* .form-control {
    border: 1px solid #df2e2e !important;
    color: #f71a1a !important;
    font-weight: 500 !important;
    box-shadow: 0px 1px 7px #000000 !important;
}
.form-control:focus {
    outline: 0 !important;
    box-shadow: 0 0 0 0px rgb(253 191 81 / 62%) !important;
    border: 1px solid #b18218 !important;
} */
.tabbar {
    display: flex;
    justify-content: space-around;
    align-items: center;
    box-shadow: -5px 3px 5px 4px #00000069;
    margin-top: 25px;
    position: fixed;
    bottom: 0;
    width: 100%;
    background: white;
}
.tabbar_item {
    padding: 5px 11px;
    /* box-shadow: 0px 0px 0px 1px #00000026; */
}

.taskButton{
    position: absolute;
    width: 66px;
    left: -10px;
    top: -46px;
    border: 1px solid #00000033;
    border-top-right-radius: 35%;
    border-top-left-radius: 35%;
    height: 80px;
    background: white;
    color: #f93c3c;
}

.col-6.amount_item span {
  border: 2px solid  #e831b8;
  display: block;
  text-align: center;
  margin: 6px 0px;
  padding: 4px 3px;
  cursor: pointer;
}
input.money-btn {
    border: 1px solid red;
    color: red !important;
}
button.money-btn {
    padding: 1px 20px;
    margin: 11px 0px;
    font-size: 23px;
    background: #168080;
    color: white;
    width: 100%;
    border-radius: 21px;
}
section.intro.profileBg.mb-5,.layout-content {
    width: 90%;
    margin: 42px auto;
}
section.intro.profileBg.mb-5 {
    padding: 35px 0px;
}


.navLink i{
    font-size: 22px;
}

</style>
