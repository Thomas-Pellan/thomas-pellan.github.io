# IBF Equicoaching frontend site

### Goals

- Replace the existing static website https://www.ibf-equicoaching.com and it's components
  - Ensure clean and minimal code to get the best lighthouse score possible
  - Remove the heavy bootstrap and external plugins used for homemade lighter versions
  - Remove the external contact form and implement one using VueJs
  - Optimize SEO on the website pages
- Have the same functionnalities as the base website
- Develop a generic way to modify and publish content for non developpers based on a CMS

### Framework

- astroJs : https://astro.build/
- VueJs islands

### Versions 

- 0.0.x : project start, minimal version with external scripts
- 1.0.0 : first functionnal version
- 1.1.0 : going live, creating prod branch and workflow

### Local installation and startup

Clone the repo and run the following commands in theproject directory
```
npm install
npm run dev
```

The website should be visible at http://localhost:3000 

You can also run if you have docker :
```
docker build -t astro-ibf .
docker run -p 3000:3000 astro-ibf
```
