"use client"

import {
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import {
  ChartPieIcon,
  CropIcon,
  MapTrifoldIcon,
  TerminalIcon
} from "@phosphor-icons/react";
import Link from "next/link";

const projects = [
  {
    name: "Design Engineering",
    url: "#",
    icon: CropIcon,
  },
  {
    name: "Sales & Marketing",
    url: "#",
    icon: ChartPieIcon,
  },
  {
    name: "Travel",
    url: "#",
    icon: MapTrifoldIcon,
  },
]

export default function AppSidevarContent() {
  return (
    <SidebarContent>
      <SidebarGroup>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <Link href="/dashboard">
                <TerminalIcon />
                Dashboard
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>

      </SidebarGroup>
      <SidebarGroup className="group-data-[collapsible=icon]:hidden">
        <SidebarGroupLabel>Projects</SidebarGroupLabel>
        <SidebarMenu>
          {projects.map((item) => (
            <SidebarMenuItem key={item.name}>
              <SidebarMenuButton asChild>
                <a href={item.url}>
                  {<item.icon />}
                  {item.name}
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroup>
    </SidebarContent>
  )
}