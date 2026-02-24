"use client"

import { Bell } from "lucide-react"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"

interface TopNavProps {
  title: string
}

export function TopNav({ title }: TopNavProps) {
  return (
    <header className="flex h-14 items-center gap-4 border-b bg-card px-4">
      <SidebarTrigger />
      <Separator orientation="vertical" className="h-6" />
      <h1 className="text-base font-semibold text-card-foreground">{title}</h1>
      <div className="ml-auto flex items-center gap-3">
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="size-4" />
          <span className="absolute -top-0.5 -right-0.5 flex size-4 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground">
            3
          </span>
          <span className="sr-only">Notifications</span>
        </Button>
        <Avatar className="size-8">
          <AvatarFallback className="bg-primary text-primary-foreground text-xs">
            MA
          </AvatarFallback>
        </Avatar>
      </div>
    </header>
  )
}
