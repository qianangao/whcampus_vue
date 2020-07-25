<template>
<div id="first-door-stats">
  <div class="title linearborder">一线门岗人员统计
  <span class="first outline_device">离线{{firstOutline}}台</span>
  </div>
  <div id="first-door-people-stats"></div>
</div>
</template>

<script>
import {mapState} from 'vuex'
import {getFirstDoorStats} from '@/network/index'
import {mixin} from '@/utils/mixin'
export default {
  components: {},
  mixins:[mixin],
  data() {
    return {
      doorName:[],
      inDoor:[],
      outDoor:[],
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
  computed:
    mapState([
      'firstOutline'
      ]),
  methods:{
    getData(){
      getFirstDoorStats().then(res=>{
        this.doorName=[]
        this.inDoor=[]
        this.outDoor=[]
        for (const key of res.in) {
          for(const i in key){
            this.doorName.push(i)
            this.inDoor.push(key[i]) 
          }  
        }
        res.out.map(item=>{
          this.outDoor.push(item[Object.keys(item)]); 
        })
       this.myChart.hideLoading()
       this.optionData()
      }).catch(error=>{
        console.log(error);  
      })
    },
    drawBar(){
      this.myChart=this.$echarts.init(document.getElementById('first-door-people-stats'))
      this.myChart.setOption(this.getBarOption)
      this.myChart.showLoading()
    },
    optionData(){
      this.myChart.setOption({
        xAxis:{
            data:this.doorName,
        },
        legend:{
          data:['进','出'], 
        },
        series:[
          {
            name:'进',
            type:'bar',
            data:this.inDoor
          },
          {
            name:'出',
            type:'bar',
            data:this.outDoor
          }
        ]
      })
    },
  },
  beforeDestroy(){
      clearInterval(this.timer)
    }
}
</script>

<style scoped>
 #first-door-people-stats{
  width:100%;
  height:100%;
} 

.outline_device{
    float:right;
}
</style>
