import { COMPANY_API_END_POINT } from '@/constants';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setCompanies } from '@/redux/companySlice';
import { useEffect } from 'react';

const useGetAllCompanies = () => {
  const dispatch = useDispatch();
  useEffect(()=> {
    const fetchCompanies = async () => {
      try {
        const res = await axios.get(`${COMPANY_API_END_POINT}/get-company`, { withCredentials: true });

        if (res.data.success) {
          dispatch(setCompanies(res.data.data));
        }
      } catch (error) {
        console.log("Error fetching company:", error);
      }
    };

    fetchCompanies();
  }, []);
}

export default useGetAllCompanies;

