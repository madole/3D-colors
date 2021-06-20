git checkout deploy
git reset main --hard
npm run build
git add .
git commit -m "Chore: deploy"
git push origin deploy
git checkout master