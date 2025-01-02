import React from "react";
import {
  Card,
  IconButton,
  Tooltip,
  Typography,
} from "@material-tailwind/react";
import { FamilyDetails, typographyProps } from "../types/Users";
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
  familyMembers: FamilyDetails[] | undefined;
  onEditFamilyMember: (uuid: string) => void;
  onDeleteFamilyMember: (uuid: string) => void;
}

const FamilyDetailsTable: React.FC<FamilyDetailsTableProps> = ({
  familyMembers,
  onEditFamilyMember,
  onDeleteFamilyMember,
}) => {
  return (
    <Card
      className="h-full w-full noShadow"
      {...({} as React.ComponentProps<typeof Card>)}
    >
      <div className="overflow-x-auto">
        <table className="w-full min-w-max border table-auto text-left">
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
            {familyMembers &&
              familyMembers.length > 0 &&
              familyMembers.map((member: FamilyDetails, index: number) => {
                const isLast = index === familyMembers.length - 1;
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
                        {member.memberPersonalDetails.name}
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
                        {member.memberPersonalDetails.gender}
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
                        {member.memberPersonalDetails.bloodGroup}
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
                          member.memberPersonalDetails.educationalQualification
                            .educationLevel
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
                          member.memberPersonalDetails.educationalQualification
                            .specialization
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
                        {member.memberPersonalDetails.jobTitle}
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
                        {member.memberPersonalDetails.dateOfBirth}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Tooltip content="Edit User">
                        <IconButton
                          onClick={() => {
                            onEditFamilyMember(member.familyMemberId);
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
                            onDeleteFamilyMember(member.familyMemberId);
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
