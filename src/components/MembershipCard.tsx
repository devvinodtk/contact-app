import { Download } from "lucide-react";
import Header from "./common/Header";
import { useSelector } from "react-redux";
import { selectActiveMembers } from "../store/MemberSelector";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import React from "react";
function MembershipCard() {
  const activeMembers = useSelector(selectActiveMembers);
  const memberIdRef = React.useRef(null);

  const DownloadMmeberId = async () => {
    const element = memberIdRef.current;
    if (!element) {
      return;
    }

    const canvas = await html2canvas(element, {
      scale: 2,
      useCORS: true
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
    pdf.save("Members-Id-Card.pdf");
  };
  return (
    <>
      <div className="flex-1 overflow-auto relative z-10 mt-16 sm:mt-0">
        <Header title="Membership Card" />
        <div className="m-5">
          <div className="w-full mx-auto border rounded-lg mb-6">
            <div className="overflow-x-auto bg-white text-gray-700  rounded-lg">
              <div className="max-w-full p-6">
                <h2 className="mb-2 text-xl ml-10 sm:ml-0 font-semibold text-black flex justify-left items-center">
                  <span>Download Membership Card</span>
                  <span onClick={DownloadMmeberId} className="text-red-500 cursor-pointer">
                    <Download className="h-6 w-6 ml-2 mt-2 text-red-500" />
                  </span>
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4" ref={memberIdRef}>
                  {activeMembers?.length > 0 &&
                    activeMembers
                      .filter(
                        (activeMember) =>
                          activeMember.verified && activeMember.displayId !== ""
                      )
                      .map((member) => {
                        return (
                          <div
                            key={member.memberId}
                            className="bg-white shadow-sm rounded-lg border border-gray-200 p-4"
                          >
                            {/* Logo */}
                            <div className="flex justify-start">
                              <img
                                className=" h-12 mr-2"
                                src="/assets/Logo-full.png"
                                alt="Kalakairali"
                              />

                            </div>
                            <div className="flex justify-end items-center pt-2 pb-2 mb-2 max-w-md border-b-[3px] border-[#3c3b98]">
                              <div className="text-right mr-4">
                                <p className="text-xl font-semibold text-black">{member.personalDetails.name}</p>
                                <p className="text-black  font-semibold">Member ID: {member.displayId}</p>
                              </div>
                              <div>
                                <img
                                  className=" h-20 rounded border-2 border-gray-200"
                                  src={
                                    member.personalDetails?.profilePhotoUrl
                                      ? member.personalDetails
                                        .profilePhotoUrl
                                      : `/assets/member_${member.personalDetails?.gender.toLocaleLowerCase()}.png`
                                  }
                                  alt="Kalakairali"
                                />
                              </div>
                            </div>

                            {/* Card Content */}
                            <div className="text-center py-2">

                              <div className="flex justify-between text-sm text-black">
                                <span>
                                  {member.personalDetails.mobileNumber}
                                </span>
                                <span>
                                  Blood Group: {member.personalDetails.bloodGroup}
                                </span>
                              </div>
                            </div>

                          </div>
                        );
                      })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default MembershipCard;
