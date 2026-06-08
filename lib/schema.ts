import { pgTable, text, serial, timestamp } from 'drizzle-orm/pg-core'

export const projets = pgTable('projets', {
  id: serial('id').primaryKey(),
  titre: text('titre').notNull(),
  lieu: text('lieu').notNull(),
  description: text('description').notNull(),
  categorie: text('categorie').notNull(),
  date: text('date').notNull(),
  photoUrl: text('photo_url').notNull(),
  createdAt: timestamp('created_at').defaultNow(),
})