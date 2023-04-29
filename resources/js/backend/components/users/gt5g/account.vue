<template>
    <div>


    <main class="main-bg-absulate" style="background-image: url(/img/earnings.png);">

<div class=" bg-white mx-4 px-2 shadow-lg">
    <div class="d-flex gap-4 justify-content-between ms-0 py-1 w-50 pb-3">
        <div>
            <img width="90px" :src="$asseturl+'img/logo.jpg'" alt="">
        </div>
        <div>
            <p class="mb-0 py-2">{{ row.user.mobile }}</p>
            <p class="mb-0 py-2">UID: {{ row.user.username }}</p>
        </div>
    </div>
    <div class="border-top d-flex justify-content-around lh-1 pt-4">
        <div class="text-center">
            <p class="fw-bold mb-0 pb-2 defaltColor">{{ parseFloat(row.user.balance).toFixed(2) }}</p>
            <p>Balance</p>
        </div>
        <div class="text-center">
            <p class="fw-bold mb-0 pb-2 defaltColor">{{ parseFloat(levelTeam.reacharge).toFixed(2) }}</p>
            <p>Promotion</p>
        </div>
        <div class="text-center">
            <p class="fw-bold mb-0 pb-2 defaltColor">{{ parseFloat(levelTeam.purchase).toFixed(2) }}</p>
            <p>Investment</p>
        </div>

    </div>

    <div class="d-flex justify-content-between py-4 ">


        <router-link :to="{name:'withdraw'}" class="recharge-flex defaltColor">
            <!-- <img :src="$asseturl+'img/11111.png'" alt=""> -->
            <i class="fa-solid fa-arrow-up-from-bracket" style="    font-size: 25px;"></i>
            <p class="mb-0">Withdrawal</p>
        </router-link>

        <router-link :to="{name:'Recharge'}" class="recharge-flex defaltColor">
            <!-- <img :src="$asseturl+'img/11111.png'" alt=""> -->
            <i class="fa-solid fa-bolt" style="    font-size: 25px;"></i>
            <p class="mb-0">Recharge</p>
        </router-link>

        <!-- <router-link :to="{name:'treasure'}" class="recharge-flex defaltColor">
            <img :src="$asseturl+'img/11111.png'" alt="">
            <p class="mb-0">Treasure</p>
        </router-link> -->
    </div>

</div>


<div class="mx-4 my-3 py-2 shadow-lg rounded-3 defaltColorBg ">
    <router-link :to="{name:'banlance'}" class="mx-3 whiteColor">
        <!-- <img :src="$asseturl+'img/book.126a5a8e.png'" alt=""> -->
        <i class="fal fa-box-usd"></i>
        <p class="d-inline fw-bold mb-0 ms-1">Balance Record</p>
    </router-link>
</div>

<div class="mx-4 my-3 py-2 shadow-lg rounded-3 defaltColorBg ">
    <router-link :to="{name:'peraccpass'}"  class="mx-3 whiteColor">
                <!-- <img :src="$asseturl+'img/book.126a5a8e.png'" alt=""> -->
                <i class="fas fa-users-cog"></i>
        <p class="d-inline fw-bold mb-0 ms-1">Personal</p>
    </router-link>

</div>
<div class="mx-4 my-3 py-2 shadow-lg rounded-3 defaltColorBg ">
    <router-link :to="{name:'RechargeRecord'}"  class="mx-3 whiteColor">
                <!-- <img :src="$asseturl+'img/book.126a5a8e.png'" alt=""> -->
                <i class="fas fa-file-invoice-dollar"></i>
        <p class="d-inline fw-bold mb-0 ms-1">Recharge Record</p>
    </router-link>

</div>
<div class="mx-4 my-3 py-2 shadow-lg rounded-3 defaltColorBg ">
    <router-link :to="{name:'WithdrawalRecord'}"  class="mx-3 whiteColor">
                <!-- <img :src="$asseturl+'img/book.126a5a8e.png'" alt=""> -->
                <i class="fas fa-file-invoice-dollar"></i>
        <p class="d-inline fw-bold mb-0 ms-1">Withdrawal Record</p>
    </router-link>

