"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";

interface SlotBookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  subServiceId: string | null;
}

const timeSlots = ["10:00 AM", "12:00 PM", "2:00 PM", "4:00 PM"];

export function SlotBookingModal({
  isOpen,
  onClose,
  subServiceId,
}: SlotBookingModalProps) {
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const router = useRouter();

  const handleConfirmBooking = () => {
    if (date && selectedSlot) {
      onClose();
      const params = new URLSearchParams({
        date: format(date, "PPP"),
        slot: selectedSlot,
        serviceId: subServiceId || "",
      });
      router.push(`/checkout?${params.toString()}`);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-sm">
        <DialogHeader>
          <DialogTitle className="text-xl font-display text-foreground">
            Select a Slot
          </DialogTitle>
        </DialogHeader>
        <div className="mt-4 space-y-4">
          {/* Date Picker */}
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "w-full justify-start text-left font-normal",
                  !date && "text-muted-foreground",
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {date ? format(date, "MMMM yyyy") : "Select month"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0 bg-popover" align="start">
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                initialFocus
                className="p-3 pointer-events-auto"
                disabled={(date) => date < new Date()}
              />
            </PopoverContent>
          </Popover>

          {/* Time Slots */}
          <div className="grid grid-cols-2 gap-3">
            {timeSlots.map((slot) => (
              <Button
                key={slot}
                variant={selectedSlot === slot ? "default" : "outline"}
                onClick={() => setSelectedSlot(slot)}
                className="h-10"
              >
                {slot}
              </Button>
            ))}
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-4">
            <Button variant="outline" onClick={onClose} className="flex-1">
              Cancel
            </Button>
            <Button
              onClick={handleConfirmBooking}
              className="flex-1"
              disabled={!date || !selectedSlot}
            >
              Confirm Booking
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
