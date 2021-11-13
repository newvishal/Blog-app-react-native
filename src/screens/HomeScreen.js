// core react native
import React, {useState, useCallback, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from 'react-native';

// third party
import moment from 'moment';
import Snackbar from 'react-native-snackbar';

// data resource

// import Blog from '../data/Blog.json';
// import Categories from '../data/Categories.json';

// api call

import UtilBlog from '../utils/blog';

const HomeScreen = ({navigation}) => {
  const [Category, setCategory] = useState();
  const [BlogData, setBlogData] = useState([]);
  const [CategoryList, SetCategoryList] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    UtilBlog.getCategories()
      .then(({category}) => {
        SetCategoryList(category);
      })
      .catch(e => {});

    UtilBlog.getBlogs()
      .then(({blog}) => {
        setBlogData(blog);
        setLoading(false);
      })
      .catch(e => {
        setSnackbarMessage('Somthing went wrong!!');
        setLoading(false);
      });
  }, []);

  const setSnackbarMessage = value => {
    Snackbar.show({
      text: value,
    });
  };

  useEffect(() => {
    setLoading(true);
    if (Category === undefined) return;
    //setSnackbarMessage(Category.toString());
    UtilBlog.getBlogByCategoryId(Category)
      .then(({blog}) => {
        //setSnackbarMessage(JSON.stringify(blog));
        setBlogData([]);
        if (blog.length === 0) {
          setSnackbarMessage('Ooops!!No Data Found');
          setLoading(false);
          return;
        }
        setBlogData(blog);
        setLoading(false);
      })
      .catch(e => {
        setSnackbarMessage('Somthing went wrong');
        // setSnackbarMessage(e.toString());
        setLoading(false);
      });
  }, [Category]);

  return (
    <View style={{flex: 1, backgroundColor: '#ffffff'}}>
      <View style={styles.row}>
        <FlatList
          data={CategoryList}
          horizontal
          renderItem={({item, index}) => (
            <TouchableOpacity onPress={() => setCategory(item.id)}>
              <View
                style={[
                  styles.shadow,
                  // eslint-disable-next-line react-native/no-inline-styles
                  {
                    marginLeft: index === 0 ? 10 : 0,
                    height: 40,
                    width: 'auto',
                    backgroundColor:
                      item.id === Category ? '#bc0000' : '#999999',
                    marginRight: 10,
                    borderRadius: 8,
                    padding: 7,
                  },
                ]}>
                <Text style={{color: '#f5f6fa'}}>{item.name}</Text>
              </View>
            </TouchableOpacity>
          )}
          keyExtractor={item => item.id}
          showsHorizontalScrollIndicator={false}
        />
      </View>
      <View style={styles.container}>
        {loading ? (
          <View style={styles.activityContainer}>
            <ActivityIndicator size="large" color="#bc0000" />
          </View>
        ) : BlogData.length > 0 ? (
          <View style={styles.cardContainer}>
            <FlatList
              data={BlogData}
              keyExtractor={({id}) => id.toString()}
              showsVerticalScrollIndicator={false}
              renderItem={({item}) => (
                <TouchableOpacity
                  onPress={() =>
                    navigation.push('BlogDesc', {
                      BlogDetail: item,
                      name: item.title.rendered,
                    })
                  }>
                  <View style={styles.mainCard}>
                    <View style={styles.imageContainer}>
                      <Image
                        style={styles.blogImage}
                        source={require('../assets/images/logo.png')}
                      />
                    </View>
                    <View style={styles.textContainer}>
                      <Text style={styles.newsTitle}>
                        {item.title.rendered.replace(/<\/?[^>]+(>|$)/g, '')}
                      </Text>
                      <Text style={styles.dateTime}>
                        {' '}
                        {moment(new Date(item.date)).format('MMMM D, YYYY')}
                      </Text>
                      <Text style={styles.author}>💖 Om Tiwari </Text>
                    </View>
                  </View>
                </TouchableOpacity>
              )}
            />
          </View>
        ) : (
          <View
            // eslint-disable-next-line react-native/no-inline-styles
            style={{
              flex: 1,
              justifyContent: 'center',
              alignContent: 'center',
              alignItems: 'center',
            }}>
              <Text style={{fontSize: 16}}> 🙊🙊🙊 No blog found!!</Text>
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 8,
    padding: 10,
  },
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginVertical: 10,
  },
  shadow: {
    overflow: 'hidden',
    borderBottomWidth: 0,
    shadowColor: '#cdcdcd',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.8,
    shadowRadius: 40,
    elevation: 4,
  },
  cardContainer: {
    flex: 1,
    padding: 0,
  },
  mainCard: {
    flexDirection: 'row',
    padding: 10,
    backgroundColor: '#ffffff',
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
  imageContainer: {
    flexWrap: 'wrap',
  },
  blogImage: {
    height: 60,
    width: 100,
  },
  author: {
    fontSize: 12,
  },
  textContainer: {
    flex: 1,
    marginLeft: 10,
    flexWrap: 'wrap',
  },
  newsTitle: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  dateTime: {
    fontSize: 12,
    marginBottom: 1,
  },
  activityContainer: {
    // borderTopWidth: 1,
    borderColor: '#CED0CE',
  },
});

export default HomeScreen;
