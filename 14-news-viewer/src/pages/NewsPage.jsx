import React from 'react';
import Categories from "../components/Categories";
import NewsList from "../components/NewsList";
import {useLocation} from "react-router-dom";

function NewsPage() {
  const location = useLocation();
  const category = location.pathname.split('/')[1]

  return (
    <>
      <Categories />
      <NewsList category={category} />
    </>
  )
}

export default NewsPage;