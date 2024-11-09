import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { Label } from './ui/label'; // Ensure Label is properly imported.

const filterData = [
    {
        filterType: "Location",
        array: ["Delhi NCR", "Bangalore", "Hyderabad", "Pune", "Mumbai"],
    },
    {
        filterType: "Industry",
        array: ["Frontend Developer", "Backend Developer", "FullStack Developer"],
    },
    {
        filterType: "Salary",
        array: ["0-40k", "42-1lakh", "1lakh to 5lakh"],
    },
];

const FilterCard = () => {
    return (
        <div className="w-full bg-white p-3 rounded-md">
            <h1 className="font-bold text-lg">Filter Jobs</h1>
            <hr className="mt-3" />
            <RadioGroup>
                {filterData.map((data, index) => (
                    <div key={index} className="mt-4">
                        <h1 className="font-bold text-lg">{data.filterType}</h1>
                        {data.array.map((item, idx) => {
                            const itemId = `${data.filterType}-${idx}`; // Generate a unique id for each input.
                            return (
                                <div key={itemId} className="flex items-center space-x-2 my-2">
                                    <RadioGroupItem value={item} id={itemId} />
                                    <Label htmlFor={itemId}>{item}</Label>
                                </div>
                            );
                        })}
                    </div>
                ))}
            </RadioGroup>
        </div>
    );
};

export default FilterCard;
