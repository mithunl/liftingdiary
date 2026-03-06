"use client";

import { useState } from "react";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const MOCK_WORKOUTS = [
  {
    id: 1,
    name: "Back Squat",
    sets: 4,
    reps: 5,
    weight: 225,
  },
  {
    id: 2,
    name: "Romanian Deadlift",
    sets: 3,
    reps: 8,
    weight: 185,
  },
  {
    id: 3,
    name: "Leg Press",
    sets: 3,
    reps: 12,
    weight: 360,
  },
];

export default function DashboardPage() {
  const [date, setDate] = useState<Date>(new Date());

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Workout Log</h1>
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" className="flex items-center gap-2">
              <CalendarIcon className="w-4 h-4" />
              {format(date, "do MMM yyyy")}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="end">
            <Calendar
              mode="single"
              selected={date}
              onSelect={(d) => d && setDate(d)}
              initialFocus
            />
          </PopoverContent>
        </Popover>
      </div>

      <div className="space-y-3">
        <h2 className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
          Workouts for {format(date, "do MMM yyyy")}
        </h2>

        {MOCK_WORKOUTS.length === 0 ? (
          <Card>
            <CardContent className="py-10 text-center text-muted-foreground">
              No workouts logged for this date.
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-3">
            {MOCK_WORKOUTS.map((workout) => (
              <Card key={workout.id}>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">{workout.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    {workout.sets} sets &times; {workout.reps} reps &mdash; {workout.weight} lbs
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
