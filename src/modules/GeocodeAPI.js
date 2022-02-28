import axios from "axios";

export async function getGeocode(searchTerm) {
  try {
    let promise = await axios.get('/map-geocode/v2/geocode', {
      headers: {
        "X-NCP-APIGW-API-KEY-ID": "gjj698h64e",
        "X-NCP-APIGW-API-KEY": "9j9gYriUp55lEhlPmmxbul0oeb0uCVyh5FbNKO9L"
      },
      params: {
        "query": searchTerm
      }
    });

    return promise.data.addresses[0];
  } catch (err) {
    console.log("getGeocode Error Occured");
  }
}

async function getGeocodeWithObject(object) {
  try {
    let geocode = await getGeocode(object.address);

    return {...object, geocode};
  } catch (err) {
    console.log("getGeocodeWithObject Error Occured");
  }
}

export async function getGeocodeWithObjectArray(objectArr) {
  try {
    let result = objectArr.map(getGeocodeWithObject);
    return await Promise.all(result);
  } catch (err) {
    console.log("getGeocodeWithObjectArr Error Occured");
  }
};

