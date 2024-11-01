import { FastifyReply } from 'fastify';

export type Currency =
    | 'AUD'
    | 'BRL'
    | 'CAD'
    | 'CHF'
    | 'CNY'
    | 'CZK'
    | 'DKK'
    | 'EUR'
    | 'GBP'
    | 'HRK'
    | 'NOK'
    | 'PLN'
    | 'RUB'
    | 'SEK'
    | 'TRY'
    | 'USD';

export type ItemResponse = {
    market_hash_name: string;
    currency: Currency;
    suggested_price: number;
    item_page: string;
    market_page: string;
    min_price: number | null;
    max_price: number | null;
    mean_price: number | null;
    quantity: number;
    created_at: number;
    updated_at: number;
};

interface IReply {
    200: { items: CombinedItemResponse[] };
    500: { error: string };
}

export type CombinedItemResponse = {
    market_hash_name: string;
    min_price: number | null;
    min_price_non_tradable: number | null;
};

export type FetchItemsWithTwoMinPricesReply = FastifyReply<{
    Reply: IReply;
}>;
