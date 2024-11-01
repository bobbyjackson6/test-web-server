export const loginUserQuery = 'SELECT * FROM Users WHERE id = $1';

export const editPasswordQuery = 'UPDATE Users SET password = $1 WHERE id = $2';
