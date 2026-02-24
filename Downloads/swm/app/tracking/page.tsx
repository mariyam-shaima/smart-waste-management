"use client"

import {
  Clock,
  MapPin,
  Truck,
  CheckCircle2,
  Navigation,
} from "lucide-react"
import DashboardLayout from "@/components/dashboard-layout"
import { TopNav } from "@/components/top-nav"
import { MapSection } from "@/components/map-section"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { orders, vehicles, dumpYard } from "@/lib/dummy-data"
import { cn } from "@/lib/utils"

const assignedOrders = orders.filter((o) => o.status === "Assigned")

const trackingData = [
  {
    tripId: "TRIP-201",
    vehicleNumber: "DL-01-AB-1234",
    driverName: "Ravi Kumar",
    status: "In Transit" as const,
    startTime: "08:30 AM",
    pickups: [
      { location: "MG Road, Gurgaon", time: "09:15 AM", done: true },
      { location: "Rajouri Garden, Delhi", time: "10:45 AM", done: true },
      { location: "Sector 12, Noida", time: null, done: false },
    ],
    dumpingTime: null,
    distance: "42 km",
  },
  {
    tripId: "TRIP-202",
    vehicleNumber: "DL-01-CD-5678",
    driverName: "Amit Singh",
    status: "Completed" as const,
    startTime: "07:00 AM",
    pickups: [
      { location: "Nehru Place, Delhi", time: "07:45 AM", done: true },
    ],
    dumpingTime: "09:30 AM",
    distance: "28 km",
  },
]

const mapMarkers = [
  ...assignedOrders.map((o) => ({
    id: o.id,
    label: o.clientName.split(" ")[0],
    lat: o.lat,
    lng: o.lng,
    color: "yellow" as const,
    popup: {
      clientName: o.clientName,
      phone: o.phone,
      orderId: o.id,
      wasteWeight: o.wasteWeight,
      pickupDate: o.pickupDate,
      deadline: o.deadline,
      status: o.status,
    },
  })),
  {
    id: "dump",
    label: "Dump Yard",
    lat: dumpYard.lat,
    lng: dumpYard.lng,
    color: "blue" as const,
  },
]

export default function TrackingPage() {
  return (
    <DashboardLayout>
      <TopNav title="Live Tracking" />
      <div className="flex flex-col gap-6 p-4 md:p-6">
        {/* Map */}
        <MapSection
          markers={mapMarkers}
          title="Live Vehicle Tracking"
          showRoute
        />

        {/* Trip Cards */}
        <div className="grid gap-4 md:grid-cols-2">
          {trackingData.map((trip) => (
            <Card key={trip.tripId}>
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2 text-sm">
                    <Truck className="size-4 text-primary" />
                    {trip.tripId}
                  </CardTitle>
                  <Badge
                    variant="outline"
                    className={cn(
                      "text-[10px]",
                      trip.status === "In Transit"
                        ? "bg-chart-4/10 text-chart-4 border-chart-4/20"
                        : "bg-primary/10 text-primary border-primary/20"
                    )}
                  >
                    {trip.status}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="flex flex-col gap-4">
                {/* Vehicle Info */}
                <div className="grid grid-cols-3 gap-3 text-xs">
                  <div>
                    <p className="text-muted-foreground">Vehicle</p>
                    <p className="font-mono font-medium text-card-foreground">
                      {trip.vehicleNumber}
                    </p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Driver</p>
                    <p className="font-medium text-card-foreground">
                      {trip.driverName}
                    </p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Distance</p>
                    <p className="font-mono font-medium text-card-foreground">
                      {trip.distance}
                    </p>
                  </div>
                </div>

                {/* Timeline */}
                <div className="flex flex-col gap-0">
                  <div className="flex items-center gap-3 py-2">
                    <div className="flex size-6 items-center justify-center rounded-full bg-primary/10 text-primary">
                      <Navigation className="size-3" />
                    </div>
                    <div className="flex-1 text-xs">
                      <p className="font-medium text-card-foreground">
                        Trip Started
                      </p>
                      <p className="text-muted-foreground">{trip.startTime}</p>
                    </div>
                  </div>

                  {trip.pickups.map((pickup, idx) => (
                    <div key={idx} className="flex items-center gap-3 border-l-2 border-dashed border-border ml-3 pl-5 py-2">
                      <div
                        className={cn(
                          "flex size-6 items-center justify-center rounded-full",
                          pickup.done
                            ? "bg-primary/10 text-primary"
                            : "bg-muted text-muted-foreground"
                        )}
                      >
                        {pickup.done ? (
                          <CheckCircle2 className="size-3" />
                        ) : (
                          <MapPin className="size-3" />
                        )}
                      </div>
                      <div className="flex-1 text-xs">
                        <p
                          className={cn(
                            "font-medium",
                            pickup.done
                              ? "text-card-foreground"
                              : "text-muted-foreground"
                          )}
                        >
                          {pickup.location}
                        </p>
                        <p className="text-muted-foreground">
                          {pickup.time || "Pending"}
                        </p>
                      </div>
                    </div>
                  ))}

                  <div className="flex items-center gap-3 py-2">
                    <div
                      className={cn(
                        "flex size-6 items-center justify-center rounded-full",
                        trip.dumpingTime
                          ? "bg-accent/10 text-accent"
                          : "bg-muted text-muted-foreground"
                      )}
                    >
                      <Clock className="size-3" />
                    </div>
                    <div className="flex-1 text-xs">
                      <p
                        className={cn(
                          "font-medium",
                          trip.dumpingTime
                            ? "text-card-foreground"
                            : "text-muted-foreground"
                        )}
                      >
                        Dumping at Central Dump Yard
                      </p>
                      <p className="text-muted-foreground">
                        {trip.dumpingTime || "Pending"}
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </DashboardLayout>
  )
}
