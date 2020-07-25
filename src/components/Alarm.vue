<template>
  <div class="alarm_record">
    <div class="alarm_data">
      <div class="title linearborder">异常告警
    <span class="alarm_name">●访客滞留告警  ▲离职人员滞留告警</span>
      </div>
    <el-table :data="attendanceData" class="alarmList">
      <el-table-column label="告警人员" min-width="35%">
        <template slot-scope="{row}">
          <span>▲{{row.attendant_card}}{{row.attendant_name}}</span>
        </template>
      </el-table-column>
      <el-table-column label="告警时间" min-width="30%">
        <template slot-scope="{row}">
          <span>{{row.lastest_out.substr(5, 5)+''+row.lastest_out.substr(11, 8)}}</span>
        </template>
      </el-table-column>
      <el-table-column label="告警位置" prop="latest_out_gate" min-width="40%"></el-table-column>
    </el-table>
    </div>
     <div class="scroll_area"> <!--目标体-->
        <div class="content"> <!-- 显示容器 -->
            <div class="scrolltxt" v-html="tr_device"></div> <!-- 滚动体 -->	
        </div>
    </div>
  </div>
</template>

<script>
import {getAttendanceAlarm,getDeviceAlarm} from '@/network/index'
export default {
  components: {},
  data() {
    return {
      attendanceData:[],
      deviceData:[],
      firstOutline:0,
      secondOutline:0,
      tr_device:''
    }
  },
  created(){
    this.getData()
    this.timer=setInterval(this.getData, 300000);
  },
  mounted(){
    
  },
  methods:{
    getData(){
      getAttendanceAlarm().then(res=>{
          this.attendanceData=res.level_1_alarm
          this.scrollTable()
      }).catch(error=>{
        console.log(error);  
      })
      getDeviceAlarm().then(res=>{
          this.deviceData=res.data
          this.getDeviceData()
      }).catch(error=>{
        console.log(error);  
      })
    },
    scrollTable(){
      if (this.attendanceData.length > 0) {
      // if ($(".alarmList el-table__body tbody tr").length > 0) {
          setInterval(function () {
              $(".alarmList").find("tbody:first").animate({
                  marginTop: "-40px"
              }, 500, function () {
                  $(this).css({
                      marginTop: "0px"
                  }).find("tr:eq(0)").appendTo(this)
              })
          }, 2000)
      } else {
          $(".alarmList").hide()
      }
    },

    getDeviceData(){
            this.tr_device='';
            var firstOutline=0;
            var secondOutline=0;
            for(var j=0;j<this.deviceData.length;j++){
                $('.scroll_area').css({ "display": "block" })
                if(this.deviceData[j].device_location.indexOf('区')!==-1){
                    secondOutline++
                }else{
                    firstOutline++
                }
                var offline_time =this.deviceData[j]['offline_time'].substr(11, 8);
                var device_status=this.deviceData[j].device_status===1?'在线':'离线'
                this.tr_device+=`<span>★${this.deviceData[j].device_location}&nbsp;(${offline_time}&nbsp;&nbsp;${this.deviceData[j].device_ip}&nbsp;&nbsp;${device_status})&nbsp;&nbsp;</span>`
            }
            this.$store.commit('updateFirst',firstOutline)
            this.$store.commit('updateSecond',secondOutline)
            var obj=$('.scroll_area');
            var content=obj.find('.content').width();
            var text=obj.find('.scrolltxt').width();
            var sLeft=0;
            //宽度超出当前content宽度才滚动
            if(text>content){
                obj.find('.scrolltxt').eq(0).append(obj.find('scrolltxt').eq(0).html());
                setInterval(function(){
                    obj.find('.scrolltxt').eq(0).css({
                        "left":"-"+sLeft+"px"
                    })
                    if(sLeft>(text-content)+content){
                        sLeft=0;
                    }
                    sLeft++;
                },30)
            }
            
        }
  },
  beforeDestroy(){
    clearInterval(this.timer)
  }
}
</script>

<style scoped>
.alarm_record{
  position: relative;
}
.alarm_data{
  width:100%;
  height:85%;
}
.alarm_name{
    float:right;
}
.scroll_area{
    /* display:none; */
    background:#142033;
    padding:0 10px;
    width:100%;
    height:10%;
    bottom:0;
    position: absolute;
    }
.scroll_area .content{
    overflow:hidden;
    position:relative;
    color:#fff;
    height:100%;
    }
.scroll_area .scrolltxt{
    position:absolute;
    left:0;
    top:0;
    white-space:nowrap;
    }
</style>
