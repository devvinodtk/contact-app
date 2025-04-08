import { Download } from "lucide-react";
import Header from "./common/Header";
import { useSelector } from "react-redux";
import { selectActiveMembers } from "../store/MemberSelector";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import React from "react";

const AddressList = () => {
  const postalAddressRef = React.useRef<HTMLDivElement>(null);
  const namePhoneRef = React.useRef<HTMLTableElement>(null);

  const downloadPostalAddress = async () => {
    const element = postalAddressRef.current;
    if (!element) return;

    const pdf = new jsPDF("p", "mm", "a4");
    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();
    let yPosition = 10; // Initial Y position

    const elements = Array.from(element.children); // Get all address cards

    for (let i = 0; i < elements.length; i++) {
      const canvas = await html2canvas(elements[i] as HTMLElement, { scale: 2 });
      const imgData = canvas.toDataURL("image/png");
      const imgWidth = pageWidth - 20; // Leave some margin
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      if (yPosition + imgHeight > pageHeight - 20) {
        pdf.addPage(); // Add new page if content exceeds page height
        yPosition = 10; // Reset Y position
      }

      pdf.addImage(imgData, "PNG", 10, yPosition, imgWidth, imgHeight);
      yPosition += imgHeight + 10; // Move Y position down
    }

    pdf.save("Address_List.pdf");
  };

  const downloadNamePhoneList = async () => {
    const element = namePhoneRef.current;
    if (!element) return;

    const pdf = new jsPDF("p", "mm", "a4");
    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();
    let yPosition = 10; // Initial Y position

    const rows = Array.from(element.querySelectorAll("tr")); // Get all table rows

    for (let i = 0; i < rows.length; i++) {
      const row = rows[i];
      const canvas = await html2canvas(row, { scale: 2 });
      const imgData = canvas.toDataURL("image/png");

      const imgWidth = pageWidth - 20; // Leave some margin
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      if (yPosition + imgHeight > pageHeight - 20) {
        pdf.addPage(); // Add a new page if content exceeds page height
        yPosition = 10; // Reset Y position
      }

      pdf.addImage(imgData, "PNG", 10, yPosition, imgWidth, imgHeight);
      yPosition += imgHeight + 0; // Move Y position down for the next row
    }

    pdf.save("Name-Phone-Area.pdf");
  };

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
            <div className="overflow-x-auto bg-white text-black-700  rounded-lg" ref={postalAddressRef}>
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
                            <p className="text-black">
                              {member.presentAddress.addressLine1},{' '}
                              {member.presentAddress.addressLine2}
                            </p>
                            <p className="text-black">
                              {member.presentAddress.city},{' '}
                              {member.presentAddress.state} -{' '}
                              {member.presentAddress.pincode}{' '}
                            </p>
                            <p className="text-black">
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
                <thead className="bg-black-100">
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
                        <tr key={member.memberId} className="hover:bg-black-50">
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
