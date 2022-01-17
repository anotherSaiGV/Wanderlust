
const port = 4000;
export const backendUrlUser = `http://localhost:${port}/user`; // /register - POST, /login - POST, /getBookings/:userId - GET
export const backendUrlPackage = `http://localhost:${port}/package`; // /hotDeals -> GET, /destinations -> GET, 
export const backendUrlBooking = `http://localhost:${port}/booking`; // /:userId/:destinationId -> POST, /cancelBooking/:bookingId -> DELETE, /getDetails/:destinationId - GET, 
export const backendUrlDestination = `http://localhost:${port}/destination`;
export const backendUrlHotdeals = `http://localhost:${port}/hotdeals`;