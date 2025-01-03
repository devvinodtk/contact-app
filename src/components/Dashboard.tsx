import {
  Avatar,
  Card,
  CardBody,
  CardHeader,
  IconButton,
  Input,
  Tooltip,
  Typography,
} from "@material-tailwind/react";
import Header from "./common/Header";
import {
  PencilIcon,
  Search,
  ChevronsUpDown,
  Phone,
  Eye,
  Trash2,
  Mail,
} from "lucide-react";
import { useEffect, useState } from "react";
import { Members, typographyProps } from "../types/Users";
import {
  formatDate,
  getAge,
  getMemberDataFromFirebase,
} from "../utils/Utility_Functions";

const Dashboard = () => {
  const TABLE_HEAD = [
    "Member",
    "Gender",
    "Age",
    "Blood Group",
    "Occupation",
    "Area",
    "Verified",
    "",
  ];

  const [members, setMembers] = useState<Members[]>([]);
  useEffect(() => {
    const getMembers = async () => {
      const existingMembers: Members[] = await getMemberDataFromFirebase();
      setMembers(existingMembers);
    };

    getMembers();
  }, []);

  return (
    <>
      <div className="flex-1 overflow-auto relative z-10 mt-16 sm:mt-0">
        <Header title="Dashboard" />
        <div className="m-5">
          <div className="w-full mx-auto">
            <div className="overflow-x-auto bg-white text-gray-700  rounded-lg">
              <Card
                className="h-full w-full"
                {...({} as React.ComponentProps<typeof Card>)}
              >
                <CardHeader
                  floated={false}
                  shadow={false}
                  className="rounded-none"
                  {...({} as React.ComponentProps<typeof CardHeader>)}
                >
                  <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
                    <div className="w-full md:w-72">
                      <Input
                        {...({} as React.ComponentProps<typeof Input>)}
                        label="Search"
                        icon={<Search className="h-5 w-5" />}
                      />
                    </div>
                  </div>
                </CardHeader>
                <CardBody
                  className="p-4 overflow-auto px-0"
                  {...({} as React.ComponentProps<typeof CardBody>)}
                >
                  <table className="w-full min-w-max table-auto text-left rounded border-collapse border border-gray-200">
                    <thead className="bg-sky-50 text-gray-700">
                      <tr>
                        {TABLE_HEAD.map((head, index) => (
                          <th
                            key={head}
                            className="cursor-pointer border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 transition-colors hover:bg-blue-gray-50"
                          >
                            <Typography
                              {...(typographyProps as React.ComponentProps<
                                typeof Typography
                              >)}
                              variant="small"
                              color="blue-gray"
                              className="flex items-center justify-between gap-2 font-normal leading-none opacity-70"
                            >
                              {head}{" "}
                              {index !== TABLE_HEAD.length - 1 && (
                                <ChevronsUpDown
                                  strokeWidth={2}
                                  className="h-4 w-4"
                                />
                              )}
                            </Typography>
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {members &&
                        members.length > 0 &&
                        members.map((member, index) => {
                          const isLast = index === members.length - 1;
                          const classes = isLast
                            ? "p-4"
                            : "p-4 border-b border-blue-gray-100";

                          return (
                            <tr key={index} className="hover:bg-sky-50">
                              <td className={classes}>
                                <div className="flex items-center gap-3">
                                  <Avatar
                                    {...({} as React.ComponentProps<
                                      typeof Avatar
                                    >)}
                                    src={
                                      member.personalDetails?.profilePhotoUrl
                                        ? member.personalDetails.profilePhotoUrl
                                        : `/assets/member_${member.personalDetails?.gender.toLocaleLowerCase()}.png`
                                    }
                                    alt={member.personalDetails?.name}
                                    size="sm"
                                    withBorder={true}
                                  />
                                  <div className="flex flex-col">
                                    <Typography
                                      {...(typographyProps as React.ComponentProps<
                                        typeof Typography
                                      >)}
                                      variant="small"
                                      color="blue-gray"
                                      className="font-normal"
                                    >
                                      {member.personalDetails?.name}
                                    </Typography>
                                    <Typography
                                      {...(typographyProps as React.ComponentProps<
                                        typeof Typography
                                      >)}
                                      variant="small"
                                      color="blue-gray"
                                      className="font-normal opacity-70"
                                    >
                                      <Mail className="inline size-5 pr-2" />
                                      {member.personalDetails?.emailId} |{" "}
                                      <Phone className="inline size-5 pr-2" />
                                      {member.personalDetails?.mobileNumber}
                                    </Typography>
                                  </div>
                                </div>
                              </td>
                              <td className={classes}>
                                <Typography
                                  {...(typographyProps as React.ComponentProps<
                                    typeof Typography
                                  >)}
                                  variant="small"
                                  color="blue-gray"
                                  className="font-normal"
                                >
                                  {member.personalDetails?.gender}
                                </Typography>
                              </td>
                              <td className={classes}>
                                <div className="flex flex-col">
                                  <Typography
                                    {...(typographyProps as React.ComponentProps<
                                      typeof Typography
                                    >)}
                                    variant="small"
                                    color="blue-gray"
                                    className="font-normal"
                                  >
                                    {getAge(
                                      member.personalDetails?.dateOfBirth
                                    )}{" "}
                                    Years
                                  </Typography>
                                  <Typography
                                    {...(typographyProps as React.ComponentProps<
                                      typeof Typography
                                    >)}
                                    variant="small"
                                    color="blue-gray"
                                    className="font-normal opacity-70"
                                  >
                                    {formatDate(
                                      member.personalDetails?.dateOfBirth
                                    )}
                                  </Typography>
                                </div>
                              </td>

                              <td className={classes}>
                                <Typography
                                  {...(typographyProps as React.ComponentProps<
                                    typeof Typography
                                  >)}
                                  variant="small"
                                  color="blue-gray"
                                  className="font-normal"
                                >
                                  {member.personalDetails?.bloodGroup}
                                </Typography>
                              </td>

                              <td className={classes}>
                                <Typography
                                  {...(typographyProps as React.ComponentProps<
                                    typeof Typography
                                  >)}
                                  variant="small"
                                  color="blue-gray"
                                  className="font-normal"
                                >
                                  {member.personalDetails?.jobTitle}
                                </Typography>
                              </td>

                              <td className={classes}>
                                <Typography
                                  {...(typographyProps as React.ComponentProps<
                                    typeof Typography
                                  >)}
                                  variant="small"
                                  color="blue-gray"
                                  className="font-normal"
                                >
                                  {member.presentAddress?.postOffice}
                                </Typography>
                              </td>

                              <td className={classes}>
                                <Typography
                                  {...(typographyProps as React.ComponentProps<
                                    typeof Typography
                                  >)}
                                  variant="small"
                                  color="blue-gray"
                                  className="font-normal"
                                >
                                  {member.verified ? "Yes" : "No"}
                                </Typography>
                              </td>

                              <td className={classes}>
                                <Tooltip content="Edit User">
                                  <IconButton
                                    variant="text"
                                    {...({
                                      variant: "text",
                                    } as React.ComponentProps<
                                      typeof IconButton
                                    >)}
                                  >
                                    <PencilIcon className="h-4 w-4" />
                                  </IconButton>
                                </Tooltip>
                                <Tooltip content="View User">
                                  <IconButton
                                    variant="text"
                                    {...({
                                      variant: "text",
                                    } as React.ComponentProps<
                                      typeof IconButton
                                    >)}
                                  >
                                    <Eye className="h-4 w-4" />
                                  </IconButton>
                                </Tooltip>
                                <Tooltip content="Delete User">
                                  <IconButton
                                    variant="text"
                                    {...({
                                      variant: "text",
                                    } as React.ComponentProps<
                                      typeof IconButton
                                    >)}
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
                </CardBody>
              </Card>
            </div>
          </div>
        </div>
      </div>
      {/* <div className="max-w-80 mr-1 w-full text-gray-700 bg-white rounded-lg shadow-md overflow-hidden">
        Hello
      </div> */}
    </>
  );
};

export default Dashboard;
