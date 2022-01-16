import React from "react";
import { Card, CardMedia, CardContent, Typography, Link } from "@mui/material";

function AnimeCard(props) {
  return (
    <Card className="card">
      <CardMedia
        component="img"
        width="225"
        image={props.image_url}
        alt={props.title}
        className="cardImg"
        
      />
      <CardContent>
          <Typography gutterBottom variant="h5" component="div">
          <Link href={`/${props.mal_id}`} underline="none">{props.title}</Link>
          </Typography>
        </CardContent>
    </Card>
  );
}

export default AnimeCard;
