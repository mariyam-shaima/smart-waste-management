"use client"

import { cn } from "@/lib/utils"
import type { Order } from "@/lib/dummy-data"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

const statusStyles: Record<
  string,
  { badge: string; label: string }
> = {
  Pending: {
    badge: "bg-destructive/10 text-destructive border-destructive/20",
    label: "Pending",
  },
  Assigned: {
    badge: "bg-chart-4/10 text-chart-4 border-chart-4/20",
    label: "Assigned",
  },
  Completed: {
    badge: "bg-primary/10 text-primary border-primary/20",
    label: "Completed",
  },
  Overdue: {
    badge: "bg-destructive/20 text-destructive border-destructive/30",
    label: "Overdue",
  },
}

interface OrdersTableProps {
  orders: Order[]
  compact?: boolean
  selectable?: boolean
  selectedIds?: string[]
  onToggleSelect?: (id: string) => void
}

export function OrdersTable({
  orders,
  compact = false,
  selectable = false,
  selectedIds = [],
  onToggleSelect,
}: OrdersTableProps) {
  return (
    <div className="rounded-lg border bg-card">
      <Table>
        <TableHeader>
          <TableRow className="hover:bg-transparent">
            {selectable && (
              <TableHead className="w-10 text-center">#</TableHead>
            )}
            <TableHead>Order ID</TableHead>
            <TableHead>Client</TableHead>
            {!compact && <TableHead>Phone</TableHead>}
            <TableHead>Location</TableHead>
            <TableHead>Pickup Date</TableHead>
            {!compact && <TableHead>Deadline</TableHead>}
            <TableHead className="text-right">Weight (kg)</TableHead>
            <TableHead className="text-right">Amount</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orders.map((order) => {
            const style = statusStyles[order.status]
            const isSelected = selectedIds.includes(order.id)
            return (
              <TableRow
                key={order.id}
                className={cn(isSelected && "bg-primary/5")}
              >
                {selectable && (
                  <TableCell className="text-center">
                    <input
                      type="checkbox"
                      checked={isSelected}
                      onChange={() => onToggleSelect?.(order.id)}
                      className="size-4 rounded border-input accent-primary"
                      aria-label={`Select order ${order.id}`}
                    />
                  </TableCell>
                )}
                <TableCell className="font-mono text-xs font-medium">
                  {order.id}
                </TableCell>
                <TableCell className="font-medium">
                  {order.clientName}
                </TableCell>
                {!compact && (
                  <TableCell className="text-muted-foreground">
                    {order.phone}
                  </TableCell>
                )}
                <TableCell className="text-muted-foreground">
                  {order.location}
                </TableCell>
                <TableCell className="text-muted-foreground">
                  {order.pickupDate}
                </TableCell>
                {!compact && (
                  <TableCell className="text-muted-foreground">
                    {order.deadline}
                  </TableCell>
                )}
                <TableCell className="text-right font-mono">
                  {order.wasteWeight}
                </TableCell>
                <TableCell className="text-right font-mono">
                  {"₹"}{order.amount.toLocaleString()}
                </TableCell>
                <TableCell>
                  <Badge
                    variant="outline"
                    className={cn("text-[10px]", style?.badge)}
                  >
                    {style?.label || order.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <Button
                    size="sm"
                    variant={
                      order.status === "Pending"
                        ? "default"
                        : order.status === "Assigned"
                        ? "outline"
                        : "ghost"
                    }
                    className="h-7 text-xs"
                  >
                    {order.status === "Pending"
                      ? "Assign"
                      : order.status === "Assigned"
                      ? "View"
                      : "Confirm"}
                  </Button>
                </TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
    </div>
  )
}
