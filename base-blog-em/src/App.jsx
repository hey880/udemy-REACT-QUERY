import { Posts } from "./Posts";
import "./App.css";

//1. query client와 query provider 필요
import { QueryClient, QueryClientProvider } from 'react-query';

//2. query client 생성
//query provider는 query client를 prop으로 가질 것이고
//query client는 캐시와 우리의 모든 디폴트 옵션을 포함함으로써
//query provider의 children에서 사용가능하게 된다.
const queryClient = new QueryClient();

function App() {
  return (
    // 3. provide React Query client to App
    // 이 provider 안에 있는 모든 것들은 reacti query hooks를 
    // 사용할 수 있다. 특히 우리는 아래 Posts 컴포넌트 안에서
    // 사용하길 원한다. (Posts 컴포넌트로 이동)
    <QueryClientProvider client={queryClient}>
      <div className="App">
        <h1>Blog Posts</h1>
        <Posts />
      </div>
    </QueryClientProvider>
  );
}

export default App;
