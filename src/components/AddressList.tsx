import { Download } from 'lucide-react';
import { useSelector } from 'react-redux';
import { useRef, useState } from 'react';
import {
  Tabs, TabsHeader, Tab, TabsBody, TabPanel,
} from '@material-tailwind/react';

import { selectActiveMembers } from '../store/MemberSelector';
import Header from './common/Header';
import LoaderComponent from './common/Loader.tsx';

const AddressList = () => {
  const baseUrl = import.meta.env.VITE_FIREBASE_API;
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const postalAddressRef = useRef(null);
  const namePhoneRef = useRef(null);

  const downloadPostalAddress = async () => {
    try {
      setIsLoading(true);
      const res = await fetch(`${baseUrl}/generate-pdf`);
      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `Address-List_${new Date().getTime()}.pdf`;
      document.body.appendChild(a);
      a.click();
      a.remove();
    } catch (err) {
      console.log('Error downloading the file: ', err);
    } finally {
      setIsLoading(false);
    }
  };

  const downloadNamePhoneList = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(`${baseUrl}/generate-phone-list`);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);

      const a = document.createElement('a');
      a.href = url;
      a.download = `Name-Mobile-Area_${new Date().getTime()}.pdf`;
      a.click();
      a.remove();
    } catch (err) {
      console.log('Error downloading the file: ', err);
    } finally {
      setIsLoading(false);
    }
  };

  // return <Header title="Address List" />;
  const activeMembers = useSelector(selectActiveMembers);

  return (
    <>
      {isLoading && <LoaderComponent />}
      <div className="flex-1 overflow-auto relative z-10 mt-16 sm:mt-0">
        <Header title="Address List" />
        <div className="w-full rounded-lg">
          <Tabs value="address-list">
            <TabsHeader
              className="rounded-none border-b border-blue-gray-50 bg-transparent p-0"
              indicatorProps={{
                className:
                  'bg-transparent border-b-2 border-gray-900 shadow-none rounded-none',
              }}
              // eslint-disable-next-line react/jsx-props-no-spreading
              {...({} as React.ComponentProps<typeof TabsHeader>)}
            >
              <Tab
                key="address-list"
                // eslint-disable-next-line react/jsx-props-no-spreading
                {...({} as React.ComponentProps<typeof Tab>)}
                value="address-list"
              >
                <div className="flex text-xl font-semibold text-black items-center gap-2">
                  <span>Postal Address List</span>
                </div>
              </Tab>
              <Tab
                key="mobile-list"
                // eslint-disable-next-line react/jsx-props-no-spreading
                {...({} as React.ComponentProps<typeof Tab>)}
                value="mobile-list"
              >
                <div className="flex text-xl font-semibold text-black items-center gap-2">
                  <span>Members list with mobile number</span>
                </div>
              </Tab>
            </TabsHeader>
            <TabsBody
              // eslint-disable-next-line react/jsx-props-no-spreading
              {...({} as React.ComponentProps<typeof TabsBody>)}
            >
              <TabPanel key="address-list" value="address-list">
                <div className="m-5 mt-0">
                  <h4 className="ml-10 pb-0 sm:ml-0 font-semibold text-black flex justify-left items-center">
                    <span>Download Postal Address List</span>
                    <button type="button" className="text-red-500 cursor-pointer" onClick={downloadPostalAddress}>
                      <Download className="h-6 w-6 ml-2 mt-2 text-red-500" />
                    </button>
                  </h4>
                  <div className="w-full rounded-lg mb-6">
                    <div className="overflow-x-auto bg-white text-gray-700" ref={postalAddressRef}>
                      <div className="max-w-full pt-5">
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                          {activeMembers?.length > 0
                            && activeMembers
                              .filter(
                                (member) => member.communicationPreference !== 'In Person',
                              )
                              .map((member) => (
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
                                    {member.presentAddress.addressLine1}
                                    {member.presentAddress.addressLine2 && ','}
                                    {' '}
                                    {member.presentAddress.addressLine2}
                                    ,
                                    {' '}
                                    {member.presentAddress.postOffice}
                                    {' '}
                                    (Post),
                                  </p>
                                  <p className="text-gray-600">
                                    {member.presentAddress.city}
                                    ,
                                    {' '}
                                    {member.presentAddress.state}
                                    {' '}
                                    -
                                    {' '}
                                    {member.presentAddress.pincode}
                                    {' '}
                                  </p>
                                  <p className="text-gray-600">
                                    Phone:
                                    {' '}
                                    {'+91 - '}
                                    {' '}
                                    {member.personalDetails.mobileNumber}
                                  </p>
                                </div>
                              ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </TabPanel>
              <TabPanel key="mobile-list" value="mobile-list">
                <div className="m-5 mt-0">
                  <h4 className="ml-10 sm:ml-0 font-semibold text-black flex justify-left items-center">
                    <span>Download Members list with mobile number</span>
                    <button type="button" className="text-red-500 cursor-pointer" onClick={downloadNamePhoneList}>
                      <Download className="h-6 w-6 ml-2 mt-2 text-red-500" />
                    </button>
                  </h4>
                  <div className="w-full mx-auto pt-5 mb-6">
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
                          {activeMembers?.length > 0
                            && activeMembers.map((member, index) => (
                              <tr key={member.memberId} className="hover:bg-gray-50">
                                <td className="border border-black px-4 py-2 text-black">
                                  {index + 1}
                                </td>
                                <td className="border border-black px-4 py-2 text-black">
                                  {member.personalDetails.name}
                                </td>
                                <td className="border border-black px-4 py-2 text-black">
                                  +91 -
                                  {' '}
                                  {member.personalDetails.mobileNumber}
                                </td>
                                <td className="border border-black px-4 py-2 text-black">
                                  {member.presentAddress.postOffice}
                                </td>
                              </tr>
                            ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </TabPanel>
            </TabsBody>
          </Tabs>
        </div>
      </div>
    </>
  );
};

export default AddressList;
