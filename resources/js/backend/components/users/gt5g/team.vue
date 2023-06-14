<template>
    <div>

        <header class="header-text" style="background-color: var(--defaltColor);margin-bottom: -16px;">
        <p class="py-2 text-white"> Team </p>
    </header>

    <main class="main-bg-absulate">

        <div class="bg-white mx-4 px-4 text-center shadow-lg">
          <div class="d-flex gap-5 justify-content-between lh-1 py-3 text-start">
            <div class="w-50 text-start" >
                <p class="gray">Team Size</p>
                <p class="fs-5 fw-bold m-0">{{ team.total_member }}</p>
               </div>
               <div class="w-50 text-end" >
                <p class="gray">Total Income</p>
                <p class="fs-5 fw-bold m-0">{{ levelTeam.ToalEarn }}</p>
               </div>
          </div>

          <div class="border-top d-flex gap-5 justify-content-between lh-1 py-3 ">
            <div class="w-50 text-start">
                <p class="gray">Purchase commission</p>
                <p class="fs-5 fw-bold m-0">{{ levelTeam.ToalEarnPur }}</p>
               </div>
               <div class="w-50 text-end">
                <p class="gray">Promotion Income</p>
                <p class="fs-5 fw-bold m-0">{{ levelTeam.reacharge }}</p>
               </div>

          </div>

        </div>


        <div class="d-flex justify-content-around flex-wrap" >


        <div class="bg-white shadow-lg text-center topp" style="width: 96%;margin-top: 25px;">

            <div class="d-flex justify-content-between align-items-center border-bottom fw-bold mb-0 p-2" style="background-color: var(--defaltColor); color:var(--whiteColor)"  @click="levelVisibleFun('level1Visible')">
                <p class="m-0">Level 1</p>
                <i v-if="level1Visible" style="font-size: 20px;" class="fa-sharp fa-regular fa-angle-down"></i>
                <i v-if="!level1Visible" style="font-size: 20px;" class="fa-sharp fa-regular fa-angle-up"></i>
            </div>

            <div class="px-4" v-if="level1Visible" style="background-color: var(--defaltColor2); color:var(--whiteColor)">


            <div class="border-0 d-flex gap-5 justify-content-between lh-1 py-3 text-start topp">
                <div class="w-50 text-start" >
                    <p class="">Team Size</p>
                    <p class="fs-5 fw-bold m-0">{{ levelTeam.level1.length }}</p>
                </div>
                <div class="w-50 text-end" >
                    <p class="">Total Income</p>
                    <p class="fs-5 fw-bold m-0">{{ levelTeam.L1 }}</p>
                </div>
            </div>
            <router-link :to="{name:'teamdaily',query:{level:'Level1'}}" class="buttonDetails border-0">More details</router-link>
        </div>
        </div>



        <div class="bg-white shadow-lg text-center topp" style="width: 96%;margin-top: 25px;">

            <div class="d-flex justify-content-between align-items-center border-bottom fw-bold mb-0 p-2" style="background-color: var(--defaltColor); color:var(--whiteColor)"  @click="levelVisibleFun('level2Visible')">
                <p class="m-0">Level 2</p>
                <i v-if="level2Visible" style="font-size: 20px;" class="fa-sharp fa-regular fa-angle-down"></i>
                <i v-if="!level2Visible" style="font-size: 20px;" class="fa-sharp fa-regular fa-angle-up"></i>
            </div>

            <div class="px-4" v-if="level2Visible" style="background-color: var(--defaltColor2); color:var(--whiteColor)">


            <div class="border-0 d-flex gap-5 justify-content-between lh-1 py-3 text-start topp">
                <div class="w-50 text-start" >
                    <p class="">Team Size</p>
                    <p class="fs-5 fw-bold m-0">{{ levelTeam.level2.length }}</p>
                </div>
                <div class="w-50 text-end" >
                    <p class="">Total Income</p>
                    <p class="fs-5 fw-bold m-0">{{ levelTeam.L2 }}</p>
                </div>
            </div>
            <router-link :to="{name:'teamdaily',query:{level:'Level2'}}" class="buttonDetails border-0">More details</router-link>
        </div>
        </div>




        <div class="bg-white shadow-lg text-center topp" style="width: 96%;margin-top: 25px;">

            <div class="d-flex justify-content-between align-items-center border-bottom fw-bold mb-0 p-2" style="background-color: var(--defaltColor); color:var(--whiteColor)"  @click="levelVisibleFun('level3Visible')">
                <p class="m-0">Level 3</p>
                <i v-if="level3Visible" style="font-size: 20px;" class="fa-sharp fa-regular fa-angle-down"></i>
                <i v-if="!level3Visible" style="font-size: 20px;" class="fa-sharp fa-regular fa-angle-up"></i>
            </div>

            <div class="px-4" v-if="level3Visible" style="background-color: var(--defaltColor2); color:var(--whiteColor)">


            <div class="border-0 d-flex gap-5 justify-content-between lh-1 py-3 text-start topp">
                <div class="w-50 text-start" >
                    <p class="">Team Size</p>
                    <p class="fs-5 fw-bold m-0">{{ levelTeam.level3.length }}</p>
                </div>
                <div class="w-50 text-end" >
                    <p class="">Total Income</p>
                    <p class="fs-5 fw-bold m-0">{{ levelTeam.L3 }}</p>
                </div>
            </div>
            <router-link :to="{name:'teamdaily',query:{level:'Level3'}}" class="buttonDetails border-0">More details</router-link>
        </div>
        </div>




    </div>
    </main>

    </div>
</template>


<script>


export default {
    data(){
        return {
            level1Visible:1,
            level2Visible:1,
            level3Visible:1,
            team:{},
            levelTeam: {
                level1: {},
                level2: {},
                level3: {},
            },
        }
    },
    methods: {

        levelVisibleFun(id){
            if(this[id]==1){
                this[id] = 0;
            }else{
                this[id] = 1;
            }
        },


         async getData(){
            var id = localStorage.getItem('userid');
            var res = await this.callApi('get',`/api/front/teamdetails?id=${id}`,[]);
            this.team = res.data;

            var res = await this.callApi('get', `/api/user/multi/refer?id=${id}`, []);
            this.levelTeam = res.data;



        },
    },
    mounted() {
            this.getData();

    },
}
</script>
