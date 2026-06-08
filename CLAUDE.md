@AGENTS.md

# Projet : yannick-le-bec.fr

Site vitrine couvreur indépendant Essonne (91). En production sur Vercel.

## Stack

- Next.js **16.2.7** App Router — `params` et `cookies()` sont des **Promises**, toujours `await`
- Tailwind CSS **4** — config via `@theme` dans CSS, pas de `tailwind.config.js`
- **Drizzle ORM** + Neon PostgreSQL (`drizzle-orm/neon-http`), ID `serial` (entier)
- Vercel Blob (photos), Nodemailer Gmail SMTP (contact), cookie `admin-session` (auth)

## URLs

- Production : https://yannick-le-bec-couvreur.vercel.app
- GitHub : https://github.com/yannick-lebec/yannick-le-bec-couvreur
- Push sur `main` → redéploiement Vercel automatique

## Fichiers clés

| Fichier | Rôle |
|---|---|
| `lib/schema.ts` | Schéma Drizzle (table `projets`, id serial) |
| `lib/db.ts` | Client Drizzle Neon |
| `lib/storage.ts` | Upload/delete Vercel Blob |
| `lib/auth.ts` | Helpers session (async cookies) |
| `middleware.ts` | Protection `/admin/*` |
| `next.config.ts` | `remotePatterns` Vercel Blob autorisé |
| `components/Lightbox.tsx` | Modal plein écran pour les photos |

## Services proposés (4 seulement)

Pose toiture · Rénovation · Charpente · Zinguerie  
*(Étanchéité et Urgences supprimés à la demande)*

## Reste à faire

- [ ] Photo de Yannick dans `components/Hero.tsx` (remplacer placeholder)
- [ ] SIRET dans `components/Footer.tsx`
- [ ] Connecter `yannick-le-bec.fr` (Vercel → Settings → Domains)
- [ ] Tester formulaire de contact en prod

## Variables d'environnement (Vercel dashboard)

```
DATABASE_URL          # Neon PostgreSQL pooler
GMAIL_USER            yannick.le.bec.couvreur@gmail.com
GMAIL_APP_PASSWORD    # 16 chars, mot de passe d'application Google
ADMIN_PASSWORD        # Mot de passe /admin
BLOB_READ_WRITE_TOKEN # Généré par Vercel Blob
```
