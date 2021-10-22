module.exports = (fn) => {
  // why return the function? #115 0525
  return (req, res, next) => {
    fn(req, res, next).catch(next); // next is error: next(err)
    /*  because async is returning a Promise
        So, we can catch the error after the function directly
    */
  };
};
