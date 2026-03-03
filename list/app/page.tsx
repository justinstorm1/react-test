"use client"

import AppSidebar from "@/components/app-sidebar";
import { ComponentExample } from "@/components/component-example";
import { Separator } from "@/components/ui/separator";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { useLists } from "@/context/ListContext";
import { Card, CardHeader, CardDescription, CardTitle, CardFooter, CardAction } from '@/components/ui/card';
import { Badge } from "@/components/ui/badge"
import { TrendingUp } from 'lucide-react';


export default function Page() {
    const { lists } = useLists();
    return (
        <SidebarProvider>
            <AppSidebar />
            <SidebarInset>
                <header className="w-full h-16 items-center flex gap-2 border-b px-4">
                    <SidebarTrigger className="-ml-1" />
                    {/* <Separator
                        orientation="vertical"
                        className="mx-2 data-[orientation=vertical]:h-4"
                    /> */}   
                </header>
                
                <main className="p-5">
                  
                </main>

            </SidebarInset>
        </SidebarProvider>
    )
}