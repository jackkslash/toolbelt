import { db } from "@/db";
import { habitCompletions } from "@/db/schema";
import { and, eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";


export async function POST(request: NextRequest) {
    const { habitId, date } = await request.json();
    if (!habitId || !date) {
        return NextResponse.json(
            { error: 'Missing required fields' },
            { status: 400 }
        );
    }

    // Check if completion exists for this habit and date
    const existing = await db.query.habitCompletions.findFirst({
        where: and(eq(habitCompletions.habitId, habitId),
            eq(habitCompletions.completedDate, date))
    });

    if (existing) {
        // If exists, delete it
        await db.delete(habitCompletions).where(eq(habitCompletions.id, existing.id));
        return NextResponse.json({ message: 'Habit completion deleted' }, { status: 200 });
    } else {
        // If doesn't exist, create it
        const completion = await db.insert(habitCompletions).values({
            id: Math.random().toString().slice(2, 8),
            habitId,
            completedDate: date.slice(0, 10),
        });
        return NextResponse.json({ message: 'Habit completion added' }, { status: 201 });
    }
}

