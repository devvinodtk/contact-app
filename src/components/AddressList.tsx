import { Download } from "lucide-react";
import Header from "./common/Header";

const AddressList = () => {
  // return <Header title="Address List" />;
  return (
    <>
      <div className="flex-1 overflow-auto relative z-10 mt-16 sm:mt-0">
        <Header title="Address List" />
        <div className="m-5">
          <div className="w-full mx-auto border rounded-lg mb-6">
            <div className="overflow-x-auto bg-white text-gray-700  rounded-lg">
              <div className="max-w-full p-6">
                <h2 className="mb-4 text-xl ml-10 sm:ml-0 font-semibold text-black flex justify-left items-center">
                  <span>Postal Address List</span>
                  <a href="#" className="text-red-500">
                    <Download className="h-6 w-6 ml-2 mt-2 text-red-500" /></a>
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="p-4 bg-white border border-gray-200">
                    <p className="text-gray-600 mb-1">To,</p>
                    <h3 className="text-lg font-semibold text-gray-800">Suresh Kumar P R</h3>
                    <p className="text-gray-600">S3, Brundavan Apartments</p>
                    <p className="text-gray-600">Second cross, Pattelappa layout</p>
                    <p className="text-gray-600">Nagashetti Halli, Sanjaynagar </p>
                    <p className="text-gray-600">Bangalore, Karnataka - 560094 </p>
                  </div>
                  <div className="p-4 bg-white border border-gray-200">
                    <p className="text-gray-600 mb-1">To,</p>
                    <h3 className="text-lg font-semibold text-gray-800">Suresh Kumar P R</h3>
                    <p className="text-gray-600">S3, Brundavan Apartments</p>
                    <p className="text-gray-600">Second cross, Pattelappa layout</p>
                    <p className="text-gray-600">Nagashetti Halli, Sanjaynagar </p>
                    <p className="text-gray-600">Bangalore, Karnataka - 560094 </p>
                  </div>
                  <div className="p-4 bg-white border border-gray-200">
                    <p className="text-gray-600 mb-1">To,</p>
                    <h3 className="text-lg font-semibold text-gray-800">Suresh Kumar P R</h3>
                    <p className="text-gray-600">S3, Brundavan Apartments</p>
                    <p className="text-gray-600">Second cross, Pattelappa layout</p>
                    <p className="text-gray-600">Nagashetti Halli, Sanjaynagar </p>
                    <p className="text-gray-600">Bangalore, Karnataka - 560094 </p>
                  </div>
                  <div className="p-4 bg-white border border-gray-200">
                    <p className="text-gray-600 mb-1">To,</p>
                    <h3 className="text-lg font-semibold text-gray-800">Suresh Kumar P R</h3>
                    <p className="text-gray-600">S3, Brundavan Apartments</p>
                    <p className="text-gray-600">Second cross, Pattelappa layout</p>
                    <p className="text-gray-600">Nagashetti Halli, Sanjaynagar </p>
                    <p className="text-gray-600">Bangalore, Karnataka - 560094 </p>
                  </div>
                </div>
              </div>

            </div>
          </div>

          <div className="w-full mx-auto border rounded-lg mb-6">
            <div className="overflow-x-auto bg-white text-gray-700  rounded-lg">
              <div className="max-w-full p-6">
                <h2 className="mb-4 text-xl ml-10 sm:ml-0 font-semibold text-black flex justify-left items-center">
                  <span>Address List - Dierect</span>
                  <a href="#" className="text-red-500">
                    <Download className="h-6 w-6 ml-2 mt-2 text-red-500" /></a>
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="p-4 bg-white border border-gray-200">
                    <p className="text-gray-600 mb-1">To,</p>
                    <h3 className="text-lg font-semibold text-gray-800">Suresh Kumar P R</h3>
                    <p className="text-gray-600">S3, Brundavan Apartments</p>
                    <p className="text-gray-600">Second cross, Pattelappa layout</p>
                    <p className="text-gray-600">Nagashetti Halli, Sanjaynagar </p>
                    <p className="text-gray-600">Bangalore, Karnataka - 560094 </p>
                    <p className="text-gray-600">Mobile: 8792527628</p>
                  </div>
                  <div className="p-4 bg-white border border-gray-200">
                    <p className="text-gray-600 mb-1">To,</p>
                    <h3 className="text-lg font-semibold text-gray-800">Suresh Kumar P R</h3>
                    <p className="text-gray-600">S3, Brundavan Apartments</p>
                    <p className="text-gray-600">Second cross, Pattelappa layout</p>
                    <p className="text-gray-600">Nagashetti Halli, Sanjaynagar </p>
                    <p className="text-gray-600">Bangalore, Karnataka - 560094 </p>
                    <p className="text-gray-600">Mobile: 8792527628</p>
                  </div>
                  <div className="p-4 bg-white border border-gray-200">
                    <p className="text-gray-600 mb-1">To,</p>
                    <h3 className="text-lg font-semibold text-gray-800">Suresh Kumar P R</h3>
                    <p className="text-gray-600">S3, Brundavan Apartments</p>
                    <p className="text-gray-600">Second cross, Pattelappa layout</p>
                    <p className="text-gray-600">Nagashetti Halli, Sanjaynagar </p>
                    <p className="text-gray-600">Bangalore, Karnataka - 560094 </p>
                    <p className="text-gray-600">Mobile: 8792527628</p>
                  </div>
                  <div className="p-4 bg-white border border-gray-200">
                    <p className="text-gray-600 mb-1">To,</p>
                    <h3 className="text-lg font-semibold text-gray-800">Suresh Kumar P R</h3>
                    <p className="text-gray-600">S3, Brundavan Apartments</p>
                    <p className="text-gray-600">Second cross, Pattelappa layout</p>
                    <p className="text-gray-600">Nagashetti Halli, Sanjaynagar </p>
                    <p className="text-gray-600">Bangalore, Karnataka - 560094 </p>
                    <p className="text-gray-600">Mobile: 8792527628</p>
                  </div>
                </div>
              </div>
            </div>
          </div>


          <div className="max-w-4xl mx-auto p-4 border rounded-lg mb-6">
            <h2 className="mb-4 text-xl ml-10 sm:ml-0 font-semibold text-black flex justify-left items-center">
              <span>Members list with mobile number</span>
              <a href="#" className="text-red-500">
                <Download className="h-6 w-6 ml-2 mt-2 text-red-500" /></a>
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse border border-gray-300">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="border border-gray-300 px-4 py-2 text-left text-gray-700">Sl. No.</th>
                    <th className="border border-gray-300 px-4 py-2 text-left text-gray-700">Name</th>
                    <th className="border border-gray-300 px-4 py-2 text-left text-gray-700">Mobile</th>
                    <th className="border border-gray-300 px-4 py-2 text-left text-gray-700">Area</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="hover:bg-gray-50">
                    <td className="border border-gray-300 px-4 py-2 text-gray-600">1</td>
                    <td className="border border-gray-300 px-4 py-2 text-gray-600">John Doe</td>
                    <td className="border border-gray-300 px-4 py-2 text-gray-600">+1234567890</td>
                    <td className="border border-gray-300 px-4 py-2 text-gray-600">Springfield</td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="border border-gray-300 px-4 py-2 text-gray-600">2</td>
                    <td className="border border-gray-300 px-4 py-2 text-gray-600">Jane Smith</td>
                    <td className="border border-gray-300 px-4 py-2 text-gray-600">+9876543210</td>
                    <td className="border border-gray-300 px-4 py-2 text-gray-600">Houston</td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="border border-gray-300 px-4 py-2 text-gray-600">3</td>
                    <td className="border border-gray-300 px-4 py-2 text-gray-600">Michael Johnson</td>
                    <td className="border border-gray-300 px-4 py-2 text-gray-600">+1928374650</td>
                    <td className="border border-gray-300 px-4 py-2 text-gray-600">San Francisco</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

        </div>
      </div>
    </>)
};

export default AddressList;
