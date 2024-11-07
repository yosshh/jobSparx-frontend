import Navbar from "../shared/Navbar";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { RadioGroup } from "../ui/radio-group";
import { Button } from "../ui/button";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from 'axios'
import { USER_API_END_POINT } from "@/constants";
import { toast } from 'sonner'

const Signup = () => {
  const navigate = useNavigate();
  const [input, setInput] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    password: "",
    role: "",
    file: ""
});

const changeEventHandler = (e) => {
  setInput({ ...input, [e.target.name]: e.target.value });
}
const changeFileHandler = (e) => {
  setInput({ ...input, file: e.target.files?.[0] });
}

const submitHandler = async (e) => {
  e.preventDefault();
  const formData = new FormData();    //formdata object
  formData.append("fullName", input.fullName);
  formData.append("email", input.email);
  formData.append("phoneNumber", input.phoneNumber);
  formData.append("password", input.password);
  formData.append("role", input.role);
  if (input.file) {
      formData.append("file", input.file);
  }

  try {
      const res = await axios.post(`${USER_API_END_POINT}/register`, formData, {
          headers: { 'Content-Type': "multipart/form-data" },
          withCredentials: true,
      });
      if (res.data.success) {
          navigate("/login");
          toast.success(res.data.message);
      }
  } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
  }
}
  return (
    <div>
      <Navbar />
      <div className="flex items-center justify-center max-w-7xl mx-auto">
        <form
          onSubmit={submitHandler}
          className="w-1/2 border border-gray-200 rounded-md p-4 my-10"
        >
          <h1 className="font-bold text-xl mb-5">Sign Up</h1>
          <div className="my-2">
            <Label>Full Name</Label>
            <Input type="text" name="fullName" placeholder="name" value={input.fullName} onChange={changeEventHandler} />
          </div>
          <div className="my-2">
            <Label>Email</Label>
            <Input type="text" name="email" placeholder="email" value={input.email} onChange={changeEventHandler} />
          </div>
          <div className="my-2">
            <Label>phoneNumber</Label>
            <Input type="text" name="phoneNumber" placeholder="999XXXXX" value={input.phoneNumber} onChange={changeEventHandler} />
          </div>
          <div className="my-2">
            <Label>Password</Label>
            <Input type="text" name="password" placeholder="password" value={input.password} onChange={changeEventHandler} />
          </div>
          <div className="flex items-center justify-between">
            <RadioGroup className="flex items-center gap-4 my-5">
              <div className="flex items-center space-x-2">
                <Input
                  type="radio"
                  name="role"
                  value="Student"
                  checked={input.role === 'Student'}
                  onChange={changeEventHandler}
                  className="cursor-pointer"
                />
                <Label htmlFor="r1">Student</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Input
                  type="radio"
                  name="role"
                  value="Recruiter"
                  checked={input.role === 'Recruiter'}
                  onChange={changeEventHandler}
                  className="cursor-pointer"
                />
                <Label htmlFor="r2">Recruiter</Label>
              </div>
            </RadioGroup>
            <div className="flex items-center gap-2">
              <Label>Profile</Label>
              <Input accept="image/*" name="profileImage" type="file" className="cursor-pointer" onChange={changeFileHandler} />
            </div>
          </div>
          <Button type="submit" className="w-full my-4">Signup</Button>
          <span className='text-sm'>Already have an account? <Link to="/login" className='text-blue-600'>Login</Link></span>
        </form>
      </div>
    </div>
  );
};

export default Signup;
