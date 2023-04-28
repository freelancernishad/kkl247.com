<template>
    <div>



    <main>
        <header>
            <div id="carouselExampleControls" class="carousel slide" data-bs-ride="carousel">
                <div class="carousel-inner">
                    <div class="carousel-item active">
                        <img :src="$asseturl+'img/sl1.jpeg'" class="d-block w-100" alt="Slide 1">
                    </div>
                    <div class="carousel-item">
                        <img :src="$asseturl+'img/sl2.jpeg'" class="d-block w-100" alt="Slide 2">
                    </div>
                    <div class="carousel-item">
                        <img :src="$asseturl+'img/sl3.jpeg'" class="d-block w-100" alt="Slide 2">
                    </div>
                </div>
                <button class="carousel-control-prev " type="button" data-bs-target="#carouselExampleControls"
                    data-bs-slide="prev">
                    <span class="carousel-control-prev-icon bg-dark" aria-hidden="true"></span>
                    <span class="visually-hidden">Previous</span>
                </button>
                <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleControls"
                    data-bs-slide="next">
                    <span class="carousel-control-next-icon bg-dark" aria-hidden="true"></span>
                    <span class="visually-hidden">Next</span>
                </button>
            </div>


        </header>


        <div class="d-flex marquee">
            <marquee>{{ settings.notice }}</marquee>
            <span>Notice</span>
        </div>



        <section class="d-flex gap-2 justify-content-between mb-2 mt-3">

            <router-link :to="{name:'Recharge'}" class="homeIcon text-center w-25 defaltColor">

                <i class="fa-solid fa-bolt"></i>
                <!-- <img :src="$asseturl+'img/5.1f17c1e9.png'" alt="" style="width: 36px; height: 36px;"> -->
                <p class="mb-0">Recharge</p>
            </router-link>

            <router-link :to="{name:'withdraw'}" class="homeIcon text-center w-25 defaltColor">
                <!-- <img :src="$asseturl+'img/1.469498f5.png'" alt="" style="width: 36px; height: 36px;"> -->
                <i class="fa-solid fa-arrow-up-from-bracket"></i>
                <p class="mb-0">Withdraw</p>
            </router-link>
            <router-link :to="{name:'noreward'}" class="homeIcon text-center w-25 defaltColor">
                <!-- <img :src="$asseturl+'img/3.d052248f.png'" alt="" style="width: 36px; height: 36px;"> -->
                <i class="fa-solid fa-question"></i>
                <p class="mb-0">How do</p>
            </router-link>
            <span @click="dailyCheckIn" class="homeIcon text-center w-25 defaltColor">
                <!-- <img :src="$asseturl+'img/5.1f17c1e9.png'" alt="" style="width: 36px; height: 36px;"> -->
                <i class="fa-solid fa-check-to-slot"></i>
                <p class="mb-0">Check in</p>
            </span>
        </section>



        <section class="">
            <div class="row">
                <div class="col-6 col-md-6" v-for="packag in packages" :key="packag.id">
                    <div class="mt-3 p-2 shadow-lg text-center bg-white">
                    <p class="fw-bold  title-des">{{ packag.name }}</p>
                    <img :src="packag.image" class="img-fluid w-100">

                    <div class="d-flex justify-content-between  p-1">
                        <p style=" margin: 0;font-weight: 500;color: rgb(102, 102, 102);">Invest Price</p>
                        <p style=" margin: 0;font-weight: 500;color: #666666;">{{ packag.packagePrice }}</p>
                    </div>
                    <div class="d-flex justify-content-between p-1">
                        <p style=" margin: 0;font-weight: 500;color: #666666;">Day Income:</p>
                        <p style=" margin: 0;font-weight: 500;color: var(--defaltColor);">{{ packag.packageEarn }}</p>
                    </div>
                    <div class="d-flex justify-content-between  p-1">
                        <p style=" margin: 0;font-weight: 500;color: rgb(102, 102, 102);">validity period</p>
                        <p style=" margin: 0;font-weight: 500;color: rgb(102, 102, 102);">{{ packag.packageDuration }}</p>
                    </div>
                    <button class="btn fw-bold rounded-0 text-white w-100 defaltColorBg" style="background-color: #0036ca;" @click="upgrade(packag)">Upgrade Now</button>
                    </div>
                </div>
            </div>
        </section>

        <!-- <div class="mt-5">
            <img width="100%" :src="$asseturl+'img/partner.jpeg'" alt="">
        </div> -->



    </main>

    <Popups :PackPurchase="PackPurchase" :Title="PopupTitle" @event-close="ClosePopup" @event-submit="purchaseComplete"/>
    <Preload :Isactive="isActive"/>
    <Message :Isactive="Messageactive" :Message="Message"/>





    </div>
</template>

<script>
export default {
    data(){
        return {
            isActive:false,
            PackPurchase:false,
            Messageactive:false,
            Message:'',
            packages:{},
            datas:{},
            PopupTitle:'Are you sure to purchase this product?',
        }
    },
    methods: {

        async getPackages(){
            this.isActive =true;
            var res = await this.callApi('get',`/api/get/packages`,[]);
            this.packages = res.data
            this.isActive =false;
        },

        ClosePopup(){
            this.PackPurchase = false;
        },
        async upgrade(packag){

            this.PackPurchase = true;
            this.PopupTitle = 'Are you sure to purchase this product?';
            this.datas = {"packag":packag};
        },

        async purchaseComplete(){
            this.PackPurchase = false;
            this.isActive =true;
            var packag = this.datas.packag;
            var userid = localStorage.getItem('userid');
                var res = await this.callApi('post',`/api/package/upgrade/${userid}`,packag)

                if(res.data==1){
                    this.notifiyGlobal('Purchase Success')
                }else if(res.data==44){
                    this.notifiyGlobal('You dont have enough balance')
                }

                this.isActive =false;
        },






        async dailyCheckIn(){
            this.isActive =true;
            var userid = localStorage.getItem('userid');
            var res = await this.callApi('post',`/api/daily/check/in?user_id=${userid}`,[]);
            this.isActive =false;
            if(res.data==1){
                this.notifiyGlobal('Daily checked in completed')
            }else{
                this.notifiyGlobal('Come Back Tomorrow')
            }

        },






    },
    mounted() {

        this.getPackages();


    },
}
</script>

<style>


.d-flex.marquee {
    border: 2px solid var(--defaltColor);
    margin: 18px 21px;
}

.d-flex.marquee span {
    background: var(--defaltColor);
    padding: 5px 14px;
    color: white;
    font-weight: 700;
}

.d-flex.marquee marquee {
    padding: 5px 14px;
    background: var(--defaltColor);
    color: white;
}


.homeIcon i {
    background: linear-gradient(45deg, var(--defaltColor), #6a2222);
    color: white;
    width: 50px;
    height: 50px;
    display: flex;
    justify-content: space-around;
    align-items: center;
    font-size: 24px !important;
    border-radius: 50%;
    margin: 0 auto;
}
.homeIcon p {
    font-size: 13px;
}
</style>
