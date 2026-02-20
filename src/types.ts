export type UrlItem = {
  id?: string;
  originalUrl: string;
  shortUrl: string;
  shortCode: string;
  createdAt?: Date;
  updatedAt?: Date;
};

export type UserData = {
  urlCollection: UrlItem[];
};
