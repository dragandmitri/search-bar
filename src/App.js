import { useState, useEffect } from "react";
import styled from "@emotion/styled";
import { AppBar } from "./components/AppBar";
import { useSearchParams } from "react-router-dom";
import { useSearchUrl } from "./hooks/baseUrl";
import axios from "axios";
import { useDebounce } from "./hooks/debounce";

function App() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const [query, setQuery] = useSearchParams();
  const [search, setSearch] = useState(query.toString().replace("=", ""));
  const debounced = useDebounce(search);
  const baseQuery = useSearchUrl(search);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const res = await axios.get(baseQuery);
      const data = res.data;
      setLoading(false);
      setData(data.items);
    } catch (e) {
      setLoading(false);
      throw Error(e.message);
    }
  };

  useEffect(() => {
    if (debounced.length > 2) {
      fetchUsers();
    } else {
      setData([]);
    }
  }, [debounced]);

  const onSearch = (event) => {
    setSearch(event);
    setQuery(event);
  };

  return (
    <div>
      <AppBar />
      <Title>Please enter a name to search for a github user</Title>
      <SearchBlock>
        <InputWrapper>
          <StyledInput
            type="text"
            id="searchInput"
            placeholder="username"
            value={search}
            onChange={(event) => onSearch(event.target.value)}
          />
          <StyledLabel htmlfor="searchInput">Username</StyledLabel>
        </InputWrapper>
      </SearchBlock>

      {loading ? (
        <ListWrapper>Loading...</ListWrapper>
      ) : (
        <ListWrapper>
          {data.map((user) => (
            <ListItems key={user.id}>{user.login}</ListItems>
          ))}
        </ListWrapper>
      )}
    </div>
  );
}

export default App;

const Title = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 5vh;
  font-size: 23px;
`;

const ListItems = styled.div`
  padding: 5px 0;
`;

const ListWrapper = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  flex-direction: column;
  margin-top: 50px;
`;

const SearchBlock = styled.div`
  display: flex;
  justify-content: center;
`;

const StyledLabel = styled.label`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  padding: 1.2rem 0.75rem;
  overflow: hidden;
  text-align: start;
  text-overflow: ellipsis;
  white-space: nowrap;
  pointer-events: none;
  border: 1px solid transparent;
  transform-origin: 0 0;
  transition: opacity 0.1s ease-in-out, transform 0.1s ease-in-out;
`;

const InputWrapper = styled.div`
  position: relative;
  margin-top: 3vh;
  width: 500px;
  height: 50px;
`;

const StyledInput = styled.input`
  height: 2.8rem;
  line-height: 1.25;
  display: block;
  width: 100%;
  padding: 0.375rem 0.75rem;
  font-size: 1rem;
  font-weight: 400;
  color: #212529;
  background-color: #fff;
  background-clip: padding-box;
  border: 1px solid #ced4da;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  border-radius: 0.375rem;
  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;

  &::placeholder {
    color: transparent;
  }

  &:focus {
    color: #212529;
    background-color: #fff;
    border-color: #86b7fe;
    outline: 0;
    box-shadow: 0 0 0 0.25rem rgb(13 110 253 / 25%);
  }

  &:focus ~ label,
  &:not(:placeholder-shown) ~ label {
    opacity: 0.65;
    transform: scale(0.85) translateY(-1.2rem) translateX(0.15rem);
  }
`;
