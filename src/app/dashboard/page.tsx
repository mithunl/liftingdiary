import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { format } from "date-fns";
import { getWorkoutsForDate } from "@/data/workouts";
import DashboardClient from "./DashboardClient";

export default async function DashboardPage({
  searchParams,
}: {
  searchParams: Promise<{ date?: string }>;
}) {
  const { userId } = await auth();
  if (!userId) redirect("/sign-in");

  const { date: dateParam } = await searchParams;

  const dateStr = dateParam && /^\d{4}-\d{2}-\d{2}$/.test(dateParam)
    ? dateParam
    : format(new Date(), "yyyy-MM-dd");

  const date = new Date(dateStr + "T00:00:00");
  const workouts = await getWorkoutsForDate(userId, date);

  const serializedWorkouts = workouts.map((w) => ({
    ...w,
    startedAt: w.startedAt.toISOString(),
    completedAt: w.completedAt ? w.completedAt.toISOString() : null,
  }));

  return <DashboardClient date={dateStr} workouts={serializedWorkouts} />;
}
