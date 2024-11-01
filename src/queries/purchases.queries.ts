export const fetchUserBalanceQuery = 'SELECT id, balance from users where id = $1';

export const fetchItemPriceQuery = 'SELECT market_hash_name, min_price from items where market_hash_name = $1';

export const addPurchaseQuery = 'INSERT INTO purchases (user_id, market_hash_name, price, date) VALUES ($1, $2, $3, CURRENT_DATE)';
export const updateBalanceQuery = 'UPDATE users SET balance = $2 WHERE id = $1';
