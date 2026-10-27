# Instructions pour Créer la Pull Request sur GitHub

## Méthode 1: Via l'Interface Web GitHub (Recommandé)

1. **Ouvrir le dépôt** : Allez sur https://github.com/fanimandudi-dev/E_commerce_app

2. **Voir la branche** :
   - Cliquez sur le menu déroulant des branches (à gauche, près du bouton "Code")
   - Sélectionnez `fix/vendor-ui`

3. **Créer la Pull Request** :
   - GitHub affichera une bannière jaune : "This branch is 1 commit ahead, X commits behind main"
   - Cliquez sur **"Compare & pull request"**

4. **Remplir les détails** :
   - **Title** : `feat(client-ui): Complete client UI modernization with SaaS Design System`
   - **Description** : Copiez-collez le contenu de `PULL_REQUEST_TEMPLATE.md`
   - **Base** : `main` (ou `master`)
   - **Compare** : `fix/vendor-ui`

5. **Créer la PR** : Cliquez sur **"Create pull request"**

6. **Revoir et merger** :
   - Vérifiez les changements dans l'onglet "Files changed"
   - Ajoutez des reviewers si nécessaire
   - Mergez la PR une fois approuvée

---

## Méthode 2: Via GitHub CLI

Si vous avez GitHub CLI installé (`gh`) :

```bash
# Installer GitHub CLI si nécessaire
# brew install gh (Mac) ou apt install gh (Linux)

# Authentifier
gh auth login

# Créer la PR
gh pr create \
  --repo fanimandudi-dev/E_commerce_app \
  --base main \
  --head fix/vendor-ui \
  --title "feat(client-ui): Complete client UI modernization with SaaS Design System" \
  --body "$(cat PULL_REQUEST_TEMPLATE.md)" \
  --web
```

---

## Méthode 3: Via cURL (API GitHub)

```bash
# Remplacez TOKEN par votre token GitHub
TOKEN="YOUR_GITHUB_TOKEN_HERE"

curl -X POST \
  -H "Authorization: token $TOKEN" \
  -H "Accept: application/vnd.github.v3+json" \
  https://api.github.com/repos/fanimandudi-dev/E_commerce_app/pulls \
  -d '{
    "title": "feat(client-ui): Complete client UI modernization with SaaS Design System",
    "head": "fix/vendor-ui",
    "base": "main",
    "body": "'(cat PULL_REQUEST_TEMPLATE.md | sed 's/\\/\\\\/g; s/\n/\\n/g; s/\t/\\t/g; s/"/\\"/g' | tr -d '\n')""
  }'
```

---

## Méthode 4: Script Bash Automatique

J'ai créé un script pour automatiser le processus :

```bash
# Donner les permissions
chmod +x /home/user/food-campus/create_pr.sh

# Exécuter (nécessite GitHub CLI)
./create_pr.sh
```
