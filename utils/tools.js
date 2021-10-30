exports.getProjectId = (url) => {
  const re_id = /\/project\/(\S+?)\//;
  const matched_array = url.match(re_id);
  if (matched_array) {
    return matched_array[1];
  }
  return;
};
