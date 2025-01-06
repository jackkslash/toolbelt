import { JSONContent } from '@tiptap/react';
import { jsonb, pgTable, text, timestamp } from 'drizzle-orm/pg-core';


// Table for storing habits
export const habits = pgTable('habits', {
    id: text('id').primaryKey(),
    userId: text('user_id').notNull(),
    name: text('name').notNull(),
    createdAt: timestamp('created_at').notNull().defaultNow(),
});

export const habitCompletions = pgTable('habit_completions', {
    id: text('id').primaryKey(),
    habitId: text('habit_id').notNull().references(() => habits.id, { onDelete: 'cascade' }),
    completedDate: timestamp('completed_date', { mode: "string" }).notNull(),
});

export const notes = pgTable('notes', {
    id: text('id').primaryKey(),
    userId: text('user_id').notNull(),
    note: jsonb('note').notNull(),
    createdAt: timestamp('created_at').notNull().defaultNow(),
    updatedAt: timestamp('updated_at').notNull().defaultNow(),
});