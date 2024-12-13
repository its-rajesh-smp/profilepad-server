declare namespace Express {
  export interface Request {
    user: {
      email: string;
      password: string | null;
      slug: string | null;
      id: string;
      name: string | null;
      headline: any;
      profileImageSrc: string | null;
    };
  }
}
