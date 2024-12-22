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
  Mail,
  Scale3dIcon,
} from "lucide-react";

const typographyProps = {
  variant: "small",
  color: "blue-gray",
};

const Dashboard = () => {
  const TABLE_HEAD = [
    "Member",
    "Gender",
    "Age",
    "Blood Group",
    "Occupation",
    "Area",
    "",
  ];

  const TABLE_ROWS = [
    {
      img: "https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-3.jpg",
      name: "John Michael",
      email: "john@creative-tim.com",
      job: "Manager",
      org: "Organization",
      online: true,
      date: "23/04/18",
      phone: "8792527628",
      age: "39",
      area: "Sanjayngar",
      bloodgroup: "O+",
      occupation: "Software Engineer",
      education: "MBA",
      gender: "Male",
    },
    {
      img: "https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-2.jpg",
      name: "Alexa Liras",
      email: "alexa@creative-tim.com",
      job: "Programator",
      org: "Developer",
      online: false,
      date: "23/04/18",
      phone: "8792527628",
      age: "39",
      area: "Sanjayngar",
      bloodgroup: "O+",
      occupation: "Software Engineer",
      education: "MBA",
      gender: "Male",
    },
    {
      img: "https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-1.jpg",
      name: "Laurent Perrier",
      email: "laurent@creative-tim.com",
      job: "Executive",
      org: "Projects",
      online: false,
      date: "19/09/17",
      phone: "8792527628",
      age: "39",
      area: "Sanjayngar",
      bloodgroup: "O+",
      occupation: "Software Engineer",
      education: "MBA",
      gender: "Male",
    },
    {
      img: "https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-4.jpg",
      name: "Michael Levi",
      email: "michael@creative-tim.com",
      job: "Programator",
      org: "Developer",
      online: true,
      date: "24/12/08",
      phone: "8792527628",
      age: "39",
      area: "Sanjayngar",
      bloodgroup: "O+",
      occupation: "Software Engineer",
      education: "MBA",
      gender: "Male",
    },
    {
      img: "https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-5.jpg",
      name: "Richard Gran",
      email: "richard@creative-tim.com",
      job: "Manager",
      org: "Executive",
      online: false,
      date: "04/10/21",
      phone: "8792527628",
      age: "39",
      area: "Sanjayngar",
      bloodgroup: "O+",
      occupation: "Software Engineer",
      education: "MBA",
      gender: "Male",
    },
  ];

  return (
    <>
      <div className="flex-1 overflow-auto relative z-10">
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
                  <table className="w-full min-w-max table-auto text-left border rounded border-collapse border border-gray-200">
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
                      {TABLE_ROWS.map(
                        (
                          {
                            img,
                            name,
                            email,
                            date,
                            gender,
                            phone,
                            area,
                            bloodgroup,
                            age,
                            occupation,
                          },
                          index
                        ) => {
                          const isLast = index === TABLE_ROWS.length - 1;
                          const classes = isLast
                            ? "p-4"
                            : "p-4 border-b border-blue-gray-100";

                          return (
                            <tr key={name} className="hover:bg-sky-50">
                              <td className={classes}>
                                <div className="flex items-center gap-3">
                                  <Avatar
                                    {...({} as React.ComponentProps<
                                      typeof Avatar
                                    >)}
                                    src={img}
                                    alt={name}
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
                                      {name}
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
                                      {email} |{" "}
                                      <Phone className="inline size-5 pr-2" />
                                      {phone}
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
                                  {gender}
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
                                    {age} Years
                                  </Typography>
                                  <Typography
                                    {...(typographyProps as React.ComponentProps<
                                      typeof Typography
                                    >)}
                                    variant="small"
                                    color="blue-gray"
                                    className="font-normal opacity-70"
                                  >
                                    {date}
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
                                  {bloodgroup}
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
                                  {occupation}
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
                                  {area}
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
                                <Tooltip content="Edit User">
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
                                <Tooltip content="Edit User">
                                  <IconButton
                                    variant="text"
                                    {...({
                                      variant: "text",
                                    } as React.ComponentProps<
                                      typeof IconButton
                                    >)}
                                  >
                                    <Scale3dIcon className="h-4 w-4" />
                                  </IconButton>
                                </Tooltip>
                              </td>
                            </tr>
                          );
                        }
                      )}
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
