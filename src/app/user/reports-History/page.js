import ReportHistoryCard from "@/app/components/user/reportsHistory/reportHistoryCard/page";
import Link from "next/link";
import React from "react";

const ReportHistory = () => {
  return (
    <div>
      <div className="flex justify-between p-6">
        <div className="">
          <h2 className="text-2xl font-bold">History</h2>
          <p className="text-paraColor text-sm">
            Showing your all histories with a clear view.
          </p>
          <div className="border mt-6"></div>
        </div>
        <div>
          <Link
            href="create-report"
            className="hover:text-white hover:bg-desColor duration-700 border border-black p-1.5 rounded-full w-72 text-sm"
          >
            Create Report
          </Link>
        </div>
      </div>

      <div className="flex flex-wrap justify-center">
        <div className="p-3">
          <ReportHistoryCard
            heading="Keproy Junkies"
            des="15:37:15"
            des2="$ 5000"
            button="Avarage"
            iscolor={true}
          />
        </div>
        <div className="p-3">
          <ReportHistoryCard
            heading="Keproy Junkies"
            des="15:37:15"
            des2="$ 5000"
            button="Avarage"
            iscolor={false}
          />
        </div>
        <div className="p-3">
          <ReportHistoryCard
            heading="Keproy Junkies"
            des="15:37:15"
            des2="$ 5000"
            button="Avarage"
            iscolor={true}
          />
        </div>
        <div className="p-3">
          <ReportHistoryCard
            heading="Keproy Junkies"
            des="15:37:15"
            des2="$ 5000"
            button="Avarage"
            iscolor={false}
          />
        </div>
        <div className="p-3">
          <ReportHistoryCard
            heading="Keproy Junkies"
            des="15:37:15"
            des2="$ 5000"
            button="Avarage"
            iscolor={true}
          />
        </div>
        <div className="p-3">
          <ReportHistoryCard
            heading="Keproy Junkies"
            des="15:37:15"
            des2="$ 5000"
            button="Avarage"
            iscolor={false}
          />
        </div>
        <div className="p-3">
          <ReportHistoryCard
            heading="Keproy Junkies"
            des="15:37:15"
            des2="$ 5000"
            button="Avarage"
            iscolor={true}
          />
        </div>
        <div className="p-3">
          <ReportHistoryCard
            heading="Keproy Junkies"
            des="15:37:15"
            des2="$ 5000"
            button="Avarage"
            iscolor={false}
          />
        </div>
        <div className="p-3">
          <ReportHistoryCard
            heading="Keproy Junkies"
            des="15:37:15"
            des2="$ 5000"
            button="Avarage"
            iscolor={true}
          />
        </div>
        <div className="p-3">
          <ReportHistoryCard
            heading="Keproy Junkies"
            des="15:37:15"
            des2="$ 5000"
            button="Avarage"
            iscolor={true}
          />
        </div>
        <div className="p-3">
          <ReportHistoryCard
            heading="Keproy Junkies"
            des="15:37:15"
            des2="$ 5000"
            button="Avarage"
            iscolor={false}
          />
        </div>
        <div className="p-3">
          <ReportHistoryCard
            heading="Keproy Junkies"
            des="15:37:15"
            des2="$ 5000"
            button="Avarage"
            iscolor={true}
          />
        </div>
      </div>
    </div>
  );
};

export default ReportHistory;
