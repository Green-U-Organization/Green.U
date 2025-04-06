# Green.U

## Outil de gestion potagère

## Objectifs
    
  - ***Temps 1 :***

    - Création d'une **App Web Mobile First** de gestion de potager à destination des jardiniers individuels, des potagers collectifs et des micro ferme maraichère

    - Permettre un suivi de chaque culture et de chaque parcelle au fil de la **saison** et au fil des **années**
            
    - Design "Gamification" **mignon/kawaï** coloré avec de belles illustrations.

    - Interface **simple en surface** avec possiblité de creuser si nécessaire

  - ***Temps 2 :***

    - Création d'une **App mobile** (React Native)

    - Ouverture vers une App accès **réseau social** (possibilité de suivre le jardin d'autres personnes, de rejoindre les jardins d'autres personnes, de commenter et de partager ses expériences et ses résultats avec son réseau)

    - Permettre un **partage d'expérience** accès sur les réalité géographique et climatique de chaque utilisateur

## Stack technologique

  - ***Front End :***

    - React
    - Tailwind CSS 
    - React Native (temps 2)

  - ***Back End :***

    - NextJs (ou Python ou autre)
    - MariaDb

## Features 

  - ***User :***

    - Création/Login User **sécurisé** (JWT)
    - Edit de profil (photo de profil, photo de son jardin, bio, etc...)
    
   - ***Jardin :***

      - Création d'un jardin en interface **graphique**
      ![](/CreationJardin.png =300x200)
      - Edit de parcelle en interface **graphique** pour :
            
        1. Changer le statuts de la parcelle
        2. Ajouer une tache effectuée sur la parcelle
        3. Ajouter une tache à effectuer sur la parcelle
        4. Ajouter/Enlever un légume
        5. Changer sa taille
      - Vue du jardin en mode **liste**
        ![](/JardinListe.png)
        
  - ***Légumes :***



-------------------
Fonctionnalités
---------------
- Ajout de todo avec remplissage automatique des champs (garden_id, parcel_id, et line_id).

-----------------------------------------------------
Listes disponibles :
------------------
FAMILY, LINE_STATUS

## Génération de la documentation
- Assurez-vous que Doxygen est installé sur votre système.
- Si ce n'est pas le cas, suivez ce lien [Doxygen](https://www.doxygen.nl/manual/docblocks.html)

### Étapes pour générer la documentation

1. Clonez le projet ou ouvrez votre projet existant.
2. Ouvrez un terminal et placez-vous dans le répertoire racine du projet.
3. Exécutez la commande suivante pour générer le fichier de configuration Doxygen :
   ```bash
   doxygen -g
   ```
4. Modifiez le fichier Doxyfile si nécessaire pour définir les fichiers et répertoires à inclure dans la documentation.

5. Ajoutez des commentaires Doxygen dans votre code.
   ```cs
   /// <summary> Ceci est un commentaire xml. </summary>
   ```

7. Exécutez la commande suivante pour générer la documentation :
    ```bash
    doxygen Doxyfile
    ```



        
