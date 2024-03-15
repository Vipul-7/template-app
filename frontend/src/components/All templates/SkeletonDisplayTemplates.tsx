import { Skeleton } from '../ui/skeleton';

const SkeletonDisplayTemplates = () => {
    return (
        <div >
            <div className="grid grid-cols-3 justify-items-center gap-4">
                <SkeletonTemplateCard />
                <SkeletonTemplateCard />
                <SkeletonTemplateCard />
                <SkeletonTemplateCard />
                <SkeletonTemplateCard />
                <SkeletonTemplateCard />
            </div>
            <div className='py-2 my-2 w-full'>
                <Skeleton className='w-[10vw] m-auto h-10' />
            </div>
        </div>
    );
};

const SkeletonTemplateCard = () => {
    return <Skeleton className="w-[380px] h-[29vh]" />;
};

export default SkeletonDisplayTemplates;
