const SEARCH_PATH = "/api/yelp/businesses/search";

async function searchBusinesses(term, location, sortBy) {
  // Create URL search parameters using term, location, sort_by, and limit
  const params = new URLSearchParams({
    term,
    location,
    sort_by: sortBy,
    limit: "20",
  });

  // Send a fetch request to the Yelp backend search endpoint
  const res = await fetch(`${SEARCH_PATH}?${params}`);
  // Check if the response failed and throw an error if needed
  if (!res.ok) {
    throw new Error(`Yelp request failed (${res.status})`);
  }

  const jsonRes = await res.json();

  if (jsonRes.businesses) {
    return jsonRes.businesses.map((business) => {
      return {
        id: business.id,
        imageSrc: business.image_url,
        name: business.name,
        address: business.location.address1,
        city: business.location.city,
        state: business.location.state,
        zipCode: business.location.zip_code,
        category: business.categories[0] ? business.categories[0].title : "",
        rating: business.rating,
        reviewCount: business.review_count,
      };
    });
  }

  // return an empty array if no businesses were found
  return [];
}

export default searchBusinesses;
