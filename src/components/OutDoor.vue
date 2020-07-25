<template>
  <div>
    <div class="title linearborder">出门岗人员详情(近5笔)</div>
    <!-- <div class="title linearborder">重点关注人员详情(近5笔)</div> -->
    <el-table :data="list" style="width:100%">
      <el-table-column label="员工" min-width="35%">
        <template slot-scope="{row}">
          <span>{{row.attendant_name}}{{row.t_attendant_code}}</span>
        </template>
      </el-table-column>
      <el-table-column label="时间" min-width="20%">
         <template slot-scope="{row}">
          <span>{{row.time.substr(11, 8)}}</span>
        </template>
      </el-table-column>
      <el-table-column label="门岗位置" min-width="30%">
         <template slot-scope="{row}">
          <span>{{row.device_name.slice(0,-4)}}</span>
        </template>
      </el-table-column>
      <el-table-column label="状态" min-width="15%">
        <template>
          <img src="@/assets/images/out.png" width="20px"/>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import {getOutDoor} from '@/network/index'
import {mapState} from 'vuex'
export default {
  components: {},
  data() {
    return {
      doorName:[],
      inDoor:[],
      list:[],
      timer:'',
      doorTimer:''
    }
  },
  computed:mapState([
    'delay'
    ]),
  created(){
    this.getData()
    this.timer=setInterval(this.getData, 300000);
  },
  methods:{
    getData(){
      getOutDoor().then(res=>{
        for (const item of res) {
          //判断是否为空数组
            if(JSON.stringify(item[Object.keys(item)[0]])!=='[]'){
          // if(Array.prototype.isPrototypeOf(item[Object.keys(item)[0]])&&item[Object.keys(item)[0]].length===0){
            this.doorName.push(Object.keys(item)[0])
            this.inDoor.push(item[Object.keys(item)[0]]); 
          }  
        }
        this.getDoorName()
        this.doorTimer=setInterval(this.getDoorName, this.doorName.length * this.delay);
      }).catch(error=>{
        console.log(error);  
      })
    },
    getDoorName(){
      for (var index = 0; index < this.doorName.length; index++) {
          this.outDoorShow(index)
      }
    },
    outDoorShow(index){
      setTimeout(() => {
        this.list=this.inDoor[index] 
      }, index*this.delay);
    }
  },
  beforeDestroy(){
    clearInterval(this.timer)
    clearInterval(this.doorTimer)
  }
}
</script>

<style scoped>

</style>
