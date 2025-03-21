import { useDispatch, useSelector } from "react-redux";
import { Avatar, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Bell, LogOut, User2 } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { USER_API_END_POINT } from "@/constants";
import { setUser } from "@/redux/authSlice";
import { toast } from "sonner";
import { useState, useEffect } from "react";
import { io } from "socket.io-client";

const socket = io("http://localhost:8000");

const Navbar = () => {
  const { user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    if (!user || user.role !== "Student") return;

    console.log("🔔 Subscribing to job alerts for user:", user._id);
    socket.emit("subscribeToJobAlerts", user._id);

    socket.on("newJob", (job) => {
      console.log("New job received in frontend:", job);
      setNotifications((prev) => [...prev, job]);
    });

    return () => {
      socket.off("newJob");
    };
  }, [user]);

  const logoutHandler = async () => {
    try {
      const res = await axios.get(`${USER_API_END_POINT}/logout`, {
        withCredentials: true,
      });

      if (res.data.success) {
        dispatch(setUser(null));
        navigate("/");
        toast.success(res.data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Logout failed");
    }
  };

  return (
    <div className="bg-[#640D5F]">
      <div className="flex items-center justify-between mx-auto max-w-7xl h-16">
        <div>
        <Link to="/">
            <Button variant="outline">
          <h1 className="text-2xl font-bold text-yellow-300">
            Job<span className="text-[#F83002]">Sparx</span>
          </h1>
          </Button>
          </Link>
        </div>
        <div className="flex items-center gap-12">
          <ul className="flex font-medium items-center gap-5 text-white">
            {user && user.role === "Recruiter" ? (
              <>
                <li>
                  <Link to="/admin/companies">Companies</Link>
                </li>
                <li>
                  <Link to="/admin/jobs">Jobs</Link>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link to="/">Home</Link>
                </li>
                <li>
                  <Link to="/jobs">Jobs</Link>
                </li>
                <li>
                  <Link to="/browse">Browse</Link>
                </li>
              </>
            )}
          </ul>

          {/* Notification Bell Icon */}
          {user && user.role === "Student" && (
            <div className="relative">
              <button
                className="relative p-2 bg-gray-100 rounded-full"
                onClick={() => setShowDropdown(!showDropdown)}
              >
                <Bell className="w-6 h-6 text-white" />
                {notifications.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                    {notifications.length}
                  </span>
                )}
              </button>

              {showDropdown && (
                <div className="absolute right-0 mt-2 w-64 bg-white shadow-md rounded-lg p-2">
                  {notifications.length === 0 ? (
                    <p className="text-gray-500 text-sm">
                      No new notifications
                    </p>
                  ) : (
                    notifications.map((job, index) => (
                      <div key={index} className="p-2 border-b">
                        <strong className="text-blue-600">
                          New Job Opportunity:
                        </strong>{" "}
                        {job.title}
                      </div>
                    ))
                  )}
                </div>
              )}
            </div>
          )}

          {!user ? (
            <div className="flex items-center gap-2">
              <Link to="/login">
                <Button variant="outline">Login</Button>
              </Link>
              <Link to="/register">
                <Button className="bg-[#6A38C2] hover:bg-[#5b30a6]">
                  Signup
                </Button>
              </Link>
            </div>
          ) : (
            <Popover>
              <PopoverTrigger asChild>
                <Avatar className="cursor-pointer">
                  <AvatarImage
                    src={user?.profile?.profilePhoto}
                    alt="User Avatar"
                  />
                </Avatar>
              </PopoverTrigger>
              <PopoverContent className="w-80">
                <div>
                  <div className="flex gap-2 space-y-2">
                    <Avatar className="cursor-pointer">
                      <AvatarImage
                        src={user?.profile?.profilePhoto}
                        alt="User Avatar"
                      />
                    </Avatar>
                    <div>
                      <h4 className="font-medium">
                        {user?.fullName || "User"}
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        {user?.profile?.bio}
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-col my-2 text-gray-600">
                    {user.role === "Student" && (
                      <div className="flex w-fit items-center gap-2 cursor-pointer">
                        <User2 />
                        <Button variant="link">
                          <Link to="/profile">View Profile</Link>
                        </Button>
                      </div>
                    )}
                    <div className="flex w-fit items-center gap-2 cursor-pointer">
                      <LogOut />
                      <Button onClick={logoutHandler} variant="link">
                        Logout
                      </Button>
                    </div>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
