# Publishing on GitHub Pages

## Option 1: Upload Through the Website

1. Go to GitHub and create a new repository.
2. Name it something clear, such as `em4-modding-encyclopedia`.
3. Upload all files from the `EM4-Modding-Encyclopedia` folder.
4. Commit the upload to the `main` branch.
5. Open `Settings > Pages`.
6. Choose `Deploy from a branch`.
7. Select `main` and `/root`.
8. Save and wait for GitHub to generate the site URL.

## Option 2: Use Git Locally

From inside this folder:

```powershell
git init
git add .
git commit -m "Create EM4 modding encyclopedia"
git branch -M main
git remote add origin https://github.com/YOUR-NAME/em4-modding-encyclopedia.git
git push -u origin main
```

Then enable GitHub Pages from repository settings.

## Recommended Repository Settings

- Add a clear repository description.
- Add topics such as `emergency-4`, `em4`, `modding`, `scripting`, and `github-pages`.
- Keep Issues enabled if you want other modders to request new articles.
- Use pull requests if multiple people will edit the guide.

