# SvelteKit Project

Welcome to the SvelteKit Project! Follow the instructions below to get started with the project.

## Prerequisites

Make sure you have the following installed on your system:

- [Node.js](https://nodejs.org/) (v16 or higher recommended)
- [pnpm](https://pnpm.io/) (Package manager)
- [Redis](https://redis.io/) (for the Redis server)

## Setup Instructions

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd <repository-folder>
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   ```

3. **Configure environment variables**
   Rename `.env.example` to `.env`:
   ```bash
   mv .env.example .env
   ```

4. **Start the Redis server**
   Open a new terminal tab and run the following command:
   ```bash
   redis-server --port 6380
   ```

5. **Run the development server**
   Start the SvelteKit development server:
   ```bash
   npm run dev
   ```

6. **Access the application**
   Open your browser and navigate to `http://localhost:5173` (or the port specified in your `.env` file).

## Notes

- Ensure that the Redis server is running on the specified port (`6380`) before starting the development server.
- For further configurations, update the `.env` file as needed.

## Scripts

- `pnpm install`: Installs all dependencies.
- `npm run dev`: Starts the development server.

## Contributing

Feel free to fork the repository and make changes. Pull requests are welcome!

---

Happy coding!
