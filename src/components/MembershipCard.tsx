import { Download } from "lucide-react";
import Header from "./common/Header";
import { useSelector } from "react-redux";
import { selectActiveMembers } from "../store/MemberSelector";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import React from "react";
import { useReactToPrint } from "react-to-print";

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

    let yPosition = 0;
    let remainingHeight = pdfHeight;

    while (remainingHeight > 0) {
      pdf.addImage(data, "PNG", margin, margin, pdfWidth, pdfHeight);
      remainingHeight -= pdf.internal.pageSize.height;

      if (remainingHeight > 0) {
        pdf.addPage();
        yPosition = -pdf.internal.pageSize.height; // Reset y position for new page
      }
    }

    // pdf.addImage(data, "PNG", margin, margin, pdfWidth, pdfHeight);
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
                <h2 className="mb-8 text-xl ml-10 sm:ml-0 font-semibold text-black flex justify-left items-center">
                  <span>Download Membership Card</span>

                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4" >
                  {activeMembers?.length > 0 &&
                    activeMembers
                      .filter(
                        (activeMember) =>
                          activeMember.verified && activeMember.displayId !== ""
                      )
                      .map((member) => {
                        return (


                          <div className="w-80 h-[500px] bg-gradient-to-b from-purple-500 to-indigo-700 rounded-2xl shadow-2xl p-4 flex flex-col justify-between items-center " ref={memberIdRef}>
                            <span onClick={DownloadMmeberId} className="text-red-500 cursor-pointer">
                              <Download className="h-6 w-6 ml-2 mt-2 text-red-500" />
                            </span>
                            <h2 className="text-base font-bold text-pink-100">🎉 Sending Joy from Kalakairali 🎉</h2>
                            <h1 className="text-4xl font-extrabold text-yellow-300 mt-2 drop-shadow-lg text-center">Happy Birthday!</h1>
                            <div className="w-32 h-32 bg-white rounded-full flex items-center justify-center shadow-xl overflow-hidden border-4 border-pink-300 mt-2">
                              <img
                                src={
                                  member.personalDetails?.profilePhotoUrl
                                    ? member.personalDetails.profilePhotoUrl
                                    : `/assets/member_${member.personalDetails?.gender.toLowerCase()}.png`
                                }
                                alt="Birthday"
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <h2 className="text-2xl font-semibold text-yellow-300 mt-2">{member.personalDetails.name}</h2>
                            <p className="text-center text-pink-200 px-4 mt-2 italic">
                              🎁 Wishing you a year filled with love, laughter, and unforgettable adventures! 🌟
                            </p>
                            <footer className="mt-4 text-sm text-pink-300">Kalakairali - Together We Live Better</footer>
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
