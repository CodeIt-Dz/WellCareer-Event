# Well Pharma Frontend

## Overview
This repository contains the frontend code for the Well Pharma project. It is responsible for the user interface and interactions for both job seekers and employers. The frontend is built using **Next.js 14** with **TypeScript**, ensuring a modern and scalable application.

## Features
- User registration and authentication using **NextAuth.js**
- Job seeker profile management
- Employer job posting and candidate management
- Responsive design with **Tailwind CSS**
- Integration with backend APIs

## Tech Stack
- **Framework:** [Next.js 14](https://nextjs.org/)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **Authentication:** [NextAuth.js](https://next-auth.js.org/)
- **Routing:** [App Router](https://nextjs.org/docs/app/building-your-application/routing)

## Getting Started

### Prerequisites
- Node.js (v18.x or later)
- npm or yarn

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/well-pharma-frontend.git
   ```
2. Navigate to the project directory:
```bash
cd well-pharma-frontend
```
3. Install the dependencies:
```bash
npm install
# or
yarn install
```
### Environment Variables
Create a .env.local file in the root of the project and add the following environment variables:

```env
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your_nextauth_secret
DATABASE_URL=your_database_url
```
### Running the Development Server
To start the frontend development server, run:

```bash
npm run dev
# or
yarn dev
```
The application will be available at http://localhost:3000.

### Building for Production
To build the project for production:

```bash
npm run build
# or
yarn build
```
The output will be in the .next/ directory.

### Authentication Setup
The project uses NextAuth.js for authentication. Make sure to configure your providers and sessions in the auth folder located in the pages directory.

### Tailwind CSS
Tailwind CSS is configured and ready to use. You can find the configuration file at tailwind.config.js.

### TypeScript
TypeScript is set up and configured with strict mode enabled. The tsconfig.json file contains the necessary configurations to ensure type safety across the project.

### Contributing
Please refer to the CONTRIBUTING.md file for guidelines on how to contribute to this project.

### License
This project is licensed under the Proprietary License - Well Pharma. Please see the LICENSE file for more details.