</div>

<div class="mx-4 my-3 py-2 shadow-lg rounded-3 defaltColorBg ">
    <router-link :to="{name:'aboutus'}"  class="mx-3 whiteColor">
                <!-- <img :src="$asseturl+'img/book.126a5a8e.png'" alt=""> -->
        <i class="fas fa-address-card"></i>
        <p class="d-inline fw-bold mb-0 ms-1">About Us</p>
    </router-link>
</div>
<div class="mx-4 my-3 py-2 shadow-lg rounded-3 defaltColorBg ">
    <router-link :to="{name:'share'}"  class="mx-3 whiteColor">
                <!-- <img :src="$asseturl+'img/book.126a5a8e.png'" alt=""> -->
        <i class="fas fa-share"></i>
        <p class="d-inline fw-bold mb-0 ms-1">Invite</p>
    </router-link>
</div>

<div class="mx-4 my-3 py-2 shadow-lg rounded-3 defaltColorBg ">
    <a :href="$asseturl+'SUN_ENERGY.apk'"  class="mx-3 whiteColor">
                <!-- <img :src="$asseturl+'img/book.126a5a8e.png'" alt=""> -->
        <i class="fas fa-download"></i>
        <p class="d-inline fw-bold mb-0 ms-1">Download APP</p>
    </a>

</div>


<div v-if="settings.telegroup" class="mx-4 my-3 py-2 shadow-lg rounded-3 defaltColorBg ">
    <a :href="settings.telegroup"  class="mx-3 whiteColor">
        <i class="fab fa-telegram"></i>
        <p class="d-inline fw-bold mb-0 ms-1">Official Telegram Group</p>
    </a>
</div>


<div v-if="settings.telesupport1" class="mx-4 my-3 py-2 shadow-lg rounded-3 defaltColorBg ">
    <a :href="settings.telesupport1"  class="mx-3 whiteColor">
        <i class="fab fa-telegram"></i>
        <p class="d-inline fw-bold mb-0 ms-1">Official Telegram Channel</p>
    </a>
</div>


<div v-if="settings.telesupport2" class="mx-4 my-3 py-2 shadow-lg rounded-3 defaltColorBg ">
    <a :href="settings.telesupport2"  class="mx-3 whiteColor">
        <i class="fas fa-user-headset"></i>
        <p class="d-inline fw-bold mb-0 ms-1">Customer Service</p>
    </a>
</div>


<div v-if="settings.telesupport3" class="mx-4 my-3 py-2 shadow-lg rounded-3 defaltColorBg ">
    <a :href="settings.telesupport3"  class="mx-3 whiteColor">
        <i class="fas fa-user-headset"></i>
        <p class="d-inline fw-bold mb-0 ms-1">Customer Service</p>
    </a>
</div>











<div class="mx-4 my-3 py-2 shadow-lg rounded-3 defaltColorBg  mb-5">
    <router-link :to="{name:'logout'}"  class="mx-3 whiteColor">
               <!--  <img :src="$asseturl+'img/book.126a5a8e.png'" alt=""> -->
                <i class="fa-solid fa-right-from-bracket"></i>
        <p class="d-inline fw-bold mb-0 ms-1">Log Out</p>
    </router-link>

</div>



</main>

    </div>
</template>




<script>


export default {

    data(){
        return {
            levelTeam: {
                level1: {},
                level2: {},
                level3: {},
            },
        }
    },
    methods: {
        async getData(){
            var id = localStorage.getItem('userid');
            var res = await this.callApi('get', `/api/user/multi/refer?id=${id}`, []);
            this.levelTeam = res.data;
        },
    },
    mounted() {
        this.getData();
    },
}
</script>
