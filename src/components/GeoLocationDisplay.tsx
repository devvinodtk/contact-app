import React from "react";
import { GeoLocation } from "../types/Users";
import { Button } from "@material-tailwind/react";
import { LocateFixed } from "lucide-react";

interface GeoLocationDisplayProps {
  geoLocation?: GeoLocation;
}

const GeoLocationDisplay: React.FC<GeoLocationDisplayProps> = (
  _geoLocation
) => {
  return (
    <div className="">
      <h2 className="text-lg font-semibold mb-2 text-gray-600">
        Share My Home Location
      </h2>
      <Button
        color="blue"
        variant="text"
        className="w-full text-center cursor-pointe hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
        {...({} as React.ComponentProps<typeof Button>)}
      >
        <span className="float-left mr-1"><LocateFixed /></span> <span>Share My current/Home Location</span>
      </Button>
      {/* <p className="text-lg  mb-1 text-gray-600">
        <span>Latitude: {geoLocation?.latitude}</span> | <span>Longitude: {geoLocation?.longitude}</span>
      </p> */}
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d15547.39464701407!2d77.5734042!3d13.0453034!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sin!4v1733762329418!5m2!1sen!2sin"
        width="100%"
        height="auto"
        loading="lazy"
      ></iframe>
    </div>
  );
};

export default GeoLocationDisplay;
