import axios from "axios";

const axiosinstance=axios.create({
    baseURL:"http://localhost:3000",
    timeout:5000
})

// global error handling

axiosinstance.interceptors.response.use(
    (response)=>{
        console.log("API response recived");
        return response
    },
    (error)=>{
        if(error.response){
            const status=error.response.status
            if(status===401){
                console.log("Unauthorized Access");
            }
            else if(status===404){
                console.log("API or resource not found");
            }
            else if(status===500){
                console.log("Server error");
            }
            else{
                console.log("HTTP Error",status);
            }
        }else if(error.request){
            console.log("No response from the server");
        }else{
            console.log("Error",error.message);
        }
        return Promise.reject(error)
    }
)

export default axiosinstance