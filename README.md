## ConvertCart API (Sequelize + MySQL)

### Prerequisites
- Node.js 18+ (works with 22.x)
- MySQL running and reachable

### Setup
1) Install dependencies  
`npm install`

2) Copy env template and fill in DB credentials  
Create `.env` with:
```
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=convertcart
PORT=5000
```

3) Ensure the database and tables exist (`restaurants`, `menu_items`, `orders`). Seed if needed via `node seed/seed.js` (adapt as required).

### Run
- Development (nodemon): `npm run dev`
- Production: `npm start`

Server starts on `http://localhost:5000` (or `PORT` env).

### API
- `GET /api/search/dishes?name=biryani&minPrice=150&maxPrice=300`  
  Returns top dishes within price range, ordered by order count, including restaurant info. Handles dishes with zero orders.

### Notes
- Associations: `Restaurant` has many `MenuItem`; `MenuItem` has many `Order`; `Order` belongs to both `Restaurant` and `MenuItem`.
- `subQuery: false` in the search query keeps the Orders join so `COUNT(Orders.id)` works even when grouping/limiting.

