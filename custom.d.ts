declare namespace Express {
    export interface Request {
        user?: any;
    }
}

declare namespace NodeJS {
    interface ProcessEnv {
      JWT_SECRET: string;
      // Add other custom environment variables here if needed
    }
  }