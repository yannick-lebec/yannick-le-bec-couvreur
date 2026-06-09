import { pgTable, text, serial, timestamp, integer, boolean } from 'drizzle-orm/pg-core'

export const projets = pgTable('projets', {
  id: serial('id').primaryKey(),
  titre: text('titre').notNull(),
  lieu: text('lieu').notNull(),
  description: text('description').notNull(),
  categorie: text('categorie').notNull(),
  date: text('date').notNull(),
  createdAt: timestamp('created_at').defaultNow(),
})

export const projetPhotos = pgTable('projet_photos', {
  id: serial('id').primaryKey(),
  projetId: integer('projet_id')
    .notNull()
    .references(() => projets.id, { onDelete: 'cascade' }),
  url: text('url').notNull(),
  ordre: integer('ordre').default(0),
  createdAt: timestamp('created_at').defaultNow(),
})

export const avis = pgTable('avis', {
  id: serial('id').primaryKey(),
  nom: text('nom').notNull(),
  entreprise: text('entreprise'),
  poste: text('poste'),
  note: integer('note').notNull(),
  commentaire: text('commentaire').notNull(),
  valide: boolean('valide').default(false),
  createdAt: timestamp('created_at').defaultNow(),
})
