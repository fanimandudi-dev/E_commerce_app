#!/bin/bash

# Script pour créer une Pull Request sur GitHub
# Nécessite : GitHub CLI (gh) installé et authentifié

echo "=========================================="
echo "Création de la Pull Request GitHub"
echo "=========================================="
echo ""

# Vérifier que gh est installé
if ! command -v gh &> /dev/null; then
    echo "❌ GitHub CLI (gh) n'est pas installé"
    echo ""
    echo "Pour installer GitHub CLI :"
    echo "  - Mac: brew install gh"
    echo "  - Linux: sudo apt install gh"
    echo "  - Windows: winget install --id GitHub.cli"
    echo ""
    echo "Puis authentifiez-vous : gh auth login"
    exit 1
fi

# Vérifier l'authentification
echo "Vérification de l'authentification GitHub..."
if ! gh auth status &> /dev/null; then
    echo "❌ Vous n'êtes pas authentifié auprès de GitHub"
    echo ""
    echo "Pour vous authentifier :"
    echo "  gh auth login"
    exit 1
fi

echo "✅ Authentification GitHub validée"
echo ""

# Informations de la PR
REPO="fanimandudi-dev/E_commerce_app"
BASE_BRANCH="main"
HEAD_BRANCH="fix/vendor-ui"
PR_TITLE="feat(client-ui): Complete client UI modernization with SaaS Design System"
PR_BODY_FILE="PULL_REQUEST_TEMPLATE.md"

# Vérifier que la branche existe
echo "Vérification de la branche '$HEAD_BRANCH'..."
if ! git show-ref --verify --quiet refs/heads/$HEAD_BRANCH; then
    echo "❌ La branche '$HEAD_BRANCH' n'existe pas localement"
    exit 1
fi

echo "✅ Branche '$HEAD_BRANCH' trouvée"
echo ""

# Lire le corps de la PR
if [ -f "$PR_BODY_FILE" ]; then
    PR_BODY=$(cat "$PR_BODY_FILE")
else
    PR_BODY="Modernisation complète de l'UI Client avec Design System SaaS"
fi

# Créer la PR
echo "Création de la Pull Request..."
echo ""
echo "Titre: $PR_TITLE"
echo "Base: $BASE_BRANCH"
echo "Head: $HEAD_BRANCH"
echo ""

# Utiliser GitHub CLI pour créer la PR
gh pr create \
    --repo "$REPO" \
    --base "$BASE_BRANCH" \
    --head "$HEAD_BRANCH" \
    --title "$PR_TITLE" \
    --body "$PR_BODY" \
    --web

# Vérifier si la création a réussi
if [ $? -eq 0 ]; then
    echo ""
    echo "=========================================="
    echo "✅ Pull Request créée avec succès !"
    echo "=========================================="
    echo ""
    echo "Votre navigateur devrait s'ouvrir avec la PR."
    echo "Si ce n'est pas le cas, allez sur :"
    echo "  https://github.com/$REPO/pulls"
    echo ""
else
    echo ""
    echo "❌ Échec de la création de la Pull Request"
    echo ""
    exit 1
fi
