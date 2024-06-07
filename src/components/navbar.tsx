import logo from "@/assets/logo.svg";

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { ModeToggle } from "./mode-toggle";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <div className="sticky top-0 w-full flex flex-row px-40 border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <Link to="/" className="mr-4 flex flex-row items-center">
              <img src={logo} alt="Logo SVG" className="w-10 h-10" />
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuLink
              href="/listings"
              className={navigationMenuTriggerStyle()}
            >
              Listings
            </NavigationMenuLink>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuLink
              href="/create-listing"
              className={navigationMenuTriggerStyle()}
            >
              Create Listing
            </NavigationMenuLink>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
      <div className="ml-auto">
        <ModeToggle />
      </div>
    </div>
  );
}
