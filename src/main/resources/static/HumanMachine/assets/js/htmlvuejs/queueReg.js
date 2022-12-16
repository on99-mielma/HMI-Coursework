let url = "";
const App = {
    data() {
        return {
            theDate: new Date().toLocaleString(),
            titleInBack: "个人信息",
            messageRemind1: "修改个人信息",
            messageCollection: {
                name: "王八",
                phoneNumber: "12345678910",
                cardNumber: "88888822222222888888",
                passwordInput: "123456abc",
                passwordConfirm: "123456abc",
                password: "123456abc",
                otherPhoneNumber: "10987654321"
            },
            serviceData: {
                code: 0,
                msg: '',
                data: []
            },
            allStep: ["快捷挂号", "科室选择", "医师选择", "时间选择"],
            allDepartment: [
                [{"roomName": "急诊科", "roomWhere": "Ⅰ-105"}, {"roomName": "胸外科", "roomWhere": "Ⅰ-106"}],
                [{"roomName": "妇产科", "roomWhere": "Ⅰ-110"}, {"roomName": "重症科", "roomWhere": "Ⅰ-112"}],
                [{"roomName": "内分泌科", "roomWhere": "Ⅰ-107"}, {"roomName": "神经外科", "roomWhere": "Ⅰ-108"}],
                [{"roomName": "心内科", "roomWhere": "Ⅰ-101"}, {"roomName": "呼吸科", "roomWhere": "Ⅰ-102"}],
                [{"roomName": "肾内科", "roomWhere": "Ⅰ-203"}, {"roomName": "血液科", "roomWhere": "Ⅰ-206"}],
                [{"roomName": "风湿科", "roomWhere": "Ⅰ-205"}, {"roomName": "感染科", "roomWhere": "Ⅰ-206"}],
                [{"roomName": "肿瘤科", "roomWhere": "Ⅰ-201"}, {"roomName": "神经内科", "roomWhere": "Ⅰ-212"}],
                [{"roomName": "皮肤科", "roomWhere": "Ⅰ-318"}, {"roomName": "中医科", "roomWhere": "Ⅰ-306"}],
                [{"roomName": "临床科", "roomWhere": "Ⅰ-310"}, {"roomName": "消化科", "roomWhere": "Ⅰ-325"}]
            ],
            searchPageOrNormal: true,//暂时废弃
            currentPage: 1,
            maxPage: 99,
            departmentSearchResult: this.allDepartment,
            curSection: 0,
            allDoctor: [
                {"doctorName": "纪宝华", "position": "主任医师", "work": true},
                {"doctorName": "方全", "position": "研室主任", "work": true},
                {"doctorName": "张抒扬", "position": "院长", "work": false},
            ],
            currentDepartment: "  急诊科  Ⅰ-105  ",
            chooseQueueType: true,//普通号false与专家号true 用Number()强制类型转换
            future6Day: [],
            future6cost: [
                [4.5, 3.5, 4.5, 5.0, 4.5, 5.0],
                [45, 45, 45, 0, 0, 45]
            ]
        }
    },
    methods: {
        UTCtoGMT8(dateForm) {
            if (dateForm === "") {  //解决deteForm为空传1970-01-01 00:00:00
                return "";
            } else {
                let dateee = new Date(dateForm).toJSON();
                return new Date(+new Date(dateee) + 8 * 3600 * 1000).toISOString().replace(/T/g, ' ').replace(/\.[\d]{3}Z/, '');
            }
        },
        testMethod() {
            console.log(this.theDate)
        },
        cutGMT8(dateGMT8) {
            return dateGMT8.slice(0, dateGMT8.indexOf(' '))
        },
        getFuture6Day(dateForm) {
            if (dateForm === "") {  //解决deteForm为空传1970-01-01 00:00:00
                return "";
            } else {
                let dateee = new Date(dateForm).toJSON();
                let ans = [];
                let tempDate = '';
                for (let i = 0; i < 6; i++) {
                    tempDate = new Date(+new Date(dateee) + (8 + i * 24) * 3600 * 1000).toISOString().replace(/T/g, ' ').replace(/\.[\d]{3}Z/, '');
                    ans.push(this.cutGMT8(tempDate));
                }
                return ans;
            }
        },
        getDepartmentpage(num, department) {
            // 1 2 3
            // 0 1 2
            let pageSet = 3;
            let dPlen = department.length;
            let plus1 = 0;
            if (dPlen >= 0 && dPlen % pageSet != 0) {
                plus1 = 1;
            }
            let checkNum = dPlen / pageSet + plus1;
            if (num > checkNum || num <= 0) {
                return "页数不规范";
            }
            let startNum = 0
            for (let i = 1; i < num; i++) {
                startNum += pageSet;
            }
            return department.slice(startNum, startNum + pageSet);
        },
        getMaxPage(department) {
            let pageSet = 3;
            let dPlen = department.length;
            let plus1 = 0;
            if (dPlen >= 0 && dPlen % pageSet != 0) {
                plus1 = 1;
            }
            return dPlen / pageSet + plus1;
        },
        dSid() {
            let sK = document.getElementById("searchKey").value;
            this.maxPage = this.getMaxPage(this.departmentSearchResult)
            this.currentPage = 1
            return this.departmentSearch(sK);
        },
        setCurDp(str1, str2) {
            this.currentDepartment = "  " + str1 + "  " + str2 + "  "
        },
        followQueueType() {
            if (this.chooseQueueType) {
                this.curSection = 2;
            } else {
                this.curSection = 3;
            }
        },
        departmentSearch(searchKey) {
            if (searchKey === "") {
                return this.allDepartment;
            }
            let ans = [];
            let perTwo = [];
            let perTwoLen = 0;
            for (const allDepartmentElement of this.allDepartment) {
                for (const allDepartmentElementElement of allDepartmentElement) {
                    if (allDepartmentElementElement.roomName.indexOf(searchKey) > -1) {
                        perTwo.push(allDepartmentElementElement);
                    }
                    perTwoLen = perTwo.length;
                    if (perTwoLen >= 2) {
                        ans.push(perTwo)
                        perTwo = []
                    }
                }
            }
            perTwoLen = perTwo.length;
            if (perTwoLen > 0) {
                ans.push(perTwo)
            }
            this.departmentSearchResult = ans;
            return ans;
        },
        pageChange(num) {
            let newPage = this.currentPage + num
            if (newPage <= 0 || newPage > this.maxPage) {
                return this.currentPage
            } else {
                this.currentPage = newPage
            }
            this.departmentSearchResult = this.getDepartmentpage(this.currentPage, this.allDepartment)
        },
        backToSummer(){
            window.location.href = "../../../../HumanMachine/mainMenu.html";
        }
    },
    beforeMount() {
        // console.log(this.maxPage)
        this.future6Day = this.getFuture6Day(this.theDate)
        this.maxPage = this.getMaxPage(this.allDepartment)
        this.departmentSearchResult = this.getDepartmentpage(this.currentPage, this.allDepartment)
        console.log(this.maxPage)
        console.log(this.theDate)
        console.log(this.UTCtoGMT8(this.theDate))
        // console.log(this.allStep)
        // for (const allStepKey in this.allStep) {
        //     console.log(allStepKey)//输出 index
        // }
        // for (const stringaS of this.allStep) {
        //     console.log(stringaS)//输出内容
        // }
        // let GMT8 = this.UTCtoGMT8(this.theDate)
        // console.log(this.cutGMT8(GMT8))
        // console.log(this.getFuture6Day(this.theDate))
        // console.log(this.allDepartment)
        // for (const allDepartmentElement of this.allDepartment) {
        //     for (const allDepartmentElementElement of allDepartmentElement) {
        //         console.log(allDepartmentElementElement.roomName)
        //         console.log(allDepartmentElementElement.roomWhere)
        //     }
        // }
        // console.log(this.getDepartmentpage(1))
        // console.log(this.getDepartmentpage(2))
        // console.log(this.getDepartmentpage(3))
        // console.log(this.getDepartmentpage(3,this.allDepartment))
        // console.log(this.getDepartmentpage(1,this.allDepartment.slice(5)))
        // console.log(this.departmentSearch("肾"));
        // console.log(this.departmentSearch(""));// === console.log(this.allDepartment)
        // console.log(this.currentPage)
        // console.log(this.pageChange(1))
        // console.log(this.pageChange(1))
        // console.log(this.pageChange(1))
    }
}
const app = Vue.createApp(App)
app.mount("#queueReg")