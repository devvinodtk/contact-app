import React from "react";
import { GeoLocation } from "../types/Users";

interface GeoLocationDisplayProps {
  geoLocation?: GeoLocation;
}

const GeoLocationDisplay: React.FC<GeoLocationDisplayProps> = ({
  geoLocation,
}) => {
  return (
    <div className="p-4 border rounded-lg bg-gray-50 mt-6">
      <h2 className="text-lg font-semibold mb-4 text-gray-600">Geo-Location</h2>
      <p className="text-lg font-semibold mb-4 text-gray-600">
        <strong>Latitude:</strong> {geoLocation?.latitude}
      </p>
      <p className="text-lg font-semibold mb-4 text-gray-600">
        <strong>Longitude:</strong> {geoLocation?.longitude}
      </p>
    </div>
  );
};

export default GeoLocationDisplay;
