@AGENTS.md

# Projet : yannick-le-bec.fr

Site vitrine pour Yannick Le Bec, couvreur indépendant en Essonne (91).

## Stack

- Next.js **16.2.7** (App Router, TypeScript) — API breaking changes vs 14 : `params` et `cookies()` sont des **Promises**, toujours `await`
- Tailwind CSS **4** — config via `@theme` dans CSS, pas de `tailwind.config.js`
- **Drizzle ORM** (pas Prisma) + Neon PostgreSQL (`drizzle-orm/neon-http`)
- Vercel Blob pour les photos
- Nodemailer (Gmail SMTP) pour le formulaire contact
- Auth admin : middleware + cookie signé `admin-session`

## État du projet — Session 2025-06-08

### ✅ Terminé et buildé sans erreur

**Fondations**
- `app/globals.css` — variables CSS couleurs (`--color-rouge`, etc.), fonts Bebas Neue + Outfit via `@theme`, animations `fadeInUp`
- `app/layout.tsx` — metadata SEO complète, fonts Google chargées via `next/font/google`
- `middleware.ts` — protection `/admin/*` (sauf `/admin/login`)
- `lib/auth.ts` — helpers `getSession()` / `isAuthenticated()` (async cookies Next.js 16)
- `lib/storage.ts` — `uploadImage()` / `deleteImage()` via Vercel Blob
- `lib/db.ts` — client Drizzle avec schema importé
- `hooks/useIntersectionObserver.ts` — scroll reveal (fade-in + slide-up)

**API Routes**
- `app/api/contact/route.ts` — POST → email Gmail SMTP
- `app/api/projets/route.ts` — GET (liste) + POST (création)
- `app/api/projets/[id]/route.ts` — PUT (modif) + DELETE (suppression + blob)
- `app/api/upload/route.ts` — POST multipart → Vercel Blob
- `app/api/auth/route.ts` — POST (login) + DELETE (logout)

**Composants site public**
- `components/Navbar.tsx` — fixe, scroll effect, hamburger mobile
- `components/Hero.tsx` — split blanc/noir, badge, stats, boutons CTA
- `components/APropos.tsx` — 4 cards points forts
- `components/Services.tsx` — grille 6 services
- `components/Projets.tsx` — fetch client-side, overlay rouge hover
- `components/Temoignages.tsx` — fond noir, 3 cards bordure rouge
- `components/Contact.tsx` — formulaire complet avec spinner
- `components/Footer.tsx` — fond noir, bordure rouge

**Interface admin**
- `components/admin/AdminLayout.tsx` — header noir/rouge, lien déconnexion
- `components/admin/ProjetCard.tsx` — carte avec boutons modifier/supprimer
- `components/admin/UploadZone.tsx` — drag & drop, preview image
- `app/admin/login/page.tsx` — formulaire mot de passe
- `app/admin/page.tsx` — tableau de bord, liste projets
- `app/admin/projets/nouveau/page.tsx` — formulaire création
- `app/admin/projets/[id]/page.tsx` — formulaire édition

### ❌ Reste à faire avant mise en production

1. **Vercel Blob** : activer dans le dashboard Vercel (Storage → Blob) → le token `BLOB_READ_WRITE_TOKEN` sera généré automatiquement et ajouté aux env vars
2. **SIRET** : compléter dans `components/Footer.tsx` (ligne ~31)
3. **Photo Yannick** : remplacer le placeholder dans `components/Hero.tsx` par une vraie photo (composant `Image` Next.js, stocker dans `public/` ou Vercel Blob)
4. **Déploiement Vercel** :
   - Push sur GitHub (fait par le client)
   - Importer le repo sur vercel.com
   - Ajouter les env vars : `DATABASE_URL`, `GMAIL_USER`, `GMAIL_APP_PASSWORD`, `ADMIN_PASSWORD`, `BLOB_READ_WRITE_TOKEN`
5. **DNS** : pointer `yannick-le-bec.fr` vers Vercel

### Variables d'environnement requises

```
DATABASE_URL=          # Neon PostgreSQL (pooler endpoint)
GMAIL_USER=            yannick.le.bec.couvreur@gmail.com
GMAIL_APP_PASSWORD=    # Mot de passe d'application Gmail (16 chars)
ADMIN_PASSWORD=        # Mot de passe interface admin
BLOB_READ_WRITE_TOKEN= # Généré par Vercel après activation Blob
```

## Commandes utiles

```bash
npm run dev          # Serveur de développement
npm run build        # Build de production (vérifie les erreurs)
npx drizzle-kit push # Pousser le schéma vers Neon (si modif schema)
```
