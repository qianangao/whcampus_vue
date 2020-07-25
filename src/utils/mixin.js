export const mixin = {
    data(){
        return{
            getPieOption:{
                 // 餅圖
                 title: {
                         text: null
                     },
                     color: ["#4539E8", "#35B4EC", "#CF3D4D"],
                     tooltip: {
                         tooltip: 'item',
                         formatter: '{a}{b} : {c} ({d}%)'
                     },
                     legend:{
                         label:{
                             show:false
                         }
                     },
                     series: [{
                         type: 'pie',
                         radius: ['60%','80%'],
                         label:{
                             show:true,
                             position:'center',
                             color:'white',
                             fontWeight:'bold'
                         },
                         data: []
                     }]
            },
            getBarOption:{
                title:{
                    text:null
                },
                tooltip:{
                    trigger:'axis'
                },
                yAxis:{
                    type:'value',
                    axisLabel:{
                        color:'#35B4EC'
                    },
                    splitLine: {
                            show: false
                        }
                },
                legend:{
                    textStyle: {
                        color: 'white'
                    }
                },
                xAxis:{
                    type:'category',
                    splitLine: {
                            show: false
                        },
                        axisLabel: {
                            rotate: -45,
                            color: '#35B4EC'
                        }
                },
                series:[
                    {
                        name:null,
                        type:'bar',
                        data:[],
                        itemStyle:{
                            normal:{
                                color:new this.$echarts.graphic.LinearGradient(0,0,0,1,
                                [
                                    {offset: 0,color: '#CF3D4D'},
                                    {offset: 1,color: '#E79D42'}
                                ],false)
                            }
                        }
                    },
                    {
                        name: null,
                        type: 'bar',
                        data: [],
                        itemStyle: {
                            normal: {
                                color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1,
                                    [{
                                            offset: 0,
                                            color: '#35B4EC'
                                        },
                                        {
                                            offset: 1,
                                            color: '#4539E8'
                                        }
                                    ], false)
                            }
                        }
                    }
                ]
            },
            getLineOption: {
                title: {
                    text: null
                },
                tooltip: {
                    trigger: 'axis'
                },
                yAxis: {
                    type: 'value',
                    axisLabel: {
                        color: '#35B4EC'
                    },
                    splitLine: {
                        show: false
                    }
                },
                legend: {
                    textStyle: {
                        color: 'white'
                    }
                },
                xAxis: {
                    type: 'category',
                    splitLine: {
                        show: false
                    },
                    axisLabel: {
                        rotate:-60,
                        interval:0,
                        color: '#35B4EC'
                    }
                },
                series: [{
                        name: null,
                        type: 'line',
                        data: [],
                        itemStyle: {
                            normal: {
                                color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1,
                                    [{
                                            offset: 0,
                                            color: '#CF3D4D'
                                        },
                                        {
                                            offset: 1,
                                            color: '#E79D42'
                                        }
                                    ], false)
                            }
                        }
                    },
                    {
                        name: null,
                        type: 'line',
                        data: [],
                        itemStyle: {
                            normal: {
                                color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1,
                                    [{
                                            offset: 0,
                                            color: '#35B4EC'
                                        },
                                        {
                                            offset: 1,
                                            color: '#4539E8'
                                        }
                                    ], false)
                            }
                        }
                    }
                ]
            }
        }
    }
}