"use client"

import {
  ClipboardList,
  Clock,
  UserCheck,
  CheckCircle2,
  AlertTriangle,
  IndianRupee,
} from "lucide-react"
import DashboardLayout from "@/components/dashboard-layout"
import { TopNav } from "@/components/top-nav"
import { SummaryCard } from "@/components/summary-card"
import { MapSection } from "@/components/map-section"
import { OrdersTable } from "@/components/orders-table"
import { orders, dumpYard } from "@/lib/dummy-data"

const summaryCards = [
  {
    title: "Total Orders",
    value: orders.length,
    icon: ClipboardList,
    trend: "+12% from last month",
    trendUp: true,
    iconClassName: "bg-accent/10 text-accent",
  },
  {
    title: "Pending Works",
    value: orders.filter((o) => o.status === "Pending").length,
    icon: Clock,
    trend: "3 new today",
    trendUp: false,
    iconClassName: "bg-chart-4/10 text-chart-4",
  },
  {
    title: "Assigned Works",
    value: orders.filter((o) => o.status === "Assigned").length,
    icon: UserCheck,
    trend: "2 in progress",
    trendUp: true,
  },
  {
    title: "Completed Works",
    value: orders.filter((o) => o.status === "Completed").length,
    icon: CheckCircle2,
    trend: "+8% this week",
    trendUp: true,
  },
  {
    title: "Overdue Orders",
    value: orders.filter((o) => o.status === "Overdue").length,
    icon: AlertTriangle,
    trend: "Requires attention",
    trendUp: false,
    iconClassName: "bg-destructive/10 text-destructive",
  },
  {
    title: "Total Revenue",
    value: `₹${orders.reduce((s, o) => s + o.amount, 0).toLocaleString()}`,
    icon: IndianRupee,
    trend: "+15% from last month",
    trendUp: true,
    iconClassName: "bg-primary/10 text-primary",
  },
]

const statusColorMap: Record<string, "red" | "yellow" | "green"> = {
  Pending: "red",
  Assigned: "yellow",
  Completed: "green",
  Overdue: "red",
}

const mapMarkers = [
  ...orders.map((o) => ({
    id: o.id,
    label: o.clientName.split(" ")[0],
    lat: o.lat,
    lng: o.lng,
    color: statusColorMap[o.status] as "red" | "yellow" | "green",
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
    id: "dump-yard",
    label: dumpYard.name,
    lat: dumpYard.lat,
    lng: dumpYard.lng,
    color: "blue" as const,
  },
]

export default function ManagerDashboard() {
  return (
    <DashboardLayout>
      <TopNav title="Manager Dashboard" />
      <div className="flex flex-col gap-6 p-4 md:p-6">
        {/* Summary Cards */}
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-3 xl:grid-cols-6">
          {summaryCards.map((card) => (
            <SummaryCard key={card.title} {...card} />
          ))}
        </div>

        {/* Live Map */}
        <MapSection markers={mapMarkers} title="Live Pickup Map" />

        {/* Orders Table */}
        <div>
          <h2 className="mb-3 text-sm font-semibold text-foreground">
            Recent Orders
          </h2>
          <OrdersTable orders={orders} />
        </div>
      </div>
    </DashboardLayout>
  )
}
