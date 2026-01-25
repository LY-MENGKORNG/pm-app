import {
  Sidebar,
  SidebarRail,
} from "@/components/ui/sidebar"

import AppSidebarFooter from "./app-sidebar-footer"
import AppSidevarContent from "./app-sidebar-content"
import AppSidebarHeader from "./app-sidebar-header"

export async function AppSidebar() {

  return (
    <Sidebar collapsible="icon">
      <AppSidebarHeader />
      <AppSidevarContent />
      <AppSidebarFooter />
      <SidebarRail />
    </Sidebar>
  )
}
