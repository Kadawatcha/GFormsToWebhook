function sendToDiscord(e) {
  const webhookUrl = "A REMPLACER PAR VOTRE WEBHOOK ( lien ) ";

  try {
    const response = e.response;
    const itemResponses = response.getItemResponses();
    
    // Récupération du titre du formulaire
    const formTitle = e.source ? e.source.getTitle() : "Nouvelle réponse";

    let typeCandidature = "📝 " + formTitle;
    let textMessage = ""; 
    let embedColor = 3451219; // Vert / Format HEXA
    let avatarBot = "https://i.imgur.com/PrgqxBy.png"; // changer avatar du bot ici 
    let usernamePerso = "Google Forms";

    // 3. PRÉPARATION DES CHAMPS (PREMIÈRE LIGNE UNIQUEMENT)
    const fields = itemResponses.map(item => {
      const questionFull = item.getItem().getTitle();
      let answer = item.getResponse();

      // ON GARDE UNIQUEMENT LA PREMIÈRE LIGNE DU TITRE ( pour faire plus joli / lisible )
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