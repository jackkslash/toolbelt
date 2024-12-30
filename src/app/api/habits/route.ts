import { NextResponse } from "next/server";
import { db } from "@/db";
import { habitCompletions, habits } from "@/db/schema";
import { eq, sql } from "drizzle-orm";

// GET method: Fetch all habits
export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId");

    if (!userId) {
        return NextResponse.json(
            { error: "User ID is required" },
            { status: 400 }
        );
    }

    try {
        // If no completions, return [] instead of null
        // Create JSON array from grouped rows
        // Shape each completion object
        // Return array of habits with completions

        const data = await db
            .select({
                id: habits.id,
                name: habits.name,
                userId: habits.userId,
                createdAt: habits.createdAt,
                completions: sql<Array<{ id: string, completedDate: Date }>>`
            COALESCE(                              
              json_agg(                            
                json_build_object(                 
                  'id', ${habitCompletions.id},
                  'completedDate', ${habitCompletions.completedDate}
                )
              ) FILTER (WHERE ${habitCompletions.id} IS NOT NULL), 
              '[]'
            )`.as('completions')
            })
            .from(habits)
            .leftJoin(
                habitCompletions,
                eq(habits.id, habitCompletions.habitId)
            )
            .groupBy(habits.id)
        return NextResponse.json(data, { status: 200 });
    } catch (error) {
        console.error("Error fetching habits:", error);
        return NextResponse.json({ error: "Failed to fetch habits" }, { status: 500 });
    }
}

// POST method: Add a new habit
export async function POST(request: Request) {
    try {
        const { name, userId } = await request.json();
        const newHabit = {
            id: Math.random().toString().slice(2, 8),
            userId,
            name,
            createdAt: new Date(),
        };
        await db.insert(habits).values(newHabit);
        return NextResponse.json(newHabit, { status: 201 });
    } catch (error) {
        console.error("Error adding habit:", error);
        return NextResponse.json({ error: "Failed to add habit" }, { status: 500 });
    }
}

// DELETE method: Delete a habit by ID
export async function DELETE(request: Request) {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    if (!id) {
        return NextResponse.json({ error: "Habit ID is required" }, { status: 400 });
    }

    try {
        await db.delete(habits).where(eq(habits.id, id));
        return NextResponse.json({ message: "Habit deleted" }, { status: 200 });
    } catch (error) {
        console.error("Error deleting habit:", error);
        return NextResponse.json({ error: "Failed to delete habit" }, { status: 500 });
    }
}

// PUT method: Update a habit by ID
export async function PUT(request: Request) {
    try {
        const { id, name } = await request.json();
        if (!id || !name) {
            return NextResponse.json({ error: "ID and name are required" }, { status: 400 });
        }

        await db.update(habits).set({ name }).where(eq(habits.id, id));
        return NextResponse.json({ message: "Habit updated" }, { status: 200 });
    } catch (error) {
        console.error("Error updating habit:", error);
        return NextResponse.json({ error: "Failed to update habit" }, { status: 500 });
    }
}
