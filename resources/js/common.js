import { mapGetters } from 'vuex'
export default {
    mounted() {
        // this.settingFun();
    },
    data(){
        return {
            // settings:{},
            Frontloader:false,
            user:{},
            balanceshow:false,


        }
    },
    methods: {
        setLang(){
            localStorage.setItem('language',this.$i18n.locale)

        },

        notifiyGlobal(mess){
            this.Messageactive = true
            this.Message = mess;
            setTimeout(() => {
                this.Messageactive = false
            }, 1000);
        },

        dayName(date=''){
            if (date == '') {
                var today = new Date();
            } else {
                var today = new Date(date);
            }
            var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
            var d = new Date(today);
            var dayName = days[d.getDay()];
            return dayName;
        },


        async callApi(method, url, dataObj){

            this.Frontloader = true
            const token = localStorage.getItem("token");
            try {
              return await axios({
                    method: method,
                    url: url,
                    data: dataObj,
                    headers: {
                        'Authorization': `Bearer ${token}`
                      }
                }).then(
                    this.Frontloader = false
                );
            } catch (e) {
                return e.response
            }
        },
         callApi2(method, url, dataObj ){
            try {
              return axios({
                    method: method,
                    url: url,
                    data: dataObj
                });
            } catch (e) {
                return e.response
            }
        },
        showbalance(){
            this.balanceshow = true
            this.checkbalance();
        },

        async checkbalance(){
            var id = localStorage.getItem('userid');
            var results = await this.callApi('get', `/api/admin/user/${id}`, []);
            this.user = results.data;
        },
        // async settingFun(){



        //         var res = await this.callApi('get',`/api/admin/setting/1`,[]);
        //         this.settings = res.data;
        // },

        dateformatglobal(date=''){
           return  User.dateformat(date);
        }
        // checkUserPermission(key){
        //     if(!this.userPermission) return true
        //     let isPermitted = false;
        //     for(let d of this.userPermission){
        //         if(this.$route.name==d.name){
        //             if(d[key]){
        //                 isPermitted = true
        //                 break;
        //             }else{
        //                 break
        //             }
        //         }

        //     }
        //     return isPermitted
        //     // return this.$route.name;
        // }

    },
    computed: {

        // Users(){
        //     return this.$store.getters.setUpdateUser;
        // }

        ...mapGetters({
            'Users' : 'getUpdateUser',
            'row' : 'getFrontUpdateUser',
            'settings' : 'getUpdateSetting',
            // 'userPermission' : 'getUserPermission',
            'getUserRoles' : 'getUserRoles',
        }),

        // isReadPermitted(){
        //     return this.checkUserPermission('read')
        //  },
        //  isWritePermitted(){
        //      return this.checkUserPermission('write')
        //  },
        //  isUpdatePermitted(){
        //      return this.checkUserPermission('update')
        //  },
        //  isDeletePermitted(){
        //      return this.checkUserPermission('delete')
        //  },

    },




}
