import { useDispatch } from "react-redux";
import { Button } from "./ui/button";
import { Search } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { setSearchedQuery } from "@/redux/jobSlice";
import GradientText from "./ui/GradientText";
import TextCursor from "./ui/TextCursor";

const HeroSection = () => {
  const [query, setQuery] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const searchJobHandler = () => {
    dispatch(setSearchedQuery(query));
    navigate("/browse");
  };

  return (
    <div className="relative bg-[#D91656] text-center text-white overflow-hidden mt-20">
      {/* Add TextCursor as full-screen overlay */}
      <TextCursor
        text="Dream Job"
        delay={0.01}
        spacing={80}
        followMouseDirection={true}
        randomFloat={true}
        exitDuration={0.3}
        removalInterval={20}
        maxPoints={10}
        className="absolute top-0 left-0 w-full h-full pointer-events-none z-50"
      />

      <div className="relative flex flex-col gap-5 my-10 z-10">
        {/* Tagline */}
        <GradientText
          animationSpeed={3}
          showBorder={true}
          className="custom-class mt-2 font-bold"
        >
          JOB HUNT WEBSITE!
        </GradientText>

        {/* Heading */}
        <h1 className="text-5xl font-bold relative z-20">
          Search, Apply & <br /> Get Your{" "}
          <span className="text-[#FFD700]">Dream Jobs</span>
        </h1>

        {/* Subheading */}
        <p className="text-gray-200 relative z-20">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid
          aspernatur temporibus nihil tempora dolor!
        </p>

        {/* Search Bar */}
        <div className="flex w-[40%] shadow-lg border border-gray-300 bg-[#FFFFFF33] rounded-full items-center gap-4 mx-auto pl-3 relative z-20">
          <input
            type="text"
            placeholder="Find your dream jobs"
            onChange={(e) => setQuery(e.target.value)}
            className="bg-transparent outline-none border-none text-white placeholder-white w-full"
          />
          <Button
            onClick={searchJobHandler}
            className="rounded-r-full bg-[#FFD700] hover:bg-[#FFC400]"
          >
            <Search className="h-5 w-5 text-[#D91656]" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
