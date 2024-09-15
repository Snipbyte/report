import React from "react";
import HistoryTable from "../../components/reportHistory/historyTable/page";
import PlanCard from "../../components/reportHistory/planCard/page";
import UserLayout from "@/app/components/layouts/userLayout/page";

const ReportHistory = () => {
  return (
    <UserLayout>
      <div className="p-2">
        <p className="text-3xl font-bold text-headingColor my-4">Overall History</p>
        <div className="w-full md:flex block items-center gap-6">
          <PlanCard
            isprofessioanl={false}
            heading="Overall Reports"
            rate="400"
            days="Last report 2 days ago"
            btn="create new report"
          />
          <PlanCard
            isprofessioanl={true}
            heading="Reports this month"
            rate="52"
            days="last 30 days"
            btn="Generate a new report"
          />
        </div>
        <p className="text-3xl font-bold text-headingColor my-4">
          Report History
        </p>
        <HistoryTable />
      </div>
    </UserLayout>
  );
};

export default ReportHistory;
