"use client"

import { cn } from "@/lib/utils"
import { MapPin } from "lucide-react"
import { useState } from "react"

interface MarkerData {
  id: string
  label: string
  lat: number
  lng: number
  color: "red" | "yellow" | "green" | "blue"
  popup?: {
    clientName: string
    phone: string
    orderId: string
    wasteWeight: number
    pickupDate: string
    deadline: string
    status: string
  }
}

interface MapSectionProps {
  markers?: MarkerData[]
  className?: string
  showRoute?: boolean
  title?: string
}

const colorMap = {
  red: "text-destructive",
  yellow: "text-chart-4",
  green: "text-primary",
  blue: "text-accent",
}

const bgColorMap = {
  red: "bg-destructive/10",
  yellow: "bg-chart-4/10",
  green: "bg-primary/10",
  blue: "bg-accent/10",
}

export function MapSection({
  markers = [],
  className,
  showRoute = false,
  title = "Live Map",
}: MapSectionProps) {
  const [selectedMarker, setSelectedMarker] = useState<MarkerData | null>(null)

  return (
    <div className={cn("relative overflow-hidden rounded-lg border bg-card", className)}>
      <div className="flex items-center justify-between border-b px-4 py-3">
        <h3 className="text-sm font-semibold text-card-foreground">{title}</h3>
        <div className="flex items-center gap-3 text-xs text-muted-foreground">
          <span className="flex items-center gap-1">
            <span className="inline-block size-2 rounded-full bg-destructive" />
            Pending
          </span>
          <span className="flex items-center gap-1">
            <span className="inline-block size-2 rounded-full bg-chart-4" />
            Assigned
          </span>
          <span className="flex items-center gap-1">
            <span className="inline-block size-2 rounded-full bg-primary" />
            Completed
          </span>
          <span className="flex items-center gap-1">
            <span className="inline-block size-2 rounded-full bg-accent" />
            Dump Yard
          </span>
        </div>
      </div>
      <div className="relative h-[380px] bg-secondary/40">
        {/* Map grid background */}
        <div className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: `
              linear-gradient(to right, var(--border) 1px, transparent 1px),
              linear-gradient(to bottom, var(--border) 1px, transparent 1px)
            `,
            backgroundSize: "40px 40px",
          }}
        />
        {/* Markers placed on a relative coordinate system */}
        {markers.map((marker) => {
          const x = ((marker.lng - 77.0) / 0.4) * 100
          const y = ((28.7 - marker.lat) / 0.3) * 100
          return (
            <button
              key={marker.id}
              className={cn(
                "absolute z-10 flex flex-col items-center transition-transform hover:scale-125",
                colorMap[marker.color]
              )}
              style={{
                left: `${Math.max(5, Math.min(92, x))}%`,
                top: `${Math.max(5, Math.min(90, y))}%`,
              }}
              onClick={() =>
                setSelectedMarker(selectedMarker?.id === marker.id ? null : marker)
              }
              aria-label={`Marker for ${marker.label}`}
            >
              <MapPin className="size-6 drop-shadow-md fill-current" />
              <span className="mt-0.5 rounded bg-card/90 px-1 py-0.5 text-[9px] font-medium text-card-foreground shadow-sm">
                {marker.label}
              </span>
            </button>
          )
        })}

        {showRoute && markers.length > 1 && (
          <svg
            className="absolute inset-0 size-full"
            style={{ pointerEvents: "none" }}
          >
            <polyline
              points={markers
                .map((m) => {
                  const x = ((m.lng - 77.0) / 0.4) * 100
                  const y = ((28.7 - m.lat) / 0.3) * 100
                  return `${Math.max(5, Math.min(92, x))}%,${Math.max(5, Math.min(90, y))}%`
                })
                .join(" ")}
              fill="none"
              stroke="var(--accent)"
              strokeWidth="2"
              strokeDasharray="6 4"
              opacity="0.7"
            />
          </svg>
        )}

        {/* Popup */}
        {selectedMarker?.popup && (
          <div className="absolute right-4 top-4 z-20 w-64 rounded-lg border bg-card p-3 shadow-lg">
            <button
              className="absolute top-2 right-2 text-muted-foreground hover:text-card-foreground text-xs"
              onClick={() => setSelectedMarker(null)}
              aria-label="Close popup"
            >
              X
            </button>
            <h4 className="text-sm font-semibold text-card-foreground">
              {selectedMarker.popup.clientName}
            </h4>
            <div className="mt-2 space-y-1 text-xs text-muted-foreground">
              <p>
                <span className="font-medium text-card-foreground">Phone:</span>{" "}
                {selectedMarker.popup.phone}
              </p>
              <p>
                <span className="font-medium text-card-foreground">Order:</span>{" "}
                {selectedMarker.popup.orderId}
              </p>
              <p>
                <span className="font-medium text-card-foreground">Weight:</span>{" "}
                {selectedMarker.popup.wasteWeight} kg
              </p>
              <p>
                <span className="font-medium text-card-foreground">Pickup:</span>{" "}
                {selectedMarker.popup.pickupDate}
              </p>
              <p>
                <span className="font-medium text-card-foreground">Deadline:</span>{" "}
                {selectedMarker.popup.deadline}
              </p>
              <div className="mt-1">
                <span
                  className={cn(
                    "inline-flex rounded-full px-2 py-0.5 text-[10px] font-medium",
                    selectedMarker.popup.status === "Pending" && "bg-destructive/10 text-destructive",
                    selectedMarker.popup.status === "Assigned" && "bg-chart-4/10 text-chart-4",
                    selectedMarker.popup.status === "Completed" && "bg-primary/10 text-primary",
                    selectedMarker.popup.status === "Overdue" && "bg-destructive/20 text-destructive"
                  )}
                >
                  {selectedMarker.popup.status}
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
