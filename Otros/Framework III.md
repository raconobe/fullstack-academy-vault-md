
### How EJS Works

**EJS (Embedded JavaScript templates)** is a server-side templating engine. It takes a template containing standard HTML mixed with JavaScript scriptlet tags (e.g., `<% %>`, `<%= %>`), combines it with a JavaScript data object, and renders a **dynamically generated string of standard HTML markup**.

  

### Does EJS create the `.html` file?

**No, by default EJS does not automatically save or create a physical `.html` file on your disk.**

  

1. **In-Memory Rendering (Standard Web App Behavior):**
    
    When using EJS with web servers like Express (`res.render('index', data)`), EJS compiles the template in memory, replaces the scriptlet tags with data, and sends the resulting raw HTML directly over HTTP to the client browser. No static HTML file is written to the server's file system.
    
      
    
2. **File Creation (CLI or Explicit File Writing):**
    
    If you want a physical `.html` file saved to disk (such as in a static site generator pipeline), you must explicitly write the output string to a file using Node.js's native `fs` module, or use the EJS Command Line Interface (`ejs template.ejs -f data.json -o output.html`).
    
      
    

### Complete Example (Node.js & EJS)

Official documentation reference: [EJS Official Documentation](https://www.google.com/search?q=https://ejs.co/%23docs)

  

#### Step 1: Install Dependencies

Initialize a Node.js project and install `ejs`:

  

Bash

```
npm init -y
npm install ejs
```

#### Step 2: Create the Template (`views/template.ejs`)

Create a template file containing HTML and EJS scriptlets:

  

HTML

```
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title><%= pageTitle %></title>
</head>
<body>
    <h1>User List</h1>
    <% if (users.length > 0) { %>
        <ul>
            <% users.forEach(function(user) { %>
                <li><%= user.name %> - <%= user.role %></li>
            <% }); %>
        </ul>
    <% } else { %>
        <p>No users found.</p>
    <% } %>
</body>
</html>
```

#### Step 3: Render the Template (`index.js`)

This script demonstrates two approaches: rendering the string to the console/server response, and explicitly writing it to a physical `.html` file using `fs.writeFileSync`.

  

JavaScript

```
import ejs from 'ejs';
import fs from 'node:fs';
import path from 'node:path';

const templatePath = path.resolve('views/template.ejs');
const outputPath = path.resolve('output.html');

// Sample data context
const data = {
    pageTitle: 'Dashboard',
    users: [
        { name: 'Alice', role: 'Administrator' },
        { name: 'Bob', role: 'Developer' }
    ]
};

// 1. Render template into an in-memory HTML string
ejs.renderFile(templatePath, data, (err, htmlString) => {
    if (err) {
        console.error('Error rendering template:', err);
        return;
    }

    console.log('--- Rendered HTML Output ---');
    console.log(htmlString);

    // 2. Explicitly write the rendered HTML string to a file on disk
    fs.writeFileSync(outputPath, htmlString, 'utf-8');
    console.log(`\nSuccessfully created static file at: ${outputPath}`);
});
```

#### Step 4: Verification Steps

To verify and run this setup:

  

1. Run the script:
    
      
    
    Bash
    
    ```
    node index.js
    ```
    
2. Verify the output printed to stdout matches valid HTML.
    
      
    
3. Check your project directory to confirm `output.html` was created with the fully evaluated structure (containing the `<ul>` list and evaluated values rather than raw `<% %>` tags).

---


**Yes, exactly—when using EJS in a standard web architecture, the server renders the HTML before sending it to the browser.**

  

This paradigm is known as **Server-Side Rendering (SSR)**.

  

### How the Flow Works Step-by-Step

```
[1. Client Browser]  ---> (HTTP Request) --->  [2. Node.js Server]
                                                    |
                                          (Combines .ejs + Data)
                                                    |
                                          (Executes JS in template)
                                                    |
[1. Client Browser]  <--- (Raw HTML String) <--- [3. Evaluated HTML Output]
```

1. **The Request:** The user's browser requests a route (e.g., `GET /profile`).
    
      
    
2. **Server-Side Execution:** The Node.js server fetches data from a database or API, loads the `.ejs` file, and executes all JavaScript code inside the `<% %>` tags on the server CPU.
    
      
    
3. **The Response:** The server converts the template into a plain HTML string (e.g., `<h1>Hello, Raul</h1>`) and sends that final string over HTTP to the browser.
    
      
    
4. **Client Rendering:** The browser receives pure HTML and CSS, rendering it immediately without executing any of the EJS logic.
    
      
    

### Key Comparison: Server-Side vs. Client-Side Rendering

|**Feature**|**Server-Side Rendering (EJS)**|**Client-Side Rendering (React, Vue, Plain JS fetch)**|
|---|---|---|
|**Where JS Runs**|On the Node.js server|In the user's web browser|
|**Browser Receives**|Fully populated, static HTML|Empty HTML Shell (`<div id="root"></div>`) + JS bundles|
|**Database Access**|Direct access to server databases and secure environment variables|Cannot access databases directly; must call REST/GraphQL APIs|
|**SEO Impact**|Excellent (search engines index ready-to-read HTML immediately)|Requires client-side script execution or pre-rendering setups|

### Browser-Side EJS Exception

While 95%+ of EJS usage happens on the server via Node.js and Express, EJS can technically run inside a browser environment if you load the `ejs.js` bundle via a script tag:

  

HTML

```
<script src="ejs.js"></script>
<script>
  // Runs client-side in the browser
  let html = ejs.render('<h1><%= name %></h1>', { name: 'Raul' });
  document.body.innerHTML = html;
</script>
```

However, running EJS on the client side is rarely done in modern web development, as frameworks like React, Svelte, or Vue are designed specifically for client-side state management and DOM updates.


---


You are completely spot on—**for a purely static website hosted on a simple server (like GitHub Pages, Netlify, or Apache without Node.js), running EJS at runtime on every request makes no sense.**

  

Static sites don't have a live Node.js server running to evaluate `<% %>` tags on the fly. However, developers still use EJS for static websites in **build-time static site generation**.

  

### How EJS is Used for Static Sites

Instead of rendering dynamically when a user visits the page, EJS runs **once on your local machine or during a build step (CI/CD)** to generate raw HTML files.

  

#### 1. Avoiding Duplicated HTML (Header, Footer, Navigation)

In plain HTML, if you have 20 pages, you must copy and paste the `<nav>` and `<footer>` into 20 separate files. If you change a link in the navbar, you have to manually edit 20 files.

  

With EJS, you write the layout once and use includes:

  

HTML

```
<!-- views/header.ejs -->
<nav>
  <a href="/">Home</a>
  <a href="/about.html">About</a>
  <a href="/contact.html">Contact</a>
</nav>
```

HTML

```
<!-- views/index.ejs -->
<!DOCTYPE html>
<html>
<body>
  <%- include('header') %>
  <h1>Welcome to my static site</h1>
</body>
</html>
```

#### 2. Generating Static Pages from JSON Data

If you have a portfolio or product list stored in a JSON file (`projects.json`), you can run a build script that loops through the array and generates fully static `.html` files for deployment.

  

### The Build Step Example

You run a script locally (or on GitHub Actions) before uploading your site:

  

JavaScript

```
// build.js
import ejs from 'ejs';
import fs from 'node:fs';

const template = fs.readFileSync('views/index.ejs', 'utf-8');
const data = { siteTitle: "My Portfolio", year: 2026 };

// 1. Compile EJS to plain HTML string
const outputHtml = ejs.render(template, data);

// 2. Save as static index.html
fs.writeFileSync('dist/index.html', outputHtml);
```

Once `dist/index.html` is generated, you deploy **only** the `dist` folder. The final web host only sees standard `.html` files—no server or Node.js required.

  

### Summary

- **Dynamic Web Apps:** EJS runs on a live Node.js server per request to inject user-specific data from a database.
    
      
    
- **Static Websites:** EJS runs as a **build tool** to assemble reusable components (headers, footers) and JSON data into final `.html` files before deployment.



----


Template engines like Pug exist to eliminate HTML boilerplate, add indentation-based syntax, or provide component modularity (`includes`/`partials`). Depending on whether you want **concise syntax**, **zero-server static compilation**, or **native modern standards**, here are the best options categorized by how they work:

  

### 1. Indentation-Based Syntax (Pug Alternatives)

If you like Pug’s clean, tagless syntax (no closing tags, CSS selectors for classes/IDs):

  

- **Slim / Haml:**
    
      
    - **How it works:** Originally from Ruby, both use indentation to construct HTML.
        
          
        
    - **Syntax:**
        
          
        
        Haml
        
        ```
        #main.container
          h1 Welcome
          p.intro Hello world
        ```
        
    - **Best for:** Projects using static site generators or backends like Ruby, Python, or PHP (via ports like `Phamlp`).
        
          
        
- **Emmet (HTML Abbreviation Expansion):**
    
      
    - **How it works:** Not a template engine, but a built-in text editor feature (VS Code, Zed, Sublime). You write shorthand CSS-like selectors and hit `Tab` to generate plain HTML instantly without installing any server or compiler tool.
        
          
        
    - **Syntax shorthand:** `div#main.container>h1{Welcome}+p.intro{Hello world}`
        
          
        
    - **Best for:** Writing standard `.html` files twice as fast without learning an abstraction language or setting up a build step.
        
          
        

### 2. Static Site Generators (Zero Runtime Server Needed)

If your goal is to write clean, component-based HTML (headers, footers, layouts) and compile it into static `.html` files at build time without needing a live server in production:

  

|**Tool**|**Syntax Style**|**How It Compiles**|**Ideal Use Case**|
|---|---|---|---|
|**11ty (Eleventy)**|Liquid, Nunjucks, Markdown, or Pug|Node.js script runs `npx @11ty/eleventy` locally to output static `.html` files to a `/dist` folder.|Pure static sites, blogs, and documentation with zero client JS added.|
|**Astro**|JSX-like syntax inside `.astro` files|Compiles HTML/CSS at build time. Supports importing reusable HTML/CSS components directly.|Content-driven sites that need component architecture without shipping heavy JavaScript frameworks.|
|**Hugo**|Go HTML Templates|Compiles thousands of pages in milliseconds via a single standalone binary.|Fast static site compilation with zero Node.js dependency.|

### 3. Native Modern Alternatives (No Build Step Required)

If you don't want to run build scripts or manage servers, modern browser standards solve the original problems Pug and EJS were created for:

  

- **Web Components (`<template>` & Custom Elements):**
    
      
    - Native browser standard for creating reusable HTML structures without any template engine or build tool.
        
          
        
- **Nunjucks / Liquid:**
    
      
    - Uses HTML-like tag syntax (`{{ variable }}`) instead of indentation, making it easier to read than EJS while remaining standard HTML. Works both on a server or as a static build compiler.
        
          
        

### Summary Recommendation

- **For writing faster HTML directly in your editor:** Use **Emmet** inside your code editor (zero setup).
    
      
    
- **For reusable headers/footers in static HTML files:** Use **11ty** or **Astro** to compile components into static `.html` files during build time.
    
      
    
- **For concise tagless syntax without XML brackets:** **Pug** remains the ecosystem standard in JavaScript, but **Slim/Haml** offer the exact same paradigm across other language stacks.


---


That is a great distinction. Your mental model captures how both frameworks approach component authoring: **11ty (Eleventy) behaves more like a structured box or pipeline**, whereas **Astro lets your HTML act as the baseline template itself**.

  

### 1. Eleventy (11ty): The "Content Engine" Box

11ty is engine-agnostic. It takes raw files (Markdown, Nunjucks, Liquid, Pug, EJS) and runs them through a pipeline box to output standard `.html`.

  

- **How it works:** You create a layout wrapper (a "box"), and feed content into it via Front Matter or templates.
    
      
    
- **Component Model:** 11ty doesn't use modern component syntax (like props or scoped JSX). Instead, it relies on template partials (`{% include "header.njk" %}`) or macro functions to wrap code.
    
      
    
- **Mental Model:** **Data + Template File $\rightarrow$ Output HTML**.
    
      
    

Markdown

```
---
layout: base.njk
title: My Page
---
# Hello World
This Markdown content is injected directly into the `base.njk` layout "box".
```

### 2. Astro: "HTML-First" with Full JavaScript Power

Astro uses an `.astro` file format that feels like standard HTML extended with JSX-like superpowers.

  

- **How it works:** Your `.astro` file _is_ standard HTML, but at the top, a code fence (`---`) allows server-side Node.js logic to execute before generating static HTML.
    
      
    
- **Component Model:** Astro lets you build HTML components and pass props directly, just like React, without needing a complex client-side JS runtime.
    
      
    
- **Mental Model:** **Enhanced HTML Component**.
    
      
    

Code snippet

```
---
// Server-side JavaScript runs here at build time
const { title } = Astro.props;
const items = ['Apple', 'Banana', 'Cherry'];
---

<!-- HTML is the main language -->
<html lang="en">
  <head>
    <title>{title}</title>
  </head>
  <body>
    <h1>Welcome to {title}</h1>
    <ul>
      {items.map(item => <li>{item}</li>)}
    </ul>
  </body>
</html>
```

### Key Comparison

|**Feature**|**Eleventy (11ty)**|**Astro**|
|---|---|---|
|**Primary Philosophy**|Process existing template languages (Nunjucks, Liquid, MD) into static HTML.|Write component-driven, HTML-first pages using `.astro` files.|
|**JavaScript Integration**|Data feeds into templates via JS data files or shortcodes.|Native JS expression inside HTML tags (`{variable}`).|
|**Component Architecture**|Modular includes, partials, and layout chaining.|Full HTML components with props and slot projection.|
|**Framework Islands**|Pure static output (no JS framework hydration by default).|Built-in "Islands" to embed React, Vue, or Svelte components inside static HTML.|

If you like writing clean HTML structures with component parameters and inline loops, Astro's `.astro` file format will feel much more direct than configuring traditional templating layouts in 11ty.




---

If your mental model for HTML preprocessors is **TypeScript $\rightarrow$ JavaScript** and **Sass $\rightarrow$ CSS**, you are looking for tools whose sole responsibility is to compile developer-friendly code down into pure, standard `.html` files.

  

Depending on whether you want **abbreviated syntax** (like Pug) or **enhanced HTML with reusable components** (like Astro), here are the top dedicated tools:

  

### 1. HTML Preprocessors (Syntax Alternatives)

#### **Pug (formerly Jade)**

- **The Analogy:** Pug is to HTML what Sass/Stylus is to CSS.
    
      
    
- **How it works:** Uses strict indentation and CSS-like selectors without closing tags. You run a compiler (`npx pug views -o dist`) to emit plain `.html` files.
    
      
    
- **Example:**
    
      
    
    Code snippet
    
    ```
    //- source.pug
    doctype html
    html(lang="en")
      head
        title Portfolio
      body
        main#content.container
          h1 Hello World
    ```
    
    **Compiles directly to:**
    
      
    
    HTML
    
    ```
    <!DOCTYPE html>
    <html lang="en">
      <head><title>Portfolio</title></head>
      <body>
        <main id="content" class="container">
          <h1>Hello World</h1>
        </main>
      </body>
    </html>
    ```
    

#### **Slim / Haml**

- **The Analogy:** The Ruby/Ecosystem equivalents to Pug.
    
      
    
- **How it works:** Indentation-based preprocessors popular in static site generators outside Node.js (like Jekyll or Middleman) that compile straight to `.html`.
    
      
    

### 2. Modern "HTML-First" Compilers (Astro & Eleventy)

If you want to write standard HTML syntax (with closing tags) but need **components, layouts, and loops** that compile into static HTML:

  

#### **Astro (Static Build Mode)**

- **How it works:** When you build an Astro project (`npx astro build`), its compiler strip-analyzes all Astro tags and executes top-level script fences on your machine, outputting pure `.html`, `.css`, and zero JavaScript to the `/dist` folder by default.
    
      
    
- **Why it fits:** You write `.astro` files (which look like enhanced HTML), pass props into components, and get pure HTML files as the deliverable.
    
      
    

#### **PostHTML (The "Babel" / "PostCSS" for HTML)**

- **The Analogy:** PostCSS for CSS $\rightarrow$ **PostHTML** for HTML.
    
      
    
- **How it works:** A lightweight plugin-based build tool that transforms HTML. You write standard `.html` files, but plugins let you use `<include src="./header.html">` or custom HTML attributes that compile into static HTML.
    

### Comparison Matrix

|**Tool**|**Input File**|**Output File**|**Best Feature**|
|---|---|---|---|
|**Pug**|`.pug`|`.html`|Indentation syntax; removes HTML boilerplate completely.|
|**Astro**|`.astro`|`.html`|Writing native HTML + CSS components that compile to pure HTML.|
|**PostHTML**|`.html`|`.html`|Adding `<include>` and component tags directly to plain HTML files via plugins.|
|**Emmet**|Editor Shorthand|`.html`|Instant HTML generation directly inside VS Code / Zed without build tools.|



---




Web Components let you create reusable custom HTML tags directly in the browser using three standard technologies: **Custom Elements**, **Shadow DOM**, and the `<template>` tag.

  

Because Web Components are a **runtime browser feature** (not a build-time compiler), including a shared HTML structure across multiple `.html` files without a build step requires defining your layout or navbar inside a standalone JavaScript module and importing it into each page.

  

### Part 1: Native Web Component Example

Here is how to create a reusable `<site-header>` custom element.

  

#### 1. Define the Component (`components/site-header.js`)

You define a JavaScript class that extends `HTMLElement`, attaches a Shadow DOM (so styles stay isolated), and clones the template content:

  

JavaScript

```
// Template definition using standard <template> tag string
const template = document.createElement('template');
template.innerHTML = `
  <style>
    :host {
      display: block;
      background-color: #1e1e2e;
      padding: 1rem;
      font-family: system-ui, sans-serif;
    }
    nav {
      display: flex;
      gap: 1.5rem;
    }
    a {
      color: #cdd6f4;
      text-decoration: none;
      font-weight: 500;
    }
    a:hover {
      color: #89b4fa;
    }
  </style>
  <nav>
    <a href="/">Home</a>
    <a href="/about.html">About</a>
    <a href="/contact.html">Contact</a>
  </nav>
`;

class SiteHeader extends HTMLElement {
  constructor() {
    super();
    // Attach Shadow DOM for CSS isolation
    const shadowRoot = this.attachShadow({ mode: 'open' });
    // Append the cloned template node
    shadowRoot.appendChild(template.content.cloneNode(true));
  }
}

// Register the custom tag name (must contain a hyphen)
customElements.define('site-header', SiteHeader);
```

#### 2. Use the Custom Element in Multiple `.html` Files

Now you can place `<site-header></site-header>` anywhere across `index.html`, `about.html`, or `contact.html` by importing the JS file.

  

**`index.html`**

  

HTML

```
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Home</title>
  <!-- Load the Web Component JS file -->
  <script type="module" src="./components/site-header.js"></script>
</head>
<body>

  <!-- Reusable Custom Element -->
  <site-header></site-header>

  <main>
    <h1>Home Page</h1>
    <p>Welcome to the site.</p>
  </main>

</body>
</html>
```

**`about.html`**

  

HTML

```
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>About</title>
  <script type="module" src="./components/site-header.js"></script>
</head>
<body>

  <site-header></site-header>

  <main>
    <h1>About Us</h1>
    <p>This is the about page content.</p>
  </main>

</body>
</html>
```

### Part 2: Alternative Client-Side Includes (Fetch API)

If you prefer to write pure `.html` files for your component partials (e.g., `header.html`) without writing custom JS classes, you can fetch the HTML file at runtime using standard JavaScript:

#### 1. The Component Partial (`header.html`)

HTML

```
<nav style="background: #333; padding: 1rem;">
  <a href="/" style="color: white; margin-right: 1rem;">Home</a>
  <a href="/about.html" style="color: white;">About</a>
</nav>
```

#### 2. Importing via Client-Side Fetch in `index.html`

HTML

```
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Home Page</title>
</head>
<body>

  <!-- Placeholder container -->
  <div id="header-include"></div>

  <main>
    <h1>Home Page</h1>
  </main>

  <script>
    // Fetch external HTML and inject it into the page
    fetch('./header.html')
      .then(response => response.text())
      .then(data => {
        document.getElementById('header-include').innerHTML = data;
      });
  </script>
</body>
</html>
```

### Trade-offs: Build-Time (Astro/Pug/PostHTML) vs. Native Web Components

|**Feature**|**Build-Time Compilers (Astro, PostHTML, Pug)**|**Web Components / Client Fetch**|
|---|---|---|
|**Execution Moment**|On your local machine or build server before deployment.|Live in the user's browser runtime.|
|**Output**|Single, ready-to-render `.html` file.|Requires client JavaScript to execute before the UI is complete.|
|**SEO & Performance**|Immediate rendering with zero Layout Shift (CLS).|Slight delay before component mounts (potential flash of unstyled content).|
|**Build Tools Needed**|Yes (Node.js, Astro CLI, or PostHTML).|**None** (runs natively in all modern browsers).|



---


### Web Components with Custom Attributes and Slots

Web Components become truly dynamic through two primary features:

  

1. **Attributes (`observedAttributes` & `attributeChangedCallback`):** Pass primitive data (strings, status flags, titles) into the component and automatically re-render when they change.
    
      
    
2. **Slots (`<slot>`):** Project complex HTML markup directly from the light DOM into specific areas inside the shadow DOM.
    
      
    

### Step 1: The Component Definition (`user-card.js`)

JavaScript

```
const template = document.createElement('template');
template.innerHTML = `
  <style>
    :host {
      display: block;
      font-family: system-ui, sans-serif;
    }
    .card {
      border: 1px solid #e0e0e0;
      border-radius: 8px;
      padding: 1.25rem;
      max-width: 350px;
      background: #ffffff;
      box-shadow: 0 2px 6px rgba(0,0,0,0.05);
    }
    .header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 0.75rem;
    }
    .name {
      margin: 0;
      font-size: 1.25rem;
      color: #111827;
    }
    .badge {
      font-size: 0.75rem;
      padding: 0.2rem 0.5rem;
      border-radius: 9999px;
      font-weight: 600;
      text-transform: uppercase;
    }
    .badge[data-status="active"] {
      background: #d1fae5;
      color: #065f46;
    }
    .badge[data-status="inactive"] {
      background: #fee2e2;
      color: #991b1b;
    }
    .bio {
      color: #4b5563;
      font-size: 0.95rem;
      line-height: 1.5;
    }
    .actions {
      margin-top: 1rem;
      padding-top: 0.75rem;
      border-top: 1px solid #f3f4f6;
    }
  </style>

  <div class="card">
    <div class="header">
      <h3 class="name" id="user-name">Unknown User</h3>
      <span class="badge" id="user-status">offline</span>
    </div>

    <!-- Default Slot: Captures un-named light DOM children for the bio -->
    <div class="bio">
      <slot>No biography provided.</slot>
    </div>

    <!-- Named Slot: Captures specific elements meant for the actions footer -->
    <div class="actions">
      <slot name="actions"></slot>
    </div>
  </div>
