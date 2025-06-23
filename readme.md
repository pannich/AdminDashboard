

1. Testing Vitest

Terminal :
```
npm install --save-dev vitest @testing-library/react @testing-library/jest-dom @testing-library/user-event
```

```
npm install --save-dev jsdom @testing-library/jest-dom vitest
```

2. Install TS
```
npm install --save-dev typescript
```

3. ESLint and Prettier
```
npm install --save-dev eslint prettier eslint-plugin-react eslint-config-prettier
```

4. MUI DataGrid
```
npm install @mui/x-data-grid @mui/material @emotion/react @emotion/styled
```
```
npm install @ant-design/icons
```

```
npm install @mui/icons-material @mui/material @emotion/react @emotion/styled
```

5. Supabase
```
npm install @supabase/supabase-js
```
Then, Create a .env file in the root of your frontend app

```
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
```

6. Set up Cloud (remote) supbase with SQL migration UI
Dashboard → SQL Editor (write/create tables)
supabase`migration new` + `supabase db push`

7. uuid
```
npm install uuid
npm install --save-dev @types/uuid
```

8. Notifications
```
npm install notistack
```

======== MOCK DATA
// Mock data for now
const mockResidents: Resident[] = [
  {
    id: 1,
    first_name: 'Pan',
    last_name: 'Nichada',
    email: 'pan@example.com',
    cohort_id: 101,
  },
  {
    id: 2,
    first_name: 'Jane',
    last_name: 'Doe',
    email: 'jane@example.com',
    cohort_id: 102,
  },
];
