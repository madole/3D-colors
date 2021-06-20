git checkout deploy
git merge main
npm run build
git add .
git commit -m "Chore: deploy"
git push origin deploy
git checkout master