`;

class UserCard extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }

  // 1. Declare which attributes to monitor for live changes
  static get observedAttributes() {
    return ['name', 'status'];
  }

  // 2. Lifecycle hook called when an observed attribute changes
  attributeChangedCallback(attrName, oldValue, newValue) {
    if (oldValue === newValue) return;
    this.render();
  }

  // 3. Update shadow DOM nodes based on current attribute values
  render() {
    const nameAttr = this.getAttribute('name') || 'Unknown User';
    const statusAttr = this.getAttribute('status') || 'inactive';

    const nameEl = this.shadowRoot.getElementById('user-name');
    const statusEl = this.shadowRoot.getElementById('user-status');

    if (nameEl) nameEl.textContent = nameAttr;
    if (statusEl) {
      statusEl.textContent = statusAttr;
      statusEl.setAttribute('data-status', statusAttr);
    }
  }

  connectedCallback() {
    this.render();
  }
}

customElements.define('user-card', UserCard);
```

### Step 2: Usage in HTML (`index.html`)

HTML

```
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Web Component Slots & Attributes</title>
  <script type="module" src="./user-card.js"></script>
</head>

<body>
  <h1>User Directory</h1>

  <!-- Component Instance 1 -->
  <user-card name="Raul" status="active">
    <!-- Default Slot Content -->
    <p>Software Engineer building full-stack applications with <strong>JavaScript</strong> and <strong>Node.js</strong>.</p>
    
    <!-- Named Slot Content -->
    <button slot="actions" onclick="alert('Messaging Raul...')">Send Message</button>
  </user-card>

  <br>

  <!-- Component Instance 2 -->
  <user-card name="Alex" status="inactive">
    <!-- Default Slot Content -->
    <p>Product designer exploring spatial UI components.</p>
    
    <!-- Named Slot Content -->
    <a slot="actions" href="/profiles/alex">View Profile</a>
  </user-card>
</body>
</html>
```

