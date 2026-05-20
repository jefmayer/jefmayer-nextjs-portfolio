import React, { useEffect } from 'react';
import { APIProvider, Map, useMap, AdvancedMarker } from '@vis.gl/react-google-maps';
import PropTypes from 'prop-types';
import { getSegmentData } from '@api/strava';
import { isBrowser } from '@utils/browser-utils';

const BoundsHandler = ({ segments }) => {
  const map = useMap();

  useEffect(() => {
    if (!map || !segments || segments.length === 0) return;
    if (!isBrowser()) {
      return null;
    }
    const { google } = window;
    if (!google) {
      return null;
    }
    const bounds = new google.maps.LatLngBounds();
    segments.forEach((segment) => {
      bounds.extend({ lat: segment.start_latlng[0], lng: segment.start_latlng[1] });
      bounds.extend({ lat: segment.end_latlng[0], lng: segment.end_latlng[1] });
    });

    map.fitBounds(bounds, 120);
  }, [map, segments]);

  return null;
};

const GoogleMap = () => {
  const segments = getSegmentData();
  return (
    <APIProvider apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}>
      <Map
        defaultZoom={10}
        defaultCenter={{ lat: 0, lng: 0 }}
        mapId="650916b63dfc40d0639e8d81"
        options={{
          disableDefaultUI: true,
          gestureHandling: 'none',
        }}
        className="map-wrapper"
      >
        <BoundsHandler segments={segments} />

        {segments.map((segment, index) => (
          <AdvancedMarker
            key={segment.id || index}
            position={{
              lat: segment.end_latlng[0],
              lng: segment.end_latlng[1],
            }}
            title={segment.displayname}
          >
            <div className={`map-marker map-marker-${index + 1}`}>
              <img
                src="/images/brtpointsapp/ui-map-icon-alt.svg"
                alt="marker"
                style={{ width: '28px', height: '46px' }}
              />
              <span className="map-marker-label">
                {index + 1}
              </span>
            </div>
          </AdvancedMarker>
        ))}
      </Map>
    </APIProvider>
  );
};

BoundsHandler.propTypes = {
  segments: PropTypes.arrayOf(PropTypes.object),
};

export default GoogleMap;
