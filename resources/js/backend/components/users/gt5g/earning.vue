<template>
    <div>
        <header class="header-text defaltColorBg" style="margin-bottom: -16px">
            <p class="py-2 text-white">Earnings</p>
        </header>

        <main class="main-bg-absulate">
            <div class="bg-white mx-4 shadow-lg text-center">
                <div v-if="earndata.user.receiveable>0">
                    <p class="fs-6 mb-0 py-2">Receiveable Income</p>
                    <p class="fw-bold defaltColor">৳{{ earndata.user.receiveable }}</p>
                    <button class="btn fw-bold mb-4 mt-2 rounded-0 text-white w-75 defaltColorBg" @click="orderSubmit">Receive</button>
                </div>
                <div v-else>
                    <h3 class="text-center">Next Receiveable Time</h3>
                    <div class="d-flex align-items-center justify-content-center">
                    <div class="d-flex align-items-center countingNext" style="grid-gap:10px">
                        <p class="btn btn-info text-white">{{ hours }}</p>
                        <p style="font-size: 15px;font-weight: 600;">:</p>
                        <p class="btn btn-info text-white">{{ minutes }}</p>
                        <p style="font-size: 15px;font-weight: 600;">:</p>
                        <p class="btn btn-info text-white">{{ seconds }}</p>
                    </div>
                </div>
            </div>



            </div>


            <div style="margin: 46px 3.3% 12px; position: relative" v-for="(list,index) in lists" :key="index">
                <div class="cotent">
                    <div class="on">{{ list.endDate }}</div>
                    <div class="one">
                        <div class="uni-image" style="width: 100%; height: 200px;">

                           <img :src="list.imageOfPackage"  width="100%" draggable="false">
                        </div>
                    </div>
                    <div class="to" style="width: 100%">
                        <div style="width: 33%; text-align: center">৳{{ list.dailyearn }}</div>
                        <div style="width: 33%; text-align: center">৳{{ list.estimatedEarn }}</div>
                        <div style="width: 33%; text-align: center">৳{{ list.deposit }}</div>
                    </div>
                    <div class="th" style="width: 100%">
                        <div style="width: 33%; text-align: center; flex-wrap: nowrap">Daily Income
                        </div>
                        <div style="width: 33%; text-align: center">Estimated Income</div>
                        <div style="width: 33%; text-align: center">Investment
                            Price</div>
                    </div>
                    <div class="last">
                        <div class="two">
                            <div class="left">{{ list.nameOfPackage }}</div>
                        </div>
                        <div class="three">At Work</div>
                        <div style="color: var(--defaltColor); font-size: 17px; font-weight: bold">Income:
                            ৳{{ list.totalEarn }}</div>

                    </div>
                </div>
            </div>

            <p class="py-2 text-center" style="background-color: #f4f4f4">
                no more data
            </p>
        </main>

        <Preload :Isactive="isActive" />
        <Message :Isactive="Messageactive" :Message="Message" />
    </div>
</template>

<script>
export default {
    data() {
        return {
            isActive: true,
            Messageactive: false,
            Message: "",
            earndata: {user:{eceiveable:0}},
            form: {},
            lists: {},



            countdownDate: new Date(), // Set your target date here
            countdownInterval: null,
            days: 0,
            hours: 0,
            minutes: 0,
            seconds: 0


        };
    },
    methods: {
        notifiy(mess) {
            this.Messageactive = true;
            this.Message = mess;
            setTimeout(() => {
                this.Messageactive = false;
            }, 1000);
        },

        async getData(trx_type = "increase") {
            this.trxType = trx_type;
            this.isActive = true;
            var id = localStorage.getItem("userid");

            this.isActive = false;
        },

        async getdata() {
            var id = localStorage.getItem("userid");

            var res = await this.callApi("get", `/api/admin/user/${id}`, []);
            this.earndata = res.data;

            var res1 = await this.callApi(
                "get",
                `/api/get/earning/history?id=${id}&trx_type=increase&remark=task_comisition`,
                []
            );
            this.lists = res1.data;

            this.isActive = false;
        },

        async orderSubmit() {
            this.isActive = true;
            this.form["user_id"] = this.row.user.id;
            var res = await this.callApi("post", `/api/admin/task`, this.form);
            if (res.data == 444) {
                this.notifiy(`Already Received`);
            } else {
                this.notifiy("Received Completed");
            }
            this.getdata();
        },


        startCountdown() {
        this.countdownInterval = setInterval(() => {



            // Set the time to 23:59:00
            this.countdownDate.setHours(23);
            this.countdownDate.setMinutes(59);
            this.countdownDate.setSeconds(0);
            this.countdownDate.setMilliseconds(0);




            const now = new Date().getTime();
            const distance = this.countdownDate - now;

            this.days = Math.floor(distance / (1000 * 60 * 60 * 24));
            this.hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            this.minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            this.seconds = Math.floor((distance % (1000 * 60)) / 1000);

            if (distance < 0) {
            // Countdown is finished
            clearInterval(this.countdownInterval);
            this.days = 0;
            this.hours = 0;
            this.minutes = 0;
            this.seconds = 0;
            }
        }, 1000); // Update the countdown every second
        }








    },
    beforeUnmount() {
    clearInterval(this.countdownInterval);
  },
    mounted() {
        this.getdata();
        this.startCountdown();
    },
};
</script>

<style scoped>

.cotent {
    margin-bottom: 12px;
    background-color: #fff;
    box-shadow: 0 1px 2px #ccc;
    padding: 10px;
}
.cotent .on {
    text-align: center;
    background-color: #000000;
    width: 120px;
    height: 22px;
    line-height: 22px;
    position: absolute;
    z-index: 10;
    right: 10px;
    font-size: 12px;
    color: #fff;
    float: right;
}
.cotent .th {
    display: flex;
    font-size: 12px;
    color: #b3b7bc;
    flex-wrap: nowrap;
    overflow: hidden;
    justify-content: space-between;
}

.cotent .one {
    width: 100%;
    height: 200px;
    margin-bottom: 20px;
}

.cotent .to {
    display: flex;
    font-size: 15px;
    color: #333;
    font-weight: 700;
    justify-content: space-between;
}
.cotent .last {
    margin-top: 20px;
    background-color: #f1f1f1;
    text-align: center;
    width: 100%;
    font-size: 12px;
    font-family: PingFang SC;
    padding: 10px 0;
    color: #333;
    line-height: 28px;
    justify-content: space-between;
    box-sizing: border-box;
}
.cotent .last .three {
    color: #b3b7bc;
}
.uni-image {
    width: 320px;
    height: 240px;
    display: inline-block;
    overflow: hidden;
    position: relative;
}

</style>
