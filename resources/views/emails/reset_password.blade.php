<!DOCTYPE html>
<html lang="fr">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Réinitialisation de mot de passe</title>
    <style>
      body {
        font-family: Arial, sans-serif;
        line-height: 1.6;
        color: #333;
        margin: 0;
        padding: 0;
        background-color: #f7f7f7;
      }
      .email-container {
        max-width: 600px;
        margin: 20px auto;
        background: #fff;
        border-radius: 8px;
        overflow: hidden;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        border: 1px solid #e4e4e4;
      }
      .header {
        background-color: #37515F;
        color: white;
        padding: 20px;
        text-align: center;
      }
      .header h1 {
        margin: 0;
        font-size: 24px;
      }
      .content {
        padding: 20px;
      }
      .content h2 {
        color: #37515F;
        font-size: 22px;
      }
      .content p {
        margin: 10px 0;
        font-size: 16px;
      }
      .btn {
        display: inline-block;
        padding: 10px 20px;
        margin: 20px 0;
        background-color: #75B9BE;
        color: white;
        text-decoration: none;
        font-size: 16px;
        border-radius: 5px;
      }
      .btn:hover {
        background-color: #639FA2;
      }
      .footer {
        text-align: center;
        padding: 10px;
        background-color: #f7f7f7;
        color: #777;
        font-size: 14px;
        border-top: 1px solid #e4e4e4;
      }
      .footer a {
        color: #37515F;
        text-decoration: none;
      }
      .footer a:hover {
        text-decoration: underline;
      }
    </style>
  </head>
  <body>
    <div class="email-container">
      <div class="header">
        <h1>Réinitialisation de mot de passe</h1>
      </div>
      <div class="content">
        <h2>Bonjour,</h2>
        <p>Vous avez demandé la réinitialisation de votre mot de passe pour votre compte sur Inner.</p>
        <p>Cliquez sur le bouton ci-dessous pour définir un nouveau mot de passe :</p>
        <a href="{{ $url }}" class="btn">Réinitialiser mon mot de passe</a>
        <p>Ce lien est valable pendant {{ $expire }} minutes.</p>
        <p>Si vous n'avez pas demandé cette réinitialisation, vous pouvez ignorer cet e-mail en toute sécurité.</p>
      </div>
      <div class="footer">
        <p>&copy; {{ date('Y') }} Inner. Tous droits réservés.</p>
      </div>
    </div>
  </body>
</html>
