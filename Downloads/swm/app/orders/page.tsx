"use client"

import { useState } from "react"
import { Search, Filter, Download } from "lucide-react"
import DashboardLayout from "@/components/dashboard-layout"
import { TopNav } from "@/components/top-nav"
import { OrdersTable } from "@/components/orders-table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { orders } from "@/lib/dummy-data"
import type { OrderStatus } from "@/lib/dummy-data"

export default function OrdersPage() {
  const [search, setSearch] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")

  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.clientName.toLowerCase().includes(search.toLowerCase()) ||
      order.id.toLowerCase().includes(search.toLowerCase()) ||
      order.location.toLowerCase().includes(search.toLowerCase())
    const matchesStatus =
      statusFilter === "all" || order.status === statusFilter
    return matchesSearch && matchesStatus
  })

  return (
    <DashboardLayout>
      <TopNav title="Orders" />
      <div className="flex flex-col gap-6 p-4 md:p-6">
        {/* Filters */}
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-1 items-center gap-3">
            <div className="relative max-w-sm flex-1">
              <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search orders..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-9"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-36">
                <Filter className="mr-1 size-3" />
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="Pending">Pending</SelectItem>
                <SelectItem value="Assigned">Assigned</SelectItem>
                <SelectItem value="Completed">Completed</SelectItem>
                <SelectItem value="Overdue">Overdue</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button variant="outline" size="sm" className="gap-1.5">
            <Download className="size-3.5" />
            Export
          </Button>
        </div>

        {/* Stats Summary */}
        <div className="flex flex-wrap gap-4 text-sm">
          <span className="rounded-md bg-card px-3 py-1.5 border text-card-foreground">
            Total: <strong>{filteredOrders.length}</strong>
          </span>
          <span className="rounded-md bg-destructive/10 px-3 py-1.5 text-destructive">
            Pending: <strong>{filteredOrders.filter((o) => o.status === "Pending").length}</strong>
          </span>
          <span className="rounded-md bg-chart-4/10 px-3 py-1.5 text-chart-4">
            Assigned: <strong>{filteredOrders.filter((o) => o.status === "Assigned").length}</strong>
          </span>
          <span className="rounded-md bg-primary/10 px-3 py-1.5 text-primary">
            Completed: <strong>{filteredOrders.filter((o) => o.status === "Completed").length}</strong>
          </span>
        </div>

        {/* Table */}
        <OrdersTable orders={filteredOrders} />
      </div>
    </DashboardLayout>
  )
}
