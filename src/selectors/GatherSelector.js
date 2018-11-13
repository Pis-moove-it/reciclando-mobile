export const getCoordinates = state => state.gather.travelImage;
export const getKmsTraveled = state => state.gather.kmsTraveled;
export const getPocketsCollected = state => state.gather.pocketsCollected;
export const getUserData = state => state.gather.userData;
export const selectContainers = state => state.gather.containers;
export const selectIsLoading = state => state.gather.isLoadingContainers;
export const selectContainerIdSelected = state => state.gather.containerIdSelected;
export const selectIsTravelling = state => state.gather.isTravelling;
export const selectPocketCounter = state => state.gather.pocketCounter;
export const isLoading = state => state.gather.isLoading;
export const selectIsLoadingEvent = state => state.gather.isLoadingEvent;
export const selecteventId = state => state.gather.eventId;
export const selectEventCoordinates = state => state.gather.eventCoordinates;
export const isOverlayVisible = state => state.gather.isOverlayVisible;
export const isOverlayLoading = state => state.gather.isOverlayLoading;
export const getFinishSuccess = state => state.gather.finishSuccess;
