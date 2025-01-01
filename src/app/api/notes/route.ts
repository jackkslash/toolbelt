import { db } from "@/db";
import { notes } from "@/db/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const userId = searchParams.get("userId");
        if (!userId) {
            return NextResponse.json({ error: "userId is required" }, { status: 400 });
        }
        const data = await db.select().from(notes).where(eq(notes.userId, userId));
        return NextResponse.json(data, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const { userId, note } = await request.json();
        const newNote = {
            id: Math.random().toString().slice(2, 8),
            userId,
            note,
            createdAt: new Date(),
            updatedAt: new Date(),
        };
        await db.insert(notes).values(newNote);
        return NextResponse.json(newNote, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
    }
}

export async function DELETE(request: Request) {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    if (!id) {
        return NextResponse.json({ error: "Note ID is required" }, { status: 400 });
    }

    try {
        await db.delete(notes).where(eq(notes.id, id));
        return NextResponse.json({ message: "Note deleted" }, { status: 200 });
    } catch (error) {
        console.error("Error deleting note:", error);
        return NextResponse.json({ error: "Failed to delete note" }, { status: 500 });
    }
}

export async function PUT(request: Request) {
    try {
        const { id, note } = await request.json();
        if (!id || !note) {
            return NextResponse.json({ error: "ID and note are required" }, { status: 400 });
        }

        await db.update(notes).set({ note }).where(eq(notes.id, id));
        return NextResponse.json({ message: "Note updated" }, { status: 200 });
    } catch (error) {
        console.error("Error updating note:", error);
        return NextResponse.json({ error: "Failed to update note" }, { status: 500 });
    }
}