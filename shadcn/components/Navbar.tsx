import { Contact, HomeIcon, LucideBadgeQuestionMark } from "lucide-react";
import { Button } from "./ui/button";

export default function Navbar() {
    return (
        <nav className="text-white p-4 fixed top-0 left-0 w-full backdrop-blur-md">
            <div className="container mx-auto flex items-center justify-between">
                <div className="text-lg font-bold">Navbar</div>
                <div className="space-x-4">
                    <Button variant='ghost'>
                        <HomeIcon />
                        Home
                    </Button>
                    <Button variant='ghost'>
                        <LucideBadgeQuestionMark />
                        About
                    </Button>
                    <Button variant='ghost'>
                        <Contact />
                        Contact
                    </Button>
                </div>
            </div>
        </nav>
    )
}