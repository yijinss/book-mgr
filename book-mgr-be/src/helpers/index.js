const getYearByTimeStamp = (ts) => {
  const date = new Date(ts);

  return date.getFullYear();
};

