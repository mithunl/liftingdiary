"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { Workout } from "@/data/workouts";

interface DashboardClientProps {
  date: string; // ISO date string (YYYY-MM-DD)
  workouts: Array<Omit<Workout, "startedAt" | "completedAt"> & {
    startedAt: string;
    completedAt: string | null;
  }>;
}

export default function DashboardClient({ date, workouts }: DashboardClientProps) {
  const router = useRouter();
  const [selectedDate, setSelectedDate] = useState<Date>(new Date(date + "T00:00:00"));

  function handleDateSelect(d: Date | undefined) {
    if (!d) return;
    setSelectedDate(d);
    const iso = format(d, "yyyy-MM-dd");
    router.push(`/dashboard?date=${iso}`);
  }

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Workout Log</h1>
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" className="flex items-center gap-2">
              <CalendarIcon className="w-4 h-4" />
              {format(selectedDate, "do MMM yyyy")}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="end">
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={handleDateSelect}
              initialFocus
            />
          </PopoverContent>
        </Popover>
      </div>

      <div className="space-y-3">
        <h2 className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
          Workouts for {format(selectedDate, "do MMM yyyy")}
        </h2>

        {workouts.length === 0 ? (
          <Card>
            <CardContent className="py-10 text-center text-muted-foreground">
              No workouts logged for this date.
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-3">
            {workouts.map((workout) => (
              <Card key={workout.id}>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">{workout.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Started at {format(new Date(workout.startedAt), "h:mm a")}
                    {workout.completedAt && (
                      <> &mdash; completed at {format(new Date(workout.completedAt), "h:mm a")}</>
                    )}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
