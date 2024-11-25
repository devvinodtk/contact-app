import { Edit, Eye } from "lucide-react";
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
                    <th className="px-4 py-2 text-left font-medium border border-sky-100">Actions</th>
                  </tr>
                </thead>
                <tbody className="text-gray-600">
                  <tr className="hover:bg-sky-100">
                    <td className="px-4 py-2 border border-sky-100">1</td>
                    <td className="px-4 py-2 border border-sky-100">John Doe</td>
                    <td className="px-4 py-2 border border-sky-100">john.doe@example.com</td>
                    <td className="px-4 py-2 border border-sky-100">Admin</td>
                    <td className="px-4 py-2 border border-sky-100">
                      <button className="items-center px-3 py-1 text-sm bg-blue-500 text-white rounded-md hover:bg-blue-600" aria-label="Edit">
                        <Edit className="w-4 h-4 mr-1" />                        
                      </button>
                      <button
                        className="items-center px-3 mx-1 py-1 text-sm bg-green-500 text-white rounded-md hover:bg-green-600"
                        aria-label="View">
                        <Eye className="w-4 h-4 mr-1" />
                      </button>
                    </td>
                  </tr>
                  <tr className="hover:bg-sky-100">
                    <td className="px-4 py-2 border border-sky-100">2</td>
                    <td className="px-4 py-2 border border-sky-100">Jane Smith</td>
                    <td className="px-4 py-2 border border-sky-100">jane.smith@example.com</td>
                    <td className="px-4 py-2 border border-sky-100">Editor</td>
                    <td className="px-4 py-2 border border-sky-100">
                      <button className="items-center px-3 py-1 text-sm bg-blue-500 text-white rounded-md hover:bg-blue-600" aria-label="Edit">
                        <Edit className="w-4 h-4 mr-1" />                        
                      </button>
                      <button
                        className="items-center px-3 mx-1 py-1 text-sm bg-green-500 text-white rounded-md hover:bg-green-600"
                        aria-label="View">
                        <Eye className="w-4 h-4 mr-1" />
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

        </div>
      </div>
    </>
  );
}

export default OverviewPage;
