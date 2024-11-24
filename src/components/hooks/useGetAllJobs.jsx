import { setAllJobs } from '@/redux/jobSlice'
import { JOB_API_END_POINT } from '../constants/index'
import axios from 'axios'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'

const useGetAllJobs = () => {
    const dispatch = useDispatch();
    useEffect(()=>{
        const fetchAllJobs = async () => {
            try {
                const res = await axios.get(`${JOB_API_END_POINT}/get-company`,{withCredentials:true});
                // console.log("API Response:", res.data); 
                if(res.data.success){
                    dispatch(setAllJobs(res.data.data));
                }
            } catch (error) {
                console.log(error);
            }
        }
        fetchAllJobs();
    },[])
}

export default useGetAllJobs