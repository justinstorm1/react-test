"use client"

import { Check, CheckCheck, ChevronRight, ListCheck, ListCheckIcon } from "lucide-react";
import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupLabel, SidebarHeader, SidebarMenu, SidebarMenuBadge, SidebarMenuButton, SidebarMenuItem, SidebarMenuSub, SidebarMenuSubButton, SidebarMenuSubItem, useSidebar } from "./ui/sidebar"
import { useLists } from "@/context/ListContext";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "./ui/collapsible";
import { DropdownMenu, DropdownMenuTrigger } from "./ui/dropdown-menu";

export default function AppSidebar() {
    const { isMobile } = useSidebar();
    // const { lists } = useLists();

    const lists = [
        {
            id: "default-1",
            name: "Personal",
            tasks: [
            { id: "t1", title: "Workout", completed: false },
            ],
        },
        {
            id: "default-2",
            name: "School",
            tasks: [
            { id: "t2", title: "Homework", completed: false },
            ],
        },
    ]

    return (
        <Sidebar>
            <SidebarHeader className="border-b h-16">
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size={'lg'} asChild>
                            <a href="/">
                                <div className="bg-sidebar-primary text-sidebar-primary-foreground font-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                                    <Check />
                                </div>
                                <div className="flex flex-col gap-0.5 text-leading-none">
                                    <span className="font-medium">Lists</span>
                                </div>
                            </a>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupLabel>Lists</SidebarGroupLabel>
                    <SidebarMenu>
                        {lists.map((list) => (
                            <Collapsible
                                key={list.id}
                                className="group/collapsible"
                            >
                                <SidebarMenuItem>
                                    <CollapsibleTrigger asChild>
                                        <SidebarMenuButton>
                                            {list.name}{" "}
                                            <ChevronRight className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-90" />
                                        </SidebarMenuButton>
                                    </CollapsibleTrigger>
                                    {list.tasks.length > 0 ? (
                                        <CollapsibleContent>
                                            <SidebarMenuSub>
                                                {list.tasks.map((task) => (
                                                    <SidebarMenuSubItem key={task.id}>
                                                        <SidebarMenuSubButton
                                                            asChild
                                                            isActive={task.completed}
                                                        >
                                                            <a href="#">{task.title}</a>
                                                            <DropdownMenu>
                                                                <DropdownMenuTrigger>
                                                                    
                                                                </DropdownMenuTrigger>
                                                            </DropdownMenu>
                                                        </SidebarMenuSubButton>
                                                    </SidebarMenuSubItem>
                                                ))}
                                            </SidebarMenuSub>
                                        </CollapsibleContent>
                                    ) : null}
                                </SidebarMenuItem>
                            </Collapsible>
                        ))}
                    </SidebarMenu>
                </SidebarGroup>
            </SidebarContent>
        </Sidebar>
    )
}