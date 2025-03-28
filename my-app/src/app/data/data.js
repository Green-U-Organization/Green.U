let data = {

    todos : [
        {
            id: "1",
            publishBy: "Jean Dupont",
            content: "Arroser les tomates",
            status: 5,
            update_at: "2025/05/01",
            garden_id: "jardin-1",
            parcel_id: "parcelle-A",
            line_id: "ligne-1"
          },
          {
            id: "2",
            publishBy: "Marie Martin",
            content: "Désherber les carottes",
            status: 0,
            update_at: "2025/05/02",
            garden_id: "jardin-1",
            parcel_id: "parcelle-B",
            line_id: "ligne-2"
          },
          {
            id: "3",
            publishBy: "Lucie Bernard",
            content: "Planter des salades",
            status: 1,
            update_at: "2025/05/03",
            garden_id: "jardin-2",
            parcel_id: "parcelle-C",
            line_id: "ligne-1"
          },
          {
            id: "4",
            publishBy: "Pierre Leroy",
            content: "Tailler les rosiers",
            status: 2,
            update_at: "2025/05/04",
            garden_id: "jardin-2",
            parcel_id: "parcelle-D",
            line_id: "ligne-3"
          },
          {
            id: "5",
            publishBy: "Sophie Petit",
            content: "Récolter les courgettes",
            status: 4,
            update_at: "2025/05/05",
            garden_id: "jardin-3",
            parcel_id: "parcelle-E",
            line_id: "ligne-2"
          },
          {
            id: "6",
            publishBy: "Thomas Moreau",
            content: "Pailler le potager",
            status: 3,
            update_at: "2025/05/06",
            garden_id: "jardin-3",
            parcel_id: "parcelle-F",
            line_id: "ligne-1"
          },
          {
            id: "7",
            publishBy: "Emma Laurent",
            content: "Traiter contre les pucerons",
            status: 3,
            update_at: "2025/05/07",
            garden_id: "jardin-4",
            parcel_id: "parcelle-G",
            line_id: "ligne-4"
          },
          {
            id: "8",
            publishBy: "Nicolas Simon",
            content: "Semer des radis",
            status: 5,
            update_at: "2025/05/08",
            garden_id: "jardin-4",
            parcel_id: "parcelle-H",
            line_id: "ligne-3"
          },
          {
            id: "9",
            publishBy: "Laura Michel",
            content: "Vérifier l'irrigation",
            status: 1,
            update_at: "2025/05/09",
            garden_id: "jardin-5",
            parcel_id: "parcelle-I",
            line_id: "ligne-2"
          },
          {
            id: "10",
            publishBy: "Alexandre Roux",
            content: "Réparer la clôture",
            status: 2,
            update_at: "2025/05/10",
            garden_id: "jardin-5",
            parcel_id: "parcelle-J",
            line_id: "ligne-1"
          },
          {
            id: "11",
            publishBy: "Camille Fournier",
            content: "Planter des fraisiers",
            status: 3,
            update_at: "2025/05/11",
            garden_id: "jardin-6",
            parcel_id: "parcelle-K",
            line_id: "ligne-5"
          },
          {
            id: "12",
            publishBy: "Hugo Lefebvre",
            content: "Élaguer les arbres fruitiers",
            status: 4,
            update_at: "2025/05/12",
            garden_id: "jardin-6",
            parcel_id: "parcelle-L",
            line_id: "ligne-4"
          },
          {
            id: "13",
            publishBy: "Chloé Girard",
            content: "Nettoyer la serre",
            status: 4,
            update_at: "2025/05/13",
            garden_id: "jardin-7",
            parcel_id: "parcelle-M",
            line_id: "ligne-3"
          },
          {
            id: "14",
            publishBy: "Maxime David",
            content: "Composter les déchets verts",
            status: 5,
            update_at: "2025/05/14",
            garden_id: "jardin-7",
            parcel_id: "parcelle-N",
            line_id: "ligne-2"
          },
          {
            id: "15",
            publishBy: "Sarah Lambert",
            content: "Préparer les semis",
            status: 2,
            update_at: "2025/05/15",
            garden_id: "jardin-8",
            parcel_id: "parcelle-O",
            line_id: "ligne-1"
          },
          {
            id: "16",
            publishBy: "Julien Martinez",
            content: "Traiter les maladies fongiques",
            status: 5,
            update_at: "2025/05/16",
            garden_id: "jardin-8",
            parcel_id: "parcelle-P",
            line_id: "ligne-6"
          },
          {
            id: "17",
            publishBy: "Manon Blanc",
            content: "Arroser les plantes en pot",
            status: 2,
            update_at: "2025/05/17",
            garden_id: "jardin-9",
            parcel_id: "parcelle-Q",
            line_id: "ligne-5"
          },
          {
            id: "18",
            publishBy: "Antoine Chevalier",
            content: "Marcher les allées",
            status: 1,
            update_at: "2025/05/18",
            garden_id: "jardin-9",
            parcel_id: "parcelle-R",
            line_id: "ligne-4"
          },
          {
            id: "19",
            publishBy: "Elodie Francois",
            content: "Installer un nouveau bac à compost",
            status: 3,
            update_at: "2025/05/19",
            garden_id: "jardin-10",
            parcel_id: "parcelle-S",
            line_id: "ligne-3"
          },
          {
            id: "20",
            publishBy: "Romain Leclerc",
            content: "Planter des herbes aromatiques",
            status: 3,
            update_at: "2025/05/20",
            garden_id: "jardin-10",
            parcel_id: "parcelle-T",
            line_id: "ligne-2"
          }
        
    ],

    lines : [
      {
        "id": 1,
        "length": 3.2,
        "crop": {
          "vegetable": "carotte",
          "variety": "nantaise"
        },
        "status": "récolté",
        "updateLogs": [
          {
            "action": "préparation du sol",
            "date": "2024-03-01",
            "distance": null,
            "remarques": "ajout de compost"
          },
          {
            "action": "semis direct",
            "date": "2024-03-15",
            "distance": 5,
            "remarques": "semis en ligne"
          },
          {
            "action": "récolte",
            "date": "2024-07-10",
            "distance": null,
            "remarques": "rendement moyen"
          }
        ],
        "parcelId": 101
      },
      {
        "id": 2,
        "length": 2.8,
        "crop": {
          "vegetable": "tomate",
          "variety": "coeur de boeuf"
        },
        "status": "en cours",
        "updateLogs": [
          {
            "action": "plantation",
            "date": "2024-05-20",
            "distance": 60,
            "remarques": "plants bio"
          },
          {
            "action": "taille",
            "date": "2024-06-15",
            "distance": null,
            "remarques": "ébourgeonnage"
          }
        ],
        "parcelId": 101
      },
      {
        "id": 3,
        "length": 2.0,
        "crop": {
          "vegetable": "radis",
          "variety": "18 jours"
        },
        "status": "terminé",
        "updateLogs": [
          {
            "action": "semis en ligne",
            "date": "2024-04-05",
            "distance": 15,
            "remarques": "succession printanière"
          },
          {
            "action": "récolte",
            "date": "2024-05-20",
            "distance": null,
            "remarques": "récolte échelonnée"
          }
        ],
        "parcelId": 102
      },
      {
        "id": 4,
        "length": 1.8,
        "crop": {
          "vegetable": "épinard",
          "variety": "géant d'hiver"
        },
        "status": "planifié",
        "updateLogs": [
          {
            "action": "préparation ligne",
            "date": "2024-08-20",
            "distance": null,
            "remarques": "emplacement ombragé réservé"
          }
        ],
        "parcelId": 102
      },
      {
        "id": 5,
        "length": 3.0,
        "crop": {
          "vegetable": "haricot vert",
          "variety": "mangetout nain"
        },
        "status": "en cours",
        "updateLogs": [
          {
            "action": "semis en poquet",
            "date": "2024-05-05",
            "distance": 40,
            "remarques": "protection contre les limaces"
          },
          {
            "action": "levée",
            "date": "2024-05-18",
            "distance": null,
            "remarques": "taux de germination 85%"
          }
        ],
        "parcelId": 103
      },
      {
        "id": 6,
        "length": 2.5,
        "crop": {
          "vegetable": "courgette",
          "variety": "ronde de Nice"
        },
        "status": "en cours",
        "updateLogs": [
          {
            "action": "plantation",
            "date": "2024-05-15",
            "distance": 100,
            "remarques": "paillage immédiat"
          },
          {
            "action": "première récolte",
            "date": "2024-07-01",
            "distance": null,
            "remarques": "3 fruits"
          }
        ],
        "parcelId": 103
      },
      {
        "id": 7,
        "length": 1.5,
        "crop": {
          "vegetable": "fraise",
          "variety": "gariguette"
        },
        "status": "en cours",
        "updateLogs": [
          {
            "action": "plantation",
            "date": "2024-04-10",
            "distance": 30,
            "remarques": "plants frigo"
          },
          {
            "action": "premières fleurs",
            "date": "2024-05-25",
            "distance": null,
            "remarques": ""
          }
        ],
        "parcelId": 104
      },
      {
        "id": 8,
        "length": 2.0,
        "crop": {
          "vegetable": "poivron",
          "variety": "doux d'Espagne"
        },
        "status": "en difficulté",
        "updateLogs": [
          {
            "action": "repiquage",
            "date": "2024-04-25",
            "distance": 50,
            "remarques": "protégé sous tunnel"
          },
          {
            "action": "observation",
            "date": "2024-05-30",
            "distance": null,
            "remarques": "croissance lente"
          }
        ],
        "parcelId": 104
      },
      {
        "id": 9,
        "length": 3.5,
        "crop": {
          "vegetable": "pomme de terre",
          "variety": "charlotte"
        },
        "status": "récolté",
        "updateLogs": [
          {
            "action": "plantation",
            "date": "2024-03-15",
            "distance": 40,
            "remarques": "germes orientés vers le haut"
          },
          {
            "action": "buttage",
            "date": "2024-04-20",
            "distance": null,
            "remarques": ""
          },
          {
            "action": "récolte",
            "date": "2024-07-10",
            "distance": null,
            "remarques": "rendement correct"
          }
        ],
        "parcelId": 105
      },
      {
        "id": 10,
        "length": 1.2,
        "crop": {
          "vegetable": "basilic",
          "variety": "grand vert"
        },
        "status": "en cours",
        "updateLogs": [
          {
            "action": "semis",
            "date": "2024-05-01",
            "distance": 20,
            "remarques": "protection contre le vent"
          },
          {
            "action": "première récolte",
            "date": "2024-06-15",
            "distance": null,
            "remarques": "feuilles moyennes"
          }
        ],
        "parcelId": 105
      },
      {
        "id": 11,
        "length": 3.0,
        "crop": {
          "vegetable": "poireau",
          "variety": "bleu de Solaise"
        },
        "status": "en cours",
        "updateLogs": [
          {
            "action": "plantation",
            "date": "2024-06-10",
            "distance": 15,
            "remarques": "repiquage de jeunes plants"
          }
        ],
        "parcelId": 101
      },
      {
        "id": 12,
        "length": 2.5,
        "crop": {
          "vegetable": "salade",
          "variety": "feuille de chêne"
        },
        "status": "terminé",
        "updateLogs": [
          {
            "action": "semis",
            "date": "2024-04-05",
            "distance": 25,
            "remarques": "succession printanière"
          },
          {
            "action": "récolte",
            "date": "2024-05-30",
            "distance": null,
            "remarques": "bonne production"
          }
        ],
        "parcelId": 101
      },
      {
        "id": 13,
        "length": 4.0,
        "crop": {
          "vegetable": "concombre",
          "variety": "marketmore"
        },
        "status": "en cours",
        "updateLogs": [
          {
            "action": "semis",
            "date": "2024-05-10",
            "distance": 50,
            "remarques": "sous abri"
          },
          {
            "action": "plantation",
            "date": "2024-05-25",
            "distance": null,
            "remarques": "mise en place des tuteurs"
          }
        ],
        "parcelId": 102
      },
      {
        "id": 14,
        "length": 3.5,
        "crop": {
          "vegetable": "betterave",
          "variety": "rouge noire plate"
        },
        "status": "en cours",
        "updateLogs": [
          {
            "action": "semis direct",
            "date": "2024-05-15",
            "distance": 30,
            "remarques": "éclaircissage nécessaire"
          }
        ],
        "parcelId": 102
      },
      {
        "id": 15,
        "length": 2.0,
        "crop": {
          "vegetable": "persil",
          "variety": "commun"
        },
        "status": "en cours",
        "updateLogs": [
          {
            "action": "semis",
            "date": "2024-04-20",
            "distance": 20,
            "remarques": "levée lente"
          }
        ],
        "parcelId": 103
      },
      {
        "id": 16,
        "length": 1.8,
        "crop": {
          "vegetable": "menthe",
          "variety": "poivrée"
        },
        "status": "en cours",
        "updateLogs": [
          {
            "action": "plantation",
            "date": "2024-05-01",
            "distance": 40,
            "remarques": "conteneur enterré pour limiter expansion"
          }
        ],
        "parcelId": 103
      },
      {
        "id": 17,
        "length": 2.5,
        "crop": {
          "vegetable": "aubergine",
          "variety": "black beauty"
        },
        "status": "en difficulté",
        "updateLogs": [
          {
            "action": "plantation",
            "date": "2024-05-10",
            "distance": 60,
            "remarques": "plants sensibles au froid"
          }
        ],
        "parcelId": 104
      },
      {
        "id": 18,
        "length": 1.5,
        "crop": {
          "vegetable": "thym",
          "variety": "commun"
        },
        "status": "en cours",
        "updateLogs": [
          {
            "action": "plantation",
            "date": "2024-04-15",
            "distance": 30,
            "remarques": "plein soleil"
          }
        ],
        "parcelId": 104
      },
      {
        "id": 19,
        "length": 2.0,
        "crop": {
          "vegetable": "ail",
          "variety": "rose de Lautrec"
        },
        "status": "récolté",
        "updateLogs": [
          {
            "action": "plantation",
            "date": "2023-11-15",
            "distance": 15,
            "remarques": "caïeux espacés"
          },
          {
            "action": "récolte",
            "date": "2024-06-20",
            "distance": null,
            "remarques": "bon calibre"
          }
        ],
        "parcelId": 105
      },
      {
        "id": 20,
        "length": 1.0,
        "crop": {
          "vegetable": "ciboulette",
          "variety": "commune"
        },
        "status": "en cours",
        "updateLogs": [
          {
            "action": "division",
            "date": "2024-04-10",
            "distance": 25,
            "remarques": "repiquage de touffes existantes"
          }
        ],
        "parcelId": 105
      },
      {
        "id": 21,
        "length": 1.5,
        "crop": {
          "vegetable": "roquette",
          "variety": "sauvage"
        },
        "status": "terminé",
        "updateLogs": [
          {
            "action": "semis",
            "date": "2024-04-01",
            "distance": 10,
            "remarques": "croissance rapide"
          },
          {
            "action": "récolte",
            "date": "2024-05-25",
            "distance": null,
            "remarques": "saveur piquante"
          }
        ],
        "parcelId": 106
      },
      {
        "id": 22,
        "length": 1.2,
        "crop": {
          "vegetable": "mâche",
          "variety": "verte à coeur plein"
        },
        "status": "planifié",
        "updateLogs": [
          {
            "action": "préparation",
            "date": "2024-08-15",
            "distance": null,
            "remarques": "emplacement ombragé réservé"
          }
        ],
        "parcelId": 106
      },
      {
        "id": 23,
        "length": 3.0,
        "crop": {
          "vegetable": "chou",
          "variety": "kale"
        },
        "status": "en cours",
        "updateLogs": [
          {
            "action": "plantation",
            "date": "2024-05-05",
            "distance": 45,
            "remarques": "protection anti-pigeons"
          }
        ],
        "parcelId": 107
      },
      {
        "id": 24,
        "length": 2.8,
        "crop": {
          "vegetable": "blette",
          "variety": "verte à carde blanche"
        },
        "status": "en cours",
        "updateLogs": [
          {
            "action": "semis",
            "date": "2024-04-20",
            "distance": 40,
            "remarques": "éclaircissage nécessaire"
          }
        ],
        "parcelId": 107
      },
      {
        "id": 25,
        "length": 1.5,
        "crop": {
          "vegetable": "romarin",
          "variety": "officinal"
        },
        "status": "en cours",
        "updateLogs": [
          {
            "action": "plantation",
            "date": "2024-03-15",
            "distance": 50,
            "remarques": "plein soleil"
          }
        ],
        "parcelId": 108
      },
      {
        "id": 26,
        "length": 1.0,
        "crop": {
          "vegetable": "origan",
          "variety": "vulgaire"
        },
        "status": "en cours",
        "updateLogs": [
          {
            "action": "plantation",
            "date": "2024-04-01",
            "distance": 30,
            "remarques": "sol bien drainé"
          }
        ],
        "parcelId": 108
      },
      {
        "id": 27,
        "length": 3.5,
        "crop": {
          "vegetable": "maïs",
          "variety": "douce provence"
        },
        "status": "en cours",
        "updateLogs": [
          {
            "action": "semis",
            "date": "2024-05-10",
            "distance": 70,
            "remarques": "en carré pour pollinisation"
          }
        ],
        "parcelId": 109
      },
      {
        "id": 28,
        "length": 3.0,
        "crop": {
          "vegetable": "courge",
          "variety": "butternut"
        },
        "status": "en cours",
        "updateLogs": [
          {
            "action": "semis",
            "date": "2024-05-15",
            "distance": 100,
            "remarques": "paillage épais"
          }
        ],
        "parcelId": 109
      },
      {
        "id": 29,
        "length": 1.8,
        "crop": {
          "vegetable": "fenouil",
          "variety": "bulbeux"
        },
        "status": "en cours",
        "updateLogs": [
          {
            "action": "semis",
            "date": "2024-06-01",
            "distance": 30,
            "remarques": "arrosage régulier nécessaire"
          }
        ],
        "parcelId": 110
      },
      {
        "id": 30,
        "length": 1.5,
        "crop": {
          "vegetable": "céleri",
          "variety": "branche"
        },
        "status": "en cours",
        "updateLogs": [
          {
            "action": "plantation",
            "date": "2024-05-20",
            "distance": 40,
            "remarques": "plants achetés en jardinerie"
          }
        ],
        "parcelId": 110
      },
      {
        "id": 31,
        "length": 2.5,
        "crop": {
          "vegetable": "pois",
          "variety": "nain hâtif"
        },
        "status": "terminé",
        "updateLogs": [
          {
            "action": "semis",
            "date": "2024-03-10",
            "distance": 20,
            "remarques": "filet anti-oiseaux"
          },
          {
            "action": "récolte",
            "date": "2024-06-15",
            "distance": null,
            "remarques": "production moyenne"
          }
        ],
        "parcelId": 111
      },
      {
        "id": 32,
        "length": 3.0,
        "crop": {
          "vegetable": "topinambour",
          "variety": "commun"
        },
        "status": "planifié",
        "updateLogs": [
          {
            "action": "préparation",
            "date": "2024-09-01",
            "distance": null,
            "remarques": "zone isolée pour contrôle de l'expansion"
          }
        ],
        "parcelId": 111
      },
      {
        "id": 33,
        "length": 2.0,
        "crop": {
          "vegetable": "artichaut",
          "variety": "violet de Provence"
        },
        "status": "en cours",
        "updateLogs": [
          {
            "action": "plantation",
            "date": "2024-04-05",
            "distance": 80,
            "remarques": "plants issus de division"
          }
        ],
        "parcelId": 112
      },
      {
        "id": 34,
        "length": 1.8,
        "crop": {
          "vegetable": "lavande",
          "variety": "officinale"
        },
        "status": "en cours",
        "updateLogs": [
          {
            "action": "plantation",
            "date": "2024-03-20",
            "distance": 50,
            "remarques": "bordure de parcelle"
          }
        ],
        "parcelId": 112
      },
      {
        "id": 35,
        "length": 2.2,
        "crop": {
          "vegetable": "rutabaga",
          "variety": "jaune"
        },
        "status": "en cours",
        "updateLogs": [
          {
            "action": "semis",
            "date": "2024-06-10",
            "distance": 30,
            "remarques": "culture d'automne"
          }
        ],
        "parcelId": 113
      },
      {
        "id": 36,
        "length": 1.5,
        "crop": {
          "vegetable": "oseille",
          "variety": "ronde"
        },
        "status": "en cours",
        "updateLogs": [
          {
            "action": "plantation",
            "date": "2024-04-15",
            "distance": 35,
            "remarques": "sol frais"
          }
        ],
        "parcelId": 113
      },
      {
        "id": 37,
        "length": 3.5,
        "crop": {
          "vegetable": "salsifis",
          "variety": "blanc"
        },
        "status": "en cours",
        "updateLogs": [
          {
            "action": "semis",
            "date": "2024-04-01",
            "distance": 25,
            "remarques": "culture longue"
          }
        ],
        "parcelId": 114
      },
      {
        "id": 38,
        "length": 2.0,
        "crop": {
          "vegetable": "panais",
          "variety": "long"
        },
        "status": "en cours",
        "updateLogs": [
          {
            "action": "semis",
            "date": "2024-03-20",
            "distance": 30,
            "remarques": "levée lente"
          }
        ],
        "parcelId": 114
      },
      {
        "id": 39,
        "length": 1.8,
        "crop": {
          "vegetable": "cerfeuil",
          "variety": "commun"
        },
        "status": "en cours",
        "updateLogs": [
          {
            "action": "semis",
            "date": "2024-05-01",
            "distance": 15,
            "remarques": "ombrage partiel"
          }
        ],
        "parcelId": 115
      },
      {
        "id": 40,
        "length": 2.0,
        "crop": {
          "vegetable": "estragon",
          "variety": "français"
        },
        "status": "en cours",
        "updateLogs": [
          {
            "action": "plantation",
            "date": "2024-04-10",
            "distance": 40,
            "remarques": "division de pied mère"
          }
        ],
        "parcelId": 115
      }
    ],
    


    


    parcels : [
      {
        "id": 101,
        "length": 5,
        "width": 1.0,
        "nbrOfLines": 3,
        "updateLogs": [
          {
            "action": "préparation printanière",
            "date": "2024-03-01",
            "remarques": "fumier décomposé"
          }
        ],
        "gardenId": 1
      },
      {
        "id": 102,
        "length": 4.5,
        "width": 1.2,
        "nbrOfLines": 4,
        "updateLogs": [
          {
            "action": "installation tuteurs",
            "date": "2024-05-01",
            "remarques": "structure pour tomates"
          }
        ],
        "gardenId": 1
      },
      {
        "id": 103,
        "length": 2.7,
        "width": 0.9,
        "nbrOfLines": 2,
        "updateLogs": [
          {
            "action": "paillage",
            "date": "2024-04-15",
            "remarques": "paille bio"
          }
        ],
        "gardenId": 2
      },
      {
        "id": 104,
        "length": 3.0,
        "width": 1.1,
        "nbrOfLines": 3,
        "updateLogs": [
          {
            "action": "rotation cultures",
            "date": "2024-03-10",
            "remarques": "alternance légumineuses"
          }
        ],
        "gardenId": 2
      },
      {
        "id": 105,
        "length": 2.5,
        "width": 1.0,
        "nbrOfLines": 3,
        "updateLogs": [
          {
            "action": "solarisation",
            "date": "2023-08-20",
            "remarques": "désinfection naturelle"
          }
        ],
        "gardenId": 3
      },
      {
        "id": 106,
        "length": 1.8,
        "width": 0.8,
        "nbrOfLines": 2,
        "updateLogs": [
          {
            "action": "amendement calcaire",
            "date": "2024-02-05",
            "remarques": "pour pH trop acide"
          }
        ],
        "gardenId": 3
      },
      {
        "id": 107,
        "length": 3.5,
        "width": 1.2,
        "nbrOfLines": 4,
        "updateLogs": [
          {
            "action": "protection hivernale",
            "date": "2023-11-15",
            "remarques": "voile forcé"
          }
        ],
        "gardenId": 4
      },
      {
        "id": 108,
        "length": 2.0,
        "width": 0.9,
        "nbrOfLines": 2,
        "updateLogs": [
          {
            "action": "semis engrais vert",
            "date": "2024-09-10",
            "remarques": "phacélie"
          }
        ],
        "gardenId": 4
      },
      {
        "id": 109,
        "length": 4.0,
        "width": 1.3,
        "nbrOfLines": 5,
        "updateLogs": [
          {
            "action": "drainage",
            "date": "2024-01-20",
            "remarques": "ajout sable"
          }
        ],
        "gardenId": 5
      },
      {
        "id": 110,
        "length": 2.2,
        "width": 1.0,
        "nbrOfLines": 3,
        "updateLogs": [
          {
            "action": "clôture anti-lapins",
            "date": "2024-03-15",
            "remarques": "grillage 50cm"
          }
        ],
        "gardenId": 5
      },
      {
        "id": 111,
        "length": 3.0,
        "width": 1.1,
        "nbrOfLines": 3,
        "updateLogs": [
          {
            "action": "préparation",
            "date": "2024-02-28",
            "remarques": "apport de sable pour drainage"
          }
        ],
        "gardenId": 1
      },
      {
        "id": 112,
        "length": 2.5,
        "width": 0.9,
        "nbrOfLines": 2,
        "updateLogs": [
          {
            "action": "rotation",
            "date": "2024-03-15",
            "remarques": "après légumineuses"
          }
        ],
        "gardenId": 1
      },
      {
        "id": 113,
        "length": 2.8,
        "width": 1.0,
        "nbrOfLines": 3,
        "updateLogs": [
          {
            "action": "paillage",
            "date": "2024-04-10",
            "remarques": "tonte de gazon séchée"
          }
        ],
        "gardenId": 2
      },
      {
        "id": 114,
        "length": 3.5,
        "width": 1.2,
        "nbrOfLines": 4,
        "updateLogs": [
          {
            "action": "amendement",
            "date": "2024-03-01",
            "remarques": "fumier composté"
          }
        ],
        "gardenId": 3
      },
      {
        "id": 115,
        "length": 2.0,
        "width": 0.8,
        "nbrOfLines": 2,
        "updateLogs": [
          {
            "action": "préparation",
            "date": "2024-03-20",
            "remarques": "désherbage manuel"
          }
        ],
        "gardenId": 3
      },
      {
        "id": 116,
        "length": 1.5,
        "width": 0.7,
        "nbrOfLines": 1,
        "updateLogs": [
          {
            "action": "création",
            "date": "2024-05-01",
            "remarques": "parcelle expérimentale"
          }
        ],
        "gardenId": 4
      },
      {
        "id": 117,
        "length": 4.2,
        "width": 1.3,
        "nbrOfLines": 5,
        "updateLogs": [
          {
            "action": "préparation",
            "date": "2024-02-15",
            "remarques": "sol profondément ameubli"
          }
        ],
        "gardenId": 4
      },
      {
        "id": 118,
        "length": 3.0,
        "width": 1.0,
        "nbrOfLines": 3,
        "updateLogs": [
          {
            "action": "rotation",
            "date": "2024-03-10",
            "remarques": "jachère l'année précédente"
          }
        ],
        "gardenId": 5
      },
      {
        "id": 119,
        "length": 2.5,
        "width": 0.9,
        "nbrOfLines": 2,
        "updateLogs": [
          {
            "action": "protection",
            "date": "2024-04-05",
            "remarques": "filet anti-insectes"
          }
        ],
        "gardenId": 5
      },
      {
        "id": 120,
        "length": 1.8,
        "width": 0.8,
        "nbrOfLines": 2,
        "updateLogs": [
          {
            "action": "préparation",
            "date": "2024-05-15",
            "remarques": "pour cultures aromatiques"
          }
        ],
        "gardenId": 5
      }
    ],

    garden : [
      {
        "id": 1,
        "length": 8.0,
        "width": 8.0,
        "createdAt": "2023-09-15",
        "adminId": "user1",
        "updateLogs": [
          {
            "action": "création jardin",
            "date": "2023-09-15",
            "remarque": "installation complète"
          },
          {
            "action": "installation clôture",
            "date": "2023-10-01",
            "remarque": "grillage anti-lapins"
          }
        ]
      },
      {
        "id": 2,
        "length": 6.5,
        "width": 4.0,
        "createdAt": "2024-02-20",
        "adminId": "user2",
        "updateLogs": [
          {
            "action": "préparation terrain",
            "date": "2024-02-20",
            "remarque": "défrichage manuel"
          }
        ]
      },
      {
        "id": 3,
        "length": 10.0,
        "width": 6.0,
        "createdAt": "2022-05-10",
        "adminId": "user3",
        "updateLogs": [
          {
            "action": "agrandissement",
            "date": "2023-04-15",
            "remarque": "ajout 2m de longueur"
          },
          {
            "action": "rotation cultures",
            "date": "2024-01-10",
            "remarque": "nouveau plan de culture"
          }
        ]
      },
      {
        "id": 4,
        "length": 5.5,
        "width": 3.5,
        "createdAt": "2024-03-01",
        "adminId": "user1",
        "updateLogs": [
          {
            "action": "installation système arrosage",
            "date": "2024-03-15",
            "remarque": "goutte-à-goutte automatique"
          }
        ]
      },
      {
        "id": 5,
        "length": 10.2,
        "width": 4.8,
        "createdAt": "2023-11-01",
        "adminId": "user4",
        "updateLogs": [
          {
            "action": "protection hivernale",
            "date": "2023-11-20",
            "remarque": "paillage général"
          },
          {
            "action": "analyse sol",
            "date": "2024-02-05",
            "remarque": "ajout compost recommandé"
          }
        ]
      }
    ]
}

export default data