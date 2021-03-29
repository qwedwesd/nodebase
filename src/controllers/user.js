import _ from 'lodash';
import models from '../models/index';

const { users } = models;

class UserController {
  getUser = async (req, res) => {
    // const pureCommand = await models.sequelize.query('select * from users', {
    //   type: QueryTypes.SELECT
    // });
    // const user = _.head(pureCommand);
    const user = await users.findAll({
      attributes: { exclude: ['password'] },
    });
    const response = _.map(user, (o) => ({
      ...o.dataValues,
      vip: true,
    }));
    res.status(200).json({ response });
  };

  postUser = async (req, res) => {
    const { body } = req;
    const { email, password } = body;
    const user = await users.create({
      email,
      password,
    });
    res.status(200).json({ user });
  };
}

export default new UserController();