### How Data Passing Works

- **Custom Attributes (`name="Raul" status="active"`):**
    
    Handled internally by `attributeChangedCallback`. Updating an attribute dynamically via JavaScript (`document.querySelector('user-card').setAttribute('status', 'inactive')`) immediately updates the internal shadow DOM without touching slotted content.
    
      
    
- **Default Slot (`<slot>`):**
    
    Any child HTML placed inside `<user-card>...</user-card>` that does _not_ specify a `slot` attribute is automatically rendered into the default `<slot>` element inside the card body.
    
      
    
- **Named Slot (`<slot name="actions">`):**
    
    Elements carrying `slot="actions"` are projected directly into the `.actions` container at the bottom of the card, preserving their interactive functionality and event listeners.


----


The reason people say **"HTML doesn't have native includes"** is because there is no pure HTML tag like `<include src="header.html">` that works natively across browsers without running a server or executing JavaScript.

  

### Clarifying HTML "Includes": What Exists vs. What Doesn't

- **What HTML does NOT have natively:**
    
    A declarative markup tag parsed by the browser engine (e.g., `<include src="...">` or `<import src="...">`). Modern browsers do not process external file stitching out of the box through standard HTML markup alone.
    
      
    
- **What HTML/JS DOES have (The Vanilla Workarounds):**
    
      
    1. **JavaScript `fetch()` API:** Loads the external `.html` string and inserts it via DOM manipulation (`innerHTML`).
        
          
        
    2. **Web Components (`<template>` & Shadow DOM):** Wraps HTML in JS modules to create reusable elements like `<site-header>`.
        
          
        
    3. **`<iframe>` Tag:** Embeds an entire isolated browsing context. (Not a true layout include, as it breaks CSS styling, layouts, and accessibility).
        
          
        
    4. **Server-Side Includes (SSI):** Ancient server directives like `<!--#include file="header.html" -->`, which require an Apache/Nginx web server to execute before sending HTML to the client.
        
          
        

### Official Documentation Links for HTML Preprocessors & Components

Official documentation for each tool mentioned:

  

