<template>
  <div class="header-content">
                <div class="header clearfix">
                    <div class="header-left"></div>
                    <div class="header-right">
                        <!-- <div class="clock-wrapper"> -->
                        <div class="clock" id="clock">
                            <!-- HOUR -->
                            <div class="numbers">
                                <p class="hours">{{hours}}</p>
                                <p class="placeholder">88</p>
                            </div>

                            <div class="colon">
                                <p>:</p>
                            </div>

                            <!-- MINUTE -->
                            <div class="numbers">
                                <p class="minutes">{{minutes}}</p>
                                <p class="placeholder">88</p>
                            </div>

                            <div class="colon">
                                <p>:</p>
                            </div>

                            <!-- SECOND -->
                            <div class="numbers">
                                <p class="seconds">{{seconds}}</p>
                                <p class="placeholder">88</p>
                            </div>
                        </div>
                        <!-- </div> -->
                    </div>
                </div>
                <div class="safety-statisc">
                    <div class="left-title">
                        <p class="topic">武汉園區安全天數</p>
                        <p class="total" id="safe_day">{{safeDay}}</p>
                        <div class="safety-number">
                            <p class="cn"><span class="num_title"> 安  全  指  数 </span>{{safeIndex}}</p>
                            <p class="cn"><span class="num_title">今日园区人数 </span>{{totalIn}}人</p>
                            <p class="cn"><span class="num_title">今日访客人数 </span>{{visitor}}人</p>
                        </div>
                    </div>
                    <div class="right-title">
                        <div id="pie-right"></div>
                    </div>
                </div>
            </div>
</template>

<script>
import {getBaseInfo,getCampusNum} from '@/network/index'
import {mixin} from '@/utils/mixin'
export default {
  components: {},
  data() {
    return {
        hours:'',
        minutes:'',
        seconds:'',
        safeDay:0,
        safeIndex:'',
        totalIn:0,
        visitor:0,
        data:[],
        myChart:null
    }
  },
  mounted(){
      this.myChart=this.$echarts.init(document.getElementById('pie-right'))
      this.time()
      this.getData()
      this.timer=setInterval(this.getData, 60000)
      this.timers=setInterval(this.time,1000);
      
  },
  methods:{
      //饼图
    DrawPie(){
          this.myChart=this.$echarts.init(document.getElementById('pie-right'))
          this.myChart.setOption(this.getLineOption)
          this.myChart.showLoading()
      },
    getOption(values){
        this.myChart.setOption({
                title: {
                         text: null
                     },
                     color: ["#4539E8", "#35B4EC", "#CF3D4D"],
                     tooltip: {
                         tooltip: 'item',
                         formatter: '{b} : {c} ({d}%)'
                     },
                     legend:{
                         icon:'none',
                         orient:'vertical',
                         top:'middle',
                         textStyle:{
                             color:'#fff',
                         },
                         formatter: (params)=> {
                                return params + ' : ' + values[params] + '人';
                            }
                     },
                     series: [{
                         type: 'pie',
                         radius: ['70%','90%'],
                         label:{
                             show:false
                         },
                         data: this.data
                     }]
            })
    },
    padding(num, length) {
        //这里用slice和substr均可
        return (Array(length).join("0") + num).slice(-length);
    },
      //axios请求数据
    getData(){
          getBaseInfo().then(res=>{
              this.safeDay=res['safety-stats']['safety_days']
              this.safeDay=this.padding(this.safeDay,3)
              this.safeIndex=Number(res['safety-stats']['safety_factor']*100).toFixed(2)+'%'
              this.totalIn=res['safety-stats']['today_total_in']
              this.visitor=res['safety-stats']['today_visitor_in']   
          }).catch(error=>{
              console.log(error);  
          })
          getCampusNum().then(res=>{
              var values={}
              this.data=[]
              for (const key in res.data) {
                  values[key]=res.data[key]
                  this.data.push({value:res.data[key],name:key})    
              } 
            this.getOption(values)
          }).catch(error=>{
              console.log(error);  
          })
      },
      // get time
        time() {
            var date = new Date(),
                hours = date.getHours(),
                minutes = date.getMinutes(),
                seconds = date.getSeconds();
            //invokes function to make sure number has at least two digits
            this.hours = this.addZero(hours);
            this.minutes = this.addZero(minutes);
            this.seconds = this.addZero(seconds);
        },
        //turns single digit numbers to two digit numbers by placing a zero in front
        addZero(val) {
            return (val <= 9) ? ("0" + val) : val;
        }
  },
  beforeDestroy(){
      clearInterval(this.timer)
      clearInterval(this.timers)
  }
}
</script>

<style scoped>
.header {
    width: 100%;
    height: 20%;
    position: relative;
}

.header-left {
    width: calc(50% - 15px);
    height: 100%;
    float:left;
    background:url(../assets/images/foxconnlogo.png) no-repeat left center;
    background-size: 100% 72%;
    position: absolute;
}

.header-right {
    width: calc(50% - 15px);
    height: 100%;
    float: right;
    justify-content: flex-end;
    align-items: center;
    display: flex;
}
#clock{
    width:100%;
}

.clearfix:after{
    content:"";
    display:table;
    clear:both;
}
.clearfix{*zoom:1}

.safety-statisc{
     width: calc(100% - 30px);
     height: 80%;
     text-align: left;
     display:flex;
}
.left-title{
    float:left;
    flex:1;
}
.right-title{
    float:right;
    flex:1;   
}
#pie-right{
    width:100%;
    height:100%;
}

.safety-statisc >.left-title>.topic {
    font-size: 20px;
    margin-top: 0;
    margin-bottom: 0;
    letter-spacing: 2px;
}
.num_title {
    letter-spacing: 1.5px;
    word-spacing: 2px;
}

.safety-statisc >.left-title>.total {
    font-size: 70px;
    margin-top: 0;
    margin-bottom: 0;
    color:#35B4EC;
}

.safety-statisc>.left-title>.safety-number {
    margin-top: 0;
    margin-bottom: 0px;
    font-family: "Times New Roman",Times,serif;
}

</style>
