import React from "react";
import { Link } from "react-router-dom";
import "./css/page.css";

function NotFound() {
  return (
    <div className="page">
      <div>❌ 404 Page Not Found</div>
      <Link to="/">Back to Home Page</Link>
    </div>
  );
}

export default NotFound;
