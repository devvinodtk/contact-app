import { Edit, Eye, Mail, Phone, CalendarDays, Droplets, GraduationCap, Briefcase } from "lucide-react";
import Header from "./common/Header";

function OverviewPage() {
  return (
    <>
      <div className="flex-1 overflow-auto relative z-10">
        <Header title="Dashboard" />
        <div className="m-5">
          <div className="container mx-auto">
            <div className="overflow-x-auto bg-white  rounded-lg">
              <table className="w-full border-collapse border border-gray-100">
                <thead className="bg-sky-50 text-gray-700">
                  <tr>
                    <th className="px-4 py-2 text-left font-medium border border-sky-100">ID</th>
                    <th className="px-4 py-2 text-left font-medium border border-sky-100">Name</th>
                    <th className="px-4 py-2 text-left font-medium border border-sky-100">Email</th>
                    <th className="px-4 py-2 text-left font-medium border border-sky-100">Phone Number</th>
                    <th className="px-4 py-2 text-left font-medium border border-sky-100 w-[125px]">Actions</th>
                  </tr>
                </thead>
                <tbody className="text-gray-600">
                  <tr className="hover:bg-sky-100">
                    <td className="px-4 py-2 border border-sky-100">1</td>
                    <td className="px-4 py-2 border border-sky-100">John Doe</td>
                    <td className="px-4 py-2 border border-sky-100">john.doe@example.com</td>
                    <td className="px-4 py-2 border border-sky-100">Admin</td>
                    <td className="px-4 py-2 border border-sky-100 w-[125px]">
                      <button className="items-center px-3 py-1 text-sm bg-blue-500 text-white rounded-md hover:bg-blue-600" aria-label="Edit">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        className="items-center px-3 mx-1 py-1 text-sm bg-green-500 text-white rounded-md hover:bg-green-600"
                        aria-label="View">
                        <Eye className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                  <tr className="hover:bg-sky-100">
                    <td className="px-4 py-2 border border-sky-100">2</td>
                    <td className="px-4 py-2 border border-sky-100">Jane Smith</td>
                    <td className="px-4 py-2 border border-sky-100">jane.smith@example.com</td>
                    <td className="px-4 py-2 border border-sky-100">Editor</td>
                    <td className="px-4 py-2 border border-sky-100 w-[125px]">
                      <button className="items-center px-3 py-1 text-sm bg-blue-500 text-white rounded-md hover:bg-blue-600" aria-label="Edit">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        className="items-center px-3 mx-1 py-1 text-sm bg-green-500 text-white rounded-md hover:bg-green-600"
                        aria-label="View">
                        <Eye className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

        </div>
      </div>
      <div className="max-w-80 mr-1 w-full bg-white rounded-lg shadow-md overflow-hidden" >
        <div className="bg-sky-500 h-32 flex justify-center items-center">
          <img
            src="https://via.placeholder.com/100"
            alt="Profile"
            className="w-24 h-24 rounded-full border-4 border-white shadow-md"
          />
        </div>

        <div className="p-6">
          <h2 className="text-2xl font-bold text-gray-800 text-center mb-4"><span className="text-gray-800">John Doe</span></h2>
          <div className="space-y-4">
            <div className="flex items-center border-b border-gray-200 pb-2">
              <span className="text-gray-600 font-medium"><CalendarDays className="w-4 h-4 mr-3 text-sky-600" /></span>
              <span className="text-gray-800">1st January 1990</span>
            </div>
            <div className="flex items-center border-b border-gray-200 pb-2">
              <span className="text-gray-600 font-medium"><Phone className="w-4 h-4 mr-3 text-sky-600" /></span>
              <span className="text-gray-800">+91 98765 43210</span>
            </div>
            <div className="flex items-center border-b border-gray-200 pb-2">
              <span className="text-gray-600 font-medium"><Mail className="w-4 h-4 mr-3 text-sky-600" /></span>
              <span className="text-gray-800">sureshkumarprs@gmail.com</span>
            </div>
            <div className="flex items-center border-b border-gray-200 pb-2">
              <span className="text-gray-600 font-medium"><Droplets className="w-4 h-4 mr-3 text-sky-600" /></span>
              <span className="text-gray-800">A+</span>
            </div>
            <div className="flex items-center border-b border-gray-200 pb-2">
              <span className="text-gray-600 font-medium"><GraduationCap className="w-4 h-4 mr-3 text-sky-600" /></span>
              <span className="text-gray-800">Master of Business Administraion</span>
            </div>
            <div className="flex  items-center border-b border-gray-200 pb-2">
              <span className="text-gray-600 font-medium"><Briefcase className="w-4 h-4 mr-3 text-sky-600" /></span>
              <span className="text-gray-800">Software Egineer</span>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-700 mb-2">Present Address*</h3>
              <div className="space-y-2">
                <div className="">
                  <span className="text-gray-800">123, </span><span className="text-gray-800">Vasantha Bhavan, </span><span className="text-gray-800">Main Road, </span>
                  <span className="text-gray-800">Nagashettyhalli, </span><span className="text-gray-800">Sanjaynagar PO, </span>
                  <span className="text-gray-800">Bangalore, </span><span className="text-gray-800">Karnataka, </span><span className="text-gray-800">560054</span>
                </div>
              </div>
            </div>
            <div className="flex items-end md w-full max-w-md">
              <button className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
                Edit
              </button>

              <button className="px-4 py-2 ml-2 bg-green-500 text-white rounded-md hover:bg-green-600">
                View More
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default OverviewPage;
