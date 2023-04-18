/* Steps I followed: 

1. Created two lists of sample data using Google.
2. Made a factory function to calculate the 
   distance between two points. I took help 
   from Google to find a formula.
3. Made a factory function to assign drivers to 
   delivery locations and print the result for further analysis.

I tried to solve the problem using O(n) time complexity, 
but unfortunately I ended up solving it using O(n^2) 
time complexity.

*/

// Sample data
const driverList = [
  { name: "Driver 1", location: { lat: 40.7128, lng: -74.006 } }, // New York City
  { name: "Driver 2", location: { lat: 34.0522, lng: -118.2437 } }, // Los Angeles
  { name: "Driver 3", location: { lat: 41.8781, lng: -87.6298 } }, // Chicago
];

const deliveryList = [
  { location: { lat: 37.7749, lng: -122.4194 } }, // San Francisco
  { location: { lat: 32.7157, lng: -117.1611 } }, // San Diego
  { location: { lat: 39.7392, lng: -104.9903 } }, // Denver
];

// Function to calculate distance between two points using Haversine formula
function calculateDistance(lat1, lon1, lat2, lon2) {
  const R = 6371; // Earth's radius in km
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const d = R * c;
  return d;
}

// Function to assign drivers to delivery locations
function assignDrivers(driverList, deliveryList) {
  const assignedLocations = []; // This is to keep track of which delivery locations have already been assigned to drivers.

  for (const driver of driverList) {
    let closestLocation;
    let closestDistance = Infinity; // Set the initial value to Infinity to ensure that the first calculated distance is always less than closestDistance.

    // This inner loop goes through every element of the deliveryList and checks if the calculated distance is less than the current value of closestDistance.  
    for (const delivery of deliveryList) {
    
        // Need to check if the delivery is already assigned to prevent the assignment of a particular delivery to multiple drivers.
      if (!assignedLocations.includes(delivery)) {
        const d = calculateDistance(
          driver.location.lat,
          driver.location.lng,
          delivery.location.lat,
          delivery.location.lng
        );

        if (d < closestDistance) {
          closestLocation = delivery;
          closestDistance = d;
        }
      }
    }
    console.log(
      `Driver ${driver.name} assigned to delivery location at (${closestLocation.location.lat}, ${closestLocation.location.lng})`
    );
    assignedLocations.push(closestLocation);
  }
}

// Calling the function
assignDrivers(driverList, deliveryList);
