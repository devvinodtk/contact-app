import React from "react";
import { GeoLocation } from "../types/Users";

interface GeoLocationDisplayProps {
  geoLocation?: GeoLocation;
}

const GeoLocationDisplay: React.FC<GeoLocationDisplayProps> = ({
  geoLocation,
}) => {
  return (
    <div className="p-4 border rounded-lg mt-6">
      <h2 className="text-lg font-semibold mb-2 text-gray-600">Geo-Location</h2>
      <p className="text-lg  mb-1 text-gray-600">
        Latitude: {geoLocation?.latitude}
      </p>
      <p className="text-lg mb-1 text-gray-600">
        Longitude: {geoLocation?.longitude}
      </p>
    </div>
    
  );
};

export default GeoLocationDisplay;
