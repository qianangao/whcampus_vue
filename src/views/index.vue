<template>
<div id="content">
  <div class="content-inner grid-4x3">
    <header-content/>
    <in-door/>
    <div class="grid-2x2">
    <video-stream/>
    </div>
    <alarm/>
    <out-door/>
    <first-door-stats/>
    <first-door-flow/>
    <second-door-stats/>
    <second-door-flow/>
  </div>
</div>
</template>

<script>
import FirstDoorStats from "@/components/FirstDoorStats.vue"
import HeaderContent from "@/components/HeaderContent.vue"
import Alarm from "@/components/Alarm.vue"
import VideoStream from "@/components/VideoStream.vue"
import FirstDoorFlow from "@/components/FirstDoorFlow.vue"
import SecondDoorStats from "@/components/SecondDoorStats.vue"
import SecondDoorFlow from "@/components/SecondDoorFlow.vue"
import InDoor from "@/components/InDoor.vue"
import OutDoor from "@/components/OutDoor.vue"
export default {
  components: {
    FirstDoorStats,
    HeaderContent,
    Alarm,
    VideoStream,
    FirstDoorFlow,
    SecondDoorStats,
    SecondDoorFlow,
    InDoor,
    OutDoor
  },
  data() {
    return {}
  }
}
</script>

<style scoped>
#content {
    width: 100%;
    height: 100%;
}

.content-inner {
    padding: 10px;
    width: calc(100% - 20px);
    height: calc(100% - 20px);
}
.grid-4x3 {
    display:grid;
    grid-template-columns: repeat(4,1fr);
    grid-template-rows: repeat(3,1fr);
    grid-gap:10px;  /*grid-gap: { grid-row-gap } { grid-column-gap };格线的间隔包含垂直及水平 */
    /* grid-auto-flow:row; 先行后列 */
}

.grid-4x3 > div {
    background: #17253a;
    border-radius: 5px;
    box-shadow: 0px 0px 10px rgba(0,0,0,.8);
    overflow: hidden;
    padding: 15px;
    text-align: center;
}

.grid-4x3 > .grid-2x2 {
    /* grid-column: 2/4;
    grid-row: 1/3; */
    /* grid-column-start: 2;
    grid-column-end: 4;
    grid-row-start:1;
    grid-row-end:3; */
    grid-area: 1/2/3/4;   /*row-start /column-start/row-end/column end*/
    padding:0;
}

.grid-3x3-inner {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: repeat(3, 1fr);
    grid-gap:0.5px;
    /* grid-auto-flow:row; */
    -webkit-background-size: 100% 100%;
    background-size: 100% 100%;
}

.grid-3x3-inner > div {
    display: flex;
    align-items: center;
    /*object-fit: fill;   img 属性 object-fit: fill;: 默认值。内容拉伸填满整个content box, 不保证保持原有的比例。*/
    overflow: hidden;
    text-align: center;
    box-sizing: border-box;
    border: 5px groove #17253a;
}


</style>
