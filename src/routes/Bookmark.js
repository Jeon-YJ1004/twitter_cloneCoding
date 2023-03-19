import React, { useEffect, useState, useCallback } from "react";
import {
  HashRouter as Router,
  Route,
  Switch,
  useHistory,
  Link,
  useLocation,
  useParams,
} from "react-router-dom";
function Bookmark() {
  const location = useLocation();

  useEffect(() => {
    console.log(location)
  }, []);
  return <div>Bookmark</div>;
}

export default Bookmark;
