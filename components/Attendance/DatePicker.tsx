"use client";

import * as React from "react";

import { DayPicker } from "react-day-picker";
import "react-day-picker/style.css";

import Button from "@/components/form/Button";

import { idb } from "@/lib/indexedDB/idb";

export default function Calendar() {
  const [selectedDate, setSelectedDate] = React.useState<Date>();
  const [open, setOpen] = React.useState(false);

  const toggleCalendar = () => setOpen((prev) => !prev);

  const isDatePresentInIDB = async (): Promise<boolean> => {
    const currentDate = await idb.SelectedDateForAttendance.toArray();

    if (currentDate.length == 0) {
      return false;
    }
    return true;
  };

  React.useEffect(() => {
    const fetchDate = async () => {
      const isPresent = await isDatePresentInIDB();
      if (isPresent) {
        // Update the selected date in IDB
        idb.SelectedDateForAttendance.update(1, {
          date: selectedDate!.toDateString(),
        });
        console.log("Date updated in IDB:", selectedDate!.toDateString());
      } else {
        // If no date is present, add the current date to IDB
        if (selectedDate != undefined) {
          await idb.SelectedDateForAttendance.add({
            id: 1,
            date: selectedDate!.toDateString(),
          });
          console.log("Date added to IDB:", selectedDate!.toDateString());
        }
      }
    };

    fetchDate();
  }, [selectedDate]);

  return (
    <div className="relative inline-block">
      <Button
        onClick={toggleCalendar}
        className="bg-primary text-white px-4 py-2 rounded-md hover:bg-primary/90 transition"
        overrideStyles={true}
      >
        {selectedDate ? selectedDate.toLocaleDateString() : "Pick a date"}
      </Button>

      {open && (
        <div className="absolute z-10 mt-2 bg-white p-2 rounded shadow-lg border w-fit">
          <DayPicker
            mode="single"
            selected={selectedDate}
            onSelect={(date) => {
              setSelectedDate(date);
              setOpen(false);
            }}
            className="!w-[100%] text-sm"
            styles={{
              caption: { fontSize: "0.9rem" },
              head_cell: { padding: "0.25rem" },
              cell: { padding: "0.25rem" },
              day: { width: "30px", height: "30px" },
            }}
          />
        </div>
      )}
    </div>
  );
}
