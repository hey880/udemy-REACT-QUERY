import { useState } from "react";
//4. useQuery import
// useQuery는 서버에서 데이터를 가져올 때(fetch할 때) 사용할 hooks입니다.
import { useQuery } from "react-query";

import { PostDetail } from "./PostDetail";
const maxPostPage = 10;

async function fetchPosts() {
  const response = await fetch(
    //ctrl+클릭으로 어떤 값들인지 확인 가능.
    //userId, id, title, body를 속성으로 가진 객체들을 요소로 갖는 배열
    "https://jsonplaceholder.typicode.com/posts?_limit=10&_page=0"
  );
  return response.json();
}

export function Posts() {
  const [currentPage, setCurrentPage] = useState(0);
  const [selectedPost, setSelectedPost] = useState(null);

  // replace with useQuery
  // 5. 배열을 하드코딩 하는 게 아니라 useQuery의 return 객체를
  // 구조분해 할당 한다. useQuery는 많은 프로퍼티를 가진 객체를 반환한다.
  //const data = []; => 하드코딩 X, 아래처럼 사용
  const {data} = useQuery("posts", fetchPosts);
  /* 6.
  useQuery의 첫번째 인수 : key(posts라는 key 지정)
  이 posts라는 쿼리의 데이터는 상단의 fetchPosts 함수를 이용해 가져온다.
  useQuery의 두번째 인수 : 데이터를 가져오는 비동기 함수 (이 함수에서 반환되는 모든 데이터를
  가져오게 된다.)
  여기까지 입력하고 실행하면 map이 undefined 라는 에러가 발생하는데
  이는 fetchPosts가 비동기 함수이고 fetchPosts가 호출을 완료(resolve)할 때까지
  data는 useQuery에서 정의되지 않은(undefined) 것으로 취급된다.
  fetchPosts가 데이터를 전부 불러오지 않으면 useQuery는 data에 어떤 값을 할당해야할지
  모른다.
  */

  //추후에는 더 멋진 방법을 사용하겠지만 지금은 data가 falsey 일 경우(=fetchPosts가 아직 값을 못
  //가져온 경우) early return 을 이용하여 div를 반환한다. 그렇지 않은 경우(=fetchPosts가 동작을 마친 경우)
  //정상적으로 data가 배열을 가지고 컴포넌트가 그 배열을 렌더링 하게 된다.
  if(!data) return <div />;

  return (
    <>
      <ul>
        {data.map((post) => (
          <li
            key={post.id}
            className="post-title"
            onClick={() => setSelectedPost(post)}
          >
            {post.title}
          </li>
        ))}
      </ul>
      <div className="pages">
        <button disabled onClick={() => {}}>
          Previous page
        </button>
        <span>Page {currentPage + 1}</span>
        <button disabled onClick={() => {}}>
          Next page
        </button>
      </div>
      <hr />
      {selectedPost && <PostDetail post={selectedPost} />}
    </>
  );
}
