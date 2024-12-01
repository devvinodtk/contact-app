import React, { useState, ChangeEvent, FormEvent } from "react";

interface MembershipFormData {
  name: string;
  dob: string;
  address: string;
  mobile: string;
  email: string;
  qualification: string;
  job: string;
  familyDetails: string;
  otherMemberships: string;
}

const MembershipForm: React.FC = () => {
  // State to hold form data
  const [formData, setFormData] = useState<MembershipFormData>({
    name: "",
    dob: "",
    address: "",
    mobile: "",
    email: "",
    qualification: "",
    job: "",
    familyDetails: "",
    otherMemberships: "",
  });

  // Handle input changes
  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [id]: value }));
  };

  // Handle form submission
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    console.log("Form Submitted:", formData);
    // Add form submission logic here
  };

  return (
    <div className="max-w-4xl mx-auto p-8 bg-white shadow-md rounded-lg">
      <h1 className="text-2xl font-bold mb-6 text-center">
        Kalakairali Membership Application Form
      </h1>

      <form onSubmit={handleSubmit}>
        {/* Name and DOB */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="name">
              Name
            </label>
            <input
              type="text"
              id="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              placeholder="Enter your name"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="dob">
              Date of Birth
            </label>
            <input
              type="date"
              id="dob"
              value={formData.dob}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
          </div>
        </div>
        

        {/* Address */}
        <div className="mt-4">
          <label className="block text-sm font-medium mb-1" htmlFor="address">
            Address
          </label>
          <textarea
            id="address"
            value={formData.address}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            placeholder="Enter your address"
            rows={3}
          ></textarea>
        </div>

        {/* Contact and Email */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="mobile">
              Mobile Number
            </label>
            <input
              type="text"
              id="mobile"
              value={formData.mobile}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              placeholder="Enter your mobile number"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              placeholder="Enter your email"
            />
          </div>
        </div>

        {/* Educational Qualification */}
        <div className="mt-4">
          <label
            className="block text-sm font-medium mb-1"
            htmlFor="qualification"
          >
            Educational Qualification
          </label>
          <input
            type="text"
            id="qualification"
            value={formData.qualification}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            placeholder="Enter your qualification"
          />
        </div>

        {/* Nature of Job */}
        <div className="mt-4">
          <label className="block text-sm font-medium mb-1" htmlFor="job">
            Nature of Job
          </label>
          <input
            type="text"
            id="job"
            value={formData.job}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            placeholder="Enter your job details"
          />
        </div>

        {/* Family Details */}
        <div className="mt-6">
          <h2 className="text-lg font-medium mb-2">Family Details</h2>
          <div>
            <label
              className="block text-sm font-medium mb-1"
              htmlFor="familyDetails"
            >
              Name and Relationship
            </label>
            <textarea
              id="familyDetails"
              value={formData.familyDetails}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              placeholder="Enter family details"
              rows={3}
            ></textarea>
          </div>
        </div>

        {/* Membership in Other Bodies */}
        <div className="mt-4">
          <label
            className="block text-sm font-medium mb-1"
            htmlFor="otherMemberships"
          >
            Membership in Other Social and Professional Bodies
          </label>
          <textarea
            id="otherMemberships"
            value={formData.otherMemberships}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            placeholder="Enter membership details"
            rows={3}
          ></textarea>
        </div>

        {/* Declaration */}
        <div className="mt-6">
          <label className="block text-sm font-medium mb-1">
            Declaration by the Applicant:
          </label>
          <textarea
            className="w-full p-2 border rounded"
            readOnly
            value="I hereby declare that the information given is true to the best of my knowledge and I know it will form the basis of my membership with Kalakairali. I understand that my membership will be subject to clearance by the management committee of the association."
            rows={4}
          ></textarea>
        </div>

        {/* Submission */}
        <div className="mt-6 flex justify-end">
          <button
            type="submit"
            className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default MembershipForm;
