import axios from 'axios';


import Snackbar from 'react-native-snackbar';

async function getBlogs(pageSize = 10) {
  try {
    const result = await axios.get(
      'https://sadhakom.com/wp-json/wp/v2/posts?per_page=' + pageSize,
      {headers: {}},
    );
    return {blog: result.data};
  } catch (e) {
    return {blog: null};
  }
}

async function getCategories() {
  try {
    const result = await axios.get(
      'https://sadhakom.com/wp-json/wp/v2/categories',
      {headers: {}},
    );
    return {category: result.data};
  } catch (e) {
    return {category: null};
  }
}

async function getBlogByCategoryId(id) {
  try {
    const result = await axios.get(
      'http://sadhakom.com/wp-json/wp/v2/posts?categories=' + parseInt(id),
      {headers: {}},
    );
    return {blog: result.data};
  } catch (error) {
    Snackbar.show({
      text: error.toString(),
    });
    return {blog: []};
  }
}

export default {getBlogs, getCategories, getBlogByCategoryId};
