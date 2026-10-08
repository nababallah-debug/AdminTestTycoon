# AdminTestTycoon — Space Mining Tycoon V2 prototype

Cette version est un laboratoire de test. Elle ne doit pas remplacer la version production tant que la migration et le cloud n'ont pas été validés.

## Contenu
- nouvelle UI mobile-first à thème spatial
- centre de contrôle
- carte des 32 secteurs
- bâtiments
- inflation des prix selon le développement du secteur
- arbre technologique à branches
- missions quotidiennes / campagne / hebdomadaires
- prestige
- migration de la sauvegarde locale V1 (lecture des anciennes clés)
- base de compte Supabase email + mot de passe + pseudo

## Important
Le système de compte actuel demande un e-mail pour l'inscription/récupération. La demande "pseudo + mot de passe uniquement" nécessite une couche serveur dédiée qui résout le pseudo vers l'identité Supabase sans exposer d'informations de compte. Cette couche doit être finalisée avant production.

## Déploiement de test
Activer GitHub Pages sur la branche principale du dépôt de test.

## Prochaine étape
Valider :
1. chargement V1 -> V2
2. économie
3. prix dynamiques
4. missions quotidiennes
5. arbre de compétences
6. Supabase Auth
7. sauvegarde cloud
8. synchronisation multi-appareils
9. puis seulement la migration vers le dépôt production.
