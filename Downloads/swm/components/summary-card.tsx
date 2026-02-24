import { cn } from "@/lib/utils"
import type { LucideIcon } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

interface SummaryCardProps {
  title: string
  value: string | number
  icon: LucideIcon
  trend?: string
  trendUp?: boolean
  className?: string
  iconClassName?: string
}

export function SummaryCard({
  title,
  value,
  icon: Icon,
  trend,
  trendUp,
  className,
  iconClassName,
}: SummaryCardProps) {
  return (
    <Card className={cn("overflow-hidden", className)}>
      <CardContent className="p-4">
        <div className="flex items-start justify-between">
          <div className="flex flex-col gap-1">
            <span className="text-xs font-medium text-muted-foreground">
              {title}
            </span>
            <span className="text-2xl font-bold text-card-foreground">
              {value}
            </span>
            {trend && (
              <span
                className={cn(
                  "text-[11px] font-medium",
                  trendUp ? "text-primary" : "text-destructive"
                )}
              >
                {trend}
              </span>
            )}
          </div>
          <div
            className={cn(
              "flex size-10 items-center justify-center rounded-lg",
              iconClassName || "bg-primary/10 text-primary"
            )}
          >
            <Icon className="size-5" />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
