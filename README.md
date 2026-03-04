# Task Tracker CLI

Projet : https://github.com/rasitraka0/task-tracker

Un gestionnaire de tâches en ligne de commande, construit avec Node.js.

## Prérequis

- Node.js installé sur ta machine

## Installation

```bash
git clone <ton-repo>
cd task-tracker
```

Aucune dépendance à installer — ce projet utilise uniquement les modules natifs de Node.js.

## Utilisation

### Ajouter une tâche

```bash
node index.js add "Faire les courses"
```

### Lister les tâches

```bash
node index.js list                  # Toutes les tâches
node index.js list todo             # Tâches à faire
node index.js list in-progress      # Tâches en cours
node index.js list done             # Tâches terminées
```

### Modifier une tâche

```bash
node index.js update 1 "Nouvelle description"
```

### Supprimer une tâche

```bash
node index.js delete 1
```

### Changer le statut d'une tâche

```bash
node index.js mark-in-progress 1
node index.js mark-done 1
```

## Structure des données

Les tâches sont stockées dans un fichier `tasks.json` créé automatiquement :

```json
[
  {
    "id": 1,
    "description": "Faire les courses",
    "status": "todo",
    "createdAt": "2026-03-04T10:00:00.000Z",
    "updatedAt": "2026-03-04T10:00:00.000Z"
  }
]
```
