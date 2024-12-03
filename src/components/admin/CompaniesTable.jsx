import { Edit2, MoreHorizontal } from "lucide-react";
import { Avatar, AvatarImage } from "../ui/avatar";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const CompaniesTable = () => {
//   const state = useSelector((store) => store);
// console.log("Redux State:", state);
const navigate = useNavigate();

const { companies, searchCompanyByText } = useSelector(store => store.company);
  // console.log("companies from redux", companies);
  const [filterCompany, setFilterCompany] = useState(companies);
  
  useEffect(()=>{
    // console.log("companies length", companies.length);
    
    const filteredCompany = companies.length >= 0 && companies.filter((company)=>{
        if(!searchCompanyByText){
            return true
        };
        console.log("company name", company.companyName);
        
        return company?.companyName?.toLowerCase().includes(searchCompanyByText.toLowerCase());

    });
    setFilterCompany(filteredCompany);
},[companies,searchCompanyByText])
  return (
    
    
    <div>
      <Table>
        <TableCaption>A list of your recent registered companies</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Logo</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filterCompany?.map((company) => (
            <TableRow key={company._id}>
              <TableCell>
                <Avatar>
                  <AvatarImage
                    src={company.logo || "/default-logo.png"}
                    alt={`${company.companyName} Logo`}
                  />
                </Avatar>
              </TableCell>
              <TableCell>{company.companyName}</TableCell>
              <TableCell>{company.createdAt?.split("T")[0] || "N/A"}</TableCell>
              <TableCell className="text-right cursor-pointer">
                <Popover>
                  <PopoverTrigger>
                    <MoreHorizontal />
                  </PopoverTrigger>
                  <PopoverContent className="w-32 mt-2">
                    <div onClick={()=> navigate(`/admin/companies/${company._id}`)} className="flex items-center gap-2 w-fit cursor-pointer">
                      <Edit2 className="w-4" />
                      <span>Edit</span>
                    </div>
                  </PopoverContent>
                </Popover>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default CompaniesTable;
