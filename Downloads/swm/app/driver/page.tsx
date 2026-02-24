"use client"

import { useState } from "react"
import {
  CalendarDays,
  Clock,
  Truck,
  Phone,
  MapPin,
  Camera,
  Upload,
  CheckCircle2,
  Navigation,
  Send,
} from "lucide-react"
import DashboardLayout from "@/components/dashboard-layout"
import { TopNav } from "@/components/top-nav"
import { MapSection } from "@/components/map-section"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { driverTrip, dumpYard } from "@/lib/dummy-data"
import { cn } from "@/lib/utils"

const routeMarkers = [
  ...driverTrip.pickups.map((p, idx) => ({
    id: `pickup-${idx}`,
    label: p.clientName.split(" ")[0],
    lat: p.lat,
    lng: p.lng,
    color: (p.completed ? "green" : "yellow") as "green" | "yellow",
  })),
  {
    id: "dump",
    label: "Dump Yard",
    lat: dumpYard.lat,
    lng: dumpYard.lng,
    color: "blue" as const,
  },
]

export default function DriverDashboard() {
  const [pickupPhotos, setPickupPhotos] = useState<Record<number, boolean>>({})
  const [dumpingPhoto, setDumpingPhoto] = useState(false)

  return (
    <DashboardLayout>
      <TopNav title="Driver Dashboard" />
      <div className="flex flex-col gap-6 p-4 md:p-6">
        {/* Trip Info Card */}
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2 text-base">
                <Truck className="size-5 text-primary" />
                Assigned Work
              </CardTitle>
              <Badge
                variant="outline"
                className="bg-chart-4/10 text-chart-4 border-chart-4/20"
              >
                In Progress
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
              <div className="flex flex-col gap-1">
                <span className="text-xs text-muted-foreground">Trip ID</span>
                <span className="font-mono text-sm font-semibold text-card-foreground">
                  {driverTrip.tripId}
                </span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-xs text-muted-foreground flex items-center gap-1">
                  <CalendarDays className="size-3" />
                  Assigned Date
                </span>
                <span className="text-sm font-medium text-card-foreground">
                  {driverTrip.assignedDate}
                </span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-xs text-muted-foreground flex items-center gap-1">
                  <Clock className="size-3" />
                  Deadline
                </span>
                <span className="text-sm font-medium text-card-foreground">
                  {driverTrip.deadline}
                </span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-xs text-muted-foreground">Vehicle</span>
                <span className="font-mono text-sm font-medium text-card-foreground">
                  {driverTrip.vehicleNumber}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Route Map */}
        <MapSection
          markers={routeMarkers}
          title="Route Map"
          showRoute
        />

        {/* Pickup List */}
        <div className="flex flex-col gap-4">
          <h2 className="text-sm font-semibold text-foreground">
            Pickup Locations ({driverTrip.pickups.length})
          </h2>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {driverTrip.pickups.map((pickup, idx) => (
              <Card
                key={idx}
                className={cn(
                  pickup.completed && "border-primary/30 bg-primary/5"
                )}
              >
                <CardContent className="flex flex-col gap-3 p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex flex-col gap-0.5">
                      <h3 className="text-sm font-semibold text-card-foreground">
                        {pickup.clientName}
                      </h3>
                      <p className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Phone className="size-3" />
                        {pickup.phone}
                      </p>
                    </div>
                    {pickup.completed ? (
                      <div className="flex size-7 items-center justify-center rounded-full bg-primary/10 text-primary">
                        <CheckCircle2 className="size-4" />
                      </div>
                    ) : (
                      <Badge variant="outline" className="text-[10px] bg-chart-4/10 text-chart-4 border-chart-4/20">
                        Pending
                      </Badge>
                    )}
                  </div>
                  <p className="flex items-start gap-1 text-xs text-muted-foreground">
                    <MapPin className="mt-0.5 size-3 shrink-0" />
                    {pickup.address}
                  </p>
                  <div className="pt-1">
                    <Button
                      variant={pickupPhotos[idx] ? "ghost" : "outline"}
                      size="sm"
                      className="w-full gap-1.5 text-xs"
                      onClick={() =>
                        setPickupPhotos((prev) => ({ ...prev, [idx]: true }))
                      }
                    >
                      {pickupPhotos[idx] ? (
                        <>
                          <CheckCircle2 className="size-3.5 text-primary" />
                          Photo Uploaded
                        </>
                      ) : (
                        <>
                          <Camera className="size-3.5" />
                          Upload Pickup Photo
                        </>
                      )}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <Separator />

        {/* Dumping Section */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-sm">
              <Navigation className="size-4 text-accent" />
              Dumping Section
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
              <div className="flex flex-col gap-1">
                <span className="text-xs text-muted-foreground">
                  Dump Location
                </span>
                <span className="text-sm font-medium text-card-foreground">
                  Central Dump Yard
                </span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-xs text-muted-foreground">
                  Auto-Captured Location
                </span>
                <span className="font-mono text-sm text-card-foreground">
                  28.5500, 77.2000
                </span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-xs text-muted-foreground">
                  Distance Travelled
                </span>
                <span className="font-mono text-sm font-semibold text-card-foreground">
                  47.3 km
                </span>
              </div>
            </div>

            <Button
              variant={dumpingPhoto ? "ghost" : "outline"}
              size="sm"
              className="w-fit gap-1.5 text-xs"
              onClick={() => setDumpingPhoto(true)}
            >
              {dumpingPhoto ? (
                <>
                  <CheckCircle2 className="size-3.5 text-primary" />
                  Dumping Photo Uploaded
                </>
              ) : (
                <>
                  <Upload className="size-3.5" />
                  Upload Dumping Photo
                </>
              )}
            </Button>
          </CardContent>
        </Card>

        {/* Submit Button */}
        <Button className="w-full gap-2 py-5 text-sm md:w-fit md:px-12">
          <Send className="size-4" />
          Submit Completion
        </Button>
      </div>
    </DashboardLayout>
  )
}
