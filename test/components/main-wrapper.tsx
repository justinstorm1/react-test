import AppSidebar from "./app-sidebar"
import { Separator } from "./ui/separator"
import { SidebarInset, SidebarProvider, SidebarTrigger } from "./ui/sidebar"

export default function MainWrapper({
    children
}: { 
    children: React.ReactNode
}) {
    return (
        <SidebarProvider>
            <AppSidebar />
            <SidebarInset>
            <header className="px-4 flex items-center h-16 border-b gap-4">
                <SidebarTrigger />
                <Separator orientation="vertical" />
            </header>
            <main className="p-5">
                {children}
            </main>
            </SidebarInset>
        </SidebarProvider>
    )
}