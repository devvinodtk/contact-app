import {
  Avatar,
  Card,
  CardBody,
  CardHeader,
  IconButton,
  Tooltip,
  Typography,
  Badge,
  Switch,
  SwitchProps,
  Chip,
} from "@material-tailwind/react";
import Header from "./common/Header";
import {
  PencilIcon,
  ChevronsUpDown,
  Phone,
  Trash2,
  MapPin,
  Mail,
  Download,
} from "lucide-react";
import {
  blreCoordinates,
  Coordinates,
  DeleteAction,
  Members,
  toastOptions,
  typographyProps,
} from "../types/Users";
import {
  createGoogleMapsUrl,
  deleteMemberFromFirebase,
  getAge,
  updateMemberToFirebase,
  searchFilterData,
} from "../utils/Utility_Functions";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import PopupContainer from "./common/PopupContainer";
import ConfirmDeleteMember from "./ConfirmDeleteMember";
import { deleteMember, updateMember } from "../store/MembersSlice";
import { toast, ToastContainer } from "react-toastify";
import { selectActiveMembers } from "../store/MemberSelector";
import SearchFilter from "./common/SearchFilter";

const Dashboard = () => {
  const TABLE_HEAD = ["Member", "Age", "Blood Group", "Occupation", "Area", ""];
  const [selectedMemberForDelete, setSelectedMemberForDelete] = useState<{
    memberId: string;
    memberName: string;
  } | null>(null);

  const activeMembers = useSelector(selectActiveMembers);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const onEditMember = (memberId: string) => {
    navigate(`/users/${memberId}`);
  };
  const [open, setOpen] = useState(false);
  const [showUnverifiedUsers, setShowUnverifiedUsers] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [filteredResult, setFilteredResult] = useState<Members[] | null>(null);
  const handleClose = () => setOpen(false);
  const onDeleteMember = (memberId: string, memberName: string) => {
    setSelectedMemberForDelete({ memberId, memberName });
    setOpen(true);
  };

  const handleConfirmDelete = (
    memberId: string,
    deleteAction: DeleteAction
  ) => {
    if (deleteAction === "soft_delete") {
      const currentMember = activeMembers.find(
        (member) => member.memberId === memberId
      );
      if (currentMember) {
        updateMemberToFirebase({ ...currentMember, isInactive: true })
          .then(() => {
            dispatch(updateMember(currentMember));
            toast.success(
              `Member ${currentMember.personalDetails.name} marked inactive`,
              toastOptions
            );
          })
          .catch((err: any) => {
            toast.error(
              `Error while marking the member ${currentMember.personalDetails.name} inactive: ` +
                err?.message,
              toastOptions
            );
          })
          .finally(() => {
            setOpen(false);
          });
      }
    } else if (deleteAction === "hard_delete") {
      deleteMemberFromFirebase(memberId)
        .then(() => {
          dispatch(deleteMember(memberId));
          toast.success(
            `Deleted the member ${selectedMemberForDelete?.memberName} successfully.`,
            toastOptions
          );
        })
        .catch((err: any) => {
          toast.error(
            `Error while deleting the member ${selectedMemberForDelete?.memberName}: ` +
              err?.message,
            toastOptions
          );
        })
        .finally(() => {
          setOpen(false);
        });
    }
  };

  useEffect(() => {
    if (activeMembers?.length) {
      const result = activeMembers.filter((member) =>
        showUnverifiedUsers ? member.verified === false : member
      );
      const filteredMembers = searchText
        ? searchFilterData(searchText, result)
        : result;
      setFilteredResult(filteredMembers);
    }
  }, [activeMembers, searchText, showUnverifiedUsers]);

  const handleOpenMap = (location: Coordinates) => {
    const url = createGoogleMapsUrl(location);
    window.open(url, "_blank");
  };

  const handleShowUnverifiedUsers: SwitchProps["onChange"] = (event) => {
    setShowUnverifiedUsers(event.target.checked);
  };

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
                  className="rounded-none mx-0"
                  {...({} as React.ComponentProps<typeof CardHeader>)}
                >
                  <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
                    <div className="w-full md:w-72">
                      <SearchFilter
                        onChangeSearchText={(result: string) => {
                          setSearchText(result);
                        }}
                      />
                    </div>
                    <div className="flex flex-row justify-end gap-x-5 text-sm">
                      <Switch
                        checked={showUnverifiedUsers}
                        onChange={handleShowUnverifiedUsers}
                        label="Show Unverified Users"
                        className="border bg-gray-100 z-0 "
                        {...({} as React.ComponentProps<typeof Switch>)}
                      />
                      <Chip
                        variant="ghost"
                        color="blue"
                        value={`${
                          filteredResult?.length ? filteredResult.length : 0
                        } Members`}
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
                      {filteredResult?.length ?
                        filteredResult.map((member, index) => {
                          const isLast = index === filteredResult.length - 1;
                          const classes = isLast
                            ? "p-4"
                            : "p-4 border-b border-blue-gray-100";

                          return (
                            <tr key={index} className="hover:bg-sky-50">
                              <td className={classes}>
                                <div className="flex items-center gap-3">
                                  <Badge
                                    overlap="circular"
                                    color={member.verified ? "green" : "red"}
                                  >
                                    <Avatar
                                      className="cursor-pointer"
                                      onClick={(event: React.MouseEvent) => {
                                        event.stopPropagation();
                                        onEditMember(member.memberId);
                                      }}
                                      {...({} as React.ComponentProps<
                                        typeof Avatar
                                      >)}
                                      src={
                                        member.personalDetails?.profilePhotoUrl
                                          ? member.personalDetails
                                              .profilePhotoUrl
                                          : `/assets/member_${member.personalDetails?.gender.toLocaleLowerCase()}.png`
                                      }
                                      alt={member.personalDetails?.name}
                                      size="sm"
                                      withBorder={true}
                                    />
                                  </Badge>
                                  <div className="flex flex-col">
                                    <Typography
                                      {...(typographyProps as React.ComponentProps<
                                        typeof Typography
                                      >)}
                                      variant="small"
                                      color="blue-gray"
                                      className="font-normal"
                                    >
                                      <span className="text-gray text-base">
                                        {member.personalDetails?.name}
                                      </span>{" "}
                                      <span className="text-gray">
                                        {" "}
                                        {member.displayId &&
                                          `(${member.displayId})`}
                                      </span>{" "}
                                      {member.personalDetails?.gender ==
                                      "Male" ? (
                                        <span className="blue-circle-icon">
                                          M
                                        </span>
                                      ) : (
                                        <span className="rose-circle-icon">
                                          F
                                        </span>
                                      )}
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
                                      <a
                                        href={`tel:${member.personalDetails?.mobileNumber}`}
                                      >
                                        {member.personalDetails?.mobileNumber}
                                      </a>
                                    </Typography>
                                  </div>
                                </div>
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
                                    {member.personalDetails?.dateOfBirth}
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
                                <Tooltip content="Edit User">
                                  <IconButton
                                    onClick={() => {
                                      onEditMember(member.memberId);
                                    }}
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
                                <Tooltip content="Download Membership Card">
                                  <IconButton
                                    variant="text"
                                    {...({
                                      variant: "text",
                                    } as React.ComponentProps<
                                      typeof IconButton
                                    >)}
                                  >
                                    <Download className="h-4 w-4" />
                                  </IconButton>
                                </Tooltip>
                                <Tooltip content="Delete User">
                                  <IconButton
                                    variant="text"
                                    onClick={() => {
                                      onDeleteMember(
                                        member.memberId,
                                        member.personalDetails.name
                                      );
                                    }}
                                    {...({} as React.ComponentProps<
                                      typeof IconButton
                                    >)}
                                  >
                                    <Trash2 className="h-4 w-4" />
                                  </IconButton>
                                </Tooltip>
                                {member?.geoLocation && (
                                  <Tooltip content="Show Location">
                                    <IconButton
                                      variant="text"
                                      onClick={() => {
                                        handleOpenMap(
                                          member.geoLocation || blreCoordinates
                                        );
                                      }}
                                      {...({} as React.ComponentProps<
                                        typeof IconButton
                                      >)}
                                    >
                                      <MapPin className="h-4 w-4" />
                                    </IconButton>
                                  </Tooltip>
                                )}
                              </td>
                            </tr>
                          );
                        }): <tr><td colSpan={6}><span className="w-full text-center p-2 text-sm leading-normal text-blue-gray-900 font-normal opacity-70 block">No members found</span></td></tr>}
                    </tbody>
                  </table>
                </CardBody>
              </Card>
            </div>
          </div>
        </div>
      </div>
      {selectedMemberForDelete && (
        <PopupContainer
          header={`Delete ${selectedMemberForDelete.memberName}`}
          open={open}
          onClose={handleClose}
        >
          <ConfirmDeleteMember
            memberId={selectedMemberForDelete.memberId}
            onConfirmDelete={handleConfirmDelete}
          />
        </PopupContainer>
      )}
      <ToastContainer />
    </>
  );
};

export default Dashboard;
