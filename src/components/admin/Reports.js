import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import ShowReports from "./ShowReports";
import ReportsTrash from "./ReportsTrash";

const Reports = () => {
  return (
    <div className='min-h-screen  flex-1 bg-gray-200'>
      {/* waiting and remove posts */}
      <div className='bg-gray-200 '>
        <div className='flex  gap-x-10 pt-32   justify-around border-b-2 border-gray-300'>
          <Link to='/admin/dashboard/reports/show_reports'>
            <h1 className='hover:text-gray-400 transition-all duration-300 ease-in-out text-xs lg:text-lg'>
              Reports
            </h1>
          </Link>

          <Link to='/admin/dashboard/reports/trash'>
            <h1 className='hover:text-gray-400 transition-all duration-300 ease-in-out text-xs lg:text-lg'>
              Trash
            </h1>
          </Link>
        </div>

        {/* content */}

        <div>
          <Route
            exact
            path='/admin/dashboard/reports/show_reports'
            component={ShowReports}
          />
          <Route
            exact
            path='/admin/dashboard/reports/trash'
            component={ReportsTrash}
          />
        </div>
      </div>
    </div>
  );
};

export default Reports;
