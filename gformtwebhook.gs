function sendToDiscord(e) {
  const webhookUrl = "A REMPLACER PAR VOTRE WEBHOOK ( lien ) ";

  try {
    const response = e.response;
    const itemResponses = response.getItemResponses();
    
    let typeCandidature = "📝 NOUVELLE CANDIDATURE";
    let textMessage = "🔔 Une nouvelle candidature est arrivée !";
    let embedColor = 3451219; // Vert par défaut
    let avatarBot = "https://i.imgur.com/DtrCmIN.png";
    let usernamePerso = "Gestionnaire recrutement";

    // 2. LOGIQUE DYNAMIQUE (TITRE, COULEUR ET PING)
    itemResponses.forEach(item => {
      const questionFull = item.getItem().getTitle();
      const answer = item.getResponse();

      // On vérifie la question de sélection de poste
      if (questionFull.includes("Vous souhaitez postuler pour")) {
        if (answer === "Staff Discord") {
          typeCandidature = "🛠️ Candidature staff discord";
          embedColor = 5793266; // Bleu Discord
          textMessage = "@everyone";
          avatarBot = "https://i.imgur.com/PrgqxBy.png";
          usernamePerso = "Recrutement Staff";
          
        } 
        else if (answer === "Modérateur Youtube") {
          typeCandidature = "📺 Candidature modérateur YouTube";
          embedColor = 16711680; // Rouge YouTube
          textMessage = "@everyone";
          avatarBot = "https://i.imgur.com/DtrCmIN.png";
          usernamePerso = "Recrutement Modérateur YouTube";
        }
      }
    });

    // 3. PRÉPARATION DES CHAMPS (PREMIÈRE LIGNE UNIQUEMENT)
    const fields = itemResponses.map(item => {
      const questionFull = item.getItem().getTitle();
      let answer = item.getResponse();

      // ON GARDE UNIQUEMENT LA PREMIÈRE LIGNE DU TITRE
      let firstLineQuestion = questionFull.split('\n')[0].trim();

      // Traitement des réponses (tableaux / listes)
      if (Array.isArray(answer)) {
        answer = answer.join(", ");
      }
      
      let finalAnswer = answer ? String(answer).trim() : "*(Vide)*";
      if (finalAnswer === "") finalAnswer = "*(Vide)*";

      return {
        name: "> " + firstLineQuestion, // Affiche uniquement la ligne 1
        value: "`" + finalAnswer.substring(0, 1024)+ "`", // Limite Discord pour la réponse
        inline: false
      };
    });

    // 4. CONSTRUCTION DU MESSAGE (PAYLOAD)
    const payload = {
      username: usernamePerso,
      avatar_url: avatarBot,
      content: textMessage, // Message texte avec le ping au-dessus de l'embed
      embeds: [{
        title: typeCandidature,
        color: embedColor,
        fields: fields.slice(0, 25), // Sécurité max 25 questions
        timestamp: new Date().toISOString()
      }]
    };

    // 5. ENVOI À DISCORD
    const options = {
      method: "post",
      contentType: "application/json",
      payload: JSON.stringify(payload),
      muteHttpExceptions: true
    };

    const res = UrlFetchApp.fetch(webhookUrl, options);
    Logger.log("Réponse Discord : " + res.getContentText());

  } catch (err) {
    Logger.log("Erreur : " + err.toString());
  }
}