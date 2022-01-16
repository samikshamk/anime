import React, { useState, useEffect } from "react";
import Axios from "axios";
import {
  Container,
  Box,
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  IconButton,
  Grid,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

import AnimeCard from "../Components/AnimeCard";
import ReactPaginate from "react-paginate";

function Main() {
  const [animelist, setAnimeList] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [pageNumber, setPageNumber] = useState(0);

  const animePerPage = 8;
  const pagesVisited = pageNumber * animePerPage;

  const pageCount = Math.ceil(animelist.length / animePerPage);
  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

  useEffect(() => {
    Axios.get(`https://api.jikan.moe/v4/top/anime`, {
      headers: { Accept: "application/json" },
    }).then((res) => {
      setAnimeList(res.data.data);
    });
  }, []);

  return (
    <Container>
      <Box p={4} className="searchBox">
        <FormControl m={2} className="searchForm" variant="outlined">
          <InputLabel htmlFor="search">Search</InputLabel>
          <OutlinedInput
            type="text"
            onChange={(event) => {
              setSearchTerm(event.target.value);
            }}
            endAdornment={
              <InputAdornment position="end">
                <IconButton aria-label="search" edge="end">
                  <SearchIcon />
                </IconButton>
              </InputAdornment>
            }
            label="Search"
          />
        </FormControl>
      </Box>

      <Box m={3}>
        <Grid
          container
          spacing={2}
          direction="row"
          justify="flex-start"
          alignItems="flex-start"
        >
          {animelist

            .slice(pagesVisited, pagesVisited + animePerPage)

            .filter((animeDetails) => {
              if (searchTerm === "") {
                return animeDetails;
              } else if (
                animeDetails.title
                  .toLowerCase()
                  .includes(searchTerm.toLowerCase())
              ) {
                return animeDetails;
              }
              return false;
            })

            .map((animeDetails) => {
              const title = animeDetails.title;
              const image_url = animeDetails.images.jpg.image_url;
              const mal_id = animeDetails.mal_id;

              return (
                <Grid
                  item
                  xs={12}
                  sm={6}
                  md={3}
                  key={animelist.indexOf(animeDetails)}
                >
                  <AnimeCard
                    key={mal_id}
                    mal_id={mal_id}
                    title={title}
                    image_url={image_url}
                  />
                </Grid>
              );
            })}
        </Grid>
      </Box>
      <ReactPaginate
        previousLabel={"Previous"}
        nextLabel={"Next"}
        pageCount={pageCount}
        onPageChange={changePage}
        containerClassName={"paginateBtn"}
        previousLinkClassName={"previousBtn"}
        nextLinkClassName={"nextBtn"}
        disabledClassName={"paginateDisabled"}
        activeClassName={"paginateActive"}
      />
    </Container>
  );
}

export default Main;
