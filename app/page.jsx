"use client"
import Image from "next/image";
import styles from "./page.module.css";
import { Grid } from "@mui/material";
import HomePage from "./Components/HomePage/HomePage";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchData } from "./redux/store";


export default function Home() {

  const dispatch = useDispatch();
  const { value, loading, error } = useSelector(state => state.data);
  useEffect(() => { dispatch(fetchData()) }, [dispatch]);
  console.log("????????????????????????????", value?.data);

  return (
    <Grid container sx={{ mt: { xs: 30, sm: 30, md: 0, lg: 0 } }}>
      <HomePage />
    </Grid>
  );
}
