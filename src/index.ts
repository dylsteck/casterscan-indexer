import 'dotenv/config'
import cron from 'node-cron'

import { watch } from './lib.js'

cron.schedule('*/30 * * * *', async () => {
    await watch()
})