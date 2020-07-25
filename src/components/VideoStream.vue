<template>
<div class="content-inner grid-3x3-inner" id="videos">
                    <div>
                        <video id="remotevideo-1" oncontextmenu="return false;" autoplay></video>
                    </div>
                    <div>
                        <video id="remotevideo-2" oncontextmenu="return false;" autoplay></video>
                    </div>
                    <div>
                        <video id="remotevideo-3" oncontextmenu="return false;" autoplay></video>
                    </div>
                    <div>
                        <video id="remotevideo-4" oncontextmenu="return false;" autoplay></video>
                    </div>
                    <div>
                        <video id="remotevideo-5" oncontextmenu="return false;" autoplay></video>
                    </div>
                    <div>
                        <video id="remotevideo-6" oncontextmenu="return false;" autoplay></video>
                    </div>
                    <div>
                        <video id="remotevideo-7" oncontextmenu="return false;" autoplay></video>
                    </div>
                    <div>
                        <video id="remotevideo-8" oncontextmenu="return false;" autoplay></video>
                    </div>
                    <div>
                        <video id="remotevideo-9" oncontextmenu="return false;" autoplay></video>
                    </div>
                </div>
</template>

<script>
import $ from "jquery";
import '@/utils/adapter.min.js';
// import '@/utils/janus.js';
// import '@/utils/stream.js';
export default {
  components: {},
  data() {
    return {

    }
  }
 
}
</script>

<style scoped>
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
    /*border: 1px solid #000;*/
    border: 5px groove #17253a;
}
</style>
