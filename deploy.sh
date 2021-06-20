git checkout deploy
git merge main
npm run build
git add .
git commit -m "deploy"
git push origin deploy
git checkout master