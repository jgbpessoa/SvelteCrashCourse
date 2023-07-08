<script lang="ts">
  import axios from "axios";
  import { onMount } from "svelte";

  let term = "";
  let photos: {
    id: string;
    alt_description: string;
    urls: {
      regular: string;
    };
  }[] = [];

  //   const fetchData = async () => {
  //     const response = await axios.get(
  //       `https://api.unsplash.com/search/photos?page=1&query=${
  //         term || "dogs"
  //       }&client_id=ohUgHGXaeVrUtxi9iAKmmvq6A4YwUfQ9pZJJxR09an4`
  //     );

  //     photos = response.data.results;
  //   };

  // Practice: use fetch API and then() instead of axios with async/await
  const fetchData = () => {
    const fetchPromise = fetch(
      `https://api.unsplash.com/search/photos?page=1&query=${
        term || "dogs"
      }&client_id=ohUgHGXaeVrUtxi9iAKmmvq6A4YwUfQ9pZJJxR09an4`
    );

    fetchPromise
      .then((response) => {
        if (!response.ok) {
          throw new Error("Request failed");
        }
        return response.json();
      })
      .then((data) => {
        photos = data.results;
      })
      .catch((error) => console.error(error));
  };

  onMount(() => {
    fetchData();
  });

  const handleSearch = async () => {
    if (!term) return;
    await fetchData();
    term = "";
  };
</script>

<div class="container">
  <div class="header">
    <h1>Image Gallery</h1>
    <div class="input-container">
      <input type="text" class="input" bind:value={term} />
      <button
        class="button"
        on:click={() => {
          handleSearch(term);
        }}>Search</button
      >
    </div>
  </div>
  <div class="photos">
    {#each photos as photo (photo.id)}
      <img class="image" src={photo.urls.regular} alt={photo.alt_description} />
    {/each}
  </div>
</div>

<style>
  .image {
    width: 400px;
    height: 250px;
    margin: 5px;
  }

  .photos {
    display: flex;
    flex-wrap: wrap;
  }

  .container {
    width: 1230px;
    margin: 0 auto;
  }

  .header {
    text-align: center;
    font-size: 20px;
  }

  .input {
    padding: 10px;
    width: 400px;
    border-radius: 10px;
    outline: none;
    border: 1px solid gray;
    font-size: 20px;
  }

  .button {
    padding: 10px;
    font-size: 20px;
    background-color: aqua;
    border-radius: 10px;
    border: none;
    color: white;
  }

  .input-container {
    margin-bottom: 40px;
  }
</style>
