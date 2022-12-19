
import ReactPaginate from "react-paginate";
import { useEffect, useState } from "react";


function Pagination_test() {
    const [state, setState] = useState([])
    const [users, setUsers] = useState([])
    const [pageCount, setpageCount] = useState(0);

    let limit = 2;

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch("https://jsonplaceholder.typicode.com/users?_page=1&_limit=${limit}")
            const data = await response.json()
            const total = response.headers.get("x-total-count");
            setpageCount(Math.ceil(total / limit));
            setUsers(data)
        }
        fetchData()
    }, [limit]);

    const fetchComments = async (currentPage) => {
        const res = await fetch(
            `https://jsonplaceholder.typicode.com/users?_page=${currentPage}&_limit=${limit}`

        );
        const data = await res.json();
        return data;
    };
    console.log(users);

    // -------------Pagination-------------

    const handlePageClick = async (data) => {
        console.log(data.selected);

        let currentPage = data.selected + 1;

        const commentsFormServer = await fetchComments(currentPage);

        setUsers(commentsFormServer);
    };

    //   -------------------SEARCH-----------


    const onSearchInputChange = (e) => {
      
        setState({ searchInput: e.target.value })
    }

    const onAlphabetClick = (e) => {
        //  alert("Namrata"+ e.target.value);
        setState({ alphabet: e.target.value })
    }
    const onNumberClick =  (e) => {
        //   alert("Namrata"+ e.target.value);
        setState({ number: e.target.value })    
    }

    const prepareAlphabets = () => {
        let result = [];
    
        for (let i = 65; i < 91; i++) {
            result.push(
                <button type="button" key={i} onClick={onAlphabetClick} value={String.fromCharCode(i)} >{String.fromCharCode(i)}</button>
            )
        }
        return result;
    }

    const elementContainsSearchString = (searchInput, element) => (searchInput ? element.name.toLowerCase().includes(searchInput.toLowerCase()) : false);

    const filterItems = (users) => {
        let result = [];
        const { searchInput='',alphabet='', number='' } = state;
        if(users && (searchInput || alphabet || number)) {
          result = users.filter((element) => (element.name.charAt(0).toLowerCase() === alphabet.toLowerCase()) || 
          elementContainsSearchString(searchInput, element));
        } else {
          result = users || [];
        }
        result = result.map((item)=> (<li>{item.name}</li>))
        return result;
      }

    const filteredList = filterItems(users);

    

    return (
        <div className="container">
            <div>
                <input type="search" onChange={onSearchInputChange} />
                {/* <button type="button" >0-9</button>
                {onNumberClick()} */}
                  <button type="button" onClick={onNumberClick} >0-9</button>
                {prepareAlphabets()}
                <ul>
                    {filteredList}
                </ul>
            </div>

            {/* <div className="row m-2">
                {users.map((users) => {
                    return (
                        <div key={users.id} className="col-sm-6 col-md-4 v my-2">
                            <div className="card shadow-sm w-100" style={{ minHeight: 225 }}>
                                <div className="card-body">
                                    <h4 className="card-title text-center h2">Id :{users.id} </h4>
                                    <h5 className="card-subtitle mb-2 text-muted text-center">
                                        {users.name}
                                        {users.username}
                                        {users.email}
                                    </h5>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div> */}


            <ReactPaginate
                previousLabel={"previous"}
                nextLabel={'next'}
                breakLabel={'...'}
                pageCount={pageCount}
                marginPagesDisplayed={3}
                pageRangeDisplayed={4}
                onPageChange={handlePageClick}
                containerClassName={'pagination justify-content-center'}
                pageClassName={'page-item'}
                pageLinkClassName={'page-link'}
                previousClassName={'page-item'}
                previousLinkClassName={'page-link'}
                nextClassName={'page-item'}
                nextLinkClassName={'page-link'}
                breakClassName={'page-item'}
                breakLinkClassName={'page-link'}
                activeClassName={'active'}
            />
        </div>
    );
}

export default Pagination_test;