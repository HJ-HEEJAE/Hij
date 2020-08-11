import React, { useState, useEffect } from "react";
import qs from "qs";
import { AgGridReact } from "ag-grid-react";
// import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-balham-dark.css";
import axios from "axios";
import apiURL from '../config'
import SearchBar from "../components/SearchBar";

export default function Home({location, history, match}) {
  const [rowData, setRowData] = useState([]);
  const [search, setSearch] = useState('');
  const [ddsearch, setddSearch] = useState('');
  const {loading, error} = useStocks(search);
  console.log(search);
  let tableSection;
  const columns = [
    { headerName: "Name", field: "name", sortable: true, filter: "agTextColumnFilter" },
    { headerName: "Symbol", field: "symbol", sortable: true, filter: "agTextColumnFilter" },
    { headerName: "Industry", field: "industry", sortable: true, filter: "agTextColumnFilter" }
  ]; 

  function useStocks(searchWord){
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const query = qs.parse(location.search, {
      ignoreQueryPrefix: true
    });
    // If there is no keyword to search from the form
    if (searchWord === '' || searchWord === undefined){
      searchWord = query.industry;
    }
    
    useEffect(() => {
      let url = apiURL+`/stocks/symbols`;
      if (searchWord !== '' && searchWord !== undefined){
        // setSearch(searchWord);
        url = apiURL+`/stocks/symbols?industry=`+searchWord;
      }
      console.log(url);
      axios.get(url)
        .then(res => {
          console.log(res);
          return res.data;
        })
        .then(stocks => {
          // console.log(stocks);
          setRowData(stocks);
          setLoading(false);
          setError(false);
        })
        .catch(error => {
          console.log(error);
          console.log(error.response);
          setLoading(false);
          setError(error.response.data.message);
        })
      
    }, [searchWord]); // execute only when the value of 'search' is changed after the first rendering

    return {
      loading,
      error
    };
  }

  function LoadingTable(){
    return (
      <div className="textLoading">
        <p>Loading...</p>
      </div>
    );
  }
  function ErrorTable(){
    console.log('err '+error);
    return (
      <div className="container">
        <p className="ErrorMsg">{error}</p>
      </div>
    );
  }
  function DrawTable(){
    const gridoptions = {
      resizable: true,
      sortable: true,
    }
    function onGridReady(params) {
      let gridApi = params.api;
      this.gridColumnApi = params.columnApi;
      gridApi.sizeColumnsToFit();
    }
    return (
      <div
        className="ag-theme-balham-dark"
        style={{
          width: "900px",
          height: "880px",
        }}
      >
        <AgGridReact 
          columnDefs={columns}
          rowData={rowData}
          pagination={true}
          paginationPageSize={20}
          defaultColDef={gridoptions}
          onGridReady={onGridReady}
          headerHeight={40}
          rowHeight={40}
          // gridAutoHeight={true}
          rowSelection='single'
          onRowSelected={
            params => {
              const selectedRows = params.api.getSelectedRows();

              history.push('/stocks/'+selectedRows[0].symbol);
            }
          }
        />
      </div>
    );
  }

  if (loading){
    tableSection = <LoadingTable />;
    
  } else if (error){
    tableSection = <ErrorTable />;
  }
    else {
    tableSection = <DrawTable />;
    // tableSection = <span></span>;
  }
  
  return (
    <main>
      <div className="container WelcomeMsg">
        <h3>Welcome to Watch Stocks!</h3>
        <p>Watch Stocks, the application, provides you the stock market data from an American exchange. Here is a table listing the companies. You can also search the matched companies by entering a keyword indicating specified industry or even a prefix of the industry, or selecting the industry at the drop down below.<br/>
        To see the each detail of the company's stock, click on the row which you are interested in at the below table. Viewing the table and the chart for the history of a company's stock with the date range at the detail page is restricted so it requires you to login. If you are not our user yet, you could register on the page.</p>
      </div>
      <div className="searchBox form_container">
        <SearchBar value={search} onSubmit={setSearch} />
        <span className="BetweenSearch"> OR </span>
        <select id="DDSeach" className="DDsearchBox" value={ddsearch} onChange={(e) => {setddSearch(e.target.value); setSearch(e.target.value)}}>
          <option value="">All Industries</option>
          <option value="Health Care">Health Care</option>
          <option value="Industrials">Industrials</option>
          <option value="Consumer Discretionary">Consumer Discretionary</option>
          <option value="Information Technology">Information Technology</option>
          <option value="Consumer Staples">Consumer Staples</option>
          <option value="Utilities">Utilities</option>
          <option value="Financial">Financial</option>
          <option value="Real Estate">Real Estate</option>
          <option value="Materials">Materials</option>
          <option value="Energy">Energy</option>
          <option value="Telecommunication Services">Telecommunication Services</option>
        </select>
      </div>
      {tableSection}
      
    </main>
  );
}