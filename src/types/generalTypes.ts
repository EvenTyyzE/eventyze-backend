export interface ResponseDetails {
    message: string;
    statusCode: number;
    data?: any
    details?: any
    info?: any
}

export class QueryParameters {
    title?: string;
    publishedYear?: number;
    movieProducer?: string;
  }