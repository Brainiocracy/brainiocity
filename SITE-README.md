# Brainiocity™ v1.0

Brainiocity is a fictional neurotechnology company. This static prototype includes the NAP™ simulator, a five-question cognitive assessment with downloadable and printable novelty credentials, the Brainiocracy™ membership explorer, fictional plan previews, and the Black Diamond™ reveal.

## Open the prototype

1. Unzip the archive into a folder.
2. Open `index.html` in a current browser. Keep `style.css`, `script.js`, and `assets/` beside it.
3. Try the NAP simulator, take the assessment, and explore the five membership finishes.

The site runs from local files and requires no build, dependencies, API keys, or internet connection. The display name lives in the current page session. Downloads are generated locally as PNG files. The Print button opens the browser print dialog, where you can print the certificate or choose Save as PDF.

## Publish to GitHub Pages

1. Sign in to GitHub as `brainiocracy` and create or open the repository named `brainiocity`.
2. Upload the extracted files to the root of the repository's `main` branch. Keep the `assets/` folder intact and commit the files. The root of the branch should contain `index.html`, `style.css`, `script.js`, and `README.md`. Upload the files inside the ZIP, rather than the ZIP itself.
3. Open the repository's **Settings** and choose **Pages**. Under **Build and deployment**, set **Source** to **Deploy from a branch**.
4. Choose the **main** branch and **/ (root)**, then choose **Save**.
5. When the Pages deployment finishes, visit [brainiocracy.github.io/brainiocity/](https://brainiocracy.github.io/brainiocity/).

## Publish to NixiHost through cPanel

1. Open **File Manager** in cPanel and find the document root for the desired domain. For the primary domain this is normally `public_html/`. For another domain, confirm its document root under **Domains** first.
2. Upload the ZIP to that document root and extract it there, or upload the extracted files directly. Confirm that `index.html` sits at the root alongside `style.css`, `script.js`, and `assets/`.
3. If you uploaded the ZIP, remove it from the web directory once extraction succeeds.
4. Visit the HTTPS domain and verify that the images load and the simulator and certificate actions respond.

All website paths are relative, so the same files work at a GitHub Pages project path, a domain root, or a hosting subdirectory.

## Assets and data

The neural study and Black Diamond pin are original illustrative assets. The animated diagnostic illustration is drawn by the page using Canvas. Inter and Newsreader are included locally under the SIL Open Font License, with notices in `assets/`.

All results, credentials, research, testimonials, membership benefits, and prices are fictional. The site has no accounts, payments, subscriptions, analytics, or external service calls.
