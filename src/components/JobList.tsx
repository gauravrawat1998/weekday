import InfiniteScroll from "react-infinite-scroll-component";
import { useDispatch, useSelector } from "react-redux";
import JobCard from "./JobCard";
import { LIMIT, setFilters } from "../reducer/jobSlice";

interface JobListProps {
    loadMore: Function;
}

const JobList = (props: JobListProps) => {
    const { jobListTemp, jobList, filters } = useSelector(
        (state: any) => state.jobs
    );
    const dispatch = useDispatch();
    const { loadMore } = props;

    const shouldLoadMore = () =>
        !filters?.role &&
        !filters?.experience &&
        !filters?.location &&
        !filters?.minJdSalary;

    return (
        <div className="mt-20">
            <p className="mb-10">{jobListTemp?.totalCount} Jobs Found</p>
            {jobList?.jdList && jobList?.jdList?.length ? (
                <InfiniteScroll
                    dataLength={jobList.jdList.length}
                    scrollableTarget="scrollableDiv"
                    next={() => {
                        console.log(shouldLoadMore(), "shouldLoadMore()");

                        if (shouldLoadMore()) {
                            console.log("CALLED");

                            loadMore(filters?.limit, filters?.offset + LIMIT);
                            dispatch(
                                setFilters({ key: "offset", value: filters?.offset + LIMIT })
                            );
                        }
                    }}
                    hasMore={jobList.jdList.length < jobList.totalCount ? true : false}
                    loader={shouldLoadMore() ? <h4>Loading...</h4> : null}
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

export default JobList;
