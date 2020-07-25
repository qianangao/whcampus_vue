import axios from 'axios'

const instance=axios.create({
    baseURL: '/api'
})

instance.interceptors.request.use(config=>{
    return config
})

instance.interceptors.response.use(response=>{
    if (response.status === 200) {
        return response.data
    }else{
        return Promise.reject(response)
    } 
},
error => {
// do something with request error
console.log(error) // for debug
return Promise.reject(error)
})

export default instance