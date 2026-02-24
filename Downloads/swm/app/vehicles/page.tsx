"use client"

import { useState } from "react"
import { Pencil, Ban, CheckCircle2, Truck, Search } from "lucide-react"
import DashboardLayout from "@/components/dashboard-layout"
import { TopNav } from "@/components/top-nav"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { vehicles } from "@/lib/dummy-data"
import { cn } from "@/lib/utils"

export default function VehiclesPage() {
  const [search, setSearch] = useState("")

  const filteredVehicles = vehicles.filter(
    (v) =>
      v.vehicleNumber.toLowerCase().includes(search.toLowerCase()) ||
      v.driverName.toLowerCase().includes(search.toLowerCase()) ||
      v.ownerName.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <DashboardLayout>
      <TopNav title="Vehicles" />
      <div className="flex flex-col gap-6 p-4 md:p-6">
        {/* Summary row */}
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          <Card>
            <CardContent className="flex items-center gap-3 p-4">
              <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <Truck className="size-5" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Total Vehicles</p>
                <p className="text-xl font-bold text-card-foreground">
                  {vehicles.length}
                </p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="flex items-center gap-3 p-4">
              <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <CheckCircle2 className="size-5" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Available</p>
                <p className="text-xl font-bold text-card-foreground">
                  {vehicles.filter((v) => v.available).length}
                </p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="flex items-center gap-3 p-4">
              <div className="flex size-10 items-center justify-center rounded-lg bg-destructive/10 text-destructive">
                <Ban className="size-5" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Unavailable</p>
                <p className="text-xl font-bold text-card-foreground">
                  {vehicles.filter((v) => !v.available).length}
                </p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="flex items-center gap-3 p-4">
              <div className="flex size-10 items-center justify-center rounded-lg bg-accent/10 text-accent">
                <Truck className="size-5" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Total Capacity</p>
                <p className="text-xl font-bold text-card-foreground">
                  {vehicles.reduce((s, v) => s + v.capacity, 0).toLocaleString()} kg
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Search */}
        <div className="relative max-w-sm">
          <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search vehicles..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>

        {/* Table */}
        <div className="rounded-lg border bg-card">
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent">
                <TableHead>Vehicle Number</TableHead>
                <TableHead className="text-right">Capacity (kg)</TableHead>
                <TableHead>Driver Name</TableHead>
                <TableHead>Owner Name</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredVehicles.map((v) => (
                <TableRow key={v.id}>
                  <TableCell className="font-mono text-sm font-medium">
                    {v.vehicleNumber}
                  </TableCell>
                  <TableCell className="text-right font-mono">
                    {v.capacity.toLocaleString()}
                  </TableCell>
                  <TableCell>{v.driverName}</TableCell>
                  <TableCell className="text-muted-foreground">
                    {v.ownerName}
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className={cn(
                        "text-[10px]",
                        v.available
                          ? "bg-primary/10 text-primary border-primary/20"
                          : "bg-destructive/10 text-destructive border-destructive/20"
                      )}
                    >
                      {v.available ? "Available" : "Unavailable"}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="outline" size="sm" className="h-7 gap-1 text-xs">
                            <Pencil className="size-3" />
                            Edit
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>
                              Edit Vehicle {v.vehicleNumber}
                            </DialogTitle>
                          </DialogHeader>
                          <div className="flex flex-col gap-4 pt-4">
                            <div className="flex flex-col gap-1.5">
                              <Label className="text-xs">Vehicle Number</Label>
                              <Input defaultValue={v.vehicleNumber} />
                            </div>
                            <div className="flex flex-col gap-1.5">
                              <Label className="text-xs">Capacity (kg)</Label>
                              <Input
                                type="number"
                                defaultValue={v.capacity}
                              />
                            </div>
                            <div className="flex flex-col gap-1.5">
                              <Label className="text-xs">Driver Name</Label>
                              <Input defaultValue={v.driverName} />
                            </div>
                            <div className="flex flex-col gap-1.5">
                              <Label className="text-xs">Owner Name</Label>
                              <Input defaultValue={v.ownerName} />
                            </div>
                            <Button className="mt-2">Save Changes</Button>
                          </div>
                        </DialogContent>
                      </Dialog>
                      <Button
                        variant="ghost"
                        size="sm"
                        className={cn(
                          "h-7 gap-1 text-xs",
                          v.available
                            ? "text-destructive hover:text-destructive"
                            : "text-primary hover:text-primary"
                        )}
                      >
                        {v.available ? (
                          <>
                            <Ban className="size-3" />
                            Disable
                          </>
                        ) : (
                          <>
                            <CheckCircle2 className="size-3" />
                            Enable
                          </>
                        )}
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </DashboardLayout>
  )
}
