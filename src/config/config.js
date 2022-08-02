const dotenv = require('dotenv');
const path = require('path');
const Joi = require('joi');
dotenv.config({ path: path.join(__dirname, '../../.env') });

console.log("loaded file")
const envVarsSchema = Joi.object()
  .keys({
    NODE_ENV: Joi.string().valid('production', 'development', 'test').required(),
    PORT: Joi.number().default(3000),
    DB_NAME: Joi.string().required().description('Pgsql DB url'),
    DB_HOST: Joi.string().required().description('Pgsql host url'),
    DB_USERNAME: Joi.string().required().description('Pgsql username url'),
    DB_PASSWORD: Joi.string().required().description('Pgsql password url'),
    JWT_SECRET: Joi.string().required().description('JWT secret key'),
    JWT_ACCESS_EXPIRATION_MINUTES: Joi.number().default(30).description('minutes after which access tokens expire'),
    JWT_REFRESH_EXPIRATION_DAYS: Joi.number().default(30).description('days after which refresh tokens expire'),
    JWT_RESET_PASSWORD_EXPIRATION_MINUTES: Joi.number()
      .default(10)
      .description('minutes after which reset password token expires'),
    JWT_VERIFY_EMAIL_EXPIRATION_MINUTES: Joi.number()
      .default(10)
      .description('minutes after which verify email token expires')

  })
  .unknown();

const { value: envVars, error } = envVarsSchema.prefs({ errors: { label: 'key' } }).validate(process.env);

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}
let disableSecurity = false;
process.argv.forEach(function (val, index, array) {
  if(val == "disable_security") disableSecurity = true;
}); 
module.exports = {
  env: envVars.NODE_ENV,
  port: envVars.PORT,
  disableSecurity,
  sequelize: {

    username: envVars.DB_USERNAME,
    password: envVars.DB_PASSWORD,
    database: envVars.DB_NAME,
    options: {
      host: envVars.DB_HOST,
      dialect: envVars.DB_DIALECT,
      dialectOptions: {
        connectTimeout: 100
      },
      operatorsAliases: false,
      define: {
        timestamps: false
      },
      pool: {
        max: parseInt(envVars.DB_POOL_MAX, 10),
        min: parseInt(envVars.DB_POOL_MIN, 10),
        acquire: parseInt(envVars.DB_POOL_ACQUIRE, 10),
        idle: parseInt(envVars.DB_POOL_IDLE, 10)
      }
    }

  },
  jwt: {
    secret: envVars.JWT_SECRET,
    accessExpirationMinutes: envVars.JWT_ACCESS_EXPIRATION_MINUTES,
    refreshExpirationDays: envVars.JWT_REFRESH_EXPIRATION_DAYS,
    resetPasswordExpirationMinutes: envVars.JWT_RESET_PASSWORD_EXPIRATION_MINUTES,
    verifyEmailExpirationMinutes: envVars.JWT_VERIFY_EMAIL_EXPIRATION_MINUTES,
  }
};
