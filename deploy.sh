git checkout deploy
git rebase main
npm run build
git add .
git commit -m "Chore: deploy"
git push origin deploy
git checkout master