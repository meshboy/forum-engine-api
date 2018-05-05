/**
 *created by Meshileya Seun <meshileyaseun@gmail.com/> 4/12/18
 * */
export const errorHandler = (error, req, res, next) => {
  console.error(error.stack);
  res.status(500).json({
    status: false,
    message: error.toString() || 'something went wrong. Please try again',
  });
};
