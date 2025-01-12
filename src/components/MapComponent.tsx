import React, { useState, useCallback } from "react";
import {
  GoogleMap,
  LoadScript,
  Marker,
  Autocomplete,
} from "@react-google-maps/api";
import { blreCoordinates, Coordinates } from "../types/Users";

interface MapComponentProps {
  coordinates?: Coordinates;
  onUpdateLocation: (coordinates: Coordinates) => void;
}

const MapComponent: React.FC<MapComponentProps> = ({
  coordinates,
  onUpdateLocation,
}) => {
  const googleMapsAPIKey = import.meta.env.REACT_APP_GOOGLE_MAPS_API_KEY;
  const [center, setCenter] = useState<Coordinates>(
    coordinates ?? blreCoordinates
  ); // Bangalore coordinates
  const [selectedLocation, setSelectedLocation] = useState<Coordinates | null>(
    null
  );
  const [markerPosition, setMarkerPosition] = useState<Coordinates | null>(
    null
  );
  const [autocomplete, setAutocomplete] =
    useState<google.maps.places.Autocomplete | null>(null);

  const mapStyles: React.CSSProperties = { height: "250px", width: "100%" };

  const handleAutocompleteLoad = (
    autocompleteInstance: google.maps.places.Autocomplete
  ) => {
    setAutocomplete(autocompleteInstance);
  };

  // Handle "Share My Location" button click
  const handleShareLocation = (event: React.MouseEvent) => {
    event.preventDefault();
    const locationToSave: Coordinates = selectedLocation || center;
    // Save `locationToSave` to your DB here (use fetch/axios)
    onUpdateLocation && onUpdateLocation(locationToSave);
  };

  const handlePlaceChanged = () => {
    if (autocomplete) {
      const place = autocomplete.getPlace();
      if (place.geometry?.location) {
        const newLocation: Coordinates = {
          lat: place.geometry.location.lat(),
          lng: place.geometry.location.lng(),
        };
        setCenter(newLocation); // Center map to the selected location
        setMarkerPosition(newLocation); // Place marker on the selected location
        setSelectedLocation(newLocation);
      }
    }
  };

  const handleMapClick = (event: google.maps.MapMouseEvent) => {
    if (event.latLng) {
      const newLocation: Coordinates = {
        lat: event.latLng.lat(),
        lng: event.latLng.lng(),
      };
      setMarkerPosition(newLocation); // Set marker to clicked location
      setCenter(newLocation); // Center map to clicked location
    }
  };

  // Get the user's current location
  const locateUser = useCallback((event: React.MouseEvent) => {
    event.preventDefault();
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const currentLocation: Coordinates = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          setCenter(currentLocation);
          setMarkerPosition(currentLocation);
          setSelectedLocation(currentLocation);
        },
        () => alert("Failed to retrieve your location")
      );
    } else {
      alert("Geolocation is not supported by your browser");
    }
  }, []);

  return (
    <div className="p-4">
      <LoadScript googleMapsApiKey={googleMapsAPIKey} libraries={["places"]}>
        <div className="mb-4">
          <Autocomplete
            onLoad={handleAutocompleteLoad}
            onPlaceChanged={handlePlaceChanged}
          >
            <input
              type="text"
              placeholder="Search for a location"
              className="p-2 border rounded w-full text-gray-600"
            />
          </Autocomplete>
        </div>
        <GoogleMap
          mapContainerStyle={mapStyles}
          center={center}
          zoom={14}
          mapTypeId="terrain"
          options={{ mapTypeControl: false, streetViewControl: false }}
          onClick={handleMapClick}
        >
          {markerPosition && <Marker position={markerPosition} />}
        </GoogleMap>
      </LoadScript>
      <div className="flex justify-between mt-4">
        <button
          type="button"
          onClick={locateUser}
          className="px-4 py-2 text-white bg-blue-500 rounded"
        >
          Use My Current Location
        </button>
        <button
          type="button"
          onClick={handleShareLocation}
          className="px-4 py-2 bg-green-500  text-white rounded"
        >
          Share My Location
        </button>
      </div>
    </div>
  );
};

export default MapComponent;
