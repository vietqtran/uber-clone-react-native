import { DriverStore, LocationStore, MarkerData } from "@/types/type";

import { create } from "zustand";

export const useLocationStore = create<LocationStore>((set) => {
  return {
    userAddress: null,
    userLongitude: null,
    userLatitude: null,
    destinationLatitude: null,
    destinationLongitude: null,
    destinationAddress: null,
    setUserLocation: ({ latitude, longitude, address }) => {
      set({ userLatitude: latitude, userLongitude: longitude, userAddress: address });
    },
    setDestinationLocation: ({ latitude, longitude, address }) => {
      set({ destinationLatitude: latitude, destinationLongitude: longitude, destinationAddress: address });
    },
  };
});

export const useDriverStore = create<DriverStore>((set) => {
  return {
    drivers: [] as MarkerData[],
    selectedDriver: null,
    setSelectedDriver: (driverId) => {
      set({ selectedDriver: driverId });
    },
    setDrivers: (drivers) => {
      set({ drivers });
    },
    clearSelectedDriver: () => {
      set({ selectedDriver: null });
    },
  };
});
