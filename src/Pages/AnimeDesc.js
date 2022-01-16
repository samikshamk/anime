import React, { useState, useEffect } from "react";
import Axios from "axios";
import { useParams } from "react-router-dom";

import { Container, Box, Grid, Typography, Button } from "@mui/material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";

function AnimeDesc() {
  const { animeID } = useParams();
  const [animeData, setAnimeDate] = useState([]);

  useEffect(() => {
    Axios.get(`https://api.jikan.moe/v4/anime/` + animeID, {
      headers: { Accept: "application/json" },
    }).then((res) => {
      setAnimeDate(res.data.data);
      console.log(res.data.data);
    });
  }, [animeID]);

  return (
    <Container>
      <Box p={4}>
        <Grid container spacing={2}>
          <Grid item xs={4}>
            <img
              width="100%"
              src={animeData.images.jpg.image_url}
              alt={animeData.title}
            />
          </Grid>
          <Grid item xs={8} p={1}>
            <Typography variant="h5">Synopsis</Typography>
            <Typography variant="h6">{animeData.title}</Typography>
            <Typography>{animeData.synopsis}</Typography>

            <Grid container spacing={2} mt={3}>
              <Grid item xs={12} sm={3}>
                <Box className="animeBox bg-blue">
                  <Typography variant="h5">{animeData.score}</Typography>
                  <Typography>{animeData.scored_by} USERS</Typography>
                </Box>
              </Grid>
              <Grid item xs={12} sm={3}>
                <Box className="animeBox bg-purple">
                  <Typography variant="h5">{`#${animeData.rank}`}</Typography>
                  <Typography>RANKED</Typography>
                </Box>
              </Grid>
              <Grid item xs={12} sm={3}>
                <Box className="animeBox bg-red">
                  <Typography variant="h5">{animeData.popularity}</Typography>
                  <Typography>POPULARITY</Typography>
                </Box>
              </Grid>
              <Grid item xs={12} sm={3}>
                <Box className="animeBox bg-green">
                  <Typography variant="h5">{animeData.members}</Typography>
                  <Typography>MEMBERS</Typography>
                </Box>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Button mt={4} variant="contained" color="success" href="/">
          <ChevronLeftIcon />
          Back
        </Button>
      </Box>
    </Container>
  );
}

export default AnimeDesc;
