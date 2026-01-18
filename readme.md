# WebhookGForms

**[English](#english)** | **[Français](#français)**

---

<a name="english"></a>
## English

### Description
This script allows you to automatically send **Google Forms** responses to a **Discord** channel via a Webhook. It is designed to be generic and works directly from the Google Script Editor (Google Apps Script in the Google Forms settings).

### Features
*   **Global & Generic:** Automatically adapts to the form title.
*   **Easy Reading:** The script keeps only the **first line** of each question for Discord display (useful if your questions have long descriptions).
*   **Discord Embeds:** Formats responses cleanly with a color and a default avatar.
*   **Serverless:** Works entirely via Google Apps Script.

### Installation

1.  **Open the Editor:**
    *   On your Google Form, click the 3 dots (top right) > **Script editor** (or Extensions > Apps Script).
2.  **The Code:**
    *   Copy the content of `gformtwebhook.gs` into the editor.
    *   Replace `const webhookUrl = "..."` with your Discord Webhook link.
    *   Save (`Ctrl+S`).
3.  **The Trigger:**
    *   In the left menu, go to **Triggers** (the alarm clock icon).
    *   Click **Add Trigger** (bottom right).
    *   Function: `sendToDiscord`.
    *   Event source: `From form`.
    *   Event type: `On form submit`.
    *   Save and authorize access to your Google account.

---

<a name="français"></a>
## Français

### Description
Ce script permet d'envoyer automatiquement les réponses d'un **Google Forms** vers un salon **Discord** via un Webhook. Il est conçu pour être générique et fonctionne directement depuis l'éditeur de script Google (Google app scripts dans les paramètres du formulaire Google Forms)

### Fonctionnalités
*   **Global & Générique :** S'adapte automatiquement au titre du formulaire
*   **Lecture Facile :** Le script ne garde que la **première ligne** de chaque question pour l'affichage Discord (pratique si vos questions ont de longues descriptions)
*   **Embeds Discord :** Formate les réponses proprement avec une couleur et un avatar par défaut
*   **Sans Serveur :** Fonctionne entièrement via Google Apps Script

### Installation

1.  **Ouvrir l'éditeur :**
    *   Sur votre Google Form, cliquez sur les 3 points (en haut à droite) > **Éditeur de script** (ou Extensions > Apps Script).
2.  **Le Code :**
    *   Copiez le contenu de `gformtwebhook.gs` dans l'éditeur.
    *   Remplacez `const webhookUrl = "..."` par votre lien Webhook Discord.
    *   Sauvegardez (`Ctrl+S`).
3.  **Le Déclencheur (Trigger) :**
    *   Dans le menu de gauche, allez sur **Déclencheurs** (l'icône réveil).
    *   Cliquez sur **Ajouter un déclencheur** (en bas à droite).
    *   Fonction : `sendToDiscord`.
    *   Source de l'événement : `Du formulaire`.
    *   Type d'événement : `Lors de l'envoi du formulaire`.
    *   Validez et autorisez l'accès à votre compte Google.

---
