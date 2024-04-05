import {Router} from 'express';

const router = Router();

router.get('/something', async (req, res) => {

    req.log.info({ data: 'Hello from notice' });

    return res.status(200).send({ working: true });
});

export default router;
