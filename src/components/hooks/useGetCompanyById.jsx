import { COMPANY_API_END_POINT } from '@/constants';
import axios from 'axios';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom'; 
import { setSingleCompany } from '@/redux/companySlice';

const useGetCompanyById = () => {
  const dispatch = useDispatch();
  const { id: companyId } = useParams(); 
  // console.log("Company ID from Params:", companyId);

  useEffect(() => {
    const fetchSingleCompany = async () => {
      try {
        if (!companyId) {
          console.log("Company ID is undefined. Skipping API call.");
          return;
        }

        const res = await axios.get(`${COMPANY_API_END_POINT}/get-company/${companyId}`, { withCredentials: true });
        // console.log("API Response:", res.data); 
        console.log("company fetched:", res.data);
        if (res.data.success) {
          dispatch(setSingleCompany(res.data.data));
          // console.log("Dispatched single company:", res.data.data);
        }
      } catch (error) {
        console.error("Error fetching company:", error);
      }
    };

    fetchSingleCompany();
  }, [companyId, dispatch]);

  return companyId; // Optionally return companyId for further use
};

export default useGetCompanyById;


