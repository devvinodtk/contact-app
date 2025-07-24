import { Download } from "lucide-react";
import Header from "./common/Header";
import { useSelector } from "react-redux";
import { selectActiveMembers } from "../store/MemberSelector";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import React from "react";

const AddressList = () => {
  const postalAddressRef = React.useRef(null);
  const namePhoneRef = React.useRef(null);

  const downloadPostalAddress = async () => {
    try {
    const res = await fetch('https://us-central1-kk-contact-app.cloudfunctions.net/api/generate-pdf');
    const blob = await res.blob();
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'records.pdf';
    document.body.appendChild(a);
    a.click();
    a.remove();
    } catch (err) {
      console.log("Error downloading the file: ", err);
    }
  }

  const downloadNamePhoneList = async () => {
    const element = namePhoneRef.current;
    if (!element) {
      return;
    }

    const canvas = await html2canvas(element, {
      scale: 2,
    });
    const data = canvas.toDataURL("image/png");

    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "px",
      format: "a4",
    });

    const imgProperties = pdf.getImageProperties(data);
    let pdfWidth = pdf.internal.pageSize.getWidth();
    const margin = 20;
    pdfWidth = pdfWidth - 2 * margin;
    const pdfHeight = (imgProperties.height * pdfWidth) / imgProperties.width;

    pdf.addImage(data, "PNG", margin, margin, pdfWidth, pdfHeight);
    pdf.save("Name-Phone-Area.pdf");
  }
  // return <Header title="Address List" />;
  const activeMembers = useSelector(selectActiveMembers);

  return (
    <>
      <div className="flex-1 overflow-auto relative z-10 mt-16 sm:mt-0">
        <Header title="Address List" />
        <div className="w-full rounded-lg pl-6" >
          <h2 className="text-xl ml-10 p-6 pb-0 sm:ml-0 font-semibold text-black flex justify-left items-center">
            <span>Postal Address List</span>
            <span className="text-red-500 cursor-pointer" onClick={downloadPostalAddress}>
              <Download className="h-6 w-6 ml-2 mt-2 text-red-500" />
            </span>
          </h2>
        </div>
        <div className="m-5 mt-0">
          <div className="w-full rounded-lg mb-6" >
            <div className="overflow-x-auto bg-white text-gray-700  rounded-lg" ref={postalAddressRef}>
              <div className="max-w-full p-6">

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5" >
                  {activeMembers?.length > 0 &&
                    activeMembers
                      .filter(
                        (member) =>
                          member.communicationPreference != 'In Person',
                      )
                      .map((member) => {
                        return (
                          <div
                            key={member.memberId}
                            className="p-4 bg-white border border-black"
                          >
                            <p className="text-black mb-1">To,</p>
                            <h3 className="text-lg font-semibold text-black">
                              {member.personalDetails.name}
                            </h3>
                            <p className="text-black">
                              {member.presentAddress.flatNumberName}
                            </p>
                            <p className="text-gray-600">
                              {member.presentAddress.addressLine1},{' '}
                              {member.presentAddress.addressLine2}
                            </p>
                            <p className="text-gray-600">
                              {member.presentAddress.city},{' '}
                              {member.presentAddress.state} -{' '}
                              {member.presentAddress.pincode}{' '}
                            </p>
                            <p className="text-gray-600">
                              Phone: {'+91 - '}{' '}
                              {member.personalDetails.mobileNumber}
                            </p>
                          </div>
                        );
                      })}
                </div>
              </div>
            </div>
          </div>



          <div className="max-w-full mx-auto pl-6">
            <h2 className="text-xl ml-10 sm:ml-0 font-semibold text-black flex justify-left items-center">
              <span>Members list with mobile number</span>
              <span className="text-red-500 cursor-pointer" onClick={downloadNamePhoneList}>
                <Download className="h-6 w-6 ml-2 mt-2 text-red-500" />
              </span>
            </h2>
          </div>

          <div className="w-full mx-auto p-6 mb-6">
            <div className="overflow-x-auto">
              <table className="w-full border-collapse border border-black" ref={namePhoneRef}>
                <thead className="bg-gray-100">
                  <tr>
                    <th className="border border-black px-4 py-2 text-left text-black">
                      Sl. No.
                    </th>
                    <th className="border border-black px-4 py-2 text-left text-black">
                      Name
                    </th>
                    <th className="border border-black px-4 py-2 text-left text-black">
                      Mobile
                    </th>
                    <th className="border border-black px-4 py-2 text-left text-black">
                      Area
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {activeMembers?.length > 0 &&
                    activeMembers.map((member, index) => {
                      return (
                        <tr key={member.memberId} className="hover:bg-gray-50">
                          <td className="border border-black px-4 py-2 text-black">
                            {index + 1}
                          </td>
                          <td className="border border-black px-4 py-2 text-black">
                            {member.personalDetails.name}
                          </td>
                          <td className="border border-black px-4 py-2 text-black">
                            +91 - {member.personalDetails.mobileNumber}
                          </td>
                          <td className="border border-black px-4 py-2 text-black">
                            {member.presentAddress.postOffice}
                          </td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddressList;
