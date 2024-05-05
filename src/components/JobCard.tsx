import { capitalizeFirstLetter } from "../utils/globalFunctions";

interface JobCardProps {
    job: any;
}

const JobCard = (props: JobCardProps) => {
    const { job } = props;
    return (
        <div className="job_card_container">
            <div className="job_card_header">
                <img src={job?.logoUrl} alt={job?.companyName} />
                <div>
                    <h3>{job?.companyName}</h3>
                    {job?.jobRole && (
                        <p>Position: {capitalizeFirstLetter(job?.jobRole)}</p>
                    )}
                    {job?.location && (
                        <p>Location: {capitalizeFirstLetter(job?.location)}</p>
                    )}
                </div>
            </div>
            {job?.minJdSalary && job?.maxJdSalary && (
                <p className="mb-10">
                    <b>Estimated Salary:</b> ₹{job?.minJdSalary} - ₹{job?.maxJdSalary}{" "}
                </p>
            )}
            {job?.jobDetailsFromCompany && (
                <>
                    <h4 className="mb-10">About Company</h4>
                    <p className="mb-10">{job?.jobDetailsFromCompany}</p>
                </>
            )}
            {job?.minExp && (
                <>
                    <p>
                        <b> Minimum Experience</b>
                    </p>
                    <p>
                        {job?.minExp} {job?.minExp > 1 ? "years" : "year"}
                    </p>
                </>
            )}
        </div>
    );
};

export default JobCard;
