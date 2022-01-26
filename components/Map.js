import { View, Text, useColorScheme } from 'react-native';
import React, { useEffect, useRef } from 'react';
import MapView, { Marker } from 'react-native-maps';
import tw from 'tailwind-react-native-classnames';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectDestination,
  selectOrigin,
  selectWaypointCoordinates,
  selectWaypointDescriptions,
  setTravelTimeInformation,
} from '../slices/navSlice';
import { GOOGLE_MAPS_APIKEY } from '@env';
import MapViewDirections from 'react-native-maps-directions';
import destinationPin from '../assets/destination_pin.png';
import pickupPin from '../assets/pickup_pin.png';
import waypointPin from '../assets/waypoint_pin.png';

const Map = () => {
  const origin = useSelector(selectOrigin);
  const destination = useSelector(selectDestination);
  const waypointDescriptions = useSelector(selectWaypointDescriptions);
  const waypointCoordinates = useSelector(selectWaypointCoordinates);
  const mapRef = useRef();
  const dispatch = useDispatch();
  const theme = useColorScheme();

  useEffect(() => {
    if (!origin || !destination) return;
    mapRef.current.fitToElements();
  }, [origin, destination]);

  useEffect(() => {
    if (!origin || !destination) return;
    function getTravelTime() {
      fetch(
        `https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins=${
          origin.description
        }&destinations=${
          waypointCoordinates.length > 0
            ? waypointCoordinates[0].description
            : ''
        }|${destination.description}&key=${GOOGLE_MAPS_APIKEY}`
      )
        .then((res) => res.json())
        .then((data) => {
          dispatch(setTravelTimeInformation(data.rows[0].elements[0]));
        });
    }
    getTravelTime();
  }, [origin, destination, waypointCoordinates, GOOGLE_MAPS_APIKEY]);

  const waypointMarkers = waypointCoordinates.map((item, i) => (
    <Marker
      key={i}
      coordinate={{
        latitude: item?.location.lat,
        longitude: item?.location.lng,
      }}
      title={`Stop ${i + 1}`}
      description={item.description}
      indentifier={`waypoint${i}`}
      image={waypointPin}
    />
  ));
  return (
    <MapView
      ref={mapRef}
      style={tw`flex-1`}
      mapType='mutedStandard'
      initialRegion={{
        latitude: origin?.location?.lat || 34.0172386,
        longitude: origin?.location?.lng || -118.5015062,
        latitudeDelta: 0.005,
        longitudeDelta: 0.005,
      }}
    >
      {origin && destination && (
        <MapViewDirections
          origin={origin.description}
          destination={destination.description}
          apikey={GOOGLE_MAPS_APIKEY}
          strokeWidth={3}
          strokeColor={theme === 'dark' ? 'white' : 'black'}
          waypoints={waypointDescriptions}
        />
      )}
      {origin?.location && (
        <Marker
          coordinate={{
            latitude: origin?.location.lat,
            longitude: origin?.location.lng,
          }}
          title='Pickup'
          description={origin.description}
          indentifier='origin'
          image={pickupPin}
        />
      )}
      {destination?.location && (
        <Marker
          coordinate={{
            latitude: destination?.location.lat,
            longitude: destination?.location.lng,
          }}
          title='Destination'
          description={destination.description}
          indentifier='destination'
          image={destinationPin}
        />
      )}
      {/* {waypointCoordinates && (
        <Marker
          coordinate={{
            latitude: waypointCoordinates[0]?.location.lat,
            longitude: waypointCoordinates[0]?.location.lng,
          }}
          title='Stop'
          description={waypointCoordinates[0]?.description}
          indentifier='stop'
          image={destinationPin}
        />
      )} */}
      {waypointCoordinates?.length > 0 && waypointMarkers}
    </MapView>
  );
};

export default Map;
