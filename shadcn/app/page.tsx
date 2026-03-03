"use client"

import { Separator } from "@/components/ui/separator"
import { useEffect, useState } from "react"
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb"
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import AppSidebar from "@/components/app-sidebar"
import { Field, FieldDescription, FieldGroup, FieldLabel, FieldLegend, FieldSet } from "@/components/ui/field"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import NavActions from "@/components/nav-actions"

export default function Page() {
    const year = new Date().getFullYear()
    const years = Array.from({ length: 6 }, (_, i) => year + i);

    const [date, setDate] = useState<Date | undefined>(new Date());
    const [timeZone, setTimeZone] = useState<string | undefined>(undefined);

    const [label, setLabel] = useState("personal");

    useEffect(() => {
        setTimeZone(Intl.DateTimeFormat().resolvedOptions().timeZone);
    }, []);
    

    return (
        <SidebarProvider>
            <AppSidebar />
            <SidebarInset>
            <header className="flex items-center h-16 shrink-0 gap-2 border-b px-4">
                <SidebarTrigger className="-ml-1" />
                <Separator
                    orientation="vertical"
                    className="mr-2 data-[orientation=vertical]:h-4"
                />
                <Breadcrumb>
                    <BreadcrumbList>
                        <BreadcrumbItem className="hidden md:block">
                            <BreadcrumbLink href="#">
                                Building Your Application
                            </BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator className="hidden md:block" />
                        <BreadcrumbItem>
                            <BreadcrumbPage>Data Fetching</BreadcrumbPage>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>
                <div className="ml-auto">
                    <NavActions />
                </div>
            </header>

            <main className="p-5">

                <form>
                    <FieldGroup>
                        <FieldSet>
                            <FieldLegend>Payment Method</FieldLegend>
                            <FieldDescription>All transactions are secure and encrypted</FieldDescription>
                            <FieldGroup>
                                <Field>
                                    <FieldLabel htmlFor="checkout-7j9-card-name-43j">
                                        Name on Card
                                    </FieldLabel>
                                    <Input 
                                        id="checkout-7j9-card-name-43j"
                                        placeholder="Evil Rabbit"
                                        required
                                    />
                                </Field>
                                <Field>
                                    <FieldLabel htmlFor="checkout-7j9-card-number-uw1">
                                        Card Number
                                    </FieldLabel>
                                    <Input 
                                        id="checkout-7j9-card-number-uw1"
                                        placeholder="1234 5678 9012 3456"
                                        required
                                    />
                                    <FieldDescription>
                                        Enter your 16-digit card number
                                    </FieldDescription>
                                </Field>
                                <div className="grid grid-cols-3 gap-4">
                                    <Field>
                                        <FieldLabel htmlFor="checkout-exp-month-ts6">
                                            Month
                                        </FieldLabel>
                                        <Select defaultValue="">
                                            <SelectTrigger id="checkout-exp-month-ts6">
                                                <SelectValue placeholder="MM" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectGroup>
                                                    <SelectItem value="01">01</SelectItem>
                                                    <SelectItem value="02">02</SelectItem>
                                                    <SelectItem value="03">03</SelectItem>
                                                    <SelectItem value="04">04</SelectItem>
                                                    <SelectItem value="05">05</SelectItem>
                                                    <SelectItem value="06">06</SelectItem>
                                                    <SelectItem value="07">07</SelectItem>
                                                    <SelectItem value="08">08</SelectItem>
                                                    <SelectItem value="09">09</SelectItem>
                                                    <SelectItem value="10">10</SelectItem>
                                                    <SelectItem value="11">11</SelectItem>
                                                    <SelectItem value="12">12</SelectItem>
                                                </SelectGroup>
                                            </SelectContent>
                                        </Select>
                                    </Field>
                                    <Field>
                                        <FieldLabel htmlFor="checkout-7j9-exp-year-f59">
                                            Year
                                        </FieldLabel>
                                        <Select defaultValue="">
                                            <SelectTrigger id="checkout-7j9-exp-year-f59">
                                                <SelectValue placeholder="YYYY" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectGroup>
                                                    {years.map((year, index) => (
                                                        <SelectItem key={index} value={year.toString()}>
                                                            {year}
                                                        </SelectItem>
                                                    ))}
                                                </SelectGroup>
                                            </SelectContent>
                                        </Select>
                                    </Field>
                                    <Field>
                                        <FieldLabel htmlFor="checkout-7j9-cvv">CVV</FieldLabel>
                                        <Input 
                                            id="checkout-7j9-cvv"
                                            placeholder="123"
                                            required
                                        />
                                    </Field>
                                </div>
                            </FieldGroup>
                        </FieldSet>
                        <Separator />
                        <FieldSet>
                            <FieldLegend>Billing Address</FieldLegend>
                            <FieldDescription>
                                The billing address associated with your payment method
                            </FieldDescription>
                            <FieldGroup>
                                <Field orientation={'horizontal'}>
                                    <Checkbox 
                                        id="checkout-7j9-same-as-shipping-wgm"
                                        defaultChecked
                                    />
                                    <FieldLabel
                                        htmlFor="checkout-7j9-same-as-shipping-wgm"
                                        className="font-normal"
                                    >
                                        Same as shipping address
                                    </FieldLabel>
                                </Field>
                            </FieldGroup>
                        </FieldSet>
                        <FieldSet>
                            <FieldGroup>
                                <Field>
                                    <FieldLabel htmlFor="checkout-7j9-optional-comments">
                                        Comments
                                    </FieldLabel>
                                    <Textarea
                                        id="checkout-7j9-optional-comments"
                                        placeholder="Add any additional comments"
                                        className="resize-none"
                                    />
                                </Field>
                            </FieldGroup>
                        </FieldSet>
                        <Field orientation="horizontal">
                            <Button type="submit">Submit</Button>
                            <Button variant="outline" type="button">
                                Cancel
                            </Button>
                        </Field>
                    </FieldGroup>
                </form>

                {/*
                <Calendar 
                    mode='single'
                    className="rounded-lg border"
                    selected={date}
                    onSelect={setDate}
                    timeZone={timeZone}
                    captionLayout="dropdown"
                />

                <ButtonGroup className="[--radius:9999rem]">
                    <ButtonGroup className="hidden sm:flex">
                        <Button variant={'outline'} size={'icon'} aria-label="Go back">
                            <ArrowLeftIcon />
                        </Button>
                    </ButtonGroup>
                    <ButtonGroup>
                        <Button variant={'outline'}>Archive</Button>
                        <Button variant={'outline'}>Report</Button>
                        <Input placeholder="Search" className="w-40" />
                        <Button variant="outline" aria-label="Search">
                            <SearchIcon />
                        </Button>
                    </ButtonGroup>
                    <ButtonGroup>
                        <Button variant={'outline'}>Snooze</Button>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant={'outline'} size={'icon'} aria-label="More Options">
                                    <MoreHorizontalIcon />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="w-40">
                                <DropdownMenuGroup>
                                    <DropdownMenuItem>Mark as Read</DropdownMenuItem>
                                    <DropdownMenuItem>
                                        <ArchiveIcon />
                                        Archive
                                    </DropdownMenuItem>
                                </DropdownMenuGroup>
                                <DropdownMenuSeparator />
                                <DropdownMenuGroup>
                                    <DropdownMenuItem>
                                        <ClockIcon />
                                        Snooze
                                    </DropdownMenuItem>
                                    <DropdownMenuItem>
                                        <CalendarPlusIcon />
                                        Add to Calendar
                                    </DropdownMenuItem>
                                    <DropdownMenuItem>
                                        <ListFilterIcon />
                                        Add to List
                                    </DropdownMenuItem>
                                    <DropdownMenuSub>
                                        <DropdownMenuSubTrigger>
                                            <TagIcon />
                                            Label As...
                                        </DropdownMenuSubTrigger>
                                        <DropdownMenuSubContent>
                                            <DropdownMenuRadioGroup
                                                value={label}
                                                onValueChange={setLabel}
                                            >
                                                <DropdownMenuRadioItem value="personal">
                                                    Personal
                                                </DropdownMenuRadioItem>
                                                <DropdownMenuRadioItem value="work">
                                                    Work
                                                </DropdownMenuRadioItem>
                                                <DropdownMenuRadioItem value="other">
                                                    Other
                                                </DropdownMenuRadioItem>
                                            </DropdownMenuRadioGroup>
                                        </DropdownMenuSubContent>
                                    </DropdownMenuSub>
                                </DropdownMenuGroup>
                                <DropdownMenuSeparator />
                                <DropdownMenuGroup>
                                    <DropdownMenuItem variant="destructive">
                                        <Trash2Icon />
                                        Trash
                                    </DropdownMenuItem>
                                </DropdownMenuGroup>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </ButtonGroup>
                </ButtonGroup>

                <RadioGroup defaultValue="plus" className="max-w-sm">
                    <FieldLabel htmlFor="plus-plan">
                        <Field orientation="horizontal">
                            <FieldContent>
                                <FieldTitle>Plus</FieldTitle>
                                <FieldDescription>For individuals and small teams.</FieldDescription>
                            </FieldContent>
                            <RadioGroupItem value="plus" id="plus-plan" />
                        </Field>
                    </FieldLabel>
                    <FieldLabel htmlFor="pro-plan">
                        <Field orientation="horizontal">
                            <FieldContent>
                                <FieldTitle>Pro</FieldTitle>
                                <FieldDescription>For growing businesses.</FieldDescription>
                            </FieldContent>
                            <RadioGroupItem value="pro" id="pro-plan" />
                        </Field>
                    </FieldLabel>
                    <FieldLabel htmlFor="enterprise-plan">
                        <Field orientation="horizontal">
                            <FieldContent>
                                <FieldTitle>Enterprise</FieldTitle>
                                <FieldDescription>For large teams and enterprises.</FieldDescription>
                            </FieldContent>
                            <RadioGroupItem value="enterprise" id="enterprise-plan" />
                        </Field>
                    </FieldLabel>
                </RadioGroup>

                <Toggle variant="outline" className="rounded-full">
                    <HeartIcon className="group-data-[state=on]/toggle:fill-foreground" />
                </Toggle> */}
            </main>
            </SidebarInset>
        </SidebarProvider>
    )
}