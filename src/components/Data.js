function Data(data) {
  const { items } = data;
  if (items[0].type === "playlist") {
    return items.map((item) => {
      const { images, name, tracks, type, id } = item;
      return { images, name, tracks, type, id };
    });
  }
  return items
    .filter((item) => item.track.preview_url !== null)
    .map((item) => {
      const { name, preview_url, type, id } = item.track;
      const { images, name: album } = item.track.album;
      const artists = item.track.artists
        .map((artist) => artist.name)
        .join(", ");
      return {
        images,
        name,
        preview_url,
        album,
        artists,
        type,
        id,
        active: false,
      };
    });
}

export default Data;

/*
Playlist
items[{}] > images[{}] > height, url
          > name
          > tracks > href
                   > total
          > type
Tracks
items[{}] > track{} > name
                    > preview_url
                    > album{} > name
                              > artists[{}] > name
                              > images [{}] > height, url
                    > type
                    
*/
