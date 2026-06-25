# 🚀 LaunchCraft

> **Stack-aware auto-generation of Docker, CI/CD, and deployment configs — right inside VS Code.**

[![Version](https://img.shields.io/visual-studio-marketplace/v/your-publisher-id.launchcraft?color=blue&label=version)](https://marketplace.visualstudio.com/items?itemName=your-publisher-id.launchcraft)
[![Installs](https://img.shields.io/visual-studio-marketplace/i/your-publisher-id.launchcraft)](https://marketplace.visualstudio.com/items?itemName=your-publisher-id.launchcraft)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

Tired of writing boilerplate `Dockerfile`s, configuring `docker-compose.yml` networks, and guessing CI/CD pipeline syntax for every new project? **LaunchCraft** acts as your personal DevOps engineer — it automatically detects your project's framework, asks a few quick questions, and scaffolds your entire deployment infrastructure in seconds.

---

## ✨ Features

- **🧠 Auto-Detection Engine** — Instantly recognizes your workspace stack (Express, Spring Boot, Angular, React, FastAPI, and more) by scanning project files like `package.json`, `pom.xml`, and `requirements.txt`.
- **🐳 Docker Ready** — Generates optimized, multi-stage `Dockerfile`s and `.dockerignore` files tailored exactly to your framework and runtime version.
- **🔗 Database Wiring** — Automatically generates `docker-compose.yml` with PostgreSQL, MySQL, MongoDB, or Redis pre-linked and network-configured for your application.
- **⚙️ CI/CD Pipelines** — Scaffolds ready-to-run `Jenkinsfile` or GitHub Actions workflows with build, test, and deploy stages.
- **☁️ Cloud Deployment Manifests** — Generate native config files for Railway (`railway.toml`), Render (`render.yaml`), or Fly.io (`fly.toml`) instantly.
- **📖 Deployment Guide** — Every run produces a `DEPLOYMENT_GUIDE.md` that opens automatically with step-by-step instructions specific to your chosen stack and platform.

---

## 📸 Demo

> _Screenshot / GIF coming soon_

---

## 💻 Usage

1. Open any project folder in VS Code.
2. Open the Command Palette:
   - **Mac**: `Cmd + Shift + P`
   - **Windows / Linux**: `Ctrl + Shift + P`
3. Type **`LaunchCraft: Initialize Deployment`** and press Enter.
4. Follow the interactive QuickPick menus:
   - ✅ Confirm your detected stack
   - 🗄️ Select your database
   - ⚙️ Choose a CI/CD pipeline
   - ☁️ Pick your deployment target
5. Your infrastructure files are generated instantly in the workspace root.

---

## 📁 Generated Files

| File                           | Condition                    |
| ------------------------------ | ---------------------------- |
| `Dockerfile`                   | Always                       |
| `docker-compose.yml`           | Always                       |
| `.dockerignore`                | Always                       |
| `Jenkinsfile`                  | If Jenkins selected          |
| `.github/workflows/deploy.yml` | If GitHub Actions selected   |
| `railway.toml`                 | If Railway selected          |
| `render.yaml`                  | If Render selected           |
| `fly.toml`                     | If Fly.io selected           |
| `DEPLOYMENT_GUIDE.md`          | Always — opens automatically |

---

## 🛠️ Supported Stacks

| Language    | Frameworks                                |
| ----------- | ----------------------------------------- |
| **Node.js** | Express, Fastify, React, Angular, Next.js |
| **Java**    | Spring Boot                               |
| **Python**  | FastAPI, Django, Flask                    |
| **Go**      | Standard module projects                  |

> More stacks coming. See [Contributing](#-contributing) to add your own.

---

## 📦 Installation

### From the Marketplace

Search for **LaunchCraft** in the VS Code Extensions panel (`Ctrl+Shift+X`) or install directly from the [Marketplace page](https://marketplace.visualstudio.com/items?itemName=navneet-anand.launchcraft).

### Local Development

```bash
# 1. Clone the repository
git clone https://github.com/nav0804/launchcraft.git
cd launchcraft

# 2. Install dependencies
npm install

# 3. Compile TypeScript
npm run compile
```

Then in VS Code:

- Press `F5` to open a new **Extension Development Host** window.
- Open any dummy project folder in that window.
- Run `LaunchCraft: Initialize Deployment` from the Command Palette.

---

## 🏗️ Architecture

LaunchCraft is built in TypeScript and engineered around **SOLID principles** with a fully scalable plugin-style architecture.

```
src/
├── detector/          # Chain of Responsibility — detects project stack
├── generators/        # Strategy Pattern — one generator per output file type
│   └── strategies/    # Swappable strategies per language/framework
├── templates/         # Raw template strings per stack
│   └── registry/      # Central TemplateRegistry — register new stacks in one line
└── GeneratorFactory   # Factory Pattern — assembles the generator pipeline
```

**Design Patterns used:**

| Pattern                 | Where                         |
| ----------------------- | ----------------------------- |
| Chain of Responsibility | Stack detection pipeline      |
| Strategy                | Per-language file generation  |
| Factory                 | Generator pipeline assembly   |
| Registry                | Template lookup and extension |

Adding support for a new language requires **zero changes to existing code** — drop in a new detector, a new strategy, and one registry line.

---

## 🤝 Contributing

Contributions are welcome! To add a new framework, language, or deployment platform:

1. Fork the project.
2. Create your feature branch:
   ```bash
   git checkout -b feature/add-go-support
   ```
3. Add your detector in `src/detector/`.
4. Add your templates in `src/templates/<your-stack>/`.
5. Register your strategy in `GeneratorFactory.ts` and `TemplateRegistry.ts`.
6. Commit your changes:
   ```bash
   git commit -m "feat: add Go support with Dockerfile and compose templates"
   ```
7. Push and open a Pull Request.

---

## 📝 License

Distributed under the MIT License. See [`LICENSE`](LICENSE) for more information.

---

## 👤 Author

**Navneet Anand Mishra**  
[![GitHub](https://img.shields.io/badge/GitHub-navneetanand-black?logo=github)](https://github.com/nav0804/LaunchCraft)  
[![LinkedIn](https://img.shields.io/badge/LinkedIn-navneetanand-blue?logo=linkedin)](https://www.linkedin.com/in/navneet-anand-432a551a4/)

---

_If LaunchCraft saved you time, consider leaving a ⭐ on the [Marketplace](https://marketplace.visualstudio.com/items?itemName=your-publisher-id.launchcraft) — it helps others discover it._
