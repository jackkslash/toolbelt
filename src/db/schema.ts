import { pgTable, text, timestamp } from 'drizzle-orm/pg-core';

// Table for storing habits
export const habits = pgTable('habits', {
    id: text('id').primaryKey(),
    userId: text('user_id').notNull(),
    name: text('name').notNull(),
    createdAt: timestamp('created_at').notNull().defaultNow(),
});

export const habitCompletions = pgTable('habit_completions', {
    id: text('id').primaryKey(),
    habitId: text('habit_id').notNull().references(() => habits.id),
    completedDate: timestamp('completed_date', { mode: "string" }).notNull(),
});