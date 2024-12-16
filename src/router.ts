import { Router } from 'express';
import User from './models/User';

const router = Router();

//Routing 
router.post('/auth/register', async (req, res) => {
  console.log(req.body);
  const result = await User.create(req.body);
  res.send({'code status:': 200, result});
});


export default router;
