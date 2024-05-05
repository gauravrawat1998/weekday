import InfiniteScroll from "react-infinite-scroll-component";
import { useSelector } from "react-redux";
import JobCard from "./JobCard";

const jobListTemp = () => {
    const { jobListTemp, jobList } = useSelector((state: any) => state.jobs);

    return (
        <div className="mt-20">
            <p className="mb-10">{jobListTemp?.totalCount} Jobs Found</p>
            {jobList?.jdList && jobList?.jdList?.length ? (
                <InfiniteScroll
                    dataLength={jobList.jdList.length}
                    next={() => { }}
                    hasMore={jobList.jdList.length < jobList.totalCount ? true : false}
                    loader={<h4>Loading...</h4>}
                    endMessage={
                        <p style={{ textAlign: "center" }}>
                            <b>Yay! You have seen it all</b>
                        </p>
                    }
                >
                    {jobListTemp?.jdList?.map((job: any, index: number) => (
                        <JobCard key={index} job={job} />
                    ))}
                </InfiniteScroll>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};

export default jobListTemp;
