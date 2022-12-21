let url = "";
const App = {
    data(){
        return{
            theDate:new Date().toLocaleString(),
            titleInBack:"个人信息",
            messageRemind1:"修改个人信息",
            messageCollection:{
                name:"王八",
                phoneNumber:"12345678910",
                cardNumber:"88888822222222888888",
                passwordInput:"123456abc",
                passwordConfirm:"123456abc",
                password:"123456abc",
                otherPhoneNumber:"10987654321"
            },
            loginData:{
                code:0,
                msg:'',
                data:[]
            },
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
        testMethod(){
            console.log(this.theDate)
        },
        wgoRegisterAccount(){
            window.location.href = "../../../../HumanMachine/registerAccount.html";
        },
        wgoMainMenu(){
            window.location.href = "../../../../HumanMachine/mainMenu.html";
        },
    },
    beforeMount(){
        console.log(this.theDate)
    }
}
const app = Vue.createApp(App)
app.mount("#loginPage")