import { Card } from "./ui/card";
import {
  MoreVerticalIcon,
  PhoneIncomingIcon,
  PhoneOutgoingIcon,
} from "lucide-react";
import { Button } from "./ui/button";
import dayjs from "dayjs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { useMemo } from "react";
import { cn } from "../Utils/cn";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import React from "react";
import { Checkbox } from "./ui/checkbox";

const ActivitySheet = ({ activity, open, onOpenChange }) => {
  // console.log(activity);

  const isAnswered = useMemo(() => {
    return (
      activity.call_type === "answered" || activity.call_type === "voicemall"
    );
  }, [activity]);

  const isInbound = useMemo(() => activity.direction === "inbound", [activity]);

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-[400px] sm:w-[540px]">
        <SheetHeader>
          <SheetTitle>Activity Details</SheetTitle>
          <SheetDescription>Details about this activity</SheetDescription>
          <div className="pt-8">
            <div className="flex items-center gap-4">
              <div
                className={cn(
                  "rounded-full w-12 h-12 border-4 flex items-center justify-center",
                  isAnswered ? " border-green-700  " : " border-red-700"
                )}
              >
                {isInbound && (
                  <PhoneIncomingIcon
                    className={cn(
                      isAnswered ? "text-green-700" : "text-red-700",
                      " w-6 h-6 "
                    )}
                  />
                )}
                {!isInbound && (
                  <PhoneOutgoingIcon
                    className={cn(
                      isAnswered ? "text-green-700" : "text-red-700",
                      " w-6 h-6 "
                    )}
                  />
                )}
              </div>
              {isAnswered ? "Connected" : "Not connected"}
              <br />
              {dayjs(activity.created_at).format("h:mm A DD/MM/YYYY")}
            </div>
          </div>
          <div className=" flex flex-col gap-4 ">
            <div className="flex justify-between">
              <span className=" font-semibold ">From: </span>
              <span>{activity.from ? activity.from : "N/A"}</span>
            </div>
            <div className="flex justify-between">
              <span className=" font-semibold ">To: </span>
              <span>{activity.to ? activity.to : "N/A"}</span>
            </div>
          </div>
          <div className="text-sm">
            {!activity.duration ? (
              `The call was not connected`
            ) : (
              <>
                The call lasted for a duration of{" "}
                <span className="font-semibold">
                  {activity.duration.toFixed(2)} minutes
                </span>
              </>
            )}
          </div>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
};

const ActivityDropDown = ({ handleArchive, isArchived, setIsSheetOpen }) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        {/* <Button variant="ghost" size="icon">
          <MoreVerticalIcon />
        </Button> */}
        <MoreVerticalIcon />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem onClick={() => setIsSheetOpen(true)}>
          View Details
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleArchive}>
          {isArchived ? "Unarchive" : "Archive"}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

const ActivityCard = ({
  activity,
  handleArchiveChange,
  isArchived,
  handleSelect,
}) => {
  const [isSheetOpen, setIsSheetOpen] = React.useState(false);
  const isAnswered = useMemo(() => {
    return (
      activity.call_type === "answered" || activity.call_type === "voicemall"
    );
  }, [activity]);

  const isInbound = useMemo(() => activity.direction === "inbound", [activity]);

  return (
    <Card className="flex items-center justify-between px-4 py-2 gap-4 ">
      <div
        onClick={() => handleSelect(activity.id)}
        className="flex items-center gap-4 flex-1"
      >
        <div>
          {activity.isSelected && (
            <>
              <Checkbox className="w-6 h-6" checked />
            </>
          )}
          {!activity.isSelected && (
            <div>
              {isInbound && (
                <PhoneIncomingIcon
                  className={cn(isAnswered ? "text-green-700" : "text-red-700")}
                />
              )}
              {!isInbound && (
                <PhoneOutgoingIcon
                  className={cn(isAnswered ? "text-green-700" : "text-red-700")}
                />
              )}
            </div>
          )}
        </div>
        <div className="flex-1">
          <h3 className="font-semibold">
            {isInbound && activity.from}
            {!isInbound && activity.to}
            {isInbound && !activity.from && "Unknown"}
            {!isInbound && !activity.to && "Unknown"}
          </h3>
          <p className=" text-sm text-gray-500">
            {dayjs(activity.created_at).format("DD MMM YYYY")}
          </p>
        </div>
      </div>
      <ActivityDropDown
        handleArchive={handleArchiveChange}
        isArchived={isArchived}
        setIsSheetOpen={setIsSheetOpen}
      />
      <ActivitySheet
        activity={activity}
        open={isSheetOpen}
        onOpenChange={setIsSheetOpen}
      />
    </Card>
  );
};

export default ActivityCard;
