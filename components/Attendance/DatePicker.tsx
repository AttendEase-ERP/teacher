"use client";

import * as React from "react";

import { DayPicker } from "react-day-picker";
import "react-day-picker/style.css";

import Button from "@/components/form/Button";

import { idb } from "@/lib/indexedDB/idb";
import { fetchDateFromIDB } from "@/utils/utils";

export default function Calendar() {
  const [selectedDate, setSelectedDate] = React.useState<Date | undefined>();
  const [open, setOpen] = React.useState(false);

  const toggleCalendar = () => setOpen((prev) => !prev);

  // Fetch selected date from IDB on mount
  React.useEffect(() => {
    if (fetchDateFromIDB != undefined) {
      fetchDateFromIDB().then((date) => {
        if (date) {
          setSelectedDate(date);
          console.log("Fetched date from IDB:", date.toDateString());
        }
      });
    }

    fetchDateFromIDB();
  }, []);

  const handleDateSelect = async (date: Date | undefined) => {
    if (!date) return;

    await idb.SelectedDateForAttendance.put({
      id: 1,
      date: date.toDateString(),
    });

    setSelectedDate(date);
    setOpen(false);
    console.log("Date updated in IDB:", date.toDateString());
  };

  return (
    <div className="relative inline-block">
      <Button
        onClick={toggleCalendar}
        className="bg-primary text-white px-4 py-2 rounded-md hover:bg-primary/90 transition cursor-pointer outline-0"
        overrideStyles={true}
      >
        {selectedDate ? selectedDate.toLocaleDateString() : "Pick a date"}
      </Button>

      {open && (
        <div className="absolute z-10 mt-2 bg-white p-2 rounded-lg shadow-xl border w-fit">
          <DayPicker
            mode="single"
            selected={selectedDate}
            onSelect={handleDateSelect}
            className="text-sm"
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
