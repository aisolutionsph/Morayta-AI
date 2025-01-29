"use client";

import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import Facebook from "./icons/facebook";
import Instagram from "./icons/instagram";

interface ContactSellerButtonProps {
  facebookUrl: string | null;
  instagramUrl: string | null;
}

export function ContactSellerButton({
  facebookUrl,
  instagramUrl,
}: ContactSellerButtonProps) {
  const handleSocialClick = (url: string | null) => {
    if (url) {
      window.open(url, "_blank", "noopener,noreferrer");
    } else {
      alert("Seller has not provided this social media link");
    }
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <button className="px-4 py-2 rounded-md border border-black bg-white text-black text-sm hover:shadow-[4px_4px_0px_0px_rgba(0,0,0)] transition duration-200">
          Contact Seller
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-4">
        <div className="flex gap-4">
          <Button
            variant="ghost"
            size="icon"
            className="h-9 w-9"
            onClick={() => handleSocialClick(facebookUrl)}
          >
            <Facebook className="h-5 w-5" />
            <span className="sr-only">Facebook Profile</span>
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-9 w-9"
            onClick={() => handleSocialClick(instagramUrl)}
          >
            <Instagram className="h-5 w-5" />
            <span className="sr-only">Instagram Profile</span>
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}
