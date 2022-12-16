let url = "";
const App = {
    data(){
        return{
            theDate:new Date().toLocaleString(),
            titleInBack:"个人信息",
            messageRemind1:"修改个人信息",
            messageCollection:{
                name:"王楽",
                phoneNumber:"12345678910",
                cardNumber:"88888822222222888888",
                passwordInput:"123456abc",
                passwordConfirm:"123456abc",
                password:"123456abc",
                otherPhoneNumber:"10987654321"
            },
            serviceData:{
                code:0,
                msg:'',
                data:[]
            },
            editState:"保存",
            editCheck:true
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
        backToSummer(){
            window.location.href = "../../../../HumanMachine/mainMenu.html";
        },
        goEdit(){
            window.location.href = "../../../../HumanMachine/editAccount.html";
        },
        detailClean(){
            document.getElementById("edtAccName").value = ""
            document.getElementById("edtAccPN").value = ""
            document.getElementById("edtAccCN").value = ""
            document.getElementById("edtAccPI").value = ""
            document.getElementById("edtAccPC").value = ""
            document.getElementById("edtAccOPN").value = ""
            this.editState = "修改已经提交!";
            this.editCheck = false;
            setTimeout(this.detailNormal,3000);
        },
        detailNormal(){
            this.editState = "保存";
            this.editCheck = true;
        }
    },
    beforeMount(){
        console.log(this.theDate)
    }
}
const app = Vue.createApp(App)
app.mount("#editAccount")