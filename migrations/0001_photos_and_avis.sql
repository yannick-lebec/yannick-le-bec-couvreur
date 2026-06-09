-- Migration : photos multiples + système d'avis
-- À exécuter dans Neon SQL Editor AVANT de déployer le nouveau code

-- 1. Créer la table projet_photos
CREATE TABLE IF NOT EXISTS projet_photos (
  id SERIAL PRIMARY KEY,
  projet_id INTEGER NOT NULL REFERENCES projets(id) ON DELETE CASCADE,
  url TEXT NOT NULL,
  ordre INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW()
);

-- 2. Migrer les photos existantes depuis projets.photo_url
INSERT INTO projet_photos (projet_id, url, ordre)
SELECT id, photo_url, 0
FROM projets
WHERE photo_url IS NOT NULL AND photo_url != '';

-- 3. Supprimer la colonne photo_url de projets
ALTER TABLE projets DROP COLUMN IF EXISTS photo_url;

-- 4. Créer la table avis
CREATE TABLE IF NOT EXISTS avis (
  id SERIAL PRIMARY KEY,
  nom TEXT NOT NULL,
  entreprise TEXT,
  poste TEXT,
  note INTEGER NOT NULL CHECK (note >= 1 AND note <= 5),
  commentaire TEXT NOT NULL,
  valide BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT NOW()
);