- **Pug:** [Pug Official Documentation](https://pugjs.org/api/getting-started.html)
    
      
    
- **Astro:** [Astro Components Documentation](https://docs.astro.build/en/basics/astro-components/)
    
      
    
- **PostHTML:** [PostHTML GitHub & Plugin Ecosystem](https://github.com/posthtml/posthtml)
    
      
    
- **Emmet:** [Emmet Documentation & Cheat Sheet](https://docs.emmet.io/)
    
      
    
- **Nunjucks:** [Mozilla Nunjucks Template Engine Docs](https://mozilla.github.io/nunjucks/)
    
      
    
- **Liquid:** [Shopify Liquid Documentation](https://shopify.github.io/liquid/)
    
      
    
- **Web Components (MDN):** [MDN Web Docs - Web Components](https://developer.mozilla.org/en-US/docs/Web/API/Web_components)
    
      
    
- **HTML `<template>` Tag (MDN):** [MDN Web Docs - Content Template Element](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/template)


---


The modern web landscape has shifted away from standalone template engines (like EJS or raw Pug) toward unified, component-based frameworks. Both enterprise environments and freelance developers rely on a clear set of standards depending on whether a project is purely static or requires dynamic server/client interactions.

  

### Modern Web Stack Taxonomy

#### 1. Static Sites & Content-Heavy Projects (Blogs, Marketing, Portfolios)

|**Tool**|**Core Stack**|**Best For**|**Industry Adoption & Freelance Fit**|
|---|---|---|---|
|**Astro**|HTML / JS / Any Framework|Content sites, marketing pages, documentation|**Top Freelance Choice.** Delivers pure static HTML by default with zero JS client overhead, but allows embedding React/Vue components when needed.|
|**11ty (Eleventy)**|JS / Nunjucks / Liquid / MD|Pure static generation, lightweight blogs|Popular among minimalist developers who want zero JavaScript build frameworks in production.|
|**Hugo**|Go / Go Templates|Massive static documentation, ultra-fast builds|Popular in high-volume enterprise docs (1,000+ pages compiled in milliseconds).|

#### 2. Dynamic, Full-Stack & Enterprise Applications (SaaS, E-commerce, Dashboards)

|**Tool**|**Core Stack**|**Best For**|**Industry Adoption & Freelance Fit**|
|---|---|---|---|
|**Next.js**|React / Node.js|Enterprise Web Apps, E-commerce, SaaS|**The Industry Standard.** Dominates mid-to-large company tech stacks for hybrid SSR (Server-Side Rendering) and static generation.|
|**Nuxt**|Vue.js / Node.js|Enterprise Vue applications|Primary full-stack choice for agencies and teams aligned with Vue.|
|**Laravel / PHP**|PHP + Blade (or Inertia + Vue/React)|Traditional full-stack web applications|**Top Freelance Choice.** Remains exceptionally dominant for client work needing CMS functionality, admin panels, and rapid backend setup.|

### Industry vs. Freelance Recommendations

#### For Industry / Enterprise Work

- **Dominant Stack:** **Next.js (React)** or **Nuxt (Vue)** on the frontend with Node.js/Java/Go/Python backends.
    
      
    
- **Why:** Enterprise teams prioritize large talent pools, standardized component ecosystems, deep TypeScript integration, and hybrid rendering strategies (combining static caching with live server-side data fetching).
    
      
    

#### For Freelance Developers

1. **Static / Client Marketing Sites: Astro**
    
      
    - **Why:** Fast build times, zero client-side JS overhead out of the box, excellent SEO performance, and freedom to write clean, HTML-first component code.
        
          
        
2. **Dynamic / Client Admin Apps: Laravel or Next.js**
    
      
    - **Why:** Fast turnarounds, mature deployment pipelines (Vercel, Netlify, DigitalOcean), and full control over database-driven user interactions.





---


To give you an exact, zero-guesswork tech stack recommendation, I need a few quick details about what you are planning to build.

  

Please share:

  

1. **Project Category:** Is it a marketing website/portfolio, a SaaS web application, an e-commerce store, a content portal/documentation site, or an internal dashboard?
    
      
    
2. **Data & Server Needs:** Will the site need a database, user authentication (logins), and dynamic user input, or is it strictly static content (read-only)?
    
      
    
3. **Primary Priorities:** What matters most for this project? (e.g., SEO performance, maximum developer speed, zero hosting costs, long-term scalability, or minimal maintenance).
    
      
    

Once you outline these goals, I'll provide a complete, tailor-made architecture recommendation (frontend, backend/SSR layer, database, hosting, and build tools).




----


The ideal tech stack for a fast content website with a blog and marketing pages focuses on **zero client-side JavaScript overhead**, **instant build-time static HTML compilation**, **effortless content editing**, and **zero-cost hosting**.

  

### Recommended Stack Overview

|**Layer**|**Recommended Tool**|**Why It Fits**|
|---|---|---|
|**Frontend Framework**|**Astro**|Compiles `.astro` files to pure HTML/CSS with 0kB JavaScript shipped by default. Native markdown/MDX integration for blogs.|
|**Styling**|**Tailwind CSS**|Rapid, utility-first layout creation for marketing pages without writing verbose custom CSS classes.|
|**Content Management**|**Markdown / MDX** _(Local)_ or **Decap CMS / Sanity** _(Headless)_|Content collections built right into Astro validate schema, frontmatter, and assets automatically at build time.|
|**Hosting & CDN**|**Cloudflare Pages** or **Vercel**|Free global edge deployment, instant build triggers on git commits, and sub-100ms global response times.|
|**Analytics & Forms**|**Plausible / Cloudflare Web Analytics** + **Web3Forms / Formspree**|Privacy-focused tracking without heavy scripts, plus serverless contact form submissions.|

### Architecture & Folder Structure

Astro’s native **Content Collections** handle blog posts using strictly typed frontmatter while allowing marketing pages to remain clean HTML/CSS components.

  

Plaintext

```
my-website/
├── src/
│   ├── components/       # Reusable layout parts (Header.astro, Footer.astro)
│   ├── content/
│   │   └── blog/         # Markdown/MDX blog posts (.md or .mdx)
│   │       ├── post-1.md
│   │       └── post-2.md
│   ├── layouts/          # Global HTML shells (BaseLayout.astro)
│   └── pages/
│       ├── index.astro   # Homepage (Marketing)
│       ├── about.astro   # About page
│       └── blog/
│           ├── index.astro        # Blog listing page
│           └── [ ...slug ].astro  # Dynamic SSG blog post route
├── public/               # Static assets (images, favicon, robots.txt)
└── astro.config.mjs
```

### Key Technical Implementation Details

#### 1. Blog Post Schema Definition (`src/content/config.ts`)

Astro uses Zod out of the box to enforce strict frontmatter validation for blog posts during build time:

  

TypeScript

```
import { defineCollection, z } from 'astro:content';

const blogCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.date(),
    author: z.string().default('Admin'),
    image: z.string().optional(),
    tags: z.array(z.string()).default([]),
  }),
});

export const collections = {
  blog: blogCollection,
};
```

#### 2. Dynamic Blog Route Generation (`src/pages/blog/[...slug].astro`)

Astro pre-renders all blog posts into static HTML files during build time using `getStaticPaths()`:

  

Code snippet

```
---
import { getCollection } from 'astro:content';
import BaseLayout from '../../layouts/BaseLayout.astro';

export async function getStaticPaths() {
  const posts = await getCollection('blog');
  return posts.map(entry => ({
    params: { slug: entry.slug },
    props: { entry },
  }));
}

const { entry } = Astro.props;
const { Content } = await entry.render();
---

<BaseLayout title={entry.data.title} description={entry.data.description}>
  <article class="max-w-3xl mx-auto py-12 px-4">
    <header class="mb-8">
      <h1 class="text-4xl font-bold tracking-tight">{entry.data.title}</h1>
      <p class="text-gray-500 text-sm mt-2">
        Published on {entry.data.pubDate.toLocaleDateString()} by {entry.data.author}
      </p>
    </header>
    <div class="prose prose-lg">
      <Content />
    </div>
  </article>
</BaseLayout>
```

### Why This Stack Outperforms Alternatives

1. **Lighthouse 100/100 Scores:** Because Astro strips away all JavaScript unless explicitly requested via an island component (`client:load`), search engine crawlers see pure HTML instantly.
    
      
    
2. **Maintenance-Free:** No databases (like PostgreSQL or MySQL) to manage, backup, or patch for security updates.
    
      
    
3. **Infinite Scaling:** Static `.html` files served from global CDN edge networks can handle millions of hits concurrently with near-zero latency and $0 hosting bills.



---



The ideal tech stack for a fast content website with a blog and marketing pages focuses on **zero client-side JavaScript overhead**, **instant build-time static HTML compilation**, **effortless content editing**, and **zero-cost hosting**.

  

### Recommended Stack Overview

|**Layer**|**Recommended Tool**|**Why It Fits**|
|---|---|---|
|**Frontend Framework**|**Astro**|Compiles `.astro` files to pure HTML/CSS with 0kB JavaScript shipped by default. Native markdown/MDX integration for blogs.|
|**Styling**|**Tailwind CSS**|Rapid, utility-first layout creation for marketing pages without writing verbose custom CSS classes.|
|**Content Management**|**Markdown / MDX** _(Local)_ or **Decap CMS / Sanity** _(Headless)_|Content collections built right into Astro validate schema, frontmatter, and assets automatically at build time.|
|**Hosting & CDN**|**Cloudflare Pages** or **Vercel**|Free global edge deployment, instant build triggers on git commits, and sub-100ms global response times.|
|**Analytics & Forms**|**Plausible / Cloudflare Web Analytics** + **Web3Forms / Formspree**|Privacy-focused tracking without heavy scripts, plus serverless contact form submissions.|

### Architecture & Folder Structure

Astro’s native **Content Collections** handle blog posts using strictly typed frontmatter while allowing marketing pages to remain clean HTML/CSS components.

  

Plaintext

```
my-website/
├── src/
│   ├── components/       # Reusable layout parts (Header.astro, Footer.astro)
│   ├── content/
│   │   └── blog/         # Markdown/MDX blog posts (.md or .mdx)
│   │       ├── post-1.md
│   │       └── post-2.md
│   ├── layouts/          # Global HTML shells (BaseLayout.astro)
│   └── pages/
│       ├── index.astro   # Homepage (Marketing)
│       ├── about.astro   # About page
│       └── blog/
│           ├── index.astro        # Blog listing page
│           └── [ ...slug ].astro  # Dynamic SSG blog post route
├── public/               # Static assets (images, favicon, robots.txt)
└── astro.config.mjs
```

### Key Technical Implementation Details

#### 1. Blog Post Schema Definition (`src/content/config.ts`)

Astro uses Zod out of the box to enforce strict frontmatter validation for blog posts during build time:

  

TypeScript

```
import { defineCollection, z } from 'astro:content';

const blogCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.date(),
    author: z.string().default('Admin'),
    image: z.string().optional(),
    tags: z.array(z.string()).default([]),
  }),
});

export const collections = {
  blog: blogCollection,
};
```

#### 2. Dynamic Blog Route Generation (`src/pages/blog/[...slug].astro`)

Astro pre-renders all blog posts into static HTML files during build time using `getStaticPaths()`:

  

Code snippet

```
---
import { getCollection } from 'astro:content';
import BaseLayout from '../../layouts/BaseLayout.astro';

export async function getStaticPaths() {
  const posts = await getCollection('blog');
  return posts.map(entry => ({
    params: { slug: entry.slug },
    props: { entry },
  }));
}

const { entry } = Astro.props;
const { Content } = await entry.render();
---

<BaseLayout title={entry.data.title} description={entry.data.description}>
  <article class="max-w-3xl mx-auto py-12 px-4">
    <header class="mb-8">
      <h1 class="text-4xl font-bold tracking-tight">{entry.data.title}</h1>
      <p class="text-gray-500 text-sm mt-2">
        Published on {entry.data.pubDate.toLocaleDateString()} by {entry.data.author}
      </p>
    </header>
    <div class="prose prose-lg">
      <Content />
    </div>
  </article>
</BaseLayout>
```

### Why This Stack Outperforms Alternatives

1. **Lighthouse 100/100 Scores:** Because Astro strips away all JavaScript unless explicitly requested via an island component (`client:load`), search engine crawlers see pure HTML instantly.
    
      
    
2. **Maintenance-Free:** No databases (like PostgreSQL or MySQL) to manage, backup, or patch for security updates.
    
      
    
3. **Infinite Scaling:** Static `.html` files served from global CDN edge networks can handle millions of hits concurrently with near-zero latency and $0 hosting bills.





---
That balance is the exact holy grail many developers look for: wanting the **clean, bracketless, line-based syntax of Pug**, but also wanting **modern features like Sass, TypeScript, and component-based static builds**.

  

The good news is that you don't actually have to choose between Astro and Pug—**you can combine them, or use a tool that natively bridges both world views**.

  

### Option 1: Use Pug Syntax _Inside_ Astro

Astro natively supports template integration through plugins. You can configure Astro to process `.pug` files or use Pug directly inside your component templates while keeping Astro's build pipeline, Sass, and TypeScript.

  

#### Configuration (`astro.config.mjs`)

Install the Pug plugin:

  

Bash

```
npm install -D @astrojs/pug
```

#### Astro Component with Pug (`src/components/Card.astro`)

You get Pug's indentation syntax, but still keep Astro's frontmatter for TypeScript logic and Sass in `<style>` blocks:

  

Code snippet

```
---
// Frontmatter: Pure TypeScript logic
interface Props {
  title: string;
  status: 'active' | 'inactive';
}

const { title, status } = Astro.props;
const items: string[] = ['Sass Support', 'TypeScript', 'Zero Tags'];
---

template(lang="pug")
  .card
    h2.title= title
    span.badge(data-status=status)= status
    ul.item-list
      each item in items
        li.item= item

style(lang="scss")
  // Sass / SCSS support built right in
  .card {
    border: 1px solid #e0e0e0;
    padding: 1.5rem;

    .title {
      font-size: 1.5rem;
      color: #333;
    }

    .badge {
      &[data-status="active"] {
        color: green;
      }
    }
  }
```

### Option 2: Eleventy (11ty) + Pug + Sass + TypeScript

If Astro feels like too heavy of a framework structure, **Eleventy (11ty)** treats `.pug` files as first-class citizens.

  

- **HTML Syntax:** You write `.pug` files natively (no closing tags, CSS shorthand like `.container#main`).
    
      
    
- **Sass & TS:** 11ty uses small build plugins (e.g., `eleventy-plugin-sass`) to compile Sass to CSS and bundle TypeScript into static assets.
    
      
    
- **Output:** Pure static HTML files with zero JavaScript framework overhead.
    
      
    

Code snippet

```
//- src/index.pug
doctype html
html(lang="en")
  head
    title= siteTitle
    link(rel="stylesheet" href="/css/style.css")
  body
    main.container
      h1 Clean Indented Syntax
      p No HTML tags to close, full SCSS and TS asset integration.
```

### Option 3: Vite + `vite-plugin-pug` (Lightweight Custom Setup)

If you want the simplest possible build setup without a full static site generator framework:

  

1. **Vite** natively handles **Sass** (just install `sass`) and **TypeScript** out of the box with zero configuration.
    
      
    
2. Add `vite-plugin-pug` to transform `.pug` files into `.html` files during development and build.
    
      
    

This gives you an ultra-fast dev server where you write Pug + SCSS + TS, and Vite builds standard, minified `.html`/`.css`/`.js` static assets.

  

### Summary Recommendation

- **If you love Astro's component system and static output:** Use **Astro with `template(lang="pug")`**. It gives you the clean, bracketless Pug markup while preserving Sass styling and TypeScript props.
    
      
    
- **If you want pure `.pug` files as your page entries:** Use **11ty** or a **Vite + Pug** pipeline.



----



Tailwind CSS has become the industry standard for many projects because it solves CSS maintenance problems (like naming collisions, global style pollution, and giant CSS files), but **Tailwind does not make Sass obsolete.** They actually solve two completely different problems.

  

### Tailwind vs. Sass: What's the Difference?

|**Feature**|**Tailwind CSS (Utility-First)**|**Sass / SCSS (CSS Preprocessor)**|
|---|---|---|
|**Core Philosophy**|Style directly inside your markup using utility classes (`class="p-4 bg-blue-500"`).|Write structured, traditional CSS rules in separate files using variables, nesting, and mixins.|
|**Where Styles Live**|Inside the HTML / Pug component file.|In standalone `.scss` stylesheets.|
|**Main Advantage**|Ultra-fast inline styling; no need to create or name CSS classes like `.user-card-header-title`.|Powerful language features: math functions, color manipulation functions (`lighten()`, `darken()`), loops (`@for`, `@each`), and mixins.|
|**File Sizes**|Small build output because unused utilities are purged automatically.|Can grow large if nesting and mixins are overused without purging.|

### How Tailwind & Sass Compare with Pug

Tailwind with Pug provides a remarkably clean combination because Pug's CSS selector shorthand reduces utility class clutter:

  

#### Traditional HTML + Tailwind

HTML

```
<div class="flex items-center justify-between p-4 bg-slate-900 rounded-lg shadow-md hover:bg-slate-800 transition">
  <h2 class="text-xl font-bold text-white">Dashboard</h2>
  <button class="px-3 py-1 text-sm bg-blue-600 hover:bg-blue-500 text-white rounded">Action</button>
</div>
```

#### Pug + Tailwind (No Closing Tags or `class=""` Boilerplate)

In Pug, classes attach directly to tags using `.class-name` dots:

  

Code snippet

```
.flex.items-center.justify-between.p-4.bg-slate-900.rounded-lg.shadow-md.hover_bg-slate-800.transition
  h2.text-xl.font-bold.text-white Dashboard
  button.px-3.py-1.text-sm.bg-blue-600.hover_bg-blue-500.text-white.rounded Action
```

### Can You Use Tailwind AND Sass Together?

**Yes.** You do not have to choose one over the other.

  

Tailwind integrates directly into Sass using the `@apply` directive. If a list of utility classes gets too long inside your Pug markup, you can clean it up inside a Sass block using nested SCSS:

  

Code snippet

```
template(lang="pug")
  .custom-card
    h2.title Dashboard
    button.btn-primary Action

style(lang="scss")
  .custom-card {
    @apply flex items-center justify-between p-4 bg-slate-900 rounded-lg;

    .title {
      @apply text-xl font-bold text-white;
    }

    .btn-primary {
      @apply px-3 py-1 text-sm bg-blue-600 text-white rounded;
      &:hover {
        @apply bg-blue-500;
      }
    }
  }
```

### Which Should You Choose?

- **Choose Tailwind CSS** if you want to move quickly, skip coming up with custom class names, and keep your styles attached to your components.
    
      
    
- **Choose Sass (SCSS)** if you prefer writing traditional CSS rules, building complex design systems with loops and mixins, or working with standalone stylesheets.
    
      
    
- **Combine Astro + Pug + Tailwind** for an exceptionally clean HTML setup: concise, bracketless Pug templates paired with utility styling and static build performance.


---


### Yes, It Solves the "Vanilla" Web Stack Dilemma

Combining **Astro, Pug, Tailwind, TypeScript, and Sass** achieves the best balance for modern web development: **it gives you authoring ergonomics while keeping the client output as vanilla as possible.**

  

- **Zero Client JS Overhead:** Astro processes TypeScript, compiles Pug, extracts Sass, and outputs standard, static `.html` and `.css` files. The browser receives plain markup without needing a runtime framework (like React or Vue) to execute in the browser.
    
      
    
- **No HTML Boilerplate:** Pug eliminates opening/closing tags and angle brackets (`< >`).
    
      
    
- **No CSS Maintenance Hassles:** Tailwind eliminates class naming collisions (`.wrapper-card-title-v2`) and manages style purging automatically.
    
      
    

### How Tailwind Works on the Web (Since Browsers Only Read CSS)

Browsers cannot parse Tailwind utility strings directly. Tailwind operates entirely as a **build-time compiler (Just-In-Time / JIT Engine)**.

  

Here is what happens during development and build:

  

#### 1. The Source Code (What You Write in Pug)

You write utility class names inside your templates:

  

Code snippet

```
.flex.items-center.p-4.bg-blue-600.text-white
  h1.text-xl.font-bold Hello World
```

#### 2. The Tailwind Scanner & JIT Compiler (Build Step)

When Astro runs its build step (or dev server), the Tailwind compiler scans your project files (`.astro`, `.pug`, `.ts`), extracts every class string it finds, and matches it against its internal design engine.

  

- It sees `flex` $\rightarrow$ generates `.flex { display: flex; }`
    
      
    
- It sees `p-4` $\rightarrow$ generates `.p-4 { padding: 1rem; }`
    
      
    
- It sees `bg-blue-600` $\rightarrow$ generates `.bg-blue-600 { background-color: #2563eb; }`
    
      
    

#### 3. The Final Output (What the Browser Receives)

Tailwind converts **only the specific utility classes you actually used** into a single, highly compressed, standard `.css` stylesheet (often under 10–15 KB):

  

CSS

```
/* dist/styles.css (Standard CSS that the browser reads) */
.flex { display: flex; }
.items-center { align-items: center; }
.p-4 { padding: 1rem; }
.bg-blue-600 { background-color: #2563eb; }
.text-white { color: #fff; }
.text-xl { font-size: 1.25rem; line-height: 1.75rem; }
.font-bold { font-weight: 700; }
```

And your generated `index.html` simply links to that `.css` file via a standard `<link rel="stylesheet" href="/styles.css">` tag.

  

### Summary Flow

Plaintext

```
[ Your Source Code ]          [ Build-Time Compiler ]             [ Browser Output ]
.pug + Tailwind + TS   --->   Astro + Tailwind JIT Engine   --->   Pure .html + Pure .css
(Authoring Experience)            (Transformation Step)              (Zero-Framework Vanilla)
```

By the time your page loads in the browser, all preprocessors (Pug, Sass, TypeScript, Tailwind) have disappeared—leaving only clean, static HTML and CSS.



---


**No, you do not need a live server to render or run Tailwind.**

  

Just like Sass compiles down to static `.css` files using a build command, Tailwind works the exact same way. It is a build-time tool that generates standard static CSS.

  

Official documentation reference: [Tailwind CLI Documentation](https://tailwindcss.com/docs/installation/tailwind-cli)

  

### How to Run Tailwind Like Sass (Zero Server Needed)

You can run Tailwind directly from your terminal using `npx` or a standalone binary executable without configuring PostCSS or complex bundlers.

  

#### 1. The Standard `npx` Command (Requires Node.js)

Just like running `npx sass input.scss output.css`, you run the Tailwind CLI command:

  

Bash

```
# Build once for production (generates static output.css)
npx @tailwindcss/cli -i ./src/input.css -o ./dist/output.css --minify

# Watch mode during development (auto-recompiles on save)
npx @tailwindcss/cli -i ./src/input.css -o ./dist/output.css --watch
```

#### 2. The Standalone Executable (Zero Node.js Required)

Tailwind also releases a **Standalone Executable CLI** as a pre-compiled binary for Windows (`.exe`), macOS, and Linux.

  

If you don't even want Node.js or `npm` in your project, you can download the single executable file from GitHub and run it directly:

  

Bash

```
# Executing the downloaded standalone binary directly
./tailwindcss -i ./src/input.css -o ./dist/output.css --watch
```

### What Happens in the Build Step?

1. You create an input CSS file (`src/input.css`) with the Tailwind import:
    
      
    
    CSS
    
    ```
    @import "tailwindcss";
    ```
    
2. You run the CLI command (`npx @tailwindcss/cli -i ./src/input.css -o ./dist/output.css`).
    
      
    
3. The CLI scans your project files (`.pug`, `.html`, `.astro`), extracts the class names you used, generates pure standard CSS, and writes it to `./dist/output.css`.
    
      
    
4. You link `./dist/output.css` inside your HTML head:
    
      
    
    HTML
    
    ```
    <link rel="stylesheet" href="./dist/output.css">
    ```
    

Your production server receives **only static HTML and static CSS**.



---


**Yes, exactly—Tailwind outputs a standard, static `.css` file, so you do NOT need a server.**

  

### How It Works Behind the Scenes

1. **Compilation Step:**
    
    Tailwind runs **only on your local machine** (or build machine) during development. Its JIT (Just-In-Time) compiler scans your template files (e.g., `.pug`, `.html`, `.astro`), extracts the class names you used, and compiles them into a single, standard `.css` file (like `output.css`).
    
      
    
2. **Deployment:**
    
    When you upload your site to a web server (or static host like GitHub Pages, Netlify, or Cloudflare Pages), you deploy:
    
      
    - Your final static `.html` files
        
          
        
    - Your generated `.css` file
        
          
        
3. **In the Browser:**
    
    The browser receives standard HTML linked to standard CSS:
    
      
    
    HTML
    
    ```
    <link rel="stylesheet" href="output.css">
    ```
    
    No Node.js, no JavaScript runtime, and no backend server are required to interpret or serve Tailwind styles to the user.


---



Exactly—that is the key realization.

  

Tailwind is just a **CSS preprocessor and compiler with utility classes**.

  

Instead of writing rules line-by-line in a `.scss` file, you write utility names in your template (like `.flex.bg-blue-500` in Pug), and the Tailwind build tool compiles those into a standard, static `.css` file.

  

### The Complete "Vanilla-First" Pipeline

When you combine **Pug, Tailwind, and TypeScript** into static output (via Astro or a basic build script), here is what happens:

  

Plaintext

```
AUTHORING TIME (Your Code)              BUILD TIME (Local Compiler)          PRODUCTION (Browser)
----------------------------            --------------------------          --------------------
• Pug (.pug)                 ----->     Compiles down to          ----->    Pure HTML (.html)
• Tailwind classes           ----->     Extracts into             ----->    Pure CSS (.css)
• TypeScript (.ts)           ----->     Transpiles to             ----->    Pure JavaScript (.js)
```

By the time you deploy your project to a static host (like GitHub Pages, Cloudflare Pages, or Netlify), **all frameworks and build tools disappear**. The user's browser loads pure, native web standards with zero server execution required.



---


### Combining Sass and Tailwind in One Project

You can use both tools simultaneously because they operate at different stages of the styling pipeline.

  

During the build process, **Sass compiles first**, resolving your `@use`, `$variables`, `@mixin`, and nested blocks. Next, **Tailwind processes its utilities** (`@apply` or JIT classes) and outputs a single, standard `.css` file.

  

#### 1. In Astro Components

Inside an `.astro` or Pug component, you specify `lang="scss"` on the `<style>` tag while keeping Tailwind utility classes inside your HTML/Pug template. You can also mix `@apply` directly inside Sass code:

  

Code snippet

```
---
// Component logic (TypeScript)
const title = "My Component";
---

<!-- Template (Pug or HTML with Tailwind classes) -->
<div class="card p-6 bg-slate-900 rounded-xl shadow-lg">
  <h2 class="title text-2xl font-bold text-white">{title}</h2>
  <button class="btn-primary">Click Me</button>
</div>

<style lang="scss">
  // SCSS nesting mixed with Tailwind directives
  $primary-color: #2563eb;

  .card {
    border: 1px solid rgba($primary-color, 0.2);

    .btn-primary {
      // @apply pulls in Tailwind utilities inside SCSS blocks
      @apply px-4 py-2 text-white rounded-lg transition-colors;
      background-color: $primary-color;

      &:hover {
        background-color: darken($primary-color, 10%);
      }
    }
  }
</style>
```

#### 2. In Standalone File Pipelines

In a non-Astro project, you point Sass to your main stylesheet (e.g., `main.scss`). Your SCSS file imports Tailwind and uses custom mixins side-by-side:

  

SCSS

```
/* src/styles/main.scss */
@import "tailwindcss"; // Load Tailwind

$brand-accent: #ff4757;

@mixin flex-center {
  display: flex;
  align-items: center;
  justify-content: center;
}

.custom-hero {
  @include flex-center;
  @apply h-screen bg-slate-950 text-white;
  border-bottom: 3px solid $brand-accent;
}
```

### How Astro Validates Matched HTML/Pug Tags and CSS

Astro enforces valid HTML and CSS through **Abstract Syntax Trees (AST)** at compile time, eliminating syntax or closing-tag mismatches before anything reaches the browser.

  

Plaintext

```
[ Source File (.astro / .pug) ]
             │
             ▼
┌───────────────────────────┐
│   Astro Compiler (Rust)   │ ──► Parse HTML/Pug into an HTML AST
└───────────────────────────┘
             │
             ▼
┌───────────────────────────┐
│      Lightning CSS        │ ──► Parse CSS/SCSS into a CSS AST
└───────────────────────────┘
             │
             ▼
[ Mismatches or Syntax Errors Flagged Immediately at Build Time ]
```

#### 1. HTML / Pug Tag Matching Validation

When processing a component, the Astro compiler (written in Rust for speed) parses the markup into an **HTML AST (Abstract Syntax Tree)**.

  

- **With Standard HTML:** If you open a `<div>` and forget to close it, or close a `<section>` with `</div>`, the parser fails to construct a valid AST node tree and raises a build error with the exact line number.
    
      
    
- **With Pug:** Because Pug uses indentation syntax instead of closing tags, mismatched closing tags are structurally impossible. The Pug parser converts the indented structure directly into AST nodes.
    
      
    

#### 2. CSS / SCSS Validation & Class Verification

Astro passes all CSS and SCSS through **Lightning CSS** and Vite preprocessors:

  

- **Syntax Checking:** If an SCSS bracket is unclosed or a property is malformed, the SCSS parser immediately throws a build error.
    
      
    
- **Scoped Selector Isolation:** Astro automatically rewrites class names by attaching a unique hash (e.g., `.title` becomes `.title.astro-a1b2c3d4`). This guarantees that CSS defined in one component never accidentally affects another component.
    
      
    
- **TypeScript & Linter Diagnostics:** Tools like ESLint, Stylelint, and the Astro VS Code Extension inspect both the HTML AST and CSS AST concurrently, flagging unused selectors or broken class targets directly inside your editor.




---


### Step 1: Install Required Dependencies

Run the following command to install **Stylelint**, **Astro support**, **SCSS linting**, and **TypeScript** tooling:

  

Bash

```
npm install -D stylelint stylelint-config-standard-scss stylelint-config-html astro-eslint-parser typescript
```

### Step 2: Configure TypeScript for Astro and Pug

Astro ships with strict TypeScript support out of the box. Ensure your `tsconfig.json` extends Astro's base configuration so that `.astro` components and imported `.ts` files are type-checked properly.

  

JSON

```
{
  "extends": "astro/tsconfigs/strict",
  "compilerOptions": {
    "jsx": "preserve",
    "jsxImportSource": "astro"
  },
  "include": ["src/**/*.d.ts", "src/**/*.ts", "src/**/*.astro"]
}
```

_Note: For runtime type checking on CLI, execute `npx astro check` to validate all TypeScript blocks inside `.astro` files._

  

### Step 3: Configure Stylelint (`.stylelintrc.cjs`)

Create a `.stylelintrc.cjs` configuration file at the root of your project. This tells Stylelint how to parse SCSS syntax inside standard `.scss` files as well as extracted `<style lang="scss">` tags inside `.astro` components.

  

JavaScript

```
/** @type {import('stylelint').Config} */
module.exports = {
  extends: [
    // Recommended rules for standard SCSS syntax
    'stylelint-config-standard-scss',
    // Parsers to extract <style> blocks from HTML & Astro components
    'stylelint-config-html/astro'
  ],
  overrides: [
    {
      files: ['**/*.astro', '*.astro'],
      customSyntax: 'postcss-html'
    },
    {
      files: ['**/*.scss', '*.scss'],
      customSyntax: 'postcss-scss'
    }
  ],
  rules: {
    // Ignore custom Astro pseudo-selectors
    'selector-pseudo-class-no-unknown': [
      true,
      {
        ignorePseudoClasses: ['global']
      }
    ],
    // Allow Tailwind or SCSS @-rules
    'at-rule-no-unknown': null,
    'scss/at-rule-no-unknown': true
  }
};
```

### Step 4: Configure NPM Scripts in `package.json`

Add validation scripts to your `package.json` to execute type checks and style lints across your repository:

  

JSON

```
{
  "name": "astro-pug-scss-project",
  "scripts": {
    "dev": "astro dev",
    "build": "astro build",
    "check": "astro check",
    "lint:css": "stylelint \"src/**/*.{astro,scss,css}\"",
    "lint:css:fix": "stylelint \"src/**/*.{astro,scss,css}\" --fix"
  }
}
```

### Step 5: Verification (`src/components/Card.astro`)

Create a component featuring **TypeScript, Pug, and SCSS** to test linting:

  

Code snippet

```
---
// TypeScript type validation
interface Props {
  title: string;
  count?: number;
}

const { title, count = 0 } = Astro.props;
---

<!-- Pug Template Structure -->
template(lang="pug")
  .card
    h2.card-title= title
    p.card-count Item Count: #{count}

<!-- SCSS Style Block (Linted by Stylelint) -->
style(lang="scss")
  $primary-color: #2563eb;

  .card {
    padding: 1.5rem;
    border-radius: 0.5rem;
    border: 1px solid rgba($primary-color, 0.2);

    .card-title {
      font-size: 1.25rem;
      color: $primary-color;
    }

    .card-count {
      color: #64748b;
    }
  }
</style>
```

Execute `npm run check` to validate TypeScript and `npm run lint:css` to validate SCSS rules.



----


When building modern projects with **Astro, Pug, SCSS, and TypeScript**, your files combine four different languages into a single `.astro` component.

  

Without automated quality control, it’s easy for subtle bugs to slip through—such as invalid SCSS syntax, broken TypeScript types, or dead CSS rules. This tooling setup acts as your **automated code inspector** to catch errors as you write.

  

### Breakdown of Each Tool

Plaintext

```
       ┌─────────────────────────────────────────────────────────┐
       │                Your .astro Component                   │
       │                                                         │
       │  ---                                                    │
       │  const title: string = "Hello";  ◄─── TypeScript        │
       │  ---                                                    │
       │                                                         │
       │  template(lang="pug")            ◄─── Astro Compiler    │
       │    h1= title                                            │
       │                                                         │
       │  style(lang="scss")              ◄─── Stylelint + SCSS │
       │    $color: #2563eb;                                     │
       │    h1 { color: $color; }                                │
       └─────────────────────────────────────────────────────────┘
```

#### 1. Stylelint (The CSS Linter)

- **What it is:** Just as ESLint inspects JavaScript code for errors, **Stylelint** inspects CSS and SCSS code.
    
      
    
- **What it catches:**
    
      
    - Invalid CSS values (e.g., `color: bluuuue;` or missing semicolons).
        
          
        
    - Duplicate selectors or properties in the same block.
        
          
        
    - Violations of team conventions (e.g., enforcing `kebab-case` for class names, or banning deep nesting).
        
          
        
- **Why you need it:** Without Stylelint, a broken CSS rule silently fails in the browser, leaving your page unstyled without raising a explicit console error.
    
      
    

#### 2. Astro Support (`stylelint-config-html` / `postcss-html`)

- **What it is:** A parser plugin that allows Stylelint to read `.astro` files.
    
      
    
- **Why you need it:** Stylelint is built to read standard `.css` files. If you point it at a `.astro` file, it will get confused by the TypeScript frontmatter (`---`) and Pug markup. This plugin tells Stylelint: _"Ignore the top script and HTML markup—skip straight to the `<style>` tag at the bottom and check the SCSS inside."_
    
      
    

#### 3. SCSS Linting (`stylelint-config-standard-scss`)

- **What it is:** A specialized set of rules designed for SCSS preprocessor features.
    
      
    
- **What it catches:**
    
      
    - Broken SCSS syntax (like unclosed `@mixin` or `@include` blocks).
        
          
        
    - Misuse of variables or invalid SCSS function calls.
        
          
        
    - Excessive nesting (e.g., nesting 6 levels deep, which pollutes CSS specificity).
        
          
        

#### 4. TypeScript Tooling & `astro check`

- **What it is:** Type-checking integration for your project.
    
      
    
- **What it catches:**
    
      
    - Passing wrong data types to component props (e.g., passing a `string` where a `number` is expected).
        
          
        
    - Accessing variables or properties that don't exist.
        
          
        
    - Unused variables or missing imports inside the `---` script block.
        
          
        
- **How `astro check` works:** Running `npx astro check` scans your entire project, parses all `.astro` files, extracts the TypeScript logic, and verifies that every component interface and prop contract is satisfied across the repository before building for production.
    

### Summary

|**Tool**|**Focus Area**|**Primary Benefit**|
|---|---|---|
|**TypeScript (`astro check`)**|Script logic & Props (`---`)|Ensures data passing between components is type-safe and bug-free.|
|**Astro Compiler**|Template structure (`Pug` / `HTML`)|Validates template syntax and compiles it down to static HTML.|
|**Stylelint + SCSS Plugins**|Styling (`<style lang="scss">`)|Prevents invalid CSS/SCSS syntax, dead code, and broken style rules.|




---


To run automated checks every time code is pushed to your repository or a Pull Request is opened, you create a **GitHub Actions workflow file** in your project directory at `.github/workflows/ci.yml`.

  

### Step 1: Create the Workflow File (`.github/workflows/ci.yml`)

Add the following YAML configuration file to your repository:

  

YAML

```
name: CI Checks

# Trigger on pushes to main/master branches or when opening Pull Requests
on:
  push:
    branches: [main, master]
  pull_request:
    branches: [main, master]

jobs:
  lint-and-check:
    name: Type Check & Stylelint
    runs-on: ubuntu-latest

    permissions:
      contents: read

    steps:
      # 1. Checkout the source code from GitHub
      - name: Checkout repository
        uses: actions/checkout@v4

      # 2. Setup Node.js with dependency caching for faster execution
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: 'npm' # Automatically caches node_modules via package-lock.json

      # 3. Clean install exact dependencies declared in package-lock.json
      - name: Install dependencies
        run: npm ci

      # 4. Run Astro TypeScript type checking across all components
      - name: Run TypeScript Check
        run: npm run check

      # 5. Run Stylelint across SCSS and Astro style blocks
      - name: Run Stylelint
        run: npm run lint:css
```

### Step 2: Ensure Your `package.json` Has the Right Scripts

For the workflow to execute the step commands, verify your `package.json` includes both the `check` and `lint:css` scripts:

  

JSON

```
{
  "name": "astro-pug-scss-project",
  "version": "1.0.0",
  "scripts": {
    "dev": "astro dev",
    "build": "astro build",
    "check": "astro check",
    "lint:css": "stylelint \"src/**/*.{astro,scss,css}\""
  }
}
```

### Step 3: Test the Setup

1. Commit and push the new `.github/workflows/ci.yml` file to your GitHub repository:
    
      
    
    Bash
    
    ```
    git add .github/workflows/ci.yml package.json
    git commit -m "ci: add GitHub Actions workflow for TypeScript and Stylelint"
    git push origin main
    ```
    
2. Open your repository on GitHub and click on the **Actions** tab.
    
      
    
3. You will see the **CI Checks** workflow running automatically. If TypeScript or Stylelint encounters any errors, the job step will fail and highlight the exact file and line number in the GitHub log.



----




To ensure that your code not only passes code quality checks (TypeScript and Stylelint) but also compiles cleanly into static HTML/CSS, add a final **`astro build`** step at the end of your GitHub Actions job.

  

### Updated Workflow (`.github/workflows/ci.yml`)

Here is the updated workflow file with step-by-step comments:

  

YAML

```
name: CI Checks & Build

# Trigger on pushes or PRs to main/master
on:
  push:
    branches: [main, master]
  pull_request:
    branches: [main, master]

jobs:
  lint-check-build:
    name: Type Check, Stylelint & Astro Build
    runs-on: ubuntu-latest

    permissions:
      contents: read

    steps:
      # 1. Checkout the source code from GitHub
      - name: Checkout repository
        uses: actions/checkout@v4

      # 2. Setup Node.js with dependency caching
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: 'npm'

      # 3. Clean install exact dependencies declared in package-lock.json
      - name: Install dependencies
        run: npm ci

      # 4. Run Astro TypeScript type checking across all components
      - name: Run TypeScript Check
        run: npm run check

      # 5. Run Stylelint across SCSS and Astro style blocks
      - name: Run Stylelint
        run: npm run lint:css

      # 6. Verify Astro static build completes without errors
      - name: Run Astro Build Test
        run: npm run build
```

### Why Order Matters

1. **`npm ci`**: Installs your dependencies quickly and deterministically using `package-lock.json`.
    
      
    
2. **`npm run check` & `npm run lint:css`**: Fails fast if there are syntax errors, broken SCSS rules, or mismatched TypeScript types before wasting time on a full build.
    
      
    
3. **`npm run build`**: Runs `astro build` to compile all Pug templates, SCSS styles, and TypeScript logic into the final static `/dist` bundle. If a template import is broken or an asset route is missing, this step catches it.



---


To deploy your Astro project to **GitHub Pages**, you need to update two things:

  

1. Set the `site` URL in your `astro.config.mjs` file so Astro can generate correct relative URLs for your assets.
    
      
    
2. Update `.github/workflows/ci.yml` with the official `@astrojs/deploy` GitHub Action for static deployment.
    
      
    

### Step 1: Update `astro.config.mjs`

GitHub Pages hosts project sites under `https://<username>.github.io/<repository-name>/`. You must define `site` in your Astro configuration so internal links and CSS assets resolve correctly:

  

JavaScript

```
import { defineConfig } from 'astro/config';

export default defineConfig({
  // Replace with your GitHub username and repository name
  site: 'https://<username>.github.io',
  base: '/<repository-name>',
});
```

### Step 2: Configure Repository Permissions in GitHub

Before pushing the workflow:

  

1. Go to your repository on GitHub.
    
      
    
2. Click **Settings** $\rightarrow$ **Pages**.
    
      
    
3. Under **Build and deployment** $\rightarrow$ **Source**, select **GitHub Actions**.
    
      
    

### Step 3: Complete GitHub Actions Workflow (`.github/workflows/ci.yml`)

Replace `.github/workflows/ci.yml` with the following configuration. It runs linting and type checks, builds the static output, and deploys it to GitHub Pages:

  

YAML

```
name: Deploy Astro to GitHub Pages

on:
  push:
    branches: [main, master]

# Grant permissions required for GitHub Pages deployment
permissions:
  contents: read
  pages: write
  id-token: write

# Allow only one concurrent deployment
concurrency:
  group: 'pages'
  cancel-in-progress: true

jobs:
  lint-check-build:
    name: Type Check, Stylelint & Build
    runs-on: ubuntu-latest

    steps:
      - name: Checkout repository
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Run TypeScript Check
        run: npm run check

      - name: Run Stylelint
        run: npm run lint:css

      - name: Setup Pages
        id: pages
        uses: actions/configure-pages@v5

      - name: Build with Astro
        run: npm run build
        env:
          ASTRO_TELEMETRY_DISABLED: 1

      - name: Upload Build Artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: ./dist

  deploy:
    name: Deploy to GitHub Pages
    needs: lint-check-build
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}

    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

### Step 4: Deploy

Commit and push the updated workflow file:

  

Bash

```
git add .github/workflows/ci.yml astro.config.mjs
git commit -m "ci: configure automated GitHub Pages deployment for Astro"
git push origin main
```

Once the workflow finishes in the **Actions** tab, your site will be live at `https://<username>.github.io/<repository-name>/`.





---


To configure a custom domain (e.g., `example.com` or `[www.example.com](https://www.example.com)`) for an Astro site hosted on GitHub Pages, complete the following four steps:

  

### Step 1: Create a `CNAME` File in `public/`

Astro automatically copies everything in the `public/` folder directly to the root of your static output (`dist/`).

  

Create a file named `CNAME` (capitalized, with no file extension) inside `public/CNAME`:

  

Plaintext

```
example.com
```

> **Note:** If you are using a subdomain instead, write `sub.example.com`.
> 
>   

### Step 2: Update `astro.config.mjs`

When using a custom domain, update `site` to point to your apex or custom domain, and remove or omit `base`:

  

JavaScript

```
import { defineConfig } from 'astro/config';

export default defineConfig({
  // Set your custom domain URL
  site: 'https://example.com',
  
  // Remove or omit `base` when using a custom domain
  // base: '/repository-name' <--- DO NOT USE THIS WITH A CUSTOM DOMAIN
});
```

### Step 3: Configure DNS Records with Your Domain Registrar

Log into your DNS provider (Cloudflare, Namecheap, GoDaddy, etc.) and add the following DNS records:

  

#### Option A: For an Apex Domain (`example.com`)

Add **four `A` records** pointing to GitHub's server IP addresses:

  

|**Type**|**Name / Host**|**Value / Target**|
|---|---|---|
|**A**|`@`|`185.199.108.153`|
|**A**|`@`|`185.199.109.153`|
|**A**|`@`|`185.199.110.153`|
|**A**|`@`|`185.199.111.153`|

_(Optional)_ Add a `CNAME` record so `[www.example.com](https://www.example.com)` redirects to your site:

  

|**Type**|**Name / Host**|**Value / Target**|
|---|---|---|
|**CNAME**|`www`|`<username>.github.io`|

#### Option B: For a Subdomain (`sub.example.com` or `[www.example.com](https://www.example.com)`)

Add a single **`CNAME` record** pointing to your GitHub Pages default domain:

  

|**Type**|**Name / Host**|**Value / Target**|
|---|---|---|
|**CNAME**|`sub` (or `www`)|`<username>.github.io`|

### Step 4: Add Domain and Enforce HTTPS on GitHub

1. Navigate to your repository on GitHub.
    
      
    
2. Go to **Settings** $\rightarrow$ **Pages**.
    
      
    
3. Under **Custom domain**, enter your domain name (`example.com`) and click **Save**.
    
      
    
4. Check the box for **Enforce HTTPS** _(Note: DNS propagation can take up to 24 hours before the TLS certificate generates and HTTPS becomes available)_.
    
      
    

Once DNS records propagate, your GitHub Actions deployment will automatically build your Astro site and serve it securely at your custom domain.



---




