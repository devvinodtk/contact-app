import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import React from "react";
import QRCode from 'qrcode';

import { Download, Facebook, Instagram, Phone, Youtube } from 'lucide-react';
import { Members } from '../types/Users';

const MemberIdCardView = (member: Members) => {
  const memberIdRef = React.useRef(null);
  const memberIdBackRef = React.useRef(null);

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

    const pdf = new jsPDF({ orientation: 'landscape', unit: 'mm', format: [182, 120] });

    const imgProperties = pdf.getImageProperties(data);
    let pdfWidth = pdf.internal.pageSize.getWidth();
    const margin = 5;
    pdfWidth = pdfWidth - 2 * margin;
    const pdfHeight = (imgProperties.height * pdfWidth) / imgProperties.width;

    const qrDataUrl = await QRCode.toDataURL('https://kk-contact-app.web.app/users/' + member.memberId);
    pdf.addImage(data, "PNG", margin, margin, pdfWidth, pdfHeight);
    pdf.addImage(qrDataUrl, 'PNG', 147, 10, 20, 20);
    pdf.setDrawColor(0);
    pdf.setLineWidth(0.2);
    pdf.rect(147, 10, 20, 20);
    pdf.save(member?.personalDetails?.name + ".pdf");
  };

  const downloadBackside = async () => {
    const element = memberIdBackRef.current;
    if (!element) {
      return;
    }

    const canvas = await html2canvas(element, {
      scale: 2,
    });
    const data = canvas.toDataURL("image/png");

    const pdf = new jsPDF({ orientation: 'landscape', unit: 'mm', format: [182, 120] });

    const imgProperties = pdf.getImageProperties(data);
    let pdfWidth = pdf.internal.pageSize.getWidth();
    const margin = 5;
    pdfWidth = pdfWidth - 2 * margin;
    const pdfHeight = (imgProperties.height * pdfWidth) / imgProperties.width;

    pdf.addImage(data, "PNG", margin, margin, pdfWidth, pdfHeight);
    pdf.save("Backside-ID-card.pdf");
  }

  return (
    <>
      <span className="mb-2 text-xl ml-9 font-semibold text-black flex justify-left items-center absolute top-5 right-10">
        <span onClick={DownloadMmeberId} className="text-red-500 cursor-pointer">
          <Download className="h-6 w-6 ml-2 mt-2 text-red-500" />
        </span>
      </span>
      <span className="mb-2 text-xl ml-10 font-semibold text-black flex justify-left items-center absolute top-[270px] right-10 z-10">
        <span onClick={downloadBackside} className="text-red-500 cursor-pointer">
          <Download className="h-6 w-6 ml-2 mt-2 text-red-500" />
        </span>
      </span>

      <div ref={memberIdRef}
        key={member.memberId}
        className="bg-white shadow-sm rounded-lg border border-gray-200 p-4 m-auto widthIdCard"
      >
        <div className="flex justify-start">
          <img
            className=" h-12 mr-2"
            src="/assets/Logo-full.png"
            alt="Kalakairali"
          />

        </div>
        <div className="flex justify-end items-center pt-2 pb-2 max-w-md border-b-[3px] border-[#3c3b98]">
          <div className="text-right mr-4">
            <p className="text-xl font-semibold text-black">{member?.personalDetails?.name}</p>
            <p className="text-black">Member ID: {member?.displayId}</p>
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
              alt="{member.memberName}"
            />
          </div>
        </div>

        {/* Card Content */}
        <div className="text-center">

          <div className="flex justify-between text-sm text-black">
            <span className='flex items-center text-xs'>
              <span><Phone className="w-3 h-6 mr-1 flex text-xs items-center justify-center mt-[5px]" /></span><span> {member?.personalDetails?.mobileNumber}</span>
            </span>
            <span className="mt-1 text-xs">
              Blood Group: {member?.personalDetails?.bloodGroup}
            </span>
          </div>
        </div>

      </div>

      <div ref={memberIdBackRef}
        key={member.memberId}
        className="bg-white  m-auto mt-10 widthIdCard"
      >

        <div className=" bg-white border border-gray-200 p-4 rounded-lg p-4 relative widthIdCard">

          <div className="absolute top-6 left-3">
            <img
              className=" h-12 mr-2"
              src="/assets/Logo-full.png"
              alt="Kalakairali"
            />
          </div>

          <div className="mt-14 pb-4 border-b-[2px] border-[#3c3b98]">
            <p className="text-sm font-semibold">Kalakairali (REGD)</p>
            <p className="text-xs text-black">#322, Vasantha Bhavan, D.Rajgopal Road,</p>
            <p className="text-xs text-black"> RMV II Stage, Bangalore. PIN: 560094</p>
            <p className="text-xs text-black">Phone: +91 96206 49197</p>
          </div>
          <div className="absolute bottom-8 left-9 text-center flex space-x-4">
            <span className="text-xs text-black">www.kalakairali.com</span>
            <span className="text-xs text-black">kalakairali@kalakairali.com</span>

          </div>
          <div className="absolute bottom-2 left-4 height-[16px] flex space-x-3">
            <span className="text-blue-600 text-xs text-[9px] text-black flex items-center justify-center">
              <Facebook className="w-3 h-5 mr-1 flex items-center justify-center mt-[4px]" /> <span className='text-[9px]'>rmvkalakairali</span>
            </span>
            <span className="text-pink-500 text-xs text-[9px]  text-black flex items-center justify-center">
              <Instagram className="w-3 h-5 mr-1 flex items-center justify-center mt-[4px]" /> <span className='text-[9px]'>kalakairali_official</span>
            </span>
            <span className="text-red-500 text-xs text-[9px]  text-black flex items-center justify-center ">
              <Youtube className="w-3 h-4 mr-1 flex items-center justify-center mt-[4px]" /> <span className='text-[9px]'>kalakairalibangalore434</span>
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default MemberIdCardView;
