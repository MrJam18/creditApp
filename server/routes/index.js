const Router = require('express');
const router = new Router();
const eventRouter = require('./events');
const messengerRouter = require('./messenger');
const claimRouter = require('./new_claim');
const settingsRouter = require('./settings');
const listRouter = require('./list');
const cessionsRouter = require('./cessions');
const organizationsRouter = require('./organizations');
const contractsRouter = require('./contracts');
const paymentsRouter = require('./payments');
const documentsRouter = require('./documents');
const courtsRouter = require('./courts')
const actionsRouter = require('./actions');
const usersRouter = require('./users');
const tasksRouter = require('./tasks');
const debtorsRouter = require('./debtors');
const agentsRouter = require('./agents');
const bailiffsRouter = require('./bailiffs');

router.use('/events', eventRouter);
router.use('/messenger', messengerRouter);
router.use('/new_claim', claimRouter);
router.use('/settings', settingsRouter);
router.use('/list', listRouter);
router.use('/cessions', cessionsRouter);
router.use('/organizations', organizationsRouter);
router.use('/contracts', contractsRouter );
router.use('/payments', paymentsRouter);
router.use('/documents', documentsRouter);
router.use('/courts', courtsRouter);
router.use('/actions', actionsRouter);
router.use('/users', usersRouter);
router.use('/tasks', tasksRouter);
router.use('/debtors', debtorsRouter);
router.use('/agents', agentsRouter);
router.use('/bailiffs', bailiffsRouter);





//DoControllersNext


module.exports = router;