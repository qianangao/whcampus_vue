import instance from './request'

//一线门岗人流
export function getFirstDoorStats(){
    return instance({
        url: '/gate1-num'
    })
}

//一线门岗流量
export const getFirstDoorFlow=()=>{
    return instance({
        url: '/range24h-gate1'
    })
}

//二线门岗人流
export function getSecondDoorStats(){
    return instance({
        url: '/gate2-num'
    })
}

//二线门岗流量
export function getSecondDoorFlow(){
    return instance({
        url: '/range24h-gate2'
    })
}


//园区基本信息
export const getBaseInfo=()=>{
    return instance({
        url: '/safety-stats'
    })
}

//园区人数饼图
export const getCampusNum=()=>{
    return instance({
        url: '/range24h-attd'
    })
}

//人员滞留告警
export function getAttendanceAlarm(){
    return instance({
        url:'/alarm-attendant'
    })
}

//设备告警
export function getDeviceAlarm(){
    return instance({
        url: '/alarm-device'
    })
}

//进门岗5笔
export function getInDoor(){
    return instance({
        url: '/in-latest5'
    })
}

//出门岗5笔
export function getOutDoor() {
    return instance({
        url: '/out-latest5'
    })
}

