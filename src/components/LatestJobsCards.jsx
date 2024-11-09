import { Badge } from './ui/badge'

const LatestJobCards = () => {
    return (
        <div className='p-5 rounded-md shadow-xl bg-white border border-gray-100 cursor-pointer'>
            <div>
                <h1 className='font-medium text-lg'>Company Name</h1>
                <p className='text-sm text-gray-500'>India</p>
            </div>
            <div>
                <h1 className='font-bold text-lg my-2'>Job Title</h1>
                <p className='text-sm text-gray-600'>Lorem ipsum ca afajaj</p>
            </div>
            <div className='flex items-center gap-2 mt-4'>
                <Badge className={'text-blue-700 font-bold'} variant="ghost">Job Positions</Badge>
                <Badge className={'text-[#F83002] font-bold'} variant="ghost">Job Type</Badge>
                <Badge className={'text-[#7209b7] font-bold'} variant="ghost">job salary in LPA</Badge>
            </div>

        </div>
    )
}

export default LatestJobCards