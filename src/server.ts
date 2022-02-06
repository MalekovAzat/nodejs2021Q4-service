import { PORT } from './common/config';

import { app, init } from './app';
import { logger } from './logger/LoggerMiddleware';

init().then(() => {
  app.listen(PORT, () => {
    logger.info({ message: `Server is up on ${PORT} port` });
  });
});
