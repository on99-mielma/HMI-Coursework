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
            postPayDetail:{
                "accountName":"王楽",
                "accountState":"正常",
                "accountMoney":0,
                "accountPassword":""
            }
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
        cleanSomeMsg(){
            this.postPayDetail.accountState = "充值中"
            this.postPayDetail.accountMoney = 0;
            this.postPayDetail.accountPassword = "";
            document.getElementById("payMoney").value = ""
            document.getElementById("payPassword").value = ""
            //axios
            setInterval(()=>{
                setTimeout(this.toNormal(),0)
            },1000);
        },
        backToSummer(){
            window.location.href = "../../../../HumanMachine/mainMenu.html";
        },
        toNormal(){
            this.postPayDetail.accountState = "正常"
        }
    },
    beforeMount(){
        console.log(this.theDate)

    }
}
const app = Vue.createApp(App)
app.mount("#payFoodCard")