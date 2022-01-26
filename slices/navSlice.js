import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  origin: null,
  destination: null,
  travelTimeInformation: null,
  waypointDescriptions: [],
  waypointCoordinates: [],
  home: null,
  work: null,
};

export const navSlice = createSlice({
  name: 'nav',
  initialState,
  reducers: {
    setOrigin: (state, action) => {
      state.origin = action.payload;
    },
    setDestination: (state, action) => {
      state.destination = action.payload;
    },
    setTravelTimeInformation: (state, action) => {
      state.travelTimeInformation = action.payload;
    },
    addWaypoint: (state, action) => {
      state.waypointDescriptions.push(action.payload.description);
      state.waypointCoordinates.push(action.payload);
    },
    deleteWaypoint: (state, action) => {
      state.waypointDescriptions.splice(
        1,
        state.waypointDescriptions.indexOf(action.payload.description)
      );
      state.waypointCoordinates.splice(
        1,
        state.waypointCoordinates.indexOf(action.payload)
      );
    },
    clearWaypoints: (state, action) => {
      state.waypointDescriptions = [];
      state.waypointCoordinates = [];
    },
    setHome: (state, action) => {
      state.home = action.payload;
    },
    setWork: (state, action) => {
      state.work = action.payload;
    },
  },
});

export const {
  setOrigin,
  setDestination,
  setTravelTimeInformation,
  addWaypoint,
  deleteWaypoint,
  clearWaypoints,
  setHome,
  setWork,
} = navSlice.actions;

export const selectOrigin = (state) => state.nav.origin;
export const selectDestination = (state) => state.nav.destination;
export const selectTravelTimeInformation = (state) =>
  state.nav.travelTimeInformation;
export const selectWaypointDescriptions = (state) =>
  state.nav.waypointDescriptions;
export const selectWaypointCoordinates = (state) =>
  state.nav.waypointCoordinates;
export const selectHome = (state) => state.nav.home;
export const selectWork = (state) => state.nav.work;

export default navSlice.reducer;
