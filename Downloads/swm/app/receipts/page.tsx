"use client"

import {
  Receipt as ReceiptIcon,
  Download,
  CheckCircle2,
  Clock,
  Search,
} from "lucide-react"
import DashboardLayout from "@/components/dashboard-layout"
import { TopNav } from "@/components/top-nav"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { receipts } from "@/lib/dummy-data"
import { cn } from "@/lib/utils"
import { useState } from "react"

export default function ReceiptsPage() {
  const [search, setSearch] = useState("")

  const filteredReceipts = receipts.filter(
    (r) =>
      r.receiptId.toLowerCase().includes(search.toLowerCase()) ||
      r.orderId.toLowerCase().includes(search.toLowerCase()) ||
      r.clientName.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <DashboardLayout>
      <TopNav title="Receipts" />
      <div className="flex flex-col gap-6 p-4 md:p-6">
        {/* Summary */}
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
          <Card>
            <CardContent className="flex items-center gap-3 p-4">
              <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <ReceiptIcon className="size-5" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Total Receipts</p>
                <p className="text-xl font-bold text-card-foreground">
                  {receipts.length}
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
                <p className="text-xs text-muted-foreground">Approved</p>
                <p className="text-xl font-bold text-card-foreground">
                  {receipts.filter((r) => r.approved).length}
                </p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="flex items-center gap-3 p-4">
              <div className="flex size-10 items-center justify-center rounded-lg bg-chart-4/10 text-chart-4">
                <Clock className="size-5" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Pending Approval</p>
                <p className="text-xl font-bold text-card-foreground">
                  {receipts.filter((r) => !r.approved).length}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Search */}
        <div className="relative max-w-sm">
          <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search receipts..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>

        {/* Receipt Cards */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filteredReceipts.map((receipt) => (
            <Card
              key={receipt.receiptId}
              className={cn(
                "overflow-hidden",
                receipt.approved
                  ? "border-primary/20"
                  : "border-chart-4/20"
              )}
            >
              <div
                className={cn(
                  "px-4 py-2 text-xs font-medium",
                  receipt.approved
                    ? "bg-primary/10 text-primary"
                    : "bg-chart-4/10 text-chart-4"
                )}
              >
                {receipt.receiptId}
              </div>
              <CardContent className="flex flex-col gap-3 p-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-semibold text-card-foreground">
                    {receipt.clientName}
                  </h3>
                  <Badge
                    variant="outline"
                    className={cn(
                      "text-[10px]",
                      receipt.approved
                        ? "bg-primary/10 text-primary border-primary/20"
                        : "bg-chart-4/10 text-chart-4 border-chart-4/20"
                    )}
                  >
                    {receipt.approved ? "Approved" : "Pending"}
                  </Badge>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div>
                    <p className="text-muted-foreground">Order ID</p>
                    <p className="font-mono font-medium text-card-foreground">
                      {receipt.orderId}
                    </p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Vehicle</p>
                    <p className="font-mono font-medium text-card-foreground">
                      {receipt.vehicleNumber}
                    </p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Service Date</p>
                    <p className="font-medium text-card-foreground">
                      {receipt.dateOfService}
                    </p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Waste Weight</p>
                    <p className="font-mono font-medium text-card-foreground">
                      {receipt.wasteWeight} kg
                    </p>
                  </div>
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-[10px] text-muted-foreground">
                      Total Amount
                    </p>
                    <p className="text-lg font-bold text-card-foreground">
                      {"₹"}{receipt.totalAmount.toLocaleString()}
                    </p>
                  </div>
                  <Button variant="outline" size="sm" className="gap-1.5 text-xs">
                    <Download className="size-3" />
                    Download PDF
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </DashboardLayout>
  )
}
