export type OrderStatus = "Pending" | "Assigned" | "Completed" | "Overdue"

export interface Order {
  id: string
  clientName: string
  phone: string
  location: string
  lat: number
  lng: number
  pickupDate: string
  deadline: string
  wasteWeight: number
  amount: number
  status: OrderStatus
  vehicleNumber?: string
  driverName?: string
  tripId?: string
}

export interface Vehicle {
  id: string
  vehicleNumber: string
  capacity: number
  driverName: string
  ownerName: string
  available: boolean
}

export interface Receipt {
  receiptId: string
  orderId: string
  clientName: string
  vehicleNumber: string
  dateOfService: string
  wasteWeight: number
  totalAmount: number
  approved: boolean
}

export interface DriverTrip {
  tripId: string
  assignedDate: string
  deadline: string
  vehicleNumber: string
  pickups: {
    clientName: string
    phone: string
    address: string
    lat: number
    lng: number
    completed: boolean
  }[]
}

export const orders: Order[] = [
  {
    id: "ORD-1001",
    clientName: "Green Valley Corp",
    phone: "+91 98765 43210",
    location: "Sector 12, Noida",
    lat: 28.5855,
    lng: 77.3100,
    pickupDate: "2026-02-20",
    deadline: "2026-02-22",
    wasteWeight: 250,
    amount: 5000,
    status: "Pending",
  },
  {
    id: "ORD-1002",
    clientName: "Metro Hospitals",
    phone: "+91 98765 12345",
    location: "MG Road, Gurgaon",
    lat: 28.4595,
    lng: 77.0266,
    pickupDate: "2026-02-19",
    deadline: "2026-02-21",
    wasteWeight: 180,
    amount: 3600,
    status: "Assigned",
    vehicleNumber: "DL-01-AB-1234",
    driverName: "Ravi Kumar",
    tripId: "TRIP-201",
  },
  {
    id: "ORD-1003",
    clientName: "TechPark Solutions",
    phone: "+91 91234 56789",
    location: "Electronic City, Noida",
    lat: 28.5700,
    lng: 77.3250,
    pickupDate: "2026-02-18",
    deadline: "2026-02-20",
    wasteWeight: 320,
    amount: 6400,
    status: "Completed",
    vehicleNumber: "DL-01-CD-5678",
    driverName: "Amit Singh",
    tripId: "TRIP-200",
  },
  {
    id: "ORD-1004",
    clientName: "Sunrise Apartments",
    phone: "+91 87654 32100",
    location: "Indirapuram, Ghaziabad",
    lat: 28.6300,
    lng: 77.3590,
    pickupDate: "2026-02-17",
    deadline: "2026-02-18",
    wasteWeight: 150,
    amount: 3000,
    status: "Overdue",
  },
  {
    id: "ORD-1005",
    clientName: "BlueStar Industries",
    phone: "+91 99887 76655",
    location: "Okhla Phase 2, Delhi",
    lat: 28.5310,
    lng: 77.2700,
    pickupDate: "2026-02-21",
    deadline: "2026-02-23",
    wasteWeight: 420,
    amount: 8400,
    status: "Pending",
  },
  {
    id: "ORD-1006",
    clientName: "City Mall Complex",
    phone: "+91 77665 54433",
    location: "Rajouri Garden, Delhi",
    lat: 28.6492,
    lng: 77.1250,
    pickupDate: "2026-02-20",
    deadline: "2026-02-22",
    wasteWeight: 280,
    amount: 5600,
    status: "Assigned",
    vehicleNumber: "DL-01-AB-1234",
    driverName: "Ravi Kumar",
    tripId: "TRIP-201",
  },
  {
    id: "ORD-1007",
    clientName: "Royal Residency",
    phone: "+91 88776 65544",
    location: "Dwarka Sector 7, Delhi",
    lat: 28.5810,
    lng: 77.0700,
    pickupDate: "2026-02-19",
    deadline: "2026-02-21",
    wasteWeight: 190,
    amount: 3800,
    status: "Completed",
    vehicleNumber: "DL-01-EF-9012",
    driverName: "Suresh Yadav",
    tripId: "TRIP-199",
  },
  {
    id: "ORD-1008",
    clientName: "Global Tech Hub",
    phone: "+91 99001 22334",
    location: "Connaught Place, Delhi",
    lat: 28.6315,
    lng: 77.2167,
    pickupDate: "2026-02-22",
    deadline: "2026-02-24",
    wasteWeight: 350,
    amount: 7000,
    status: "Pending",
  },
  {
    id: "ORD-1009",
    clientName: "Eco Fresh Foods",
    phone: "+91 95544 33221",
    location: "Mayur Vihar, Delhi",
    lat: 28.6070,
    lng: 77.2940,
    pickupDate: "2026-02-16",
    deadline: "2026-02-17",
    wasteWeight: 210,
    amount: 4200,
    status: "Overdue",
  },
  {
    id: "ORD-1010",
    clientName: "Prestige Tower",
    phone: "+91 88990 11223",
    location: "Nehru Place, Delhi",
    lat: 28.5494,
    lng: 77.2530,
    pickupDate: "2026-02-21",
    deadline: "2026-02-23",
    wasteWeight: 160,
    amount: 3200,
    status: "Assigned",
    vehicleNumber: "DL-01-CD-5678",
    driverName: "Amit Singh",
    tripId: "TRIP-202",
  },
]

