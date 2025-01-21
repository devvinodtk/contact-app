import { Download } from "lucide-react";
import Header from "./common/Header";
import { useSelector } from "react-redux";
import { selectActiveMembers } from "../store/MemberSelector";

function MembershipCard() {
  const activeMembers = useSelector(selectActiveMembers);
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
                  <a href="#" className="text-red-500">
                    <Download className="h-6 w-6 ml-2 mt-2 text-red-500" />
                  </a>
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
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
                            className="bg-white shadow-sm rounded-lg border border-gray-200 p-6"
                          >
                            {/* Logo */}
                            <div className="flex justify-center mb-3">
                              <img
                                className=" h-16 mr-2"
                                src="/assets/Logo-full.png"
                                alt="Kalakairali"
                              />
                            </div>

                            {/* Card Content */}
                            <div className="text-center">
                              <h2 className="text-xl font-semibold text-gray-800">
                                {member.personalDetails.name}
                              </h2>
                              <p className="text-gray-600  font-semibold">
                                Member ID: {member.displayId}
                              </p>
                              <div className="my-2">
                                <p className="text-gray-500 text-sm">
                                  Blood Group:{" "}
                                  {member.personalDetails.bloodGroup}
                                </p>
                              </div>

                              <div className="flex justify-between text-sm text-gray-500">
                                <span>
                                  Mobile: {member.personalDetails.mobileNumber}
                                </span>
                                <span>
                                  Location: {member.presentAddress.postOffice}
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
