# Guide d'Installation de GotaMod

Ce guide vous accompagne pas à pas pour installer et utiliser GotaMod.

## 📋 Prérequis

Avant d'installer GotaMod, vous devez avoir :
- Un navigateur web moderne (Chrome, Firefox, Edge ou Opera)
- L'extension Tampermonkey pour votre navigateur

## 🚀 Installation Rapide (3 étapes simples)

### Étape 1 : Installer Tampermonkey

Tampermonkey est une extension de navigateur qui permet d'exécuter des scripts utilisateur.

#### Pour Chrome
1. Visitez le [Chrome Web Store](https://chrome.google.com/webstore/category/extensions)
2. Recherchez "Tampermonkey"
3. Cliquez sur "Ajouter à Chrome"
4. Confirmez en cliquant sur "Ajouter l'extension"

#### Pour Firefox
1. Visitez [Modules pour Firefox](https://addons.mozilla.org)
2. Recherchez "Tampermonkey"
3. Cliquez sur "Ajouter à Firefox"
4. Confirmez l'installation

#### Pour Edge
1. Visitez la [Boutique de modules Edge](https://microsoftedge.microsoft.com/addons)
2. Recherchez "Tampermonkey"
3. Cliquez sur "Obtenir"
4. Confirmez l'installation

### Étape 2 : Installer GotaMod

#### Méthode A : Installation Directe (Recommandée) ⭐

C'est la méthode la plus simple !

1. **Cliquez sur ce lien** : [**Installer GotaMod**](https://cdn.jsdelivr.net/gh/collardmath57-oss/gotamod@latest/gotamod.user.js)
2. Tampermonkey s'ouvrira automatiquement et affichera le script
3. Cliquez sur le bouton **"Installer"** ou **"Install"**
4. C'est terminé ! Le script est maintenant actif ✅

#### Méthode B : Installation Manuelle

Si la méthode A ne fonctionne pas :

1. **Ouvrez le tableau de bord Tampermonkey**
   - Cliquez sur l'icône Tampermonkey dans votre navigateur
   - Sélectionnez "Tableau de bord" ou "Dashboard"

2. **Créez un nouveau script**
   - Cliquez sur l'icône "+" (Créer un nouveau script)

3. **Copiez le script**
   - Visitez le [Dépôt GitHub](https://github.com/collardmath57-oss/gotamod)
   - Ouvrez le fichier `gotamod.user.js`
   - Copiez tout le contenu

4. **Collez et enregistrez**
   - Supprimez le modèle par défaut dans Tampermonkey
   - Collez le script copié
   - Appuyez sur Ctrl+S (ou Cmd+S sur Mac) pour enregistrer

### Étape 3 : Utiliser GotaMod

1. Visitez [gota.io](https://gota.io)
2. Vous devriez voir un petit indicateur dans le coin supérieur droit
3. L'indicateur affiche "Player 1" par défaut
4. **Clic droit** n'importe où pour changer de joueur !

## 🎮 Contrôles

### Changer de Joueur

**Méthode principale :**
- **Clic droit** n'importe où sur la page = Changer entre Joueur 1 et Joueur 2

**Raccourcis clavier :**
- Touche **Tab** = Changer de joueur
- Touche **1** = Sélectionner le Joueur 1
- Touche **2** = Sélectionner le Joueur 2

**Astuce :**
- **Shift + Clic droit** = Afficher le menu contextuel normal du navigateur

### Indicateur Visuel

L'indicateur dans le coin supérieur droit affiche :
- **GotaMod Actif** - Le script fonctionne
- **Player 1** ou **Player 2** - Le joueur actuellement actif
- **Bordure colorée** :
  - Rouge = Joueur 1
  - Turquoise = Joueur 2

## ❓ Dépannage

### Le script ne fonctionne pas

1. **Vérifiez que Tampermonkey est activé**
   - Cliquez sur l'icône Tampermonkey
   - Assurez-vous qu'elle n'est pas désactivée (l'icône doit être colorée, pas grise)

2. **Vérifiez que le script est actif**
   - Ouvrez le tableau de bord Tampermonkey
   - Trouvez "Gota.io Dual Player Controller"
   - Assurez-vous que le bouton est sur ON (vert)

3. **Vérifiez la console du navigateur**
   - Appuyez sur F12 pour ouvrir les Outils de Développement
   - Allez dans l'onglet Console
   - Cherchez des messages commençant par "[GotaMod]"
   - Vous devriez voir : "[GotaMod] Initializing dual player controller..."

### L'indicateur ne s'affiche pas

1. Actualisez la page (F5 ou Ctrl+R)
2. Assurez-vous que vous êtes sur le domaine gota.io
3. Vérifiez que le script correspond au domaine :
   - Ouvrez le tableau de bord Tampermonkey
   - Modifiez le script
   - Vérifiez que les lignes `@match` incluent gota.io

### Le clic droit ne fonctionne pas

1. Assurez-vous de ne pas maintenir Shift (Shift+Clic droit affiche le menu normal)
2. Essayez d'utiliser les raccourcis clavier (Tab, 1, 2) à la place
3. Vérifiez qu'une autre extension n'interfère pas avec les événements de souris

### Les joueurs ne changent pas correctement

1. Ouvrez la console du navigateur (F12)
2. Cherchez des messages d'erreur
3. Essayez de changer manuellement avec les raccourcis clavier
4. Si les problèmes persistent, rechargez la page

## ⚙️ Configuration Avancée

### Personnaliser les Couleurs

Ouvrez la console du navigateur (F12) et exécutez :
```javascript
window.GotaMod.config.player1Color = '#FF0000'; // Rouge
window.GotaMod.config.player2Color = '#0000FF'; // Bleu
```

### Masquer l'Indicateur

Exécutez dans la console :
```javascript
window.GotaMod.config.showIndicator = false;
document.getElementById('gotamod-indicator').remove();
```

### Vérifier le Joueur Actuel

Exécutez dans la console :
```javascript
console.log('Joueur actif:', window.GotaMod.getActivePlayer());
```

## 🔄 Mise à Jour de GotaMod

Le script inclut des URL de mise à jour automatique. Tampermonkey vérifiera les mises à jour :
- Quotidiennement (par défaut)
- Manuellement depuis le tableau de bord Tampermonkey

Pour mettre à jour manuellement :
1. Ouvrez le tableau de bord Tampermonkey
2. Trouvez "Gota.io Dual Player Controller"
3. Cliquez sur la colonne "Dernière mise à jour"
4. Cliquez sur "Vérifier les mises à jour"

## 🗑️ Désinstallation

Pour supprimer GotaMod :
1. Ouvrez le tableau de bord Tampermonkey
2. Trouvez "Gota.io Dual Player Controller"
3. Cliquez sur l'icône de corbeille
4. Confirmez la suppression

## 🔐 Sécurité et Confidentialité

- GotaMod fonctionne entièrement dans votre navigateur
- Aucune donnée n'est envoyée vers des serveurs externes
- Le script communique uniquement avec les serveurs gota.io (jeu normal)
- Tout le code est open source et vérifiable

## 💡 Besoin d'Aide ?

Si vous rencontrez des problèmes non couverts ici :
1. Consultez la [FAQ](https://github.com/collardmath57-oss/gotamod#readme)
2. Ouvrez un [ticket sur GitHub](https://github.com/collardmath57-oss/gotamod/issues)
3. Consultez les tickets existants pour des solutions

## 📱 Installation pour Développeurs

Si vous souhaitez injecter le script directement dans une page web :

```html
<!DOCTYPE html>
<html>
<head>
    <title>Votre Page</title>
    <!-- Ajouter GotaMod via CDN -->
    <script src="https://cdn.jsdelivr.net/gh/collardmath57-oss/gotamod@latest/gotamod.min.js"></script>
</head>
<body>
    <!-- Votre contenu -->
</body>
</html>
```

Ou utilisez une version spécifique :
```html
<script src="https://cdn.jsdelivr.net/gh/collardmath57-oss/gotamod@1.0.0/gotamod.min.js"></script>
```

---

**Profitez de GotaMod !** 🎮

Si ce guide vous a aidé, n'hésitez pas à mettre une étoile au [dépôt GitHub](https://github.com/collardmath57-oss/gotamod) !
