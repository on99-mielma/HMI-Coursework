let url = "";
const App = {
    data(){
        return{
            theDate:new Date().toLocaleString()
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
        freshTime(){
            this.theDate = this.UTCtoGMT8(new Date().toLocaleString());
        },
        backToSummer(){
            window.location.href = "../../../../HumanMachine/mainMenu.html";
        }
    },
    beforeMount(){
        console.log(this.theDate);
        window.setInterval(()=>{
            setTimeout(this.freshTime(),0)
        },1000);

    }
}
const app = Vue.createApp(App)
app.mount("#healthCode")