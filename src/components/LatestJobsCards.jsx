import { useNavigate } from "react-router-dom";
import { Badge } from "./ui/badge";
import TiltedCard from "./ui/TiltedCard"; // Import TiltedCard

const LatestJobCards = ({ job }) => {
  const navigate = useNavigate();

  return (
    <TiltedCard scaleOnHover={1.05} rotateAmplitude={10}>
      <div
        onClick={() => navigate(`/description/${job._id}`)}
        className="cursor-pointer"
      >
        {/* Company Name */}
        <div>
          <h1 className="font-medium text-lg">{job?.company?.name}</h1>
          <p className="text-sm text-gray-500">India</p>
        </div>

        {/* Job Title & Description */}
        <div>
          <h1 className="font-bold text-lg my-2">{job?.title}</h1>
          <p className="text-sm text-gray-600">{job?.description}</p>
        </div>

        {/* Job Details */}
        <div className="flex items-center gap-2 mt-4">
          <Badge className="text-blue-700 font-bold" variant="ghost">
            {job?.position} Positions
          </Badge>
          <Badge className="text-[#F83002] font-bold" variant="ghost">
            {job?.jobType}
          </Badge>
          <Badge className="text-[#7209b7] font-bold" variant="ghost">
            {job?.salary} LPA
          </Badge>
        </div>
      </div>
    </TiltedCard>
  );
};

export default LatestJobCards;
