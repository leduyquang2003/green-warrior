## **Install Dependencies**

Install the required dependencies using one of the following commands:

npm install

## **Environment Variables**

Ensure you have a `.env` file in the root directory with the required environment variables. Example:

NEXT_PUBLIC_API_URL=

## **Development Server**

Start the development server to preview the application locally:

npm run dev

By default, the application will be available at http://localhost:3000.

## **Build for Production**

To build the project for production, run:

npm run build

This will generate a .next folder containing the optimized production build of your application.

## **Start the Production Server**

After building the project, you can start the production server using:

npm run start

The application will now be served in production mode.

## **Scripts**

Here is a summary of the available scripts in the package.json file:

dev: Starts the development server

build: Builds the project for production

start: Starts the production server

lint: Runs lint checks (if configured)

## **Troubleshooting**

Port Already in Use: If port 3000 is already in use, specify a different port:

npm run dev -- -p 3001

## **Dependency Issues**

Ensure dependencies are installed properly by running:

npm install --force
