import treadmill from "./treadmill.svg";
import bike from "./bike.png";
import elliptical from "./elliptical.png";

const machineTypes = {
  "Bike": bike,
  "Elliptical": elliptical,
  "Pull-up": "",
  "Stepmill": "",
  "Treadmill": treadmill,
  "All": "",
};

const machines = [
  {
    id: 101,
    type: "Elliptical",
    queueSize: 3,
    description: "This machine is located on the second floor near the water fountain",
  },
  {
    id: 102,
    type: "Bike",
    queueSize: 2,
    description: "This machine is located on the second floor near the water fountain",
  },
  {
    id: 103,
    type: "Treadmill",
    queueSize: 0,
    description: "This machine is located on the second floor near the water fountain",
  },
  {
    id: 202,
    type: "Bike",
    queueSize: 3,
    description: "This machine is located on the second floor near the water fountain",
  },
  {
    id: 203,
    type: "Treadmill",
    queueSize: 10,
    description: "This machine is located on the second floor near the water fountain",
  }
];

let evalStatus = m => {
  if (m.queueSize >= 1 && m.queueSize < 5) {
    return "Busy";
  } else if (m.queueSize >= 5) {
    return "Full";
  } else if (m.queueSize < 0) {
    return "Inactive";
  } else {
    return "Available";
  }
}

export { machines, machineTypes, evalStatus };
