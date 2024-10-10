import "./LazyLoading.css";

import React, { memo } from "react";

const LazyLoading = () => {
  return <span className="loader"></span>;
};

export default memo(LazyLoading);
