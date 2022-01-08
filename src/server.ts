import { PORT } from './common/config';

import { app } from './app';

app.listen(PORT, () => {
  console.log(`Server is up on ${PORT} port`);
});