export const vehicles: Vehicle[] = [
  {
    id: "VEH-01",
    vehicleNumber: "DL-01-AB-1234",
    capacity: 1000,
    driverName: "Ravi Kumar",
    ownerName: "WasteFlow Pvt Ltd",
    available: true,
  },
  {
    id: "VEH-02",
    vehicleNumber: "DL-01-CD-5678",
    capacity: 800,
    driverName: "Amit Singh",
    ownerName: "GreenHaul Services",
    available: true,
  },
  {
    id: "VEH-03",
    vehicleNumber: "DL-01-EF-9012",
    capacity: 1200,
    driverName: "Suresh Yadav",
    ownerName: "WasteFlow Pvt Ltd",
    available: false,
  },
  {
    id: "VEH-04",
    vehicleNumber: "DL-01-GH-3456",
    capacity: 600,
    driverName: "Vijay Sharma",
    ownerName: "CleanCity Logistics",
    available: true,
  },
  {
    id: "VEH-05",
    vehicleNumber: "DL-01-IJ-7890",
    capacity: 1500,
    driverName: "Manoj Patel",
    ownerName: "GreenHaul Services",
    available: true,
  },
]

export const receipts: Receipt[] = [
  {
    receiptId: "REC-5001",
    orderId: "ORD-1003",
    clientName: "TechPark Solutions",
    vehicleNumber: "DL-01-CD-5678",
    dateOfService: "2026-02-18",
    wasteWeight: 320,
    totalAmount: 6400,
    approved: true,
  },
  {
    receiptId: "REC-5002",
    orderId: "ORD-1007",
    clientName: "Royal Residency",
    vehicleNumber: "DL-01-EF-9012",
    dateOfService: "2026-02-19",
    wasteWeight: 190,
    totalAmount: 3800,
    approved: true,
  },
  {
    receiptId: "REC-5003",
    orderId: "ORD-1002",
    clientName: "Metro Hospitals",
    vehicleNumber: "DL-01-AB-1234",
    dateOfService: "2026-02-20",
    wasteWeight: 180,
    totalAmount: 3600,
    approved: false,
  },
]

export const driverTrip: DriverTrip = {
  tripId: "TRIP-201",
  assignedDate: "2026-02-20",
  deadline: "2026-02-22",
  vehicleNumber: "DL-01-AB-1234",
  pickups: [
    {
      clientName: "Metro Hospitals",
      phone: "+91 98765 12345",
      address: "MG Road, Gurgaon",
      lat: 28.4595,
      lng: 77.0266,
      completed: true,
    },
    {
      clientName: "City Mall Complex",
      phone: "+91 77665 54433",
      address: "Rajouri Garden, Delhi",
      lat: 28.6492,
      lng: 77.1250,
      completed: false,
    },
    {
      clientName: "Green Valley Corp",
      phone: "+91 98765 43210",
      address: "Sector 12, Noida",
      lat: 28.5855,
      lng: 77.3100,
      completed: false,
    },
  ],
}

export const dumpYard = {
  name: "Central Dump Yard",
  lat: 28.5500,
  lng: 77.2000,
}

export const revenueData = [
  { month: "Sep", revenue: 42000 },
  { month: "Oct", revenue: 58000 },
  { month: "Nov", revenue: 51000 },
  { month: "Dec", revenue: 63000 },
  { month: "Jan", revenue: 72000 },
  { month: "Feb", revenue: 48200 },
]

export const vehiclePerformance = [
  { vehicle: "DL-01-AB-1234", trips: 24, weight: 5800 },
  { vehicle: "DL-01-CD-5678", trips: 19, weight: 4200 },
  { vehicle: "DL-01-EF-9012", trips: 22, weight: 6100 },
  { vehicle: "DL-01-GH-3456", trips: 15, weight: 2900 },
  { vehicle: "DL-01-IJ-7890", trips: 28, weight: 8400 },
]

export const locationStats = [
  { location: "Noida", orders: 18, revenue: 32000 },
  { location: "Gurgaon", orders: 12, revenue: 24000 },
  { location: "Delhi Central", orders: 25, revenue: 48000 },
  { location: "Ghaziabad", orders: 8, revenue: 14000 },
  { location: "Dwarka", orders: 14, revenue: 26000 },
]
