import React from 'react';
import styled from "styled-components";
import NewsItem from "./NewsItem";
import axios from "axios";
import usePromise from "../lib/usePromise";

const NewsListBlock = styled.div`
  box-sizing: border-box;
  padding-bottom: 3rem;
  width: 768px;
  margin: 2rem auto 0;
  
  @media screen and (max-width: 768px) {
    width: 100%;
    margin-left: 1rem;
    margin-right: 1rem;
  }
`

function NewsList({ category }) {
  // const NEWS_API = process.env.REACT_APP_NEWS_API;
  // const [articles, setArticles] = useState(null);
  // const [loading, setLoading] = useState(false);

  // news api를 이용해 뉴스를 가져옵시다.
  // useEffect(() => {
  //   const fetchData = async () => {
  //     setLoading(true);
  //     try {
  //       const query = category === 'all'? '' : `&category=${category}`
  //       const response = await axios.get(`https://newsapi.org/v2/top-headlines?country=kr${query}&apiKey=${NEWS_API}`);
  //       setArticles(response.data.articles);
  //     }
  //     catch (e) {
  //       console.log(e)
  //     }
  //     setLoading(false);
  //   }
  //
  //   fetchData();
  // }, [category])

  const [loading, response, error] = usePromise(() => {
    const NEWS_API = process.env.REACT_APP_NEWS_API;
    const query = category === 'all'? '' : `&category=${category}`;
    return axios.get(`https://newsapi.org/v2/top-headlines?country=kr${query}&apiKey=${NEWS_API}`);
  }, [category])

  if (loading) {
    return <NewsListBlock>대기 중...</NewsListBlock>
  }
  if (!response) {
    return <NewsListBlock>기사가 존재하지 않습니다.</NewsListBlock>
  }
  if (error) {
    return <NewsListBlock>에러 발생!</NewsListBlock>
  }

  const articles = response.data.articles;
  return (
    <NewsListBlock>
      {articles.map(article => <NewsItem key={article.url} article={article} />)}
    </NewsListBlock>
  );
}

export default NewsList;