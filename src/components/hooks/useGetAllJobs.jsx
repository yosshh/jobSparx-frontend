import { setAllJobs } from '@/redux/jobSlice'
import { JOB_API_END_POINT } from '@/constants'
import axios from 'axios'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

const useGetAllJobs = () => {
    const dispatch = useDispatch();
    const { searchedQuery } = useSelector(store=> store.job)
    useEffect(()=>{
        const fetchAllJobs = async () => {
            try {
                const res = await axios.get(`${JOB_API_END_POINT}/get?keyword=${searchedQuery}`,{withCredentials:true});
                // console.log("API Response:", res.data); 
                console.log("Jobs fetched:", res.data);
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