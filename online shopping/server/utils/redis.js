// import { createClient } from 'redis';
// const DEFAULT_EXPIRE = 60 * 60; //1h
// const redisClient = createClient({
//   url: `${process.env.REDIS_HOST}://${process.env.REDIS_HOST}:${process.env.REDIS_PORT}`
// });

// redisClient.on('error', (err) => console.log('Redis redisClient Error', err));
// await redisClient.connect();
// // let redisClient;
// export const getCache = async (key) => {
//   return (
//     await redisClient.get(key, (error, data) => {
//       if (error) return error;
//       if (data) return (JSON.parse(data));
//     })
//   )
// }
// export const setCache = async (key, value) => {
//   return await redisClient.setEx(key, DEFAULT_EXPIRE, JSON.stringify(value));
// }
// export const delCache = async (key) => {
//   return await redisClient.del(key);
// }

// export default redisClient;

