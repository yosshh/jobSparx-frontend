import { useDispatch } from 'react-redux';
import { Button } from './ui/button';
import { Search } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { setSearchedQuery } from '@/redux/jobSlice';

const HeroSection = () => {
    const [query, setQuery] = useState("");

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const searchJobHandler = () => {
        dispatch(setSearchedQuery(query));
        navigate("/browse");
    };

    return (
        <div className="bg-[#D91656] text-center text-white">
            <div className="flex flex-col gap-5 my-10">
                {/* Tagline */}
                <span className="mx-auto px-4 py-2 rounded-full bg-[#FFD6E0] text-[#C3154A] font-medium mt-2">
                    No. 1 Job Hunt Website
                </span>

                {/* Heading */}
                <h1 className="text-5xl font-bold">
                    Search, Apply & <br /> Get Your{" "}
                    <span className="text-[#FFD700]">Dream Jobs</span>
                </h1>

                {/* Subheading */}
                <p className="text-gray-200">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid aspernatur temporibus nihil tempora dolor!
                </p>

                {/* Search Bar */}
                <div className="flex w-[40%] shadow-lg border border-gray-300 bg-[#FFFFFF33] rounded-full items-center gap-4 mx-auto pl-3">
                    <input
                        type="text"
                        placeholder="Find your dream jobs"
                        onChange={(e) => setQuery(e.target.value)}
                        className="bg-transparent outline-none border-none text-white placeholder-white w-full"
                    />
                    <Button onClick={searchJobHandler} className="rounded-r-full bg-[#FFD700] hover:bg-[#FFC400]">
                        <Search className="h-5 w-5 text-[#D91656]" />
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default HeroSection;
