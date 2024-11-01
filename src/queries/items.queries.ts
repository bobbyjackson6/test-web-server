export const fetchItemsWithTwoMinPricesQuery = `
    INSERT INTO items (market_hash_name, min_price, min_price_non_tradable)
    VALUES ($1, $2, $3)
    ON CONFLICT (market_hash_name) DO UPDATE SET
        min_price_non_tradable = EXCLUDED.min_price_non_tradable,
        min_price = EXCLUDED.min_price;
`;
