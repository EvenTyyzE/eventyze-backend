export interface ResponseDetails {
    statusCode: number;
    message: string;
    data?: any
    details?: any
}

export class QueryParameters {
    title?: string;
    publishedYear?: number;
    movieProducer?: string;
  }