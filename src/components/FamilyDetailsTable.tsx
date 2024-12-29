import React from "react";
import {
  Card,
  IconButton,
  Tooltip,
  Typography,
} from "@material-tailwind/react";
import { FamilyDetails } from "../types/Users";
import { PencilIcon, Trash2 } from "lucide-react";

const TABLE_HEADER = [
  "Name",
  "Gender",
  "Relationship",
  "Blood Group",
  "Education",
  "Specialization",
  "Job Title",
  "Date of Birth",
  "",
];

interface FamilyDetailsTableProps {
  fmaily_members: FamilyDetails[];
  onEditFamilyMember: (index: number) => void;
  onDeleteFamilyMember: (index: number) => void;
}

const FamilyDetailsTable: React.FC<FamilyDetailsTableProps> = ({
  fmaily_members,
  onEditFamilyMember,
  onDeleteFamilyMember,
}) => {
  const typographyProps = {
    variant: "small",
    color: "blue-gray",
  };

  return (
    <Card
      className="h-full w-full"
      {...({} as React.ComponentProps<typeof Card>)}
    >
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
                    {...(typographyProps as React.ComponentProps<
                      typeof Typography
                    >)}
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
                  <tr key={member.familyMemberId}>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                        {...(typographyProps as React.ComponentProps<
                          typeof Typography
                        >)}
                      >
                        {member.member_personal_details.name}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                        {...(typographyProps as React.ComponentProps<
                          typeof Typography
                        >)}
                      >
                        {member.member_personal_details.gender}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                        {...(typographyProps as React.ComponentProps<
                          typeof Typography
                        >)}
                      >
                        {member.relationship}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-medium"
                        {...(typographyProps as React.ComponentProps<
                          typeof Typography
                        >)}
                      >
                        {member.member_personal_details.blood_group}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                        {...(typographyProps as React.ComponentProps<
                          typeof Typography
                        >)}
                      >
                        {
                          member.member_personal_details
                            .educational_qualification.education_level
                        }
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                        {...(typographyProps as React.ComponentProps<
                          typeof Typography
                        >)}
                      >
                        {
                          member.member_personal_details
                            .educational_qualification.specialization
                        }
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-medium"
                        {...(typographyProps as React.ComponentProps<
                          typeof Typography
                        >)}
                      >
                        {member.member_personal_details.job_title}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-medium"
                        {...(typographyProps as React.ComponentProps<
                          typeof Typography
                        >)}
                      >
                        {member.member_personal_details.date_of_birth}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Tooltip content="Edit User">
                        <IconButton
                          onClick={() => {
                            onEditFamilyMember(member.familyMemberId ?? index);
                          }}
                          variant="text"
                          {...({
                            variant: "text",
                          } as React.ComponentProps<typeof IconButton>)}
                        >
                          <PencilIcon className="h-4 w-4" />
                        </IconButton>
                      </Tooltip>
                      <Tooltip content="Delete User">
                        <IconButton
                          onClick={() => {
                            onDeleteFamilyMember(
                              member.familyMemberId ?? index
                            );
                          }}
                          variant="text"
                          {...({
                            variant: "text",
                          } as React.ComponentProps<typeof IconButton>)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </IconButton>
                      </Tooltip>
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
