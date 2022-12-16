let url = "";
const App = {
    data(){
        return{
            theDate:new Date().toLocaleString(),
            titleInBack:"注册账号",
            messageRemind1:"请输入注册信息...",
            messageCollection:{
                name:"",
                phoneNumber:"",
                cardNumber:"",
                passwordInput:"",
                passwordConfirm:""
            },
            covidNews:[
                {
                    "title":"风险区发生改变！"
                },
                {
                    "title":"风险区发生改变！"
                },
                {
                    "title":"风险区发生改变！"
                },
                {
                    "title":"风险区发生改变！"
                }
            ]
        }
    },
    methods:{
        UTCtoGMT8(dateForm){
            if (dateForm === "") {  //解决deteForm为空传1970-01-01 00:00:00
                return "";
            }else{
                let dateee = new Date(dateForm).toJSON();
                return new Date(+new Date(dateee) + 8 * 3600 * 1000).toISOString().replace(/T/g, ' ').replace(/\.[\d]{3}Z/, '');
            }
        },
        checkMethods(){
            console.log(this.theDate);
        },
        backToSummer(){
            window.location.href = "../../../../HumanMachine/mainMenu.html";
        },
    },
    beforeMount(){
        console.log(this.theDate)

    }
}
const app = Vue.createApp(App)
app.mount("#howQueue")