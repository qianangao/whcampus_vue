<template>
<div id="second-door-flow">
  <div class="title linearborder">二线门岗人员流量
  </div>
  <div id="second-door-people-flow"></div>
</div>
</template>

<script>
import {getSecondDoorFlow} from '@/network/index'
import {mixin} from '@/utils/mixin'
export default {
  components: {},
  mixins:[mixin],
  data() {
    return {
      times:[],
      inCount:[],
      outCount:[],
      myChart:null,
      timer:''
    }
  },
  created(){
    this.getData()
    this.timer=setInterval(this.getData, 300000);
  },
  mounted(){
    this.drawBar()  
  },
  methods:{
    getData(){
      getSecondDoorFlow().then(res=>{
        this.times=[]
        this.inCount=[]
        this.outCount=[]
        for (const item of res.in) {
          var time=item.time.slice(11).indexOf('0')===0?item.time.slice(12,13):item.time.slice(11,13) 
          this.times.push(time+'h')
          this.inCount.push(item.count) 
        }
        for (const item of res.out) {
            this.outCount.push(item.count)
        }
       this.myChart.hideLoading()
       this.optionData()
      }).catch(error=>{
        console.log(error);  
      })
    },
    drawBar(){
      this.myChart=this.$echarts.init(document.getElementById('second-door-people-flow'))
      this.myChart.setOption(this.getLineOption)
      this.myChart.showLoading()
    },
    optionData(){
      this.myChart.setOption({
        xAxis:{
            data:this.times,
        },
        legend:{
          data:['进','出'], 
        },
        series:[
          {
            name:'进',
            type:'line',
            data:this.inCount
          },
          {
            name:'出',
            type:'line',
            data:this.outCount
          }
        ]
      })
    },
    beforeDestroy(){
      clearInterval(this.timer)
    }
  }
}
</script>

<style scoped>
 #second-door-people-flow{
  width:100%;
  height:100%;
}
</style>
