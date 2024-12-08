import React from "react";
import { Card, Typography } from "@material-tailwind/react";
import { useSelector } from "react-redux";
import { FamilyDetails } from "../../types/Users";

const TABLE_HEADER = [
  "Name",
  "Gender",
  "Relationship",
  "Blood Group",
  "Education",
  "Specialization",
  "Job Title",
  "Date of Birth",
];

const FamilyDetailsTable = () => {
  const fmaily_members: [FamilyDetails] = useSelector(
    (state) => state.fmaily_members
  );

  return (
    <Card className="h-full w-full" placeholder={undefined}>
      <div className="overflow-x-auto">
      <table className="w-full min-w-max border rounded-lg table-auto text-left">
        <thead>
          <tr>
            {TABLE_HEADER.map((head) => (
              <th
                key={head}
                className="border-b border-blue-gray-100 bg-blue-gray-50 p-4"
              >
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-bold leading-none"
                  placeholder={undefined}
                >
                  {head}
                </Typography>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {fmaily_members &&
            fmaily_members.length > 0 &&
            fmaily_members.map((member: FamilyDetails, index: number) => {
              const isLast = index === fmaily_members.length - 1;
              const classes = isLast
                ? "p-4"
                : "p-4 border-b border-blue-gray-50";

              return (
                <tr key={index}>
                  <td className={classes}>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                      placeholder={undefined}
                    >
                      {member.member_personal_details.name}
                    </Typography>
                  </td>
                  <td className={classes}>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                      placeholder={undefined}
                    >
                      {member.member_personal_details.gender}
                    </Typography>
                  </td>
                  <td className={classes}>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                      placeholder={undefined}
                    >
                      {member.relationship}
                    </Typography>
                  </td>
                  <td className={classes}>
                    <Typography
                      as="a"
                      href="#"
                      variant="small"
                      color="blue-gray"
                      className="font-medium"
                      placeholder={undefined}
                    >
                      {member.member_personal_details.blood_group}
                    </Typography>
                  </td>
                  <td className={classes}>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                      placeholder={undefined}
                    >
                      {
                        member.member_personal_details.educational_qualification
                          .education_level
                      }
                    </Typography>
                  </td>
                  <td className={classes}>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                      placeholder={undefined}
                    >
                      {
                        member.member_personal_details.educational_qualification
                          .specialization
                      }
                    </Typography>
                  </td>
                  <td className={classes}>
                    <Typography
                      as="a"
                      href="#"
                      variant="small"
                      color="blue-gray"
                      className="font-medium"
                      placeholder={undefined}
                    >
                      {member.member_personal_details.job_title}
                    </Typography>
                  </td>
                  <td className={classes}>
                    <Typography
                      as="a"
                      href="#"
                      variant="small"
                      color="blue-gray"
                      className="font-medium"
                      placeholder={undefined}
                    >
                      {member.member_personal_details.date_of_birth}
                    </Typography>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
      </div>
    </Card>
  );
};

export default FamilyDetailsTable;
